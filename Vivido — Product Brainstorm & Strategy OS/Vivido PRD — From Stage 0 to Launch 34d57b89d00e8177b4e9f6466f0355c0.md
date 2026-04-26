# Vivido PRD — From Stage 0 to Launch

# Vivido PRD — Product Requirements Document

## From Stage 0 to Minimal Selling Product

> **Version:** 1.0 — April 2026
> 

> **Status:** Active Draft
> 

> **Owner:** Anand Arora
> 

> **Philosophy:** We are not building an MVP. We are building a **Minimal Selling Product** — something so complete and so differentiated that a creator has a genuine, emotional reason to switch, pay, and never leave.
> 

---

## 🧭 North Star

> *"Vivido is the last video tool a creator will ever need. It meets them at their idea, walks with them through recording, editing, and publishing, and learns their creative identity over time. It does in one session what used to take four tools and half a day."*
> 

---

## 🎯 Product Vision

Vivido is a next-generation, AI-native video creation platform built for solo YouTube creators and agency/brand teams who want professional results without the complexity of traditional desktop editors or the limitations of browser-only tools.

It occupies a Blue Ocean that no competitor currently owns: the space between *"too simple"* (Canva, VEED free tier) and *"too complex"* (Premiere Pro, Final Cut Pro), with an AI layer that acts as a co-director — not just a cleanup tool — and a Creator Style Template system that gives every creator a professional creative identity from minute one.

**The three promises Vivido makes to every user:**

1. Your first video will be done in under 10 minutes.
2. Your content will look and sound like it cost ₹5 lakh to produce.
3. Your data, your footage, your creative output — always yours. Full stop.

---

## 👤 Primary Personas

### Persona 1 — The Solo YouTube Creator

- **Who:** 22–38 years old. Making content on YouTube — education, finance, lifestyle, tech, mythology, self-improvement. 1K–500K subscribers. Posting 2–4 videos per month.
- **Current stack:** Records on phone or basic webcam. Edits in CapCut, iMovie, or pays a freelancer ₹2,000–₹8,000 per video. Exports to YouTube manually.
- **Pain:** Too much time editing. No consistency in look. Can't afford Premiere Pro's learning curve. CapCut's data ownership is now a liability.
- **What they want:** Record. Edit fast. Sound and look professional. Post everywhere. Move on to the next idea.
- **Vivido's promise to them:** *One session. Done. Publish. Repeat.*

### Persona 2 — The Agency / Brand Team

- **Who:** A 3–15 person content team at a digital agency or brand. Managing multiple client channels. Producing YouTube videos, Reels, LinkedIn content, and internal communications simultaneously.
- **Current stack:** Premiere Pro or DaVinci for editing. Loom for async review. Google Drive for sharing. Notion for briefs. CapCut was being used for short-form — now abandoned after the data scandal.
- **Pain:** Too many tools. File sharing chaos. No unified brand kit enforcement. Client approval takes forever. CapCut data ownership is a legal liability for client content.
- **What they want:** One workspace per client. Brand kit auto-applied. Team can collaborate. Publish directly. No file transfer hell.
- **Vivido's promise to them:** *One workspace. Brand consistent. Client-ready. No data liability.*

---

## 🏆 Competitive Positioning

| Dimension | Riverside | VEED | Descript | CapCut | **Vivido** |
| --- | --- | --- | --- | --- | --- |
| Recording quality | ★★★★★ | ★★★ | ★★★★ | ★★★ | **★★★★★** |
| Editing power | ★★★ | ★★★ | ★★★★ | ★★★ | **★★★★★** |
| AI intelligence | ★★★ | ★★★ | ★★★★ | ★★★ | **★★★★★** |
| Ease of use | ★★★★ | ★★★★ | ★★★ | ★★★★★ | **★★★★★** |
| Content ownership | ★★★★ | ★★★ | ★★★★ | ✗ | **★★★★★** |
| Repurpose engine | ★★★ | ★★★ | ★★★ | ★★ | **★★★★★** |
| Creator templates | ✗ | ★★ | ✗ | ★★ | **★★★★★** |
| Publish integration | ★★★ | ★★★ | ★★★ | ★★★★ | **★★★★★** |
| Team collaboration | ★★★★ | ★★★★ | ★★★★ | ✗ | **★★★★** |
| Price fairness | ★★★ | ★★ | ★★★ | ✗ | **★★★★★** |

---

## 🗺️ Stage Map Overview

| Stage | Name | Focus | Output |
| --- | --- | --- | --- |
| **Stage 0** | Foundation | Tech stack, design system, auth, project OS | Working skeleton app |
| **Stage 1** | Core Engine | Record + edit + basic AI | First video possible |
| **Stage 2** | AI Layer | Smart editing + script + thumbnail | Videos feel intelligent |
| **Stage 3** | Repurpose + Publish | Multi-platform export + direct publish | Full creation loop closed |
| **Stage 4** | Creator Templates | Style system + Creator Style Templates | Brand identity unlocked |
| **Stage 5** | Intelligence Layer | Creator DNA + coaching + analytics | The tool knows you |
| **Stage 6** | Team + Agency | Collaboration, brand kits, client workspaces | B2B revenue unlocked |
| **Stage 7** | MSP Polish + GTM | Performance, onboarding, pricing, launch | Ship it |

---

# STAGE 0 — Foundation

