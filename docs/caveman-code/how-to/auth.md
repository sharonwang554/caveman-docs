---
title: Auth & Providers
description: Authenticate Caveman Code with 20+ LLM providers via OAuth or API key.
---


Caveman Code supports **20+ providers** and **6 OAuth flows**. You can mix and match — set an Anthropic key for primary work and a Groq key for the editor model in an `/architect` split, for example.



## OAuth subscriptions (recommended for individuals)

Use your existing paid subscription. No API key needed.

| Provider | Subscription | Login command |
|---|---|---|
| Anthropic Claude | Claude Pro / Max | `caveman` then `/login claude` |
| OpenAI ChatGPT | ChatGPT Plus / Pro | `/login chatgpt` |
| GitHub Copilot | Copilot | `/login copilot` |
| Google Gemini | Gemini Advanced | `/login gemini` |
| Google Antigravity | Antigravity preview | `/login antigravity` |

OAuth tokens are stored in your OS keychain — macOS Keychain, Linux libsecret, Windows Credential Manager. They never touch disk in plaintext.

## API keys

Set any of these env vars and Caveman Code picks them up automatically:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export OPENAI_API_KEY=sk-...
export GOOGLE_API_KEY=...
export AZURE_OPENAI_API_KEY=...
export GROQ_API_KEY=...
export CEREBRAS_API_KEY=...
export XAI_API_KEY=...
export OPENROUTER_API_KEY=...
export MISTRAL_API_KEY=...
export DEEPSEEK_API_KEY=...
# ... and more
```

Full list: Anthropic, OpenAI, Azure OpenAI, Google Vertex, AWS Bedrock, Mistral, Groq, Cerebras, xAI, OpenRouter, Vercel AI Gateway, Hugging Face, Kimi, MiniMax, ZAI, OpenCode, DeepSeek.

## Custom endpoints

Any OpenAI-, Anthropic-, or Google-compatible endpoint works. Add an entry to `~/.cave/agent/models.json`:

```json
{
    "providers": {
        "my-vllm": {
            "type": "openai-compatible",
            "baseUrl": "https://vllm.internal.example.com/v1",
            "apiKey": "...",
            "models": ["llama-3-70b-instruct", "qwen-2.5-coder"]
        }
    }
}
```

Then:

```bash
caveman --provider my-vllm --model llama-3-70b-instruct
```

For Anthropic-style routing (e.g. an internal Bedrock proxy), set `type: "anthropic-compatible"`. Same shape.

## Headless / CI auth

OAuth doesn't work without a browser. In CI use API keys:

```yaml
# GitHub Actions
- run: cave exec "lint and fix typescript errors" --output-schema ./schema.json
  env:
      ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

For machines without env vars, `caveman login --device-auth` runs a device-code flow (printer-style code, claim it from a browser elsewhere).

## Switching providers per request

| Flag | Example |
|---|---|
| `--provider` | `caveman --provider anthropic` |
| `--model` | `caveman --model gpt-5-codex` |
| `provider/model` | `caveman --model anthropic/claude-sonnet-4` |
| Thinking suffix | `caveman --model claude-sonnet-4:high` |

Inside the TUI, `/model` lists available models, `/provider` lists active providers, and `Ctrl+L` cycles your favourites.

## Cost tracking

Caveman Code reports per-message cost inline (e.g. `$0.0042 (cached: $0.0001)`) and writes daily/weekly totals to `~/.cave/usage.json`. See [Cost Transparency](../reference/tools.md#cost-transparency).

## Troubleshooting

See the [Troubleshooting](troubleshooting.md#auth) page for solutions to common auth issues (OAuth flow, expired tokens, missing libsecret).
