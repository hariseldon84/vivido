# Vivido — Final Product Requirements Document
**Version:** 2.0 — Final
**Status:** Approved — build from this
**Date:** 2026-04-28
**Approach:** B — Desktop MLP (Windows + Mac) → React Native companion 3–6 months post-MLP
**Design system:** `_designs/design-guidelines.md` (locked)
**App UI screens:** `_designs/app-ui/` (locked — 4 screens)
**Source documents:** prd-new.md (gstack review) + BMAD PRD v1

---

## The One-Sentence Brief

> **Vivido is the last video editor a YouTube creator installs — a local-first, cross-platform desktop app that eliminates the 4–7 tool workflow by combining recording, AI-assisted editing, transcription, audio mastering, and one-click publishing in a single product that gets smarter every time you use it.**

---

## Why We're Building This

**The problem is real and the founder has lived it.**
Riverside for recording → Final Cut for editing → Submagic for captions → VidIQ + YouTube Studio for publishing. Every project starts from zero. No tool accumulates knowledge about how a specific creator edits. Switching cost is 30–60 minutes per video for a simple creator, hours for an ambitious one.

**The market window is open.**
CapCut's January 2025 US ban displaced 264M+ users. No dominant replacement has emerged 15+ months later. The 18–24 month window closes around mid-2026. Vivido must have an MLP in creators' hands before that window shuts.

**The FCP complaint is the wedge.**
Multiple independent creators said unprompted: "FCP is too complex and it's Mac-only." Same complaint, different people. Not coordinated. That's signal. The wedge: **pro-enough editing for ambitious creators who want FCP-grade outcomes without FCP-grade complexity or Apple lock-in.**

**The moat is not features. It's accumulated editorial taste.**
A style model that knows how YOU cut is the only defensible advantage that compounds over time. No competitor — FCP, Premiere, DaVinci, Descript — accumulates creator-specific intelligence across sessions. Vivido's moat activates at project 5, approaches zero churn at project 20+.

**Founder's unfair advantage:** Vivido is designed by someone who is simultaneously a trained filmmaker, director, cinematographer, and video editor — not a SaaS founder approximating creative workflows. Every product decision carries the judgment of someone who has lived inside the problem. Most founders have domain expertise or technical capability. This founder has both.

---

## Executive Summary

Vivido is an AI-native, OS-level video creation platform for YouTube creators, independent filmmakers, and agency/brand teams. It eliminates the 7-tool creator workflow — replacing Premiere, Opus Clip, Submagic, Riverside, iZotope RX, Loom, and the manual YouTube Studio post-export process — with a single native desktop application designed as a platform from day one.

Every existing video editor treats every project as day one. Vivido is the first editor that learns. A per-creator style model accumulates across every project — hook structures, cut rhythms, B-roll patterns, audio treatment, pacing — and compounds into a creative intelligence that pre-stages rough cuts, suggests chapters, and identifies Shorts opportunities in the creator's own editorial voice.

**Target users:**
- Solo YouTube creators on Windows (underserved by FCP, priced out of Premiere, displaced by CapCut ban)
- Independent filmmakers who need cinema-grade tools without a post-production studio
- Agency/brand teams running multi-creator content operations (Stage 3)

**Not building for:** Educators, enterprise B2B, Loom-replacement, casual social media creators.

**Market entry:** CapCut's January 2025 US ban displaced 264M+ users. The replacement window is 18–24 months. Vivido enters as the YouTube creator's final stack — the last tool they install — and grows toward the filmmaker's OS by 2029.

---

## The 4 MLP Features

The MLP is the smallest version of Vivido where a creator finishes one real project and says *"I didn't know editing software could feel like this."*

**All 4 features are required. None alone is sufficient.**
Skipping GPU playback repositions Vivido as a Descript competitor — a worse place to be, not a safer one.

### 1. Native GPU Decode + 4K Instant Playback
VideoToolbox (Mac) + NVDEC/D3D11VA (Windows). No WASM fallback for the preview canvas. Hardware-accelerated from frame one. 4K footage scrubs with zero buffering on minimum spec (GPU with hardware decode support, 2018+).

This is the jaw-drop moment. This is what separates Vivido from every browser-based or WASM-dependent tool. If playback ever spins, it's an engineering bug — not a design workaround.

### 2. YouTube-Native Timeline
Chapters, Shorts markers, and End Screen zones are **draggable first-class timeline objects** — not export-time settings or a description box add-on. They live on the timeline. The creative decision happens at edit time, not post-publish.

Export generates automatically:
- `chapters.txt` (ready to paste into YouTube description)
- Standalone Shorts clips (pre-cropped 9:16, with horizontal source warning + crop preview before export)
- End Screen zone timestamps

### 3. Whisper Transcript Editing
Background transcription begins immediately on footage import. No button press. By the time the creator finishes arranging clips, the transcript is ready.

Word-level edit: clicking a word scrubs to that position. Deleting words in transcript view cuts those sections from the timeline in real-time sync. Captions are styled timeline objects. Filler word detection + one-click removal. Whisper Large v3 local inference. Confidence score visible. No data sent to any external API.

### 4. Audio Room + Publish Package

**Audio Room:** AI background noise removal (one action, no parameters required), parametric EQ, compression, automatic platform-matched LUFS normalization (YouTube −14, Shorts −13, Podcast −16, Broadcast −23). Stereo metering with platform pass/warn/fail readouts. All effects are visible, badged as AI where applicable, and reversible. No silent processing.

**Publish Package:** One-click export generates a complete ready-to-upload folder:
- `main_video_4k.mp4`
- `short_01.mp4`, `short_02.mp4`, ... (all Shorts clips, 9:16 cropped)
- `thumbnail_01.jpg`, `thumbnail_02.jpg`, `thumbnail_03.jpg` (candidate frames)
- `chapters.txt`
- `captions_en.srt`

Zero tool switching required after this. Creator goes from Vivido to YouTube Studio upload.

---

## Also Ships With MLP (Infrastructure, Not Features)

Not user-facing features — but all must be working at launch:

| Item | Detail |
|---|---|
| Guest mode | No account required to open, import, edit, and export. Zero signup friction. |
| Style model passive init | Silent JSON accumulator from project 1. No UI at this stage. |
| Frictionless account creation | Only surfaced at the "save style" moment after project 1. Never at first launch. |
| Open JSON project format | `.vivido` files are documented JSON. Readable in any text editor. Schema published at `vivido.app/schema`. |
| Auto-save | Every 30 seconds minimum. Atomic write (write-to-temp, rename on success). No UI interruption. |
| 30-day version history | Accessible from the UI. Creator can restore any saved state within 30 days. |
| Supabase Auth + Cloudflare R2 | Style model metadata sync on account creation. Video files never uploaded unless explicitly initiated. |
| Stripe + Razorpay | Stripe primary globally. Razorpay primary for India (RBI mandate). PCI-DSS: card data never touches Vivido servers. |
| EU AI Act compliance | AI disclosure + AI Trust Settings in place before any EU creator uses Vivido. |
| Crash recovery | On unexpected exit, restore last auto-saved state on next launch. Zero data loss beyond last 30-second window. |

