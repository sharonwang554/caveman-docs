---
id: cli
title: CLI
sidebar_position: 1
---


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

### Manual cross-device transfer

1. **Export on machine A:** Run `cavemem export backup.jsonl`. 
2. **Transfer:** Copy the file to machine B.
3. **Import on machine B:**
   - Stop the worker: `cavemem stop`
   - Run the import: `cavemem import backup.jsonl`
   - Restart the worker: `cavemem start`

**Important Notes:**
- Records already present are automatically skipped.
- Imported observations whose IDs clash with different local ones get fresh IDs — nothing is overwritten.
- Importing the same file twice is a no-op. 
- Imported observations keep their original compressed content and get picked up by the embedding backfill like any new write (vectors themselves aren't exported).

---