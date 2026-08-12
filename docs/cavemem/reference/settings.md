---
id: settings
title: Settings
sidebar_position: 3
---

`<cavemem home>/settings.json`, where the cavemem home directory resolves in this order:

1. `CAVEMEM_HOME` env var, if set.
2. An existing `~/.cavemem` — zero breaking change for current installs.
3. `$XDG_DATA_HOME/cavemem` whenever `XDG_DATA_HOME` is explicitly set — on any platform,
   not just Linux. Without the var, Linux uses the XDG default `~/.local/share/cavemem`;
   macOS/Windows keep `~/.cavemem`.

Non-absolute env values (no leading `/` or `~`) are ignored, per the XDG spec — otherwise
hooks running from a project directory would fragment the store per-project.

Run `cavemem doctor` or `cavemem status` to see which directory is actually in use.

| Key | Default | |
|-----|---------|--|
| `dataDir` | resolved cavemem home (above) | SQLite database, models, pidfile, logs — set this explicitly (e.g. `"~/.cavemem"`) to relocate just the data, independent of where `settings.json` lives. Only an explicit value is written to `settings.json`; the default is re-resolved on every load, so the file stays portable across machines |
| `compression.intensity` | `"full"` | `lite` / `full` / `ultra` |
| `compression.expandForModel` | `false` | Return expanded text to model |
| `embedding.provider` | `"local"` | `local` / `ollama` / `openai` |
| `workerPort` | `37777` | Local viewer port |
| `search.alpha` | `0.5` | BM25 / vector blend |
| `search.defaultLimit` | `10` | Default result count |
| `privacy.excludePatterns` | `[]` | Path globs (e.g. `["**/.env", "**/secrets/**"]`) never captured |
| `privacy.redactSecrets` | `true` | Scrub secret-shaped substrings (API keys, tokens, passwords) with `[REDACTED]` |
| `capture.excludeTools` | `[]` | Tool names/globs never captured; wins over `includeTools` |
| `capture.includeTools` | `[]` | If non-empty, only these tool names/globs are captured |
| `enrich.enabled` | `false` | Opt-in web enrichment tool |

Content inside `<private>...</private>` is stripped before write. Paths matching `excludePatterns` are never captured into memory, whether they appear in a tool's `file_path`/`path`/`notebook_path` field or embedded in a command string. The worker binds to `127.0.0.1` only, checks the Host/Origin headers on every request, and requires a local bearer token (`<dataDir>/worker-token`, mode `0600`) on `/api/*`.

---