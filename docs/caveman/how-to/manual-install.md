# Manual Install

If you'd rather see exactly what runs and don't want to use the one-liner script, you can run the install script manually from a clone of the repository.

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

## Useful Flags

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

## Always-on Rules

For agents without a hook system (Cursor, Windsurf, Cline, Copilot, and friends), the always-on path is a static rule file. There are two ways to get these:

**1. Automatically via the CLI**
```bash
# Drop rule files into the current repo
node cli/install.js --with-init
```

**2. Manual Download**
```bash
# Pull the rule body straight in
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/src/rules/caveman-activate.md \
  > .cursor/rules/caveman.mdc   # or .windsurf/rules/caveman.md, .clinerules/caveman.md, .github/copilot-instructions.md
```

`--with-init` writes the rule into every supported per-agent location it can detect (`.cursor/rules/`, `.windsurf/rules/`, `.clinerules/`, `.github/copilot-instructions.md`, `.opencode/AGENTS.md`, `AGENTS.md`). It also installs the OpenClaw workspace bootstrap (skill folder + SOUL.md marker block) when `~/.openclaw/workspace/` exists.
