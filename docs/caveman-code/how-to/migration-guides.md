---
id: migration-guides
title: Migration Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="aider" label="Aider">

# Migrating from Aider

Aider pioneered the **repo map** (PageRank over a tree-sitter symbol graph) and **edit-format-per-model** (whole / diff / udiff / editor formats). Caveman Code ships both, with the same defaults and ablation tables.



## TL;DR

```bash
# 1. Install
npm install -g @juliusbrussee/caveman-code

# 2. Use your existing API keys
export ANTHROPIC_API_KEY=...
export OPENAI_API_KEY=...

# 3. Tell Caveman Code what files you'd manually /add in Aider
caveman @src/main.py @src/utils.py "Help me with this"

# 4. Use it
caveman
```

## What maps

| Aider | Caveman Code | Notes |
|---|---|---|
| `/add <file>` | `@file` in TUI | Adds to chat context |
| `/drop <file>` | `/drop` | Removes from chat context |
| `/run <cmd>` | `!cmd` (in TUI) | Or use Bash tool directly |
| `/diff` | `/diff` | Show pending diff |
| `/architect` | `/architect` | Architect/editor split |
| `--map-tokens N` | `/repomap set mapTokens=N` | Same default (1024) |
| `--edit-format` | `--edit-format` | `whole`/`diff`/`udiff`/`editor-diff`/`editor-whole` |
| `.aider.conf.yml` | `~/.cave/settings.json` | Different format, same options |
| Conventions file | `CAVE.md` / `CLAUDE.md` | Read on session start |

## Repo map

Aider's repo map is best-in-class. Caveman Code matches it:

- Tree-sitter parsers for TS/JS/Python/Go/Rust/Java/C++/Ruby/PHP.
- Symbol graph: files = nodes, references = edges.
- PageRank with chat-state personalization (added files + recently mentioned files = personalization vector).
- Send signatures only; bodies on demand.

```bash
/repomap set mapTokens=2048    # bigger map
/repomap                  # show the current ranked list
```

## Edit formats

Auto-selected per model based on `proof-bench` ablation results. Override with `--edit-format`:

| Format | Description | Best for |
|---|---|---|
| `whole` | Replace entire file | small files, clean state |
| `diff` | Search/replace blocks | most tasks |
| `diff-fenced` | Fenced search/replace | models that strip fences |
| `udiff` | Unified diff | weak models, stable across revisions |
| `editor-diff` | Editor model emits diff after architect | architect/editor split |
| `editor-whole` | Editor model emits whole files | architect/editor split |

Caveman Code's defaults are pinned to Aider's published ablation winners and updated when new models ship. See [Models](./models.md).

## Architect / editor split

Same UX as Aider:

```bash
/architect set architectModel=claude-opus-4-7 editorModel=claude-haiku-4
```

