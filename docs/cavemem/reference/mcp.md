---
id: mcp
title: MCP
sidebar_position: 2
---


Progressive disclosure: `search` and `timeline` return compact results; `get_observations` fetches full bodies.

| Tool | Returns |
|------|---------|
| `search(query, limit?)` | `[{id, score, snippet, session_id, ts}]` — BM25 + optional cosine re-rank |
| `timeline(session_id, around_id?, limit?)` | `[{id, kind, ts}]` |
| `get_observations(ids[], expand?)` | Full bodies, expanded by default |
| `list_sessions(limit?)` | `[{id, ide, cwd, started_at, ended_at}]` |
| `enrich(query, note?)` | `{results: [{title, url, extract, observation_id}]}` — **opt-in** web enrichment |

`enrich` is off by default. When `enrich.enabled` is `false` the tool is not registered and cavemem makes no network call, ever. When enabled, it searches DuckDuckGo, stores compressed plain-text extracts as observations (tagged `source: web` + URL for provenance), and returns them.

## Workflow

The recommended workflow is a three-layer progressive disclosure pattern:

1. `search` (or `list_sessions` → `timeline`) to get a compact index.
2. Review IDs.
3. `get_observations` with the filtered set.

Following this pattern saves ~10× tokens versus fetching full bodies upfront.

## Tool Schemas

### `search`
Find observations matching a natural-language query.
```json
{
  "name": "search",
  "input": { "query": "auth middleware", "limit": 10 }
}
```
Returns: `[ { id, session_id, snippet, score, ts } ]`

Scoring is hybrid: keyword (FTS5 BM25) blended with vector similarity via `settings.search.alpha`. Missing fields fall back gracefully.

### `timeline`
Chronological observation identifiers for a given session.
```json
{
  "name": "timeline",
  "input": { "session_id": "sess_abc", "around_id": 42, "limit": 50 }
}
```
Returns: `[ { id, kind, ts } ]` — no body content. Use the IDs in `get_observations`.

### `get_observations`
Fetch full observation bodies by ID.
```json
{
  "name": "get_observations",
  "input": { "ids": [12, 34], "expand": true }
}
```
Returns: `[ { id, session_id, kind, ts, content, metadata } ]`

Content is expanded to human-readable form by default. Pass `expand: false` to request the compressed form (useful for audit or for agents that understand the caveman dialect directly).

### `list_sessions`
List recent sessions in reverse chronological order.
```json
{
  "name": "list_sessions",
  "input": { "limit": 20 }
}
```
Returns: `[ { id, ide, cwd, started_at, ended_at } ]`. Use `id` with `timeline` to navigate within a session.

### `enrich` (opt-in)
Search the web via DuckDuckGo's HTML endpoint, store plain-text extracts of the top results as observations, and return them.
```json
{
  "name": "enrich",
  "input": { "query": "sqlite fts5 bm25 ranking", "note": "researching search ranking" }
}
```
Returns: `{ query, results: [ { title, url, extract, observation_id } ], stored_ids }`

Each result page is fetched with a 500 KB byte cap and the `enrich.timeoutMs` timeout, stripped to plain text, and truncated to 2000 characters. Extracts are stored through the normal write path (compressed, privacy-redacted) under a dedicated `enrich` session, with `metadata: { source: "web", url, query, note? }` for provenance. `query` and `note` are scrubbed (private tags + secret patterns) before they reach metadata, and source URLs are preserved byte-for-byte. `enrich.maxResults` (default 3, max 5) bounds how many results are fetched and stored. If the search fails or nothing can be fetched, the call returns an error and nothing is stored.

Only public hosts are fetched: every URL and every redirect hop (followed manually, capped at 3) must be http(s) to a non-private address. Loopback, RFC1918, link-local (`169.254.0.0/16`, e.g. cloud metadata endpoints), and unique-local targets — including obfuscated numeric forms — are rejected without a request, protecting against SSRF via malicious result links or redirects.

## Contract stability

Fields may be added. Existing fields will not be removed or renamed within a minor version.