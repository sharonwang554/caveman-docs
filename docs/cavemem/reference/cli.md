---
id: cli
title: CLI
sidebar_position: 1
---

## CLI

| Command | |
|---------|--|
| `cavemem install [--ide <name>]` | Register hooks + MCP for an IDE |
| `cavemem uninstall [--ide <name>]` | Remove hooks + MCP |
| `cavemem status` | Single dashboard: wiring, DB counts, embedding backfill, worker pid |
| `cavemem config show\|get\|set\|open` | View/edit settings — schema is self-documenting |
| `cavemem start\|stop\|restart` | Control the worker daemon (usually unnecessary — auto-starts) |
| `cavemem viewer` | Open the memory viewer in your browser |
| `cavemem doctor` | Verify installation |
| `cavemem search <query> [--limit N] [--no-semantic]` | Search memory (BM25 + cosine re-rank) |
| `cavemem compress <file>` | Compress a file with caveman grammar |
| `cavemem reindex` | Rebuild FTS5 + vector index |
| `cavemem export <out.jsonl>` | Dump sessions + observations to JSONL |
| `cavemem import <file.jsonl> [--dry-run]` | Load a JSONL export back in (merge, safe to re-run) |
| `cavemem mcp` | Start MCP server (stdio) |

Manual cross-device transfer: on machine A, `cavemem export backup.jsonl`. Copy the file to machine B, then on B, stop the worker (`cavemem stop`), run `cavemem import backup.jsonl`, and restart it (`cavemem start`). Records already present are skipped, and imported observations whose ids clash with different local ones get fresh ids — nothing is overwritten, and importing the same file twice is a no-op. Imported observations keep their original compressed content and get picked up by the embedding backfill like any new write — vectors themselves aren't exported.

---