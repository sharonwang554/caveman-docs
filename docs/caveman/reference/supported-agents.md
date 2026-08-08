# Supported Agents Matrix

Caveman supports a vast array of terminal and GUI-based AI coding agents. 

If you want to install for one specific agent (or want to know exactly what command runs under the hood), use the table below. Every row also works as `--only <id>` for the unified installer script.

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

## Notes

- **"Soft probe"**: The unified installer won't auto-detect these without passing `--only <id>` because there's no reliable always-on signal to check on your filesystem (e.g., Copilot subscription state is auth-gated). Pass the flag explicitly when you want them.
- **"Auto-activates? No"**: For these agents, you must type `/caveman` once per session (or use natural-language triggers like "talk like caveman", "caveman mode").

## Finding a Profile Slug

To find a profile slug for `npx skills add ... -a <profile>`, you can either read the table above, or print the live matrix directly from the installer:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="mac" label="macOS / Linux / WSL" default>
    ```bash
    bash install.sh --list
    ```
  </TabItem>
  <TabItem value="win" label="Windows (PowerShell)">
    ```powershell
    pwsh install.ps1 --list
    ```
  </TabItem>
  <TabItem value="node" label="Node (local clone)">
    ```bash
    node cli/install.js --list
    ```
  </TabItem>
  <TabItem value="npx" label="No clone (npx)">
    ```bash
    npx -y github:JuliusBrussee/caveman -- --list
    ```
  </TabItem>
</Tabs>

Each row prints the agent id, profile slug (where applicable), and whether it was auto-detected on your machine. The full agent matrix (with detection rules) is also defined in `cli/install.js` under the `PROVIDERS` array.
