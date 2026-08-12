---
id: getting-started
title: Getting Started
sidebar_position: 1
---

Caveman is a skill/plugin for Claude Code, Codex, Gemini, Cursor, Windsurf, Cline, Copilot, and 30+ other agents. Install once. Agent drops the filler and answers in tight caveman-speak, keeping code, commands, and errors byte-for-byte exact. You save output tokens on every reply, forever.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

One install. Works for every AI coding agent on your machine.

If just want it to work, run the one-liner. If want to know what gets touched, scroll down.

## Caveman Proxy

One command wraps your agent and routes provider traffic through a local proxy. Caveman Engine powers its compression. In a pinned 54-run Claude Code benchmark, Caveman used **33.2% fewer provider-reported input tokens** than direct Claude Code while passing all 18 exact-answer checks.

No code change. In local mode, Caveman sends no prompts or outputs to a Caveman backend: the proxy forwards each request to your chosen provider, while CCR recovery copies stay on your disk. Claude Pro/Max OAuth credentials pass through to Anthropic as-is.

<p align="center">
  <img src="https://raw.githubusercontent.com/JuliusBrussee/caveman/main/docs/assets/wrap-stack.svg" alt="coding agent talks to a local caveman proxy" width="820" />
</p>

### Install the Proxy CLI

```bash
npm install -g @caveman-ai/cli
caveman setup --install   # downloads the signed runtime binaries
```

`setup --install` verifies the signed checksum manifest and the SHA-256 of every binary before an atomic install. Prefer building from source? A clone plus `scripts/install-local-cli.sh` (macOS/Linux) or `pwsh -File scripts/install-local-cli.ps1` (Windows) still works — that path needs Go and `pnpm`. SDK users can point provider base URLs at the local Proxy directly (`ANTHROPIC_BASE_URL=http://127.0.0.1:8787/anthropic`).

```bash
caveman claude                  # full stack (default): S4 compress + TOON best-of + caveman & browse MCP tools + output shrink
caveman wrap --off codex        # byte-safe pass-through metering only
caveman wrap --pixel claude     # lossy text → PNG pixel mode (model-gated)
```

## One-liner

<Tabs>
  <TabItem value="mac" label="macOS / Linux">
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

> Piping a script straight into a shell runs it sight-unseen. If you'd rather read it first, download then run: `curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh -o install.sh` (review it) `&& bash install.sh`. The installer downloads hook files from a pinned release tag and verifies them against a committed SHA-256 manifest before writing.

What it does:

- Auto-detects every supported agent installed on your machine (Claude Code, Cursor, Codex, etc.).
- For each one, runs that agent's native install path (plugin / extension / rule file / `npx skills add`).
- Installs Cavecrew investigator, builder, and reviewer presets where the host supports native subagents.
- Wires Claude Code hooks and statusline badge on top. (`caveman-shrink` MCP middleware is opt-in via `--with-mcp-shrink` — see flag table below.)
- Skips anything you don't have. Safe to re-run. ~30 seconds end-to-end.

