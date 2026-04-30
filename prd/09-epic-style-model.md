# Epic E7 — Style Model

**Sprint:** 15–16 (infra + passive init fully wired; UI surfaces after project 5)
**Status:** NOT STARTED
**Depends on:** E1 (Foundation — passive init scaffold from sprint 1), E8 (Auth — cloud sync requires account)
**Blocks:** Nothing at MLP — style model is additive

---

## What This Is

The moat. The reason a creator who has used Vivido for 20+ projects will never leave. No competitor — FCP, Premiere, DaVinci, Descript — accumulates creator-specific intelligence across sessions. The style model is Vivido's primary switching-cost engine.

**Phase by project count:**

| Projects | State | What Vivido Does |
|---|---|---|
| 1–4 | Passive initialization | Silent JSON accumulator. Observes: cut frequency, average clip duration, caption density, B-roll patterns, audio treatment choices, hook length, Shorts cadence. No UI. No creator action needed. |
| 5–9 | First surface | Shows creator 3 observations about their editing style. Requires confirmation — not assumed correct. No auto-suggestions yet. |
| 10–19 | Active assistance | Pre-stages rough cut suggestions, auto-marks chapter boundaries, flags Shorts sections — in the creator's editorial voice. Presented for review, never auto-applied. |
| 20+ | Deep personalization | Switching cost is prohibitive. The style model holds 20+ projects of calibrated editorial history. Rebuilding that in a competitor costs the creator 6+ months of rework. Churn approaches zero. |

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md` and `_designs/design-guidelines.md`.

Even though most of this epic is infrastructure-first, any surfaced UI must preserve:

- AI disclosure before creator adoption
- creator control over confirmation, correction, deletion, and export
- no magical or hidden personalization claims
- dense professional settings/readout presentation rather than consumer “AI coach” theatrics

The style model should feel like accumulated editorial intelligence, not like a chat assistant persona.

---

## Functional Requirements

### Core (MLP)
- **FR40:** Vivido passively observes creator editing behavior across projects and accumulates a style profile (cut duration patterns, hook length, B-roll ratio, audio treatment, chapter density) without requiring any creator action.
- **FR41:** Vivido surfaces style model observations to the creator after project completion for confirmation or correction — never assumed correct.
- **FR42:** Creator can view their style model summary at any time from account settings.
- **FR43:** Creator can delete their style model data at any time from account settings.
- **FR44:** Creator can export their style model as a JSON file (data portability, GDPR compliance).

### Stage 2
- **FR45:** At project 5+, Vivido generates an AI rough cut pre-staging based on the creator's style model — presented for review, never auto-applied.
- **FR46:** Vivido connects YouTube Analytics retention data to source timeline positions (Hook Intelligence) and surfaces editing recommendations for the next project.

---

## What the Style Model Stores

**Behavioral metadata only:**
- Cut durations (histogram of cut lengths across projects)
- Clip counts per project
- Hook length (opening section duration before first cut)
- B-roll ratio (percentage of timeline on B-roll vs primary camera)
- Caption density (captions per minute)
- Shorts cadence (frequency of Shorts-marked segments)
- Audio treatment flags (noise removal applied Y/N, music ducking Y/N, LUFS target)
- Chapter density (chapters per hour of content)

**Never stored:**
- Video content
- Transcript text
- PII about subjects in videos

---

## Data Architecture

```
Project 1–4 (guest or authenticated):
  └── ~/.vivido/style/<project-id>.json  (local JSON accumulator)

On account creation (project 1 "save style" moment):
  └── Sync to Supabase DB (style_model table)
  └── Local SQLite cache for offline access

Project 5+ (authenticated):
  └── Local SQLite + Supabase sync on project complete
  └── Conflict resolution: see Open Question #11
```

**Local-first guarantee:** Style model accumulates locally from project 1 — even in guest mode. Creator never loses observations by not having an account.

---

## GDPR Compliance

Style model data is personal data under GDPR.

- **Explicit consent** at collection (surfaced at "save style" moment on project 1 completion)
- **Right to erasure** (FR43): style model wipe from both local SQLite and Supabase, without account deletion
- **Data portability** (FR44): export as JSON at any time
- **Processing transparency** (FR42): creator can see every observation Vivido has made at any time from account settings

---

## Patent Protection

- **Patent #1:** Per-Creator Compounding Editorial Style Model — file before any public demo
- **Patent #3:** Cross-Project Hook Intelligence — file before any public demo

The algorithm is protected; the data is the switching cost. A competitor who clones the algorithm after patent expiry cannot clone 20+ projects of calibrated creator history.

---

## Open Question Blocking This Epic

**#11 — Style model sync conflict strategy:** When a creator edits on two machines, SQLite local state diverges from Supabase. Last-write-wins (client timestamp) or server-authoritative? Decide before sprint 15 implementation begins.

See [16-open-questions.md](16-open-questions.md).

---

## Moat Metric

**Zero creators who have completed 20+ projects in Vivido have churned.**

This is the only metric that proves the style model is working. Track from day one in beta.
