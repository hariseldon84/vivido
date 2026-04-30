# Vivido — `usePlatform()` Contract Note

**Status:** Working recommendation
**Purpose:** Explain the `usePlatform()` decision in plain language and define the preferred contract shape before sprint 1 scaffolding.

---

## What It Is

Vivido has two execution worlds:

- the visible app UI
- the heavy native systems behind it

`usePlatform()` is the bridge between those two.

The UI should never directly know how to:

- call FFmpeg
- start Whisper
- read/write project files
- decide whether desktop-native or browser-safe logic should run

Instead, the UI always asks `usePlatform()` for work.

---

## Plain-English Example

The transcript screen should not say:

- "call Whisper binary like this"
- "poll these events"
- "if web do this, if desktop do that"

It should only say:

- "start transcript job for this clip"

Then `usePlatform()` decides the rest.

---

## The Recommendation

Use a **capability-based grouped API**.

Example:

```ts
const platform = usePlatform();

platform.media.importFiles(...)
platform.media.generateThumbnail(...)
platform.transcript.startJob(...)
platform.audio.previewChain(...)
platform.publish.renderPackage(...)
platform.project.save(...)
platform.system.openExternal(...)
```

Do **not** use a giant generic function like:

```ts
platform.run("transcribe", payload)
```

That becomes hard to understand and easy to break as the product grows.

---

## Why This Fits Vivido

Vivido already thinks in product modules:

- media
- transcript
- timeline
- audio
- publish
- project
- system

The platform contract should mirror that shape.

This keeps:

- code easier to navigate
- feature ownership clearer
- tests more focused
- future refactors safer

---

## Two Operation Types

### Immediate Operations

Small operations return direct async results.

Examples:

- read project summary
- validate export settings
- generate one thumbnail

Recommended result shape:

```ts
type PlatformResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
```

### Long-Running Jobs

Heavy operations must be job-based.

Examples:

- transcription
- waveform generation
- package render/export

Recommended start shape:

```ts
type PlatformJobStart<T> =
  | { ok: true; jobId: string; initialState: T }
  | { ok: false; error: { code: string; message: string } };
```

The UI then subscribes to progress and can cancel using the `jobId`.

---

## What It Must Handle

- typed request/response shape
- progress reporting for long jobs
- cancellation
- desktop vs web routing
- explicit unsupported responses

Unsupported example:

```ts
{ ok: false, error: { code: "UNSUPPORTED", message: "Desktop-only feature" } }
```

---

## What Must Stay Out Of It

`usePlatform()` is not app-state management.

Do not put these into it:

- selected clip state
- tab state
- panel visibility
- form state
- timeline zoom state

Those belong to normal app state/store logic.

---

## Current Recommended Decision

For sprint 1, use:

- grouped capability API
- typed async results for small operations
- job-based orchestration for long-running operations
- explicit unsupported responses on web
- zero direct native calls from React feature code

This should be treated as the default decision unless replaced by a stronger alternative before scaffolding begins.
