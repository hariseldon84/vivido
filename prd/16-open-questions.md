# Open Questions

Sorted by urgency. Each question blocks specific work — resolve before the sprint listed.

---

| # | Question | Blocking | Urgency |
|---|---|---|---|
| 1 | Who are the 5 specific creators for the validation prototype? | Validation gate (Pre-Sprint 0) | **This week** |
| 2 | Patent provisionals #1 + #3 — attorney engaged and filing date confirmed? | Any code shown to any creator | **This week** |
| 3 | Descript FTO review — attorney engaged? | Validation prototype build (FR15–FR17) | **This week** |
| 4 | RN component sharing boundary | Sprint 1 start | **Before sprint 1** |
| 8 | `usePlatform()` interface design | Sprint 1 start | **Before sprint 1** |
| 9 | IPC schema validation toolchain | Sprint 1–2 CI gate | **Sprint 1** |
| 10 | Whisper integration method: N-API vs child_process | Sprint 5–6 | Sprint 4 |
| 6 | Whisper model tier default: Large v3 (1.5GB) vs Medium (500MB)? | Sprint 5–6 | Sprint 5 |
| 5 | Mobile compute routing: desktop or AWS MediaConvert? | Companion app ADR | Before post-MLP |
| 11 | Style model sync conflict strategy: last-write-wins vs server-authoritative? | Sprint 15 | Sprint 14 |
| 7 | Hire 1–2 engineers post-validation gate: Electron native first or React frontend first? | Full MLP sprint velocity | Post-validation |

---

## Detail

### #1 — Validation Creators
**Blocking:** Validation gate.

Recruitment criteria:
- Windows creator (not Mac-first)
- 10K–200K subscribers
- Currently paying for ≥ 2 tools Vivido replaces
- Has expressed frustration with current workflow on record
- Available to use Vivido on 3 real videos within 30 days

Outreach order: warm intros → creators founder has publicly engaged with → creator communities (r/editors, r/youtubers).

---

### #2 — Patent Provisionals #1 + #3
**Blocking:** Any code shown to any creator. Showing prototype before filing = public disclosure = patent risk.

Budget estimate: $2,000–4,000 per provisional. Engage counsel immediately.

---

### #3 — Descript FTO Review
**Blocking:** Validation prototype build. FR15–FR17 (transcript-synced editing) cannot be built until FTO clears.

Budget estimate: $3,000–8,000 for FTO review.

---

### #4 — RN Component Sharing Boundary
**Blocking:** Sprint 1 start. Every React component written before this decision may need refactoring for React Native.

Decision needed: what goes in `packages/ui/` (shared, React Native compatible) vs `apps/desktop/` (Electron-only, DOM-dependent)?

Nx vs Turborepo is secondary — the boundary comes first. Nx recommended for large monorepos with cross-project caching. Turborepo simpler to set up. Both work.

#### Layman Explanation

This is deciding what should be a reusable UI building block and what should stay part of the desktop editor only.

If we try to make every screen reusable too early, we will mix simple design-system pieces with complex Electron-only editor code and create cleanup work later.

#### Recommended Direction

Use a two-layer boundary:

- `packages/ui` for reusable design-system primitives
- `apps/desktop` for desktop-specific feature composition and editor surfaces

#### Suggested Resolution

Put these in `packages/ui`:

- buttons
- tabs
- badges
- chips
- inputs
- sliders
- tokens
- small shared layout primitives

Keep these in `apps/desktop`:

- title bar shell
- timeline surfaces
- transcript workspace
- Audio Room workspace
- Publish workspace
- desktop shortcut and file-system interactions

In short: share the Lego bricks, not the assembled houses.

If no stronger alternative appears during sprint-0 planning, this should become the working decision for sprint 1.

---

### #8 — `usePlatform()` Interface Design
**Blocking:** Sprint 1 start. This is the most critical abstraction in the codebase.

Must specify:
- Request/response contract shape
- How to handle async native results (Promise? Event emitter?)
- How WASM fallback activates gracefully when native is unavailable
- How in-flight requests are cancelled

Recommended sketch:
```ts
interface PlatformRequest<T> {
  type: string;
  payload: T;
  signal?: AbortSignal; // cancellation
}

interface PlatformResponse<R> {
  type: string;
  result?: R;
  error?: { code: string; message: string };
}
```

#### Layman Explanation

This is the app's traffic controller between the UI and the heavy native systems.

The React screens should not know how to call FFmpeg, Whisper, or file-system code directly. They should ask one standard layer for work, and that layer decides whether to run the work on desktop-native services or browser-safe fallback logic.

#### Recommended Direction

Prefer a **capability-based grouped API** over a generic command bus.

Good:

