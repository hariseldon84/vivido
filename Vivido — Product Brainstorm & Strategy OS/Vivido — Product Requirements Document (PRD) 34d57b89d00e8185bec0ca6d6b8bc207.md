# Vivido — Product Requirements Document (PRD)

> **Version:** 1.0 — MSP Edition
> 

> **Date:** April 2026
> 

> **Status:** 🟡 In Progress
> 

> **Owner:** Anand Arora
> 

> **Product Philosophy:** Minimal Selling Product — we ship everything a creator needs to switch and stay. No half-baked MVP.
> 

---

## 🧭 North Star

> *"Make video creation as natural as writing a document — but as powerful as a full production studio."*
> 

Vivido ships as a complete creative OS for solo YouTube creators and agency/brand teams. It does not compete on any single feature. It wins by being the only tool that takes a creator from **Raw Idea → Record → Edit → Polish → Repurpose → Publish** in one unbroken, delightful workflow — with AI that actually works, and an interface that respects the creator's time and intelligence.

---

## 🎯 Who We're Building For

### Primary Persona 1 — The Solo YouTube Creator

- Makes 2–4 videos/month, 8–25 minutes long
- Has used iMovie, FCP, or Premiere and found the learning curve brutal
- Currently uses Descript + VEED + CapCut across different steps — hates tool-switching
- Pain: spends more time editing than creating
- Dream: press record, get a great video, publish it, move on
- Willing to pay ₹800–₹2,000/month for a tool that genuinely saves 10+ hours/week

### Primary Persona 2 — The Agency / Brand Team

- 2–10 person content team, 10–30 videos/month across clients
- Needs brand consistency, collaboration, role-based access
- Currently terrified by CapCut's data ownership terms
- Needs multi-project organisation, client brand kits, approval workflows
- Willing to pay $30–$80/month/seat for a tool that protects their client IP

---

## 🏗️ Tech Stack — Recommended

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | React + Electron | Web-first (zero install), Electron wrapper for desktop power |
| Video Engine | FFmpeg (WASM in browser, native in Electron) | Industry standard, free, powerful |
| AI/ML | Anthropic Claude API + Whisper + custom fine-tunes | Transcription, script analysis, smart editing |
| Real-time Collab | Liveblocks or Yjs | Multiplayer editing like Figma |
| Cloud Render | AWS MediaConvert or Cloudflare Stream | Background rendering, no blocking |
| Storage | Supabase + Cloudflare R2 | Cost-effective, scalable |
| Auth | Supabase Auth | Simple, fast |
| Payments | Stripe | Global + India (UPI via Razorpay fallback) |
| Deployment | Vercel (web) + GitHub Actions (Electron builds) | Fast CI/CD |

---

## 📐 Stage Map Overview

| Stage | Name | What Ships | WIs Covered |
| --- | --- | --- | --- |
| **Stage 0** | Foundation | Auth, project OS, brand kit, DB schema, design system | — |
| **Stage 1** | Record | Camera + screen + audio engine, auto-framing, acoustic simulation, mood setting, sprint mode, dark room, voice note tasks, creator prefs | WI-01, 04, 05, 32, 35, 41, 42, 48 |
| **Stage 2** | AI Edit Layer | Smart silence removal, script analyser, best-take compositor, rhythm DNA, thumbnail prediction, pre-flight score, chapter titles, smart captions, AI trust settings, habit interventions | WI-02, 10, 15, 16, 19, 20, 21, 34, 38, 43 |
| **Stage 3** | Repurpose + Publish | Content multiplier (11 pieces), platform adaptation, direct publish + schedule | WI-24, 29, 44 |
| **Stage 4** | MSP Polish | Performance, stability, onboarding, pricing, GTM | — |

> 📎 Full feature specs are in the **Feature Database** linked below. Each stage has its own detailed breakdown page.
> 

---

## 🔒 Non-Negotiables (Must Ship Before Any Public Launch)

1. **Auto-save every 30 seconds** with 30-day visible version history — no creator loses work ever
2. **Export quality controls** — bitrate, codec, resolution — full user control, no compression surprises
3. **Background rendering** — work on next video while last one renders
4. **Content Ownership Pledge** — in-app + in ToS: your content is 100% yours, always
5. **1-click cancel** — no dark patterns, ever
6. **First video in under 5 minutes** — onboarding must prove the product before account creation

