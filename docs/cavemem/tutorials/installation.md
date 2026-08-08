---
id: installation
title: Installation
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="claude" label="Claude Code" default>

  ```sh
  npm install -g cavemem
  cavemem install
  cavemem status
  cavemem viewer
  ```

  </TabItem>
  <TabItem value="other" label="Other IDEs">

  ```sh
  npm install -g cavemem
  # Replace cursor with: gemini-cli | opencode | codex | copilot | augment | antigravity | bob
  cavemem install --ide cursor
  cavemem status
  cavemem viewer
  ```

  </TabItem>
</Tabs>

:::info[Architecture Notes]
- **No daemon required:** Hooks write synchronously.
- **Auto-spawning worker:** A local worker spawns in the background on the first hook to build embeddings and serve the viewer. It self-exits when idle.
- **Configuration:** 
  - Set `embedding.idleShutdownMs` to `0` to keep it running indefinitely.
  - Disable auto-spawn (and the HTTP listener) with `cavemem config set embedding.autoStart false`.
:::

### IDE capability matrix

"Query" means the MCP server can search memory captured elsewhere. "Capture" means this IDE's own sessions write new observations — without it, the DB never fills for that IDE no matter how healthy `cavemem status` otherwise looks (#58).

| IDE | capture (hooks) | query (MCP) | notes |
|-----|:---:|:---:|-------|
| Claude Code | ✓ | ✓ | 5 hooks: SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd |
| OpenCode | ✓ | ✓ | via bundled bridge plugin¹ |
| Codex CLI | ✓ | ✓ | no SessionEnd event² |
| GitHub Copilot | ✓ | ✓ | no SessionEnd event² |
| Augment Code | ✓ | ✓ | no UserPromptSubmit event² |
| Cursor | — | ✓ | query-only — no hooks system |
| Gemini CLI | — | ✓ | query-only — no hooks system |
| Antigravity | — | ✓ | query-only — no hooks system |
| IBM Bob | — | ✓ | query-only — no hooks system |

¹ OpenCode has no `hooks.json`-style event system. Capture instead goes through a bundled bridge plugin (`opencodeBridge.js`, symlinked into OpenCode's plugin dir on install) that subscribes to OpenCode's native `event` and `tool.execute.after` hooks and shells out to the same `cavemem hook run` handlers every other IDE uses — same lifecycle coverage, different wiring.

² Copilot's and Codex's hook payloads are close enough to Claude Code's shape that the same handlers are reused unmodified, but neither event set is complete: Codex and Copilot have no `SessionEnd`, and Augment has no `UserPromptSubmit`. Every other lifecycle moment still fires and gets written.

Run `cavemem status` after installing to see which IDEs are wired up, with query-only ones flagged inline (`ides: claude-code, antigravity (query-only)`).

### Windows

:::warning[Windows `sh` Requirement]
Claude Code runs hook commands through `sh -c` even on Windows. If Git for Windows' `Git\bin` isn't on your user `Path`, `sh` doesn't resolve. 

When this happens:
- Hooks fail silently and capture quietly stops.
- `cavemem doctor` and `cavemem status` will falsely report healthy.

**To Fix:**
1. Add `C:\Program Files\Git\bin` (or `<scoop dir>\apps\git\current\usr\bin`) to your user `Path`.
2. Verify with `where.exe sh`. 

*(Note: `cavemem doctor` and `cavemem install` now both check `sh` resolvability on win32 and print a warning if it's missing).*
:::

:::note[Why not use native Windows Shells?]
Claude Code's hooks docs describe a `shell` field (`"bash"` / `"powershell"`) and a shell-free `args` exec form. 

We held off on emitting these because we cannot verify those fields against every Claude Code version in the wild. The current command has no shell metacharacters, so it tokenizes the same whether Claude Code runs it through `sh` or falls back to PowerShell. Once there's a way to gate on a minimum Claude Code version, switching to the shell-free `args` form will drop the `sh` dependency entirely.
:::

---