# Vivido — Product Requirements Document
**Version:** 1.0
**Status:** Approved — build from this
**Date:** 2026-04-27
**Approach:** B — Desktop MLP (Windows + Mac) → React Native companion 3–6 months post-MLP
**Design system:** `_designs/design-guidelines.md` (locked)
**Strategic foundation:** gstack office hours review (2026-04-27) + BMAD PRD v1

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
Multiple creators said unprompted: "FCP is too complex and it's Mac-only." The exact same complaint. That's a design brief, not just feedback. The wedge is: **pro-enough editing for ambitious creators who want FCP-grade outcomes without FCP-grade complexity or Apple lock-in.**

**The moat is not features. It's accumulated editorial taste.**
A style model that knows how YOU cut is the only defensible advantage that compounds over time. No competitor — FCP, Premiere, DaVinci, Descript — accumulates creator-specific intelligence across sessions. Vivido's moat activates at project 5, approaches zero churn at project 20+.

---

## What We're Building — The 4 MLP Features

The MLP is the smallest version of Vivido where a creator finishes one real project and says *"I didn't know editing software could feel like this."*

**All 4 features are required. None alone is sufficient.**

Skipping GPU playback makes Vivido a Descript competitor — a worse position, not a safer one.

### 1. Native GPU Decode + 4K Instant Playback
VideoToolbox (Mac) + NVDEC (Windows). No WASM fallback for the preview canvas. Hardware-accelerated from frame one. 4K footage scrubs with zero buffering on minimum spec (any GPU with hardware decode).

**The jaw-drop moment.** This is what separates Vivido from web-based tools. If playback ever spins, it's an engineering bug, never a UX workaround.

### 2. YouTube-Native Timeline
Chapters, Shorts markers, and End Screen zones are **draggable first-class timeline objects** — not export-time settings, not a description box add-on. They live on the timeline. You can see them.

Export generates:
- `chapters.txt` (ready to paste into YouTube description)
- Standalone Shorts clips (pre-cropped to 9:16, with horizontal source warning + preview before export)
- End Screen zone timestamps

### 3. Whisper Transcript Editing
Background transcription begins immediately on footage import. No button press. By the time the creator finishes dragging their clips, the transcript is ready.

Edit by word: clicking a word in the transcript view scrubs to that position. Deleting words in the transcript cuts those sections from the timeline in sync. Captions are styled timeline objects — not a separate subtitle track afterthought.

Whisper Large v3 local inference. Confidence score visible. Filler word detection and one-click removal.

### 4. Audio Room + Publish Package
**Audio Room:** AI background noise removal (one click), parametric EQ, compression, platform-matched LUFS normalization (YouTube −14, Shorts −13, Podcast −16, Broadcast −23). Stereo metering with platform pass/warn/fail indicators. All effects are visible and reversible — no silent AI processing.

**Publish Package:** One-click export generates a complete folder:
- `main_video_4k.mp4`
- `short_01.mp4`, `short_02.mp4`, ... (all Shorts clips, 9:16 cropped)
- `thumbnail_01.jpg`, `thumbnail_02.jpg`, `thumbnail_03.jpg` (candidates)
- `chapters.txt`
- `captions_en.srt`

No further tool switching required. The creator goes from Vivido directly to YouTube Studio upload.

---

## Also Ships With MLP (Infrastructure, Not Features)

These are not user-facing features but must be working at launch day:

- **Guest mode** — no account required to open, import, edit, and export. Zero signup friction.
- **Style model passive init** — silent JSON accumulator from project 1. No UI at this stage. Data accumulates for projects 1–4.
- **Frictionless account creation** — the ONLY moment account creation is surfaced is when Vivido shows: *"Project 1 complete. Your style is starting to take shape — save it so Vivido remembers you."* Convert at value, not at first launch.
- **Open project file format** — `.vivido` files are documented JSON. Any creator can read their own project in a text editor. Published as a public spec at launch.
- **Auto-save** — every 30 seconds minimum. No "unsaved changes" data loss ever.
- **30-day version history** — accessible from the UI, not hidden. Per architecture decision.
- **Supabase Auth + Cloudflare R2** — style model metadata sync on account creation. Video files never leave the creator's machine unless they explicitly initiate upload.

