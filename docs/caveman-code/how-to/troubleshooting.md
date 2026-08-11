---
title: Troubleshooting
description: Fixes for the most common issues with Caveman Code.
---


When something breaks, start here. If your issue isn't covered, [open a GitHub issue](https://github.com/JuliusBrussee/caveman-cli/issues/new) with `caveman doctor` output.



## Install

<details>
<summary>`cave: command not found` after install</summary>


Restart your shell, or:

```bash
source ~/.zshrc      # zsh
source ~/.bashrc     # bash
```

If still missing, the installer printed the install path — add it to your PATH.

</details>

<details>
<summary>`Operation not permitted` writing to `~/.cave`</summary>


Filesystem is read-only or owned by another user. Run:

```bash
ls -la ~/.cave
chown -R "$USER" ~/.cave
```

</details>

<details>
<summary>Apple silicon: `bad CPU type in executable`</summary>


You downloaded an x86_64 binary on an ARM Mac. Re-install via npm — the package is platform-agnostic:

```bash
npm install -g @juliusbrussee/caveman-code
```

</details>

## Auth

<details>
<summary>OAuth opens browser but never completes</summary>


1. Check that the loopback port (random in 1024-65535) isn't firewalled.
2. Try device-code auth: `caveman login --device-auth`.
3. Disable VPN that intercepts loopback.

</details>

<details>
<summary>`401 Unauthorized` on a stored token</summary>


Token expired and refresh failed. Re-login:

```bash
caveman logout <provider>
caveman login <provider>
```

</details>

<details>
<summary>Linux libsecret not found</summary>


Install:

```bash
# Debian / Ubuntu
sudo apt install libsecret-1-0 libsecret-tools

# Arch
sudo pacman -S libsecret
```

If your distro lacks libsecret, set `CAVE_INSECURE_KEYRING=1` to fall back to a plaintext token file (warning is shown).

</details>

## Sessions

<details>
<summary>Caveman Code hangs on launch</summary>


Stuck on context load. Kill and:

```bash
caveman -r --no-context     # browse without loading any session
```

Then identify and remove the bad session in `~/.cave/sessions/<cwd-hash>/`.

</details>

<details>
<summary>`/tree` shows no branches</summary>


Branching is per-session. The first session in a cwd has no branches by definition. Run a few turns then `/fork` to test.

</details>

<details>
<summary>Compaction destroyed important context</summary>


Use the shadow-git checkpoint: `/checkpoint list`, then `/rollback <N>`. Compaction itself runs a `PreCompact` hook — instrument it to write important context to disk first.

</details>

## Tools

<details>
<summary>`Bash` tool times out</summary>


Default tool timeout is 60s. Override per call:

```
> use Bash with --timeout 600 to run the long-running migration
```

Or globally in `~/.cave/settings.json`:

```json
{
    "tools": { "bash": { "timeoutMs": 600000 } }
}
```

</details>

<details>
<summary>`Edit` keeps applying to the wrong location</summary>


The model's view of the file is stale. After a hook writes to the file, ask cave to re-read:

```
> re-read src/foo.ts and apply the change
```

</details>

<details>
<summary>Caveman Mode is summarizing too aggressively</summary>


Lower compression intensity:

```bash
/caveman lite                 # default is "full" (in TUI)
/caveman off                  # turn off entirely
```

</details>

## Permissions

<details>
<summary>Every action prompts even though I clicked "Allow always"</summary>


The allow-key is more specific than the new action. E.g. `Read packages/foo/**` won't match `Read packages/bar/baz.ts`. Add a broader allow-key with `caveman permissions add "Read **"`.

</details>

<details>
<summary>Sandbox blocks something I need</summary>


`caveman debug sandbox` shows the active policy. Caveman Code executes all tool requests directly - there is no sandbox flag or permission prompts. The OS enforces filesystem permissions. To constrain a session, use `--tools` to limit available tools (e.g. `--tools read,grep,find,ls` for read-only).

For permanent allowlist, add to `permissions.json`:

```json
{
    "permissions": {
        "alwaysAllow": ["Bash:docker run *"]
    }
}
```

</details>

## MCP

<details>
<summary>`caveman mcp doctor` shows server unreachable</summary>


```bash
caveman mcp logs <server>     # tails stderr of stdio server
```

Common causes: command not on PATH, env var missing, server's auth flow incomplete.

</details>

<details>
<summary>MCP tools don't show up in the model's context</summary>


By default Caveman Code defers MCP schemas — only names are listed until the model calls `ToolSearch`. This reduces context bloat by ~85%.

</details>

## Hooks

<details>
<summary>Hook never fires</summary>


Check the matcher:

```bash
caveman hooks test PreToolUse --tool Edit --path src/foo.ts
```

Reports whether each hook would fire for that input. Common mistake: `paths` glob doesn't include the actual file path.

</details>

<details>
<summary>Hook output isn't reaching the model</summary>


Only stdout is fed back to the model as a system reminder. Stderr is logged but ignored. Check that your hook prints to stdout, not stderr.

</details>

## Memory (cavemem)

<details>
<summary>`/memory search` returns nothing</summary>


cavemem isn't running. Check:

```bash
cavemem --version
caveman mcp doctor   # should show cavemem reachable
```

If missing: `npm install -g cavemem` then `caveman init`.

</details>

<details>
<summary>Memory injection too noisy</summary>


Lower the cap in `settings.json`:

```json
{
    "memory": { "maxInjectTokens": 1000 }
}
```

Or disable for the session: `/memory off`.

</details>

## Performance

<details>
<summary>TUI feels laggy</summary>


Caveman Code automatically detects and uses synchronized output (DEC mode 2026) on supported terminals. If you see rendering issues, ensure your terminal supports ANSI escape sequences and check `caveman doctor` output for terminal detection status.

</details>

<details>
<summary>Long sessions get slow</summary>


Run `/compact` to manually compact. Or enable auto-compact at a lower threshold:

```json
{
    "session": { "autoCompactAtTokens": 80000 }
}
```

</details>

## Reporting issues

```bash
caveman doctor > /tmp/cave-doctor.txt
caveman version > /tmp/cave-version.txt
```

Attach both to a [GitHub issue](https://github.com/JuliusBrussee/caveman-cli/issues/new). Include the prompt that triggered the bug if reproducible.
