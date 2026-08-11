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

---