---
id: security
title: Security & Privacy
sidebar_position: 4
---

Caveman is designed to be completely secure, private, and offline-capable. This page outlines our security practices, privacy guarantees, and how to report vulnerabilities.

## Supported Versions

:::info
Only the latest stable release builds are supported with security patches. We recommend staying up-to-date.
:::

## Reporting a Vulnerability

:::warning[Do Not Open Public Issues]
If you identify a security vulnerability in caveman (such as arbitrary shell execution, workspace folder escapes, token/credentials hijack via prompts, or malicious JSON parsing flaws in extension settings), **please do not open a public issue.**
:::

Please report vulnerabilities privately by emailing the maintainers or using [GitHub's private vulnerability reporting](https://github.com/JuliusBrussee/caveman/security/advisories/new).

## Privacy & Telemetry

:::tip[Zero Telemetry Guarantee]
**Caveman has no telemetry. Zero.** No analytics, no crash reporting, no phone-home, no accounts, and no API keys collected. There is no caveman backend — nothing to send data to.
:::

### After Install: Zero Network Calls

Once installed, nothing in caveman touches the network. Every file is local and available for you to audit:

| Component | Description | Network Access |
|---|---|---|
| **The Skill** (`SKILL.md`) | A markdown prompt. It contains no code. | None |
| **Hooks** | Local Node/shell scripts that read/write local files only (flag file, session log, statusline). | None |
| **`/caveman-stats`** | Reads Claude Code's session JSONL from your local disk and prints counts. | None |
| **`caveman-shrink`** | MCP middleware that compresses output in-process. (Note: the underlying MCP server *you* configure may make network calls). | None |
| **`/caveman-compress`**| Rewrites a local file you name and saves a backup. | None |

### At Install Time: Required Network Requests

During installation, the following external requests are made:

- **Fetching the Shim:** `curl ... install.sh | bash` fetches the shim from `raw.githubusercontent.com`.
- **Downloading the Repo:** `npx` fetches the Caveman repository from GitHub.
- **Agent CLI Registries:** The installer shells out to per-agent CLIs (`claude plugin`, `gemini extensions`) which fetch from their own registries (Anthropic, GitHub, npm).

:::note[Air-Gapped / Offline Installs]
Caveman is self-contained after install and fully functional offline. There is no license server or external backend. For air-gapped environments, clone the repo internally and run the installer from the clone — **no network needed**.
:::

*Nothing is uploaded in any of these steps. Details and the full list of paths written: [Getting Started → Privacy](../tutorials/getting-started.md#privacy).*

### What Stays on Your Machine

Everything. Skill/rule files in your agents' config dirs, the mode flag file and merged `settings.json` under your config directory, the lifetime-savings statusline file, and `.original.md` backups from `/caveman-compress`. 

Uninstalling completely removes what the installer wrote: `npx -y github:JuliusBrussee/caveman -- --uninstall`.

## About Scanner Warnings

Occasionally, security scanners or antivirus software may flag Caveman due to its necessary installation behaviors:

- **Windows Defender / SmartScreen on `install.ps1` (#383):** Piping a script from the internet into `iex` and writing into agent config directories matches generic dropper heuristics. The script is short and readable in this repo. If you'd rather not pipe-to-shell, clone the repo and run `node cli/install.js` instead.
- **Snyk "High Risk" on `caveman-compress` (#28):** The compress skill instructs the agent to read a file you name, rewrite it in place, and save a backup. In-place file rewriting flags generic risk scoring. There is no network access or hidden shell execution.
