const fs = require('fs');
const path = require('path');

const docsDir = '/Users/shih-yin/programming/caveman-docs/docs';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(docsDir, (filepath) => {
    if (!filepath.endsWith('.md')) return;
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 1. Fix HTML comments
    content = content.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
    
    // 2. Fix unclosed img tags
    content = content.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
    
    // 3. Fix unclosed br tags
    content = content.replace(/<br>/g, '<br/>');
    
    // 4. Strip <details> and </details>
    content = content.replace(/<\/?details>/g, '');
    
    // 5. Replace <summary> with bold
    content = content.replace(/<summary>([\s\S]*?)<\/summary>/g, '\n**$1**\n');
    
    // 6. Fix broken local links to any file: [text](path) -> text
    // Only target links that don't start with http or #
    content = content.replace(/\[([^\]]+)\]\(((?!http|#)[^)]+)\)/g, '$1');

    
    fs.writeFileSync(filepath, content, 'utf8');
});

console.log('MDX errors and links fixed!');