---

## What MLP Explicitly Does NOT Include

These are Stage 2. Do not scope-creep them in.

| Feature | Why Deferred |
|---|---|
| Screen/webcam recording | Adds OS capture complexity; MLP is editing-first |
| AI rough cut | Needs project 5+ data from style model — can't ship at launch |
| Hook Intelligence (YouTube Analytics loop) | Requires API quota + return signal; needs post-launch data |
| Color grading room | High complexity; LUTs in Stage 2 |
| Team collaboration / client review | Stage 3 — not the primary user |
| Cloud render queue (AWS MediaConvert) | Local render is sufficient for MLP duration |
| React Native mobile companion | 3–6 months post-MLP (Approach B) |
| Advanced multitrack EQ | Audio Room covers the MLP need; pro tools are Stage 2 |

**The rule:** if a creator needs it to finish their first YouTube video, it's MLP. If it's nice-to-have, it's Stage 2.

---

## Target Users

### Primary: The Founder Himself
Trained filmmaker + solo YouTube creator living the Riverside → FCP → VidIQ → YouTube Studio loop daily. The first validator is the person who built it. Build so he can replace his own stack completely.

### Primary: Maya (The CapCut Refugee)
28, Windows laptop, 45K subscribers, tech explainer channel. Monthly tool switching costs: Premiere trial (expiring), Submagic ($30), Canva ($15), YouTube Studio (free but slow). Vivido's value prop for Maya is clear in 40 minutes: the first project is faster than her current worst-case session.

### Secondary: The "FCP for Windows" Creator
Ambitious creator, wants FCP-grade output. Not on Mac. Intimidated by DaVinci Resolve's learning cliff. Priced out of Premiere's $55/mo. Vivido is the obvious answer — they just don't know it exists yet.

### Not Building For (MLP)
Educators, Loom-replacement enterprise buyers, casual TikTok creators (short-form only), B2B brand teams (Stage 3).

---

## Pricing

| Tier | Price | Access |
|---|---|---|
| Free | Free forever | Up to 3 projects, no style model save, no Publish Package |
| Creator | $199/yr | Unlimited projects, full style model, Publish Package, priority support |
| Lifetime | $599 one-time | Full Creator tier, all future updates, early access to Stage 2 features |
| Studio | $499/yr | Creator + team workspaces, multi-channel ops, brand kits (Stage 3) |

**Launch window special:** Lifetime at $599 is the call-to-action for early believers. Offer ends at 500 conversions or 90 days post-launch.

**Positioning:** Above free (CapCut tier), below Premiere ($660/yr). The $199 Creator tier replaces $1,500–2,000/yr in current tool spend.

---

## Platform

**Windows + Mac ship simultaneously at MLP.** FCP's Mac exclusivity is the exact complaint that drives the wedge. Both platforms at launch, day one.

- **Windows:** Electron + x64 build
- **Mac:** Electron + arm64 (Apple Silicon) + x64 (Intel) universal build
- **Linux:** Not at MLP — revisit at 10K users

**React Native companion app (3–6 months post-MLP):**
- Project sync via Supabase (already in architecture)
- Remote clip review: watch the edit on phone, add frame-accurate comments
- Shorts preview: see the 9:16 crop before approving for upload
- Push to YouTube from phone (OAuth already planned)
- **No local video encoding on mobile** — all heavy compute stays on desktop or routes to AWS MediaConvert

---

## Tech Stack (Locked — Requires ADR to Change)

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React + Vite | Web-first, fast HMR, shared with web app |
| Desktop | Electron | Wraps web app, native file access, cross-platform |
| Video Engine | FFmpeg native (Electron) + FFmpeg WASM (browser preview) | Industry standard |
| AI Transcription | Whisper.cpp (local, GGML models) | Local inference = no API cost, works offline |
| AI Features | Anthropic Claude API (claude-sonnet-4-6) | Script analysis, chapter generation, metadata |
| Style Model | JSON accumulator → SQLite local → Supabase sync | Passive, grows with usage |
| Storage | Supabase (metadata + auth) + Cloudflare R2 (rendered outputs) | Video files never in Supabase |
| Payments | Stripe + Razorpay (India fallback) | Global + India creator base |
| Deploy | Vercel (web app) + GitHub Actions (Electron builds) | Fast CI/CD |

