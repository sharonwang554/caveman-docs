---
title: Global Troubleshooting
description: Fixes for common issues across the Caveman ecosystem.
id: troubleshooting
---

When something breaks, start here. If your issue isn't covered, open a GitHub issue with `caveman doctor` output.

## Install

<details>
<summary>`cave: command not found` after install</summary>


Restart your shell, or:

```bash
source ~/.zshrc      # zsh
source ~/.bashrc     # bash
```

If still missing, the installer printed the install path — add it to your PATH.

</details>

<details>
<summary>`Operation not permitted` writing to `~/.cave`</summary>


Filesystem is read-only or owned by another user. Run:

```bash
ls -la ~/.cave
chown -R "$USER" ~/.cave
```

</details>

<details>
<summary>Apple silicon: `bad CPU type in executable`</summary>


You downloaded an x86_64 binary on an ARM Mac. Re-install via npm — the package is platform-agnostic:

```bash
npm install -g @juliusbrussee/caveman-code
```

</details>

## Auth

<details>
<summary>OAuth opens browser but never completes</summary>


1. Check that the loopback port (random in 1024-65535) isn't firewalled.
2. Try device-code auth: `caveman login --device-auth`.
3. Disable VPN that intercepts loopback.

</details>

<details>
<summary>`401 Unauthorized` on a stored token</summary>


Token expired and refresh failed. Re-login:

```bash
caveman logout <provider>
caveman login <provider>
```

</details>

<details>
<summary>Linux libsecret not found</summary>


Install:

```bash
# Debian / Ubuntu
sudo apt install libsecret-1-0 libsecret-tools

# Arch
sudo pacman -S libsecret
```

If your distro lacks libsecret, set `CAVE_INSECURE_KEYRING=1` to fall back to a plaintext token file (warning is shown).

</details>

## Sessions

<details>
<summary>Caveman Code hangs on launch</summary>


Stuck on context load. Kill and:

```bash
caveman -r --no-context     # browse without loading any session
```

Then identify and remove the bad session in `~/.cave/sessions/<cwd-hash>/`.

</details>

<details>
<summary>`/tree` shows no branches</summary>


Branching is per-session. The first session in a cwd has no branches by definition. Run a few turns then `/fork` to test.

</details>

<details>
<summary>Compaction destroyed important context</summary>


Use the shadow-git checkpoint: `/checkpoint list`, then `/rollback <N>`. Compaction itself runs a `PreCompact` hook — instrument it to write important context to disk first.

</details>

## Tools

<details>
<summary>`Bash` tool times out</summary>


Default tool timeout is 60s. Override per call:

```
> use Bash with --timeout 600 to run the long-running migration
```

Or globally in `~/.cave/settings.json`:

```json
{
    "tools": { "bash": { "timeoutMs": 600000 } }
}
```

</details>

<details>
<summary>`Edit` keeps applying to the wrong location</summary>


The model's view of the file is stale. After a hook writes to the file, ask cave to re-read:

```
> re-read src/foo.ts and apply the change
```

</details>

<details>
<summary>Caveman Mode is summarizing too aggressively</summary>


Lower compression intensity:

```bash
/caveman lite                 # default is "full" (in TUI)
/caveman off                  # turn off entirely
```

</details>

## Permissions

<details>
<summary>Every action prompts even though I clicked "Allow always"</summary>


The allow-key is more specific than the new action. E.g. `Read packages/foo/**` won't match `Read packages/bar/baz.ts`. Add a broader allow-key with `caveman permissions add "Read **"`.

</details>

<details>
<summary>Sandbox blocks something I need</summary>


`caveman debug sandbox` shows the active policy. Caveman Code executes all tool requests directly - there is no sandbox flag or permission prompts. The OS enforces filesystem permissions. To constrain a session, use `--tools` to limit available tools (e.g. `--tools read,grep,find,ls` for read-only).

For permanent allowlist, add to `permissions.json`:

```json
{
    "permissions": {
        "alwaysAllow": ["Bash:docker run *"]
    }
}
```

</details>

