const fs = require('fs');

const docs = {
  "docs/caveman/tutorials/getting-started.md": `# Getting Started with Caveman

Caveman is a skill/plugin for Claude Code, Codex, Gemini, Cursor, Windsurf, Cline, Copilot, and 30+ other agents. Install once. Agent drops the filler and answers in tight caveman-speak, keeping code, commands, and errors byte-for-byte exact. You save output tokens on every reply, forever.

## Installation

**One command. Finds every agent on your machine. Installs for each.**

### macOS / Linux / WSL / Git Bash
\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
\`\`\`

### Windows (PowerShell 5.1+)
\`\`\`powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex
\`\`\`

It takes ~30 seconds, needs Node >=18, skips agents you don't have, and is safe to re-run.

## Enabling Caveman

- **Turn it on:** type \`/caveman\` or say *"talk like caveman"*.
- **Turn it off:** say *"normal mode"*.

> On Claude Code, Codex, and Gemini it's already on from message one. No command needed.
`,

  "docs/caveman/how-to/manage-levels.md": `# How to Manage Caveman Levels

Caveman provides six levels of verbosity. You can switch anytime using the \`/caveman <level>\` command. The level sticks until you change it or the session ends.

## Available Levels

| Level | Same sentence, shrunk |
|---|---|
| *normal agent* | You should wrap the object in \`useMemo\`, since a new reference is created on every render. |
| \`lite\` | Wrap object in \`useMemo\`. New ref created every render. |
| \`full\` *(default)* | New ref each render. Wrap object in \`useMemo\`. |
| \`ultra\` | New ref/render. \`useMemo\` it. |
| \`wenyan\` | New ref every render, so wrap in \`useMemo\` — rendered in classical Chinese, shorter still. |

> **Speak your tongue.** Caveman keeps your language. Write Portuguese, caveman grunt Portuguese. Spanish, French, same. It compresses the *style*, never translates. \`wenyan\` mode is the exception on purpose: classical Chinese packs the most meaning per token.
`,

  "docs/caveman/reference/commands.md": `# Caveman Commands Reference

Here are the commands you get with Caveman installed.

| Command | What it does |
|---|---|
| \`/caveman [lite|full|ultra|wenyan]\` | Compress every reply. Level sticks for the session. |
| \`/caveman-commit\` | Conventional Commit messages, ≤50-char subject. Why over what. |
| \`/caveman-review\` | One-line PR comments: \`L42: 🔴 bug: user null. Add guard.\` |
| \`/caveman-stats\` | Real session token usage, lifetime savings, USD. Tweetable line with \`--share\`. |
| \`/caveman-compress <file>\` | Rewrite a memory file (like \`CLAUDE.md\`) into caveman-speak. Cuts ~46% input tokens **every session after**. Code, URLs, paths byte-preserved. |
| \`caveman-shrink\` | MCP middleware. Wraps any MCP server, compresses its tool descriptions. |
| \`cavecrew-*\` | Caveman subagents (investigator, builder, reviewer). ~60% fewer tokens than vanilla, so main context lasts longer. |

> **Tip:** On Claude Code the statusline shows \`[CAVEMAN] ⛏ 12.4k\` — that's your lifetime tokens saved, updated on every \`/caveman-stats\`.
`,

  "docs/caveman/explanation/architecture.md": `# Architecture and Benchmarks

Caveman shrinks what the agent **says**, not what it knows.

## Before / After Example

| 🗣️ Normal agent — 69 tokens | 🪨 Caveman agent — 19 tokens |
|---|---|
| The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object. | New object ref each render. Inline object prop = new ref = re-render. Wrap in \`useMemo\`. |

Same fix. Third of the words. Nothing technical lost.

## Token Savings

- **Output tokens saved:** 65% (on prose)
- **Input tokens saved:** 0%
- **Technical accuracy:** 100%
- **Vibes:** OOG

That 65% is the prose number. On a full agentic coding run, where most of the output is code and tool calls, it's about 8.5%.
`,

  "docs/cavegemma/index.md": `# CaveGemma

Welcome to CaveGemma.

More details coming soon.
`,

  "docs/caveman-code/index.md": `# Caveman Code

Welcome to Caveman Code.

More details coming soon.
`,

  "docs/cavemem/index.md": `# Cavemem

Welcome to Cavemem.

More details coming soon.
`,

  "docs/cavekit/index.md": `# Cavekit

Welcome to Cavekit.

More details coming soon.
`
};

for (const [path, content] of Object.entries(docs)) {
  fs.writeFileSync(path, content, 'utf8');
}
console.log('Docs written successfully.');
