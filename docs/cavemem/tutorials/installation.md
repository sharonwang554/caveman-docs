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

No daemon to start. Hooks write synchronously. A local worker auto-spawns in the background on the first hook to build embeddings and serve the viewer; it self-exits when idle (set `embedding.idleShutdownMs` to `0` to keep it running until killed). Disable auto-spawn — and with it the HTTP listener — with `cavemem config set embedding.autoStart false`.

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

Claude Code runs hook commands through `sh -c` even on Windows. If Git for Windows' `Git\bin` isn't
on your user `Path`, `sh` doesn't resolve, hooks fail silently, and capture quietly stops — `cavemem
doctor`/`status` keep reporting healthy because the failure never reaches the CLI. Add
`C:\Program Files\Git\bin` (or `<scoop dir>\apps\git\current\usr\bin` for a Scoop install) to your
user `Path`, then verify with `where.exe sh`. `cavemem doctor` and `cavemem install` both check
`sh` resolvability on win32 and print a warning if it's missing.

Claude Code's hooks docs also describe a `shell` field (`"bash"` / `"powershell"`) and a shell-free
`args` exec form. We looked at emitting either instead of the plain `sh`-shaped command string, but
held off: we can't verify those fields against every Claude Code version in the wild, and the
current command has no shell metacharacters, so it already tokenizes the same way whether Claude
Code runs it through `sh` or falls back to PowerShell. Once there's a way to gate on a minimum
Claude Code version, switching to the shell-free `args` form would drop the `sh` dependency
entirely.

---