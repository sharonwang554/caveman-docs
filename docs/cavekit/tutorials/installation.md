---
id: installation
title: Installation
sidebar_position: 1
---

## install

One line, via the `skills` CLI:

```bash
npx skills add JuliusBrussee/cavekit
```

Installs nine skills into `~/.claude/skills/`: `spec`, `build`, `check`
(the loop), `grill`, `research`, `review`, `deepen` (reach-for), plus
`caveman` and `backprop` (the utilities). Claude activates each when its
trigger context matches — e.g. "write a spec for…" invokes `spec`, a fuzzy
idea invokes `grill`, a risky change before build invokes `review`. Claude
Code picks them up on next launch.

Or via the Claude Code marketplace (also adds the `/ck:spec`, `/ck:build`,
`/ck:check`, `/ck:grill`, `/ck:research`, `/ck:review`, `/ck:deepen` slash
commands):

```bash
/plugin marketplace add juliusbrussee/cavekit
/plugin install ck@cavekit
```

Or clone directly:

```bash
git clone https://github.com/juliusbrussee/cavekit.git ~/.claude/plugins/cavekit
```