---

## What MLP Explicitly Does NOT Include

| Feature | Reason | Phase |
|---|---|---|
| Screen/webcam recording | OS capture complexity; MLP is editing-first | Stage 2 |
| AI rough cut | Needs project 5+ style model data | Stage 2 |
| Hook Intelligence (YouTube Analytics loop) | Needs post-launch signal data | Stage 2 |
| LUT color grading room | High complexity; MLP audio focus | Stage 2 |
| Advanced multitrack EQ | MLP Audio Room covers the need | Stage 2 |
| B-roll suggestion (Claude API) | Needs style model context | Stage 2 |
| Web app full timeline editor | WASM fallback; Stage 2 | Stage 2 |
| Team collaboration / client review | Studio tier user; Stage 3 | Stage 3 |
| Cloud render queue (AWS MediaConvert) | Local render sufficient for MLP | Stage 3 |
| React Native mobile companion | 3–6 months post-MLP | Post-MLP |
| Linux support | Revisit at 10K users | Post-MLP |

**The rule:** if a creator needs it to finish their first YouTube video, it's MLP. If it's nice-to-have, it's Stage 2.

---

## Target Users

### Primary: The Founder
Trained filmmaker + solo YouTube creator living the Riverside → FCP → VidIQ → YouTube Studio loop daily. The first validator is the person who built it. Build so he can replace his own stack completely.

### Primary: Maya — The CapCut Refugee
28, Windows laptop, 45K subscribers, tech explainer channel. Using: Premiere trial (expiring), Submagic ($30/mo), Canva ($15/mo), YouTube Studio. Every video takes 4 hours longer than CapCut. Channel growth has stalled.

### Primary: The "FCP for Windows" Creator
Ambitious creator. Wants FCP-grade output. Not on Mac. Intimidated by DaVinci's learning cliff. Priced out of Premiere ($660/yr). Vivido is the obvious answer — they just don't know it exists yet.

### Primary: The Aspiring Filmmaker
Domain expert (the story), not a software expert (the tools). Sitting on raw footage for months because every NLE's opening dialog stopped them. Vivido's transcript-first interface is the first editing surface they can navigate without a manual.

### Secondary (Stage 3): Agency/Brand Team Lead
Running 5–8 YouTube channels. Juggling editors, clients, version control, and approvals across tools. The $121/mo tool stack is the least of the problems — the wrong-version incident is. Multi-workspace, role-based access, client approval flows.

### Not Building For (MLP)
Educators, enterprise B2B, Loom-replacement buyers, casual TikTok creators (short-form only).

---

## Platform

**Windows + Mac ship simultaneously at MLP.** FCP's Mac exclusivity is the exact complaint that drives the wedge. Both platforms, day one.

| Platform | Build | Priority |
|---|---|---|
| Windows 10/11 (x64) | Build 19041+ | P0 — ships first in CI/CD priority |
| macOS 13+ (Apple Silicon arm64 + Intel x64) | Universal binary | P0 — ships with Windows |
| Linux (Ubuntu 22.04+) | AppImage | P2 — revisit at 10K users |
| Web (Chrome 120+, Edge 120+) | Web companion only at MLP | P1 — sync/account/review; full editor is Stage 2 |

**React Native companion (3–6 months post-MLP):**
- Project sync via Supabase (already in architecture)
- Remote clip review — frame-accurate comments on phone
- Shorts preview — see the 9:16 crop before approving upload
- Push to YouTube from phone (OAuth already planned)
- **No local video encoding on mobile** — all heavy compute routes to desktop or AWS MediaConvert

---

## Pricing

| Tier | Price | Key Entitlements |
|---|---|---|
| **Free** | $0 forever | Full editor, unlimited projects, local render, manual captions. No AI features. No watermarks. No Publish Package. No style model cloud sync. |
| **Creator** | $199/yr | Free + Whisper captions, AI noise removal, Audio Room, Style Model cloud sync, AI rough cut (project 5+), Shorts auto-crop, Publish Package, YouTube API upload, Cloud backup |
| **Lifetime** | $599 one-time | Full Creator tier forever. All future updates. Early access to Stage 2 features. Launch window only — closes at 500 conversions or 90 days post-launch. |
| **Studio** | $499/yr | Creator + Team workspaces (5 seats), client review/approval, cloud render queue, Brand Kit, color grading room, plugin API (Stage 3) |

**Free tier is unlimited projects with full manual editing.** Conversion happens through AI feature exposure, not project limits. Creators see exactly what they're missing (AI badge on locked features) without hitting a wall that stops them from editing.

**Positioning:** Above free (CapCut tier), below Premiere ($660/yr). The $199 Creator tier replaces $1,500–2,000/yr in current tool spend.

---

## Tech Stack (Locked — Requires ADR to Change)

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React + Vite | Web-first, fast HMR, shared between Electron renderer + web app |
| Desktop | Electron | Wraps web app, native file access, cross-platform |
| Video Engine | FFmpeg native subprocess (Electron) + FFmpeg WASM (browser preview fallback) | Industry standard; native runtime for 4K |
| AI Transcription | Whisper.cpp (local, GGML models) | Local inference = zero API cost, fully offline |
| AI Features | Anthropic Claude API (claude-sonnet-4-6) | B-roll suggestion, chapter generation, metadata writing (Stage 2) |
| Style Model | JSON accumulator → SQLite local → Supabase sync | Passive, grows with usage, local-first |
| Real-time Collab | Liveblocks | Multiplayer editing presence (Stage 3) |
| Storage | Supabase (metadata + auth) + Cloudflare R2 (rendered outputs) | Video files never in Supabase |
| Payments | Stripe + Razorpay (India fallback) | Global + India creator base |
| Cloud Render | AWS MediaConvert | Background render queue (Stage 2+) |
| Deploy | Vercel (web app) + GitHub Actions (Electron builds) | Fast CI/CD |

---

## Architecture: Dual-Runtime with Explicit Compute Boundary (ADR-001-C)

