---
title: Quickstart
description: Install Caveman Code and run your first prompt in under 30 seconds.
---


Goal: Caveman Code installed, authenticated, first prompt answered. Target time: 30 seconds.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. Install

```bash
npm install -g @juliusbrussee/caveman-code
```

Caveman Code is an AI coding agent that runs directly in your terminal. It edits files, runs commands, and uses tools within a persistent session. If you haven't installed it yet, see the [Installation](./installation.md) guide.

Verify:

```bash
caveman --version
```

## 2. Authenticate

Pick **one** of these. Caveman Code detects which keys you already have in your environment.

<Tabs>
  <TabItem value="anthropic" label="Anthropic API key" default>
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```
  </TabItem>
  <TabItem value="openai" label="OpenAI API key">
```bash
export OPENAI_API_KEY=sk-...
```
  </TabItem>
  <TabItem value="oauth" label="OAuth (Claude / ChatGPT / Gemini)">
```bash
caveman
# inside the TUI:
/login
```
  </TabItem>
</Tabs>

The OAuth flow opens a browser and stores tokens in your OS keychain (macOS Keychain, Linux libsecret, Windows Credential Manager).

See the full [Auth & Providers](../how-to/auth.md) page for the 20+ supported backends.

## 3. First prompt

```bash
caveman "explain this codebase"
```

Or open the interactive TUI:

```bash
caveman
```

Type a prompt and the agent responds. Type `/help` for the full slash-command list.

## What just happened

1. npm installed the `@juliusbrussee/caveman-code` package globally, registering two binaries: `caveman` and `caveman-code` (aliases).
2. On first launch, the wizard ran (4 questions: theme, auth, default model, telemetry off-by-default) and persisted your choice to `~/.cave/settings.json`.
3. **Caveman Mode** compression is on by default. Tool output (bash, grep, file reads) is summarized before re-entering context.

## Common next steps

| Task | Command / link |
|---|---|
| Continue your last session | `caveman -c` |
| Browse and resume past sessions | `caveman -r` |
| Pipe stdin to the agent | `cat README.md \| caveman -p "review"` |
| Switch model mid-session | `/model claude-sonnet-4` |
| Fork session to try a different path | `/fork` |
| Run in plan-only mode | `/plan` (slash command in TUI) |
| Migrate from Claude Code | [Migration guide](../how-to/migration-guides.md) |

## Troubleshooting

- `caveman: command not found` after install — restart your shell, or check that the npm global bin dir is on your PATH (`npm config get prefix`).
- Wizard didn't appear — delete `~/.cave/settings.json` and run `caveman` again.
- Auth fails on Linux — install `libsecret` (`apt install libsecret-1-0` on Debian/Ubuntu) or use API keys via env.

More: [Troubleshooting](../../troubleshooting.md).
