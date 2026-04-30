# Build Order & Sprint Plan

---

## Pre-Sprint 0 — Legal + Validation Gate (Weeks 0–4, Founder Solo)

**All three items must complete before any code is shown to creators. Run in parallel.**

| Item | Gate |
|---|---|
| Descript FTO review | Clears FR15–FR17 before validation prototype is built |
| Patent provisional #1 — Per-Creator Style Model | Filed before any creator sees the prototype |
| Patent provisional #3 — Cross-Project Hook Intelligence | Filed before any creator sees the prototype |
| Validation creator recruitment (5 confirmed) | 5 yes commitments secured before prototype build begins |

**Cost estimate:** FTO review $3,000–8,000. Provisional filings $2,000–4,000 each. Engage counsel immediately.

---

## Validation Prototype — Weeks 4–8 (Founder Solo)

Build: transcript editing + creator presets + Publish Package. No GPU timeline. No Audio Room. Stripped-down UI — functional, not the full MLP design system.

Show to **5 specific creators**. Have them use it on 3 real videos each.

**Gate criteria:**
- ≥ 3 of 5 say "I'd pay for this today" → demand confirmed, proceed to full MLP, begin hiring
- They say it feels unserious without GPU playback → jaw-drop confirmed as necessary, full MLP scope justified
- All 5 have different frustrations → narrow target user before building

**Telemetry (local-only, opt-in, no cloud send):**
- Sessions started
- Transcript edits made (word deletions)
- Publish Package exports completed
- Session duration

---

## Phase 1: MLP — Months 2–11 (Founder + 1–2 Engineers Post-Validation)

| Sprint | Epic | Deliverable |
|---|---|---|
| 1–2 | E1 Foundation | Electron shell + React + Vite. Project file format spec. EU AI Act disclosure + AI Trust Settings scaffold. IPC contracts + CI gate. Electron hardening. |
| 3–4 | E2 Media | FFmpeg native subprocess. VideoToolbox (Mac) + NVDEC (Windows) GPU decode. 4K playback working. Software decode fallback (FR-61). Hardware decode validated on minimum spec. |
| 5–6 | E4 Transcript | Whisper.cpp background transcription on import. First-launch model download flow (FR-62–FR-66). Multi-language (FR-WL1). Filler word detection. Confidence scoring. |
| 7–8 | E3 Timeline | Timeline: cuts, trims, splits, multi-track (2 video + 2 audio + caption). Clip drag, snap, playhead. Keyboard shortcuts. Virtual scrolling (500+ clips). |
| 9–10 | E6 Publish (Part 1) | YouTube-native primitives: Chapter markers, Shorts markers, End Screen zones as first-class timeline objects. Shorts crop preview + horizontal source warning. |
| 11–12 | E5 Audio Room | AI noise removal, parametric EQ, compression, per-platform LUFS normalization. Stereo metering. Platform pass/warn/fail readouts. |
| 13–14 | E6 Publish (Part 2) | Publish Package: main MP4 + Shorts 9:16 crops + 3 thumbnail candidates + `chapters.txt` + `captions_en.srt`. One-click export. Render progress UI + cancel + background render. |
| 15–16 | E7 + E8 | Guest mode wired. Supabase Auth + Cloudflare R2. Style model passive init (JSON accumulator, projects 1–4). Frictionless account creation at "save style" moment. Referral program. Product Hunt page. Community presence. |
| 17–18 | — | Windows + Mac simultaneous signed/notarized builds. GitHub Actions CI/CD. `electron-updater` delta patching. FFmpeg GPL CI gate. EU AI Act disclosure complete. Descript FTO cleared. |

**MLP gate before public launch:** A creator completes a project start-to-finish in Vivido with zero tool switches, in < 40% of their previous workflow time.

---

## Phase 2: Growth — Months 10–18

See [stage2-ai-features.md](stage2-ai-features.md) and [stage2-recording.md](stage2-recording.md).

Key features:
- Recording (screen/webcam, kills Riverside/Loom)
- AI Rough Cut (unlocks at project 5 style model data)
- Hook Intelligence (YouTube Analytics → timeline)
- LUT Color Room
- B-roll suggestion (Claude API)
- React Native companion app
- FCP XML importer

**Phase 2 gate:** 1,000 active weekly creators, $50K ARR, style model data from ≥ 5,000 completed projects.

---

## Phase 3: Platform — Months 18–36

See [stage3-studio.md](stage3-studio.md).

Key features:
- Team Collaboration (async role-based editing, client review)
- Full Color Grading Room (DaVinci-grade)
- Cloud Render Queue (AWS MediaConvert)
- Plugin API
- Film & Documentary Mode (90-min+ timeline)
- Patent Licensing

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
- NPS ≥ 60
- $50K ARR
- Style model surfaces ≥ 3 accurate observations by project 5

### 12 Months Post-MLP
- 10,000 active weekly creators
- $500K ARR
- ≥ 500 Lifetime ($599) conversions in launch window
- ≥ 20% of new users self-report coming from CapCut or no current editor
- Patents #1 + #3 provisionals filed

### The Moat Metric
**Zero creators who have completed 20+ projects in Vivido have churned.**

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| EU AI Act non-compliance at launch | AI Trust Settings + disclosure built from sprint 1 |
| CapCut window closes before MLP ships | Hard deadline: 9 months from validation gate pass. Scope cut before deadline slips. |
| Descript transcript-editing patent conflict | FTO review completed in Pre-Sprint 0. Legal blocker if unresolved. |
| Native GPU pipeline underperforms on min spec | Test from sprint 3. Software decode fallback (FR-61) activates — creator sees "Performance mode," not crash. |
| Style model cold start | Instrument from day 1 in beta. If < 3 accurate observations by project 5, re-evaluate before launch. |
| Whisper accuracy on accented speech | Confidence indicator. Manual correction. Never block export on low confidence. |
| YouTube API quota exhaustion | Per-creator quota tracking, graceful degradation, 30-day cache. |
| FFmpeg GPL contamination | CI/CD gate blocks release on detection. |
| Style model data loss pre-auth | Local backup to OS app data dir. Cloud sync prompt after project 1 completion. |
| Recording consent legal exposure (Stage 2) | Jurisdiction detection + non-dismissible consent notice. Legal review before Stage 2 ships. |
| Stripe India RBI friction | Razorpay as India primary. Both paths tested before launch. |
| Open-source style model replication | Patents #1 + #3 filed before replication is possible. Data is the moat; patents are the legal layer. |

---

## Next Actions — This Week

**1. Engage IP counsel.**
FTO review (Descript) + provisional filings for Patent #1 and #3. Budget: $7K–16K total. Nothing else starts before this is confirmed.

**2. Name 5 validation creators.**
Apply the recruitment criteria. Warm intros first. Target: 5 yes commitments within 2 weeks.

**3. Start building in public.**
Record the first YouTube video: "I'm building the video editor I've always needed." Use current toolchain. First episode doesn't need Vivido — it needs the founder's voice and the story.

*The sprint clock starts when patent filings are confirmed and creators are scheduled. Not before.*
