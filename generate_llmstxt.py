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
    
    # Try frontmatter title
    fm_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if fm_match:
        fm = fm_match.group(1)
        t_match = re.search(r'^title:\s*(.+)$', fm, re.MULTILINE)
        if t_match:
            title = t_match.group(1).strip("'\"")
            
    # Remove frontmatter for description extraction
    content_no_fm = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)
    
    # If no frontmatter title, look for # Title
    if not title:
        h1_match = re.search(r'^#\s+(.+)$', content_no_fm, re.MULTILINE)
        if h1_match:
            title = h1_match.group(1).strip()
            
    if not title:
        title = os.path.basename(filepath).replace('.md', '').replace('-', ' ').title()

    # Extract description
    desc = ''
    # Remove H1
    content_no_h1 = re.sub(r'^#\s+.*$', '', content_no_fm, flags=re.MULTILINE).strip()
    
    # Find the first paragraph
    paragraphs = content_no_h1.split('\n\n')
    for p in paragraphs:
        p = p.strip()
        # Skip empty, headers, code blocks, tables, blockquotes
        if p and not p.startswith(('#', '```', '|', '>', '<', '-', '*')):
            # Replace newlines with spaces
            desc = p.replace('\n', ' ')
            # Truncate to first sentence if it's too long, or just keep it if short enough
            sentences = re.split(r'(?<=[.!?])\s+', desc)
            if sentences:
                desc = sentences[0]
            if len(desc) > 150:
                desc = desc[:147] + '...'
            break

    return title, desc

llms_content = []
llms_content.append("# Caveman Ecosystem Documentation\n")
llms_content.append("> Official documentation for the Caveman ecosystem.\n\n")
llms_content.append("> Note: This documentation portal is generated based on commit 99a9aa2f5a45097fc3563febea7d0baf64407441 of the original repo on August 19, 2026. Please refer to the original repo (https://github.com/JuliusBrussee/caveman) for the latest updates.\n\n")

for suite in order:
    llms_content.append(f"## {suite.replace('-', ' ').title()}")
    llms_content.append(f"> {suites[suite]}\n")
    
    base_dir = os.path.join('docs', suite)
    
    # Read index.md first
    index_file = os.path.join(base_dir, 'index.md')
    if os.path.exists(index_file):
        title, desc = extract_title_desc(index_file)
        url = f'/docs/{suite}/'
        desc_str = f": {desc}" if desc else ""
        llms_content.append(f"- [{title}]({url}){desc_str}\n")
        
    for category in ['tutorials', 'how-to', 'explanation', 'reference']:
        cat_dir = os.path.join(base_dir, category)
        if os.path.exists(cat_dir):
            # Check if directory actually has markdown files
            has_md = any(f.endswith('.md') for _, _, files in os.walk(cat_dir) for f in files)
            if has_md:
                cat_title = category.replace('-', ' ').title()
                llms_content.append(f"### {cat_title}")
                
                # Sort files to match sidebar_position or alphabetical
                # Let's just do alphabetical for the script simplicity, 
                # or read sidebar_position
                files_with_pos = []
                for root, dirs, files in os.walk(cat_dir):
                    for file in files:
                        if file.endswith('.md') and file != 'index.md':
                            filepath = os.path.join(root, file)
                            with open(filepath, 'r') as f:
                                c = f.read()
                                pos = 999
                                pos_match = re.search(r'^sidebar_position:\s*(\d+)', c, re.MULTILINE)
                                if pos_match:
                                    pos = int(pos_match.group(1))
                            files_with_pos.append((pos, filepath, file))
                            
                files_with_pos.sort()
                
                for pos, filepath, file in files_with_pos:
                    title, desc = extract_title_desc(filepath)
                    rel_path = os.path.relpath(filepath, base_dir)
                    url_path = rel_path.replace('.md', '')
                    url = f'/docs/{suite}/{url_path}'
                    desc_str = f": {desc}" if desc else ""
                    llms_content.append(f"- [{title}]({url}){desc_str}")
                llms_content.append("") # empty line after category

with open('static/llms.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(llms_content))
