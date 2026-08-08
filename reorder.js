const fs = require('fs');
const categories = {
  "docs/caveman/_category_.json": { "label": "Caveman Skill", "position": 1 },
  "docs/cavegemma/_category_.json": { "label": "CaveGemma", "position": 2 },
  "docs/caveman-code/_category_.json": { "label": "Caveman Code", "position": 3 },
  "docs/cavemem/_category_.json": { "label": "Cavemem", "position": 4 },
  "docs/cavekit/_category_.json": { "label": "Cavekit", "position": 5 },
  "docs/caveman/tutorials/_category_.json": { "label": "Tutorials", "position": 1 },
  "docs/caveman/how-to/_category_.json": { "label": "How-To", "position": 2 },
  "docs/caveman/reference/_category_.json": { "label": "Reference", "position": 3 },
  "docs/caveman/explanation/_category_.json": { "label": "Explanation", "position": 4 }
};

for (const [path, content] of Object.entries(categories)) {
  fs.writeFileSync(path, JSON.stringify(content, null, 2), 'utf8');
}
console.log('Categories created successfully.');