## Goal

Build the invisible infrastructure that everything else sits on. No user-facing features yet. But every architectural decision made here determines whether Vivido scales or collapses.

## Tech Stack Decisions

### Frontend

- **Framework:** React 18 + TypeScript
- **Desktop wrapper:** Electron (optional install, not required for web use)
- **Styling:** Tailwind CSS + custom design tokens
- **Video rendering:** WebCodecs API (browser-native, GPU-accelerated) + FFmpeg.wasm for client-side processing
- **State management:** Zustand (lightweight, editor-optimised)
- **Realtime sync:** Liveblocks or PartyKit for collaborative editing

### Backend

- **Runtime:** Node.js + Fastify
- **Database:** PostgreSQL (project data, user data) + Redis (session, queue, cache)
- **File storage:** Cloudflare R2 (S3-compatible, zero egress cost)
- **Job queue:** BullMQ for background rendering + processing tasks
- **Auth:** [Clerk.dev](http://Clerk.dev) (social login, magic link, team management out of the box)

### AI Layer

- **Transcription:** Whisper large-v3 (self-hosted) + Deepgram fallback for speed
- **Language models:** Claude Sonnet (script analysis, chapter titles, repurpose content) + GPT-4o vision (thumbnail frame selection)
- **Audio processing:** PyAnnote (speaker diarisation) + RNNoise/Demucs (noise separation)
- **Video processing:** MediaPipe (face/body tracking, auto-framing) + OpenCV

### Infrastructure

- **Hosting:** [Railway.app](http://Railway.app) or Render (simple, auto-scaling)
- **CDN:** Cloudflare
- **Video delivery:** Cloudflare Stream or Mux
- **Monitoring:** Sentry (errors) + PostHog (analytics + feature flags)
- **Background rendering:** Remotion (React-based video rendering server)

## Design System

### Visual Identity

- **Name:** Vivido
- **Personality:** Vivid. Fast. Confident. Warm but not childish. Professional but not corporate.
- **Primary colour:** Electric Indigo `#5C4FE8` — vivid, creative, distinctive
- **Accent:** Sunset Amber `#F59E0B` — energy, action, publish
- **Neutral:** Cool Slate `#1E1F2E` (dark UI base)
- **Success:** Emerald `#10B981`
- **Typography:** Inter (UI) + Syne (headings/branding)

### Core UI Principles

1. **One thing per screen** — never show more than one primary action at a time
2. **Progress is always visible** — rendering, uploading, processing — never a mystery spinner
3. **Undo is sacred** — 30-step history minimum, versioning always on
4. **AI is a suggestion, never a surprise** — every AI action previewed before applied
5. **Dark room by default** — editor is dark, minimal, distraction-free

## Stage 0 Deliverables

- [ ]  Monorepo set up (frontend + backend + shared types)
- [ ]  Auth system live (sign up, login, magic link, Google OAuth)
- [ ]  Project structure: Workspaces → Projects → Sessions
- [ ]  File upload pipeline (video + audio ingestion, chunked upload, virus scan)
- [ ]  Cloudflare R2 storage wired up
- [ ]  Background job queue operational (BullMQ)
- [ ]  Design system tokens defined in Figma + Tailwind
- [ ]  Component library started (Button, Input, Modal, Timeline, Toast)
- [ ]  Staging environment live
- [ ]  Error monitoring live (Sentry)
- [ ]  Analytics live (PostHog)

---

# STAGE 1 — Core Engine

*"First video possible"*

## Goal

A creator can record, make basic edits, and export a watchable video. The AI assistant is present but light. The experience must be so smooth that a first-time user finishes their first video in under 10 minutes.

## Features in Stage 1

### 1.1 — Unified Recording Session

**What it does:** Allows a creator to start a recording session that captures any combination of: webcam, screen, microphone, system audio, and uploaded clips — all in one session, all in sync.

**Inspired by:** WI-05 (Virtual cameraperson) + WI-35 (Creative mood setting)

**Key behaviours:**

- Session starts with a **Mood Selector**: Energetic / Reflective / Educational / Entertaining. This pre-loads suggested music library, caption style, and recording UI colour theme.
- Webcam feed shows a **live auto-framing indicator** — a subtle border that turns green when your face is well-framed, yellow when drifting, red when out of frame. Powered by MediaPipe face detection.
- **WI-01 implementation:** An Energy Meter appears on-screen during recording — a subtle waveform glow that rises when your pacing and volume are strong, dims when you trail off. Not intrusive. Just honest.
- **WI-04 implementation:** Before recording starts, user selects an Acoustic Environment preset: Home Studio / Broadcast Booth / Outdoor Clear / Raw (no processing). Processing applied in real-time to monitoring and in post.
- Multi-source recording layout options: Full Frame / Side by Side / Picture-in-Picture / Screen + Floating Camera.
- Each source recorded as a separate track — no mixing at capture time.

**Acceptance criteria:**

- Recording starts in under 3 seconds
- Auto-framing detects face within 500ms of camera open
- Acoustic presets audibly distinct in headphone monitoring
- No dropped frames at 1080p on a standard laptop

### 1.2 — Multi-Track Timeline Editor

**What it does:** A clean, professional multi-track timeline that handles video tracks, audio tracks, caption tracks, and overlay tracks.

**Key behaviours:**

- Drag and drop clips onto tracks
- Trim by dragging clip edges
- Split clip at playhead with keyboard shortcut `S`
- Separate volume control per audio track
- Colour-coded tracks: Video = blue, Audio = green, Captions = amber, Overlays = purple
- Snap-to-grid enabled by default, with `Alt` key override for frame-precise editing
- **WI-48 implementation:** Dark Room Mode toggle (`Cmd+D`) — collapses all panels, hides all menus, leaves only the timeline, preview, and waveform. Keyboard-only navigation. Keyboard shortcut reference card `?` always available.

**Acceptance criteria:**

- Timeline handles 90-minute projects without lag
- Undo/redo works reliably across 30 steps
- Dark Room Mode activates and deactivates in under 200ms

### 1.3 — Auto-Save + Version History

**What it does:** Every action auto-saves to cloud. Users never lose work. Version history is visible and human-readable.

**This is non-negotiable based on user research.** VEED and Descript both destroyed user trust by losing work. Vivido's auto-save is its trust foundation.

**Key behaviours:**

- Auto-save fires every 15 seconds and on every significant action
- Version history shows last 30 days, with named snapshots: "Before silence removal", "After AI edit", "Pre-publish v3"
- Users can name and pin versions manually
- Restore from any version in one click with a preview before restoring
- Version history visible as a sidebar panel, not buried in menus

**Acceptance criteria:**

- Save confirmation visible within 1 second of change
- Restore preview loads in under 3 seconds
- Zero data loss in 500-hour stress test

### 1.4 — Voice Note Edit Tasks at Timestamps

**What it does:** Creator leaves a voice memo at any point on the timeline. The note is transcribed and appears as a clickable task chip on the timeline.

**Inspired by:** WI-32

**Key behaviours:**

- Hold `V` anywhere on timeline to open voice recorder
- Voice note auto-transcribed: "add a zoom here when I say boom" becomes a task chip at that timestamp
- Task chips colour-coded: Orange = camera effect, Purple = text/caption, Green = music/audio, Red = cut
- Click task chip → executes or opens the relevant editor panel
- Task chips can be dismissed or converted to actual edits

**Acceptance criteria:**

- Voice note transcribed in under 5 seconds
- Task chip clickable and links to correct panel
- Works offline (transcription queued for when online)

### 1.5 — Save Creative Decisions as Rules

**What it does:** When a creator manually applies a setting (zoom level, transition type, music volume fade), Vivido asks if they want to save it as a default rule for future videos.

**Inspired by:** WI-41

**Key behaviours:**

- After any repeated manual action (detected across 2+ projects), a subtle prompt: "You always do this. Want me to remember it?"
- Rules stored in Creator Preferences panel
- Rules are named (e.g., "Talking Head zoom — 1.15x at 2s") and can be toggled on/off
- Rules apply automatically at session start when Mood matches

**Acceptance criteria:**

- Rule prompt appears within 500ms of eligible action
- Rules applied correctly in 95%+ of automatic applications

### 1.6 — 45-Minute Sprint Mode

**What it does:** A timed, streamlined editing mode that forces completion.

**Inspired by:** WI-42

**Key behaviours:**

- Toggle Sprint Mode from top nav or `Cmd+Shift+S`
- Timer appears in corner — countdown from 45 minutes (adjustable: 20 / 45 / 60 min)
- Interface simplifies: only essential panels visible, no A/B comparison, no style browser
- At timer end: "You're done. Here's your video. Publish or save draft."
- Completion badge saved to creator profile

**Acceptance criteria:**

- Sprint Mode activates in under 300ms
- Simplified interface shows only 5 core panels
- Timer accurate to ±1 second

### 1.7 — Basic Export

**What it does:** Export the finished video in common formats with full quality control.

**This is a Descript dealbreaker fix.** Export quality is where Descript destroys work. Vivido's export must be best-in-class.

**Key behaviours:**

- Resolution: 720p / 1080p / 2K / 4K
- Format: MP4 (H.264, H.265) / WebM / MOV
- Bitrate: Auto (platform-optimised) or Manual (custom kbps)
- Platform presets: YouTube Long / YouTube Shorts / Instagram Reel / LinkedIn / Twitter / Podcast Audio-only
- Background export: user continues working while video renders
- Export queue: multiple exports running simultaneously
- Export quality preview: 10-second sample rendered before full export begins

**Acceptance criteria:**

- 1080p YouTube export completes in under 2× real-time on standard hardware
- Background export does not cause UI lag
- Quality preview available in under 30 seconds

## Stage 1 Deliverables Checklist

- [ ]  Unified recording session (webcam + screen + mic + upload)
- [ ]  Mood selector at session start
- [ ]  Live auto-framing indicator
- [ ]  Energy meter during recording (WI-01)
- [ ]  Acoustic environment presets (WI-04)
- [ ]  Multi-track timeline editor
- [ ]  Dark Room Mode (WI-48)
- [ ]  Auto-save + 30-day version history
- [ ]  Voice note edit tasks (WI-32)
- [ ]  Save creative decisions as rules (WI-41)
- [ ]  Sprint Mode (WI-42)
- [ ]  Full-quality export with background rendering

---

# STAGE 2 — AI Layer

*"Videos feel intelligent"*

## Goal

The AI co-director activates. Every key editing decision has an intelligent assistant behind it. Creators spend less time on craft problems and more time on creative decisions.

## Features in Stage 2

### 2.1 — Smart Silence Removal (Dramatic Pause Aware)

**What it does:** Removes dead air while preserving intentional pauses.

**Inspired by:** WI-10 — the most-requested feature that NO competitor does intelligently.

**Key behaviours:**

- Transcription analyses audio energy + linguistic context simultaneously
- "Dead air" = silence after a completed sentence with no emotional signal → auto-removed
- "Dramatic pause" = silence after a powerful statement, rhetorical question, or emotional beat → preserved
- Confidence indicator per pause: Green (remove) / Amber (review) / Red (keep)
- One-click review of all Amber decisions before applying
- Slider: "Aggression" from Conservative (remove only obvious gaps) to Aggressive (tight edit)

**Acceptance criteria:**

- 90%+ accuracy on dramatic pause preservation vs test corpus
- Processing speed: under 30 seconds per hour of video

### 2.2 — Script Analyser Before Recording

**What it does:** Paste your script, get a health score before you press record.

**Inspired by:** WI-16

**Key behaviours:**

- Paste script into Script Health panel before or during session setup
- AI highlights: Hook strength (does line 1 make the viewer stay?), Density alerts (sentences over 30 words), Engagement drops (where viewers will zone out), Missing CTA
- Each issue colour-coded with a one-line fix suggestion
- "Script Health Score" out of 100 — improves as creator addresses issues
- Integrated with teleprompter: approved script loads directly into recording teleprompter

**Acceptance criteria:**

- Analysis completes in under 10 seconds for scripts up to 3,000 words
- Health score improves measurably when creator follows suggestions (A/B tested internally)

### 2.3 — Best-Take Sentence Compositor

**What it does:** Record the same script 2–5 times. AI assembles the best delivery of each sentence across all takes.

**Inspired by:** WI-02 — the most "never been done" feature in Stage 2.

**Key behaviours:**

- Creator marks multiple takes of the same script section
- AI transcribes all takes, aligns sentences across takes
- For each sentence, scores: clarity, pacing, energy, filler words, pronunciation
- Proposes a "Best Take Composite" — a merged version using the best-scored sentence from each take
- Preview the composite before applying — toggle between composite and any individual take
- Audio crossfades applied automatically at each splice point (5ms fade)
- Visual join markers shown on timeline as small diamonds

**Acceptance criteria:**

- Composite assembly completes in under 60 seconds for a 3-minute script × 3 takes
- Audio crossfades are undetectable to 90% of listeners in blind test

### 2.4 — AI Edit Assistant Sidebar (Gentle Interventions)

**What it does:** A non-intrusive sidebar that notices patterns and makes honest, helpful suggestions.

**Inspired by:** WI-34

**Key behaviours:**

- Always visible as a slim rail on the right edge — expands on click
- Notices and gently flags: filler word count above personal baseline, intro length vs top-performing videos, long stretches without B-roll or visual change, audio peaks that will distort on YouTube
- Suggestions are phrased as observations, not commands: "You haven't cut away in 7 minutes. Your audience typically drops off around 4 minutes of continuous talking head."
- Each suggestion has: Ignore / Apply / Remind Me Later
- All suggestions logged so creator can review patterns over time

**Acceptance criteria:**

- Sidebar never interrupts the creative flow — no modal dialogs, no forced attention
- Suggestions relevant (not generic) — personalised from session 3 onward

### 2.5 — AI Chapter Titles (Emotionally Compelling)

**What it does:** Auto-generates YouTube chapters that make people click into the video.

**Inspired by:** WI-21

**Key behaviours:**

- After edit, AI scans transcript for: topic shifts, emotional peaks, story beats, key reveals
- Generates chapter titles in the creator's voice (learned from past uploads or writing style input)
- NOT generic ("Chapter 1: Introduction") — emotionally specific ("The day everything broke", "Why every expert got this wrong")
- Creator can regenerate any chapter title with one click
- Timestamps auto-formatted for YouTube description copy-paste

**Acceptance criteria:**

- Chapter titles rated "better than what I'd write myself" by 70%+ of beta testers
- Processing: under 20 seconds for a 30-minute video

### 2.6 — Thumbnail Predictor

**What it does:** Mid-edit, AI scans footage, surfaces the best expression frame, generates 5 thumbnail treatments with predicted CTR.

**Inspired by:** WI-19 — Thumbnail is 50% of YouTube performance. No editing tool does this today.

**Key behaviours:**

- Runs automatically in background during edit (opt-in setting)
- Analyses every frame: face detection, expression classification (surprise, excitement, intensity, curiosity), composition quality, text legibility zone
- Surfaces top 5 frames with confidence score
- For each frame: generates 3–5 thumbnail treatments (with/without text, different crop, colour grade options)
- Predicted CTR indicator: based on channel historical performance benchmarks
- One-click export of thumbnail as PNG / JPEG at correct YouTube dimensions (1280×720)

**Acceptance criteria:**

- Frame analysis runs without blocking timeline editing
- Thumbnail export at correct spec every time

### 2.7 — Pre-Flight Score Before Upload

**What it does:** A full-channel readiness check before the creator publishes.

**Inspired by:** WI-20 — the creator ritual that makes Vivido indispensable at the finish line.

**Key behaviours:**

- Pre-Flight Dashboard appears when creator clicks Publish
- Six green/amber/red indicators: Hook Strength (first 30s retention prediction), Audio Quality (LUFS, peak, noise floor), Caption Coverage (% of video with readable captions), Thumbnail Set (yes/no), Title + Description (completeness check), Optimal Upload Window (best time for creator's audience timezone)
- Each amber/red item: one-click fix or override
- Pre-Flight score 0–100: below 60 = strongly recommended to fix. Above 80 = good to go.
- Creator can override any check and publish anyway — Vivido never blocks, only informs

**Acceptance criteria:**

- Pre-Flight analysis completes in under 15 seconds
- Predictions are directionally accurate within ±10% vs creator's actual analytics

### 2.8 — Editing Rhythm DNA from YouTube URL

**What it does:** Paste a YouTube URL, Vivido analyses the video's pacing and applies its editing rhythm to your footage.

**Inspired by:** WI-15 — Vivido's most viral demo feature.

**Key behaviours:**

- Creator pastes any YouTube URL into the Style DNA panel
- Vivido downloads audio, analyses: average cut frequency, silence ratio, zoom rhythm, music entry/exit timing, caption animation pace
- Generates a "Rhythm Profile" card: cuts per minute, average silence %, zoom frequency, energy arc shape
- Apply Rhythm Profile to current project: adjusts auto-cut suggestions to match the analysed tempo
- Creator can save Rhythm Profiles and build a library: "Ali Abdaal calm", "MrBeast high energy", "My own style"
- Applied as suggestions (amber markers on timeline) not forced cuts

**Acceptance criteria:**

- URL analysis completes in under 45 seconds
- Applied rhythm is perceptibly similar to source video in blind review by 70%+ of beta testers

### 2.9 — AI Trust Levels

**What it does:** Creator sets per-task autonomy levels for the AI.

**Inspired by:** WI-43 — the feature that resolves the "AI takes over vs AI does nothing" tension.

**Key behaviours:**

- Trust Settings panel (accessible from Settings or first-run onboarding)
- Per-task trust level:
    - **Full Auto:** AI executes without review (e.g., silence removal, noise reduction)
    - **AI Suggests, I Confirm:** AI marks suggestions on timeline, creator approves each (e.g., best take selection, chapter titles)
    - **AI Drafts, I Edit:** AI creates first draft, creator opens editor to modify (e.g., script analysis, thumbnail text)
    - **Never Auto:** Creator always does this manually (e.g., final colour grade, export format)
- Trust levels saved per workspace and per creator
- Can be overridden per session from the AI assistant sidebar

**Acceptance criteria:**

- Trust settings respected 100% of the time — no AI action above the set trust level
- Trust level visible as a small indicator on every AI-powered panel

### 2.10 — Smart Captions (Style-Aware)

**What it does:** Captions that style themselves based on content type — punchlines pop, key terms highlight, disclaimers recede.

**Inspired by:** WI-38

**Key behaviours:**

- Captions generated from Whisper transcription with speaker labels
- AI classifies each caption segment: Punchline / Key Point / Disclaimer / Transition / Emotional Peak / Question
- Punchlines: larger font, animated entry (pop or zoom)
- Key terms: highlighted with brand colour, slightly bold
- Disclaimers/caveats: smaller font, lighter opacity
- Questions: italic or question-mark animated callout
- Creator can override any classification per segment
- Caption style presets that stack on top of Creator Style Template

**Acceptance criteria:**

- Classification accuracy 80%+ on diverse creator content types
- Caption rendering smooth at 60fps in preview

## Stage 2 Deliverables Checklist

- [ ]  Smart silence removal with dramatic pause awareness (WI-10)
- [ ]  Script analyser with health score (WI-16)
- [ ]  Best-take sentence compositor (WI-02)
- [ ]  AI Edit Assistant sidebar with gentle interventions (WI-34)
- [ ]  AI chapter titles — emotionally compelling (WI-21)
- [ ]  Thumbnail predictor with CTR estimate (WI-19)
- [ ]  Pre-Flight score dashboard (WI-20)
- [ ]  Editing Rhythm DNA from YouTube URL (WI-15)
- [ ]  AI Trust Levels per task (WI-43)
- [ ]  Smart captions with content-type styling (WI-38)

---

# STAGE 3 — Repurpose Engine + Publish

*"The full creation loop closes"*

## Goal

Vivido stops being an editor and becomes a complete content operating system. One session → multiple platforms → all published. The creator never leaves Vivido to finish their job.

## Features in Stage 3

### 3.1 — Content Multiplier (1 Session → 11 Pieces)

**What it does:** After editing the long-form video, Vivido automatically produces a full content stack.

**Inspired by:** WI-29 — the most practically valuable feature for working creators.

**Output from one edited session:**

- 1 × YouTube long-form (edited, exported)
- 3 × YouTube Shorts (AI-selected best moments with vertical reformat)
- 1 × Podcast audio (audio-only, cleaned, with chapter marks)
- 1 × LinkedIn post (transcript-derived, with key points and CTA)
- 1 × Twitter/X thread (key insights, numbered, ready to paste)
- 2 × Instagram carousels (key quotes formatted as slides)
- 1 × Newsletter section (summary + key takeaways, ready for Substack/Beehiiv)
- 1 × Blog post draft (full transcript cleaned, headings added, SEO-structured)

**Key behaviours:**

- Content Multiplier panel opens post-edit with all 11 pieces ready to review
- Each piece editable before export — creator tweaks, not Vivido decides alone
- Social text pieces generated by Claude Sonnet with creator's voice profile
- All pieces exportable as files or pushed directly to connected platforms

**Acceptance criteria:**

- Full Content Multiplier suite generated in under 3 minutes for a 20-minute source video
- Social text pieces match creator's writing style (measured by creator rating on beta)

### 3.2 — Multi-Platform Adaptive Export

**What it does:** One video — automatically adapted for each platform's specs, orientation, caption style, and music level.

**Inspired by:** WI-24

**Key behaviours:**

- Platform profiles: YouTube (16:9, up to 4K, LUFS -14), Instagram Reel (9:16, 60fps, LUFS -14), LinkedIn (16:9 or 1:1, max 10min), Twitter (16:9 or 1:1, max 2:20), TikTok (9:16, 60fps)
- Auto-reframe for vertical: AI identifies the most important visual region and crops accordingly (face-priority)
- Music level auto-adjusted per platform (Instagram is louder; LinkedIn quieter)
- Caption style swaps to platform template (animated for Reels, clean burn-in for LinkedIn)
- One-click: "Export for all platforms" — runs all exports in parallel in background

**Acceptance criteria:**

- All platform exports technically correct to platform spec 100% of the time
- Auto-reframe keeps face in frame 95%+ of the time

### 3.3 — Direct Publish to All Platforms

**What it does:** Vivido publishes directly to YouTube, Instagram, LinkedIn, Twitter, Spotify, and Apple Podcasts — with title, description, tags, thumbnail, and schedule.

**Inspired by:** WI-44 — without this, Vivido is still just an editor.

**Key behaviours:**

- Connect accounts via OAuth in Settings: YouTube, Instagram, LinkedIn, Twitter, Spotify, Apple Podcasts
- Publish modal: select platforms, set title/description/tags per platform (or sync from one), choose thumbnail, set schedule or publish now
- AI pre-populates title, description, and tags from transcript and creator's past performance patterns
- Hashtag suggestions based on topic and platform algorithm trends
- Publish status visible: Queued → Uploading → Live → Analytics available
- Scheduled publishing queue visible on a calendar view

**Acceptance criteria:**

- Successful publish to YouTube 99.9%+ of the time
- Platform API errors shown clearly with actionable fix suggestions (not generic error codes)

## Stage 3 Deliverables Checklist

- [ ]  Content Multiplier — 11 content pieces from 1 session (WI-29)
- [ ]  Multi-platform adaptive export (WI-24)
- [ ]  Direct publish to YouTube, Instagram, LinkedIn, Twitter, Spotify (WI-44)
- [ ]  Scheduled publish queue + calendar view
- [ ]  AI-generated title, description, tags per platform

---

# STAGE 4 — Creator Style Templates

*"Brand identity unlocked from day one"*

## Goal

Every creator — from a solo YouTuber making their first video to an agency managing 12 client channels — gets a professional creative identity. No blank canvas paralysis. No generic output. The Creator Style Template is Vivido's most distinctive feature.

## Features in Stage 4

### 4.1 — Creator Style Template System

**What it does:** Pre-built, opinionated workflow templates that give creators a complete creative identity — not just a layout, but a complete production logic.

**The codename system:** Templates are named after archetypes, not real people. The aesthetic and workflow logic is inspired by creator styles without copying or naming individuals.

**Template structure (what each template contains):**

- Session layout (which recording sources, which positions)
- Recording checklist (auto-shown before record starts)
- Acoustic preset default
- Colour grade profile
- Caption style (font, animation, size, mood-classification rules)
- Lower third design + animation
- Transition style + frequency
- Music mood library access (curated per template)
- B-roll rhythm guidance (AI suggestions matched to template pacing)
- Thumbnail frame + text treatment style
- Content Multiplier preferences (which of the 11 pieces to generate)
- Export defaults (platform mix, quality)

**Launch template set (8 templates at MSP):**

| Codename | Style Archetype | Content Type | Signature Feel |
| --- | --- | --- | --- |
| Alpha Storm | High-energy documentary hybrid | Vlogs, challenges, reactions | Fast cuts, dynamic zoom, bold captions, high saturation |
| Beta Calm | Minimalist essayist | Finance, philosophy, self-improvement | Slow deliberate cuts, clean sans captions, muted grade |
| Gamma Screen | Screen + talking head dual | Tech tutorials, software demos, coding | PiP layout, clean annotation overlays, precise cuts |
| Delta Warm | Conversational storyteller | Lifestyle, travel, personal brand | Warm grade, handheld feel, lower third cards |
| Epsilon Sharp | Hard news / investigative | Journalism, analysis, explainers | Cold grade, bold typography, data overlays |
| Zeta Podcast | Multi-person conversation | Interviews, podcasts, debates | Split screen, waveform-animated lower thirds, clean audio |
| Eta Myth | Cinematic narrative | Mythology, history, storytelling | Filmic grade, dramatic music pacing, chapter-heavy |
| Theta Brand | Brand / agency clean | Product videos, brand content, ads | Brand-kit-first, logo-safe zones, clean motion |

**Key behaviours:**

- Template gallery on new project start — preview each template with a 30-second sample video
- Apply template: instantly configures entire session environment
- "Mix" two templates: take colour from one, caption style from another
- Templates updatable by Vivido team — push updates to all projects using that template
- Creator can save their own customised template as "My Style" — the beginning of their Creator DNA

**Acceptance criteria:**

- Template applies in under 2 seconds
- 80%+ of beta testers rate output as "professional-looking" without any manual adjustments

### 4.2 — Brand Kit (for Agency/Team Tier)

**What it does:** A persistent brand identity package that auto-applies to every project in a workspace.

**Key behaviours:**

- Brand Kit contains: Logo (+ safe zone rules), Primary + Secondary colours, Font pairing, Intro/outro clips, Lower third template, Music mood preference, Default caption style
- Brand Kit auto-applies when starting a project in a branded workspace
- Multiple Brand Kits per workspace (one per client for agencies)
- Brand Kit lock: team editor can't override brand colours/fonts without admin approval

**Acceptance criteria:**

- Brand Kit elements applied correctly to 100% of exports
- Brand Kit switching between client workspaces takes under 3 seconds

## Stage 4 Deliverables Checklist

- [ ]  Creator Style Template system architecture
- [ ]  8 launch templates (Alpha Storm through Theta Brand)
- [ ]  Template gallery with preview
- [ ]  Template mixing (colour from A + captions from B)
- [ ]  My Style — custom template saving
- [ ]  Brand Kit system for agency tier
- [ ]  Brand Kit locking + multi-client workspace

---

# STAGE 5 — Intelligence Layer

*"The tool knows you"*

## Goal

Vivido becomes a creative partner that learns from the creator over time. This stage creates the deepest form of product lock-in — not because switching is hard, but because leaving means losing a tool that genuinely understands you.

## Features in Stage 5

### 5.1 — Energy Detection During Recording (Full)

**What it does:** Full WI-01 implementation — real-time energy, clarity, and pacing analysis during recording with a live dashboard.

**Key behaviours:**

- Live Energy Score visible during recording (not intrusive — corner of screen)
- Three zones: In the Zone (green) / Losing Momentum (amber) / Off-track (red)
- After recording: Energy Map overlaid on timeline — creator sees which sections were high-energy and which were flat
- Energy Map informs silence removal, chapter suggestion, and Shorts clip selection

### 5.2 — Creator DNA Profile

**What it does:** After 5+ videos, Vivido builds a Creative DNA card that captures the creator's unique editorial identity.

**Inspired by:** WI-33

**Key behaviours:**

- Average cut pace (cuts per minute)
- Signature transition style (most used)
- Colour palette fingerprint (dominant hues across projects)
- Energy arc pattern (typical rise/fall/close shape)
- Filler word rate (personal baseline)
- Intro length average vs best-performing videos
- B-roll frequency vs engagement drop correlation
- Weak spots (flagged patterns that correlate with lower retention)
- Creator DNA Card visible in Profile panel — shareable (opt-in)

**Acceptance criteria:**

- DNA card generated after 5 videos, updated incrementally after each new project
- Weak spots identified with supporting data (not guesses)

### 5.3 — Presenter Score

**What it does:** After every published video, a delivery score — not just technical quality but on-camera presence.

**Inspired by:** WI-36

**Key behaviours:**

- Score components: Eye Contact % / Filler Word Rate / Speaking Pace (WPM) / Energy Variation / Sentence Clarity / Gesture Use
- Each component graphed over time — creator sees their progression
- Specific improvement tip per component per video
- Presenter Score visible on video card in project library

**Acceptance criteria:**

- Score components measured accurately vs manual human review within ±5%
- Improvement trend visible after 10+ videos

## Stage 5 Deliverables Checklist

- [ ]  Full Energy Detection with post-recording Energy Map (WI-01 full)
- [ ]  Creator DNA Profile (WI-33)
- [ ]  Presenter Score per video (WI-36)
- [ ]  Retention diagnosis from video history (WI-17)
- [ ]  Conversation with past archive — semantic clip search (WI-22 — Beta)

---

# STAGE 6 — Team + Agency

*"B2B revenue unlocked"*

## Goal

Vivido becomes a viable professional tool for agencies managing multiple client channels and brand teams producing ongoing content. This stage drives the highest-value subscription tier.

## Features in Stage 6

### 6.1 — Team Workspaces

- Role-based access: Owner / Editor / Reviewer / Viewer
- Real-time collaborative editing (Liveblocks-powered) — two editors on same timeline simultaneously
- Comment threads on timeline timestamps (like Figma comments on designs)
- Task assignment: "Hey @editor, fix the audio at 4:32"
- Approval workflow: Editor submits → Reviewer approves → Owner publishes

### 6.2 — Client Workspaces + Multi-Brand Kit

- Separate workspace per client (isolated storage, billing, brand kit)
- Agency owner can switch between client workspaces in one click
- Client can be given Reviewer access to see and approve content without edit access
- Brand Kit locked per client workspace — editors cannot override

### 6.3 — Content Calendar

- Visual calendar of all scheduled and published videos across all workspaces
- Colour-coded by client / platform / status
- Drag to reschedule
- Integrates with YouTube Studio scheduled publish and Instagram Creator Studio

## Stage 6 Deliverables Checklist

- [ ]  Team workspaces with role permissions
- [ ]  Real-time collaborative editing
- [ ]  Timeline comment threads + task assignment
- [ ]  Approval workflow
- [ ]  Client workspaces with isolated brand kits
- [ ]  Multi-workspace content calendar

---

# STAGE 7 — MSP Polish + GTM

*"Ship it"*

## Goal

Vivido goes from feature-complete to emotionally ready to ship. Performance, onboarding, and pricing are all locked. The product is tested, stress-tested, and loved by 50 beta creators before public launch.

## Onboarding Flow — "First Video in 10 Minutes" Challenge

**The onboarding must be a product experience, not a tutorial.**

1. Sign up → "What kind of creator are you?" (3 options, visual)
2. Choose your first Creator Style Template (template gallery — pick one)
3. "Let's make your first video" → session starts immediately
4. Guided recording: "Hit record. Talk for 60 seconds about anything."
5. AI auto-edits the 60-second clip: silence removed, captions added, style applied
6. "Your video is ready. Export or publish."
7. Full onboarding complete. Vivido has delivered on its promise.

**Acceptance criteria:**

- First video produced in under 10 minutes for 90%+ of new users
- Onboarding completion rate above 70%

## Pricing Architecture

| Plan | Price | For | Key limits |
| --- | --- | --- | --- |
| **Starter** | Free | Individual, getting started | 3 projects, 720p export, Vivido watermark on free tier captions, 5GB storage |
| **Creator** | ₹799/mo (or $9/mo) | Solo creator | Unlimited projects, 4K export, no watermark, 100GB storage, all AI features, 3 platform publishes |
| **Pro** | ₹1,999/mo (or $24/mo) | Power creator | Everything in Creator + Content Multiplier, unlimited platform publish, 500GB, Presenter Score, Creator DNA |
| **Agency** | ₹5,999/mo (or $69/mo) | Teams up to 10 | Everything in Pro + team workspaces, client workspaces, brand kits, approval workflow, 2TB storage |

**Philosophy:** Free tier must be genuinely useful (not crippled). Creator tier is the CapCut displacement play — priced to be an easy yes. Pro and Agency are where the revenue lives.

## Performance Benchmarks (Must hit before launch)

- App load time: under 2 seconds on standard broadband
- Timeline scrubbing: no lag at 1080p on a 4-core laptop
- AI operations: all complete within published time SLAs
- Crash rate: under 0.1% of sessions
- Data loss incidents: zero in 90-day beta

## Beta Programme

- 50 creators recruited across: solo YouTubers (25), agency editors (15), brand teams (10)
- 30-day beta with weekly feedback calls
- NPS target before launch: 65+
- Success metric: 40%+ of beta users publish at least 3 videos on Vivido during beta

## Stage 7 Deliverables Checklist

- [ ]  Onboarding flow — "First Video in 10 Minutes" challenge
- [ ]  Pricing tiers implemented with Stripe
- [ ]  Performance audit and optimisation pass
- [ ]  Security audit
- [ ]  Beta programme: 50 creators, 30 days
- [ ]  NPS survey system live
- [ ]  Public launch readiness review

---

# 🌙 Moonshot Backlog

*"Things that will make Vivido legendary — when the technology and the timing are right"*

These are parked deliberately. Do not build these until the core product is loved, the revenue is growing, and the engineering team has headroom.

| WI Code | What If | Why It's a Moonshot |
| --- | --- | --- |
| WI-40 | Video fully edited before you finish recording | Real-time AI pipeline doesn't exist reliably yet |
| WI-08 | Describe your video, it assembles itself | Multimodal video understanding needs another model generation |
| WI-09 | Edit by mood / emotional beat map | Paradigm shift — needs core timeline to be deeply loved first |
| WI-12 | 3D VR editing environment | Requires VR hardware adoption threshold not yet reached |
| WI-13 | Edit by humming the rhythm you want | Audio-to-edit pipeline is R&D, not product |
| WI-18 | AI-generated B-roll from script | Gen AI video quality not production-reliable yet |
| WI-30 | Video adapts to viewer attention signals | Requires platform API partnerships not available to indie builders |
| WI-45 | Edit a live published video in real time | Requires YouTube dynamic video serving partnership |
| WI-46 | Video auto-replies to top comments with clips | Trust, guardrails, and creator control unsolved at this autonomy level |

---

# 📊 Success Metrics

## Activation

- First video published within 24 hours of sign-up: **target 40%**
- Onboarding completion: **target 70%**

## Engagement

- Videos published per active creator per month: **target 4+**
- Content Multiplier used per export: **target 60%+**
- Pre-Flight Score checked before publish: **target 80%+**

## Retention

- 30-day retention (D30): **target 45%**
- 90-day retention (D90): **target 30%**
- Creator DNA profile built (5+ videos): **target 60% of active users by Month 3**

## Revenue

- Free → Creator conversion: **target 8%**
- Creator → Pro conversion: **target 15% of Creator tier**
- Agency tier: **target 20 paying agency accounts in Month 6**
- MRR target Month 6: **₹25L ($30K)**
- MRR target Month 12: **₹1Cr ($120K)**

---

# 🔗 Linked Documents

- 📄 Vivido — Product Brainstorm & Strategy OS (parent)
- 🔬 User Research — Competitor Reviews & Creator Pain Points
- 🤯 The Crazy What If List — 50 Unimaginable Video Ideas
- 📊 Vivido What If — MSP Prioritisation Table

---

> *"Vivido doesn't just help creators make videos. It helps them become the creator they always imagined they were."*
>