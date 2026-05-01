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

## E2 FR5 Deeper Metadata Pass

- extended the project asset schema so imported media can store richer technical metadata:
  - frame rate
  - color space / color profile
  - codec name
  - sample rate
  - channel count
  - scan source
- improved desktop metadata probing so the Electron side now tries multiple `ffprobe` locations before falling back
- added frame-rate parsing from `avg_frame_rate` with fallback to `r_frame_rate`
- added color-profile normalization from FFmpeg probe fields when available
- added codec-name capture for imported media where available
- added scan-source labels in the asset library so testing can distinguish:
  - `Deep scan`
  - `Browser scan`
  - `Fallback scan`

What this moves in E2:

- `FR5` moves forward again, but remains partial
- `FR6` is strengthened again because the asset library now communicates the quality/source of the technical metadata instead of implying all scans are equal

How to test the deeper FR5 pass:

1. Run `npm run preview --workspace=apps/desktop` for preview mode
2. Or run `npm run dev:desktop` for full desktop mode
3. Import:
   - one video file
   - one audio file
   - optionally one image file
4. Look in `Clip Details` and `Audio Assets`
5. Confirm you can now see richer technical metadata where the active scan path supports it
6. Also check the new scan-source line:
   - `Deep scan`
   - `Browser scan`
   - `Fallback scan`

Current honest limit after this pass:

- frame-rate and color-space extraction are better, but still not reliable enough across all runtimes and formats to call `FR5` complete

## E2 FR5 Metadata Presentation Polish

- replaced the clip-detail raw text stack with:
  - filename
  - metadata chips for known values only
  - a softer scan-status line for what is still pending
- renamed scan labels in the UI so they read more naturally:
  - `Preview scan`
  - `Basic scan`
  - `Deep scan`
- removed baked-in `FPS pending` / `Color pending` strings from the stored technical summary so tooltips and search text stay cleaner
- adjusted row layout so action buttons no longer steal width from filenames as aggressively

Why this mattered:

- in preview mode, partial metadata can be technically expected
- but the way that state was rendering made the product feel glitchy
- this pass makes incomplete scan data look intentionally incomplete instead of broken

## E2 FR5 Scan Reliability Pass

- added lightweight preview-mode frame-rate estimation for video imports by sampling decoded video frames when the browser runtime supports it
- normalized estimated/browser frame rates toward common editorial values such as:
  - `23.976`
  - `24`
  - `25`
  - `29.97`
  - `30`
  - `50`
  - `59.94`
  - `60`
- improved desktop deep-scan color metadata normalization so raw ffprobe tokens are presented more readably, for example:
  - `Rec. 709`
  - `Rec. 2020`
  - `HLG`
  - `PQ`
  - `Video range`
  - `Full range`

What this moves in E2:

- `FR5` moves forward again because preview mode can now surface fps for more imported videos and desktop mode communicates color information more clearly
- `FR6` benefits indirectly because the asset library metadata becomes more understandable to the creator

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import one or two video files
3. In `Clip Details`, check whether some files now show an fps chip instead of leaving frame rate absent
4. If you run `npm run dev:desktop` on a machine with `ffprobe` available, import a video file and check whether color metadata reads more cleanly

Current honest limit after this pass:

- preview-mode frame-rate estimation is still best-effort and may not resolve for every browser/file combination
- browser mode still cannot be treated as a full replacement for native desktop probing

## E2 FR5 Thumbnail Generation Pass

- extended imported media metadata so visual assets can persist a generated thumbnail data URL
- added renderer-side thumbnail generation for:
  - video assets by seeking to an early representative frame and drawing it into a canvas
  - image assets by fitting the source image into a 16:9 canvas thumbnail
- updated the media grid so imported assets use the generated thumbnail when available instead of always showing placeholder gradients

What this moves in E2:

- `FR5` moves forward because import processing now produces another meaningful technical/media artifact, not just metadata text
- `FR6` is strengthened because the asset library starts looking like a real editor browser instead of a placeholder catalog

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import one or more video files and optionally one image file
3. Look at the top media thumbnail grid
4. Confirm that imported visual assets now try to show a real image/video thumbnail instead of only the purple placeholder treatment
5. Audio assets should still remain non-visual list items