---

## 📦 Stage 0 — Foundation

### What This Stage Delivers

The invisible scaffolding everything runs on. No user-facing features yet — but every decision made here determines how fast Stage 1–3 can ship.

### 0.1 Design System

- Typography scale, colour palette, spacing tokens
- Component library: buttons, inputs, modals, tooltips, sliders, timeline primitives
- Dark mode first — Vivido is a creative tool, creators work at night
- Motion language: all animations under 200ms, easing: cubic-bezier(0.16, 1, 0.3, 1)
- Accessibility: WCAG AA minimum across all components

### 0.2 Auth & User Model

- Email + Google OAuth via Supabase
- User profile: name, avatar, timezone, creator type (Solo / Agency)
- Workspace model: one user can belong to multiple workspaces
- Role system: Owner / Editor / Reviewer / Viewer

### 0.3 Project OS

- Projects = top-level containers (one YouTube channel = one project usually)
- Inside a project: Sessions (recordings), Edits (timelines), Assets (media library), Brand Kit
- Projects support folders for series/campaigns
- Shareable project links with permission levels

### 0.4 Brand Kit

- Per-workspace brand kit: logo, primary/secondary colours, fonts, watermark
- Lower third templates (3 default styles)
- Intro/outro clip slots
- Music library (royalty-free default + upload your own)
- Auto-applies to every new edit in that workspace

### 0.5 Database Schema (Core Tables)

```
users → workspaces → projects → sessions → edits → assets
brand_kits → lower_thirds, fonts, colours, music
creator_prefs → zoom_rules, mood_defaults, trust_settings
version_history → edit_id, snapshot, timestamp, label
```

### 0.6 Infrastructure

- Supabase for DB + Auth + Storage metadata
- Cloudflare R2 for raw video/audio storage
- FFmpeg WASM for in-browser processing
- AWS MediaConvert job queue for cloud renders
- Vercel deployment with edge caching

**Exit Criteria for Stage 0:** A user can sign up, create a workspace, set a brand kit, create a project, and see an empty edit canvas. Design system is documented. All infra is running.

---

## 🎥 Stage 1 — Record

### What This Stage Delivers

The recording engine. A creator opens Vivido, picks their mood, hits record, and gets a high-quality capture of their camera, screen, and audio — with Vivido already working in the background on their behalf.

### 1.1 Unified Session Recording

**What it does:** Record camera, screen, and presentation simultaneously in one session. No separate tools. No re-syncing afterward.

**Inputs:**

- Camera (webcam or external via device selector)
- Screen (full, window, or tab)
- Microphone (with device selector + level meter)
- Optional: second camera angle

**Output:** Separate tracks per source, auto-synced, stored as a Session object

**Technical notes:**

- Uses MediaRecorder API in browser; native capture in Electron
- Local-first recording — files write to disk/local buffer before cloud upload
- Audio recorded as WAV (uncompressed) by default
- Video recorded at source resolution, up to 4K

**UI:** Clean pre-record screen — device selectors, level check, countdown. No clutter.

---

### 1.2 WI-01 — Energy Detection While Recording

**What if my camera knew when I was in the zone vs rambling?**

**Feature name:** Vivido Signal

**How it works:**

- Real-time audio analysis: speech pace, volume variation, filler word frequency, sentence completion rate
- Visual indicator: a subtle coloured ring around the recording frame
    - 🟢 Green pulse = high energy, clear delivery
    - 🟡 Amber = moderate, watch pacing
    - 🔴 Red slow pulse = losing energy, consider pausing/retaking
- Creator can toggle the indicator on/off
- Post-recording: timeline is colour-coded by energy zone, so you know exactly where the gold is

**Technical:** Web Audio API + lightweight ML model running locally (no cloud latency)

**Success metric:** Creators report 30%+ reduction in wasted takes within first 2 weeks

---

### 1.3 WI-04 — Acoustic Environment Simulation

**What if I could record in my noisy apartment and sound like a podcast studio?**

**Feature name:** Vivido Sound Rooms

**Presets:**

- 🏠 Home Studio — removes background hiss, slight warmth, gentle room tone
- 🎙️ Broadcast Booth — full noise floor reduction, tight and punchy
- 🌿 Outdoor Clear — wind reduction, openness preserved
- 🎵 Podcast Warm — adds low-end warmth, presence boost, intimate feel
- Custom — manual EQ + compression with visual waveform display

