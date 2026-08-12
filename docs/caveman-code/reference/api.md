---
id: api
title: API
sidebar_position: 6
description: SDK, JSON-RPC, OpenAPI, and embedding cave in your own apps.
---


Caveman Code exposes four programmatic surfaces. Pick whichever matches your integration.


## 1. Node Agent SDK — `@caveman-ai/agent`

Give every production agent a local catalog-price guard and a token bill.

```typescript
import { agent, auto, run } from "@caveman-ai/agent";

const support = agent({
  id: "support",
  instructions: "Answer from policy. Never invent policy.",
  model: auto(),
});

const result = await run(support, "Can I get a refund?");
console.log(result.text);
console.log(result.contextBill);
```

Useful for: building a custom UI on top of Caveman runtime, embedding Caveman in a larger app, scripted batch runs.

Full TypeScript types are exported from the package. See [packages/agent](https://github.com/JuliusBrussee/caveman/tree/main/packages/agent) for source.

## 2. TypeScript SDK — `@caveman-ai/sdk`

Zero-runtime-dependency TypeScript client for Caveman gateway cooperation.

```bash
npm install @caveman-ai/sdk
```

```typescript
import { Cave } from "@caveman-ai/sdk";

const cave = new Cave({
  apiKey: process.env.CAVE_API_KEY!,
  baseURL: "http://127.0.0.1:8787",
  agent: "support-agent",
});

const result = await cave.compress("large payload");
console.log(result.output, result.basis); // basis is inferred
```

The `@caveman-ai/sdk` package provides provider clients, `compress`, deferred tool search, reversible checkpoints and artifacts, retry-loop interruption, and runtime policy.

## 3. JSON-RPC over stdin/stdout

```bash
caveman --mode rpc
```

JSONL on stdin, JSONL on stdout. One request per line.

Methods:

| Method | Purpose |
|---|---|
| `session.create` | Start a new session |
| `session.prompt` | Send a user turn |
| `session.events` | Subscribe to events (server-streamed) |
| `session.tool.allow` | Respond to a permission prompt |
| `session.compact` | Manual compaction |
| `session.fork` | Branch the session |
| `session.close` | Close and persist |

Example:

```jsonl
{"jsonrpc":"2.0","id":1,"method":"session.create","params":{"model":"claude-sonnet-4"}}
{"jsonrpc":"2.0","id":2,"method":"session.prompt","params":{"sessionId":"abc","text":"hello"}}
```

Useful for: integrating cave with editors (LSP-style), building shell scripts that pipe through caveman-code, writing other-language clients.

## 4. Print mode + JSON output

For one-shot integrations:

```bash
caveman -p "summarize this file" < src/foo.ts
caveman --mode json "list todos in this repo"
caveman exec "lint and fix" --output-schema schema.json
```

`--output-schema` validates the model's final response against a JSON Schema. Useful for CI gates.

Stable JSON event stream:

```jsonl
{"type":"session.start","sessionId":"abc","model":"claude-sonnet-4"}
{"type":"tool.call","tool":"Read","args":{"path":"src/foo.ts"}}
{"type":"tool.result","tool":"Read","ok":true}
{"type":"token","text":"This file..."}
{"type":"session.end","cost":0.012,"tokens":{"in":1200,"out":80}}
```

The schema is versioned. Pin `--protocol-version=v1` for stability across cave releases.

## OpenAPI spec

The daemon serves its own OpenAPI 3.1 spec:

```bash
caveman serve &
curl http://localhost:39245/openapi.yaml
```

Or browse the spec on GitHub: [packages/coding-agent/openapi.yaml](https://github.com/JuliusBrussee/caveman-cli/blob/main/packages/coding-agent/openapi.yaml).

## Extension API (in-process)

If you'd rather load TypeScript modules at session start:

```typescript
// .cave/extensions/my-ext.ts
import type { ExtensionAPI } from "@juliusbrussee/caveman-code";

export default function (api: ExtensionAPI) {
    api.registerTool({ name: "deploy", schema: { ... }, handler: async (args) => { ... } });
    api.registerCommand("stats", { handler: async () => "..." });
    api.on("tool_call", async (event, ctx) => {
        // ...
    });
}
```

40+ event types. Full docs at [packages/coding-agent/docs/extensions.md](https://github.com/JuliusBrussee/caveman-cli/blob/main/packages/coding-agent/docs/extensions.md).

## Choosing a surface

| Use case | Surface |
|---|---|
| Embed in a Node app | SDK (`caveman` import) |
| Build a remote client | `@juliusbrussee/caveman-sdk` over the daemon |
| Editor integration | JSON-RPC `--mode rpc` |
| CI / GitHub Actions | `caveman exec --output-schema` |
| In-process custom tool | Extension API |
| Observe sessions live | `caveman attach --json-events` |