**ADR-001-C (Dual-Runtime, Explicit Compute Boundary) is locked.** Browser runtime owns UI + lightweight ops. Native runtime owns FFmpeg, Whisper, style model, file I/O, GPU ops. IPC between runtimes is typed and documented. Do not blur this boundary.

---

## Design System (Locked)

Full spec in `_designs/design-guidelines.md`.

**10-second version:**
- Background: `#0e0e10` base, `#141416` panels, `#1a1a1e` surfaces
- Accent: `#6366f1` indigo — single brand color, no exceptions
- Typography: System fonts (SF Pro / Inter), 12px body, monospace for values
- AI features: always badge + confirm, never silent
- No light mode. No rounded hero cards. No floating action buttons.
- Density over whitespace. The editor knows where things are.

**The 4 locked app screens live at:** `_designs/app-ui/`
- `01-timeline-editor.html` — FCP-style multi-panel editor
- `02-transcript-view.html` — Word-level transcript with AI suggestions
- `03-audio-room.html` — EQ + effects chain + LUFS platform metering
- `04-publish-package.html` — Metadata editor + render queue + YouTube upload

---

## Architecture: Dual-Runtime (ADR-001-C)

```
┌─────────────────────────────────────────────────────┐
│  BROWSER RUNTIME (React + Vite)                      │
│  ┌─────────────┐ ┌──────────────┐ ┌───────────────┐ │
│  │ Timeline UI │ │ Transcript   │ │ Audio Room UI │ │
│  │ Inspector   │ │ AI Panel     │ │ Publish UI    │ │
│  └─────────────┘ └──────────────┘ └───────────────┘ │
│  ↑ IPC (typed contracts, documented)                 │
├─────────────────────────────────────────────────────┤
│  NATIVE RUNTIME (Electron main + Node.js)            │
│  ┌────────────┐ ┌───────────┐ ┌────────────────┐    │
│  │ FFmpeg     │ │ Whisper   │ │ Style Model    │    │
│  │ (native)   │ │ (.cpp)    │ │ (SQLite + sync)│    │
│  └────────────┘ └───────────┘ └────────────────┘    │
│  ┌──────────────────┐ ┌──────────────────────────┐  │
│  │ GPU Decode       │ │ File I/O + Project Files  │  │
│  │ VideoToolbox/    │ │ (.vivido JSON format)     │  │
│  │ NVDEC            │ └──────────────────────────┘  │
│  └──────────────────┘                               │
└─────────────────────────────────────────────────────┘
         ↓ Cloudflare R2 (rendered outputs only)
         ↓ Supabase (auth + style model metadata)
```

**The headless capability is built-in from day one.** The native runtime that runs in Electron today will run in a cloud render queue in Stage 2 without an architectural rewrite. This is not accidental — it's why ADR-001-C exists.

---

## The Style Model (The Moat)

The style model is what makes Vivido defensible. Everything else can be copied. This cannot.

**How it works:**

| Projects | State | What it does |
|---|---|---|
| 1–4 | Passive initialization | Silent JSON accumulator. Observes: cut frequency, average clip duration, caption density, audio treatment choices, B-roll patterns, Shorts cadence. No UI. |
| 5–9 | First surface | Shows the creator 3 observations about their editing style. "You average 12 cuts per minute — faster than 80% of creators in your category." Requires creator confirmation. No auto-suggestions yet. |
| 10–19 | Active assistance | Pre-stages rough cut suggestions, auto-marks chapter boundaries, flags likely Shorts sections — all in the creator's voice, derived from their own patterns. |
| 20+ | Deep personalization | The style model knows this channel better than any editor you could hire. Hook structure, pacing, energy curves, audio fingerprint. Churn approaches zero. |

