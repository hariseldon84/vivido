# Vivido Working Context

**Created:** 2026-04-28
**Purpose:** Fast re-entry context for product, design, architecture, and execution decisions.

## Canonical Sources

- Product source of truth: `prd/`
- Entry point: `prd/00-index.md`
- Locked architecture: `prd/02-architecture.md`
- Locked design system: `_designs/design-guidelines.md`
- Locked app screen explorations: `_designs/app-ui/`
- BMAD planning lineage: `_bmad-output/planning-artifacts/`

## Important Repo Reality

- `final_prd.md` says "Approved — build from this".
- `prd/00-index.md` says `prd/` is the source of truth and `final_prd.md` is archived.
- For implementation work, prefer `prd/` and use `final_prd.md` as a consolidated summary only.

## Product Direction

Vivido is a local-first, cross-platform desktop video editor for YouTube creators. The MLP is not a general creative suite. It is a focused wedge around:

1. Native GPU-backed playback.
2. YouTube-native timeline primitives.
3. Whisper-powered transcript editing.
4. Audio Room + Publish Package.

The strategic claim is not "AI video editor". It is "the last video editor a YouTube creator installs" because the product compounds creator-specific editorial knowledge over time.

## Delivery Shape

- Primary product: desktop app
- Desktop stack: Electron + React + Vite
- Compute split: browser runtime for UI, native runtime for FFmpeg / Whisper / file I/O / GPU paths
- Web app: secondary companion surface at MLP, not the main editing environment
- Mobile: React Native companion after MLP, not before

## Locked Technical Choices

- Frontend: React + Vite
- Desktop shell: Electron
- Video engine: native FFmpeg subprocess in Electron, WASM fallback for browser preview only
- Transcription: Whisper.cpp local inference
- Auth and metadata: Supabase
- Output storage: Cloudflare R2
- Payments: Stripe + Razorpay
- Cloud render later: AWS MediaConvert

## Design Context

The design system is unusually opinionated and should be treated as product strategy, not decoration:

- Dark-only UI
- Dense, professional editor layout
- Indigo as the dominant app accent
- Fixed panel muscle-memory layout
- AI is always disclosed and reversible

Locked UI concepts already exist for:

- Timeline editor
- Transcript editor
- Audio Room
- Publish Package

Landing page variants exist, but they are exploratory. The app UI docs are more important than the marketing variants.

## Planning Maturity

This repo is strong on strategy and product definition, but still pre-implementation.

What exists now:

- PRD and sharded epics
- Design explorations
- BMAD planning artifacts
- Monorepo intent in `package.json`

What does not exist yet:

- `apps/desktop`
- `apps/web`
- `packages/ui`
- `packages/ipc`
- `packages/style-model`
- actual implementation code

## Immediate Execution Constraints

Before sprint 1, the repo itself says these are blocking:

- settle the `usePlatform()` interface
- define the IPC schema validation toolchain
- define the shared React / future React Native component boundary

Before external validation, the plan also calls out:

- Descript FTO review
- provisional patent filings
- 5 creator commitments for validation

## Recommended Working Model

Use the tools in this order:

1. **BMAD for product management and story generation**
   Use it to keep PRD, epics, acceptance criteria, and scope discipline coherent.

2. **Gstack for implementation and QA execution**
   Use it to actually build, test, review, benchmark, and ship code once coding starts.

3. **Do not use GSD as the primary operating framework**
   It can be a mindset, but this repo is too strategy-heavy and too architecture-sensitive for a pure "just build fast" mode.

## Practical Recommendation

For Vivido, the right operating split is:

- **BMAD = planning OS**
- **Gstack = engineering OS**

That matches the repo's current state:

- BMAD already produced the research and PRD backbone.
- Gstack-style workflows are better suited for the upcoming implementation phase, especially because this product has heavy native/runtime/performance risk.

## Suggested Next Build Sequence

1. Normalize the source of truth.
   Decide whether `final_prd.md` is truly active or whether `prd/` is canonical.

2. Create the actual monorepo skeleton.
   Add `apps/desktop`, `apps/web`, and initial `packages/*`.

3. Lock the three architectural blockers.
   `usePlatform()`, IPC schemas/tooling, shared component boundary.

4. Build the validation prototype first.
   Transcript editing + creator presets + Publish Package, without full GPU timeline complexity.

5. Only then expand to the full MLP sequence in `prd/14-build-order.md`.

## Short Recommendation

If choosing one framework for how to run the project:

- choose **BMAD + Gstack together**

If forced to choose only one right now:

- choose **BMAD** for the next immediate phase if the goal is clarifying plan and turning epics into implementable stories
- choose **Gstack** the moment the repo shifts from planning to actual coding, QA, and shipping
