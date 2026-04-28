# PRD Comparison: prd-new.md (v1) vs BMAD PRD
**Compared:** `prd-new.md` (v1 — gstack-review-inspired) vs `_bmad-output/planning-artifacts/prd.md` (BMAD v1 — full process output)
**Date:** 2026-04-27

---

## What prd-new.md Adds (New in V1)

These sections and decisions exist in `prd-new.md` but are absent or only lightly touched in the BMAD PRD.

### 1. Strategic "Why" Section — Founder Voice
prd-new.md opens with a direct, personal statement of why Vivido exists: the FCP complaint as a design brief, the CapCut window framing, and the founder's lived experience. The BMAD PRD has an Executive Summary but it reads as product marketing copy. prd-new.md reads like a build brief written by the person doing it.

### 2. Validation Prototype Gate — Before Electron
prd-new.md explicitly defines a 2–4 week validation prototype step (transcript editing + Publish Package only, no GPU timeline) that must happen before any Electron code is written. There's a binary gate: 3 of 5 specific creators must say "I'd pay for this today" before proceeding to full MLP scope.

The BMAD PRD mentions a validation prototype in passing in one line. prd-new.md makes it a hard gate with clear success criteria, a named approach, and a sprint placement.

### 3. Approach B Decision — Formally Locked
prd-new.md opens with `Approach: B — Desktop MLP (Windows + Mac) → React Native companion 3–6 months post-MLP` as a frontmatter-level decision. The tradeoffs (XL effort, shared component library, mobile compute routes to desktop or AWS) are explicit.

The BMAD PRD doesn't name this as Approach B. It's implied but never formally locked as a decision with tradeoffs stated.

### 4. React Native Companion — Scoped and Constrained
prd-new.md specifies what the RN companion does and, critically, what it doesn't: project sync, remote clip review, Shorts preview, push to YouTube — but **no local video encoding on mobile**. All heavy compute stays on desktop or routes to AWS MediaConvert.

The BMAD PRD mentions mobile/React Native as a future consideration but never locks the scope or the compute constraint.

### 5. Style Model — 4-Stage Activation Curve
prd-new.md has a table showing exactly what the style model does at each stage: projects 1–4 (silent accumulation), 5–9 (first surface to creator), 10–19 (active assistance), 20+ (deep personalization, churn approaches zero). Each stage has a specific behavior and creator-facing outcome.

The BMAD PRD describes the style model in prose but doesn't map stage → behavior → creator outcome in a single scannable table.

### 6. Sprint-Level Build Order
prd-new.md lays out 18 sprints with specific deliverables per 2-week block, from Electron shell (sprint 1–2) through signed/notarized builds (sprint 17–18). This is an actual build plan, not a feature list.

The BMAD PRD has phases (1–3) but no sprint breakdown.

### 7. Design System Lock — Explicit References
prd-new.md explicitly states the design system is locked and points to `_designs/design-guidelines.md` and the 4 app UI screens as the authoritative reference. It includes a "10-second version" of the design system for quick orientation.

The BMAD PRD mentions "12 Vivido Design Laws" and "color speaks creator language" but has no design system specification or reference to any locked visual reference.

### 8. Linux Deferred Explicitly
prd-new.md says "Linux: Not at MLP — revisit at 10K users." Clear, unambiguous, with a trigger condition.

The BMAD PRD lists Linux as P2 in a platform table but doesn't give a condition for when it becomes relevant.

### 9. Open Questions Table — Blocking Specific Work
prd-new.md has 6 named open questions, each tagged with what it blocks (e.g., "RN monorepo: Nx vs Turborepo → blocks companion app start"). Each has an owner.

The BMAD PRD has no open questions section.

### 10. Office Hours Quotes — The "Why You" Section
prd-new.md ends with the key quotes from the gstack office hours review: the FCP professional who only uses basic features, the conviction about mobile, the "both halves of the unfair advantage" observation. This section makes the PRD a living document that explains the founder's motivation, not just the product's features.

The BMAD PRD doesn't have this.

---

## What prd-new.md Is Missing (Present in BMAD PRD, Absent in V1)

These are in the BMAD PRD but need to be added to (or referenced from) prd-new.md to make it complete.

### 1. FR1–FR60 — Full Functional Requirements List
The BMAD PRD has 60 granular functional requirements, from `FR1: import MP4 via drag-and-drop` to `FR60: creator can opt out of analytics`. These are the acceptance criteria for engineers. Without them, prd-new.md is a product strategy doc, not a complete PRD.

prd-new.md describes what features do in prose and user journeys. That's good for alignment but not sufficient for scoping sprints or writing tests.

