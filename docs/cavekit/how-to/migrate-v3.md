---
id: migrate-v3
title: Migrate from v3
sidebar_position: 1
---

## older cavekit (the Hunt lifecycle, v3.1.0 and earlier)

The previous generation is **not deprecated** — it is frozen at tag
[`v3.1.0`](https://github.com/juliusbrussee/cavekit/tree/v3.1.0) and
remains a fully working plugin.

**What it is**:

> Spec-driven AI development with an autonomous execution loop. Four-command
> Hunt lifecycle (`/ck:sketch` → `/ck:map` → `/ck:make` → `/ck:check`),
> plus `/ck:ship`, `/ck:review`, `/ck:revise`, `/ck:status`, `/ck:design`,
> `/ck:research`, `/ck:init`, `/ck:config`, `/ck:resume`, `/ck:help` — 16
> slash commands total. 12 named sub-agents. Per-task token budgets,
> stop-hook state machine, model-tier routing, auto-backpropagation from
> test failures, tool-result caching, Codex peer review, Karpathy
> behavioral guardrails, caveman token compression, knowledge-graph
> integration, and design-system enforcement. Parallel wave execution and
> team mode.

**Pick v3.1.0** if you want the full autonomous loop, parallel agents,
peer review, or design-system workflow. **Pick v4** if you want the
distilled loop — one spec, no orchestration, right-sized ceremony.

### install the older version

Marketplace:

```bash
/plugin marketplace add juliusbrussee/cavekit@v3.1.0
/plugin install ck@cavekit
```

Git:

```bash
git clone -b v3.1.0 https://github.com/juliusbrussee/cavekit.git
```

Full docs live at the tag — `git checkout v3.1.0` and read the README
there for command reference, skill catalog, and the Hunt lifecycle guide.

### choosing, or moving

See `UPGRADE.md`. Honest framing:
- Stay on v3.1.0 if your project has active `context/kits/` investment.
- Move to v4 if you want fewer moving parts and smaller token bills.
- It is a **two-way door** — `SPEC.md` is plain markdown; nothing traps
  you in either direction.