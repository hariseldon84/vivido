# Vivido — Next Agent Handoff

**Created:** 2026-04-29
**Audience:** Next implementation agent (`Codex`, `Claude`, or human developer)
**Purpose:** Give the next agent a zero-guesswork starting point: what is decided, what is pending, what to build next, and which documents are authoritative.

---

## 1. Current State

This repo is still **planning-first**. There is **no actual app implementation yet**.

What exists:

- PRD and sharded epics in `prd/`
- locked design system and screen references in `_designs/`
- BMAD planning outputs in `_bmad-output/planning-artifacts/`
- Stage story maps in `_bmad-output/stories/`
- architecture blocker decisions captured in PRD docs

What does not exist yet:

- `apps/desktop`
- `apps/web`
- `packages/ui`
- `packages/ipc`
- `packages/project`
- `packages/style-model`
- running app UI

---

## 2. Working Decisions Already Captured

Read these first:

1. `prd/26-architecture-blockers-summary.md`
2. `prd/23-useplatform-contract-note.md`
3. `prd/24-ipc-schema-tooling-note.md`
4. `prd/25-shared-ui-boundary-note.md`

These are the current working decisions:

- `usePlatform()` uses a grouped capability API
- IPC contracts use Zod + JSON Schema generation
- `packages/ui` contains primitives only
- desktop feature surfaces stay in `apps/desktop`

---

## 3. Source Of Truth Order

If documents conflict, use this order:

1. `prd/02-architecture.md`
2. `prd/01-vision.md`
3. `prd/18-development-guidelines.md`
4. `_designs/design-guidelines.md`
5. `_designs/app-ui/*.html`
6. epic files in `prd/03` through `prd/10`
7. `final_prd.md` as summary only

Important note:

- `final_prd.md` says "build from this"
- `prd/00-index.md` says `prd/` is canonical

For implementation, treat `prd/` as canonical.

---

## 4. What Was Just Completed

Recently completed planning work:

- added development guidelines tying PRD + architecture + design system together
- added design-adherence sections to all MLP epics
- added milestone docs for validation, MLP, growth, and platform
- added stage story maps for stages 0–3
- captured the three sprint-1 architecture blocker decisions

---

## 5. What Is Next

The next implementation milestone is **E1 Foundation Shell**.

Primary reference:

- `prd/03-epic-foundation.md`

Execution should begin with:

1. repo scaffolding
2. desktop shell bootstrap
3. IPC contract package bootstrap
4. project schema foundation
5. basic shell UI matching locked chrome

---

## 6. Immediate Build Order

Do these in order:

1. Create monorepo folders:
   - `apps/desktop`
   - `apps/web`
   - `packages/ui`
   - `packages/ipc`
   - `packages/project`
   - `packages/style-model`

2. Set up workspace package manifests and baseline TypeScript config

3. Implement desktop shell boot path:
   - Electron main
   - React renderer
   - Vite integration

4. Implement shared design tokens + primitive UI package

5. Implement title bar / tab chrome matching `_designs/app-ui/01-timeline-editor.html`

6. Implement Zod IPC package skeleton

7. Implement `usePlatform()` skeleton using grouped capability namespaces

---

## 7. How To Talk To The User

The user explicitly asked for:

- plain-English explanations
- whenever something is built, explain **where they can see it in the UI**
- whenever something is built, explain **how to test it**
- tell them **what command to run**
- tell them whether `npm`, Docker, server, or anything else is required

Do not assume the user wants only technical jargon. Always include:

- what changed
- where to click
- what command to run
- what they should expect to see

---

## 8. Expected Local Run Model

Nothing is scaffolded yet, so these commands do **not** work yet.

Target local run model to establish:

- `npm install`
- `npm run dev:desktop`
- `npm run dev:web`

No Docker is required for the initial shell milestone.
No backend server is required for the initial shell milestone.

Later milestones may introduce:

- Supabase local/dev configuration
- OAuth secrets
- billing integration config

But not for the first shell pass.

---

## 9. Critical References For E1

- `prd/03-epic-foundation.md`
- `prd/18-development-guidelines.md`
- `prd/26-architecture-blockers-summary.md`
- `_designs/design-guidelines.md`
- `_designs/app-ui/01-timeline-editor.html`

---

## 10. Pending Open Questions After The 3 Blockers

Still pending:

- Whisper integration method (`N-API` vs `child_process`)
- Whisper default model tier
- style-model sync conflict strategy
- validation-creator/legal gate items

These do not block the shell scaffold, but they do block later epics.

---

## 11. Recommended Next Agent Action

Read:

1. `prd/26-architecture-blockers-summary.md`
2. `prd/03-epic-foundation.md`
3. `_bmad-output/implementation-artifacts/01-e1-foundation-handoff.md`

Then start scaffolding E1.