Want to preview before installing? Use `--dry-run`:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash -s -- --dry-run
```

## Per-agent install

If you want to install for one agent (or want to know exactly what command runs under the hood), use the table below. Every row also works as `--only <id>` to the unified installer.

| Agent | Install command | Auto-activates? |
|---|---|:-:|
| **Claude Code** | `claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman` | Yes |
| **Gemini CLI** | `gemini extensions install https://github.com/JuliusBrussee/caveman --consent` | Yes |
| **opencode** | `node cli/install.js --only opencode` *(or `npx -y github:JuliusBrussee/caveman -- --only opencode`)* | Yes (plugin + AGENTS.md) |
| **OpenClaw** | `npx -y github:JuliusBrussee/caveman -- --only openclaw` | Yes (workspace skill + SOUL.md) |
| **Hermes Agent** | `npx -y github:JuliusBrussee/caveman -- --only hermes` *(or `node cli/install.js --only hermes` from a clone)* | Yes (native skills, enabled on load) |
| **Codex CLI** | `npx skills add JuliusBrussee/caveman -a codex` | Per-session: `/caveman` |
| **Cursor** | `npx skills add JuliusBrussee/caveman -a cursor` | Per-session by default; `--with-init` for an always-on rule file |
| **Windsurf** | `npx skills add JuliusBrussee/caveman -a windsurf` | Per-session by default; `--with-init` for an always-on rule file |
| **Cline** | `npx skills add JuliusBrussee/caveman -a cline` | Per-session by default; `--with-init` for an always-on rule file |
| **GitHub Copilot** *(soft probe)* | `npx -y github:JuliusBrussee/caveman -- --only copilot --with-init` | Repo-wide instructions via `--with-init` |
| **Continue** | `npx skills add JuliusBrussee/caveman -a continue` | No — say `/caveman` |
| **Kilo Code** | `npx skills add JuliusBrussee/caveman -a kilo` | No |
| **Roo Code** | `npx skills add JuliusBrussee/caveman -a roo` | No |
| **Augment Code** | `npx skills add JuliusBrussee/caveman -a augment` | No |
| **Aider Desk** | `npx skills add JuliusBrussee/caveman -a aider-desk` | No |
| **Sourcegraph Amp** | `npx skills add JuliusBrussee/caveman -a amp` | No |
| **IBM Bob** | `npx skills add JuliusBrussee/caveman -a bob` | No |
| **Crush** | `npx skills add JuliusBrussee/caveman -a crush` | No |
| **Devin (terminal)** | `npx skills add JuliusBrussee/caveman -a devin` | No |
| **Droid (Factory)** | `npx skills add JuliusBrussee/caveman -a droid` | No |
| **ForgeCode** | `npx skills add JuliusBrussee/caveman -a forgecode` | No |
| **Block Goose** | `npx skills add JuliusBrussee/caveman -a goose` | No |
| **iFlow CLI** | `npx skills add JuliusBrussee/caveman -a iflow-cli` | No |
| **Kiro CLI** | `npx skills add JuliusBrussee/caveman -a kiro-cli` | No |
| **Mistral Vibe** | `npx skills add JuliusBrussee/caveman -a mistral-vibe` | No |
| **OpenHands** | `npx skills add JuliusBrussee/caveman -a openhands` | No |
| **Qwen Code** | `npx skills add JuliusBrussee/caveman -a qwen-code` | No |
| **Atlassian Rovo Dev** | `npx skills add JuliusBrussee/caveman -a rovodev` | No |
| **Tabnine CLI** | `npx skills add JuliusBrussee/caveman -a tabnine-cli` | No |
| **Trae** | `npx skills add JuliusBrussee/caveman -a trae` | No |
| **Warp** | `npx skills add JuliusBrussee/caveman -a warp` | No |
| **Replit Agent** | `npx skills add JuliusBrussee/caveman -a replit` | No |
| **JetBrains Junie** *(soft probe)* | `npx skills add JuliusBrussee/caveman -a junie` | No |
| **Qoder** *(soft probe)* | `npx skills add JuliusBrussee/caveman -a qoder` | No |
| **Google Antigravity** *(soft probe)* | `npx skills add JuliusBrussee/caveman -a antigravity` | No |

"Soft probe" = installer won't auto-detect these without `--only <id>` because there's no reliable always-on signal (Copilot subscription state is auth-gated; the others have no CLI / config-dir-only). Pass the flag when you want them.

For "auto-activates? No" agents, type `/caveman` once per session (or use natural-language triggers like "talk like caveman", "caveman mode").

**Finding a profile slug for `npx skills add ... -a <profile>`?** Either read the table above, or print the live matrix from the installer:

```bash
# Either of these works (install.sh / install.ps1 are thin shims that
# forward all flags to cli/install.js):
bash install.sh --list             # macOS / Linux / WSL, from a local clone
pwsh install.ps1 --list            # Windows / PowerShell, from a local clone
node cli/install.js --list         # any platform, from a local clone
npx -y github:JuliusBrussee/caveman -- --list   # no clone needed
```

Each row prints the agent id, profile slug (where applicable), and whether it was auto-detected on your machine. Full agent matrix (with detection rules) is also defined in `cli/install.js` under the `PROVIDERS` array.

## Manual install (no `curl | bash`)

If you'd rather see exactly what runs:

```bash
# Clone the repo
git clone https://github.com/JuliusBrussee/caveman.git
cd caveman

# Preview every command the installer would run
node cli/install.js --dry-run --all

# Inspect the agent matrix
node cli/install.js --list

# Install for everything detected
node cli/install.js --all
```

Useful flags:

