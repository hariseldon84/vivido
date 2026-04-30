# Vivido — Vision, Users & Strategy

**Status:** Approved

---

## Why We're Building This

**The problem is real and the founder has lived it.**
Riverside for recording → Final Cut for editing → Submagic for captions → VidIQ + YouTube Studio for publishing. Every project starts from zero. No tool accumulates knowledge about how a specific creator edits. Switching cost is 30–60 minutes per video for a simple creator, hours for an ambitious one.

**The market window is open.**
CapCut's January 2025 US ban displaced 264M+ users. No dominant replacement has emerged 15+ months later. The 18–24 month window closes around mid-2026. Vivido must have an MLP in creators' hands before that window shuts.

**The FCP complaint is the wedge.**
Multiple independent creators said unprompted: "FCP is too complex and it's Mac-only." Same complaint, different people. Not coordinated. That's signal. The wedge: **pro-enough editing for ambitious creators who want FCP-grade outcomes without FCP-grade complexity or Apple lock-in.**

**The moat is not features. It's switching cost compounded by accumulated editorial history.**
No competitor accumulates creator-specific intelligence across sessions. The moat has two layers:
1. **Switching cost** — 20+ projects of calibrated style history that no competitor can import.
2. **Legal layer** — Patent #1 protects the per-creator style model algorithm. Moat activates at project 5; switching cost becomes prohibitive at project 20+.

**Founder's unfair advantage:** Trained filmmaker + director + cinematographer + video editor building the tool he needs. Most founders have domain expertise or technical capability. This founder has both.

---

## Executive Summary

Vivido is an AI-native, OS-level video creation platform for YouTube creators, independent filmmakers, and agency/brand teams. It eliminates the 7-tool creator workflow — replacing Premiere, Opus Clip, Submagic, Riverside, iZotope RX, Loom, and the manual YouTube Studio post-export process — with a single native desktop application designed as a platform from day one.

Every existing video editor treats every project as day one. Vivido is the first editor that learns. A per-creator style model accumulates across every project — hook structures, cut rhythms, B-roll patterns, audio treatment, pacing — and compounds into a creative intelligence that pre-stages rough cuts, suggests chapters, and identifies Shorts opportunities in the creator's own editorial voice.

---

## Target Users

### Primary: The Founder
Trained filmmaker + solo YouTube creator living the Riverside → FCP → VidIQ → YouTube Studio loop daily. First validator. Build so he can replace his own stack completely.

### Primary: Maya — The CapCut Refugee
28, Windows laptop, 45K subscribers, tech explainer channel. Premiere trial expiring, Submagic ($30/mo), Canva ($15/mo), YouTube Studio. Every video takes 4 hours longer than CapCut. Growth stalled.

### Primary: The "FCP for Windows" Creator
Ambitious creator. Wants FCP-grade output. Not on Mac. Intimidated by DaVinci. Priced out of Premiere ($660/yr). Vivido is the obvious answer.

### Primary: The Aspiring Filmmaker
Domain expert (the story), not a software expert (the tools). Sitting on raw footage for months because every NLE's opening dialog stopped them. Transcript-first interface is the first editing surface they can navigate without a manual.

### Secondary (Stage 3): Agency/Brand Team Lead
Running 5–8 YouTube channels. Multi-workspace, role-based access, client approval flows.

### Not Building For (MLP)
Educators, enterprise B2B, Loom-replacement buyers, casual TikTok creators (short-form only).

---

## Platform

**Windows + Mac ship simultaneously at MLP.** FCP's Mac exclusivity is the wedge.

| Platform | Build | Priority |
|---|---|---|
| Windows 10/11 (x64) | Build 19041+ | P0 — ships first in CI/CD priority |
| macOS 13+ (arm64 + x64) | Universal binary | P0 — ships with Windows |
| Linux (Ubuntu 22.04+) | AppImage | P2 — revisit at 10K users |
| Web (Chrome 120+, Edge 120+) | Web companion only at MLP | P1 — sync/account/review |

**React Native companion:** 3–6 months post-MLP. No local video encoding on mobile — all heavy compute routes to desktop or AWS MediaConvert.

---

## Pricing

