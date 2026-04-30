# Vivido — E1 Progress Log

**Started:** 2026-04-29
**Epic:** E1 Foundation Shell

---

## Completed In This Pass

- scaffolded workspace package manifests for:
  - `apps/desktop`
  - `apps/web`
  - `packages/ui`
  - `packages/ipc`
  - `packages/project`
  - `packages/style-model`
- added root `tsconfig.base.json`
- created Electron main/preload skeleton
- created desktop React/Vite shell scaffold
- created shared UI primitives:
  - `Tabs`
  - `PanelHeader`
  - `AIBadge`
- created shared design token stylesheet
- created `usePlatform()` grouped capability stub
- created initial Zod IPC schemas
- created `.vivido` schema foundation
- wired desktop `New Project` flow to create and save a blank `.vivido` file
- wired desktop `Open Project` flow to load an existing `.vivido` file from disk
- set default project directory to the OS videos folder under `Vivido/`
- added editable project name + project notes fields in the shell
- wired autosave to persist project changes every 30 seconds
- added versioned autosave snapshots under the app recovery directory
- added crash-recovery restore check on app launch
- added visible save/recovery status in the UI and a manual `Save Now` action
- switched save and autosave paths to atomic temp-write + rename
- exposed visible version-history entries in the inspector panel
- added restore action for version-history entries
- added preview/browser runtime fallback for project creation, save, autosave, version history, and restore
- added explicit runtime-mode labels in the shell
- added `Export .vivido` action so preview mode can generate a real file download
- added keyboard select-all support for project name and notes fields
- added confirmation dialog before replacing the current project with `New Project` or `Open Project`
- improved preview-mode `Open Project` behavior and messaging
- polished the shell layout closer to `_designs/app-ui/01-timeline-editor.html`
- added media-browser style left rail treatment, richer transport/title chrome, and a more editor-like preview monitor
- reworked the inspector into clearer runtime, health, schema, recovery, and version-history sections
- mounted an `AI Trust Settings` scaffold in the inspector
- updated `prd/03-epic-foundation.md` with explicit pending-item remarks so unchecked E1 work is explained in-place
- refined the left rail typography and hierarchy after user design feedback
- compressed `Workspace Shortcuts` into a quieter compact block instead of two oversized cards
- reduced left-panel visual noise with smaller media caption text, tighter spacing, and more subdued project summary cards
- refined the action cluster into a clearer primary/secondary stack
- redesigned the project status block to read like a compact system state panel instead of a large text card
- fixed desktop export so `Export .vivido` now binds a real active project file path instead of acting like a disconnected download only
- clarified recovery messaging so the shell explains that recovery drafts appear only after autosave plus an unexpected close
- added an explicit autosave explanation to the Project Status block so the 30-second wait is explained in-product
- separated shell file actions into clearer `Save`, `Save As`, and `Export` meanings
- updated desktop/preview messaging so `Export` is explicitly a separate output action rather than the main save path
- fixed shell overflow so sidebar/inspector content scroll inside their own panels instead of pushing the editor canvas downward
- fixed static Electron preview output to use relative asset paths so `npm run preview --workspace=apps/desktop` does not open a blank window
- hardened the desktop IPC bridge with shared request/response types for project actions
- added schema validation at both the preload boundary and the Electron main-process handlers
- replaced duplicate renderer-side window bridge typing with the shared IPC bridge type
- installed npm dependencies successfully
- passed workspace typecheck successfully
- passed workspace build successfully
- added static desktop preview mode for environments where a Vite dev port cannot be opened
- user visually confirmed the first shell view opens successfully

---

## What You Will Eventually Be Able To See In The UI

Once the desktop app is launched, the user should see:

- top title bar with app name and menu labels
- tab group:
  - `Editor`
  - `Transcript`
  - `Audio Room`
  - `Publish`
- left placeholder media panel
- `New Project` and `Open Project` buttons in the left panel
- `Save Now` button in the left panel
- `Export .vivido` button in the left panel
- editable project name field in the left panel
- center preview shell with tab-specific placeholder content
- editable project notes area in the center panel
- version history list in the right inspector
- restore action on each version-history entry
- bottom status bar

This is the first visible E1 shell, not the full editor.

Important update:

- in preview/browser mode, the shell is no longer view-only
- project actions now fall back to local browser storage so the user can test flows without desktop file APIs

---

## How To Run Once Dependencies Are Installed

From repo root:

1. `npm install`
2. `npm run dev:desktop`

Optional web companion scaffold:

1. `npm install`
2. `npm run dev:web`

Fallback desktop preview mode:

1. `npm install`
2. `npm run preview --workspace=apps/desktop`

Use preview mode if the environment blocks local dev ports.

---

## What Still Needs To Be Done In E1

- refine shell visual match against `_designs/app-ui/01-timeline-editor.html`
- UI-harden version-history browsing
- add actual IPC bridge shape beyond placeholder preload exposure
- prepare CI/build pipeline work once packaging metadata is ready
- define and enforce the no-auto-apply confirmation contract for future AI actions

The first install/build issues have already been fixed in this pass.

---

## Important Note

Current verification status:

