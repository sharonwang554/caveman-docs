---
title: Caveman Code
slug: /caveman-code/
---

# 🪨 Caveman Code

**The terminal coding agent that talks like a caveman — and burns half the tokens doing it.**

Same model. Same task. **~2× fewer tokens than Codex.** Supports 20+ providers, plan mode, autopilot loop, and more.

Use the sidebar to explore Caveman Code's commands, features, and setup.

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

## How It Saves Tokens

Four compression layers, always on — and they hit **two** separate token sinks: what the model *says* and what the shell *returns*.

| Token sink | Layer | What happens | Cut |
|---|---|---|---|
| **Model reply** | Caveman Mode | Terse technical fragments — no filler, no hedging. Levels `lite` · `full` · `ultra`. | prompt + reply |
| **Tool output** | Tool Budgets | Per-tool line caps (bash 80 · read 300 · grep 120), ANSI strip, blank-line collapse, semantic JSON/XML extraction. | **−67% to −94%** |
| | Read Dedup | Files fingerprinted per session — re-reads return a stub, not the bytes. | **−99%** on repeats |
| | **[RTK](https://github.com/rtk-ai/rtk)** | Optional external Rust binary ("Rust Token Killer") — pipes bash output through `rtk` before it enters context. | **−60% to −90%** (RTK's own bench) |

Pays for itself after one tool call.

<details>
<summary><strong>Benchmark</strong> — 10 real tool-output fixtures · −86% aggregate</summary>

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

</details>

:::tip[Caveman Levels]

Use `/caveman [lite|full|ultra|off]` in the TUI to adjust compression aggressiveness.

:::

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

Full table including Crush: [docs/comparison.md](explanation/comparison.md).
