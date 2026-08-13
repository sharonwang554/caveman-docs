# Caveman Commands Reference

Here are the commands you get with Caveman installed.

| Command | What it does |
|---|---|
| `/caveman [lite|full|ultra|wenyan]` | Compress every reply. Level sticks for the session. |
| `/caveman-commit` | Conventional Commit messages, ≤50-char subject. Why over what. |
| `/caveman-review` | One-line PR comments: `L42: 🔴 bug: user null. Add guard.` |
| `/caveman-stats` | Real session token usage, lifetime savings, USD. Tweetable line with `--share`. |
| `/caveman-compress <file>` | Rewrite a memory file (like `CLAUDE.md`) into caveman-speak. Cuts ~46% input tokens **every session after**. Code, URLs, paths byte-preserved. |
| `caveman-shrink` | MCP middleware. Wraps any MCP server, compresses its tool descriptions. |
| `cavecrew-*` | Caveman subagents (investigator, builder, reviewer). ~60% fewer tokens than vanilla, so main context lasts longer. |

> **Tip:** On Claude Code the statusline shows `[CAVEMAN] ⛏ 12.4k` — that's your lifetime tokens saved, updated on every `/caveman-stats`.