```ts
platform.media.importFiles(...)
platform.transcript.startJob(...)
platform.publish.renderPackage(...)
```

Avoid:

```ts
platform.run("transcribe", payload)
```

Reason:

- easier to understand
- matches Vivido product modules
- easier to type, test, and refactor
- reduces chaos as features grow

#### Suggested Resolution

- grouped capability API by domain: `media`, `transcript`, `timeline`, `audio`, `publish`, `project`, `system`
- immediate operations return typed async results
- long-running operations are job-based with `jobId`, progress, and cancellation
- unsupported web operations return explicit `UNSUPPORTED` errors instead of hidden hacks

If no objection emerges during sprint-0 planning, this should become the working decision for sprint 1.

---

### #9 — IPC Schema Validation Toolchain
**Blocking:** Sprint 1–2 CI gate. The PRD requires CI to block release on IPC schema violations.

Recommendation: Zod schemas in `src/ipc/contracts/` + `zod-to-json-schema` for JSON Schema generation + CI script that validates all IPC calls against the generated schemas.

Name the toolchain explicitly before starting sprint 1 IPC work.

#### Layman Explanation

IPC is simply how the visible UI talks to the native desktop side.

The UI cannot directly perform heavy work like FFmpeg processing, Whisper transcription, file writes, or OS integrations. It sends messages to the native side asking for those actions.

Schemas are the rules for those messages. They ensure:

- required fields are present
- field types are correct
- malformed payloads are rejected safely
- the native side does not execute random or broken input

#### Recommended Direction

Use:

- **Zod** for defining IPC request/response schemas
- **zod-to-json-schema** for generated machine-readable schema output
- `packages/ipc` as the shared contract location
- CI validation to prevent contract drift

#### Suggested Resolution

- group IPC contracts by capability domain
- validate payloads at both renderer and native boundaries
- forbid raw untyped IPC in feature code
- use generated schemas for documentation and CI checks

If no stronger alternative appears during sprint-0 planning, this should become the working decision for sprint 1.

---

### #10 — Whisper Integration Method
**Blocking:** Sprint 5–6.

**N-API native addon:**
- Faster (in-process, no startup overhead)
- Couples to Electron ABI version — Whisper.cpp must be recompiled for each Electron version bump
- Higher maintenance burden for solo founder

**child_process IPC:**
- Whisper.cpp runs as separate process
- Slightly slower startup (~100ms)
- No Electron ABI coupling — upgrades don't require recompile
- Simpler to debug (separate process = separate logs)

**Recommendation for solo founder:** child_process. The ABI coupling of N-API creates ongoing maintenance friction that compounds badly when you're the only engineer.

---

### #6 — Whisper Model Tier Default
**Blocking:** Sprint 5–6 model management implementation.

| Model | Size | Accuracy | Download Time (50Mbps) |
|---|---|---|---|
| Large v3 | ~1.5 GB | Highest | ~4 min |
| Medium | ~500 MB | Good | ~80 sec |
| Base | ~150 MB | Acceptable | ~25 sec |

Recommendation: offer Large v3 as default with a "Download faster model" option for creators on slow connections. Medium as the alternative. Base as a fallback for disk-constrained systems.

---

### #5 — Mobile Compute Routing
**Blocking:** Companion app ADR (post-MLP).

When the React Native companion requests a render (e.g., approve a Shorts clip for upload from phone):
- Route to desktop app (if online and desktop is running)?
- Route to AWS MediaConvert (always available, costs money per job)?
- Hybrid: desktop if available, MediaConvert fallback?

Decision deferred to post-MLP — does not block any MLP sprint.

---

### #11 — Style Model Sync Conflict Strategy
**Blocking:** Sprint 15 implementation.

When a creator edits on two machines, SQLite local state diverges from Supabase cloud state:
- **Last-write-wins (client timestamp):** Simple, risk of accidental data loss if clocks drift
- **Server-authoritative:** Supabase always wins, local changes discarded — safer but frustrating if offline edits are lost
- **Three-way merge:** Most correct, most complex to implement

Recommendation: server-authoritative for MLP simplicity. Document the limitation clearly. Revisit at Stage 2 if creators report frustration.

---

### #7 — First Engineering Hire
**Blocking:** Full MLP sprint velocity (post-validation gate).

Priority order:
1. **Electron native engineer first** — GPU decode pipeline (FFmpeg + VideoToolbox + NVDEC), native IPC, file I/O, Whisper.cpp integration. This is the hardest and most blocking work in the MLP.
2. **React frontend engineer second** — Timeline UI, transcript view, Audio Room UI, Publish Package UI.

Start hiring conversations before the validation gate passes — have candidates ready. Time-to-hire adds 2–4 weeks after gate.