Architect plans, editor executes. Drops cost ~3-5× on long sessions. See [Plan Mode](../reference/plan-mode.md#architect-mode-split-planning--edit).

## Differences

### Caveman Mode compression

Aider compresses by selecting smaller context (repo map). Caveman Code additionally compresses **tool output** post-hoc (~85% reduction on bash, grep, file reads). The two are complementary; both are on by default.

### Watch mode

Aider's `// ai!` and `// ai?` magic comments — Caveman Code has the same with `// cave!` and `// cave?`:

```bash
caveman --watch
```

Trailing `!` triggers code edits with cwd + comment + surrounding lines as context.

### Session model

Aider sessions are tied to a chat history file. Caveman Code sessions are JSONL files in `~/.cave/sessions/<cwd-hash>/<id>.jsonl`. Branchable via `/tree` and `/fork`.

## Conventions file

Aider reads `<repo>/.aider/conventions.md`. Caveman Code reads `CAVE.md`, `AGENTS.md`, and `CLAUDE.md` in priority order, layered. Move your conventions file to one of those names and you're done.

## Cost tracking

Aider was first to surface per-message cost inline. Caveman Code does the same:

```
[$0.0042 (cached: $0.0001)] Sonnet 4 · 12,431 in / 412 out
```

`/tokens` opens a live breakdown. Daily totals in `~/.cave/usage.json`.


  </TabItem>
  <TabItem value="claude-code" label="Claude Code">

# Migrating from Claude Code

The promise: **paste your existing Claude Code config into `~/.cave/` and Caveman Code behaves the same — only cheaper**. Caveman Code's authoring formats are a superset of Claude Code's.



## TL;DR

```bash
# 1. Install
npm install -g @juliusbrussee/caveman-code

# 2. Copy config
cp -r ~/.claude/commands ~/.cave/
cp -r ~/.claude/skills ~/.cave/
cp -r ~/.claude/agents ~/.cave/
cp ~/.claude/settings.json ~/.cave/settings.json    # hooks + statusLine

# 3. Project-scope
ln -s .claude .cave   # or: cp -r .claude .cave (if you want them independent)

# 4. CLAUDE.md → CAVE.md (or keep CLAUDE.md; caveman-code reads both)
ln -s CLAUDE.md CAVE.md

# 5. MCP — already standard
#    .mcp.json works as-is.

# 6. Run
caveman
```

## What maps directly

| Claude Code | Caveman Code | Notes |
|---|---|---|
| `~/.claude/settings.json` | `~/.cave/settings.json` | Hooks + statusLine identical schema (caveman-code runs hooks as observers) |
| `~/.claude/commands/*.md` | `~/.cave/commands/*.md` | Frontmatter is a superset |
| `~/.claude/skills/<name>/SKILL.md` | `~/.cave/skills/<name>/SKILL.md` | Identical |
| `~/.claude/agents/<name>.md` | `~/.cave/agents/<name>.md` | Frontmatter is a superset |
| `.mcp.json` | `.mcp.json` | Same path; no change |
| `CLAUDE.md` | `CLAUDE.md` (read) or `CAVE.md` (preferred) | Caveman Code reads both, layered |
| Auto-Memory | cavemem | Different backend; same UX |

## Differences worth knowing

### Memory

Claude Code uses Auto-Memory with `~/.claude/projects/<slug>/memory/MEMORY.md`. Caveman Code uses [cavemem](../reference/memory.md). To bridge:

```bash
caveman memory sync --from claude
```

This imports `MEMORY.md` and per-fact files as cavemem observations. Going forward, if you keep both Claude Code and Caveman Code running in the same project, caveman-code reads the first 200 lines of `MEMORY.md` on every session start.

### Models

Claude Code is Anthropic-only. Caveman Code is provider-agnostic. After migrating, you can:

```bash
caveman --model openai/gpt-5-codex
caveman --model claude-sonnet-4   # default behavior matches Claude Code
```

### Cost

By default Caveman Mode compression is **on**, which Claude Code doesn't have. Expect tool-output token consumption to drop ~85%. If something looks off, bisect with:

```bash
/caveman off
```

### Permissions

Caveman Code runs in autopilot — there is no permission prompt, no `--permission-mode` flag, and no Shift+Tab mode cycle. Tools always execute. If you need a tool firewall, write a `PreToolUse` hook (it can rewrite tool input but cannot block).

### Hooks

`PreToolUse` and `PostToolUse` fire as **observers**. They can patch tool input via `hookSpecificOutput.updatedInput` and add stdout to context, but they cannot deny or block a tool call. Claude Code's "exit code 2 = deny" semantics do not apply here.

## Confirming the migration worked

```bash
caveman doctor                    # general health
caveman hooks list                # all hooks loaded
caveman skills list               # all skills loaded
caveman agents list               # all subagents loaded
caveman mcp doctor                # MCP servers reachable
```

If any of these report mismatches, [open an issue](https://github.com/JuliusBrussee/caveman-cli/issues/new?labels=migration) — we treat Claude Code parity as a CI gate.

## Why not just use Claude Code?

- **Cost.** Caveman Mode compression saves $1.70-$6.92 per typical session (proven in `npm run bench:offline`).
- **Provider flexibility.** Use ChatGPT Plus, Copilot, Gemini, or any OpenAI-compatible endpoint.
- **Session branching.** `/tree`, `/fork` — no major competitor has this.
- **MIT.** No vendor lock-in; self-host the daemon.

If none of those matter to you, stay on Claude Code — it's a fine product.


  </TabItem>
  <TabItem value="codex" label="Codex">

# Migrating from Codex

Codex (OpenAI's terminal agent) and Caveman Code agree on most file formats. AGENTS.md, .mcp.json, and Codex-style plugins drop in.



## TL;DR

```bash
# 1. Install
npm install -g @juliusbrussee/caveman-code

# 2. Project context
#    Codex's AGENTS.md → caveman-code reads it directly. No copy needed.
#    Layered with CAVE.md and CLAUDE.md if any are present.

# 3. MCP
#    .mcp.json — Caveman Code reads the Codex format directly.

# 4. Plugins
cp -r .codex-plugin .cave-plugin    # both use root-level plugin manifest

# 5. Auth
#    If you used ChatGPT OAuth in Codex, use the same in Caveman Code:
caveman
> /login chatgpt
```

## What maps

| Codex | Caveman Code | Notes |
|---|---|---|
| `AGENTS.md` | `AGENTS.md` (read) | Layered with CAVE.md / CLAUDE.md |
| `.mcp.json` | `.mcp.json` | Identical schema |
| `.codex-plugin/plugin.json` | `.cave-plugin/plugin.json` | Compatible at root level |
| `--cd` | `--cwd` | Same semantics |
| `--ephemeral` | `--ephemeral` | Same flag |
| `codex exec` | `caveman exec` | Same JSON event stream |

## Permissions / sandbox

Caveman Code runs autopilot — there is no `--sandbox` flag, no permission prompts, and no Seatbelt/Landlock policy. If you relied on Codex's `read_only` / `workspace_write` / `danger_full_access` profiles, drop them; caveman-code will execute every tool request directly. The OS still enforces filesystem permissions and you can constrain a session by tightening the agent's `tools` list (e.g. omitting `bash`, `edit`, `write`).

## ChatGPT OAuth

Both Codex and Caveman Code authenticate against ChatGPT Plus/Pro. The Caveman Code login command is `/login chatgpt`. Tokens land in your OS keychain.

If you also have ChatGPT-keyed Codex sessions running, the two share nothing — they each have their own token cache.

## Differences

### Provider flexibility

Codex is OpenAI-only. Caveman Code supports 20+ providers and 6 OAuth flows. After migrating you can:

```bash
caveman --model claude-sonnet-4
caveman --model anthropic/claude-opus-4-7
caveman --model groq/llama-3.3-70b-versatile
```

### Caveman Mode compression

Caveman Code compresses tool output by default (~85% reduction). Codex doesn't. Expect markedly lower token bills. Disable with `--no-caveman-mode` if you suspect it's interfering.

### Daemon / app-server

Codex has a TypeScript app-server protocol. Caveman Code's [daemon](../reference/daemon.md) (`caveman serve`) plays the same role with HTTP + WS + SQLite, plus a generated TS SDK at `@juliusbrussee/caveman-sdk`.

## CI / `caveman exec`

```bash
caveman exec "lint and fix typescript errors" \
    --json \
    --output-schema schema.json \
    --skip-git-repo-check
```

Same pattern as `codex exec`. Stable JSON event stream on stdout. Exit codes documented.

## Confirming

```bash
caveman doctor
caveman mcp doctor
caveman plugin list
```

If your Codex setup includes anything Caveman Code's docs don't cover, [open a migration issue](https://github.com/JuliusBrussee/caveman-cli/issues/new?labels=migration).


  </TabItem>
</Tabs>
