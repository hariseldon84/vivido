# Vivido — Implementation Status

**Last updated:** 2026-05-01

---

## Completed Planning / Setup Work

- PRD sharded and organized under `prd/`
- development guidelines added
- design-adherence rules added to all MLP epics
- milestone docs added
- stage story maps added
- sprint-1 architecture blocker decisions captured
- next-agent handoff docs created

---

## In Progress

- E1 Foundation Shell is functionally mature but still has a few foundation closeout items open
- E2 Media Import & GPU Playback has started with import and asset-library groundwork
- preview-mode selected video playback blocker was resolved: root cause was unstable React ref callback causing teardown on every render; fixed by moving teardown helper outside the component and wrapping the ref callback in useCallback with stable empty deps
- repo/package structure is now in place
- dependencies are installed
- typecheck and build are passing
- initial shell UI is visually confirmed by the user
- project create/open shell flow is implemented
- autosave and crash-recovery scaffold are implemented
- atomic save writes and visible version-history list are implemented
- version-history restore action is implemented
- preview runtime fallback makes shell flows testable without desktop file APIs
- runtime-mode visibility and preview export-to-file are implemented
- user-reported shell usability bugs around select-all, replace confirmation, and preview open behavior are fixed
- shell runtime refinement is still in progress
- shell chrome/layout polish pass completed against the locked editor reference
- E1 epic file now includes pending-item remarks explaining why unchecked work is still open
- AI Trust Settings scaffold is now mounted in the shell inspector
- left-rail typography and hierarchy were refined after direct user visual feedback
- action cluster and project status block were refined for quieter professional-editor hierarchy
- desktop export now binds a real project file path and the shell explains recovery expectations more clearly
- Project Status now explains the 30-second autosave cadence in plain language
- shell file actions now separate `Save`, `Save As`, and `Export`
- shell overflow is now constrained so side panels scroll instead of expanding the editor area
- static Electron preview path is fixed so the built renderer loads correctly from disk
- desktop IPC bridge is now schema-validated at both preload and main-process boundaries
- file-browser media import is implemented in desktop mode with preview fallback
- imported media now persists into the project model and renders in the left asset rail
- E2 FR mapping is explicitly tracked as partial for FR1/FR2/FR5/FR6
- E2 FR5 has advanced to partial with real metadata extraction paths, while FR6 is strengthened by visible metadata in the asset library
- E2 FR1 is strengthened with drag-and-drop import using the same asset pipeline as picker import
- drag-and-drop import now has an in-UI discoverability hint near the asset library header
- imported assets can now be removed from the current library and the rail search input is visually quieter
- media detail rows now handle long filenames more gracefully
- desktop media scans now attempt deeper `ffprobe` probing for frame rate, color profile, codec, and technical timing where available
- asset rows now expose scan-source labels so technical metadata can be interpreted more honestly during testing
- partial scan states now render as structured metadata chips plus a softer scan-status line, so preview-mode gaps read as incomplete data rather than broken UI
- preview-mode video imports now attempt lightweight frame-rate estimation instead of leaving fps blank in every browser-scanned case
- desktop color-profile labels are now normalized into more human-readable output instead of raw ffprobe tokens
- imported video/image assets now attempt real renderer-generated thumbnails instead of always using abstract placeholder art
- desktop deep-scan now attempts native thumbnail extraction through `ffmpeg` candidates before relying on the renderer fallback path
- the media sidebar now uses selection-driven inspection instead of repeating every asset as a full detail card, reducing long-scroll duplication
- selecting an asset now updates the center monitor with a real preview state for visual media or an audio-ready state for audio assets
- selected assets now also keep transient in-session preview source URLs so the monitor can open real video/audio previews instead of only static thumbnail states
- selected media in the monitor now has a first custom playback-control layer with play/pause, jump-to-start, and scrubbing
- the selected-asset monitor player has been rebuilt as a dedicated viewport + footer composition instead of a nested card inside the stage
- the monitor toolbar now supports `Fit` and `100%` viewer modes for selected media
- the new player surface uses detected media dimensions to drive a dedicated viewport instead of only showing resolution as metadata text
- selected media now sizes against the measured monitor canvas in pixels, which is more reliable for repeated portrait-media selections than percentage-based viewport rules
- selected preview media now explicitly tears down the previous HTML media element before loading the next one, to avoid black-screen / `0:00` carryover after switching between imported videos
- the over-broad selection-change teardown hook was removed after it caused newly mounted preview players to be torn down too early

---

## Next Task

Preview playback is now stable. Resume E2 feature work:

- user-verify playback with 2–3 video files including portrait and landscape
- verify play/pause/scrub/reset controls across multiple asset selections
- continue FR3 monitor work: first-frame seek on asset selection, frame-accurate scrub
- continue FR5 scan reliability improvements

After that:

- deepen FR5 scan coverage and reliability across desktop and preview paths
- add thumbnail generation jobs
- prepare first-frame preview / playback wiring
- keep E1 closeout notes updated as remaining foundation items are addressed

Most recent completed step:

- fixed preview-mode video playback regression: assignPreviewMediaRef was an inline function (new reference on every render), causing React to call teardown → remove src → reload blank on every timeupdate/loadedmetadata event; fixed by wrapping in useCallback with empty deps and moving the teardown helper outside the App component

Primary file:

- `_bmad-output/implementation-artifacts/01-e1-foundation-handoff.md`
- `_bmad-output/implementation-artifacts/02-e1-progress-log.md`

---

## Pending After E2 Slice

- full playback and GPU decode implementation inside E2
- E4 Transcript & Captions
- E3 Timeline Editor
- E6 YouTube Primitives & Publish Package
- E5 Audio Room
- E7 Style Model
- E8 Auth, Accounts & Cloud Infrastructure

---

## Reference Reading Order For Next Agent

1. `prd/26-architecture-blockers-summary.md`
2. `prd/03-epic-foundation.md`
3. `prd/18-development-guidelines.md`
4. `_designs/design-guidelines.md`
5. `_designs/app-ui/01-timeline-editor.html`
6. `_bmad-output/implementation-artifacts/00-next-agent-handoff.md`
7. `_bmad-output/implementation-artifacts/01-e1-foundation-handoff.md`
8. `NEXT_AGENT_HANDOFF.md`