| Tier | Price | Key Entitlements |
|---|---|---|
| **Free** | $0 forever | Full editor, unlimited projects, local render, manual captions. No AI. No watermarks. No Publish Package. No style model cloud sync. |
| **Creator** | $199/yr | Free + Whisper captions, AI noise removal, Audio Room, Style Model sync, AI rough cut (project 5+), Shorts auto-crop, Publish Package, YouTube API upload, Cloud backup |
| **Lifetime** | $599 one-time | Full Creator tier forever. All future updates. Launch window only — closes at 500 conversions or 90 days post-launch. |
| **Studio** | $499/yr | Creator + Team workspaces (5 seats), client review/approval, cloud render queue, Brand Kit, color grading room, plugin API (Stage 3) |

**Free tier is unlimited projects with full manual editing.** Conversion happens through AI feature exposure (AI badge on locked features), not project limits.

**Positioning:** Above free (CapCut tier), below Premiere ($660/yr). The $199 Creator tier replaces $1,500–2,000/yr in current tool spend.

---

## Innovation Claims

### 1. Per-Creator Compounding Editorial Intelligence *(Patent #1)*
No video editor accumulates creator-specific style data across sessions. Every system is stateless per project. Vivido's style model is the first application of per-creator ML personalization to editorial decision-making — not content classification (what's in the video) but editorial style (how a specific human edits).

### 2. YouTube-Native Timeline Primitives *(Patent #2)*
Every existing NLE treats YouTube metadata as export concerns. Vivido treats them as first-class creative objects in the timeline — draggable, previewable, exported as part of the project.

### 3. Cross-Project Hook Intelligence *(Patent #3)*
The feedback loop between post-publish analytics and pre-publish editing decisions doesn't exist in any tool. VidIQ gives you analytics after publishing. FCP gives you a timeline before publishing. Nothing connects them.

### 4. Dual-Runtime Headless-Capable Compute Layer *(Architecture)*
The native runtime is host-agnostic from day one: today Electron, tomorrow headless cloud render worker, the day after on-device ML inference on Apple Silicon.

---

## Patent Portfolio

| # | Name | Filing Window | Status |
|---|---|---|---|
| #1 | Per-Creator Compounding Editorial Style Model | Before any public demo | File immediately |
| #2 | YouTube-Native Timeline Primitives | Within 12 months of MLP launch | Post-MLP |
| #3 | Cross-Project Hook Intelligence | Before any public demo | File immediately |
| #4 | Adaptive Audio Normalization per Platform | Within 18 months of MLP launch | Stage 2 |
| #5 | AI Rough Cut Pre-Visualization from Style Model | Within 18 months of Stage 2 launch | Stage 2 |

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

## The 4 MLP Features

All 4 are required. None alone is sufficient.

### 1. Native GPU Decode + 4K Instant Playback
VideoToolbox (Mac) + NVDEC/D3D11VA (Windows). No WASM fallback for the preview canvas. This is the jaw-drop moment.

### 2. YouTube-Native Timeline
Chapters, Shorts markers, and End Screen zones as draggable first-class timeline objects. Export generates: `chapters.txt`, Shorts clips (pre-cropped 9:16), End Screen timestamps.

### 3. Whisper Transcript Editing
Background transcription begins on footage import. Word-level edit synced to timeline. Filler word detection + one-click removal. Whisper Large v3 local inference. No data sent externally.

### 4. Audio Room + Publish Package
AI noise removal, parametric EQ, LUFS normalization. One-click Publish Package: main MP4 + Shorts + thumbnail candidates + `chapters.txt` + `captions_en.srt`.

---

## What MLP Explicitly Does NOT Include

| Feature | Phase |
|---|---|
| Screen/webcam recording | Stage 2 |
| AI rough cut | Stage 2 |
| Hook Intelligence | Stage 2 |
| LUT color grading room | Stage 2 |
| B-roll suggestion (Claude API) | Stage 2 |
| Web app full timeline editor | Stage 2 |
| Team collaboration / client review | Stage 3 |
| Cloud render queue (AWS MediaConvert) | Stage 3 |
| React Native mobile companion | Post-MLP |
| Linux support | Post-MLP |

**The rule:** if a creator needs it to finish their first YouTube video, it's MLP. If it's nice-to-have, it's Stage 2.
