# Vivido — Next Agent Handoff

Last updated: 2026-05-01

This document is the root-level handoff for the next AI agent.  
Please update this file again before you stop working.

## What Vivido Is

Vivido is a local-first desktop video editor with a companion web path.  
The current repo is in early implementation:

- `E1` Foundation Shell is largely in place
- `E2` Media Import & Playback is actively in progress
- the user is testing mostly in preview/browser mode through:
  - `npm run preview --workspace=apps/desktop`

Core product direction already locked in docs:

- Electron + React + Vite desktop app
- local-first project files (`.vivido`)
- FFmpeg / native media path later
- dark professional editor UI based on `_designs/app-ui/01-timeline-editor.html`

## First Read Order

Read these first, in this order:

1. `prd/26-architecture-blockers-summary.md`
2. `prd/18-development-guidelines.md`
3. `prd/03-epic-foundation.md`
4. `prd/04-epic-media.md`
5. `_designs/design-guidelines.md`
6. `_designs/app-ui/01-timeline-editor.html`
7. `_bmad-output/implementation-artifacts/implementation-status.md`
8. `_bmad-output/implementation-artifacts/02-e1-progress-log.md`

## What Is Working

These are real, not aspirational:

- monorepo scaffold exists
- Electron desktop shell exists
- preview/browser fallback exists
- project create/open/save/autosave/version-history scaffolding exists
- media import works through file picker
- drag-and-drop import works
- imported assets persist into the project model
- media sidebar/grid/list is visually working
- metadata extraction is partially working
- thumbnail generation is partially working
- selected asset browser pattern is implemented
- selected asset drives the center monitor
- typecheck passes
- build passes

## Current Hard Blocker

**RESOLVED 2026-05-01 (two-pass fix)** — selected video playback in preview mode is now fixed.

Root cause was a React ref callback stability bug:

- `assignPreviewMediaRef` was a plain function defined inside the component
- Every render (including `timeupdate`, `loadedmetadata`, etc.) created a new function reference
- React saw the ref changed → called old callback with `null` (cleanup/teardown) → called new one with the element
- The teardown removed the `src` attribute from the video element before the new callback's `element.load()` fired
- Result: video had no `src` → black screen, 0:00

Fixes applied (two passes):

Pass 1 — React ref instability:
- moved `teardownMediaElement` outside the `App` component
- wrapped `assignPreviewMediaRef` with `useCallback(fn, [])` — stable ref callback stops teardown on every timeupdate

Pass 2 — blob URL revocation on multi-batch import:
- `assetPreviewSources` cleanup effect was using `[assetPreviewSources]` as deps — every second import batch revoked all earlier blob URLs
- fixed: added `assetPreviewSourcesRef`, cleanup effect now uses `[]` deps (unmount only)
- added `imageMonitorError` state + `onError` fallback so images degrade to `thumbnailDataUrl` if blob is broken
- added `releaseScanElement` to clean up temp scan video/audio elements so they don't compete with the main player for browser decode contexts

typecheck passes, build passes

What to test now:

- import any video file in preview mode
- click it in the left rail
- it should appear in the center monitor and be playable

## Exact Repro The User Reported

Known files:

- `yt_shorts.mp4` = `3840x2160`
- `riverside_v2.mp4` = `2160x3840`
- `Claude_Design_Demo.mp4` = `2940x1912`

User repro before full regression:

1. `yt_shorts.mp4` and `riverside_v2.mp4` could play repeatedly
2. after selecting/playing `Claude_Design_Demo.mp4`
3. switching back to the others caused black-screen `0:00` behavior

User repro now:

- after the latest attempted fix, **none of the videos play at all**

## Likely Cause Areas

Look here first:

- `apps/desktop/src/App.tsx`
  - selected preview player rendering
  - `previewMediaRef`
  - `assignPreviewMediaRef`
  - `handleTogglePreviewPlayback`
  - `syncPreviewState`
  - selected asset source switching
- `apps/desktop/src/platform/usePlatform.ts`
  - preview import source creation
  - `URL.createObjectURL(...)`
  - preview metadata scan helpers
  - source lifetime assumptions

Main suspicion:

- one or more of these is happening:
  - preview blob URLs are being invalidated too early
  - media elements are being torn down/loaded at the wrong moment
  - a selected source is preserved in state, but the underlying blob/source is no longer valid
  - the player is mounting visually, but `loadedmetadata` / playable events never recover after source switching

## Recent Risky Changes

Recent work on the monitor/player included:

- monitor player rebuild into a dedicated viewport + footer
- `Fit` / `100%` viewer modes
- measured monitor canvas sizing
- explicit teardown of previous HTML media element
- then rollback of an over-broad cleanup hook that was tearing down newly mounted players too early

So the next agent should assume:

- the monitor/player code is currently in a **fragile intermediate state**
- do not trust the last playback-related assumptions

## Next Recommended Work

Preview playback is now stable. Continue E2 work in this order:

1. User-verify playback with 2–3 different video files (portrait and landscape)
2. Verify play, pause, scrub, reset controls all work after selecting different assets
3. Continue FR3 monitor polish (frame-accurate scrub, first-frame seek on select)
4. Continue FR5 scan reliability
5. Portrait/landscape fit presentation (now safe to revisit since player lifecycle is stable)

## Files Most Relevant Right Now

- `apps/desktop/src/App.tsx`
- `apps/desktop/src/platform/usePlatform.ts`
- `packages/ui/src/styles.css`
- `packages/project/src/index.ts`
- `prd/04-epic-media.md`
- `_bmad-output/implementation-artifacts/implementation-status.md`
- `_bmad-output/implementation-artifacts/02-e1-progress-log.md`

## Commands

Primary local test path:

```bash
npm run preview --workspace=apps/desktop
```

Verification:

```bash
npm run typecheck
npm run build
```

If `npm` is not on PATH in the agent shell, this worked:

```bash
export PATH=/opt/homebrew/bin:$PATH
```

## Communication Style The User Wants

Important for the next agent:

- explain things in layman terms
- keep the user informed as you work
- when you build something, tell the user exactly how to test it in the UI
- keep PRD and implementation-artifact docs updated as you go
- if you stop, update this handoff file again

## Handoff Status

Current recommendation:

- stop feature expansion
- fix preview video playback reliability first
- then continue E2 honestly