```
┌─────────────────────────────────────────────────────────┐
│  BROWSER RUNTIME (React + Vite)                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │ Timeline UI │  │ Transcript   │  │ Audio Room UI │   │
│  │ Inspector   │  │ AI Panel     │  │ Publish UI    │   │
│  └─────────────┘  └──────────────┘  └───────────────┘   │
│                                                          │
│  usePlatform() hook → routes compute to native or WASM  │
│  ↕ IPC (typed contracts, CI-validated schemas)           │
├─────────────────────────────────────────────────────────┤
│  NATIVE RUNTIME (Electron main + Node.js)                │
│  ┌─────────────┐  ┌───────────┐  ┌────────────────┐     │
│  │ FFmpeg      │  │ Whisper   │  │ Style Model    │     │
│  │ (native)    │  │ (.cpp)    │  │ (SQLite + sync)│     │
│  └─────────────┘  └───────────┘  └────────────────┘     │
│  ┌─────────────────────┐  ┌───────────────────────┐      │
│  │ GPU Decode          │  │ File I/O              │      │
│  │ VideoToolbox/NVDEC  │  │ .vivido JSON format   │      │
│  └─────────────────────┘  └───────────────────────┘      │
└─────────────────────────────────────────────────────────┘
         ↓ Cloudflare R2 (rendered outputs only)
         ↓ Supabase (auth + style model metadata)
         ↓ AWS MediaConvert (long-form cloud render, Stage 2)
```

**The headless capability is built-in from day one.** The native runtime that runs in Electron today runs as a headless cloud render worker in Stage 2 — same FFmpeg pipeline, different host — without a rewrite. This is why ADR-001-C exists.

**IPC contract rule:** All renderer↔native messages are typed and validated against documented schemas. No eval. No dynamic code execution over IPC. CI validates schema compliance and blocks release on violation.

**Shared UI codebase:** React + Vite renderer shares 100% of UI code between Electron and web app via `usePlatform()` which routes compute requests to native runtime (Electron) or WASM fallback (browser).

---

## The Style Model (The Moat)

The style model is what makes Vivido defensible. Everything else can be copied.

| Projects | State | What Vivido Does |
|---|---|---|
| 1–4 | Passive initialization | Silent JSON accumulator. Observes: cut frequency, average clip duration, caption density, B-roll patterns, audio treatment choices, hook length, Shorts cadence. No UI shown. No creator action needed. |
| 5–9 | First surface | Shows creator 3 observations about their editing style. Requires confirmation — not assumed correct. No auto-suggestions yet. |
| 10–19 | Active assistance | Pre-stages rough cut suggestions, auto-marks chapter boundaries, flags Shorts sections — in the creator's editorial voice. Presented for review, never auto-applied. |
| 20+ | Deep personalization | Moat is closed. The style model knows this channel better than any editor you could hire. Hook structure, pacing, energy curves, audio fingerprint. Churn approaches zero. |

**What the style model stores:** Behavioral metadata only — cut durations, clip counts, audio treatment flags, chapter density, Shorts cadence. Never video content, transcripts, or PII about subjects in videos.

**GDPR compliance:** Style model data is personal data under GDPR. Explicit consent at collection. Right to erasure (style model wipe without account deletion). Data portability (export as JSON). Processing transparency (creator can see what Vivido has observed at any time from account settings).

---

## Patent Portfolio

All provisionals filed before any public demo. The prototype is a public disclosure.

| # | Name | Filing Window | Status |
|---|---|---|---|
| #1 | Per-Creator Compounding Editorial Style Model | Before any public demo | File immediately |
| #2 | YouTube-Native Timeline Primitives | Within 12 months of MLP launch | Post-MLP |
| #3 | Cross-Project Hook Intelligence (YouTube Analytics ↔ Timeline) | Before any public demo | File immediately |
| #4 | Adaptive Audio Normalization per Platform | Within 18 months of MLP launch | Stage 2 |
| #5 | AI Rough Cut Pre-Visualization from Per-Creator Style Model | Within 18 months of Stage 2 launch | Stage 2 |

**Freedom-to-operate review required before MLP launch:** Descript holds patents in transcript-synced video editing. FTO review must confirm no prior art conflict for FR15–FR17 (Whisper background transcription + word-level transcript edit synced to timeline). Implementation differentiation documented before launch. This is a legal blocker — treat it as such.

All novel style model algorithms documented with invention disclosure records before public release.

---

## User Journeys

### Journey 1 — Maya: The CapCut Refugee (Primary — Success Path)

Maya, 28, independent YouTube creator, 45K subscribers, Windows laptop, Delhi. Tech explainer videos. CapCut banned January 2025. Now: Premiere trial (watermark countdown: 6 days), Submagic, Canva, YouTube Studio. Every video takes 4 hours longer. Upload frequency: weekly → biweekly. Channel growth stalled.

**Scene:** Sunday. 2 hours of raw footage from a product review. Four tabs open.

1. Downloads Vivido. No account. No wizard. No preset dialog.
2. Drags footage. Plays immediately — 4K, full resolution. Sidebar: transcript appearing live. Two things her current workflow couldn't do in 10 minutes.
3. Edits by deleting filler words. Timeline updates in sync.
4. Drags a Chapter marker. Marks two Shorts segments.
5. Clicks "Remove Background Noise." HVAC hum disappears.
6. Clicks "Publish Package." 40 seconds. A folder: `main.mp4`, `shorts-reveal.mp4`, `shorts-verdict.mp4`, `thumbnail-01.jpg`, `thumbnail-02.jpg`, `thumbnail-03.jpg`, `chapters.txt`.
7. Copies `chapters.txt` into YouTube Studio. Uploads. Done.
8. Vivido shows: *"Project 1 complete. Your style is starting to take shape — save it so Vivido remembers you."* She creates an account.

**Result:** 1:20 total vs previous 3:45. Zero external tools. One tweet: *"Just edited my first video with @VividoApp and I genuinely don't understand why I was using 4 apps before."*

**Capabilities revealed:** Guest mode, instant GPU playback, background Whisper, transcript editing, chapter markers, Shorts markers, AI noise removal, LUFS normalization, Publish Package, style model passive init, frictionless account creation.

---

### Journey 2 — Ravi: The Agency Studio Lead (Secondary — Operations Path)

Ravi, 34, runs a 3-person video agency in Mumbai. Eight brand YouTube channels under management. Monthly tool stack: Premiere × 3 seats ($60 × 3) + Frame.io ($25) + Dropbox Business ($20) + Notion ($16) = $121/mo. Last month an editor sent the wrong cut to a client. Ravi apologized for 45 minutes on a call.

