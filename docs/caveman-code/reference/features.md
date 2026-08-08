---
id: features
title: Features & Architecture
sidebar_position: 3
---

## Features

| | Feature | Trigger |
|---|---|---|
| 🤖 | **Autonomous goal loop** — Ralph-style autopilot. Rolling state, per-iteration $/token ledger, shadow-git checkpoints, ranked termination (sentinel · iteration cap · $-cap · no-progress · SIGINT). Resume any time. | `caveman goal start` |
| 🧠 | **Plan mode** — read-only chat. Model sees only `read`/`grep`/`find`/`ls`, produces a written plan, never edits. Subagents inherit the gate. `/act` to execute. | `/plan` |
| 👥 | **Subagents** — up to 7 parallel, worktree-isolated. Frontmatter agents at `.cave/agents/*.md` (Claude Code superset). Five ship by default. | `Task` tool |
| 🪞 | **Architect / editor split** — slow model plans, fast model executes. ~3–5× cheaper than a single-model run. | `--architect` · `--editor` |

Latest release: plan mode · goal loop · native memory tools · subagent registry. Full history → CHANGELOG.md.



**<strong>More</strong> — sessions · providers · MCP · memory · recipes · daemon · CLI flags**


### 🌳 Sessions, branching, replay
JSONL sessions in `~/.cave/agent/sessions/`, organized by working directory. Branching never overwrites history.

```bash
caveman -c                    # continue most recent
caveman -r                    # browse and select
caveman --fork <path|id>      # fork into a new file
```
`/tree` navigate + branch in-place (search · fold · page · filter) · `/compact` manual compaction · `/checkpoint` + `/rollback N` rewind code **and** conversation together.

### 🌐 20+ providers, 6 OAuth flows
**OAuth** — Claude Pro/Max · ChatGPT Plus/Pro · GitHub Copilot · Google Gemini · Antigravity · Vertex
**API keys** — Anthropic · OpenAI · Azure · Vertex · Bedrock · Mistral · Groq · Cerebras · xAI · OpenRouter · Vercel AI Gateway · Hugging Face · Kimi · MiniMax · Z.AI · DeepSeek
**Custom** — any OpenAI-/Anthropic-/Google-compatible endpoint via `~/.cave/agent/models.json`.

### 🔌 MCP, hooks, skills, commands — Claude Code-compatible
Authoring formats are a **superset** of Claude Code's — paste your existing config, it works.

| Claude Code | Caveman | Notes |
|---|---|---|
| `~/.claude/settings.json` | `~/.cave/settings.json` | Hooks identical (run as observers, never block) |
| `~/.claude/commands/*.md` | `~/.cave/commands/*.md` | Frontmatter superset |
| `~/.claude/skills/<name>/SKILL.md` | `~/.cave/skills/<name>/SKILL.md` | Identical |
| `~/.claude/agents/<name>.md` | `~/.cave/agents/<name>.md` | Frontmatter superset |
| `.mcp.json` | `.mcp.json` | Same path, no change |

MCP transports: stdio · Streamable HTTP · in-process. OAuth 2.1 + PKCE; tokens in OS keychain.
```bash
caveman mcp add <name>      # add a server
caveman mcp doctor          # health-check + tool listing
caveman mcp-server          # run caveman itself as an MCP server (Codex-compatible)
```

### 🧠 Memory via cavemem
Persistent memory delegated to [cavemem](https://github.com/JuliusBrussee/cavemem) (MIT, hybrid BM25 + local vectors). Agent has two native tools — `memory_search` and `memory_save`; relevant recall is auto-injected each turn.
```bash
/memory search "auth migration"
/memory consolidate            # cluster recent observations into semantic facts
/memory sync --from claude     # import Claude Code's MEMORY.md
```

### 🛠️ Recipes
Declarative multi-step YAML workflows at `~/.cave/recipes/*.yaml`. Ten built in: `accessibility-audit` · `add-feature-flag` · `add-tests` · `bump-deps` · `extract-component` · `migrate-deps` · `migrate-to-biome` · `port-to-typescript` · `release` · `seo-audit`.
```bash
/recipe run add-tests src/auth.ts
```

### 🖥️ Daemon
```bash
caveman serve --port 39245             # start the daemon
caveman attach --host localhost:39245  # attach a TUI
```
Sessions live in SQLite and survive SSH drops. Prepend `&` to any prompt to dispatch to a remote `caveman worker`.