# Epic E3 — Timeline Editor

**Sprint:** 7–8
**Status:** NOT STARTED
**Depends on:** E1 (Foundation), E2 (Media Import)
**Blocks:** E6 (Publish — YouTube primitives live on the timeline)

---

## What This Is

The core editing surface. The timeline must feel immediate and predictable — every cut is exactly where the creator puts it. No latency, no surprises, no clever behavior that overrides intent.

This epic covers the editing layer only (cuts, trims, multi-track, keyboard shortcuts). YouTube-native primitives (chapters, Shorts markers) are in E6. Transcript sync is in E4.

---

## Functional Requirements

- **FR7:** Creator can create a multi-track timeline with at minimum 2 video tracks, 2 audio tracks (VO + music), and 1 caption track.
- **FR8:** Creator can perform non-destructive cuts, trims, splits, and ripple deletes on timeline clips.
- **FR9:** Creator can add, reorder, and delete clips on the timeline via keyboard shortcut and drag-and-drop.
- **FR10:** Creator can adjust clip speed (slow motion, time-lapse) non-destructively.
- **FR11:** Creator can apply transitions between clips (cut, dissolve, fade to black minimum).
- **FR12:** Creator can add title cards and lower-thirds as timeline text objects with style controls.
- **FR13:** Vivido auto-saves the project every 30 seconds minimum with no UI interruption. *(Infrastructure in E1 — this FR is about the timeline state being included in the save.)*
- **FR14:** Creator can access version history for the last 30 days and restore any saved state.

---

## Design Reference

Timeline section from `_designs/app-ui/01-timeline-editor.html`:

**Timeline header:**
- Tool buttons: Blade (✂), Select (↖), Trim (⟺), Zoom In (+), Zoom Out (−)
- Ruler with time ticks and playhead (triangle indicator)

**Track labels (left, 220px):**
- Each track: colored icon (indigo for video, teal for audio, amber for captions) + track name + type label + mute button
- Track types: Main Camera (Video · 4K), B-Roll (Video), Primary Audio (Audio · WAV), Music (Audio · Stereo), Captions (Auto · Whisper)

**Clips area:**
- Video clips: indigo gradient fill with thumbnail strip overlay + clip name
- Audio clips: teal gradient fill with waveform visualization
- Caption clips: amber/orange fill with transcript text
- Selected clip: 1.5px indigo ring
- Playhead: 1px indigo vertical line with triangle head

**Timeline footer:**
- Duration, track count, Whisper transcription status, auto-save timestamp

**Inspector panel (right, 260px):**
- INSPECTOR header with Video / Audio / Info tabs
- Transform section: Position (X/Y), Scale, Rotation, Opacity slider
- Color Grading section: Exposure, Contrast, Saturation, Temp sliders
- Speed section: Rate, Direction
- Clip Info section: Source, Duration, Resolution, Codec
- AI "Style Match" badge in Transform header

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md`, `_designs/design-guidelines.md`, and `_designs/app-ui/01-timeline-editor.html`.

This epic is not complete unless it preserves:

- track label width, track density, and color coding exactly as defined
- predictable editor feel over clever automation
- indigo/teal/amber semantic separation for video, audio, and caption tracks
- strong playhead visibility and ruler readability
- inspector behavior that feels like a serious editor, not a simplified settings drawer
- dense information layout without drifting into clutter or arbitrary spacing

Timeline behavior and timeline visuals are coupled. A technically correct timeline that does not look and feel like the locked editor reference is incomplete.

---

## Keyboard Shortcuts (MLP Required Set)

| Action | Shortcut |
|---|---|
| Play / Pause | Space |
| Cut at playhead | B (blade) |
| Ripple delete selection | ⌘Delete |
| Select tool | V |
| Split clip | ⌘B |
| Undo | ⌘Z |
| Redo | ⌘⇧Z |
| Zoom in timeline | ⌘= |
| Zoom out timeline | ⌘- |
| Go to start | Home / ↑ |
| Go to end | End / ↓ |
| Nudge playhead | ← / → (1 frame) |
| Show shortcut reference | ? |

Shortcut reference must be accessible at all times via `?` key or Help menu.

---

## Performance Targets

| Metric | Target |
|---|---|
| All editing UI interactions | < 100ms response (cuts, trims, scrub, transcript edits) |
| Timeline data model | 90+ min, 500+ clips with no performance degradation |

**Note on 500+ clips:** Requires virtual scrolling (`react-window` or `@tanstack/virtual`). Must be implemented and tested before sprint 9. Do not defer this — a 90-minute podcast with dense caption clips will hit 500+ objects on the timeline.

---

## Non-Destructive Editing Rules

- All edits are stored as decisions in the `.vivido` JSON — never mutate source files
- Clip references point to source files by path — the source is never modified
- Speed changes store as a multiplier on the clip reference, not as a re-encoded file
- Transitions store as an overlap between two adjacent clips with a type enum

---

## Snap Behavior

- Snap to clip edges, playhead position, chapter markers
- Snap guide: 1px amber vertical line shown during drag (visible in design reference)
- Snap can be disabled via modifier key (hold ⌥ to override snap)