1. Onboards Vivido Studio. Creates workspace "Ravi Creative Studio." Invites two editors (role: Editor — can edit, cannot publish). Creates client logins (role: Reviewer — can comment and approve only). Loads Brand Kit for the fintech client: logo, color palette, intro/outro templates, approved music library.
2. Editor #1 opens the fintech project. Brand Kit pre-loaded — no setup. Edits, clicks "Submit for Review." A review link is generated.
3. Ravi opens review link on his phone: frame-accurate comment markers on the timeline. Adds: *"Cut the pause at 1:42."* Client gets a separate read-only link. Approves with one note. Editor makes the change, resubmits. Client approves.
4. Ravi opens Projects dashboard: eight channels, all statuses visible — In Edit / In Review / Client Approved / Published. One channel 2 days behind. Flags it in one click.

**Result:** Wrong-version incident never again. Monthly cost: $41.58/mo vs $121/mo. Saves $79/mo and 3 hours of coordination per week.

**Capabilities revealed:** Multi-workspace, role-based access (Editor/Reviewer/Client), Brand Kit per workspace, frame-accurate review comments, client approval flow, project status dashboard, version control. *(Stage 3)*

---

### Journey 3 — Arjun: The First-Time Filmmaker (Primary — New Market Path)

Arjun, 26, marketing professional. Shot 6 hours of documentary footage. Opened Premiere once — saw the sequence dialog, closed it. Opened DaVinci once — saw the Color Room tabs, closed it. Sitting on footage for 4 months.

1. Downloads Vivido. Drags a 12-minute interview clip. It plays.
2. Uses transcript view as primary interface — highlights quotes that tell the story, deletes the gaps. Never touches the timeline until the story structure exists in words.
3. Switches to timeline for the first time. Vivido nudges: *"Your average clip is 45 seconds — longer than typical. Want to see where viewers might lose attention?"* Three clips highlighted. He trims them. Accepts 3 of 4 B-roll suggestions.
4. At project 3: selects "Archive Export" (ProRes 422). Submits to a short film festival.

**Result:** The documentary he sat on for 4 months is submitted. He learned what editing feels like — not what codecs are. Three projects in, he marks chapters on every YouTube upload.

**Capabilities revealed:** Transcript-first editing as primary interface, B-roll suggestion from transcript context, ProRes/archive export, layered design (transcript → timeline without intimidation), gentle intelligence nudges (never forced).

---

### Journey 4 — Jess: Mobile-Native Creator Going Desktop (Primary — Friction Path)

Jess, 22, 180K YouTube subscribers. Shorts-focused, shifting to long-form. Edited everything on phone with CapCut Mobile. Never used a desktop editor. Switching because long-form is getting too complex for mobile.

1. Installs Vivido on Windows laptop. Drops a 22-minute vlog. It plays. Transcript appears. She knows transcripts from mobile — starts there.
2. First friction: adding a music track. On mobile: one tap. On Vivido: drag audio file into timeline. Right-clicks, nothing obvious. Opens keyboard shortcut reference. Finds it. Drags. 3 minutes vs 10 seconds on mobile — but she did it.
3. First delight: marks 4 Shorts sections while editing long-form. Publish Package outputs all 4 pre-cropped to 9:16, already captioned. Uploads all 4 Shorts same day as the long-form — first time ever.
4. Long-form retention 40% higher. Traces it to chapter markers. Shares in a creator Discord. Three creators download Vivido the same day.

**Note on friction:** Learning curve is real — 3 videos before it feels fast. Not zero. That's honest. The Shorts-from-long-form workflow is the unlock. It's better than any mobile tool.

**Capabilities revealed:** Mobile-to-desktop onboarding, keyboard shortcut discoverability (? key), Shorts crop preview before export, horizontal source clip warning, retention insight loop.

---

### Journey 5 — Support Operations (Internal Path)

**Scenario:** Creator reports Shorts clip exported in 16:9 instead of 9:16 after marking a horizontal source clip as Shorts.

Support accesses project metadata (never raw files, never without consent). Source clip was 16:9 — Vivido attempted auto-crop silently with no warning. Bug identified: Shorts marker on horizontal source must surface a crop preview before export. Creator consent model for support metadata access documented.

**Capabilities revealed:** Support read-only metadata access with explicit consent model, Shorts crop preview before export, horizontal source detection and warning, creator consent model for troubleshooting.

---

### Journey Requirements Summary

| Capability Area | Revealed By | Phase |
|---|---|---|
| Guest mode + frictionless account creation at value moment | Journey 1 | MLP |
| Native GPU playback, background Whisper, transcript editing | Journeys 1, 3 | MLP |
| YouTube-native primitives (chapters, Shorts, End Screens) | Journeys 1, 4 | MLP |
| AI noise removal + LUFS normalization + Publish Package | Journey 1 | MLP |
| Style model initialization and "save moment" conversion | Journey 1 | MLP |
| Transcript-first editing as primary (not secondary) interface | Journeys 3, 4 | MLP |
| Shorts crop preview + horizontal source warning | Journeys 4, 5 | MLP |
| Keyboard shortcut discoverability | Journey 4 | MLP |
| B-roll suggestion from transcript context (Claude API) | Journey 3 | Stage 2 |
| ProRes / archive export | Journey 3 | Stage 2 |
| Multi-workspace, role-based access, Brand Kit | Journey 2 | Stage 3 |
| Frame-accurate review + client approval flow | Journey 2 | Stage 3 |
| Project status dashboard (multi-channel) | Journey 2 | Stage 3 |
| Support read-only metadata access with consent model | Journey 5 | MLP |

---

## Functional Requirements

### Media Import & Playback

- **FR1:** Creator can import video files (MP4, MOV, MKV, AVI, WebM, R3D, BRAW) via drag-and-drop or file browser without configuration.
- **FR2:** Creator can import audio files (WAV, MP3, AAC, AIFF, FLAC) as standalone tracks.
- **FR3:** Vivido plays imported footage at native resolution with hardware-accelerated decode immediately on import — no processing required before first frame.
- **FR4:** Creator can scrub through footage at any position with frame-accurate seeking.
- **FR5:** Vivido automatically detects footage resolution, frame rate, color space, and audio sample rate — never asks creator to configure sequence settings.
- **FR6:** Creator can manage a project asset library showing all imported media with thumbnails, duration, and usage status.

### Timeline Editing

- **FR7:** Creator can create a multi-track timeline with at minimum 2 video tracks, 2 audio tracks (VO + music), and 1 caption track.
- **FR8:** Creator can perform non-destructive cuts, trims, splits, and ripple deletes on timeline clips.
- **FR9:** Creator can add, reorder, and delete clips on the timeline via keyboard shortcut and drag-and-drop.
- **FR10:** Creator can adjust clip speed (slow motion, time-lapse) non-destructively.
- **FR11:** Creator can apply transitions between clips (cut, dissolve, fade to black minimum).
- **FR12:** Creator can add title cards and lower-thirds as timeline text objects with style controls.
- **FR13:** Vivido auto-saves the project every 30 seconds minimum with no UI interruption.
- **FR14:** Creator can access version history for the last 30 days and restore any saved state.