**Patent protection:** Patent #1 (Per-Creator Style Model) and Patent #3 (Cross-Project Hook Intelligence via YouTube Analytics feedback loop) are filed before any public demo or beta. The prototype IS a public disclosure.

**GDPR compliance:** Style model data is personal data. Explicit consent at collection. Right to erasure (style model wipe without account deletion). Data portability (export style model as JSON). Processing transparency (creator can always see what the style model has observed).

---

## User Journeys

### Journey 1: Maya — First Project (The Core Loop)

Maya, CapCut refugee, Windows, 45K subs.

1. Downloads Vivido. No account required.
2. Drags footage. Plays immediately — 4K, no spinner.
3. Transcript appears. She deletes filler words. Timeline updates.
4. Drags a Chapter marker. Marks 2 Shorts segments on the timeline.
5. Clicks "Remove Background Noise." HVAC hum gone.
6. Clicks "Publish Package." 40 seconds. A folder: `main.mp4` + 2 Shorts + 3 thumbnails + `chapters.txt`.
7. Uploads to YouTube from the folder. Zero tool switches.
8. Vivido shows: *"Project 1 complete. Save your style so Vivido remembers you."* She creates an account.

**Time: 1:20 vs previous 3:45. Zero external tools. One account created.**

### Journey 2: Arjun — The Aspiring Filmmaker

Arjun, 26, 6 hours of documentary footage. Opened FCP once — closed it at the sequence dialog.

1. Downloads Vivido. Drags a 12-min interview clip. It plays.
2. Uses transcript view as primary editing interface — highlights quotes, deletes gaps. Never touches the timeline until he's built the story from words.
3. Switches to timeline for the first time. Vivido shows engagement nudges, not technical settings.
4. At project 3: submits his documentary to a short film festival via "Archive Export" (ProRes 422).

**Vivido is the first editor where Arjun felt like an editor, not a software operator.**

### Journey 3: Creator Friction (Honest Path)

Jess, 22, 180K subs, mobile-native, switching to desktop for long-form.

- Learning curve: 3 projects before it feels fast (not zero — honest)
- First friction: dragging audio to timeline vs one-tap mobile
- First win: 4 Shorts auto-cropped to 9:16 with captions, published same day as long-form — never possible before

**The Shorts-from-long-form workflow is the unlock. It's better than any mobile tool. She stays.**

---

## Non-Functional Requirements

### Performance
- **First playback from import:** < 15 seconds on any supported hardware
- **Whisper transcription:** completes in < 10% of video duration (10-min video = < 60 sec)
- **Timeline scrub (4K):** no buffering, no spinner — hardware decode required
- **Publish Package export:** < 2× real-time duration (10-min video = < 20 min on min spec)
- **Auto-save:** every 30 seconds, non-blocking, no UI interruption
- **Timeline data model:** validated to handle 90+ minutes, 500+ clips before MLP ships

### Offline
- Core editing (cuts, trims, audio cleanup, captions, local export) works fully offline
- Style model runs locally (SQLite)
- Whisper runs locally (GGML model downloaded on first launch)
- Cloud features (sync, Publish Package upload to YouTube) degrade gracefully — offline means export to folder still works

### Security
- Video footage and project files never leave the creator's machine unless explicitly uploaded
- YouTube OAuth tokens stored encrypted in Supabase — never in localStorage, never in client-side code
- API credentials (YouTube Data API, Claude API) stored server-side in Supabase Edge Functions — never exposed to renderer
- Creator consent required before any support team accesses project metadata (read-only, never raw footage)

### Compliance
- **EU AI Act (August 2026):** AI disclosure badge on all AI-assisted output. AI Trust Settings per-user. No AI auto-apply. C2PA provenance metadata configurable for EU distribution. Must be in place before any EU creator uses Vivido.
- **GDPR:** Style model = personal data. Consent at collection. Right to erasure. Data portability (export as JSON). 30-day version history. R2 renders deleted after 90 days unless opt-in.
- **FFmpeg:** Dynamic linking only. CI/CD gate validates build flags, blocks release on GPL component detection.
- **Recording consent (Stage 2):** Jurisdiction-appropriate consent notice for 13 US all-party consent states. Remote guest receives and acknowledges before capture.
- **Patents #1 + #3:** Provisional filings before any public demo.