- `npm install` succeeded
- `npm run typecheck` succeeded
- `npm run build` succeeded
- `npm run dev:desktop` is expected to work on a normal local machine, but this sandbox blocks local port binding
- `npm run preview --workspace=apps/desktop` launches the static desktop preview path cleanly in this environment
- the user has visually confirmed that the shell view is visible on their side
- preview mode now supports practical shell testing instead of only showing unsupported desktop-runtime messages
- after the latest shell polish pass, typecheck and build still pass cleanly
- after mounting the AI trust scaffold, typecheck and build still pass cleanly
- after the left-rail typography refinement, typecheck and build still pass cleanly
- after the action/status polish pass, typecheck and build still pass cleanly
- after fixing export/save binding and recovery messaging, typecheck and build still pass cleanly
- after adding autosave cadence guidance to Project Status, typecheck and build still pass cleanly
- after splitting `Save` / `Save As` / `Export`, typecheck and build still pass cleanly
- after fixing shell overflow and panel scrolling, typecheck and build still pass cleanly
- after fixing static Electron preview asset paths, desktop build still passes cleanly
- after IPC bridge hardening, workspace typecheck and build still pass cleanly

---

## How To Test The New Project Flow

Run one of:

1. `npm run dev:desktop`
2. or if your environment blocks dev ports: `npm run preview --workspace=apps/desktop`

Then in the UI:

1. Look at the **left panel**
2. Click **New Project**
3. Choose a save location when the system dialog appears
4. After saving, you should see:
   - the project path update in the left panel
   - the project status message say the blank project was created
   - the center preview meta reflect the active project name

To test opening:

1. Click **Open Project**
2. In desktop runtime: select the `.vivido` file you just created
3. In preview runtime: it will reopen the latest locally stored preview project
4. You should see:
   - the same project name/path appear
   - the project status message change to a loaded message

Where this feature is visible:

- left panel: project buttons, project path, project status
- center panel: active project metadata
- right panel: project JSON summary

---

## How To Test Autosave And Recovery

Run one of:

1. `npm run dev:desktop`
2. or if your environment blocks dev ports: `npm run preview --workspace=apps/desktop`

Then in the UI:

1. Click **New Project** and save a `.vivido` file
2. In the **left panel**, change the project name
3. In the **center panel**, type something into the project notes area
4. Wait about **30 seconds**
5. Watch the **bottom status bar**
   - it should change from pending/dirty state to a time-based autosave status
6. Also check the **left panel project status**
   - it should say the project was autosaved successfully

To test recovery:

1. Create or open a project
2. Edit the project name or notes
3. Wait for autosave to complete
4. Close the app abnormally or restart after a simulated unclean session
5. On next launch, if a recovery draft exists, the app should restore it and show a recovery message

Where this feature is visible:

- left panel: project name, project status, last save state
- center panel: notes content that gets autosaved
- right panel: recovery summary and version-history list
- bottom status bar: autosave state

---

## How To Test Version Restore

Run one of:

1. `npm run dev:desktop`
2. or if your environment blocks dev ports: `npm run preview --workspace=apps/desktop`

Then in the UI:

1. Create a new project
2. Type one note and wait for autosave
3. Change the note again and wait for another autosave
4. Go to the **right inspector**
5. Under **Version History**, click **Restore** on an older entry
6. You should see:
   - the note content roll back to that saved version
   - the project status message say a version was restored
   - the editor become dirty again so you can save the restored state intentionally

Where this feature is visible:

- right inspector: Version History list with `Restore` buttons
- center panel: note content changes after restore
- left panel / status bar: save state messaging updates

---

## Preview Runtime Behavior

When Electron file APIs are unavailable, the shell now falls back to browser/local preview storage.

That means these actions are testable in preview mode:

- `New Project`
- `Open Project`
- `Save Now`
- autosave
- version history
- restore

Preview-mode file path shown in the UI:

- `Preview runtime · local storage`

The shell now also explicitly displays the runtime mode:

- `Desktop file mode`
- or `Preview local-storage mode`

---

## Latest Development Step

This step focused on shell fidelity and E1 documentation clarity:

- the left rail now feels more like a real media browser instead of a plain form column
- the title bar now has proper traffic lights and transport grouping closer to the locked shell
- the preview stage now reads more like a program monitor with toolbar and safe-area treatment
- the inspector is broken into meaningful sections rather than one flat stack of cards
- the inspector now includes a visible AI trust scaffold for future compliance-sensitive actions
- `prd/03-epic-foundation.md` now explains why open E1 boxes are still open and what the next action is for each area

How to test this visual pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Look at the top bar
3. You should now see:
   - traffic-light window dots on the left
   - grouped transport controls in the middle
   - tabs still on the right
4. Look at the left panel
5. You should now see:
   - media-style thumbnail blocks
   - a search field
   - a more editor-like side rail before the project controls
6. Look at the center panel
7. You should now see:
   - a monitor toolbar row
   - a darker framed preview stage with safe-area treatment
8. Look at the right panel
9. You should now see:
   - clearer sections for runtime, project health, schema, recovery, and version history
   - an `AI Trust` section showing confirmation/disclosure guardrails