### Transcript & Caption System

- **FR15:** Vivido automatically transcribes imported footage using local Whisper inference — running in background, never blocking the UI.
- **FR16:** Creator can edit the project transcript by selecting, deleting, or rearranging words — with all changes reflected in the timeline in real-time.
- **FR17:** Creator can switch between Transcript view and Timeline view within the same project without losing state.
- **FR18:** Creator can style captions (font, size, color, position, background, animation style) once and have the style applied to all captions in the project.
- **FR19:** Creator can export captions as SRT or VTT alongside the video export.
- **FR20:** Vivido detects and highlights low-confidence transcript words for creator review.

### Audio Engineering

- **FR21:** Creator can apply AI-powered noise removal to any audio clip with a single action — no parameters required.
- **FR22:** Creator can apply EQ presets by content type (Voice Only, Voice + Music, Interview, Cinematic) to audio clips or the master output.
- **FR23:** Vivido automatically applies platform-specific loudness normalization (YouTube −14 LUFS, Shorts −13 LUFS, Podcast −16 LUFS) based on the selected export target.
- **FR24:** Creator can adjust audio levels per clip and per track with visual waveform feedback.
- **FR25:** Creator can add background music tracks with automatic ducking when voice is detected.
- **FR26:** Creator can preview audio with normalization applied before export.

### YouTube-Native Publishing

- **FR27:** Creator can add Chapter markers as draggable objects directly in the timeline — previewed in the player as the creator edits.
- **FR28:** Creator can mark Shorts segments in the timeline with in/out points — previewed as a vertical 9:16 frame alongside the main timeline.
- **FR29:** Vivido warns the creator when a Shorts-marked clip is horizontal (16:9) and shows a crop preview before export.
- **FR30:** Creator can add End Screen zones and Info Card timestamps as timeline objects.
- **FR31:** Creator can generate a Publish Package with a single action — outputting: main MP4 with embedded chapter metadata, auto-cropped 9:16 Shorts clips, 3 thumbnail candidate frames, `chapters.txt`, `captions_en.srt`.
- **FR32:** Creator can directly upload to YouTube from within Vivido (authenticated via OAuth) including title, description, tags, and chapter injection.
- **FR33:** Creator can share a review link for a project that opens in a browser without Vivido installed.

### Recording & Capture (Stage 2)

- **FR34:** Creator can record full screen, a specific application window, or a custom region.
- **FR35:** Creator can record webcam as a standalone clip or picture-in-picture overlay on screen capture.
- **FR36:** Creator can record screen, webcam, microphone, and system audio as separate, independent tracks simultaneously.
- **FR37:** Vivido writes recording tracks to local disk in real-time — no recording loss on network interruption.
- **FR38:** Creator can select a Scene Composer layout (Interview, Tutorial, Podcast, Cinematic) before recording to automatically arrange multi-source inputs.
- **FR39:** When recording ends, a new project opens automatically with all recorded tracks placed in the timeline.

### Creator Intelligence — Style Model

- **FR40:** Vivido passively observes creator editing behavior across projects and accumulates a style profile (cut duration patterns, hook length, B-roll ratio, audio treatment, chapter density) without requiring any creator action.
- **FR41:** Vivido surfaces style model observations to the creator after project completion for confirmation or correction — never assumed correct.
- **FR42:** Creator can view their style model summary at any time from account settings.
- **FR43:** Creator can delete their style model data at any time from account settings.
- **FR44:** Creator can export their style model as a JSON file (data portability, GDPR compliance).
- **FR45:** At project 5+, Vivido generates an AI rough cut pre-staging based on the creator's style model — presented for review, never auto-applied.
- **FR46:** Vivido connects YouTube Analytics retention data to source timeline positions (Hook Intelligence) and surfaces editing recommendations for the next project. *(Stage 2)*

### Color & Visual (Stage 2+)

- **FR47:** Creator can apply LUT presets to clips or the entire timeline with real-time preview.
- **FR48:** Creator can access creator-vocabulary color controls ("Exposure," "Warmth," "Cinematic") that map to professional color science parameters.
- **FR49:** Vivido suggests LUT presets matched to the creator's channel visual identity based on style model history.
- **FR50:** Creator can ingest Log/ACES footage with automatic color space detection and appropriate transforms.

### Workspace, Account & Subscription

- **FR51:** Creator can use Vivido's full editor without creating an account (guest mode) — style model accumulates locally.
- **FR52:** Creator can create an account with email or OAuth (Google) and sync style model to the cloud.
- **FR53:** Creator can manage subscription tier, billing, and payment method from within the app.
- **FR54:** Agency lead can invite team members to a Studio workspace with role-based permissions (Editor, Reviewer, Client). *(Stage 3)*
- **FR55:** Agency lead can create Brand Kits per client workspace with logos, color palettes, templates, and approved assets. *(Stage 3)*
- **FR56:** Agency lead can view a project status dashboard across all managed channels. *(Stage 3)*
- **FR57:** Reviewer/client can access a project review link in a browser, add frame-accurate comments, and approve or request changes. *(Stage 3)*

### Support & Operations

- **FR58:** Support staff can access creator project metadata (not raw footage) with creator consent for troubleshooting.
- **FR59:** Vivido surfaces in-app feedback and bug reporting with automatic project metadata attachment (with creator consent).
- **FR60:** Creator can opt in or out of anonymous product analytics from privacy settings at any time.

---

## Non-Functional Requirements

### Performance

| Requirement | Target | Condition |
|---|---|---|
| Import to first frame | < 3 seconds | MP4/H.264, minimum spec |
| 4K scrubbing | Zero buffering, hardware-decode | All supported hardware |
| Whisper transcription | < 10% of audio duration | 10-min audio < 60s, min spec |
| Audio processing (noise + LUFS) | < 5% of audio duration | On minimum spec |
| Publish Package export | < 2× real-time | 10-min video < 20 min, min spec |
| All editing UI interactions | < 100ms response | Cuts, trims, scrub, transcript edits |
| Auto-save background write | < 50ms | No perceptible UI impact |
| Timeline data model | 90+ min, 500+ clips | No performance degradation |

**Minimum spec:** GPU with hardware video decode (NVDEC or equivalent, 2018+), 8GB RAM, 50GB free disk.
**Recommended spec:** Dedicated GPU (NVIDIA RTX 3060 or Apple M1+), 16GB RAM, NVMe SSD.

### Security

