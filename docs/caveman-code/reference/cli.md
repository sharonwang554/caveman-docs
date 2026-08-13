---
id: cli
title: CLI & Subcommands
sidebar_position: 1
---

### ⚙️ CLI flags
| Flag | Description |
|---|---|
| `-c` / `-r` | Continue / browse-resume session |
| `-p`, `--print` | Non-interactive: print and exit |
| `--mode json\|rpc` | Structured output modes |
| `--provider` / `--model` | Provider name / model ID (`:<thinking>` suffix ok) |
| `--thinking <level>` | `off`·`minimal`·`low`·`medium`·`high`·`xhigh` |
| `--architect` / `--editor <model>` | Architect/editor split |
| `--tools <list>` | Enable specific tools |
| `--no-tools` | Disable all built-in tools |
| `--extension <path>` | Load an extension |
| `--no-extensions` | Disable extension discovery |

### 🚀 Subcommands
| Command | Description |
|---|---|
| `caveman goal start "<text>"` | Autonomous Ralph-style loop |
| `caveman goal resume [id] [--force]` | Resume a paused goal |
| `caveman goal status [id]` | Show goal state and ledger |
| `caveman goal cancel [id]` | Mark goal as cancelled |
| `caveman goal list` | List all goals in project |
| `caveman mcp <subcmd>` | Manage MCP servers |
| `caveman watch [paths]` | File watcher for `// cave!` triggers |
| `caveman exec [flags] "<prompt>"` | Non-interactive CI mode |
| `caveman plugin <subcmd>` | Plugin marketplace |
| `caveman run-recipe <name>` | Run YAML workflow recipes |
| `caveman rollback N` | Revert to checkpoint N |
| `caveman models <subcmd>` | Manage model registry |
| `caveman serve` / `attach` | Daemon mode |

Env: `ANTHROPIC_API_KEY` · `OPENAI_API_KEY` · `CAVE_CODING_AGENT_DIR` (config dir) · `CAVE_CACHE_RETENTION=long` (extended prompt cache).



---