## MCP

<details>
<summary>`caveman mcp doctor` shows server unreachable</summary>


```bash
caveman mcp logs <server>     # tails stderr of stdio server
```

Common causes: command not on PATH, env var missing, server's auth flow incomplete.

</details>

<details>
<summary>MCP tools don't show up in the model's context</summary>


By default Caveman Code defers MCP schemas — only names are listed until the model calls `ToolSearch`. This reduces context bloat by ~85%.

</details>

## Hooks

<details>
<summary>Hook never fires</summary>


Check the matcher:

```bash
caveman hooks test PreToolUse --tool Edit --path src/foo.ts
```

Reports whether each hook would fire for that input. Common mistake: `paths` glob doesn't include the actual file path.

</details>

<details>
<summary>Hook output isn't reaching the model</summary>


Only stdout is fed back to the model as a system reminder. Stderr is logged but ignored. Check that your hook prints to stdout, not stderr.

</details>

## Memory (cavemem)

<details>
<summary>`/memory search` returns nothing</summary>


cavemem isn't running. Check:

```bash
cavemem --version
caveman mcp doctor   # should show cavemem reachable
```

If missing: `npm install -g cavemem` then `caveman init`.

</details>

<details>
<summary>Memory injection too noisy</summary>


Lower the cap in `settings.json`:

```json
{
    "memory": { "maxInjectTokens": 1000 }
}
```

Or disable for the session: `/memory off`.

</details>

## Performance

<details>
<summary>TUI feels laggy</summary>


Caveman Code automatically detects and uses synchronized output (DEC mode 2026) on supported terminals. If you see rendering issues, ensure your terminal supports ANSI escape sequences and check `caveman doctor` output for terminal detection status.

</details>

<details>
<summary>Long sessions get slow</summary>


Run `/compact` to manually compact. Or enable auto-compact at a lower threshold:

```json
{
    "session": { "autoCompactAtTokens": 80000 }
}
```

</details>

## Reporting issues

```bash
caveman doctor > /tmp/cave-doctor.txt
caveman version > /tmp/cave-version.txt
```