- All data in transit: TLS 1.3 minimum
- Style model data at rest: AES-256 in Supabase; R2 objects private by default, signed URLs with 1-hour expiry
- **Electron hardening:** `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, no remote module, CSP configured for renderer
- **IPC security:** All renderer↔native messages validated against typed schemas. No eval. No dynamic code execution over IPC.
- **Credential handling:** No API keys ever in the renderer process. YouTube OAuth tokens encrypted in Supabase — never in localStorage. Stripe/Razorpay card data never touches Vivido servers.
- **Creator data isolation:** No creator can access another creator's project data, style model, or media files.
- **Creator footage:** Raw video files never leave the creator's machine unless they explicitly initiate an upload.

### Privacy by Design

- Style model stores behavioral metadata only: cut durations, clip counts, audio treatment flags, chapter density, Shorts cadence. **Never video content, transcripts, or PII about subjects in videos.**
- Transcript cloud sync is opt-in (required for collaboration); local-only mode always available.
- Analytics: aggregate anonymous product usage metrics only — never per-creator content analysis. Opt-out available (FR60).
- YouTube OAuth tokens: creator can revoke at any time from account settings. Revocation takes effect within 1 hour.

### Reliability

- **Offline-first core:** Cuts, trims, transcript editing, audio processing, and local export work with zero network connectivity.
- **Atomic save:** Project writes use write-to-temp + rename-on-success. No partial saves.
- **Crash recovery:** On unexpected exit, restore last auto-saved state on next launch. Zero data loss beyond last 30-second window.
- **Recording integrity:** Tracks written to disk in real-time — no frame loss on network interruption during capture. *(Stage 2)*
- **Update safety:** Auto-updates install on next launch — never interrupt an active session or active export.

### Scalability

- Server-side components (Supabase, R2, Vercel) support 10× user growth (100K creators) with < 10% performance degradation.
- Supabase schema designed for 1M+ creator style model records without query degradation.
- AWS MediaConvert scales horizontally — no concurrency limit at architecture level.
- Vercel + Cloudflare CDN: < 100ms TTFB for static assets in primary markets (India, US, Europe).

### Accessibility

- **Keyboard navigation:** All primary editing operations (cuts, trims, play/pause, chapter marking, Shorts marking, export trigger) accessible via keyboard shortcuts.
- **Keyboard discoverability:** `?` key or Help menu opens shortcut reference at all times. Contextual shortcut hints on hover.
- **Color contrast:** WCAG AA minimum (4.5:1) for all text and interactive elements.
- **Screen reader:** Core project management UI (project library, account settings, subscription management) compatible with VoiceOver (Mac) and NVDA (Windows).
- **Reduced motion:** Respects OS-level reduced motion preference for UI animations.

### Integration Reliability

| Integration | Purpose | Required For | Graceful Degradation |
|---|---|---|---|
| Supabase Auth | Email + OAuth, creator identity | MLP | Local-only guest mode |
| Supabase DB | Style model metadata, project metadata, subscription status | MLP | Local SQLite fallback |
| Cloudflare R2 | Rendered output storage, optional asset backup | MLP (on auth) | Local export folder |
| YouTube Data API v3 | Video upload, chapter metadata, Analytics (Hook Intel) | MLP (upload), Stage 2 (analytics) | Cached data, retry queue |
| Stripe + Razorpay | Payment processing, subscription lifecycle | MLP | Show error, retry |
| Whisper.cpp | Local transcription — fully offline | MLP | N/A — local only |
| Anthropic Claude API | B-roll suggestion, hook detection, metadata writing | Stage 2 | Disable AI suggestions |
| Liveblocks | Real-time collaborative editing presence | Stage 3 | Async-only fallback |
| AWS MediaConvert | Cloud render queue | Stage 2+ | Desktop render fallback |

---

## Compliance & Regulatory

### EU AI Act (Full enforcement: August 2026)
- All AI-generated or AI-assisted output must include disclosure — creator informed when AI made a decision affecting their content.
- AI Trust Settings required per-user: creators can opt out of any AI feature individually without losing access to manual alternatives.
- No AI feature may auto-apply without explicit creator action — suggestions shown, application requires deliberate creator decision.
- C2PA-compatible provenance metadata on export configurable for EU distribution (off by default).
- **EU AI Act compliance is an MLP blocker.** No EU creator uses Vivido until this is in place.

### GDPR / CCPA
- Style model data is personal data under GDPR: explicit consent at collection, right to erasure, data portability (export as JSON), processing transparency.
- Video footage and project files are creator-owned — raw footage never leaves creator's machine unless they explicitly initiate cloud upload.
- Cloud data retention: Supabase style model metadata retained while account active; R2 rendered outputs deleted after 90 days unless extended storage opted in; 30-day version history.
- CCPA deletion cascade (within 30 days): Supabase auth record + style model + project metadata + R2 objects.
- Desktop app collects no analytics without opt-in (FR60).

### Recording Consent Laws (Stage 2)
- 13 US all-party consent states (CA, CT, FL, IL, MD, MA, MI, MT, NV, NH, OR, PA, WA): jurisdiction-appropriate consent notice displayed when recording is initiated.
- Remote guest recording: each guest receives and acknowledges recording consent before capture; consent record stored with project metadata.
- Disclosure UI must be localizable for EU, UK, Canada, and Australia requirements.

### YouTube API Terms
- API quota management required for Hook Intelligence (10,000 units/day default per project).
- Prohibited: using API data to build competing recommendation systems; storing API data beyond 30-day cache window.
- YouTube OAuth upload scope requires manual Google review — apply before launch.
- API credentials stored server-side (Supabase Edge Function) — never exposed to client.

### FFmpeg Licensing
- Dynamic linking only — static linking with H.264/AAC triggers GPL obligations.
- H.265/HEVC: use OS-native encoders (VideoToolbox/NVENC) — not open-source HEVC encoders.
- AAC: use libavcodec native AAC (LGPL) or OS-native CoreAudio/MediaFoundation — not FDK AAC (GPL).
- **CI/CD gate:** validates FFmpeg build flags, blocks release if GPL components detected.

---

## Project File Format

- **Format:** Open JSON, `.vivido` extension — readable in any text editor
- **Schema:** Documented publicly at `vivido.app/schema` at launch
- **Versioning:** Semantic versioning for schema. Vivido reads older versions; migration runs automatically on open; original backed up before migration.
- **Contents:** Project metadata, timeline state (clip references + edit decisions), transcript data, style observations, chapter/Shorts markers, export settings. Never embeds raw media — file references only.
- **OS integration:** `.vivido` file association registered on install. Dock/taskbar recent projects. Default storage: `~/Movies/Vivido/` (Mac), `%USERPROFILE%\Videos\Vivido\` (Windows).

---

## Desktop Distribution

**Signed and notarized binaries via GitHub Releases.**
- `electron-updater` for delta updates (patches only download the diff)
- Creator can defer feature updates but not security patches
- Download page at `vivido.app/download`
- GitHub Actions CI/CD: builds Windows x64 + Mac arm64 + Mac x64 on merge to main

**Web app companion (MLP scope):** Account management, project library, style model summary, subscription management, shared review links. Installable PWA. Offline access to project metadata and style model (not footage). Full timeline editing in browser is Stage 2.

**React Native companion (3–6 months post-MLP):**
- App Store (iOS) + Google Play (Android)
- TestFlight / Android internal testing for beta creators
- GitHub Actions + Fastlane for signing and submission

---

## Design System (Locked)

Full spec: `_designs/design-guidelines.md`
Locked UI screens: `_designs/app-ui/` (4 screens — timeline editor, transcript view, audio room, publish package)

**10-second summary:**
- Background: `#0e0e10` base, `#141416` panels, `#1a1a1e` surfaces
- Single accent: `#6366f1` indigo — no second brand color, ever
- Typography: System fonts (SF Pro / Inter), 12px body, monospace for all values
- AI features: always badge + confirm, never silent auto-apply
- No light mode. No rounded hero panels. No floating action buttons.
- Information density over whitespace. The editor knows where things are.