### Distribution
**Desktop:**
- GitHub Releases (signed, notarized Electron binaries)
- `electron-updater` (delta updates for patches)
- Download page at `vivido.app`
- GitHub Actions CI/CD: builds Windows x64 + Mac arm64 + Mac x64 on merge to main

**React Native companion (post-MLP):**
- App Store (iOS) + Google Play (Android)
- TestFlight + Android internal testing for beta creators
- GitHub Actions + Fastlane for signing + submission

---

## Build Order (Phased)

### Before Writing a Single Line of Electron Code

**Validation prototype: 2–4 weeks.**
Transcript editing + creator presets + Publish Package. No GPU timeline. No Audio Room. Show to 5 specific creators — real people you can call tomorrow. Have them use it on 3 real videos each.

**Gate:** If 3 of 5 say "I'd pay for this today" → confirm demand, proceed to full MLP. If they say it feels unserious without GPU playback → confirm the jaw-drop matters, full MLP scope is justified.

---

### Phase 1: MLP (months 1–9)

| Sprint | Deliverable |
|---|---|
| 1–2 | Electron shell + React + Vite hot reload working. Project file format (JSON) spec published. |
| 3–4 | FFmpeg native subprocess integration. VideoToolbox (Mac) + NVDEC (Windows) GPU decode. 4K playback working. |
| 5–6 | Whisper.cpp background transcription on import. Transcript view (word-level, sync to timeline). |
| 7–8 | Timeline: cuts, trims, splits, multi-track (2 video + 2 audio + caption). Clip drag, snap, playhead. |
| 9–10 | YouTube-native primitives: chapter markers, Shorts markers, End Screen zones as timeline objects. |
| 11–12 | Audio Room: noise removal, EQ, compression, LUFS normalization. Platform metering. |
| 13–14 | Publish Package: main MP4 + Shorts crops + thumbnail candidates + chapters.txt + SRT export. |
| 15–16 | Guest mode. Supabase Auth. Style model passive init (JSON accumulator). Frictionless account creation at value moment. |
| 17–18 | Windows + Mac simultaneous builds. GitHub Actions CI/CD. Signed/notarized. electron-updater delta patching. |
| — | Validation prototype shown to 5 creators in sprint 2. Go/no-go before sprint 3. |

**Team:** 2–3 engineers. Founder as lead product and design.

**Gate to Stage 2:** A creator completes a project start-to-finish in Vivido with zero tool switches, in < 40% of their previous workflow time.

---

### Phase 2: Growth (months 10–18)

- **Recording** (kills Riverside + Loom): Screen capture (ScreenCaptureKit/Windows.Graphics.Capture), webcam solo + PiP, multi-track local recording
- **AI Rough Cut** (unlocks at project 5+): Style model pre-stages rough cut in creator's editorial voice
- **Hook Intelligence**: YouTube Analytics API loop → retention curves mapped to timeline positions
- **LUT Color Room**: Creator-vocabulary grading. "Make this cinematic." Channel visual identity matching.
- **React Native companion app**: Project sync, remote clip review, Shorts preview, push to YouTube from phone
- **Advanced Audio Room**: Multitrack EQ, music/VO balance presets, room tone matching

**Phase 2 gate:** 1,000 active weekly creators. $50K ARR. Style model data from ≥5,000 completed projects.

---

### Phase 3: Platform (months 18–36)

- **Team Collaboration**: Async role-based editing, client review + approval, agency workspace (kills Frame.io)
- **Full Color Grading Room**: DaVinci-grade color science, ACES pipeline, node-based (advanced mode)
- **Cloud Render Queue**: AWS MediaConvert, headless native runtime, background export of film-length content
- **Plugin API**: Third-party integrations, community tools, Vivido as a platform others build on
- **Film & Documentary Mode**: 90-min+ timeline, multi-reel, DCP/ProRes 4444/ARRIRAW ingest

---

## Success Criteria

