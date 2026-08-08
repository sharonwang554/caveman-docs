---
id: commands
title: Commands
sidebar_position: 1
---

## commands

**the loop** — run these every time:

| cmd | job |
|---|---|
| `/ck:spec` | create / amend / backprop `SPEC.md`. Sole mutator. |
| `/ck:build` | native plan → execute against spec. Names which test proves each `§V`. Auto-backprops on failure. |
| `/ck:check` | read-only drift report. Lists §V / §I / §T violations. The drift detector. |

**reach for these** — only when the change earns the ceremony:

| cmd | job |
|---|---|
| `/ck:grill` | interrogate a fuzzy idea into a sharp `§G`/`§C`, one question at a time, before you spec. |
| `/ck:research` | gather external knowledge into `§R` so build grounds in facts, not hallucinations. Every finding cites a source. |
| `/ck:review` | adversarial senior review of the spec *before* build. Refutes, hardens `§V`, ends in a go/no-go gate. |
| `/ck:deepen` | spare-budget design pass — make one shallow module deep. Behavior held, tests green before & after. |