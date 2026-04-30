# Epic E4 — Transcript & Captions

**Sprint:** 5–6 (Whisper infra), deeper integration follows E3
**Status:** NOT STARTED
**Depends on:** E1 (Foundation), E2 (Media Import)
**Blocks:** E6 (Publish — SRT export)

---

## What This Is

The biggest differentiator in the MLP after GPU playback. Transcript-first editing is what makes Vivido accessible to creators who've never touched a timeline. Background Whisper transcription starts the moment footage lands — no button press. By the time the creator finishes arranging clips, the transcript is ready.

For the aspiring filmmaker user (Arjun), the transcript view is the primary editing interface. They never need to touch the timeline until the story structure exists in words.

---

## Functional Requirements

### Transcription Engine
- **FR15:** Vivido automatically transcribes imported footage using local Whisper inference — running in background, **never blocking the UI.**
- **FR20:** Vivido detects and highlights low-confidence transcript words for creator review.
- **FR-WL1 (Multi-language):** Whisper auto-detects the spoken language on transcription start. Creator can manually override from a dropdown of the top 20 languages by global creator market share. Detected language is visible in the transcript UI at all times.

### Transcript Editing
- **FR16:** Creator can edit the project transcript by selecting, deleting, or rearranging words — with all changes reflected in the timeline in real-time.
- **FR17:** Creator can switch between Transcript view and Timeline view within the same project without losing state.

### Captions
- **FR18:** Creator can style captions (font, size, color, position, background, animation style) once and have the style applied to all captions in the project.
- **FR19:** Creator can export captions as SRT or VTT alongside the video export.

---

## Whisper Model Management (FR-62 through FR-66)

First-launch UX for the Whisper model download is a first-class user experience, not an afterthought.

- **FR-62 (First-launch check):** On first launch, check for the Whisper GGML model in app data directory. If absent, download flow begins immediately.
- **FR-63 (Download progress UI):** Display: model size, downloaded amount, estimated time remaining. Creator can use the rest of the app (import footage, start editing) while the model downloads.
- **FR-64 (Pending transcription state):** If footage is imported before download completes: transcript area shows "Transcription pending — model downloading (X% complete)" — never a silent empty state.
- **FR-65 (Resume on interruption):** If download is interrupted (connection loss, process killed), resumes from last successful byte on next launch. Never re-downloads the full file.
- **FR-66 (Disk-full error):** If download fails due to insufficient disk space: explicit error with space required + path to system storage settings. Never silently fails.

**Model tier:** Large v3 (1.5GB, highest accuracy) vs Medium (500MB, faster download). Default TBD — see Open Question #6 in [16-open-questions.md](16-open-questions.md).

---

## Whisper Integration Method

**N-API native addon** (faster, couples to Electron ABI version) vs **child_process IPC** (simpler, slower startup, no Electron upgrade coupling).

Recommendation for solo founder: child_process is safer long-term. Decide before sprint 5.

See Open Question #10 in [16-open-questions.md](16-open-questions.md).

---

## Design Reference

`_designs/app-ui/02-transcript-view.html`:

**Layout:** Full-width transcript area (left) + AI assistant panel (right, 400px)

**Transcript area:**
- Top bar: search field, filter chips (Fillers, Silences, Chapters, Shorts), Auto-clean button, Export SRT button
- Chapter headers with chapter number badge (e.g., "Introduction — CHAPTER 1" at 00:00:00)
- Speaker label: avatar + name + timestamp + HOST/GUEST badge
- Transcript text with inline highlights:
  - Filler words: strikethrough + red underline (Um, Uh, Like, Yeah, Honestly)
  - Silence gaps: inline badge "(2.1s silence)" in muted text
  - Shorts candidate: amber "⚡ SHORT" banner above the paragraph
- AI "something" highlighted word: indigo underline (word-level confidence indicator)

**AI Assistant panel (right):**
- "FILLER WORDS DETECTED" section: bar chart per filler type (Um/Uh 8×, Like/Yeah 3×, Honestly/Basically 1×) + "Remove All Fillers" + "Review Each" buttons
- "AI SUGGESTIONS" section: cards for each suggestion:
  - Strong Hook Detected (indigo, ⚡) — with jump-to timestamp
  - Remove Long Silence (amber, 2.1s gap) — with Remove/Keep buttons
  - Shorts Opportunity (teal, AUTO badge) — with Create Short / Dismiss
- "AUTO-GENERATED CHAPTERS" section: numbered list with timecodes + "Add All to YouTube" button

**Bottom bar:** Confidence score (green bar, 94%), word count, filler count, Whisper model name + "Local" badge

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md`, `_designs/design-guidelines.md`, and `_designs/app-ui/02-transcript-view.html`.

This epic is not complete unless it preserves:

- transcript as a primary editing environment, not a secondary utility view
- locked word states for playing, filler, silence, and low-confidence terms
- inline chapter and Shorts marker treatment
- visible AI assistance with explicit creator control
- readable confidence, word-count, and local-model status signals
- full-width editorial reading comfort without turning the screen into a loose document editor

If the transcript screen starts feeling like a text editor with video bolted on, the implementation has drifted from product intent.

---

## Transcript → Timeline Sync Rules

- Deleting a word in transcript view cuts that exact duration from the timeline (ripple delete)
- Word boundaries are frame-accurate — Whisper timestamps mapped to frames at transcription time
- Clicking a word in transcript view scrubs the preview to that frame
- Rearranging paragraphs in transcript view reorders the corresponding clips in the timeline
- Low-confidence words (< threshold) are highlighted — creator must manually confirm or correct before export
- Filler word removal: one-click removes all instances, or creator can review each individually

---

## Filler Word Detection

Default filler vocabulary (English): Um, Uh, Like, You know, So, Basically, Honestly, Right, Literally, Actually

Creator can add custom filler words per project. Filler detection runs as a post-processing step on the Whisper output — not a separate model call.