Current honest limit after this pass:

- thumbnail generation is still renderer-side and best-effort
- audio waveforms/thumbnails are not implemented
- native background thumbnail jobs are not implemented yet

## E2 FR5 Native-Aware Thumbnail Pass

- extended the desktop media scan IPC response so metadata can carry a thumbnail data URL from native tooling
- added main-process thumbnail extraction that tries `ffmpeg` candidates and returns a JPEG data URL when successful
- kept the renderer thumbnail path as fallback, so desktop imports can still show a thumbnail even if native extraction is unavailable

What this moves in E2:

- `FR5` moves forward because desktop import is now more native-aware and less dependent on browser-side thumbnail generation
- `FR6` benefits because the media grid should become more reliable on desktop machines that have the expected media tools available

How to test this pass:

1. Run `npm run dev:desktop`
2. Import one or more video files
3. Confirm the top media grid shows real thumbnails
4. If preview mode also works, that is good, but this pass is specifically about improving the desktop/native path

Current honest limit after this pass:

- desktop native thumbnails still depend on `ffmpeg` being available on the machine
- true background thumbnail jobs and waveform generation are still not implemented

## E2 Sidebar Browsing Optimization

- replaced the old duplicated `Clip Details` stack with a single `Selected Asset` card
- clicking a video thumbnail or audio row now selects that asset for inspection
- audio assets now render as compact selectable rows instead of large repeated cards
- the browser surface now behaves more like:
  - browse many assets in the grid/list
  - inspect one selected asset below
  - keep workspace/project utilities reachable sooner in the scroll

Why this mattered:

- once the user imports 10 to 15 files, showing the whole asset set twice becomes wasteful
- the previous structure pushed `Workspace Shortcuts` and project controls too far down
- the new pattern matches how professional media browsers usually separate browsing from inspection

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import many media files
3. Confirm:
   - the top grid still shows many thumbnails
   - `Selected Asset` shows only one item at a time
   - clicking another thumbnail changes the selected card
   - `Audio Assets` rows are more compact
   - lower sidebar utilities are reachable with much less scrolling than before
4. Specifically check long audio filenames:
   - the name should now get the main width
   - the usage pill should sit at the top right
   - the `Remove` button should sit below instead of colliding with the text

## E2 Selected-Asset Monitor Preview

- the center monitor now responds to the currently selected asset instead of always showing the generic shell placeholder
- visual assets use their generated thumbnail as the monitor image
- audio assets show an audio-ready preview state that prepares for later waveform/timeline work
- the generic editor placeholder still remains for non-editor tabs or when no asset is selected

What this moves in E2:

- `FR5` and `FR6` continue moving forward because the imported media browser is now connected to a visible preview surface
- `FR3` begins to move conceptually because the center monitor is no longer fully disconnected from imported media, even though real playback is not implemented yet

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import one or more visual assets and one audio asset if available
3. Click different thumbnails in the top media grid
4. Confirm the center monitor updates to show the selected asset preview
5. Click an audio row and confirm the monitor switches to the audio-ready state

## Shell Chrome Polish

- removed the duplicate custom traffic-light cluster on Apple platforms so macOS native window controls remain the single source of truth
- kept the titlebar spacing balanced by adjusting left padding when native traffic lights are present

## E2 In-Session Media Preview

- added transient per-asset preview source URLs at import time instead of persisting blob/file playback URLs into the saved project file
- selected video assets now render through a real `<video>` element in the center monitor when a session preview source is available
- selected audio assets now render through a real `<audio>` element in the center monitor when a session preview source is available
- image assets use the direct imported image source where available instead of only the thumbnail copy

What this moves in E2:

- `FR5` and `FR6` keep advancing because imported assets are now connected to actual session media sources
- `FR3` moves one real step closer because the monitor can now open actual media elements, even though full playback architecture and scrubbing are still not complete

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import a video file and an audio file
3. Click the video thumbnail
4. Confirm the center monitor now shows a playable video element instead of only a static image
5. Click the audio row
6. Confirm the center monitor now shows a real audio player