**How it works:** Applied in real-time during recording AND as a post-processing step. Two-pass: noise profile detection → adaptive filter → harmonic enhancement.

**UI:** Before recording, pick a Sound Room. Live preview on mic input. One-click apply.

---

### 1.4 WI-05 — Virtual Cameraperson (Auto-framing)

**What if Vivido kept me perfectly framed even when I move around?**

**Feature name:** Vivido Frame

**How it works:**

- Face + body detection runs locally via MediaPipe or similar
- Applies a virtual crop/pan within the recorded frame — source video is always full resolution
- Three framing modes:
    - **Locked** — stays with your face, tight crop
    - **Follow** — tracks movement, wider crop, repositions smoothly
    - **Director** — auto-selects between tight and wide based on gesture/movement intensity
- Works from any fixed webcam; the software is the cameraman

**Correction in edit:** Any auto-framing decision can be overridden per-clip in the timeline

**Technical:** MediaPipe FaceMesh + Pose landmarks, runs at 30fps in browser WASM

---

### 1.5 WI-35 — Creative Mood Setting

**What if I could tell Vivido what kind of video this is before I start?**

**Feature name:** Session Mood

**Moods:**

- ⚡ Energetic — fast pacing, punchy cuts, dynamic music
- 💭 Reflective — slower pace, longer pauses preserved, ambient music
- 📚 Educational — structured, chapter-friendly, clean captions
- 😄 Entertaining — jump cuts encouraged, sound effects available, vibrant captions
- 🔥 Promotional — brand kit prominent, CTA-ready, polished grade

**What changes per mood:**

- AI Edit Assistant defaults (silence threshold, cut aggressiveness)
- Default music genre suggestion in library
- Caption animation style
- Colour grade warmth bias
- Recommended Creator Style Template

**UI:** 5 mood cards on session start screen. Pick one, start recording. Can be changed in edit.

---

### 1.6 WI-32 — Voice Note Edit Tasks at Timestamps

**What if I could leave myself a voice note mid-edit and execute it tomorrow?**

**Feature name:** Vivido Notes

**How it works:**

- During recording or editing: press N (or tap mic icon) to drop a voice note at current timestamp
- Speak your note: "add zoom here", "cut this section", "find B-roll of a city street here"
- Notes appear as orange markers on the timeline
- AI transcribes the note and converts it to a typed task card
- Tomorrow: open project, see your task queue. One-click to execute AI-assisted suggestions.

**UI:** Tiny orange flag on timeline. Click = shows transcribed note + action buttons (Execute / Dismiss / Edit)

---

### 1.7 WI-41 — Save Creative Decisions as Permanent Rules

**What if every manual decision I make becomes a reusable rule?**

**Feature name:** Creator Preferences (Creator Prefs)

**How it works:**

- After any manual edit decision, Vivido offers: *"Save this as a default for [talking head / B-roll / intro] clips?"*
- Examples of saveable rules:
    - Talking head zoom level and timing
    - Default gap between cuts
    - Auto-lowercase caption style preference
    - Preferred lower third position
    - Default music fade-in/out duration
- Stored in Creator Prefs profile, applied automatically to new edits
- Can be reviewed and edited in Settings → My Editing Style

---

### 1.8 WI-42 — 45-Minute Creative Sprint Mode

**What if a timer forced me to finish and done beat perfect?**

**Feature name:** Sprint Mode

**How it works:**

- Toggle: top bar "Sprint" button
- Timer appears (45 min default, adjustable to 25/60 min)
- Interface streamlines: hides advanced panels, shows only Cut / Caption / Export
- All Creator Prefs auto-applied — no configuration decisions
- No A/B preview mode, no comparison tools
- At timer end: "Your video is ready. Publish or save draft?"
- Gentle alarm at 5 min remaining

**Psychology:** Parkinson's Law applied to content creation. Constraint = output.

---

### 1.9 WI-48 — Dark Room Focus Mode

**What if Vivido got completely out of my way?**

**Feature name:** Dark Room

**How it works:**

