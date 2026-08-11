# Troubleshooting

Here is a list of common issues and how to resolve them when dealing with Caveman.

## "Install script broke. What now?"

Open your agent in this repo and say:

> "Read CLAUDE.md and INSTALL.md. Install caveman for me."

Agent read repo. Agent run install. Caveman make agent talk less — agent first job is install caveman to talk less. Snake eat tail.

Still broken? [Open an issue](https://github.com/JuliusBrussee/caveman/issues).

## "I ran the installer but Claude Code isn't talking caveman."

1. Run `node cli/install.js --list` — confirm `claude` is on the detected list. If not, `claude` isn't on `PATH`. Fix that first.
2. Open `$CLAUDE_CONFIG_DIR/settings.json` (default `~/.claude/settings.json`) and look for `"hooks"` containing `caveman-activate.js` and `caveman-mode-tracker.js`. If missing, re-run with `--force`.
3. Check `$CLAUDE_CONFIG_DIR/.caveman-active` exists with content `full`. If not, the SessionStart hook silent-failed — check `$CLAUDE_CONFIG_DIR/hooks/` for the js files and try `node $CLAUDE_CONFIG_DIR/hooks/caveman-activate.js < /dev/null` to see if it errors.
4. Restart Claude Code. The SessionStart hook only fires on session start, not mid-session.

## "Hooks failing on Windows."

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

## "My `settings.json` got mangled."

The installer uses a JSONC-tolerant parser (`cli/lib/settings.js`) so comments and trailing commas don't crash the merge. It also runs `validateHookFields()` before every write so a malformed hook can't poison the file. If something still went wrong:

1. Check for a backup at `$CLAUDE_CONFIG_DIR/settings.json.bak` (installer writes one before any merge).
2. If no backup, restore from your shell history or version control.
3. File an issue with the broken `settings.json` content (redacted) — that file passing validation but breaking Claude Code is a bug we want to fix.

## "I'm in a managed env where I can't install hooks."

Use the rule-file-only path. Hooks are Claude Code-specific; everything else works via static rule files:

```bash
# Just install for one agent, no Claude hooks
node cli/install.js --only cursor

# Or write rule files into the current repo only (no global state)
node cli/install.js --with-init --only cursor --only windsurf
```

This drops `.cursor/rules/caveman.mdc` (and friends) into your repo. No hooks, no global config, nothing outside the repo.

## "`npx skills add` errored on a profile slug."

The profile slug must exist in [vercel-labs/skills](https://github.com/vercel-labs/skills). If a row in the support matrix 404s, the upstream profile was renamed or removed — open an issue, we'll update.
