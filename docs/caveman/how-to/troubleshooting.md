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
- Long-running issues: see `docs/install-windows.md` in the repo for manual fallback.

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