### Validation Prototype (before MLP development)
- 5 specific creators use it on 3 real videos each within 30 days
- ≥ 3 of 5 say "I'd pay for this today"

### MLP Gate
- Creator completes project start-to-finish with zero tool switches
- Time from import to Publish Package < 40% of previous workflow time
- Guest-to-account conversion at "save style moment" ≥ 40%
- 4K footage plays without buffering on minimum spec hardware

### 3 Months Post-MLP
- 1,000 active weekly creators
- $50K ARR (Creator + Lifetime tiers)
- NPS ≥ 60
- Style model surfaces ≥ 3 accurate observations by project 5 (creator confirms correct)

### 12 Months Post-MLP
- 10,000 active weekly creators
- $500K ARR
- ≥ 500 Lifetime ($599) conversions in launch window
- ≥ 20% of new users self-report coming from CapCut or no current editor

### The Moat Metric
- **Zero creators who have completed 20+ projects in Vivido have churned.** This is the only metric that proves the style model is working.

---

## Open Questions (Resolve Before Building)

| # | Question | Blocking What | Owner |
|---|---|---|---|
| 1 | Who are the 5 specific creators for the validation prototype? Real people, callable tomorrow. | Prototype validation | Anand |
| 2 | React Native monorepo setup: Nx vs Turborepo for sharing component library between Electron renderer + RN? | Companion app start | Eng |
| 3 | Mobile compute: when RN companion requests a render, does it route to the desktop app (if online) or AWS MediaConvert? | Companion app ADR | Eng |
| 4 | Patent provisional filings (#1 Per-Creator Style Model, #3 Hook Intelligence) — attorney and filing date? | Any public demo | Anand + Legal |
| 5 | Whisper model size selection: Large v3 (better accuracy, 1.5GB) vs Medium (faster, 500MB)? | Transcription sprint | Eng |
| 6 | Default Shorts crop behavior on horizontal source clips: auto-crop with preview, or refuse and prompt? | Shorts export UX | Design + Eng |

---

## Design Laws (From BMAD V1 — Still Locked)

These 12 laws govern every product decision. They don't expire.

1. **Timeline is predictable, not clever.** Every cut you make is exactly where you put it.
2. **Windows ships first in CI/CD priority.** Mac-only is FCP's problem. Vivido fixes that.
3. **Guest mode is the default first session.** No signup wall before the jaw-drop.
4. **Style model always runs.** Even if the creator hasn't seen it yet, it's accumulating.
5. **Export has 3 options, not 47.** YouTube-ready, Archive, and Shorts. That's it at MLP.
6. **Core editing works fully offline.** Cloud is sync and upload, not a requirement to edit.
7. **YouTube is a first-class target authored in the timeline.** Chapters are not a description box hack.
8. **One workspace, context-sensitive panels.** Not tabs-within-tabs-within-panels.
9. **Color speaks creator language.** "Cinematic" means something. "LUT 34B" means nothing.
10. **Every tier's capabilities are visible.** Upsell through visibility, not dark patterns.
11. **Project files are open JSON.** The creator owns their data. Full stop.
12. **Vivido publishes, not just exports.** The job ends when it's on YouTube, not when you click Export.

---

## What Anand Noticed (From Office Hours)

> "You said 'FCP is too complex and I only use its basic features' about a tool you're a trained professional in. That's not a complaint about the software. That's a design brief. The gap between what you're capable of and what the tool lets you do efficiently — that gap is Vivido."

> "When I challenged mobile scope, you didn't abandon it — you said 'I want to explore React Native from day one.' That's conviction, not stubbornness. You kept the principle but accepted a pragmatic path."

> "You've been living in a broken workflow for years and you have the domain expertise to know exactly what the right version looks like. Most founders have one of those two things. You have both."

> "The rawvision line: 'I will make World's Best Video Editing Software Ever... This will not be a software, it would be a creators movement.' That's the kind of ambition that either fails completely or wins completely. There's not really a middleground version of Vivido."

---

*Next step: Name the 5 creators for the validation prototype. Call them this week. Watch them edit. Find the moment they look most frustrated. That moment is the opening 10 minutes of the MLP demo.*