## E2 Preview Playback Controls

- added a first custom playback-control layer in the monitor toolbar for selected video/audio assets
- the monitor now supports:
  - `Play` / `Pause`
  - `Start` to jump back to time `0`
  - a scrub bar tied to the current media element time
  - current-time and duration labels
- media state is tracked in React so the monitor controls stay in sync with the selected audio/video element

What this moves in E2:

- `FR3` moves forward one more concrete step because imported media is no longer just openable, it is controllable in-session
- `FR5` / `FR6` continue to benefit because the asset browser and preview surface now work together more like an editor

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import a video or audio file
3. Select it in the left rail
4. In the monitor toolbar, click `Play`
5. Confirm the media begins playing
6. Click `Pause`
7. Drag the scrub bar and confirm the media position updates
8. Click `Start` and confirm playback returns to the beginning

Monitor polish note:

- moved `Start` / `Play` / `Pause` controls into the selected preview transport area instead of leaving them detached in the top-right monitor toolbar
- removed the video poster from the real preview element so portrait clips are less likely to look like a cropped thumbnail state before playback

Recovered-preview note:

- preview-mode recovered projects can keep thumbnails and metadata but lose playable blob URLs after reload
- the monitor now handles that state explicitly:
  - rebuilds a playable source from real desktop file paths when possible
  - otherwise keeps the transport visible but disabled and explains that re-import is needed to restore playback in preview mode

Monitor fit/control note:

- changed selected media elements to size with `max-width` / `max-height` instead of filling the whole stage box, which improves portrait-video fit behavior
- replaced text transport labels with cleaner icon-style controls for reset and play/pause

Resolution-fit note:

- the monitor now uses detected media dimensions to size a dedicated preview frame before rendering the selected image/video element
- previously, we were detecting the resolution but mostly only surfacing it as metadata; now the preview layout actually uses that information

## E2 Monitor Player Rebuild

- stopped treating the portrait-fit problem as a small bugfix and rebuilt the selected-media player as its own monitor component
- the new player uses:
  - a dedicated viewport inside the program monitor
  - a separate footer for filename, transport, chips, and scan status
  - `Fit` and `100%` viewer modes in the monitor toolbar
- this keeps the rest of the asset browser/import flow intact while replacing the old nested preview-card structure that was fighting the monitor aspect ratio

Why this mattered:

- the previous selected-player layout was still effectively a second card living inside the monitor shell
- because of that, portrait clips were being constrained by the wrong box even when width and height metadata existed
- rebuilding the player as a monitor-native component is safer and cleaner than continuing to patch the older shell

How to test this pass:

1. Run `npm run preview --workspace=apps/desktop`
2. Import or re-select a portrait video such as `riverside_v2.mp4`
3. Confirm the monitor now behaves like a dedicated player surface rather than a nested card
4. In the monitor toolbar, click `Fit` and `100%`
5. Confirm the selected media viewport updates while the rest of the shell stays unchanged
6. Use the transport controls in the footer:
   - `↺`
   - `▶` / `❚❚`
   - scrub bar

Follow-up reliability pass:

- portrait-media sizing now uses the measured monitor canvas dimensions instead of percentage-based CSS assumptions
- this makes repeated selections more deterministic because the player computes an explicit pixel viewport for the selected asset each time

Preview media lifecycle pass:

- added explicit teardown for the previously mounted HTML video/audio element before loading the next selected asset
- this targets the repro where `Claude_Design_Demo.mp4` could play, but then later selections such as `yt_shorts.mp4` or `riverside_v2.mp4` fell into a black-screen `0:00` state
- removed the first attempt at a selection-change cleanup hook because it could tear down the newly mounted player on asset switch, which caused all videos to stop playing

Current blocker note:

- after the latest playback cleanup iterations, preview-mode selected video playback is currently regressed further
- user now reports that none of the videos play in the selected monitor at all
- typecheck and build still pass, so this is a runtime playback/source-lifecycle issue rather than a compile error
- next agent should pause feature expansion and restore reliable preview playback first

