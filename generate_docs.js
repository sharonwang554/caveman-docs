const fs = require('fs');
const path = require('path');

const srcDir = '/Users/shih-yin/.gemini/antigravity/brain/34b48956-459a-4c8c-9dfb-271a1d1a3f16/scratch';
const destDir = '/Users/shih-yin/programming/caveman-docs/docs';

// Create category JSON files for sidebars
const categories = ['tutorials', 'how-to', 'reference', 'explanation'];
const titles = ['Tutorials', 'How-To', 'Reference', 'Explanation'];
['caveman-code', 'cavemem', 'cavekit', 'cavegemma'].forEach(prod => {
    categories.forEach((cat, idx) => {
        const dir = path.join(destDir, prod, cat);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, '_category_.json'), JSON.stringify({ label: titles[idx], position: idx + 1 }), 'utf8');
    });
});

function extractSection(content, startHeading, endHeading) {
    let startIndex = startHeading ? content.indexOf(startHeading) : 0;
    if (startIndex === -1) return '';
    let endIndex = endHeading ? content.indexOf(endHeading, startIndex + startHeading.length) : content.length;
    if (endIndex === -1) endIndex = content.length;
    return content.substring(startIndex, endIndex).trim();
}

function writeDoc(product, category, filename, content, frontmatter) {
    const dir = path.join(destDir, product, category);
    fs.mkdirSync(dir, { recursive: true });
    
    // Clean up content so docusaurus doesn't choke on unescaped HTML or missing imports if any
    let cleanContent = content;
    
    let finalContent = cleanContent;
    if (frontmatter) {
        finalContent = `---\n${Object.entries(frontmatter).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n\n${cleanContent}`;
    }
    
    fs.writeFileSync(path.join(dir, filename), finalContent, 'utf8');
}

// 1. caveman-code
let codeContent = fs.readFileSync(path.join(srcDir, 'caveman-code/README.md'), 'utf8');
let codeTutorials = extractSection(codeContent, '## Install', '## How It Saves Tokens');
let codeExplain = extractSection(codeContent, '', '## Install') + '\n\n' + 
                  extractSection(codeContent, '## How It Saves Tokens', '## Why Caveman Code') + '\n\n' +
                  extractSection(codeContent, '## Why Caveman Code', '## Features') + '\n\n' +
                  extractSection(codeContent, '## Acknowledgements', '');
let codeRefCLI = extractSection(codeContent, '### ⚙️ CLI flags', '### 📋 Slash commands (in TUI)');
let codeRefSub = extractSection(codeContent, '### 🚀 Subcommands', '## SDK');
let codeRefCommands = extractSection(codeContent, '### 📋 Slash commands (in TUI)', '### 🚀 Subcommands');
let codeRefFeatures = extractSection(codeContent, '## Features', '### ⚙️ CLI flags');
let codeHowTo = extractSection(codeContent, '## SDK', '## Acknowledgements');

writeDoc('caveman-code', 'tutorials', 'getting-started.md', codeTutorials, { id: 'getting-started', title: 'Getting Started', sidebar_position: 1 });
writeDoc('caveman-code', 'how-to', 'using-sdk.md', codeHowTo, { id: 'using-sdk', title: 'Using the SDK', sidebar_position: 1 });
writeDoc('caveman-code', 'reference', 'cli.md', codeRefCLI + '\n\n' + codeRefSub, { id: 'cli', title: 'CLI & Subcommands', sidebar_position: 1 });
writeDoc('caveman-code', 'reference', 'commands.md', codeRefCommands, { id: 'commands', title: 'Slash Commands', sidebar_position: 2 });
writeDoc('caveman-code', 'reference', 'features.md', codeRefFeatures, { id: 'features', title: 'Features & Architecture', sidebar_position: 3 });
writeDoc('caveman-code', 'explanation', 'architecture.md', codeExplain, { id: 'architecture', title: 'How it Works', sidebar_position: 1 });

// 2. cavemem
let memContent = fs.readFileSync(path.join(srcDir, 'cavemem/README.md'), 'utf8');
let memTutorials = extractSection(memContent, '## Install', '## How it works');
let memExplain = extractSection(memContent, '', '## Install') + '\n\n' + 
                 extractSection(memContent, '## How it works', '## CLI') + '\n\n' +
                 extractSection(memContent, '## 🪨 The Caveman Ecosystem', '');
