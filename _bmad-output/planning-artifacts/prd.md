---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
status: complete
completedAt: '2026-04-27'
releaseMode: phased
inputDocuments:
  - _bmad-output/planning-artifacts/research/domain-youtube-creator-video-tools-competitive-landscape-research-2026-04-26.md
  - _bmad-output/planning-artifacts/elicitation-vivido-2026-04-26.md
  - _bmad-output/planning-artifacts/fresh-ideas.md
  - rawvision.md
workflowType: 'prd'
classification:
  projectType: 'desktop_app+web_app'
  domain: 'creator_economy_filmmaker_tools'
  complexity: 'high'
  projectContext: 'greenfield'
  architecture: 'dual_runtime_explicit_compute_boundary'
  gtmEntry: 'youtube_stack_killer'
  longTermVision: 'filmmaker_os'
---

# Product Requirements Document - Vivido

**Author:** Anand
**Date:** 2026-04-27

---

## Executive Summary

Vivido is an AI-native, OS-level video creation platform for YouTube creators, independent filmmakers, and agency/brand teams. It eliminates the 7-tool creator workflow — replacing Premiere, Opus Clip, Submagic, Riverside, iZotope RX, Loom, and the manual YouTube Studio post-export process with a single native desktop application, designed as a platform from day one.

Every existing video editor treats every project as day one. Vivido is the first editor that learns. A per-creator style model accumulates across every project — hook structures, cut rhythms, B-roll patterns, audio treatment, pacing — and compounds into a creative intelligence that pre-stages rough cuts, suggests chapters, and identifies Shorts opportunities in the creator's own editorial voice. At project 1 it observes. At project 10 it assists. At project 50 it knows your channel better than any human editor you could hire.

**Target users:**
- Solo YouTube creators on Windows (underserved by FCP, priced out of Premiere, displaced by the CapCut ban)
- Independent filmmakers who need cinema-grade tools without a post-production studio
- Agency/brand teams running multi-creator content operations

**Not building for:** Educators, enterprise B2B, Loom-replacement use cases, casual social media creators.

**Founder's unfair advantage:** Vivido is designed by someone who is simultaneously a trained actor, director, cinematographer, and video editor — not a SaaS founder approximating creative workflows. Every product decision carries the judgment of someone who has lived inside the problem.

**Market entry:** CapCut's January 2025 US ban displaced 264M+ users. The replacement window is 18–24 months before another tool consolidates that audience. Vivido enters as the YouTube creator's final stack — the last tool they install — and grows toward the filmmaker's OS by 2029.

### What Makes This Special

**The per-creator style model** is the moat. No competitor — not FCP, not DaVinci, not Premiere, not Descript — accumulates creator-specific editorial intelligence across sessions. Every existing system is stateless per project. Vivido's style model is a compounding data asset: the longer a creator uses Vivido, the harder it becomes to leave, and the more defensible the platform becomes. Patents #1 (Per-Creator Style Model) and #3 (Cross-Project Hook Intelligence via YouTube Analytics feedback loop) are filed before any competitor recognizes the space.

**Pipeline unity** is the second differentiator. Vivido is the only product that handles: screen/webcam recording → transcript editing → timeline editing → audio cleanup → color grading → YouTube-native chapter/Shorts authoring → one-click Publish Package (main video + Shorts + thumbnails + chapter metadata) — without a single export to another tool.

**Architecture: Dual-Runtime with Explicit Compute Boundary (ADR-001-C).** The browser runtime (React + Vite) owns all UI and lightweight media operations. The native runtime (Electron main process + Node.js) owns FFmpeg, Whisper inference, style model, file I/O, and GPU color operations. The web app shares 100% of the UI codebase. The native runtime is headless-capable — the same compute layer that runs in Electron today runs in a cloud render queue tomorrow. All IPC between runtimes is typed and documented.

**The 12 Vivido Design Laws** govern every product decision: timeline is predictable not clever, Windows ships first, guest mode is the default first session, style model always runs, export has 3 options not 47, core editing works fully offline, YouTube is a first-class target authored in the timeline, one workspace with context-sensitive panels, color speaks creator language, every tier's capabilities are visible in-app at all times, project files are open JSON format, Vivido publishes not just exports.

## Project Classification

- **Project Type:** Desktop App (Electron, primary UX) + Web App (React + Vite, sync/collab layer)
- **Domain:** Creator Economy → Filmmaker Tools (2026: YouTube entry; 2029: independent film expansion)
- **Complexity:** High — dual-runtime architecture, FFmpeg native pipeline, local Whisper inference, per-creator ML style model, YouTube API integration, Supabase Auth + Cloudflare R2, Stripe + Razorpay payments, EU AI Act compliance, patent portfolio
- **Project Context:** Greenfield
- **GTM Entry:** YouTube stack killer — replaces $1,500–2,000/yr creator tool stack at $199/yr
- **10-Year Ceiling:** The filmmaker's OS — from 30-second Shorts to 90-minute documentaries, solo creator to production studio, single editor to platform with patent licensing revenue

---

## Success Criteria

### User Success

- A creator imports footage and reaches first playback within 15 seconds — no setup wizard, no account required, no sequence preset dialog
- A creator completes their first project start-to-finish inside Vivido with zero required tool switches to external apps
- Time from footage import to publish-ready package (main MP4 + Shorts + thumbnails + chapters) drops below 40% of the creator's previous workflow time
- By project 5, the style model surfaces at least 3 accurate observations about the creator's editing patterns that the creator confirms as correct
- By project 10, the AI rough cut pre-staging is used as the starting point (not discarded) by ≥60% of creators
- 4K footage scrubs in real-time with zero buffering on hardware meeting minimum spec (GPU with hardware decode support)
- The "Publish Package" one-click export completes in under 2× real-time duration of the video (a 10-min video exports in under 20 min on minimum spec)
- Guest-to-authenticated conversion happens at the "style model save" moment with ≥40% conversion rate — not at a signup wall

### Business Success

