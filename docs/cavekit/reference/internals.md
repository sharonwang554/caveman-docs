---
id: internals
title: Format & Files
sidebar_position: 2
---

## format

See `FORMAT.md`. Sections: §G goal, §C constraints, §I
interfaces, §R research (optional, pipe table), §V invariants, §T tasks
(pipe table), §B bugs (pipe table). Each verb owns specific sections —
no verb rewrites a section it does not own.

## files

```
FORMAT.md             spec schema + caveman encoding + sectioned ownership
commands/             seven thin slash-command entry points → the skills (loop + reach-for)
skills/spec           spec mutator — sole writer
skills/build          plan-execute, verification contract
skills/check          drift report
skills/grill          sharpen a fuzzy idea → §G/§C before spec
skills/research       external knowledge → §R, every finding sourced
skills/review         adversarial senior review of the spec → hardens §V
skills/deepen         spare-budget design pass — make one module deep
skills/caveman        encoding utility
skills/backprop       bug → spec protocol (six steps)
```