# Epic E6 — YouTube Primitives & Publish Package

**Sprint:** 9–10 (YouTube timeline primitives) + 13–14 (Publish Package export)
**Status:** NOT STARTED
**Depends on:** E1 (Foundation), E3 (Timeline), E5 (Audio Room for LUFS)
**Blocks:** Nothing — this is the final MLP output

---

## What This Is

The screen that ends the job. The creator goes from Vivido to YouTube Studio upload — zero tool switching. The Publish Package is the output that makes Maya (the CapCut refugee) tweet about Vivido the same night she uses it for the first time.

This epic has two parts:
1. **Sprint 9–10:** YouTube-native timeline primitives (chapters, Shorts markers, End Screen zones) — these live on the timeline, not in an export dialog.
2. **Sprint 13–14:** Publish Package export + YouTube OAuth upload + render progress UI.

---

## Functional Requirements

### YouTube Timeline Primitives (Sprint 9–10)
- **FR27:** Creator can add Chapter markers as draggable objects directly in the timeline — previewed in the player as the creator edits.
- **FR28:** Creator can mark Shorts segments in the timeline with in/out points — previewed as a vertical 9:16 frame alongside the main timeline.
- **FR29:** Vivido warns the creator when a Shorts-marked clip is horizontal (16:9) and shows a crop preview before export. Creator consent required before a horizontal clip is included as a Short.
- **FR30:** Creator can add End Screen zones and Info Card timestamps as timeline objects.

### Publish Package (Sprint 13–14)
- **FR31:** Creator can generate a Publish Package with a single action — outputting:
  - `main_video_4k.mp4` (with embedded chapter metadata)
  - `short_01.mp4`, `short_02.mp4`, ... (all Shorts clips, 9:16 cropped)
  - `thumbnail_01.jpg`, `thumbnail_02.jpg`, `thumbnail_03.jpg` (candidate frames)
  - `chapters.txt` (ready to paste into YouTube description)
  - `captions_en.srt`
- **FR32:** Creator can directly upload to YouTube from within Vivido (authenticated via OAuth) including title, description, tags, and chapter injection.
  - YouTube access tokens refreshed automatically if < 5 minutes to expiry before upload begins.
  - If refresh token is expired (> 6 months inactive), creator sees a re-auth prompt — **never a silent upload failure.**
- **FR33:** Creator can share a review link for a project that opens in a browser without Vivido installed.

### Render Progress UI (Sprint 13–14)
- Render progress: percent complete + estimated time remaining + cancel button
- If window is closed during render: render continues in background with system tray / menu bar status indicator
- Creator can check render status after closing window and re-open when complete
- Rendered files open in Finder / Explorer automatically on completion (opt-in)

---

## Design Reference

`_designs/app-ui/04-publish-package.html`:

**Layout:** Package checklist (left, 316px) | Metadata editor (center) | Destinations + render queue (right, 290px)

**Left — Package:**
- "PACKAGE" header + item count (6 items)
- Publish Readiness circular progress (85% "Almost ready — 1 warning")
- CHECKLIST:
  - ✅ Main Video Rendered (4K H.264 · 8:14 · 1.2 GB)
  - ✅ Thumbnail Set (Custom · 1280×720 · 892 KB)
  - ✅ Captions / SRT (Auto-generated · 94% accuracy)
  - ✅ YouTube Chapters (6 chapters · in description)
  - ⚠️ Title Optimization (Score 72% — could be stronger) → "Improve" button
  - ✅ Shorts Clips (3) (58s, 43s, 31s — 9:16 cropped)
- OUTPUT FILES:
  - `main_video_4k.mp4` MAIN badge (4K H.264 · 8:14)
  - `short_01_58s.mp4` SHORT badge (1080×1920 · 9:16 · 42 MB)
  - `short_02_43s.mp4` SHORT badge (1080×1920 · 9:16 · 31 MB)
  - `thumbnail_custom.png` THUMB badge (1280×720 · 892 KB)
  - `captions_en.srt` SRT badge (English · 148 cues · Whisper)

**Center — Metadata editor:**
- Platform tabs: YouTube (selected) | + Add Platform
- TITLE: text input + "✦ Suggest" AI button + CTR score (82/100) + score bar (72%)
- DESCRIPTION: textarea + "✦ Auto-write" AI button + character count (420/5000)
- TAGS: chip input with AI "✦ Add More" button
- YOUTUBE CHAPTERS IN DESCRIPTION: numbered list (0:00, 1:12, 2:45...) each with Edit button
- Thumbnail preview (1280×720) + Upload / AI Gen buttons

**Right — Destinations:**
- BACKGROUND RENDER:
  - `main_video_4k.mp4` → Done
  - `short_01_58s.mp4` → 67% progress bar
  - `short_02_43s.mp4` → Queued
- UPLOAD TO:
  - YouTube (toggle ON) — @AnandRoraCreates — checkboxes: Main video, Chapters, Captions, Thumbnail, Shorts (3), End Screen
  - Instagram Reels (toggle OFF) — @AnandRora
- SCHEDULE:
  - Publish: Now
  - Visibility: Public
  - Notify subs: Yes
- "🚀 Publish Package · YouTube + 3 Shorts" full-width indigo CTA (bottom)
- "🔒 Local-first: your data stays on this machine" small text below CTA

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md`, `_designs/design-guidelines.md`, and `_designs/app-ui/04-publish-package.html`.

This epic is not complete unless it preserves:

- publish as the workflow endpoint, not a generic export modal
- readiness/checklist framing with immediate scanability
- strong output package clarity and file-state visibility
- metadata editing that remains dense and production-oriented
- render queue visibility and destination controls in the locked three-column composition
- local-first trust messaging without cluttering the primary CTA path

If this screen feels like “settings before export” instead of “the job ends here,” it has missed the product framing.

---

## AI Features in This Epic

| Feature | AI Badge | Creator Action Required |
|---|---|---|
| Title Suggest | ✅ | Click "✦ Suggest" |
| Description Auto-write | ✅ | Click "✦ Auto-write" |
| Tag suggestions | ✅ | Click "✦ Add More" |
| CTR score | ✅ | Shown passively — no action required, no auto-apply |

All AI metadata suggestions require explicit creator adoption. Creator can edit, reject, or ignore any suggestion.

---

## YouTube OAuth Implementation

- OAuth 2.0 with `youtube.upload` scope
- Apply for Google's YouTube Data API OAuth review before launch — this is a manual process with a lead time of weeks to months
- Access token: refresh automatically if < 5 min to expiry
- Refresh token: expires after 6 months of inactivity — show re-auth prompt, never silent failure
- Tokens: stored encrypted in Supabase — never in localStorage, never in the renderer process
- API credentials (client ID, client secret): stored in Supabase Edge Function — never exposed to client
- Quota management: 10,000 units/day default. Upload = 1,600 units. Per-creator quota tracking required.

---

## Shorts Crop Preview (FR-29)

When a creator marks a horizontal (16:9) clip as a Shorts segment:
1. Show crop preview dialog: "This clip is 16:9. Vivido will center-crop it to 9:16. Here's what it looks like:"
2. Creator sees a side-by-side: original frame | 9:16 crop preview
3. Creator adjusts crop position (pan left/right/up/down)
4. Creator confirms or cancels
5. Crop position is stored in the Shorts marker, not applied destructively

This is the fix for the Journey 5 (Support Operations) bug where a horizontal clip was silently exported as a Short without a crop preview.