**3-Month targets (MLP launch):**
- 1,000 active creators completing at least one project per week in Vivido
- ≥30% of installs convert to Creator tier ($199/yr) within 60 days
- Net Promoter Score ≥60 — creators are actively recommending Vivido to other creators
- $50K ARR from Creator + Lifetime tier combined

**12-Month targets:**
- 10,000 active weekly creators
- $500K ARR — mix of Creator ($199/yr) and Studio ($499/yr) tiers
- ≥500 Lifetime ($599) conversions in launch window
- Measurable CapCut refugee acquisition: ≥20% of new users self-report coming from CapCut or no current editor

**Moat milestones:**
- Patents #1 (Per-Creator Style Model) and #3 (Cross-Project Hook Intelligence) filed within 6 months of launch
- Style model has accumulated data from ≥5,000 completed projects — threshold where intelligence becomes meaningfully personalized
- Zero creators who have completed 20+ projects in Vivido have churned

### Technical Success

- Dual-runtime architecture (ADR-001-C) ships with typed IPC contracts documented before first external user
- Project file format (open JSON) documented publicly at launch — any creator can read their own project file in a text editor
- Native GPU decode operational on both Mac (VideoToolbox) and Windows (NVENC/NVDEC) at launch
- Whisper transcription completes in <10% of video duration (10-min video transcribed in under 60 seconds) on minimum spec hardware
- Timeline data model validated to handle 90+ minutes, 500+ clips without performance degradation before MLP ships
- Color pipeline architected for ACES/Log ingestion even if only sRGB exposed at launch — no color architecture rewrite required for film expansion
- Cloud sync uses asset references (not full file copies) — verified before any creator uploads a project
- Core editing (cuts, trims, audio, captions, export) works fully offline — verified before launch
- EU AI Act compliance: AI-generated content disclosure mechanism in place before any EU creator uses Vivido

### Measurable Outcomes

| Outcome | Target | When |
|---|---|---|
| First-session jaw-drop (instant 4K playback) | <15s to first playback from drop | MLP launch |
| Publish Package completeness | 100% of marked Shorts + chapters exported automatically | MLP launch |
| Style model accuracy (creator confirms observations) | ≥3 accurate observations by project 5 | 3 months post-launch |
| Creator tool stack replacement | ≥2 external tools cancelled per active creator | 6 months post-launch |
| Churn after 20+ projects | 0% | Ongoing |
| Patent filings | #1 + #3 filed | Within 6 months of launch |

---

## Product Scope

### MLP — Minimum Legendary Product

The smallest version of Vivido where a creator finishes one real project and says *"I didn't know editing software could feel like this."* Four features. All four required. None alone is sufficient.

1. **Native GPU decode + 4K instant playback** — VideoToolbox (Mac) + NVENC/NVDEC (Windows). No WASM. No spinner. Hardware-accelerated from frame one.
2. **YouTube-Native Timeline** — Chapters, Shorts markers, End Screen zones as draggable first-class timeline objects. Export generates YouTube chapter `.json` + standalone Shorts clips automatically.
3. **Whisper + Transcript Editing** — Silent background transcription on import. Edit by word in transcript view, synced to timeline in real-time. Captions as styled timeline objects.
4. **Audio Room (AI Noise Removal + LUFS Normalization) + Publish Package** — One-click AI noise removal. Platform-specific loudness normalization (YouTube -14 LUFS, Shorts -13 LUFS, Podcast -16 LUFS) applied automatically. Publish Package outputs: main MP4 + Shorts clips + 3 thumbnail candidates + chapters.txt.

**Also ships with MLP (infrastructure, not features):**
- Guest mode (no account required to edit)
- Style model passive initialization (JSON accumulator, projects 1–4)
- Open JSON project file format, documented
- Supabase Auth + Cloudflare R2 (for style model sync on account creation)

**MLP explicitly excludes:** Color grading room, recording capture, team collaboration, AI rough cut, cloud render queue, mobile.

### Growth Features — Stage 2

- **Recording** — Screen (full/window/region), webcam (solo + PiP), multi-track local recording (screen + webcam + mic + system audio as separate tracks). OS-level capture: ScreenCaptureKit (Mac), Windows.Graphics.Capture (Windows). Kills Riverside and Loom.
- **AI Rough Cut** — Unlocks at project 5. Uses accumulated style model to pre-stage a rough cut from raw footage in the creator's editorial voice. The defining Vivido differentiator — word-of-mouth trigger.
- **Hook Intelligence** — YouTube Analytics API feedback loop: maps retention curves to source timeline positions, informs next project's edit decisions. VidIQ inside the editor.
- **LUT Color Room** — Creator-vocabulary color grading. "Make this cinematic" → curated LUT suggestions matched to channel visual identity. ACES/Log support enabled.
- **Advanced Audio Room** — Multitrack EQ, compression, music/VO balance presets by content type. Expands on MLP's AI noise removal.
- **Scene Composer (Recording)** — Multi-source layout presets: Interview, Tutorial, Podcast, Cinematic. OBS scene system without the complexity.

### Vision — Stage 3 and Beyond

