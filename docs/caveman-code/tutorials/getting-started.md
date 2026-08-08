---
id: getting-started
title: Getting Started
sidebar_position: 1
---

## Install

```bash
npm install -g @juliusbrussee/caveman-code
```

Installs two binaries — `caveman` (primary) and `caveman-code` (alias). Same command, pick either.

```bash
export ANTHROPIC_API_KEY=sk-ant-...     # or any supported provider's key
caveman                                 # launch the TUI
caveman "explain this codebase"          # one-shot
caveman -p "summarize this"              # print mode (non-interactive)
caveman goal start "ship feature X"      # autonomous Ralph loop
```



**<strong>Other install paths</strong> — pnpm · yarn · bun · Docker · OAuth login**


```bash
pnpm add -g @juliusbrussee/caveman-code
yarn global add @juliusbrussee/caveman-code
bun  add -g @juliusbrussee/caveman-code

# Docker
docker run --rm -it -v "$PWD:/work" ghcr.io/juliusbrussee/caveman-code:latest

# No API key? Use a subscription you already pay for:
caveman && /login   # Claude Pro · ChatGPT Plus · Copilot · Gemini · Antigravity
```

CI / headless install: docs/getting-started/installation.md.



---

## Quick Start

```bash
caveman                            # interactive TUI
caveman "fix the failing tests"     # start with a prompt
caveman -p "summarize this file"    # non-interactive: print and exit
cat err.log | caveman -p "debug"    # pipe stdin
caveman -c                          # continue last session
caveman -r                          # browse + resume sessions
caveman /plan                       # plan mode — read-only (slash command)
caveman goal start "ship payments v2"   # autonomous Ralph loop
```

Type `/` inside the TUI for every slash command. Reference: docs/reference/slash-commands.md.

---