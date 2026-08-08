---
id: architecture
title: How it Works
sidebar_position: 1
---

<div align="center">

# 🪨 Caveman Code

**The terminal coding agent that talks like a caveman — and burns half the tokens doing it.**

Same model. Same task. **~2× fewer tokens than Codex.** 20+ providers · plan mode · autopilot loop · MIT.

<p>
  <a href="https://github.com/JuliusBrussee/caveman-code/stargazers"><img src="https://img.shields.io/github/stars/JuliusBrussee/caveman-code?color=d97757&style=flat-square" alt="Stars" /></a>
  <a href="https://www.npmjs.com/package/@juliusbrussee/caveman-code"><img src="https://img.shields.io/npm/v/%40juliusbrussee%2Fcaveman-code?color=2ea043&label=npm&style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@juliusbrussee/caveman-code"><img src="https://img.shields.io/npm/dm/%40juliusbrussee%2Fcaveman-code?color=2ea043&label=downloads&style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/JuliusBrussee/caveman-code/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-2ea043?style=flat-square" alt="MIT License" /></a>
</p>

<a href="#install">Install</a> ·
<a href="#-the-trick">The Trick</a> ·
<a href="#how-it-saves-tokens">How It Saves Tokens</a> ·
<a href="#why-caveman-code">Why Caveman</a> ·
<a href="#features">Features</a> ·
<a href="#sdk">SDK</a>

<img src="vhs/install.gif" width="760" alt="caveman install + first prompt — 30 seconds" />

</div>

---

## 🔥 The trick

Big agent waffle. Waffle cost token. Caveman no waffle.

**Asked** ▸ *why does this component re-render on every keystroke?*

| Ordinary agent · **~290 tokens** | 🪨 Caveman Code · **31 tokens** |
|---|---|
| Great question! A React component can re-render on every keystroke for several reasons. The most common cause is passing a fresh object or function reference as a prop on each render, which defeats React's referential-equality bail-out and forces the child to reconcile again … *(three more paragraphs)* | New object ref each render. Inline prop = new ref = re-render. Wrap in `useMemo`. |

Same answer. Same model. Caveman version costs **~9× less to read back** — and the agent reads its own context back on *every single turn*. The saving compounds across the whole session.

That is the entire product. Everything below is the coding agent it ships inside.

---

## The proof

*25-task MicroBench · `gpt-5.5` · xhigh reasoning · 2026-05-18*

| Tool | Fresh tokens | Pass rate |
|---|---|---|
| **🪨 caveman** | `████████████▌` **524k** | 14 / 25 |
| codex | `████████████████████████` 1,010k | 15 / 25 |

> **1.93× fewer tokens than Codex CLI on identical tasks.**
> Same `gpt-5.5` model. Same `xhigh` reasoning. Pass rate within one task.
>
> No marketing-deck baselines. Each tool spawned as a real child process. Each task verified by a task-specific `verify.sh`. Raw CSV + per-task logs published.

```bash
npx tsx research/evals/run-honest-bench.ts --tools caveman,codex   # reproduce in one command
```

Raw CSV · Aggregate JSON · Methodology · 25 task prompts

---

## How It Saves Tokens

Four compression layers, always on — and they hit **two** separate token sinks: what the model *says* and what the shell *returns*.