- **Team Collaboration** — Async role-based editing, client review + approval flows, agency/studio workspace. Kills Frame.io for creator market.
- **Full Color Grading Room** — DaVinci-grade color science with creator vocabulary. ACES pipeline, node-based grading available (advanced mode).
- **Cloud Render Queue** — AWS MediaConvert for long-form and film-length exports. Native runtime runs headless — same FFmpeg pipeline, different host.
- **Plugin API** — Third-party integrations, community-built tools. Vivido as a platform others build on.
- **Film & Documentary Mode** — 90-min+ timeline, multi-reel project management, cinema-grade export (DCP, ProRes 4444, ARRIRAW ingest). The 2029 expansion.
- **Patent Licensing** — Style model IP (Patents #1 + #3) licensed to other video software companies by 2034.
- **Vivido Film Festival** — Annual. Content made entirely in Vivido. "Made with Vivido" as quality signal.

---

## User Journeys

### Journey 1 — Maya: The CapCut Refugee (Primary User — Success Path)

**Who she is:** Maya, 28, independent YouTube creator, 45K subscribers, Windows laptop, Delhi. She made tech explainer videos for 3 years using CapCut. January 2025: the ban. She's been patching together a workflow with a free Premiere trial, Submagic for captions, and Canva for thumbnails. Every video takes 4 hours longer than it used to. Her upload frequency dropped from weekly to biweekly. Her channel growth has stalled.

**Opening Scene:** Sunday afternoon. Maya has 2 hours of raw footage from a product review. Four browser tabs open: Premiere (trial watermark countdown: 6 days left), Submagic, Canva, YouTube Studio. She downloads Vivido without creating an account.

**Rising Action:** Vivido opens. No wizard. No preset dialog. She drags her footage. It plays immediately, full resolution. Sidebar: words appearing. Her transcript, live. She hasn't made a single cut and the tool has already done two things her current workflow couldn't do in 10 minutes. She edits by deleting filler words — the timeline updates in sync. She drags a Chapter marker. Marks two Shorts segments. Clicks "Remove Background Noise." The HVAC hum disappears. 40 minutes of editing done.

**Climax:** She clicks "Publish Package." 40 seconds: a folder. `main.mp4`, `shorts-reveal.mp4`, `shorts-verdict.mp4`, `thumbnail-01.jpg`, `thumbnail-02.jpg`, `thumbnail-03.jpg`, `chapters.txt`. She copies chapters.txt directly into YouTube Studio. Uploads. Done.

**Resolution:** Total time: 1 hour 20 minutes vs previous 3 hours 45 minutes. Zero switches to Submagic, Canva, or Premiere. She creates an account when Vivido shows: *"Project 1 complete. Your style is starting to take shape — save it so Vivido remembers you."* She posts on Twitter: *"Just edited my first video with @VividoApp and I genuinely don't understand why I was using 4 apps before."*

**Capabilities revealed:** Guest mode, instant GPU playback, background Whisper, transcript editing, chapter markers as timeline objects, Shorts markers, AI noise removal, LUFS normalization, Publish Package, style model initialization, frictionless account creation.

---

### Journey 2 — Ravi: The Agency Studio Lead (Secondary User — Operations Path)

**Who he is:** Ravi, 34, runs a 3-person video agency in Mumbai. Eight brand YouTube channels under management. Two freelance editors, one strategist. Monthly tool stack: Premiere × 3 seats ($60 × 3) + Frame.io ($25) + Dropbox Business ($20) + Notion ($16) = $121/mo. Last month an editor sent the wrong cut to a client. Ravi apologized for 45 minutes on a call.

**Opening Scene:** Ravi onboards Vivido Studio. Creates workspace "Ravi Creative Studio." Invites two editors (role: Editor — can edit, cannot publish). Creates client logins (role: Reviewer — can comment and approve only). Loads a Brand Kit for the fintech client: logo, color palette, intro/outro templates, approved music library.

**Rising Action:** Editor #1 opens the fintech project. Brand Kit is pre-loaded — no setup. She edits, clicks "Submit for Review." A review link is generated. Ravi opens it on his phone: frame-accurate comment markers on the timeline. He adds: *"Cut the pause at 1:42."* Client gets a separate read-only link — approves with one note. Editor makes the change, resubmits. Client approves.

**Climax:** Ravi opens the Projects dashboard. Eight channels, all statuses visible: In Edit / In Review / Client Approved / Published. One channel is 2 days behind. He flags it to Editor #2 in one click. No Slack thread. No Notion task.

**Resolution:** Wrong-version incident: never again. One version per project. Approval is a button. Monthly cost: $41.58/mo vs $121/mo. Saves $79/mo and 3 hours of coordination per week.

**Capabilities revealed:** Multi-workspace, role-based access (editor/reviewer/client), Brand Kit per workspace, frame-accurate review comments, client approval flow, project status dashboard, version control.

---

### Journey 3 — Arjun: The First-Time Filmmaker (Primary User — New Market Path)

**Who he is:** Arjun, 26, marketing professional. Two years writing a short documentary script about street food vendors. Shot 6 hours of footage. Opened Premiere once — saw the sequence dialog, closed it. Opened DaVinci once — saw the Color Room tabs, closed it. Sitting on 6 hours of footage for 4 months.

**Opening Scene:** Arjun downloads Vivido after reading it "works without knowing what a sequence preset is." Drags in a 12-minute interview clip. It plays. Transcript appears. He highlights sections he wants, deletes the filler. The clip shortens. He has made his first edit without knowing what a timeline is.

**Rising Action:** He assembles his entire documentary using transcript view — selecting quotes that tell the story in order. Switches to timeline view for the first time. Vivido shows: *"Your average clip is 45 seconds — longer than typical. Want to see where viewers might lose attention?"* Three clips highlighted. He trims them. Vivido suggests B-roll placements matching transcript moments. He accepts 3 of 4 suggestions.

**Climax:** Arjun selects "Archive Export" — ProRes 422, full resolution. Submits to a short film festival. The documentary he sat on for 4 months is submitted.

**Resolution:** He never needed to learn what a codec is. He learned what editing *feels like*. Three projects in, he's now marking chapters in YouTube uploads. He tells every aspiring filmmaker: *"The software doesn't get in the way."*

**Capabilities revealed:** Transcript-first editing as primary interface, B-roll suggestion from transcript context, festival/archive export (ProRes), layered design system (transcript → timeline without intimidation), gentle intelligence nudges (never forced).

---

### Journey 4 — Jess: Mobile-Native Creator Going Desktop (Primary User — Friction Path)

**Who she is:** Jess, 22, 180K YouTube subscribers, Shorts-focused, shifting to long-form. Edited everything on phone with CapCut Mobile. Never used a desktop editor. Switching because long-form is getting too complex for mobile.

**Opening Scene:** Installs Vivido on Windows laptop. Drops a 22-minute vlog. It plays. Transcript appears. She knows transcripts from mobile. She starts there — no intimidation yet.

**First friction:** Tries to add a music track. On mobile: one tap. On Vivido: drag audio file into timeline. She's never done this. She right-clicks. Nothing obvious. Opens keyboard shortcut reference. Finds it. Drags the track in. 3 minutes vs 10 seconds on mobile — but she did it.

**First delight:** Marks 4 Shorts sections while editing long-form. Publish Package outputs all 4 pre-cropped to 9:16, already captioned. She uploads all 4 Shorts same day as the long-form. First time ever.

**Resolution:** Long-form retention 40% higher than previous attempts. She traces it to chapter markers. Shares in a creator Discord. Three creators download Vivido the same day. Learning curve was real (3 videos before it felt fast) — but Shorts-from-long-form is already better than her mobile workflow. She's not going back.

**Capabilities revealed:** Mobile-to-desktop onboarding path, keyboard shortcut discoverability, Shorts crop preview before export, horizontal source clip warning ("This clip is 16:9 — Vivido will auto-crop to 9:16. Preview before exporting."), retention insight loop.

---

### Journey 5 — Support Operations (Internal Path)

**Scenario:** Creator reports Shorts clip exported in wrong aspect ratio (16:9 instead of 9:16) after marking a horizontal source clip as Shorts.

**Support journey:** Support accesses project metadata (never raw files, never without consent). Source clip was 16:9 horizontal — Vivido attempted auto-crop silently with no warning. Bug identified: Shorts marker on horizontal source must surface a warning with crop preview before export. Creator consent model for support metadata access clearly documented.

**Capabilities revealed:** Support read-only project metadata access with explicit consent model, Shorts crop preview before export, horizontal source detection and warning.

---

### Journey Requirements Summary

| Capability Area | Revealed By |
|---|---|
| Guest mode + frictionless account creation at value moment | Journey 1 |
| Native GPU playback, background Whisper, transcript editing | Journeys 1, 3 |
| YouTube-native primitives (chapters, Shorts markers, End Screens) | Journeys 1, 4 |
| AI noise removal + LUFS normalization + Publish Package | Journey 1 |
| Style model initialization and "save moment" conversion | Journey 1 |
| Multi-workspace, role-based access (editor/reviewer/client), Brand Kit | Journey 2 |
| Frame-accurate review + client approval flow | Journey 2 |
| Project status dashboard for multi-channel operations | Journey 2 |
| Transcript-first editing as primary (not secondary) interface | Journeys 3, 4 |
| B-roll suggestion from transcript context | Journey 3 |
| Festival/archive export (ProRes, DCP) | Journey 3 |
| Layered design system — simple defaults, advanced always accessible | Journeys 3, 4 |
| Shorts crop preview + horizontal source warning before export | Journeys 4, 5 |
| Support read-only metadata access with creator consent model | Journey 5 |
| Mobile-to-desktop onboarding path + keyboard discoverability | Journey 4 |

---

## Domain-Specific Requirements

### Compliance & Regulatory

**EU AI Act (Full enforcement: August 2026)**
- All AI-generated or AI-assisted output must include disclosure — creator informed when AI made a decision affecting their content
- AI Trust Settings required per-user: creators can opt out of any AI feature individually without losing access to manual alternatives
- No AI feature may auto-apply without explicit creator action — suggestions shown, application requires deliberate creator decision (design law and compliance requirement)
- C2PA-compatible provenance metadata on export configurable for EU distribution (off by default, required for EU AI Act compliance)
- EU AI Act compliance achieved before Vivido accepts any EU-based paying creator

**GDPR / CCPA**
- Creator style model data is personal data under GDPR: explicit consent at collection, right to erasure, data portability (export style model as JSON), processing transparency
- Video footage and project files are creator-owned — raw footage never leaves creator's machine unless they explicitly initiate cloud upload
- Cloud data retention: Supabase style model metadata retained while account active; rendered R2 outputs deleted after 90 days unless extended storage opted in; 30-day version history per architecture decisions
- CCPA deletion cascade (within 30 days): Supabase auth record + style model + project metadata + R2 objects
- Desktop app collects no analytics without opt-in

**Recording Consent Laws**
- 13 US all-party consent states (CA, CT, FL, IL, MD, MA, MI, MT, NV, NH, OR, PA, WA): jurisdiction-appropriate consent notice displayed when recording is initiated
- Remote guest recording (Stage 2): each guest must receive and acknowledge recording consent before capture; consent record stored with project metadata
- Disclosure UI must be localizable for EU, UK, Canada, Australia requirements

**YouTube API Terms of Service**
- API quota management required for Hook Intelligence (10,000 units/day default per project)
- Prohibited: using API data to build competing recommendation systems, storing API data beyond 30-day cache window
- YouTube OAuth upload scope requires manual Google review — apply before launch
- API credentials stored server-side (Supabase Edge Function) — never exposed to client
- Creator OAuth tokens stored encrypted in Supabase — never in localStorage

**FFmpeg Licensing**
- Dynamic linking only — static linking with H.264/AAC triggers GPL obligations
- H.265/HEVC: use OS-native encoders (VideoToolbox/NVENC) with licensed codecs, not open-source HEVC encoders
- AAC: use libavcodec native AAC (LGPL) or OS-native CoreAudio/MediaFoundation — not FDK AAC (GPL)
- CI/CD gate: validates FFmpeg build flags, blocks release if GPL components detected
- Optional "extended codecs" download for creators who need GPL codecs and accept licensing terms

**Patent Strategy**
- **Patent #1 (Per-Creator Style Model):** Provisional application within 6 months of first public demo
- **Patent #2 (YouTube-Native Timeline Primitives):** File within 12 months of MLP launch
- **Patent #3 (Cross-Project Hook Intelligence):** Provisional application within 6 months of first public demo
- **Patent #4 (Adaptive Audio Normalization per Platform):** Platform-specific loudness targeting (YouTube -14 LUFS, Shorts -13 LUFS, Podcast -16 LUFS) applied automatically per export target — file within 18 months of MLP launch
- **Patent #5 (AI Rough Cut Pre-Visualization from Style Model):** Generative rough cut staging based on per-creator accumulated editorial style, not generic excitement detection — file within 18 months of Stage 2 launch
- All novel style model algorithms documented with invention disclosure records before public release
- Freedom-to-operate review before launch for: timeline editing core, transcript-synced editing (Descript patent landscape), waveform visualization

### Technical Constraints

**Security**
- All data in transit: TLS 1.3 minimum
- Style model data at rest: AES-256 in Supabase
- R2 objects: private by default, signed URLs with 1-hour expiry
- Electron hardening: contextIsolation enabled, nodeIntegration disabled, sandbox enabled, no remote module, CSP configured for renderer
- IPC validation: all renderer↔main messages validated against typed schemas — no eval, no dynamic code execution over IPC

**Privacy by Design**
- Style model stores behavioral metadata only (cut durations, clip counts, audio flags, chapter density) — never video content, transcripts, or PII about subjects in videos
- Transcript cloud sync is opt-in (required for collaboration); local-only transcript mode available
- Analytics: aggregate anonymous product usage metrics only — never per-creator content analysis; opt-out available

**Performance Constraints**
- Minimum spec: GPU with hardware video decode (NVDEC or equivalent, 2018+), 8GB RAM, 50GB free disk
- Recommended spec: Dedicated GPU (NVIDIA RTX 3060 or Apple M1+), 16GB RAM, NVMe SSD
- 4K real-time scrubbing required on minimum spec via hardware-accelerated decode — no software decode fallback
- Audio processing (noise removal + LUFS normalization): completes in <5% of audio duration on minimum spec
- Whisper: whisper.cpp with GGML models — base.en for minimum spec, medium.en for recommended; auto-detect hardware

**Payments**
- Stripe: primary for all markets except India; Razorpay: India primary (RBI mandate compliance)
- PCI-DSS: Vivido never stores card data — Stripe Elements/Razorpay Hosted Page handle all card input
- Stripe Billing for Creator + Studio tiers; Lifetime is one-time charge

### Integration Requirements

| Integration | Purpose | Required For |
|---|---|---|
| Supabase Auth | Email + OAuth, creator identity | MLP |
| Supabase DB | Style model metadata, project metadata, subscription status | MLP |
| Cloudflare R2 | Rendered output storage, optional asset backup | MLP (on account creation) |
| YouTube Data API v3 | Analytics read (Hook Intelligence), video upload, chapter metadata | MLP (upload), Stage 2 (analytics) |
| Stripe + Razorpay | Payment processing, subscription lifecycle | MLP |
| Whisper.cpp | Local transcription inference — fully offline, no external API | MLP |
| Anthropic Claude API (claude-sonnet-4-6) | B-roll suggestion context, hook detection framing, editorial intelligence | Stage 2 |
| Liveblocks | Real-time collaborative editing presence | Stage 3 |
| AWS MediaConvert | Cloud render queue for long-form exports | Stage 2+ |

### Risk Mitigations

| Risk | Mitigation |
|---|---|
| EU AI Act non-compliance at launch | AI Trust Settings + disclosure UI are MLP blockers |
| YouTube API quota exhaustion | Per-creator quota tracking, graceful degradation, daily budget allocation |
| FFmpeg GPL contamination | CI/CD build flag validation blocks release |
| Style model data loss pre-authentication | Local backup to OS app data dir; cloud sync prompt after project 1 |
| Recording consent legal exposure | Jurisdiction detection + non-dismissible consent notice; legal review before Stage 2 |
| Descript transcript-editing patent conflict | FTO review before MLP launch; implementation differentiation documented |
| Stripe India RBI friction | Razorpay as India primary; both paths tested before launch |

---

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Per-Creator Compounding Editorial Intelligence (Patent-worthy)**
No video editor in existence accumulates creator-specific style data across sessions. Every system is stateless per project. Vivido's style model is the first application of per-creator ML personalization to editorial decision-making — not content classification (what's in the video) but editorial style (how a specific human edits). The innovation: a passive behavioral accumulator that starts as a JSON data structure and grows into a personalized rough-cut generator. Nothing in FCP, DaVinci, Premiere, or any creator tool attempts this.