Attach both to a [GitHub issue](https://github.com/JuliusBrussee/caveman-cli/issues/new). Include the prompt that triggered the bug if reproducible.


## Caveman (Plugin/Skill) Specific Issues

Here is a list of common issues and how to resolve them when dealing with Caveman.

<details>
<summary>Install script broke. What now?</summary>


Open your agent in this repo and say:

> "Read CLAUDE.md and INSTALL.md. Install caveman for me."

Agent read repo. Agent run install. Caveman make agent talk less — agent first job is install caveman to talk less. Snake eat tail.

Still broken? [Open an issue](https://github.com/JuliusBrussee/caveman/issues).


</details>

<details>
<summary>I ran the installer but Claude Code isn't talking caveman.</summary>


1. Run `node cli/install.js --list` — confirm `claude` is on the detected list. If not, `claude` isn't on `PATH`. Fix that first.
2. Open `$CLAUDE_CONFIG_DIR/settings.json` (default `~/.claude/settings.json`) and look for `"hooks"` containing `caveman-activate.js` and `caveman-mode-tracker.js`. If missing, re-run with `--force`.
3. Check `$CLAUDE_CONFIG_DIR/.caveman-active` exists with content `full`. If not, the SessionStart hook silent-failed — check `$CLAUDE_CONFIG_DIR/hooks/` for the js files and try `node $CLAUDE_CONFIG_DIR/hooks/caveman-activate.js < /dev/null` to see if it errors.
4. Restart Claude Code. The SessionStart hook only fires on session start, not mid-session.


</details>

<details>
<summary>Hooks failing on Windows.</summary>


- Use `install.ps1`, not `install.sh`. Git Bash works for the shell version, but the hook side wires PowerShell counterparts (`caveman-statusline.ps1`).
- PowerShell 5.1 minimum. Check with `$PSVersionTable.PSVersion`.
- If `irm | iex` blocks on execution policy: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` for the install session, then re-run.
- Long-running issues: see the manual fallback below.

### Windows Manual Fallback

If `irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex` fails on Windows (issues #249, #199, #72), set up plugin-skill activation by hand. This does **not** install the standalone hooks or the statusline — for those, run the unified Node installer afterwards: `npx -y github:JuliusBrussee/caveman -- --only claude` (or `node cli/install.js --only claude` from a clone).

```powershell
$ClaudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME ".claude" }
$PluginSkillDir = Join-Path $ClaudeDir ".agents\plugins\caveman\skills\caveman"
$MarketplaceDir = Join-Path $ClaudeDir ".agents\plugins"
$MarketplaceFile = Join-Path $MarketplaceDir "marketplace.json"

# Copy SKILL.md into the plugin path (run from a clone of the repo)
New-Item -ItemType Directory -Path $PluginSkillDir -Force | Out-Null
Copy-Item ".\skills\caveman\SKILL.md" "$PluginSkillDir\SKILL.md" -Force

# Create or update marketplace.json with the caveman entry
New-Item -ItemType Directory -Path $MarketplaceDir -Force | Out-Null
if (Test-Path $MarketplaceFile) {
  $marketplace = Get-Content $MarketplaceFile -Raw | ConvertFrom-Json
} else {
  $marketplace = [pscustomobject]@{}
}
if (-not ($marketplace.PSObject.Properties.Name -contains "plugins")) {
  $marketplace | Add-Member -NotePropertyName plugins -NotePropertyValue ([pscustomobject]@{})
}
$plugins = [ordered]@{}
foreach ($p in $marketplace.plugins.PSObject.Properties) { $plugins[$p.Name] = $p.Value }
$plugins["caveman"] = [ordered]@{ name = "caveman"; source = "JuliusBrussee/caveman"; version = "main" }
$marketplace.plugins = [pscustomobject]$plugins
$marketplace | ConvertTo-Json -Depth 10 | Set-Content -Path $MarketplaceFile -Encoding UTF8
```

Verify: `Test-Path "$PluginSkillDir\SKILL.md"` should print `True`. Restart Claude Code, then run `/caveman` to confirm the skill loads.

#### Codex on Windows

1. Enable symlinks first: `git config --global core.symlinks true` (requires Developer Mode or admin).
2. Clone repo → Open VS Code → Codex Settings → Plugins → find "Caveman" under the local marketplace → Install → Reload Window.
3. Codex hooks are currently disabled on Windows, so use `$caveman` to start the mode manually each session.

#### `npx skills` symlink fallback

`npx skills` uses symlinks by default. If symlinks fail, add `--copy`:

```powershell
npx skills add JuliusBrussee/caveman --copy
```


</details>

<details>
<summary>My `settings.json` got mangled.</summary>


The installer uses a JSONC-tolerant parser (`cli/lib/settings.js`) so comments and trailing commas don't crash the merge. It also runs `validateHookFields()` before every write so a malformed hook can't poison the file. If something still went wrong:

1. Check for a backup at `$CLAUDE_CONFIG_DIR/settings.json.bak` (installer writes one before any merge).
2. If no backup, restore from your shell history or version control.
3. File an issue with the broken `settings.json` content (redacted) — that file passing validation but breaking Claude Code is a bug we want to fix.


</details>

<details>
<summary>I'm in a managed env where I can't install hooks.</summary>


Use the rule-file-only path. Hooks are Claude Code-specific; everything else works via static rule files:

```bash
# Just install for one agent, no Claude hooks
node cli/install.js --only cursor

# Or write rule files into the current repo only (no global state)
node cli/install.js --with-init --only cursor --only windsurf
```

This drops `.cursor/rules/caveman.mdc` (and friends) into your repo. No hooks, no global config, nothing outside the repo.


</details>

<details>
<summary>`npx skills add` errored on a profile slug.</summary>


The profile slug must exist in [vercel-labs/skills](https://github.com/vercel-labs/skills). If a row in the support matrix 404s, the upstream profile was renamed or removed — open an issue, we'll update.

</details>