10. Look again at the left rail controls
11. You should now see:
   - `New Project` as the clear primary action
   - `Open Project` and `Save Now` grouped as quieter secondary actions
   - `Export .vivido` visually de-emphasized as a utility action
   - `Project Status` shown with small state pills and compact metadata rows instead of a large loose text block

How to test the export/save fix:

1. Run `npm run dev:desktop`
2. Type a project name in the left rail
3. Click `Save As`
4. Choose a save location in the native desktop dialog
5. After saving, check the left rail
6. You should now see:
   - `Project Path` updated to the real local `.vivido` file path
   - `Last saved` updated to the current time
   - status text describing the created project file path
7. Edit the project again
8. Wait about 30 seconds for autosave
9. Then check:
   - `Last saved` should update again
   - version history should start accumulating for that project

How `Export` should behave now:

1. With any project open, click `Export`
2. A `.vivido` file should download/export as a separate output
3. The current `Project Path` should remain unchanged
4. The status should say that export did not change the active save location

How to test the overflow fix:

1. Run `npm run preview --workspace=apps/desktop`
2. Click `Save` or `Save As` several times so the status/path area updates
3. Watch the center editor area
4. It should stay fixed in place
5. The left rail should scroll internally if its content grows
6. The preview canvas should no longer get pushed downward or stretched by sidebar content

How to test the preview blank-screen fix:

1. Run `npm run preview --workspace=apps/desktop`
2. The desktop window should now render the Vivido shell instead of a blank black screen
3. This works because the static preview HTML now references `./assets/...` instead of `/assets/...`

What improved in the IPC layer during this pass:

1. The project bridge now uses one shared type definition instead of separate handwritten renderer/preload typings
2. Incoming desktop project messages are validated before they leave the renderer bridge
3. The Electron main process validates payloads again before using them
4. Main-process responses are also normalized against shared schemas before they come back to the renderer

This step does not change the visible UI much, but it makes future features safer to build.

How recovery is supposed to work:

1. First bind the project to a real file path using `New Project` or the fixed `Export .vivido`
2. Make an edit
3. Wait for autosave to run
4. Then close the app unexpectedly
5. On the next launch, Vivido should detect and offer the recovery draft

If the app closes normally, seeing `No recovery draft detected yet` is correct.

Follow-up usability fixes that remain in place after user testing:

- `Cmd+A` / `Ctrl+A` now selects text in editable shell fields
- `New Project` asks for confirmation before replacing the current in-editor state
- `Open Project` also asks for confirmation before replacing the current in-editor state

---

## E2 Media Import Start

- E2 is now in progress
- desktop mode can open a native media picker for supported video, audio, and image files
- preview mode can use browser file selection so import flows are still testable
- imported assets are stored inside the project model
- the left sidebar now shows a real asset library instead of only placeholder media tiles
- after user review, E2 FR mapping is now called out explicitly:
  - `FR1` partial
  - `FR2` partial
  - `FR5` partial
  - `FR6` partial
- improved imported media readability by separating the duration badge from the filename and allowing the filename to use two lines
- shortened placeholder metadata copy so audio/video asset rows are easier to scan
- added metadata extraction paths so imported assets can populate real duration, dimensions, and some audio metadata where available
- added clip-details list rendering so media metadata is actually inspectable in the UI
- added drag-and-drop import on the asset library rail, using the same import pipeline as the file picker
- added a visible drop overlay so the drag target is clear and intentional
- added a persistent asset-library hint so users can discover drag-and-drop without guessing
- added remove actions so imported assets can be deleted from the current asset library
- reduced the search input typography so it sits more quietly in the rail
- reflowed `Clip Details` and audio asset rows so long filenames wrap cleanly without colliding with `Remove` or status pills

How to test E2 import:

1. Run `npm run preview --workspace=apps/desktop` for preview mode
2. Or run `npm run dev:desktop` for full desktop mode
3. In the left rail, click `Import Media`
4. Choose one or more supported files
5. After import, you should see:
   - imported video/image items appear in the thumbnail grid
   - imported audio items appear in the audio asset list
   - project status say media was imported
   - the project summary asset count increase
   - a `Clip Details` list under the grid for video/image assets
   - technical metadata where the current scan path can detect it

How to test FR1 drag-and-drop:

1. Run `npm run preview --workspace=apps/desktop`
2. Drag one or more supported files over the left asset rail
3. You should see a drop overlay that says media can be imported there
4. Drop the files into the rail
5. After drop, you should see:
   - the imported files appear in the same asset library as picker-based imports
   - project status say the media was imported via drag and drop
   - duplicates get skipped instead of re-added

How to test remove-from-library:

1. Import one or more media files
2. In the thumbnail grid, click the small `×` button on a visual asset
3. Or in the details/audio list, click `Remove`
4. Confirm:
   - the item disappears from the asset library
   - the project asset count decreases
   - project status says the asset was removed

Current E2 limitation:

- frame-rate and color-space extraction are still incomplete
- playback and scrub behavior are not implemented yet
- preview-mode open now gives clearer behavior and messaging when no saved preview project exists
