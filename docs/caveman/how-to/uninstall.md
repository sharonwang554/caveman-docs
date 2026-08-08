# Uninstall Caveman

To completely remove Caveman from your system, you can use the unified uninstaller script via `npx`.

```bash
npx -y github:JuliusBrussee/caveman -- --uninstall
```

## What it removes:

- Caveman hook entries from `$CLAUDE_CONFIG_DIR/settings.json` (default `~/.claude/`; matched by the substring `caveman`).
- Hook files in `$CLAUDE_CONFIG_DIR/hooks/` (`caveman-activate.js`, `caveman-mode-tracker.js`, `caveman-stats.js`, `caveman-config.js`, `caveman-statusline.{sh,ps1}`, plus the dir's `package.json` marker).
- The Claude Code plugin and the Gemini CLI extension (if installed).
- The opencode native plugin (`~/.config/opencode/plugins/caveman/`, the `plugin` and `mcp.caveman-shrink` entries from `opencode.json`, our skill/agent/command files, the caveman block from `AGENTS.md`, and the opencode flag file).
- The OpenClaw workspace skill folder and the marker-fenced block from `~/.openclaw/workspace/SOUL.md` (when present).
- The `.caveman-active` flag file.

## What it does **not** remove:

- **Skills installed via `npx skills add`** — the `skills` CLI manages those. Run `npx skills remove caveman` (or use your IDE's skill manager) to remove them.
- **Per-repo rule files** written by `--with-init` (`.cursor/rules/`, `.windsurf/rules/`, `.clinerules/`, `.github/copilot-instructions.md`, `.opencode/AGENTS.md`, `AGENTS.md`). Delete these manually if you no longer want them in your repository.
