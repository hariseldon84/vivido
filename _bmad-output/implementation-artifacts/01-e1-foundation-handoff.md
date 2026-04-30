# Vivido — E1 Foundation Shell Handoff

**Epic:** E1 Foundation Shell
**Source:** `prd/03-epic-foundation.md`
**Status:** Ready for implementation

---

## 1. Goal In Plain English

Build the empty app shell first.

By the end of this epic, the user should be able to open Vivido as a desktop app and see:

- the top title bar
- the tab navigation
- the bottom status bar
- a blank editor shell

No real editing features yet. Just the proper skeleton.

---

## 2. What The User Should Eventually Be Able To Test

When E1 is scaffolded and running:

1. Run `npm install`
2. Run `npm run dev:desktop`
3. A desktop Vivido window should open
4. The user should see:
   - app shell chrome
   - title bar structure inspired by `_designs/app-ui/01-timeline-editor.html`
   - tabs like `Editor`, `Transcript`, `Audio Room`, `Publish`
   - empty main workspace
   - status bar at bottom

This is the first visible proof that development has started.

---

## 3. What To Build In This Epic

### A. Monorepo Skeleton

Create:

- `apps/desktop`
- `apps/web`
- `packages/ui`
- `packages/ipc`
- `packages/project`
- `packages/style-model`

### B. Desktop Runtime

Set up:

- Electron main process
- Electron preload bridge
- React renderer
- Vite dev flow

### C. Shared Foundations

Set up:

- TypeScript base config
- workspace package manifests
- shared token foundations in `packages/ui`
- IPC contracts package using Zod

### D. Shell UI

Implement:

- app title bar
- desktop navigation tabs
- empty panel shells
- bottom status bar

### E. Project Foundation

Implement:

- `.vivido` schema foundation
- blank project creation shape
- placeholder open/save structure

---

## 4. What Not To Build Yet

Do not build these in E1:

- real timeline editing
- real transcription
- real media playback
- real audio processing
- real publish package
- Supabase integration
- billing flows

E1 is shell + contracts + scaffolding only.

---

## 5. Design Constraints

Use these as hard references:

- `_designs/design-guidelines.md`
- `_designs/app-ui/01-timeline-editor.html`
- `prd/18-development-guidelines.md`

Important:

- dark-only
- dense professional layout
- indigo accent only
- no generic SaaS dashboard styling

---

## 6. Architecture Constraints

Must follow:

- grouped `usePlatform()` capability API
- Zod-based shared IPC contracts
- primitive-only `packages/ui`
- desktop shell/features in `apps/desktop`

See:

- `prd/23-useplatform-contract-note.md`
- `prd/24-ipc-schema-tooling-note.md`
- `prd/25-shared-ui-boundary-note.md`

---

## 7. Suggested Build Sequence

1. workspace + tsconfig scaffold
2. Electron + renderer boot
3. `packages/ui` token foundation
4. `packages/ipc` contract foundation
5. `usePlatform()` stub/skeleton
6. shell UI matching design reference
7. placeholder project schema and save/open interfaces

---

## 8. Definition Of Done

This epic is done when:

- `npm run dev:desktop` launches the desktop app
- the user can visibly see the shell UI
- the shell visually aligns with the locked design language
- IPC and `usePlatform()` scaffolding exist in code
- the repo structure matches the intended architecture

---

## 9. First User-Facing Test Script

Once implemented, explain testing to the user like this:

- Install deps: `npm install`
- Start desktop app: `npm run dev:desktop`
- Look at the top of the app window
  - you should see the Vivido shell and tab structure
- Click `Transcript`, `Audio Room`, and `Publish`
  - the tabs should switch views, even if content is placeholder
- Look at the bottom
  - you should see a status bar

If any of those are missing, E1 is not complete.