---

## The 12 Design Laws

These govern every product decision. They don't expire.

1. **Timeline is predictable, not clever.** Every cut you make is exactly where you put it.
2. **Windows ships first in CI/CD priority.** Mac-only is FCP's problem. Vivido fixes that.
3. **Guest mode is the default first session.** No signup wall before the jaw-drop.
4. **Style model always runs.** Even if the creator hasn't seen it yet, it's accumulating.
5. **Export has 3 options, not 47.** YouTube-ready, Archive, and Shorts. That's it at MLP.
6. **Core editing works fully offline.** Cloud is sync and upload — not a requirement to edit.
7. **YouTube is a first-class target authored in the timeline.** Chapters are not a description box hack.
8. **One workspace, context-sensitive panels.** Not tabs-within-tabs-within-panels.
9. **Color speaks creator language.** "Cinematic" means something. "LUT 34B" means nothing.
10. **Every tier's capabilities are visible.** Upsell through visibility, not dark patterns.
11. **Project files are open JSON.** The creator owns their data. Full stop.
12. **Vivido publishes, not just exports.** The job ends when it's on YouTube — not when you click Export.

---

## Innovation & Novel Patterns

### 1. Per-Creator Compounding Editorial Intelligence *(Patent #1)*
No video editor in existence accumulates creator-specific style data across sessions. Every system is stateless per project. Vivido's style model is the first application of per-creator ML personalization to editorial decision-making — not content classification (what's in the video) but editorial style (how a specific human edits).

### 2. YouTube-Native Timeline Primitives *(Patent #2)*
Every existing NLE treats YouTube metadata (Chapters, Cards, End Screens, Shorts cut-points) as export concerns. Vivido treats them as first-class creative objects in the timeline — draggable, previewable, exported as part of the project. A creative decision made at edit time, not post-publish.

### 3. Cross-Project Hook Intelligence *(Patent #3)*
The feedback loop between post-publish analytics and pre-publish editing decisions does not exist in any tool. VidIQ gives you analytics after publishing. FCP gives you a timeline before publishing. Nothing connects them. Vivido's Hook Intelligence maps viewer retention curves back to specific timeline positions — then carries those signals into the next project's editing decisions.

### 4. Dual-Runtime Headless-Capable Compute Layer *(Architecture)*
The native runtime is host-agnostic from day one: today Electron, tomorrow headless cloud render worker, the day after on-device ML inference on Apple Silicon. Removes the ceiling from what Vivido can become without a rewrite.

**Market context:** Auto-cut tools (Descript, Opus Clip) use generic excitement detection — not creator-specific style models. No existing NLE has shipped YouTube metadata as first-class timeline objects in 30+ years of NLE development.

---

## Build Order (Phased)

### Before Writing a Single Line of Electron Code — Validation Prototype

**2–4 weeks. Hard gate.**

Build: transcript editing + creator presets + Publish Package. No GPU timeline. No Audio Room. Show to **5 specific creators — real people, callable tomorrow**. Have them use it on 3 real videos each.

**Gate criteria:**
- ≥ 3 of 5 say "I'd pay for this today" → demand confirmed, proceed to full MLP
- They say it feels unserious without GPU playback → jaw-drop confirmed as necessary, full MLP scope justified
- All 5 have different frustrations → target user less uniform than assumed; narrow before building

Write down the one moment in each session where they looked most frustrated. If all 5 share a similar moment, that moment is the opening 10 minutes of the MLP demo.

**Patent provisionals #1 and #3 must be filed before this prototype is shown to anyone. The prototype is a public disclosure.**

---

### Phase 1: MLP — Months 1–9 (2–3 Engineers)

| Sprint | Deliverable |
|---|---|
| 1–2 | Electron shell + React + Vite hot reload. Project file format (JSON) spec published. Validation prototype shown to 5 creators — go/no-go before sprint 3. |
| 3–4 | FFmpeg native subprocess integration. VideoToolbox (Mac) + NVDEC (Windows) GPU decode. 4K playback working. Hardware decode validated on minimum spec. |
| 5–6 | Whisper.cpp background transcription on import. Transcript view (word-level, real-time sync to timeline). Filler word detection. Confidence scoring. |
| 7–8 | Timeline: cuts, trims, splits, multi-track (2 video + 2 audio + caption track). Clip drag, snap guides, playhead. Keyboard shortcuts. |
| 9–10 | YouTube-native primitives: Chapter markers, Shorts markers, End Screen zones as first-class timeline objects. Shorts crop preview + horizontal source warning. |
| 11–12 | Audio Room: AI noise removal, parametric EQ, compression, per-platform LUFS normalization. Stereo metering. Platform pass/warn/fail readouts. |
| 13–14 | Publish Package: main MP4 + Shorts 9:16 crops + 3 thumbnail candidates + `chapters.txt` + `captions_en.srt`. One-click export. |
| 15–16 | Guest mode. Supabase Auth + Cloudflare R2. Style model passive init (JSON accumulator, projects 1–4). Frictionless account creation at "save style" moment only. |
| 17–18 | Windows + Mac simultaneous signed/notarized builds. GitHub Actions CI/CD. `electron-updater` delta patching. EU AI Act disclosure + AI Trust Settings. FFmpeg GPL CI gate. Descript FTO review complete. |

**MLP gate before public launch:** A creator completes a project start-to-finish in Vivido with zero tool switches, in < 40% of their previous workflow time.

---

### Phase 2: Growth — Months 10–18

