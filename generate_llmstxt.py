import os
import re

# Suites and their descriptions
suites = {
    'caveman': 'Caveman - Original skill making agents read and write less.'
}

order = ['caveman']

def extract_title_desc(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    title = ''
    
    # Try frontmatter
    fm_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if fm_match:
        fm = fm_match.group(1)
        t_match = re.search(r'^title:\s*(.+)$', fm, re.MULTILINE)
        if t_match:
            title = t_match.group(1).strip("'\"")
    
    # If no frontmatter title, look for # Title
    if not title:
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if h1_match:
            title = h1_match.group(1).strip()
            
    if not title:
        title = os.path.basename(filepath).replace('.md', '').replace('-', ' ').title()
        
    return title

llms_content = []
llms_content.append("# Caveman Ecosystem Documentation\n")
llms_content.append("> Official documentation for the Caveman ecosystem.\n\n")
llms_content.append("> Note: This documentation portal is generated based on commit 99a9aa2f5a45097fc3563febea7d0baf64407441 of the original repo on August 19, 2026. Please refer to the original repo (https://github.com/JuliusBrussee/caveman) for the latest updates.\n\n")

for suite in order:
    llms_content.append(f"## {suite.replace('-', ' ').title()}")
    llms_content.append(f"> {suites[suite]}\n")
    
    # Get files for this suite
    base_dir = os.path.join('docs', suite)
    
    # Read index.md first
    index_file = os.path.join(base_dir, 'index.md')
    if os.path.exists(index_file):
        title = extract_title_desc(index_file)
        url = f'/docs/{suite}/'
        llms_content.append(f"- [{title}]({url})")
        
    for category in ['tutorials', 'how-to', 'reference', 'explanation']:
        cat_dir = os.path.join(base_dir, category)
        if os.path.exists(cat_dir):
            for root, dirs, files in os.walk(cat_dir):
                for file in sorted(files):
                    if file.endswith('.md') and file != 'index.md':
                        filepath = os.path.join(root, file)
                        title = extract_title_desc(filepath)
                        # Relative path from base_dir
                        rel_path = os.path.relpath(filepath, base_dir)
                        # Remove .md extension for url
                        url_path = rel_path.replace('.md', '')
                        
                        url = f'/docs/{suite}/{url_path}'
                            
                        # Format as nested list based on depth if needed, but flat is fine for llms.txt
                        llms_content.append(f"- [{title}]({url})")
    
    llms_content.append("\n")

with open('static/llms.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(llms_content))
