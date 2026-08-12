---
id: uninstall
title: Uninstall
sidebar_position: 99
---

## Uninstall

To completely remove Caveman Code from your system:

1. **Remove the application directory**:
```bash
rm -rf ~/.cave
```

2. **Remove the global symlink**:
Remove the `caveman-code` symlink from your PATH (typically `~/.local/bin/cave` or `/usr/local/bin/cave`).

3. **Optional: Clear memory**:
Sessions live in `~/.cave/sessions/`. Memory (cavemem) lives in `~/.cavemem/` and is **not** removed by the above — clean it explicitly if needed:
```bash
rm -rf ~/.cavemem
```
