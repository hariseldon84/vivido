# Vivido — IPC Schema & Tooling Note

**Status:** Working recommendation
**Purpose:** Explain the IPC decision in plain language and define the preferred tooling before sprint 1 scaffolding.

---

## What It Is

Vivido desktop is really two environments working together:

- the React UI that the creator sees
- the native Electron side that can access FFmpeg, Whisper, files, and OS capabilities

Those two sides need a safe, consistent way to talk.

That conversation channel is IPC: inter-process communication.

---

## Plain-English Example

The Publish screen wants to render a package.

The screen itself should not know:

- how FFmpeg is invoked
- where render jobs run
- how files are written to disk

It should only send a request like:

- "start render package for this project"

The native side receives that request, validates it, starts work, and sends back progress/results.

---

## Why Schemas Matter

Without schemas, each screen could send different message shapes.

That creates:

- crashes from missing fields
- bugs from wrong types
- security risk from malformed payloads
- hard-to-debug runtime behavior

Schemas are the strict rulebook for what messages are allowed.

---

## The Recommendation

Use:

- **Zod** for defining request/response schemas
- **zod-to-json-schema** for generated JSON Schema output
- a shared `packages/ipc` package
- CI validation that blocks schema drift

This fits Vivido because it is:

- readable
- TypeScript-friendly
- strong at runtime validation
- easy to organize by domain

---

## Recommended Shape

Organize IPC contracts by the same product domains used in `usePlatform()`:

- media
- transcript
- timeline
- audio
- publish
- project
- system

Example file layout:

```text
packages/ipc/
  contracts/
    media.ts
    transcript.ts
    timeline.ts
    audio.ts
    publish.ts
    project.ts
    system.ts
```

Each operation should define:

- request schema
- result schema
- error schema
- progress schema for long-running jobs

---

## What We Want To Avoid

Avoid this pattern:

```ts
ipcRenderer.send("render", anything)
ipcMain.on("render", (event, whatever) => ...)
```

That is too loose for Vivido.

Instead, every message should have a known shape that is validated before it crosses the boundary.

---

## Current Recommended Decision

For sprint 1, use:

- Zod-based shared IPC contracts
- JSON Schema generation with `zod-to-json-schema`
- validation at both renderer and native boundaries
- no raw untyped IPC in feature code
- CI enforcement of contract validity

This should be treated as the default decision unless replaced by a stronger alternative before scaffolding begins.