### 2. User Journeys 2, 4, and 5 — Ravi, Jess, Support
prd-new.md covers Maya (Journey 1) and Arjun (Journey 3) and a compressed version of Jess (Journey 4). It drops:
- **Journey 2 (Ravi — Agency Studio Lead):** The $121/mo → $41.58/mo calculation, the wrong-version incident, the multi-channel project dashboard. This is the Studio tier user — needed before Stage 3 features are specced.
- **Journey 5 (Support Operations):** The Shorts aspect ratio bug scenario, creator consent model for support metadata access. This surfaces the crop-preview-before-export requirement and the support read-only access design.

### 3. Patent Portfolio — All 5 Patents
prd-new.md covers Patents #1 and #3 (style model + hook intelligence). The BMAD PRD has 3 more:
- **Patent #2 (YouTube-Native Timeline Primitives):** File within 12 months of MLP
- **Patent #4 (Adaptive Audio Normalization per Platform):** LUFS per-platform automated targeting — file within 18 months
- **Patent #5 (AI Rough Cut from Style Model):** Generative rough cut staging — file within 18 months of Stage 2

prd-new.md says "patent #1 and #3 before public demo" but doesn't name the full portfolio or filing windows for the others.

### 4. Freedom-to-Operate Review — Descript Patent Risk
The BMAD PRD explicitly calls out the Descript transcript-editing patent conflict as a risk requiring FTO review before MLP launch. This is a real legal blocker. prd-new.md doesn't mention it.

### 5. Granular Non-Functional Requirements
The BMAD PRD specifies:
- `<100ms` for all editing interactions (UI thread)
- `<50ms` for auto-save background write
- `<3 seconds` from file drop to first frame
- `<5%` of audio duration for noise removal + LUFS
- Atomic save (write-to-temp, rename-on-success)
- Crash recovery with zero data loss beyond last 30-second window
- Recording tracks written to disk in real-time, no frame loss on network interruption

prd-new.md has the headline numbers (4K instant, Whisper < 10% duration, export < 2× realtime) but not these engineering-level targets.

### 6. Accessibility Requirements
The BMAD PRD requires:
- WCAG AA (4.5:1 contrast ratio) for all text
- VoiceOver (Mac) + NVDA (Windows) screen reader compat for project management UI
- OS-level reduced motion respected
- Keyboard discoverability: `?` key opens shortcut reference

prd-new.md has no accessibility section.