## E2 Blob URL Revocation Fix + Image Monitor Fallback — 2026-05-01

### Second pass: multi-batch import was revoking earlier blobs

Second set of issues observed after the ref-stability fix:

- Videos at 3840×2160 (`yt_shorts.mp4`) showed `0:00/0:00` in the player transport but correct duration in the sidebar — meaning the blob URL was revoked before the player could load it
- `thumbnail.png` showed the broken-image alt text in the monitor — same cause
- Smaller resolution files (720p, 1080p) imported in a later batch still worked

Root cause: the `assetPreviewSources` cleanup effect used `[assetPreviewSources]` as its dep array. Every time the user imported a second batch of files, React ran the cleanup from the previous effect, which revoked ALL blob URLs from every prior batch. Only the most recent batch's blobs survived.

Fixes applied:

1. **Blob cleanup effect fixed** — added `assetPreviewSourcesRef` that is updated synchronously during render. The cleanup effect now uses `[]` deps (runs only on component unmount) and reads from the ref to get the latest blob map. Individual blob revocation on `handleRemoveMedia` was already correct and is unchanged.

2. **Image monitor fallback** — added `imageMonitorError` state. If the `<img>` element fires `onError` (revoked blob URL), the monitor switches to `thumbnailDataUrl` (a data URL — always valid). Resets on asset switch.

3. **Scan temp element cleanup** — added `releaseScanElement` helper and called it at the end of `loadMetadataFromVideoSource` and `loadMetadataFromAudioSource`. Temp video/audio elements now have their `src` removed and `load()` called after scanning, so the browser can release decode contexts before the main player tries to open the same large file.

Verification: typecheck passes, build passes.

Important note for testing: blob URLs that were ALREADY revoked in the current browser session cannot be recovered. The user needs to close the preview tab, reopen with `npm run preview --workspace=apps/desktop`, and re-import files. After this fix, multiple import batches will no longer revoke earlier blob URLs.

## E2 Preview Playback Regression Fix — 2026-05-01

Root cause identified and fixed: React ref callback instability was tearing down the video element on every render.

What was happening:

- `assignPreviewMediaRef` was a plain inline function defined inside `App`
- React creates a new function reference on every render
- When React sees a new ref callback reference on an element, it calls the old callback with `null` (cleanup), then the new callback with the element
- The cleanup path (`teardownPreviewMediaElement`) called `element.removeAttribute("src")` and `element.load()` on the still-mounted element
- React had already applied the `src` prop to the DOM in its commit phase (before the ref callbacks)
- The cleanup removed `src` from the DOM; React did not re-apply it because it had already done so
- The new ref callback then called `element.load()` with no `src` → video loaded nothing → black screen, `0:00`
- This fired on every `timeupdate`, `loadedmetadata`, `play`, and `pause` event because every state update triggered a re-render with a new function reference

Fix applied in `apps/desktop/src/App.tsx`:

- moved `teardownMediaElement` outside the `App` component (it only takes an element argument, no component state)
- renamed it `teardownMediaElement` to match its module-level placement
- wrapped `assignPreviewMediaRef` with `useCallback(fn, [])` so React sees the same function reference on every render
- `useCallback` with empty deps is safe here because the only closed-over value is `previewMediaRef`, which is a stable ref object
- React now only invokes the ref callback when the actual DOM element changes (which happens when the `key` prop changes on asset switch), not on every re-render

Verification:

- `npm run typecheck` passes
- `npm run build` passes
- runtime playback should now be stable in preview mode

How to test:

1. Run `npm run preview --workspace=apps/desktop`
2. Import one or more video files using `Import Media` or drag and drop
3. Click a video thumbnail in the left rail
4. Confirm the center monitor shows the video element
5. Click the `▶` play button in the footer transport
6. Confirm the video plays, the time counter advances, and the scrub bar moves
7. Click `❚❚` to pause — confirm it stops
8. Click `↺` to reset — confirm playback returns to `0:00`
9. Click a different video thumbnail in the left rail
10. Confirm the monitor switches to the new video cleanly and is playable
11. Go back to the first video — confirm it is still playable (not revoked or broken)