- Keyboard shortcut: Cmd+Shift+D
- Interface collapses to: footage + waveform + transcript
- All panels, toolbars, menus hidden
- Keyboard-only editing (J/K/L playback, I/O in/out points, D to delete, M to mark)
- No notifications, no AI suggestions, no popups
- Exit: Escape or Cmd+Shift+D again

**Design note:** The interface doesn't just hide — it transitions gracefully with a 300ms fade. When you exit, everything fades back in exactly where you left it.

**Exit Criteria for Stage 1:** A creator can record a full session (camera + screen + audio), get energy-coded timeline, apply a Sound Room, see auto-framing, pick a mood, leave voice note tasks, and enter sprint or dark room mode. All tracks saved locally + cloud.

---

## ✂️ Stage 2 — AI Edit Layer

### What This Stage Delivers

The intelligence that separates Vivido from every other editor. Ten AI features that feel like having a brilliant co-editor who never gets tired, never misses a mistake, and never judges you for your 47 "ums."

### 2.1 WI-10 — Smart Silence Removal

**What if silence removal knew the difference between a dramatic pause and dead air?**

**Feature name:** Vivido Pause Intelligence

**How it works:**

- Two-pass analysis:
    1. **Acoustic pass** — detect all silences by audio level threshold
    2. **Context pass** — NLP on surrounding transcript to classify each silence:
        - *Dead air* = mid-sentence stumble, breath gap, lost thought → **Remove**
        - *Dramatic pause* = follows an emotionally-loaded statement or punchline → **Keep**
        - *Transition pause* = between topic changes → **Shorten to 0.5s**
- Visual: timeline shows each silence coded by type. Creator can override any individual decision.
- Slider: "Aggressiveness" — 1 (keep all) to 10 (remove all) with Pause Intelligence active at any setting

**Technical:** Whisper transcription → sentiment analysis per sentence → pause classification model

---

### 2.2 WI-02 — Best-Take Sentence Compositor

**What if I recorded 5 takes and Vivido built the perfect composite?**

**Feature name:** Take Composer

**How it works:**

- Record a segment up to 5 times (Vivido tracks "takes" within a session)
- After recording: open Take Composer
- Vivido transcribes all 5 takes, aligns them at the sentence level
- Scores each sentence across takes: delivery confidence, clarity, pace, filler-word count, energy
- Assembles a composite "best take" — sentence by sentence
- Shows you the composite with provenance: "Sentence 1 from Take 3, Sentence 2 from Take 1..."
- Creator can swap any sentence to a different take version
- Output: a single seamless clip with invisible joins

**Technical:** Whisper alignment + audio crossfade at join points + energy scoring model

**This is Vivido's showstopper demo feature.** No other tool does this.

---

### 2.3 WI-15 — Editing Rhythm DNA from YouTube URL

**What if I could borrow the editing style of any YouTube video?**

**Feature name:** Style DNA

**How it works:**

- Paste a YouTube URL in the Style DNA panel
- Vivido analyses the video (server-side):
    - Average cut duration per scene type
    - Silence ratio
    - Zoom frequency and magnitude
    - Music timing relative to cuts
    - Caption style and timing
    - Energy arc across the video
- Outputs a **Style DNA card** with these parameters
- "Apply to my edit" — Vivido restructures cut timing and pacing to match
- Preset Style DNA cards for common creator archetypes:
    - ⚡ High-Energy (MrBeast-style) — cuts every 2–3s, frequent zooms
    - 🧘 Calm Authority (Ali Abdaal-style) — longer takes, measured pace
    - 📖 Storyteller — slow build, emotional arc, minimal cuts
    - 🎯 Tutorial Pro — tight, step-by-step, text callouts on every point

---

### 2.4 WI-16 — Script Analyser (Pre-Recording)

**What if Vivido told me which lines would lose viewers before I even pressed record?**

**Feature name:** Script Health Score

**How it works:**

- Paste script into the Script panel before recording
- Vivido analyses using Claude API:
    - **Hook strength** — does the first 30 seconds give a reason to stay?
    - **Sentence length** — flags any sentence over 35 words
    - **Density warnings** — too many facts in one paragraph
    - **Energy arc** — does it build or flatline?
    - **CTA presence** — is there a clear call to action?
    - **Estimated watch time** — based on word count and delivery pace
