# Vivido — Architecture

**Status:** Locked (ADR-001-C) — requires ADR to change any decision here

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React + Vite | Web-first, fast HMR, shared between Electron renderer + web app |
| Desktop | Electron | Wraps web app, native file access, cross-platform |
| Video Engine | FFmpeg native subprocess (Electron) + FFmpeg WASM (browser preview fallback) | Industry standard; native runtime for 4K |
| AI Transcription | Whisper.cpp (local, GGML models) | Local inference = zero API cost, fully offline |
| AI Features | Anthropic Claude API (claude-sonnet-4-6) | B-roll suggestion, chapter generation, metadata writing (Stage 2) |
| Style Model | JSON accumulator → SQLite local → Supabase sync | Passive, grows with usage, local-first |
| Real-time Collab | Liveblocks | Multiplayer editing presence (Stage 3) |
| Storage | Supabase (metadata + auth) + Cloudflare R2 (rendered outputs) | Video files never in Supabase |
| Payments | Stripe + Razorpay (India fallback) | Global + India creator base |
| Cloud Render | AWS MediaConvert | Background render queue (Stage 2+) |
| Deploy | Vercel (web app) + GitHub Actions (Electron builds) | Fast CI/CD |

---

## Dual-Runtime Architecture (ADR-001-C)

```
┌─────────────────────────────────────────────────────────┐
│  BROWSER RUNTIME (React + Vite)                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │ Timeline UI │  │ Transcript   │  │ Audio Room UI │   │
│  │ Inspector   │  │ AI Panel     │  │ Publish UI    │   │
│  └─────────────┘  └──────────────┘  └───────────────┘   │
│                                                          │
│  usePlatform() hook → routes compute to native or WASM  │
│  ↕ IPC (typed contracts, CI-validated schemas)           │
├─────────────────────────────────────────────────────────┤
│  NATIVE RUNTIME (Electron main + Node.js)                │
│  ┌─────────────┐  ┌───────────┐  ┌────────────────┐     │
│  │ FFmpeg      │  │ Whisper   │  │ Style Model    │     │
│  │ (native)    │  │ (.cpp)    │  │ (SQLite + sync)│     │
│  └─────────────┘  └───────────┘  └────────────────┘     │
│  ┌─────────────────────┐  ┌───────────────────────┐      │
│  │ GPU Decode          │  │ File I/O              │      │
│  │ VideoToolbox/NVDEC  │  │ .vivido JSON format   │      │
│  └─────────────────────┘  └───────────────────────┘      │
└─────────────────────────────────────────────────────────┘
         ↓ Cloudflare R2 (rendered outputs only)
         ↓ Supabase (auth + style model metadata)
         ↓ AWS MediaConvert (long-form cloud render, Stage 2)
```

**The headless capability is built-in from day one.** The native runtime that runs in Electron today runs as a headless cloud render worker in Stage 2 — same FFmpeg pipeline, different host — without a rewrite.

---

## `usePlatform()` Hook

The most critical abstraction in the codebase. Every compute-heavy operation in the renderer calls `usePlatform()` — never calls native APIs directly.

**What it must handle:**
- Routing: native runtime (Electron) vs WASM fallback (browser)
- Request/response contract shape (async, typed)
- In-flight request cancellation
- Graceful WASM fallback activation when native is unavailable

**Status:** Interface design is Open Question #8 — must be decided before sprint 1. See [16-open-questions.md](16-open-questions.md).

### Plain-English Purpose

`usePlatform()` is the single service desk between the visible app UI and the heavy native systems behind it.

The React screens should never directly know:

- how FFmpeg is called
- how Whisper jobs are started
- how files are read or written
- whether the app is running on desktop or web

Instead, the UI always asks `usePlatform()` for work, and `usePlatform()` decides where that work runs.

Examples:

- "import these files"
- "start transcription"
- "generate thumbnails"
- "render the publish package"

On desktop, those requests route to Electron/native services. On web, they either use a browser-safe fallback or return an explicit unsupported result.

### Recommended Contract Shape