| Flag | What |
|---|---|
| `--all` | Plugin + hooks + statusline + per-repo rule files in `$PWD`. (MCP shrink is opt-in — see `--with-mcp-shrink` below.) |
| `--minimal` | Plugin / extension only. No hooks, no MCP shrink, no per-repo rules. |
| `--only <id>` | One agent only. Repeatable: `--only claude --only cursor`. |
| `--dry-run` | Print every command. Write nothing. |
| `--with-init` | Drop always-on rule files into the current repo (`.cursor/`, `.windsurf/`, `.clinerules/`, `.github/copilot-instructions.md`, `.opencode/AGENTS.md`, `AGENTS.md`) and, if OpenClaw is on the box, append the bootstrap block to `~/.openclaw/workspace/SOUL.md`. |
| `--with-mcp-shrink="<upstream cmd>"` | Register `caveman-shrink` MCP proxy wrapping the given upstream MCP server. **Off by default.** A value is required — caveman-shrink is a proxy and exits immediately without one. Example: `--with-mcp-shrink="npx @modelcontextprotocol/server-filesystem /tmp"`. The value is split on whitespace; for paths-with-spaces, install via `node cli/install.js` from a clone or edit `~/.claude.json` after a stub install. |
| `--no-mcp-shrink` | Skip MCP-shrink registration. (Default.) |
| `--with-hooks` / `--no-hooks` | Force-on or force-off the Claude Code hook installer. (Default: on.) |
| `--skip-skills` | Don't run the npx-skills auto-detect fallback when nothing else matched. |
| `--config-dir <path>` | Claude Code config dir for hook files + `settings.json`. **Does NOT scope** `claude plugin install`, `gemini extensions install`, opencode (`XDG_CONFIG_HOME`), or openclaw (`OPENCLAW_WORKSPACE`) — those use their own paths. Default: `$CLAUDE_CONFIG_DIR` or `~/.claude`. `~` is expanded. |
| `--non-interactive` | Never prompt; use defaults. (Auto when stdin is not a TTY.) |
| `--no-color` | Disable ANSI colors. |
| `--list` | Print full agent matrix and exit. |
| `--force` | Re-run even if already installed. |
| `--uninstall` | Remove everything. See below. |

## Always-on rules

For agents without a hook system (Cursor, Windsurf, Cline, Copilot, and friends), the always-on path is a static rule file. Two ways:

```bash
# Drop rule files into the current repo
node cli/install.js --with-init

# Or pull the rule body straight in (manual)
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/src/rules/caveman-activate.md \
  > .cursor/rules/caveman.mdc   # or .windsurf/rules/caveman.md, .clinerules/caveman.md, .github/copilot-instructions.md
```

`--with-init` writes the rule into every supported per-agent location it can detect (`.cursor/rules/`, `.windsurf/rules/`, `.clinerules/`, `.github/copilot-instructions.md`, `.opencode/AGENTS.md`, `AGENTS.md`). It also installs the OpenClaw workspace bootstrap (skill folder + SOUL.md marker block) when `~/.openclaw/workspace/` exists. Single source: [`src/rules/caveman-activate.md`](https://github.com/JuliusBrussee/caveman/blob/main/src/rules/caveman-activate.md).

## Verify

After install, three quick checks:

**1. See what got installed.**

```bash
node cli/install.js --list
```

You should see ~30 rows. Detected agents are marked. Anything you wanted but isn't marked → not detected (likely the binary isn't on `PATH`).

**2. Talk to Claude Code.**

Open Claude Code, type `/caveman`. Response should be terse fragments — "Got it. Caveman mode on." or similar. Try a real question: "What is closures in JS?" — answer should drop articles and read like grunts.

**3. Check the flag file.**

```bash
cat "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.caveman-active"
# expected output: full
```

If it's missing or empty, the SessionStart hook didn't fire. Check the [Troubleshooting](../../troubleshooting.md) guide for help.

Statusline should show `[CAVEMAN]` (orange) at the bottom of Claude Code. After your first `/caveman-stats` run it appends a savings counter like `[CAVEMAN] ⛏ 12.4k`.


## Privacy

The installer doesn't phone home. It writes to:

- `$CLAUDE_CONFIG_DIR` (default `~/.claude/`) — hooks, flag file, `settings.json` merge.
- Each agent's own config location — Cursor's `.cursor/rules/`, Windsurf's `.windsurf/rules/`, opencode's `~/.config/opencode/`, etc.
- Your current working directory (only with `--with-init`) — repo-local rule files.
- `~/.openclaw/workspace/` (only with `--only openclaw` or `--with-init` when OpenClaw is detected) — the one `--with-init` side-effect outside the cwd.

No telemetry. No analytics. Run from a clone or via npx, the installer's own code makes no network calls — files are copied locally. One exception: run detached from any checkout (the rare curl-fallback path), it downloads the hook files from raw.githubusercontent.com pinned to an immutable release tag and verifies each against a SHA-256 manifest before wiring anything. Network requests also happen indirectly through the per-agent CLIs it shells out to — `claude plugin marketplace add`, `claude plugin install`, `gemini extensions install`, `npm view caveman-shrink`, and `npx -y skills add`. Each fetches from its own registry (Anthropic / GitHub / npm). Source: [`cli/install.js`](https://github.com/JuliusBrussee/caveman/blob/main/cli/install.js). After install: zero network calls, ever — full statement in [SECURITY.md](../explanation/security.md#privacy--telemetry).

---

Stuck? Open an issue: [https://github.com/JuliusBrussee/caveman/issues](https://github.com/JuliusBrussee/caveman/issues)


## Enabling Caveman

- **Turn it on:** type `/caveman` or say *"talk like caveman"*.
- **Turn it off:** say *"normal mode"*.

> On Claude Code, Codex, and Gemini it's already on from message one. No command needed.