- Inline highlighting: 🟢 strong / 🟡 watchable / 🔴 risk of drop-off
- AI suggestions for every flagged line: one-click to rewrite
- Teleprompter mode: cleaned-up script flows into the recorder

---

### 2.5 WI-19 — Thumbnail Prediction Mid-Edit

**What if Vivido found your perfect thumbnail frame automatically?**

**Feature name:** Thumbnail Scout

**How it works:**

- Runs automatically when edit is 80% complete
- Scans every frame of the main camera track
- Scores frames on: expression intensity, eye contact, gesture clarity, framing quality
- Surfaces top 5 candidate frames
- For each candidate: generates 3 thumbnail treatments:
    - Bold text overlay (title + contrast background)
    - Minimal (just face + subtle text)
    - Brand kit (uses workspace colours + fonts)
- Shows predicted CTR relative to your channel average (if YouTube connected)
- One-click to export chosen thumbnail at correct resolution per platform

---

### 2.6 WI-20 — Pre-Flight Score Before Upload

**What if Vivido gave you a green-light checklist before every publish?**

**Feature name:** Publish Readiness Dashboard

**Checks run before every publish:**

| Check | What it tests |
| --- | --- |
| 🎙️ Audio Quality | Noise floor, clipping, mono vs stereo |
| 🎬 Hook Strength | First 30 seconds — does it earn continued watching? |
| 📊 Retention Prediction | AI estimate of audience drop-off curve |
| 💬 Caption Coverage | Are all spoken words captioned? Any sync errors? |
| 🖼️ Thumbnail | Is one selected? CTR estimate vs channel average |
| 📐 Format Check | Correct aspect ratio, resolution, bitrate for selected platform |
| ⏱️ Optimal Upload Time | Best time to publish for your audience (if analytics connected) |
| ©️ Music Clearance | Are all music tracks royalty-free or licensed? |

**UI:** A dashboard with green/amber/red indicators per check. Can't publish until all reds are resolved or manually overridden with a reason.

---

### 2.7 WI-21 — Emotionally Compelling Chapter Titles

**What if your chapter timestamps made people click deeper into the video?**

**Feature name:** Smart Chapters

**How it works:**

- After transcript is generated, AI detects natural topic shifts
- Generates chapter titles using emotional/narrative framing:
    - ❌ Bad: "Introduction", "Main Point 1", "Conclusion"
    - ✅ Good: "The day everything changed", "Why everyone else got this wrong", "The fix that took 3 minutes"
- Creator can edit any chapter title
- Auto-formats YouTube description with timestamps
- Exports as: YouTube description text / SRT chapter file / Notion doc

---

### 2.8 WI-34 — Gentle AI Edit Interventions

**What if Vivido nudged you like a brilliant co-editor sitting next to you?**

**Feature name:** AI Edit Assistant

**How it works:**

- A non-intrusive sidebar that surfaces observations during editing:
    - *"You've said 'um' 23 times. Your best video had 4. Clean them up?"*
    - *"Your intro is 3 min 12s. Your top 3 videos had intros under 90s."*
    - *"No B-roll in 6 minutes. Viewers typically drop at 4 min of talking head."*
    - *"The audio in clip 3 doesn't match clip 4's Sound Room. Fix?"*
    - *"This section has 6 consecutive jump cuts. Consider a transition or B-roll."*
- Each observation has: Ignore / Fix Automatically / Show Me options
- Never blocks the workflow — always optional
- Learns from which suggestions you accept and stop showing ones you consistently ignore

---

### 2.9 WI-38 — Subtitles That Style Themselves

**What if your captions communicated as much as your voice?**

**Feature name:** Smart Captions

**Styling rules applied by AI:**

| Content type | Caption style |
| --- | --- |
| Punchline / joke | Larger font, bold, slight bounce animation |
| Key term / concept | Highlighted background colour (brand accent) |
| Disclaimer / caveat | Smaller, lighter, italic |
| Emphasis word | Uppercase, colour accent |
| Question | Italic, slightly smaller, question mark animated |
| Number / statistic | Bold, larger, brief scale-up animation |

**Creator controls:**

- Master caption style (font, size, position)
- Per-rule on/off toggles
- Preview mode — see all captions rendered before exporting
- Export as: burned-in / SRT / VTT / ASS (for animated)

---

### 2.10 WI-43 — AI Trust Level Settings