Vivido should use a **capability-based platform contract**, not a generic string-command bus.

Recommended mental model:

```ts
const platform = usePlatform();

platform.media.importFiles(...)
platform.media.generateThumbnail(...)
platform.transcript.startJob(...)
platform.timeline.analyzeClip(...)
platform.audio.previewChain(...)
platform.publish.renderPackage(...)
platform.project.save(...)
platform.system.openExternal(...)
```

Why:

- maps cleanly to product modules
- easier for developers to understand
- easier to test and refactor
- safer than a catch-all `run("something", payload)` command surface

### Two Kinds Of Operations

#### 1. Immediate Operations

Small operations return direct async results.

Examples:

- read project metadata
- generate a single thumbnail
- open file picker
- validate export settings

Recommended shape:

```ts
type PlatformResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
```

#### 2. Long-Running Jobs

Heavy operations must be job-based.

Examples:

- transcription
- waveform generation
- media proxy generation
- full export / Publish Package render

Recommended shape:

```ts
type PlatformJobStart<T> =
  | { ok: true; jobId: string; initialState: T }
  | { ok: false; error: { code: string; message: string } };
```

The UI then:

1. starts the job
2. receives a `jobId`
3. subscribes to progress/state updates
4. can cancel the job
5. can recover status if the view or window changes

### Required Behaviors

The `usePlatform()` contract must define:

- request shape
- success shape
- error shape
- progress events for long jobs
- cancellation behavior
- unsupported behavior on web/fallback surfaces

Recommended unsupported shape:

```ts
{ ok: false, error: { code: "UNSUPPORTED", message: "Desktop-only feature" } }
```

Do not hide unsupported operations behind brittle hacks.

### What Must Stay Out Of It

`usePlatform()` is for runtime capabilities, not app state management.

Do not put these inside it:

- React view state
- panel open/close state
- form state
- editor selection state
- timeline zoom state

Those remain regular app/UI state. `usePlatform()` only owns requests that cross the renderer/runtime boundary.

### Recommendation For Sprint 1

Adopt this direction:

- capability-based grouped API
- typed async results for small operations
- job-based flow for long-running operations
- explicit unsupported results for web
- no direct native calls from React feature code

This is the recommended answer to Open Question #8 unless a stronger alternative emerges before sprint 1.

---

## IPC Contracts

**Rule:** All renderer↔native messages are typed and validated against documented schemas. No eval. No dynamic code execution over IPC.

**Location:** `src/ipc/contracts/`

**Validation:** Zod schemas + generated JSON Schema. CI gate blocks release on schema violation.

**Status:** Toolchain choice is Open Question #9 — must be named before sprint 1. See [16-open-questions.md](16-open-questions.md).

### Plain-English Purpose

IPC is the message system between:

- the React UI process
- the Electron/native process

Whenever the UI wants heavy or privileged work done, it must send a message to the native side.

Examples:

- import media
- start transcription
- save project
- render export

Without a strict contract, those messages become inconsistent and unsafe. One screen might send the wrong shape, another might omit required fields, and native code can crash or behave unpredictably.

So IPC schemas are the formal rulebook for that conversation.

### Recommended Toolchain

Vivido should use:

- **Zod** for runtime-validating request and response schemas
- **zod-to-json-schema** for generated JSON Schema output
- a shared contracts package in `packages/ipc`
- CI validation to block schema drift before merge

Why this fits Vivido:

- TypeScript-friendly
- easy to read and maintain
- strong runtime validation for security and stability
- easy to organize by product domain
- matches the PRD requirement for typed, CI-validated contracts

### Recommended Organization

Organize contracts by capability domain, matching `usePlatform()`:

- `packages/ipc/contracts/media.ts`
- `packages/ipc/contracts/transcript.ts`
- `packages/ipc/contracts/timeline.ts`
- `packages/ipc/contracts/audio.ts`
- `packages/ipc/contracts/publish.ts`
- `packages/ipc/contracts/project.ts`
- `packages/ipc/contracts/system.ts`

Each operation should define:

- request schema
- success/result schema
- error schema
- progress-event schema if long-running

### Recommendation For Sprint 1

Adopt this direction:

- no raw `ipcRenderer.send()` usage in feature code
- no untyped `ipcMain.on()` payload handling
- all renderer/native payloads validated at both ends
- shared schema definitions live in one package
- generated JSON Schema used for documentation and CI checks

This is the recommended answer to Open Question #9 unless a stronger alternative emerges before sprint 1.

---

## Electron Hardening

From sprint 1, not sprint 17:

```js
// BrowserWindow config
{
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true,
    // no remote module
  }
}
```

**CSP (renderer):**
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
media-src 'self' blob:;
```
`blob:` required for video preview canvas. CSP string committed to code — not deferred to deployment config.

---

## Project File Format (`.vivido`)

- **Format:** Open JSON — readable in any text editor
- **Schema:** Documented publicly at `vivido.app/schema` at launch
- **Versioning:** Semantic versioning. Vivido reads older versions; migration runs automatically on open; original backed up before migration.
- **Contents:** Project metadata, timeline state (clip references + edit decisions), transcript data, style observations, chapter/Shorts markers, export settings. Never embeds raw media — file references only.
- **OS integration:** `.vivido` file association registered on install. Default storage: `~/Movies/Vivido/` (Mac), `%USERPROFILE%\Videos\Vivido\` (Windows).

---

## React Native Component Boundary

**Critical decision — must be made before sprint 1.** Every shared component written before this decision may need refactoring.

What goes in `packages/ui/` (shared, cross-platform) vs `apps/desktop/` (Electron-only DOM components)?

Nx vs Turborepo is secondary — the boundary decision comes first.

See Open Question #4 in [16-open-questions.md](16-open-questions.md).

### Plain-English Purpose

This decision answers a simple question:

Which UI parts should be reusable across desktop/web/mobile, and which should stay specific to the desktop editor?

If everything is put into one "shared UI" bucket too early, the codebase will mix:

- truly reusable design-system primitives
- desktop-only editor surfaces
- Electron-specific behaviors

That creates expensive rewrites later.

### Recommended Boundary

Vivido should use a **two-layer UI boundary**.

#### Shared Layer: `packages/ui`

This package should contain:

- design tokens
- typography wrappers
- buttons
- icon buttons
- tabs
- chips
- badges
- inputs
- sliders
- progress bars
- small panel/header primitives
- other lightweight presentational building blocks

These are the reusable Lego bricks.

#### Desktop Feature Layer: `apps/desktop`

This area should contain:

- app shell and title bar
- media browser panel
- timeline editor surfaces
- transcript workspace
- Audio Room workspace
- Publish workspace
- inspector panels
- desktop shortcut systems
- Electron-specific drag/drop and file interactions

These are feature-level assembled houses, not shared primitives.

### Recommendation For Sprint 1

Adopt this direction:

- `packages/ui` contains reusable primitives only
- desktop feature screens stay in `apps/desktop`
- move components into `packages/ui` only after they prove portable
- do not optimize sprint-1 UI architecture around hypothetical React Native reuse

This is the recommended answer to Open Question #4 unless a stronger alternative emerges before sprint 1.

---

## Monorepo Structure (Proposed)

```
vivido/
  apps/
    desktop/          ← Electron main process + renderer
    web/              ← Vercel web companion
  packages/
    ui/               ← Shared React components (cross-platform boundary TBD)
    ipc/              ← Typed IPC contracts (Zod schemas)
    style-model/      ← Style model accumulator logic
  _designs/           ← Locked UI screens + design guidelines
  prd/                ← This folder
```

---

## GPU Decode Strategy

| Platform | Primary | Fallback |
|---|---|---|
| Windows | NVDEC (NVIDIA) → D3D11VA (Intel/AMD) | FFmpeg CPU decode ("Performance mode") |
| Mac | VideoToolbox | FFmpeg CPU decode ("Performance mode") |

"Performance mode" indicator shown in titlebar when fallback activates. All four decode paths validated in CI. Creator never sees a crash — always a working path.