**2. YouTube-Native Timeline Primitives**
Every existing NLE treats YouTube metadata (Chapters, Cards, End Screens, Shorts cut-points) as export concerns — authored in YouTube Studio after the video is uploaded. Vivido treats them as first-class creative objects in the timeline — draggable, previewable, and exported as part of the project. This is a data model innovation: platform-specific interactive metadata objects that render in the timeline preview and generate platform-native export packages. The creative decision happens at edit time, not post-publish time.

**3. Cross-Project Hook Intelligence (Patent-worthy)**
The feedback loop between post-publish analytics and pre-publish editing decisions does not exist in any tool. VidIQ gives you analytics after publishing. FCP gives you a timeline before publishing. Nothing connects them. Vivido's Hook Intelligence maps viewer retention curves (YouTube Analytics API) back to specific timeline positions in the source project — then carries those signals into the next project's editing decisions. This requires a cross-system linking architecture that doesn't exist in prior art.

**4. Dual-Runtime Headless-Capable Compute Layer**
The native runtime (Electron main process + Node.js) is designed to be host-agnostic from day one: today it runs in Electron, tomorrow it runs as a headless cloud render worker, the day after it runs as an on-device ML inference engine on Apple Silicon. This is an architectural innovation that removes the ceiling from what Vivido can become without a rewrite.