- **Recording** — Screen capture (ScreenCaptureKit/Windows.Graphics.Capture), webcam solo + PiP, multi-track local recording. Scene Composer presets. Kills Riverside and Loom.
- **AI Rough Cut** — Unlocks at project 5. Pre-stages rough cut in creator's editorial voice using style model. Word-of-mouth trigger.
- **Hook Intelligence** — YouTube Analytics API retention curves mapped to timeline positions. VidIQ inside the editor.
- **LUT Color Room** — Creator-vocabulary grading. "Make this cinematic." Channel visual identity matching. ACES/Log ingestion.
- **Advanced Audio Room** — Multitrack EQ, compression, music/VO balance presets by content type.
- **B-roll suggestion** — Claude API generates B-roll placement suggestions from transcript context.
- **React Native companion app** — Project sync, remote clip review, Shorts preview, push to YouTube from phone. No mobile encoding.

**Phase 2 gate:** 1,000 active weekly creators, $50K ARR, style model data from ≥ 5,000 completed projects.

---

### Phase 3: Platform — Months 18–36

- **Team Collaboration** — Async role-based editing, client review + approval, agency workspace. Kills Frame.io for creator market.
- **Full Color Grading Room** — DaVinci-grade color science, ACES pipeline, node-based grading (advanced mode).
- **Cloud Render Queue** — AWS MediaConvert, headless native runtime, background export for film-length content.
- **Plugin API** — Third-party integrations, community tools. Vivido as a platform others build on.
- **Film & Documentary Mode** — 90-min+ timeline, multi-reel, DCP/ProRes 4444/ARRIRAW ingest.
- **Patent Licensing** — Style model IP (Patents #1 + #3) licensed to other video software by 2034.

---

## Success Criteria

### Validation Prototype Gate
- 5 specific creators use it on 3 real videos each within 30 days
- ≥ 3 of 5 say "I'd pay for this today"

### MLP Gate (Before Public Launch)
- Creator completes project start-to-finish with zero tool switches
- Time from import to Publish Package < 40% of previous workflow time
- Guest-to-account conversion at "save style moment" ≥ 40%
- 4K footage plays without buffering on minimum spec hardware
- Whisper transcription: < 10% of audio duration on minimum spec
- Style model passive init confirmed working across 10 beta projects

### 3 Months Post-MLP
- 1,000 active weekly creators completing ≥ 1 project/week
- ≥ 30% of installs convert to Creator tier within 60 days
- NPS ≥ 60 — creators actively recommending Vivido
- $50K ARR (Creator + Lifetime tiers)
- Style model surfaces ≥ 3 accurate observations by project 5 (creator confirms correct)

### 12 Months Post-MLP
- 10,000 active weekly creators
- $500K ARR (Creator + Studio tiers)
- ≥ 500 Lifetime ($599) conversions in launch window
- ≥ 20% of new users self-report coming from CapCut or no current editor
- Patents #1 + #3 provisionals filed

### The Moat Metric
**Zero creators who have completed 20+ projects in Vivido have churned.**
This is the only metric that proves the style model is working.

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| EU AI Act non-compliance at launch | AI Trust Settings + disclosure UI are MLP blockers — sprint 17–18 |
| CapCut window closes before MLP ships | Hard deadline: 9 months. Scope cut from MLP before deadline slips. |
| Descript transcript-editing patent conflict | FTO review before MLP launch (sprint 17–18). Implementation differentiation documented. Legal blocker. |
| Native GPU pipeline underperforms on min spec | Test on minimum spec hardware from sprint 3. Degrade to 1080p preview if 4K stutters — no software 4K fallback. |
| Style model cold start — insufficient data at project 5 | Instrument from day 1 in beta. If < 3 accurate observations by project 5, re-evaluate model before launch. |
| Whisper accuracy on accented speech | Ship with confidence indicator. Allow manual correction. Never block export on low confidence. |
| YouTube API quota exhaustion | Per-creator quota tracking, graceful degradation, 30-day cache, daily budget allocation. |
| FFmpeg GPL contamination | CI/CD build flag gate blocks release on detection. |
| Style model data loss pre-auth | Local backup to OS app data dir. Cloud sync prompt after project 1 completion. |
| Recording consent legal exposure (Stage 2) | Jurisdiction detection + non-dismissible consent notice. Legal review before Stage 2 ships. |
| Stripe India RBI friction | Razorpay as India primary. Both paths tested before launch. |
| Open-source style model replication (2–3 years) | Patents #1 + #3 filed before replication is possible. Data asset compounds ahead of any replicator. |

---

## Open Questions (Blocking Specific Work)

| # | Question | Blocking | Owner | Urgency |
|---|---|---|---|---|
| 1 | Who are the 5 specific creators for the validation prototype? Real people, callable now. | Validation gate (before sprint 3) | Anand | This week |
| 2 | Patent provisionals #1 + #3 — attorney and filing date confirmed? | Any public demo or prototype showing | Anand + Legal | Before prototype |
| 3 | Descript FTO review — attorney engaged? | MLP launch (sprint 17–18) | Anand + Legal | Sprint 1 |
| 4 | RN monorepo: Nx vs Turborepo for sharing component library between Electron renderer + RN? | React Native companion app start | Eng | Before post-MLP |
| 5 | Mobile compute routing: when RN companion requests a render, does it route to the desktop (if online) or AWS MediaConvert (cloud)? | Companion app ADR | Eng | Before post-MLP |
| 6 | Whisper model default: Large v3 (1.5GB, better accuracy) vs Medium (500MB, faster)? | Sprint 5–6 | Eng | Sprint 5 |

---

## What the Office Hours Review Observed

These four points from the gstack review are the "why" behind the conviction. Read them when momentum is low.

> *"You said 'FCP is too complex and I only use its basic features' about a tool you're a trained professional in. That's not a complaint about the software. That's a design brief. The gap between what you're capable of and what the tool lets you do efficiently — that gap is Vivido."*

> *"When I challenged mobile scope, you didn't abandon it — you said 'I want to explore React Native from day one.' That's conviction, not stubbornness. You kept the principle but accepted a pragmatic path. Founders who do that usually ship."*

> *"You've been living in a broken workflow for years and you have the domain expertise to know exactly what the right version looks like. Most founders have one of those two things. You have both."*

> *"The rawvision line: 'I will make World's Best Video Editing Software Ever... This will not be a software, it would be a creators movement.' That's the kind of ambition that either fails completely or wins completely. There's not really a middleground version of Vivido."*

---

## Next Action

**Name the 5 creators for the validation prototype. Call them this week. Not to pitch — to watch.**

Ask them to screen-share their last video edit session. Watch where they switch tools, where they stop, where they redo work. One hour each. Five hours total.

Write down the one moment in each session where they looked most frustrated. That moment is the opening 10 minutes of the MLP demo.

*Everything else in this document follows from that call list.*