**What if you could control exactly how much AI did automatically vs asked first?**

**Feature name:** AI Trust Settings

**Per-task trust levels:**

| Task | Trust Options |
| --- | --- |
| Remove silences | Full Auto / AI Suggests I Review / Always Ask |
| Filler word removal | Full Auto / AI Suggests I Review / Always Ask |
| Select best take | AI Picks / AI Suggests I Confirm / Always Manual |
| Apply Sound Room | Auto from Mood / Always Ask / Never Auto |
| Caption styling | Full Auto / Preview First / Always Manual |
| Colour grade | Auto from Mood / Suggest Only / Never Auto |
| Chapter titles | AI Drafts I Edit / Suggest Only / Manual |

**UI:** Clean settings panel. Toggle per task. Trust level persists per workspace.

**This is the feature that makes Vivido's AI feel respectful instead of pushy.**

**Exit Criteria for Stage 2:** All 10 AI features are functional and tested with 20+ real creator sessions. AI Edit Assistant surfaces at least 3 accurate interventions per edit session. Take Composer produces seamless composites. Style DNA applies pacing correctly.

---

## 🔁 Stage 3 — Repurpose + Publish Engine

### What This Stage Delivers

The feature set that closes the loop. A creator's video doesn't just get edited — it gets multiplied into a full content stack and published directly from Vivido.

### 3.1 WI-29 — One Session → 11 Content Pieces

**What if one recording session produced your entire week of content?**

**Feature name:** Vivido Repurpose Engine

**Output from one recorded session + finished edit:**

| Output | Format | How Generated |
| --- | --- | --- |
| Full YouTube Video | 16:9 MP4, platform-optimised | Main edit |
| YouTube Shorts (×3) | 9:16 MP4, sub-60s | AI selects 3 best moments with strongest hooks |
| Podcast Audio | WAV / MP3, cleaned | Audio track only, with intro/outro |
| LinkedIn Post | Text | Transcript → key insight extraction → post format |
| Twitter/X Thread | Text (7 tweets) | Narrative arc broken into thread structure |
| Instagram Carousels (×2) | 1080×1080 PNG slides | Key points as visual slides with brand kit |
| Newsletter Section | HTML / Markdown | Summary + key quotes + CTA |
| Blog Post Draft | Markdown | Full transcript cleaned + structured with headings |
| Show Notes | Markdown | Chapter titles + key links + guest mentions |
| Captions File | SRT + VTT | Auto-generated, synced |
| Thumbnail (×3 options) | PNG, platform-spec | From Thumbnail Scout |

**UI:** After finishing edit, open Repurpose panel. Check/uncheck what you want. Click Generate. Done in < 3 minutes.

---

### 3.2 WI-24 — Video Adapts Per Platform Automatically

**What if Vivido knew every platform's requirements so you didn't have to?**

**Feature name:** Smart Export

**Platform profiles built-in:**

| Platform | Aspect Ratio | Resolution | Bitrate | Caption Style | Special |
| --- | --- | --- | --- | --- | --- |
| YouTube Long | 16:9 | Up to 4K | 20–50 Mbps | Subtitle track | Chapters |
| YouTube Shorts | 9:16 | 1080×1920 | 10 Mbps | Burned-in | < 60s |
| Instagram Reels | 9:16 | 1080×1920 | 8 Mbps | Burned-in, large | Trending audio |
| Instagram Post | 1:1 or 4:5 | 1080px | 6 Mbps | Optional |  |
| TikTok | 9:16 | 1080×1920 | 8 Mbps | Burned-in, bold | < 3 min |
| LinkedIn | 16:9 or 1:1 | 1080p | 10 Mbps | Subtitle track | < 10 min |
| Twitter/X | 16:9 or 1:1 | 720p–1080p | 6 Mbps | Optional | < 2 min 20s |
| WhatsApp | 16:9 | 480p | 2 Mbps | Burned-in | < 16MB |

**Per export:** Vivido auto-applies the right settings. Creator reviews, confirms, exports.

---

### 3.3 WI-44 — Schedule + Publish from Inside Vivido

**What if Vivido was the last step before your audience sees it?**

**Feature name:** Vivido Publish

**Integrations at launch:**