### 7. Electron Security Hardening Spec
The BMAD PRD lists the required Electron security configuration: `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, no remote module, CSP configured for renderer, IPC validated against typed schemas. These need to be in a security checklist somewhere — currently missing from prd-new.md.

### 8. Subscription Entitlements Detail — Free Tier Difference
The BMAD PRD specifies Free tier includes: full editor, unlimited projects, local render, manual captions, **no AI features**, no watermarks. This matters for the conversion funnel design — creators can use the full manual workflow forever on free. prd-new.md's Free tier says "up to 3 projects" — this is a conflict that needs resolving.

### 9. Project File Format Spec
The BMAD PRD specifies: `.vivido` extension, open JSON, schema published at `vivido.app/schema`, semantic versioning, automatic migration on open with original backup, contents list (never embeds raw media). prd-new.md mentions "open JSON project format" without this detail.

### 10. Platform-Specific Default Paths
The BMAD PRD specifies default storage: `~/Movies/Vivido/` on Mac, `%USERPROFILE%\Videos\Vivido\` on Windows, plus OS file associations and dock/taskbar integration. prd-new.md doesn't cover this.

### 11. Web App Scope at MLP
The BMAD PRD specifies what the web app does at MLP: account management, project library view, style model visualization, subscription management, shared review links. Full timeline editing in browser is Stage 2. It also specifies the `usePlatform()` hook architecture for routing compute to native vs WASM.

prd-new.md doesn't define the web app scope at MLP.

### 12. Detailed Risk Mitigation Tables
The BMAD PRD has three risk tables (domain requirements, innovation risks, scoping risks) covering: EU AI Act non-compliance, YouTube quota exhaustion, FFmpeg GPL contamination, style model cold start, Descript FTO, Stripe India friction, native GPU underperformance on minimum spec. prd-new.md has none of these risk tables.

### 13. Scalability Requirements
The BMAD PRD specifies server-side scalability: 10× growth to 100K creators with <10% performance degradation, 1M+ creator style model records without query degradation, AWS MediaConvert horizontal scaling. prd-new.md doesn't address scalability targets.

### 14. Integration Requirements Table
The BMAD PRD has a full integration table: Supabase Auth, Supabase DB, Cloudflare R2, YouTube Data API, Stripe + Razorpay, Whisper.cpp, Claude API, Liveblocks (Stage 3), AWS MediaConvert — each with purpose and required-for phase. prd-new.md lists the tech stack but not the integration table in this format.

### 15. Privacy by Design — What Style Model Never Stores
The BMAD PRD explicitly states: style model stores behavioral metadata only (cut durations, clip counts, audio flags) — **never video content, transcripts, or PII about subjects in videos**. Transcript cloud sync is opt-in. This is a critical privacy guarantee that prd-new.md doesn't state explicitly.

---

## Summary Comparison Table

| Section / Decision | BMAD PRD | prd-new.md (V1) | Status |
|---|:---:|:---:|---|
| **Strategic "Why" — founder voice** | Partial (exec summary) | ✅ Full | New in V1 |
| **Validation prototype gate** | 1 line | ✅ Full gate with criteria | New in V1 |
| **Approach B locked (Desktop MLP + RN)** | Not named | ✅ Frontmatter decision | New in V1 |
| **React Native companion scope + constraints** | Vague | ✅ Scoped + no-mobile-encode rule | New in V1 |
| **Style model 4-stage activation table** | Prose | ✅ Stages 1–4 with behaviors | New in V1 |
| **Sprint-level build order (18 sprints)** | Phase list only | ✅ Sprint breakdown | New in V1 |
| **Design system reference (locked screens)** | None | ✅ Design guidelines + 4 screens | New in V1 |
| **Linux deferred with trigger condition** | P2, no condition | ✅ Revisit at 10K users | New in V1 |
| **Open questions table (6, with owners)** | None | ✅ 6 questions with blockers | New in V1 |
| **Office hours quotes / founder motivation** | None | ✅ 4 key quotes | New in V1 |
| **FR1–FR60 functional requirements** | ✅ 60 requirements | ❌ Missing | Missing from V1 |
| **Journey 2 (Ravi — agency)** | ✅ Full journey | ❌ Missing | Missing from V1 |
| **Journey 4 (Jess — mobile-native)** | ✅ Full journey | Compressed | Needs expansion |
| **Journey 5 (Support Operations)** | ✅ Full journey | ❌ Missing | Missing from V1 |
| **Patent portfolio (all 5 patents)** | ✅ 5 patents + timelines | Partial (#1 + #3 only) | Missing #2, #4, #5 |
| **Descript FTO review risk** | ✅ Named risk | ❌ Missing | Missing from V1 |
| **Granular NFRs (<100ms, <50ms, etc.)** | ✅ Engineering-level | Headline numbers only | Needs detail |
| **Accessibility (WCAG AA, VoiceOver, NVDA)** | ✅ Full section | ❌ Missing | Missing from V1 |
| **Electron security hardening spec** | ✅ Full checklist | ❌ Missing | Missing from V1 |
| **Free tier entitlements (unlimited projects)** | ✅ Unlimited projects | ❌ Conflicts (3 projects) | Needs resolution |
| **Project file format spec + schema URL** | ✅ Full spec | Partial | Needs detail |
| **Default storage paths (Mac + Windows)** | ✅ Named paths | ❌ Missing | Missing from V1 |
| **Web app scope at MLP** | ✅ Defined | ❌ Missing | Missing from V1 |
| **Risk mitigation tables (3 tables)** | ✅ Full | ❌ Missing | Missing from V1 |
| **Scalability targets (100K, 1M records)** | ✅ Full | ❌ Missing | Missing from V1 |
| **Integration requirements table** | ✅ Full | Tech stack only | Needs detail |
| **Privacy by design — what style model never stores** | ✅ Explicit | ❌ Missing | Missing from V1 |
| **Innovation section (4 novel patterns)** | ✅ Full | Distributed in prose | Optional |
| **12 Vivido Design Laws (full list)** | ✅ Full list | ✅ Full list | Both have it |
| **MLP 4-feature rationale** | ✅ | ✅ Stronger in V1 | Both, V1 better |
| **User journeys (Maya + Arjun)** | ✅ | ✅ | Both have it |
| **Pricing model** | ✅ | ✅ | Both, similar |
| **Tech stack table** | ✅ | ✅ | Both have it |
| **Platform support (Win + Mac)** | ✅ | ✅ | Both have it |
| **Phase 1/2/3 roadmap** | ✅ | ✅ | Both have it |
| **Style model GDPR / right to erasure** | ✅ Full | Partial | V1 lighter |
| **Recording consent laws (13 states)** | ✅ Named states | Stage 2 note only | Missing detail |
| **YouTube API terms compliance** | ✅ Full | Partial | V1 lighter |
| **FFmpeg licensing (dynamic link rule)** | ✅ Full | Mentioned | V1 lighter |

---

## Recommended Next Step

prd-new.md is the better strategy document. It's more opinionated, better ordered for builders, and has decisions the BMAD PRD lacked (Approach B, sprint plan, design system lock, validation gate).

The BMAD PRD is the more complete specification document. It has 60 functional requirements and the engineering-level NFRs that prd-new.md doesn't.

**The practical path:** Use prd-new.md as the live working PRD. Pull FR1–FR60 from the BMAD PRD into a separate `functional-requirements.md` and reference it from prd-new.md. Resolve the Free tier conflict (unlimited projects vs 3 projects). Add the Descript FTO note to open questions. The two documents together are stronger than either alone.
