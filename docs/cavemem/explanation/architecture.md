---
id: architecture
title: Architecture & Ecosystem
sidebar_position: 1
---

# Cavemem Architecture

**Why agent forget when agent can remember**

Cross-agent persistent memory for coding assistants. Hooks fire at session boundaries, compress observations with the caveman grammar (~75% fewer prose tokens, code and paths preserved byte-for-byte), and write to local SQLite. Agents query their own history through three MCP tools. No network. No cloud.




**Supports:** Claude Code · OpenCode · Codex · GitHub Copilot · Augment Code · Cursor (query-only) · Gemini CLI (query-only) · Antigravity (query-only) · IBM Bob (query-only)

- **Persistent memory across sessions.** Hooks capture what happened; the store keeps it.
- **Compressed at rest.** Deterministic caveman grammar, round-trip-guaranteed expansion for humans.
- **Progressive MCP retrieval.** `search`, `timeline`, `get_observations` — agents filter before fetching.
- **Hybrid search.** SQLite FTS5 keyword + local vector index, combined with a tunable ranker.
- **Local by default.** No network calls. Optional remote embedding providers via config.
- **Web viewer.** Read-only UI at `http://localhost:37777` for browsing sessions in human-readable form. Token-protected: the worker generates a local bearer token on first start and injects it into the served page, so `cavemem viewer` still opens with zero friction while `/api/*` rejects requests without it.
- **Cross-IDE installers.** Claude Code, OpenCode, Codex, GitHub Copilot, Augment Code capture observations; Cursor, Gemini CLI, Antigravity, IBM Bob are query-only (MCP search over memory captured elsewhere) — one command each, see the [capability matrix](#install).
- **Privacy-aware.** `<private>...</private>` stripped at write boundary. Path globs exclude whole directories.

---

## How it works

```text
session event  →  redact <private>  →  compress  →  SQLite + FTS5
                                                           ↑
                                                MCP queries on demand
```

What compression looks like in practice:

```text
Input:  "The auth middleware throws a 401 when the session token expires; we should add a refresh path."
Stored: "auth mw throws 401 @ session token expires. add refresh path."
Viewed: "The auth middleware throws a 401 when session token expires. Add refresh path."
```

Code blocks, URLs, paths, identifiers, and version numbers are never touched. Hook handlers complete in under 150ms. Full bodies fetched on demand via `get_observations`.
