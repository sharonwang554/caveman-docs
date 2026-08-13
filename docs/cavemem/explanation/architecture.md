---
id: architecture
title: Architecture & Ecosystem
sidebar_position: 1
---


**Why agent forget when agent can remember**

Cross-agent persistent memory for coding assistants. Hooks fire at session boundaries, compress observations with the caveman grammar (~75% fewer prose tokens, code and paths preserved byte-for-byte), and write to local SQLite. Agents query their own history through three MCP tools. No network. No cloud.




**Supports:** Claude Code · OpenCode · Codex · GitHub Copilot · Augment Code · Cursor (query-only) · Gemini CLI (query-only) · Antigravity (query-only) · IBM Bob (query-only)

- **Persistent memory across sessions.** Hooks capture what happened; the store keeps it.
- **Compressed at rest.** Deterministic caveman grammar, round-trip-guaranteed expansion for humans.
- **Progressive MCP retrieval.** `search`, `timeline`, `get_observations` — agents filter before fetching.
- **Hybrid search.** SQLite FTS5 keyword + local vector index, combined with a tunable ranker.
- **Local by default.** No network calls. Optional remote embedding providers via config.
- **Web viewer.** Read-only UI at `http://localhost:37777` for browsing sessions in human-readable form. Token-protected: the worker generates a local bearer token on first start and injects it into the served page, so `cavemem viewer` still opens with zero friction while `/api/*` rejects requests without it.
- **Cross-IDE installers.** Claude Code, OpenCode, Codex, GitHub Copilot, Augment Code capture observations; Cursor, Gemini CLI, Antigravity, IBM Bob are query-only (MCP search over memory captured elsewhere) — one command each, see the [capability matrix](../tutorials/installation.md).
- **Privacy-aware.** `<private>...</private>` stripped at write boundary. Path globs exclude whole directories.

---

## Architecture

```text
IDE ── hooks ──▶ CLI `hook run`
                     │
                     ▼
              MemoryStore (core)
            ┌──────────┴──────────┐
            ▼                     ▼
       compress (prose)      Storage (SQLite + FTS5 + embeddings)
                                   ▲
                                   │
IDE ── MCP stdio ──▶ mcp-server ───┘
Browser ── HTTP ──▶ worker (Hono) ─┘
```

### Write path

1. Hook receives input from IDE (session start, tool use, prompt, stop).
2. CLI invokes `runHook(name, input)`.
3. `redactPrivate` strips `<private>…</private>` content.
4. `compress` transforms prose; technical tokens (code, paths, URLs, identifiers, version numbers) pass through byte-for-byte.
5. `Storage.insertObservation` commits to SQLite; FTS5 is updated via triggers.
6. Embedding, when enabled, is computed out-of-band by the worker.

### Read path

- **Model (MCP)**: compact search → `get_observations(expand: true)` returns readable text.
- **Human (viewer)**: worker serves expanded text over HTTP on `127.0.0.1:37777`.

### Invariants

- Only `MemoryStore` may write observations.
- Only `@cavemem/storage` may open the database.
- Hooks do no I/O beyond the `MemoryStore` call.
- Worker binds to loopback only.

What compression looks like in practice:

```text
Input:  "The auth middleware throws a 401 when the session token expires; we should add a refresh path."
Stored: "auth mw throws 401 @ session token expires. add refresh path."
Viewed: "The auth middleware throws a 401 when session token expires. Add refresh path."
```

Hook handlers complete in under 150ms. Full bodies fetched on demand via `get_observations`.
