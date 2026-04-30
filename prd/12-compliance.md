# Compliance & Regulatory

---

## EU AI Act (Full enforcement: August 2026)

**This is an MLP blocker. No EU creator uses Vivido until this is in place.**

- All AI-generated or AI-assisted output must include disclosure — creator informed when AI made a decision affecting their content.
- AI Trust Settings required per-user: creators can opt out of any AI feature individually without losing access to manual alternatives.
- No AI feature may auto-apply without explicit creator action — suggestions shown, application requires deliberate creator decision.
- C2PA-compatible provenance metadata on export configurable for EU distribution (off by default).

**Implementation:** AI disclosure scaffold and AI Trust Settings built from sprint 1. The `<AIBadge>` component (E1 — Foundation) enforces the disclosure rule at the component level. Every AI feature uses this component.

---

## GDPR / CCPA

- Style model data is personal data under GDPR: explicit consent at collection, right to erasure, data portability (export as JSON), processing transparency.
- Video footage and project files are creator-owned — raw footage never leaves creator's machine unless they explicitly initiate cloud upload.
- **Cloud data retention:**
  - Supabase style model metadata: retained while account active
  - R2 rendered outputs: deleted after 90 days unless extended storage opted in
  - 30-day version history
- **CCPA deletion cascade (within 30 days):** Supabase auth record + style model + project metadata + R2 objects.
- Desktop app collects no analytics without opt-in (FR60).

---

## Recording Consent Laws (Stage 2)

Relevant when recording feature ships — not an MLP concern.

- 13 US all-party consent states (CA, CT, FL, IL, MD, MA, MI, MT, NV, NH, OR, PA, WA): jurisdiction-appropriate consent notice displayed when recording is initiated.
- Remote guest recording: each guest receives and acknowledges recording consent before capture; consent record stored with project metadata.
- Disclosure UI must be localizable for EU, UK, Canada, and Australia requirements.
- Legal review required before Stage 2 recording feature ships.

---

## YouTube API Terms

- API quota management required for Hook Intelligence (10,000 units/day default per project).
- **Prohibited:** using API data to build competing recommendation systems; storing API data beyond 30-day cache window.
- YouTube OAuth upload scope requires manual Google review — **apply before launch.** Lead time: weeks to months. Do not leave this until sprint 17.
- API credentials stored server-side (Supabase Edge Function) — never exposed to client.

---

## FFmpeg Licensing

FFmpeg is LGPL with optional GPL components. Getting this wrong triggers GPL obligations on the entire app.

**Rules:**
- Dynamic linking only — static linking with H.264/AAC triggers GPL obligations.
- H.265/HEVC: use OS-native encoders (VideoToolbox/NVENC) — not open-source HEVC encoders.
- AAC: use libavcodec native AAC (LGPL) or OS-native CoreAudio/MediaFoundation — not FDK AAC (GPL).
- **CI/CD gate:** validates FFmpeg build flags, blocks release if GPL components detected. This gate is in place from sprint 3 (when FFmpeg integration begins).

---

## Descript Patent Risk (FTO Required)

Descript holds patents in transcript-synced video editing. FR15–FR17 (Whisper background transcription + word-level transcript edit synced to timeline) must clear a Freedom-to-Operate review before the validation prototype is built.

**Status:** Must be initiated in Pre-Sprint 0, not sprint 17. See [14-build-order.md](14-build-order.md) and Open Question #3 in [16-open-questions.md](16-open-questions.md).

**Cost estimate:** FTO review $3,000–8,000. Engage IP counsel immediately.