### Market Context

- Auto-cut tools (Descript, Opus Clip) exist but use generic excitement detection — not creator-specific style models
- Style transfer exists for images (Neural Style Transfer, 2015) — never applied to video editorial decision-making per creator
- YouTube analytics platforms (VidIQ, TubeBuddy) exist — none integrate with a video editor
- No existing NLE has ever shipped YouTube metadata as first-class timeline objects in 30+ years of NLE development

### Validation Approach

- Style model accuracy: By project 5, surface ≥3 observations the creator confirms as correct (in-product validation)
- YouTube primitives: Track whether creators use chapter markers in-timeline vs post-export in YouTube Studio (behavioral validation)
- Hook Intelligence: Measure whether AI rough cut acceptance rate increases as style model matures (engagement validation)
- Patent validation: FTO review confirms no prior art for Patents #1, #2, #3 before filing

### Risk Mitigation

| Innovation Risk | Mitigation |
|---|---|
| Style model insufficient data at launch (feature, not moat) | Accept this — moat emerges at 10K+ users. Launch with honest "learning" framing |
| Open-source replication of style model in 2–3 years | Patents #1 + #3 filed before replication possible; data asset compounds ahead of any replicator |
| YouTube API changes breaking Hook Intelligence | Graceful degradation to manual mode; feature survives API quota limits |
| Dual-runtime IPC complexity creating bugs | Typed IPC contracts enforced from day one; CI validates schema compliance |

