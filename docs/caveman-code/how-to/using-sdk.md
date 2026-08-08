---
id: using-sdk
title: Using the SDK
sidebar_position: 1
---

## SDK

```typescript
import { AuthStorage, createAgentSession, ModelRegistry, SessionManager } from "@juliusbrussee/caveman-code";

const { session } = await createAgentSession({
  sessionManager: SessionManager.inMemory(),
  authStorage: AuthStorage.create(),
  modelRegistry: ModelRegistry.create(AuthStorage.create()),
});

session.on("message", (msg) => console.log(msg.role, msg.text));
await session.prompt("Refactor src/auth.ts to use the new TokenStore.");
```

Talk to a running daemon over HTTP / WS via `@juliusbrussee/caveman-sdk`. API reference →

TypeScript monorepo, 9 packages — full layout in CLAUDE.md.

---