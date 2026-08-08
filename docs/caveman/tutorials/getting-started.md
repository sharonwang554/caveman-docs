# Getting Started with Caveman

Caveman is a skill/plugin for Claude Code, Codex, Gemini, Cursor, Windsurf, Cline, Copilot, and 30+ other agents. Install once. Agent drops the filler and answers in tight caveman-speak, keeping code, commands, and errors byte-for-byte exact. You save output tokens on every reply, forever.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

**One command. Finds every agent on your machine. Installs for each.**

<Tabs>
  <TabItem value="mac" label="macOS / Linux / WSL" default>
    ```bash
    curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
    ```
  </TabItem>
  <TabItem value="win" label="Windows (PowerShell)">
    ```powershell
    irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex
    ```
  </TabItem>
</Tabs>

It takes ~30 seconds, needs Node >=18, skips agents you don't have, and is safe to re-run.

## Enabling Caveman

- **Turn it on:** type `/caveman` or say *"talk like caveman"*.
- **Turn it off:** say *"normal mode"*.

> On Claude Code, Codex, and Gemini it's already on from message one. No command needed.

## Verify Installation

After install, run three quick checks to ensure everything is wired correctly:

**1. See what got installed**

```bash
node cli/install.js --list
```
You should see ~30 rows. Detected agents are marked. If an agent you wanted isn't marked, it likely means its binary isn't on your `PATH`.

**2. Talk to Claude Code**

Open Claude Code and type `/caveman`. The response should be terse fragments — "Got it. Caveman mode on." or similar. Try asking a real question like *"What is closures in JS?"* — the answer should drop articles and read like grunts.

**3. Check the flag file**

```bash
cat "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.caveman-active"
```
The expected output is `full`. If the file is missing or empty, the SessionStart hook didn't fire properly. Check the [Troubleshooting](../how-to/troubleshooting.md) guide for help.