let memRefCLI = extractSection(memContent, '## CLI', '## MCP');
let memRefMCP = extractSection(memContent, '## MCP', '## Settings');
let memRefSettings = extractSection(memContent, '## Settings', '## 🪨 The Caveman Ecosystem');

writeDoc('cavemem', 'tutorials', 'installation.md', memTutorials, { id: 'installation', title: 'Installation', sidebar_position: 1 });
writeDoc('cavemem', 'explanation', 'architecture.md', memExplain, { id: 'architecture', title: 'Architecture & Ecosystem', sidebar_position: 1 });
writeDoc('cavemem', 'reference', 'cli.md', memRefCLI, { id: 'cli', title: 'CLI', sidebar_position: 1 });
writeDoc('cavemem', 'reference', 'mcp.md', memRefMCP, { id: 'mcp', title: 'MCP', sidebar_position: 2 });
writeDoc('cavemem', 'reference', 'settings.md', memRefSettings, { id: 'settings', title: 'Settings', sidebar_position: 3 });

// 3. cavekit
let kitContent = fs.readFileSync(path.join(srcDir, 'cavekit/README.md'), 'utf8');
let kitTutorials = extractSection(kitContent, '## install', '## format');
let kitHowTo = extractSection(kitContent, '## older cavekit', '## ecosystem');
let kitRefCommands = extractSection(kitContent, '## commands', '## install');
let kitRefInternals = extractSection(kitContent, '## format', '## non-goals');
let kitExplain = extractSection(kitContent, '', '## commands') + '\n\n' + 
                 extractSection(kitContent, '## non-goals', '## older cavekit') + '\n\n' +
                 extractSection(kitContent, '## ecosystem', '');

writeDoc('cavekit', 'tutorials', 'installation.md', kitTutorials, { id: 'installation', title: 'Installation', sidebar_position: 1 });
writeDoc('cavekit', 'how-to', 'migrate-v3.md', kitHowTo, { id: 'migrate-v3', title: 'Migrate from v3', sidebar_position: 1 });
writeDoc('cavekit', 'reference', 'commands.md', kitRefCommands, { id: 'commands', title: 'Commands', sidebar_position: 1 });
writeDoc('cavekit', 'reference', 'internals.md', kitRefInternals, { id: 'internals', title: 'Format & Files', sidebar_position: 2 });
writeDoc('cavekit', 'explanation', 'philosophy.md', kitExplain, { id: 'philosophy', title: 'Philosophy & Ecosystem', sidebar_position: 1 });

// 4. cavegemma
let gemmaContent = fs.readFileSync(path.join(srcDir, 'cavegemma/README.md'), 'utf8');
let gemmaTutorials = extractSection(gemmaContent, '## Quick start', '## Training summary');
let gemmaHowTo = extractSection(gemmaContent, '## Reproduce', '## Datasets');
let gemmaRef = extractSection(gemmaContent, '## Shipped weights', '## Quick start') + '\n\n' +
               extractSection(gemmaContent, '## Repo layout', '## Reproduce') + '\n\n' +
               extractSection(gemmaContent, '## Datasets', '## Caveman ecosystem');
let gemmaExplain = extractSection(gemmaContent, '', '## Shipped weights') + '\n\n' +
                   extractSection(gemmaContent, '## Training summary', '## Repo layout') + '\n\n' +
                   extractSection(gemmaContent, '## Caveman ecosystem', '');

writeDoc('cavegemma', 'tutorials', 'quick-start.md', gemmaTutorials, { id: 'quick-start', title: 'Quick Start', sidebar_position: 1 });
writeDoc('cavegemma', 'how-to', 'reproduce.md', gemmaHowTo, { id: 'reproduce', title: 'Reproduce', sidebar_position: 1 });
writeDoc('cavegemma', 'reference', 'weights-and-datasets.md', gemmaRef, { id: 'weights', title: 'Weights & Datasets', sidebar_position: 1 });
writeDoc('cavegemma', 'explanation', 'model-metrics.md', gemmaExplain, { id: 'model-metrics', title: 'Model Metrics', sidebar_position: 1 });

console.log('Docs successfully extracted and generated!');
