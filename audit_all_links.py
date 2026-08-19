import os
import re

docs_dir = "docs"
md_files = []
for root, _, files in os.walk(docs_dir):
    for f in files:
        if f.endswith(".md"):
            md_files.append(os.path.join(root, f))

# Find all valid targets
valid_targets = set()
for f in md_files:
    # the file itself
    valid_targets.add('/' + f)
    # the route (assuming standard Docusaurus)
    route = '/' + f.replace('.md', '')
    if route.endswith('/index'):
        route = route[:-6]
    valid_targets.add(route)

    # Check category json if any
    cat = os.path.join(os.path.dirname(f), '_category_.json')
    if os.path.exists(cat):
        # We can loosely consider any directory with _category_.json valid
        valid_targets.add('/' + os.path.dirname(f))

# Also add special routes like /caveman-code/ since we know it
valid_targets.add('/caveman-code')
valid_targets.add('/caveman-code/')
for f in md_files:
    if f.startswith('docs/caveman-code/'):
        valid_targets.add(f.replace('docs/caveman-code', '/caveman-code').replace('.md', ''))
        valid_targets.add(f.replace('docs/caveman-code', '/caveman-code'))

broken = []
link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

for f in md_files:
    with open(f, 'r') as file:
        content = file.read()
    
    links = link_pattern.findall(content)
    for text, url in links:
        # Ignore external links
        if url.startswith('http') or url.startswith('mailto:') or url.startswith('#'):
            continue
            
        # Strip hash
        base_url = url.split('#')[0]
        
        # Determine absolute path from doc root
        if base_url.startswith('/'):
            abs_url = base_url
        else:
            # relative path
            # Need to resolve against current file directory
            abs_url = os.path.normpath(os.path.join('/' + os.path.dirname(f), base_url))
            
        # Now check if it exists in valid targets
        if abs_url not in valid_targets and abs_url + '/' not in valid_targets:
            broken.append((f, url, abs_url))

for b in broken:
    print(f"File {b[0]} has broken link: {b[1]} (resolved to {b[2]})")

if not broken:
    print("No broken links found!")