- YouTube (video + Short + thumbnail + description + chapters)
- Instagram (Reel + Post + Story)
- LinkedIn (video post)
- Twitter/X (video tweet + thread)
- Podcast (RSS feed / Spotify / Apple via Anchor integration)

**Workflow:**

1. Finish edit → Pre-Flight Score → all green
2. Open Publish panel
3. Select platforms, assign each output format
4. Write title/description (or use AI-generated from transcript)
5. Set publish time (or choose Optimal Time AI suggestion)
6. Click Publish

**Post-publish:** Vivido shows a live performance card per platform (views, comments first 24h if analytics connected)

**Exit Criteria for Stage 3:** A creator can go from finished edit to published YouTube video + 3 Shorts + LinkedIn post in under 10 minutes. All content pieces generated correctly. At least 3 platforms publishing without errors.

---

## 🚀 Stage 4 — MSP Polish

### What This Stage Delivers

The difference between a product that works and a product people love and tell others about.

### 4.1 Onboarding — First Video in 5 Minutes

- Creator opens Vivido for the first time
- One-screen: pick persona (Solo Creator / Agency Team)
- Immediately prompted to record a 60-second test video
- Vivido applies Smart Silence Removal + Acoustic Simulation + Captions automatically
- Shows the "before" and "after" side by side
- Creator exports their first Vivido video before creating an account
- Account creation comes AFTER the wow moment, not before

### 4.2 Pricing Architecture

| Plan | Price | For |
| --- | --- | --- |
| Free | ₹0 / $0 | 3 projects, 10 min export/month, watermark on export, no Repurpose Engine |
| Creator | ₹799/mo (India) / $12/mo (Global) | Unlimited projects, 4K export, Repurpose Engine (5 outputs), 1 brand kit, 50GB storage |
| Pro | ₹1,499/mo / $22/mo | All Creator + Take Composer, Style DNA, Smart Chapters, Thumbnail Scout, unlimited repurpose, 200GB |
| Agency | ₹3,999/mo / $59/mo | All Pro + 5 seats, 3 brand kits, client approval workflow, priority render, 1TB storage |

**Positioning:** Free is generous enough to be genuinely useful. Paid plans compete on time saved, not feature restriction.

### 4.3 Performance Standards

- Timeline scrubbing: < 16ms response (60fps)
- Transcription: < 90s for a 30-minute video
- Take Composer: < 60s to produce composite
- Export (720p, 10 min video): < 4 minutes in background render
- App load time: < 2s on Vercel edge

### 4.4 Trust & Safety

- Content Ownership Pledge: plain-language statement in onboarding and footer
- Data processing: video files never used for training without explicit opt-in
- GDPR + India DPDP Act compliance
- SOC 2 Type 2 roadmap (needed for Agency plan enterprise clients)

### 4.5 GTM Plan

- **Phase 1 (Month 1–2):** Closed beta with 50 Indian YouTubers. White-glove onboarding. Collect 100 video testimonials.
- **Phase 2 (Month 3):** Product Hunt launch. Anand's Decode by Anand channel as primary distribution. YouTube demo video showing Take Composer head-to-head vs Descript.
- **Phase 3 (Month 4+):** Agency outreach. CapCut displacement campaign. Affiliate programme.

---

## 📎 Linked Resources

- 📄 [Vivido Brainstorm & Strategy OS](../Vivido%20%E2%80%94%20Product%20Brainstorm%20&%20Strategy%20OS%2034d57b89d00e81d9bd77db7254c9e23b.md)
- 🔬 [User Research — Competitor Reviews](User%20Research%20%E2%80%94%20Competitor%20Reviews%20&%20Creator%20Pain%20%2034d57b89d00e8168ac82d676f40c31fa.md)
- 💡 [What If List — All 50](The%20Crazy%20What%20If%20List%20%E2%80%94%2050%20Unimaginable%20Video%20Ide%2034d57b89d00e815ba621f1886c509f34.md)
- 🗂️ Feature Database → see below

---

> *"The goal is not to build a video editor. The goal is to build the thing that makes creators feel like they finally have a team."*
> 

[Vivido Feature Database — MSP](Vivido%20%E2%80%94%20Product%20Requirements%20Document%20(PRD)/Vivido%20Feature%20Database%20%E2%80%94%20MSP%204fada921056444d2ab1c56f61a43af78.csv)