---

## Desktop App + Web App Specific Requirements

### Platform Support

| Platform | Version | Priority |
|---|---|---|
| Windows 10/11 (x64) | Build 19041+ | P0 — ships first |
| macOS 13+ (Apple Silicon + Intel) | Ventura+ | P0 — ships with Windows |
| Linux (Ubuntu 22.04+) | AppImage | P2 — post-MLP |
| Web (Chrome 120+, Edge 120+) | Web app companion | P1 — sync/collab only at MLP |

### Desktop-Specific Requirements

- **Auto-update:** Electron auto-updater via GitHub Releases. Delta updates for incremental patches. Creator can defer updates but not block security patches.
- **System integration:** OS file associations for `.vivido` project files. Dock/taskbar recent projects. Native OS notifications for export completion, style model milestones.
- **Offline capability:** Core editing (cuts, trims, transcript editing, audio processing, local export) works fully offline. Cloud features (sync, YouTube upload, Hook Intelligence) degrade gracefully with clear offline indicators.
- **Local file management:** Project files and assets stored in user-defined location (not forced into app container). Default: `~/Movies/Vivido/` on Mac, `%USERPROFILE%\Videos\Vivido\` on Windows.
- **Performance:** Native GPU decode via VideoToolbox (Mac) and NVDEC/D3D11VA (Windows). FFmpeg invoked as subprocess from native runtime — not WASM. No software decode fallback for 4K.
- **Security:** contextIsolation, sandbox, no nodeIntegration in renderer. All Node.js access via preload scripts with explicit IPC contracts.

### Web App Specific Requirements

- **Shared UI codebase:** React + Vite renderer shares 100% of UI code between Electron and web. Platform adapter (`usePlatform()` hook) routes compute requests to native runtime (Electron) or WASM fallback (browser).
- **Web app scope at MLP:** Account management, project library view, style model visualization, subscription management, shared review links (Studio tier). Full timeline editing in browser is Stage 2.
- **Progressive Web App:** Installable PWA for web app companion. Offline access to project metadata and style model summary (not footage).

### Project File Format

- Format: Open JSON (`.vivido` extension, readable in any text editor)
- Schema: Documented publicly at launch at `vivido.app/schema`
- Versioning: Semantic versioning for schema. Vivido reads older versions; migration run automatically on open; original backed up before migration.
- Contents: Project metadata, timeline state (clip references + edit decisions), transcript data, style observations, chapter/Shorts markers, export settings. Never embeds raw media — references only.

### Subscription & Entitlement Model

| Tier | Price | Key Entitlements |
|---|---|---|
| **Free** | $0 | Full editor, unlimited projects, local render, manual captions, no AI features, no watermarks |
| **Creator** | $199/yr | Free + Whisper captions, AI noise removal, Audio Room, Style Model, AI rough cut (project 5+), Shorts auto-crop, Publish Package, YouTube API, Cloud backup |
| **Studio** | $499/yr | Creator + Team collab (5 seats), client review/approval, cloud render queue, Brand Kit, color grading room, plugin API |
| **Lifetime** | $599 one-time | Creator tier forever (launch window only) |

---

## Project Scoping

### MVP Strategy

**Approach:** Experience MVP — the minimum that makes a creator say *"I didn't know editing software could feel like this."* Not the minimum to test a hypothesis. The minimum to create a genuine fan.

**Resource requirements:** 2–3 engineers (1 Electron/native, 1 React/UI, 1 AI/backend), 1 designer, founder as PM + QA + first user. Timeline: 6–9 months to MLP.

**The MLP gate:** A creator completes a project start-to-finish in Vivido with zero tool switches, in under 40% of their previous workflow time. If this gate isn't met, the MLP does not ship.

### Phase 1 — MLP (Months 1–9)

**Core journeys supported:** Maya (Journey 1 — full path), Arjun (Journey 3 — transcript-first path)

**Must-have capabilities:**
- Native GPU decode + 4K instant playback (VideoToolbox + NVDEC/D3D11VA)
- Timeline: cuts, trims, split, multi-track (video + audio + music)
- Transcript editing (Whisper, background, silent) + word-level edit synced to timeline
- Captions as styled timeline objects
- YouTube-native timeline primitives: Chapters + Shorts markers + End Screen zones
- Audio Room: AI noise removal + EQ presets + LUFS normalization per platform
- Publish Package: main MP4 + Shorts clips (9:16 auto-crop) + thumbnail candidates + chapters.txt
- Style model passive initialization (JSON accumulator, projects 1–4)
- Guest mode (no account required to edit)
- Frictionless account creation at style model "save moment"
- Open JSON project file format, publicly documented
- Supabase Auth + Cloudflare R2 (style model cloud sync on auth)
- Stripe + Razorpay payment processing
- EU AI Act disclosure + AI Trust Settings
- Auto-save every 30 seconds minimum

**Explicitly out of Phase 1:** Recording capture, AI rough cut, color grading room, team collaboration, cloud render queue, mobile, Hook Intelligence, B-roll suggestion.

### Phase 2 — Intelligence Arrives (Months 10–18)

- Recording: screen capture, webcam, multi-track local (Scene Composer: Interview, Tutorial, Podcast, Cinematic modes)
- AI Rough Cut (unlocks at project 5 — uses style model)
- Hook Intelligence (YouTube Analytics API ↔ timeline feedback loop)
- LUT Color Room (creator vocabulary: "Make this cinematic" → channel-matched LUT suggestions; ACES/Log ingestion enabled)
- Advanced Audio Room (multitrack EQ, compression, music/VO presets)
- B-roll suggestion from transcript context (Claude API)
- Web app full timeline editor (browser with WebCodecs + WASM fallback)

### Phase 3 — The Studio (Months 19–30)

- Team collaboration (async, role-based: editor/reviewer/client)
- Client review + approval flows with frame-accurate comments
- Brand Kit per workspace
- Project status dashboard (multi-channel operations)
- Cloud render queue (AWS MediaConvert — native runtime headless)
- Plugin API (third-party integrations, community tools)
- Film & Documentary Mode (90-min+ timeline, ProRes/DCP export, ARRIRAW ingest)

### Risk Mitigation

| Risk | Mitigation |
|---|---|
| Native GPU pipeline underperforms on minimum spec | Test on minimum spec hardware weekly from sprint 1; degrade to 1080p preview if 4K stutters |
| CapCut window closes before MLP ships | Hard deadline: MLP must ship within 9 months; scope cut from Phase 1 before deadline slips |
| Style model passive data insufficient by project 10 | Instrument from day 1; if <3 accurate observations by project 5 in beta, re-evaluate model design before launch |
| Whisper transcription quality below expectation on accented speech | Ship with accuracy indicator; allow manual transcript correction; don't block export on low-confidence transcripts |

---

## Functional Requirements

### Media Import & Playback

- FR1: Creator can import video files (MP4, MOV, MKV, AVI, WebM, R3D, BRAW) via drag-and-drop or file browser without configuration
- FR2: Creator can import audio files (WAV, MP3, AAC, AIFF, FLAC) as standalone tracks
- FR3: Vivido plays imported footage at native resolution with hardware-accelerated decode immediately upon import — no processing required before first frame
- FR4: Creator can scrub through footage at any position with frame-accurate seeking
- FR5: Vivido automatically detects footage resolution, frame rate, color space, and audio sample rate — never asks creator to configure sequence settings
- FR6: Creator can manage a project asset library showing all imported media with thumbnails, duration, and usage status

### Timeline Editing

- FR7: Creator can create a multi-track timeline with at minimum 1 video track, 2 audio tracks (VO + music), and 1 caption track
- FR8: Creator can perform non-destructive cuts, trims, splits, and ripple deletes on timeline clips
- FR9: Creator can add, reorder, and delete clips on the timeline with keyboard shortcut and drag-and-drop support
- FR10: Creator can adjust clip speed (slow motion, time-lapse) non-destructively
- FR11: Creator can apply transitions between clips (cut, dissolve, fade to black minimum)
- FR12: Creator can add title cards and lower-thirds as timeline text objects with style controls
- FR13: Vivido auto-saves the project every 30 seconds minimum with no UI interruption
- FR14: Creator can access version history for the last 30 days and restore any saved state

### Transcript & Caption System

- FR15: Vivido automatically transcribes imported footage using local Whisper inference — running in background, never blocking the UI
- FR16: Creator can edit the project transcript by selecting, deleting, or rearranging words — with all changes reflected in the timeline in real-time
- FR17: Creator can switch between Transcript view and Timeline view within the same project without losing state
- FR18: Creator can style captions (font, size, color, position, background, animation style) once and have the style applied to all captions in the project
- FR19: Creator can export captions as SRT or VTT alongside the video export
- FR20: Vivido detects and highlights low-confidence transcript words for creator review

### Audio Engineering

- FR21: Creator can apply AI-powered noise removal to any audio clip with a single action — no parameters required
- FR22: Creator can apply EQ presets by content type (Voice Only, Voice + Music, Interview, Cinematic) to audio clips or the master output
- FR23: Vivido automatically applies platform-specific loudness normalization (YouTube -14 LUFS, Shorts -13 LUFS, Podcast -16 LUFS) based on the selected export target
- FR24: Creator can adjust audio levels per clip and per track with visual waveform feedback
- FR25: Creator can add background music tracks with automatic ducking when voice is detected
- FR26: Creator can preview audio with normalization applied before export

### YouTube-Native Publishing

- FR27: Creator can add Chapter markers as draggable objects directly in the timeline — previewed in the player as the creator edits
- FR28: Creator can mark Shorts segments in the timeline with in/out points — previewed as a vertical 9:16 frame alongside the main timeline
- FR29: Vivido warns the creator when a Shorts-marked clip is horizontal (16:9) and shows a crop preview before export
- FR30: Creator can add End Screen zones and Info Card timestamps as timeline objects
- FR31: Creator can generate a Publish Package with a single action — outputting: main MP4 with embedded chapter metadata, auto-cropped 9:16 Shorts clips, 3 thumbnail candidate frames, chapters.txt ready for YouTube description
- FR32: Creator can directly upload to YouTube from within Vivido (authenticated via OAuth) including title, description, tags, and chapter injection
- FR33: Creator can share a review link for a project that opens in a browser without Vivido installed

### Recording & Capture (Phase 2)

- FR34: Creator can record full screen, a specific application window, or a custom region
- FR35: Creator can record webcam as a standalone clip or picture-in-picture overlay on screen capture
- FR36: Creator can record screen, webcam, microphone, and system audio as separate, independent tracks simultaneously
- FR37: Vivido writes recording tracks to local disk in real-time — no recording loss on network interruption
- FR38: Creator can select a Scene Composer layout (Interview, Tutorial, Podcast, Cinematic) before recording to automatically arrange multi-source inputs
- FR39: When recording ends, a new project opens automatically with all recorded tracks already placed in the timeline

### Creator Intelligence — Style Model

- FR40: Vivido passively observes creator editing behavior across projects and accumulates a style profile (cut duration patterns, hook length, B-roll ratio, audio treatment, chapter density) without requiring any creator action
- FR41: Vivido surfaces style model observations to the creator after project completion for confirmation or correction
- FR42: Creator can view their style model summary at any time — showing what Vivido has learned about their channel
- FR43: Creator can delete their style model data at any time from account settings
- FR44: Creator can export their style model as a JSON file (data portability)
- FR45: At project 5+, Vivido generates an AI rough cut pre-staging based on the creator's style model — presented for creator review, never auto-applied
- FR46: Vivido connects YouTube Analytics retention data to source timeline positions (Hook Intelligence) and surfaces editing recommendations for the next project (Phase 2)

### Color & Visual (Phase 2+)

- FR47: Creator can apply LUT presets to clips or the entire timeline with real-time preview
- FR48: Creator can access creator-vocabulary color controls ("Exposure," "Warmth," "Cinematic") that map to professional color science parameters
- FR49: Vivido suggests LUT presets matched to the creator's channel visual identity based on style model history
- FR50: Creator can ingest Log/ACES footage with automatic color space detection and apply appropriate transforms

### Workspace, Account & Subscription

- FR51: Creator can use Vivido's full editor without creating an account (guest mode) — style model accumulates locally
- FR52: Creator can create an account with email or OAuth (Google) and sync their style model to the cloud
- FR53: Creator can manage their subscription tier, billing, and payment method from within the app
- FR54: Creator can invite team members to a Studio workspace with role-based permissions (Editor, Reviewer, Client) — Phase 3
- FR55: Agency lead can create Brand Kits per client workspace with logos, color palettes, templates, and approved assets — Phase 3
- FR56: Agency lead can view a project status dashboard across all managed channels — Phase 3
- FR57: Reviewer/client can access a project review link in a browser, add frame-accurate comments, and approve or request changes — Phase 3

### Support & Operations

- FR58: Support staff can access creator project metadata (not raw footage) with creator consent for troubleshooting
- FR59: Vivido surfaces in-app feedback and bug reporting with automatic project metadata attachment (with creator consent)
- FR60: Creator can opt in or out of anonymous product analytics from privacy settings at any time

---

## Non-Functional Requirements

### Performance

- **4K scrubbing:** Hardware-accelerated decode (24/30/60fps) on minimum spec. Software decode fallback for 1080p only — 4K requires hardware decode.
- **Import to first frame:** <3 seconds from file drop to first frame on minimum spec (MP4/H.264).
- **Whisper transcription:** <10% of audio duration (10-min audio: <60 seconds) on minimum spec using base.en model.
- **Audio processing:** AI noise removal + LUFS normalization in <5% of audio duration on minimum spec.
- **Export:** Publish Package at ≥2× real-time (10-min video exports in <20 min on minimum spec).
- **UI responsiveness:** All editing interactions (cuts, trims, scrub, transcript edits) respond in <100ms — no operation blocks the UI thread.
- **Auto-save:** Background write with no perceptible UI impact (<50ms project file write).

### Security

- **Transport:** TLS 1.3 minimum for all network communication
- **At rest:** AES-256 encryption for all creator data in Supabase; R2 objects private by default with signed URL access
- **Electron hardening:** contextIsolation enabled, nodeIntegration disabled, sandbox enabled, no remote module, CSP enforced in renderer
- **IPC security:** All renderer↔native runtime messages validated against typed schemas; no eval or dynamic code execution
- **Credential handling:** No API keys or credentials ever stored in the renderer process; Stripe/Razorpay card data never touches Vivido servers
- **Creator data isolation:** No creator can access another creator's project data, style model, or media files

### Scalability

- **User growth:** Architecture supports 10× user growth (100K creators) with <10% performance degradation on server-side components (Supabase, R2, Vercel)
- **Style model data:** Supabase schema designed to support per-creator style model records for 1M+ creators without query degradation
- **Cloud render queue:** AWS MediaConvert scales horizontally — no concurrency limit imposed at architecture level
- **CDN:** Vercel + Cloudflare handle static asset delivery globally with <100ms TTFB in primary markets (India, US, Europe)

### Reliability

- **Offline-first core:** Cuts, trims, transcript editing, audio processing, and local export function with zero network connectivity
- **Recording data integrity:** Recording tracks written to disk in real-time — no frame loss on network interruption during capture
- **Project file durability:** Auto-save uses atomic write (write to temp, rename on success) — no partial saves
- **Crash recovery:** On unexpected exit, Vivido restores the last auto-saved state on next launch with no data loss beyond the last 30-second auto-save window
- **Update safety:** Auto-updates install on next launch — never interrupt an active session or export

### Accessibility

- **Keyboard navigation:** All primary editing operations (cuts, trims, play/pause, chapter marking, Shorts marking, export trigger) accessible via keyboard shortcuts
- **Keyboard discoverability:** Shortcut reference accessible in-app at all times (? key or Help menu); contextual shortcut hints shown in UI on hover
- **Color contrast:** UI meets WCAG AA minimum (4.5:1 contrast ratio) for all text and interactive elements
- **Screen reader:** Core project management UI (project library, account settings, subscription management) compatible with VoiceOver (Mac) and NVDA (Windows)
- **Reduced motion:** Respects OS-level reduced motion preference for UI animations

### Integration Reliability

- **YouTube API:** Graceful degradation on quota exhaustion — show cached data, queue refresh, never fail silently. Upload retry with exponential backoff on transient failures.
- **Whisper offline:** Local inference only — zero dependency on external transcription APIs. Never fails due to network conditions.
- **Payment resilience:** Stripe webhook retry handling for subscription state sync; Razorpay fallback available for India creators if Stripe fails
- **Supabase:** Real-time sync failures degrade gracefully to periodic polling; local project file is always the source of truth — cloud sync is additive, not blocking

