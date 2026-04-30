# Epic E2 — Media Import & GPU Playback

**Sprint:** 3–4
**Status:** IN PROGRESS
**Depends on:** E1 (Foundation Shell)
**Blocks:** E3 (Timeline), E4 (Transcript)

---

## What This Is

The jaw-drop moment. A creator drops a 4K file and it plays immediately — no buffering, no processing dialog, no configuration. This epic is the entire reason Vivido is a desktop app and not a browser tool.

Every competing browser-based or WASM-dependent tool spins on 4K scrubbing. This epic is where Vivido wins that comparison permanently.

---

## Functional Requirements

### Import
- **FR1:** Creator can import video files (MP4, MOV, MKV, AVI, WebM) via drag-and-drop or file browser without configuration.
  - R3D and BRAW deferred to Stage 2 — filmmaker path. Adding them at MLP requires RED SDK licensing and BRAW decode testing across all target hardware; that scope kills the CapCut window.
- **FR2:** Creator can import audio files (WAV, MP3, AAC, AIFF, FLAC) as standalone tracks.
- **FR5:** Vivido automatically detects footage resolution, frame rate, color space, and audio sample rate — **never** asks creator to configure sequence settings.
- **FR6:** Creator can manage a project asset library showing all imported media with thumbnails, duration, and usage status.

### Playback
- **FR3:** Vivido plays imported footage at native resolution with hardware-accelerated decode immediately on import — no processing required before first frame.
- **FR4:** Creator can scrub through footage at any position with frame-accurate seeking.

### GPU Decode + Fallback (FR-61)
When hardware decode is unavailable, Vivido falls back to FFmpeg CPU decode with frame limiting. Creator is **never** shown a crash or unsupported screen — always a working path.

**Windows fallback chain:**
1. NVDEC (NVIDIA GPU)
2. D3D11VA (Intel/AMD integrated GPU)
3. FFmpeg CPU decode ("Performance mode")

**Mac fallback chain:**
1. VideoToolbox
2. FFmpeg CPU decode ("Performance mode")

"Performance mode" indicator shown in top titlebar when fallback activates. All four decode paths validated in CI on minimum spec hardware before sprint 4 is closed.

---

## Design Reference

Left sidebar (Media Browser) from `_designs/app-ui/01-timeline-editor.html`:
- MEDIA / AUDIO / FX / TITLES tabs
- Search bar
- Video Clips section: 2-column thumbnail grid (16:9 aspect ratio), gradient placeholder, duration badge, filename label
- Audio section: list view, file icon, name + meta (format, sample rate, duration)

Preview area:
- "Preview" label + AI Suggestions badge in top bar
- Video frame centered with radial gradient background
- 4K UHD · H.264 + fps scope badges at bottom
- In/Out timecodes at bottom right

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md`, `_designs/design-guidelines.md`, and `_designs/app-ui/01-timeline-editor.html`.

This epic is not complete unless it preserves:

- dense professional media-browser presentation instead of gallery-style consumer UI
- fixed shell composition and panel hierarchy
- 16:9 thumbnail treatment, duration badges, and technical metadata readability
- dark-only surface stack with indigo as the only brand accent
- zero spinner-driven “design” fallback for first playback or scrub behavior

Performance is part of the visual contract here. If playback feels hesitant, the product promise is broken even if the import technically works.

---

## Performance Targets

| Metric | Target | Condition |
|---|---|---|
| Import to first frame | < 3 seconds | MP4/H.264, minimum spec |
| 4K scrubbing | Zero buffering | Hardware decode path |
| 4K scrubbing (fallback) | Functional, slower | Software decode / "Performance mode" |

**Minimum spec (hardware decode):** GPU with hardware video decode (NVDEC/D3D11VA on Windows, VideoToolbox on Mac, 2018+), 8GB RAM, 50GB free disk.
**Minimum spec (software decode fallback):** Any CPU with AVX2 support, 8GB RAM, 50GB free disk.

---

## Implementation Notes

- FFmpeg runs as a native subprocess spawned by Electron main — never inside the renderer
- GPU decode pipeline: `FFmpeg → hardware decoder → decoded frames → renderer via shared memory or IPC`
- All FFmpeg subprocess communications go through the typed IPC contracts from E1
- Thumbnail generation for the media browser runs as a background job — never blocks import
- File watching: if source file moves or is deleted after import, show a relinking prompt (not a crash)

---

## Current E2 Implementation Notes

- Current status
  - E2 has started with file-browser import and asset-library rendering.

- What is implemented now
  - creator can import supported video, audio, and image files through a file picker in desktop mode
  - creator can also import supported video, audio, and image files by dragging and dropping onto the asset library rail
  - the UI now hints that files can be dropped into the asset library, so drag-and-drop is discoverable without trial and error
  - preview mode has a browser-file fallback so import flows can still be tested without full desktop file APIs
  - imported assets are persisted into the project model instead of living as shell-only placeholders
  - the left rail now renders imported assets as a real asset library with thumbnails/placeholders, duration labels, and usage state
  - creator can remove imported assets from the current asset library
  - shared IPC contracts now include the desktop media import dialog path used by this epic
  - metadata extraction now attempts to populate real duration, dimensions, audio sample rate, and channel count where available
  - desktop mode uses native probe fallback logic; preview mode uses browser-side metadata inspection

- What is still open
  - drag-and-drop import
  - frame-rate and color-space extraction are not yet reliable across all paths
  - actual thumbnail generation from media frames
  - immediate first-frame playback after import
  - hardware decode and fallback chain
  - frame-accurate scrub behavior

- Honest FR status right now
  - `FR1` is still partial, but now includes both file-browser import and drag-and-drop import
  - `FR2` is partially implemented via file browser import only
  - `FR5` has moved forward but is still partial; duration, dimensions, and some audio metadata can now be extracted, but frame rate/color space coverage is not complete yet
  - `FR6` is strengthened but still partial; the asset library now exposes more real metadata, but usage tracking and full thumbnail generation are still basic
  - UI note: imported asset readability must meet professional-editor standards before any of these FRs can be considered complete. Truncated or unreadable asset names do not satisfy the asset-library requirement in practice.

---

## CI Gates Required

- [ ] All four decode paths (NVDEC, D3D11VA, VideoToolbox, CPU fallback) pass a smoke test on CI
- [ ] FFmpeg GPL build flag gate — no GPL-licensed encoder components (see [12-compliance.md](12-compliance.md))
- [ ] Minimum spec test: 4K playback validated on 2018-era GPU before sprint 4 closes