| Token sink | Layer | What happens | Cut |
|---|---|---|---|
| **Model reply** | Caveman Mode | Terse technical fragments — no filler, no hedging. Levels `lite` · `full` · `ultra`. | prompt + reply |
| **Tool output** | Tool Budgets | Per-tool line caps (bash 80 · read 300 · grep 120), ANSI strip, blank-line collapse, semantic JSON/XML extraction. | **−67% to −94%** |
| | Read Dedup | Files fingerprinted per session — re-reads return a stub, not the bytes. | **−99%** on repeats |
| | **[RTK](https://github.com/rtk-ai/rtk)** | Optional external Rust binary ("Rust Token Killer") — pipes bash output through `rtk` before it enters context. | **−60% to −90%** (RTK's own bench) |

Pays for itself after one tool call.



**<strong>Benchmark</strong> — 10 real tool-output fixtures · −86% aggregate**


```
  git diff (901 lines)   ██████████████████████████████████████████████████  -94%
  npm ls (701 lines)     ████████████████████████████████████████████████    -92%
  ls recursive (601 ln)  ███████████████████████████████████████████████     -90%
  grep results (801 ln)  █████████████████████████████████████████████       -89%
  test output (501 ln)   ████████████████████████████████████████████        -88%
  XML/pom.xml (382 ln)   ████████████████████████████████████████            -79%
  docker inspect (258)   ██████████████████████████████████                  -68%
  ANSI colored (97 ln)   █████████████████████████████                       -50%
  read file (429 lines)  ████████████████                                    -32%
  build output (19 ln)   █████████                                           -18%
                         ────────────────────────────────────────────────────
  AGGREGATE              ███████████████████████████████████████████████     -86%
```

| Metric | Value |
|---|---|
| Tokens saved (10 fixtures) | ~72,400 of 337K chars |
| System-prompt overhead | 120–195 tokens (lite–ultra) |
| Net savings — 15-turn session | **+567K tokens (~$1.70, Sonnet)** |
| Net savings — 30-turn session | **+1.13M tokens (~$6.92, Sonnet)** |

```bash
npm run bench:offline   # compression analysis — free, <1s
npm run bench:replay    # analyze your real sessions — free
npm run bench:live      # A/B with live LLM calls — needs API key
```



```bash
Use `/caveman [lite|full|ultra|off]` in the TUI to adjust compression aggressiveness.
```

---

## Why Caveman Code

| Capability | Caveman | Claude Code | Codex | Aider | opencode |
|---|:---:|:---:|:---:|:---:|:---:|
| 4-layer token compression | ✅ | ❌ | ❌ | repo map only | ❌ |
| 20+ provider OAuth | ✅ | Anthropic | ChatGPT | API keys | ✅ |
| Autonomous goal loop | ✅ | ❌ | ❌ | ❌ | ❌ |
| Autopilot — no permission prompts | ✅ | ❌ | ❌ | ✅ | ❌ |
| Repo map (PageRank, Aider-style) | ✅ | ❌ | ❌ | ✅ | ❌ |
| Architect / editor model split | ✅ | ❌ | ❌ | ✅ | ❌ |
| Session branching + shadow-git checkpoints | ✅ | ❌ | fork only | git only | ❌ |
| Persistent semantic memory (cavemem) | ✅ | MEMORY.md | ❌ | ❌ | ❌ |
| MIT open source | ✅ | closed | Apache-2.0 | Apache-2.0 | ✅ |

Full table including Crush: docs/comparison.md.

---

## Acknowledgements

**Caveman Code is a heavy fork of [pi-code](https://github.com/badlogic/pi-code) by [Mario Zechner](https://github.com/badlogic).** We track upstream and contribute fixes back where generally useful.

| From `pi-code` (upstream) | Caveman Code's own work |
|---|---|
| Agent runtime · MCP scaffolding · provider OAuth · repo map · slash-command parser · settings manager · skills loader · edit-format renderers · TUI components | Caveman Mode (4-layer compression) · goal loop · plan mode · cavemem integration · `/tree` session branching · architect/editor split · honest-bench harness |

Also indebted to [Aider](https://aider.chat) (repo map + edit-format-per-model), [Claude Code](https://www.anthropic.com/news/claude-code) (settings/commands/skills/agents/`.mcp.json` formats — adopted verbatim, then extended), [Codex](https://github.com/openai/codex) (cave-as-MCP-server), [RTK](https://github.com/rtk-ai/rtk) (optional bash-output compression layer), and [Biome](https://biomejs.dev) (single-binary lint/format).

Missing credit? [Open an issue](https://github.com/JuliusBrussee/caveman-code/issues) — we'll fix it fast.

---

## License

MIT © [Julius Brussee](https://github.com/JuliusBrussee). Forked from [pi-code](https://github.com/badlogic/pi-code) (MIT © Mario Zechner).

<div align="center">

[Issues](https://github.com/JuliusBrussee/caveman-code/issues) · [Releases](https://github.com/JuliusBrussee/caveman-code/releases) · Changelog · Docs

<sub>Caveman no waste token. Caveman ship.</sub>

</div>