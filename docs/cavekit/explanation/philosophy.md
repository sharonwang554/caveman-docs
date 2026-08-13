---
id: philosophy
title: Philosophy & Ecosystem
sidebar_position: 1
---

# Cavekit Philosophy

**Compressed spec-driven development for Claude Code**
*One file · one loop · zero sub-agents*

## What this is

Plan-then-execute forgets. SDD remembers — but most SDD frameworks bury
that value under agent swarms, dashboards, and ceremony that costs more
tokens than it saves.

Cavekit is the simplest full loop: **grill → spec → research → review →
build**, over one `SPEC.md` file, no sub-agents. Three commands you run
every time; four more you reach for only when the change earns it.

The spine is three properties that earn their tokens:

- **durable spec** — `SPEC.md` at repo root survives context resets. It is
  the agent's long-term memory: lose the window, reload the spec, keep going.
- **caveman encoding** — ~75% fewer tokens than prose. Symbols, fragments,
  pipe tables. All nine skill descriptions cost ~1.1k context — 16× lighter
  than spec-kit's 18.6k. That is the whole point.
- **backprop reflex** — every test failure becomes a `§B` entry; classes
  of bug become `§V` invariants the spec never forgets.

And one rule that keeps it from bloating into the frameworks it replaces:
**right-size**. A one-line fix is just `/build`. The full chain is for
genuinely uncertain or high-blast-radius work — never for a typo.

## non-goals

- no sub-agents. Main Claude does the work.
- no dashboards. `cat SPEC.md` is the dashboard.
- no parallel workers. One thread, one spec, one diff.
- no JSON / YAML spec bodies. Markdown + pipe tables.
- no hooks, no orchestration binaries, no TypeScript helpers.

---

## ecosystem

Cavekit is one rock in the caveman family:

| repo | what |
|---|---|
| [caveman](https://github.com/JuliusBrussee/caveman) | output compression skill — *why use many token when few do trick* |
| [cavemem](https://github.com/JuliusBrussee/cavemem) | cross-agent persistent memory — *why agent forget when agent can remember* |
| **cavekit** *(you here)* | spec-driven build loop — *why agent guess when agent can know* |
| [cavegemma](https://github.com/JuliusBrussee/finetune-caveman) | Gemma 4 31B fine-tuned on caveman pairs — *why prompt every turn when weight remember* |

## philosophy

:::tip[Core Principle]
The spec is the only artifact that earns its tokens. Everything else that costs tokens must either save more tokens later, or the user's attention, or it gets cut.
:::

See [Changelog](/docs/cavekit/reference/changelog) for the full v3 → v4 break.