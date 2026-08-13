---
id: internals
title: Format & Files
sidebar_position: 2
---

## Format

See the [Format Spec](/docs/cavekit/reference/format). 

Sections include:
- `§G` Goal
- `§C` Constraints
- `§I` Interfaces
- `§R` Research (optional, pipe table)
- `§V` Invariants
- `§T` Tasks (pipe table)
- `§B` Bugs (pipe table)

Each verb owns specific sections — no verb rewrites a section it does not own.

## Files

| File / Directory | Purpose |
|---|---|
| `FORMAT.md` | Spec schema + caveman encoding + sectioned ownership |
| `commands/` | Seven thin slash-command entry points → the skills (loop + reach-for) |
| `skills/spec` | Spec mutator — sole writer |
| `skills/build` | Plan-execute, verification contract |
| `skills/check` | Drift report |
| `skills/grill` | Sharpen a fuzzy idea → `§G`/`§C` before spec |
| `skills/research` | External knowledge → `§R`, every finding sourced |
| `skills/review` | Adversarial senior review of the spec → hardens `§V` |
| `skills/deepen` | Spare-budget design pass — make one module deep |
| `skills/caveman` | Encoding utility |
| `skills/backprop` | Bug → spec protocol (six steps) |