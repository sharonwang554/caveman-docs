---
id: installation
title: Installation
sidebar_position: 2
---

npm is the primary install path. Native binaries via Homebrew / Docker / direct download are also available.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

Requires Node.js 20+:

```bash
npm install -g @juliusbrussee/caveman-code
```

  </TabItem>
  <TabItem value="bun" label="bun">

```bash
bun add -g @juliusbrussee/caveman-code
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn global add @juliusbrussee/caveman-code
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add -g @juliusbrussee/caveman-code
```

  </TabItem>
  <TabItem value="homebrew" label="Homebrew">

  ```bash
  brew tap juliusbrussee/caveman-code https://github.com/JuliusBrussee/caveman-cli
  brew install caveman-code
  ```
  The tap is auto-updated by the release pipeline.

  </TabItem>
  <TabItem value="docker" label="Docker">

  ```bash
  docker run --rm -it -v "$PWD:/work" ghcr.io/juliusbrussee/caveman-cli:latest
  ```
  Mounts your working directory into `/work`. The image runs as a non-root user.

  </TabItem>
  <TabItem value="windows" label="Windows">

  ```powershell
  npm install -g @juliusbrussee/caveman-code
  ```
  The npm package works on Windows PowerShell and WSL. WSL is the supported terminal path.

  </TabItem>
  <TabItem value="manual" label="Manual">

  Grab the platform-specific tarball from the [GitHub releases page](https://github.com/JuliusBrussee/caveman-cli/releases) and extract to a directory on your PATH.

  </TabItem>
</Tabs>

All package managers install two binaries — `caveman` (primary) and `caveman-code` (alias). Either works. Supported on macOS, Linux, and Windows (PowerShell + WSL).

## Verify

```bash
caveman --version
caveman doctor
```

`caveman doctor` reports:

- Kernel and terminal capabilities
- Sandbox availability (Seatbelt / Landlock / Restricted Tokens)
- MCP servers reachable
- Missing tooling (git, ripgrep, fzf — used optionally for fuzzy file pickers)

## Auto-update

Caveman Code checks the GitHub releases API once per 24 hours and prompts before applying. 

1. **Pin a channel (optional)**:
```bash
caveman update --channel stable    # default
caveman update --channel beta
caveman update --channel canary
```

2. **Update on demand**:
```bash
caveman update
```

To roll back to the previous version:

```bash
caveman update --rollback
```



## Headless / CI install

```bash
npm install -g @juliusbrussee/caveman-code@0.65.2   # pin a version for reproducible CI
```

See [`caveman exec` mode](../how-to/cookbook.md#caveman-exec-in-github-actions) for using caveman inside GitHub Actions.
