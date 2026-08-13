---
id: honest-numbers
title: Honest Numbers
sidebar_position: 2
---


Caveman save tokens sometimes. Caveman cost tokens sometimes. This page say which is which, with the real numbers. No marketing. If caveman lose for your workload, this page tell you to turn it off.

## What caveman actually does

Caveman is a system-prompt skill. It makes the model **write shorter output**. That is the whole mechanism. It does not compress your input, your context, your files, or the model's thinking tokens.

## The measured numbers

| What | Number | How measured | Source |
|---|---|---|---|
| Output reduction vs default verbose replies | **Not published** | Harness exists, but repository has no committed reviewed raw result | [`benchmarks/`](https://github.com/JuliusBrussee/caveman/tree/main/benchmarks/) |
| Input reduction from the skill | **0%** | It's an output-style instruction | — |
| Input cost the skill *adds* | **~1–1.5k tokens per turn** | SKILL.md rules (~5 KB) injected into context, plus skill-list entries | [`skills/caveman/SKILL.md`](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md) |
| `/caveman-compress` on memory files | ~46% average input reduction, per session, for those files only | Real files, token counts in README table | [README](/docs/caveman/explanation/architecture) |

Token-count runs measure output length only. They do not prove semantic or technical equivalence. Publish a reduction only with committed raw pairs and separate quality review. The full eval harness and its correction history are documented in [`evals/README.md`](https://github.com/JuliusBrussee/caveman/tree/main/evals).

## When caveman wins

- **Long chatty outputs.** Explanations, architecture discussions, code review, docs, and debugging walkthroughs give a terse style more removable prose. Measure your own A/B; no aggregate reduction is currently published.
- **Long sessions with verbose agents.** The per-reply savings compound; the fixed ~1–1.5k/turn rule cost stays flat.
- **Reading speed.** Shorter replies finish sooner and you read them faster. For many users this, not cost, is the real win.

## When caveman loses (net-negative)

Plainly: **the skill costs ~1–1.5k input tokens every turn. If it saves less output than that, you are paying to use it.**

- **Terse coding Q&A** ([#145](https://github.com/JuliusBrussee/caveman/issues/145)). If your normal replies are ~150 output tokens, caveman saves maybe 70–100 of them and costs ~1k+ of input overhead per turn. Net loss. The user in #145 measured exactly this. They were right.
- **Agents that bill by request or credit, not tokens** ([#506](https://github.com/JuliusBrussee/caveman/issues/506)). GitHub Copilot charges premium *requests*. A shorter answer is the same request. Caveman cannot lower your Copilot credit use. Same logic for any per-message pricing.
- **Session-level totals** are always smaller than the output-reduction headline, because input tokens (your prompts, your context, your files, the injected rules) dwarf output tokens in agentic coding. Independent session-level measurements land around **14–21% total savings** on output-heavy workloads — and below zero on terse ones.
- **Some tool-side counters go the wrong way** ([#550](https://github.com/JuliusBrussee/caveman/issues/550)). One Cursor A/B showed 4.3M tokens with caveman vs 1M without, and double the wall-clock time. We could not reproduce the exact run, but the honest reading is: rule re-injection, retries, and cache/context accounting can swamp output savings in some agents. If your A/B looks like that, caveman is net-negative for you. Turn it off. Wanting the rock to work does not make the rock work.

## Measure it yourself

1. **`/caveman-stats`** (Claude Code) reads your real session log and prints actual input/output token counts. The "saved" line is an **estimate**: it extrapolates what the output would have been without caveman using the benchmark ratio. Real usage, estimated baseline — the output labels it `est.` for exactly that reason.
2. **The only fully honest test is an A/B**: run the same task with and without caveman and compare your provider's own usage/billing page. That number outranks anything this repo prints.
3. **Reproduce our numbers**: `benchmarks/run.py` (needs an Anthropic key) and `evals/measure.py` (offline, reads the committed snapshot).

## Rule of thumb

> Normal reply longer than ~1.5–2k output tokens → caveman probably saves you money.
> Normal reply shorter than that, or you pay per request → caveman probably costs you money.
> Either way, caveman replies faster to read. That part is free.

Found a workload where our numbers are wrong? [Open an issue](https://github.com/JuliusBrussee/caveman/issues) with the A/B. We will put it on this page.


## Evaluations & Benchmarks

Measures real token compression of caveman skills by running the same
prompts through Claude Code under three conditions and comparing the
generated output token counts.

## The three arms

| Arm | System prompt |
|-----|--------------|
| `__baseline__` | none |
| `__terse__` | `Answer concisely.` |
| `<skill>` | `Answer concisely.\n\n{SKILL.md}` |

The honest delta for any skill is **`<skill>` vs `__terse__`** — i.e.
how much the skill itself adds on top of a plain "be terse" instruction.
Comparing a skill to the no-system-prompt baseline conflates the skill
with the generic terseness ask, which is what an earlier version of
this harness did and is why its numbers were inflated.

## Why this design

- **Real LLM output**, not hand-written examples (no circularity).
- **Same Claude Code** the skills target — no separate API key.
- **Snapshot committed to git** so CI runs are deterministic and free,
  and so any change to the numbers is reviewable as a diff.
- **Control arm** isolates the skill's contribution from the generic
  "be terse" effect.

## Files

- `prompts/en.txt` — fixed list of dev questions, one per line.
- `llm_run.py` — runs `claude -p --system-prompt …` per (prompt, arm),
  captures real LLM output, writes `snapshots/results.json` along with
  metadata (model, CLI version, generation timestamp).
- `measure.py` — reads the snapshot, counts tokens with tiktoken
  `o200k_base`, prints a markdown table with median / mean / min / max /
  stdev across prompts.
- `snapshots/results.json` — committed source of truth, regenerated only
  when SKILL.md files or prompts change.

## Refresh the snapshot (requires `claude` CLI logged in)

```bash
uv run python evals/llm_run.py
```

This calls Claude once per prompt × (N skills + 2 control arms). Use
a small model to keep it cheap:

```bash
CAVEMAN_EVAL_MODEL=claude-haiku-4-5 uv run python evals/llm_run.py
```

## Read the snapshot (no LLM, no API key, runs in CI)

```bash
uv run --with tiktoken python evals/measure.py
```

## Adding a prompt

Append a line to `prompts/en.txt`, then refresh the snapshot.

## Adding a skill

Drop a `skills/<name>/SKILL.md`, then refresh the snapshot. `llm_run.py`
picks up every skill directory automatically.

## What this does NOT measure

- **Fidelity** — does the compressed answer preserve the technical
  claims? A skill that replies `k` to everything would score −99% and
  "win". A future v2 could add a judge-model rubric.
- **Latency or cost** — out of scope. Note that skills add input tokens
  on every call, so output savings are not the full economic picture.
- **Cross-model behavior** — only the model used to generate the
  snapshot is measured.
- **Exact Claude tokens** — `tiktoken o200k_base` is OpenAI's BPE and is
  only an approximation of Claude's tokenizer. Ratios between arms are
  meaningful; absolute numbers are approximate.
- **Statistical significance** — single run per (prompt, arm) at default
  temperature. The min/max/stdev columns let you eyeball whether a
  number is solid or noisy, but this is not a powered experiment.
