const fs = require('fs');

const staticFiles = {
  "static/llms.txt": `# Caveman Ecosystem Documentation

This portal contains documentation for the Caveman ecosystem, including Caveman, CaveGemma, Caveman Code, Cavemem, and Cavekit.

Caveman is a skill/plugin for coding agents (Claude Code, Codex, Gemini, Cursor, etc.) that makes the agent talk like a caveman to save output tokens (up to 65% on prose) while maintaining exact technical accuracy.

## Caveman Levels
- lite
- full (default)
- ultra
- wenyan

## Caveman Commands
- /caveman <level>
- /caveman-commit
- /caveman-review
- /caveman-stats
- /caveman-compress <file>
`,

  "static/humans.txt": `/* TEAM */
Author: Julius Brussee
Contributor: Sharon Wang (docusaurus-template)

/* SITE */
Last update: 2026/08
Framework: Docusaurus
`,

  "static/robots.txt": `User-agent: *
Allow: /
`
};

for (const [path, content] of Object.entries(staticFiles)) {
  fs.writeFileSync(path, content, 'utf8');
}
console.log('Static files written successfully.');
