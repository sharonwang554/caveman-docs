---
id: installation
title: Installation
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Choose one of the following methods to install Cavekit:

<Tabs>
  <TabItem value="cli" label="Skills CLI" default>
    One line, via the `skills` CLI:

    ```bash
    npx skills add JuliusBrussee/cavekit
    ```
  </TabItem>
  <TabItem value="marketplace" label="Marketplace">
    Via the Claude Code marketplace (also adds slash commands like `/ck:spec`, `/ck:build`):

    ```bash
    /plugin marketplace add juliusbrussee/cavekit
    /plugin install ck@cavekit
    ```
  </TabItem>
  <TabItem value="git" label="Git Clone">
    Clone directly into your plugins directory:

    ```bash
    git clone https://github.com/juliusbrussee/cavekit.git ~/.claude/plugins/cavekit
    ```
  </TabItem>
</Tabs>

## What gets installed?

Cavekit installs nine skills into `~/.claude/skills/`:

- `spec`
- `build`
- `check` (the loop)
- `grill`
- `research`
- `review`
- `deepen` (reach-for)
- `caveman` (utility)
- `backprop` (utility)

Claude activates each when its trigger context matches — e.g., "write a spec for…" invokes `spec`, a fuzzy idea invokes `grill`, a risky change before build invokes `review`. Claude Code picks them up on next launch.