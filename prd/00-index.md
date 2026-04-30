# Vivido PRD — Index

**Version:** 2.0 | **Status:** Approved — build from this | **Date:** 2026-04-28

> **Vivido is the last video editor a YouTube creator installs — a local-first, cross-platform desktop app that eliminates the 4–7 tool workflow by combining recording, AI-assisted editing, transcription, audio mastering, and one-click publishing in a single product that gets smarter every time you use it.**

---

## How to use this folder

Each file is a self-contained epic or reference document. Work one epic at a time. Mark epics `Status: IN PROGRESS` when building, `Status: DONE` when shipped and validated.

The source of truth for any epic is its file here — not `final_prd.md` (which is now archived).

---

## Strategy & Foundation

| File | Contents |
|---|---|
| [01-vision.md](01-vision.md) | Why we're building, exec summary, target users, pricing, design laws, innovation claims |
| [02-architecture.md](02-architecture.md) | Tech stack, ADR-001-C dual runtime, IPC contracts, usePlatform() |

---

## MLP Epics (Ship in order)

| # | File | FRs | Sprint | Status |
|---|---|---|---|---|
| E1 | [03-epic-foundation.md](03-epic-foundation.md) | — | 1–2 | IN PROGRESS |
| E2 | [04-epic-media.md](04-epic-media.md) | FR1–6, FR-61 | 3–4 | NOT STARTED |
| E3 | [05-epic-timeline.md](05-epic-timeline.md) | FR7–14 | 7–8 | NOT STARTED |
| E4 | [06-epic-transcript.md](06-epic-transcript.md) | FR15–20, FR-WL1, FR-62–66 | 5–6 | NOT STARTED |
| E5 | [07-epic-audio-room.md](07-epic-audio-room.md) | FR21–26 | 11–12 | NOT STARTED |
| E6 | [08-epic-publish.md](08-epic-publish.md) | FR27–33 | 9–10, 13–14 | NOT STARTED |
| E7 | [09-epic-style-model.md](09-epic-style-model.md) | FR40–46 | 15–16 | NOT STARTED |
| E8 | [10-epic-auth-infra.md](10-epic-auth-infra.md) | FR51–53 | 15–16 | NOT STARTED |

---

## Reference Documents

| File | Contents |
|---|---|
| [11-nfr.md](11-nfr.md) | All non-functional requirements (perf, security, reliability, a11y, scalability) |
| [12-compliance.md](12-compliance.md) | EU AI Act, GDPR/CCPA, FFmpeg licensing, YouTube API ToS, recording consent |
| [13-user-journeys.md](13-user-journeys.md) | All 5 user journeys (Maya, Ravi, Arjun, Jess, Support) |
| [14-build-order.md](14-build-order.md) | Sprint plan, build phases, validation prototype, success criteria, risks |
| [15-distribution.md](15-distribution.md) | Creator acquisition channels, referral program, Product Hunt, Steam |
| [16-open-questions.md](16-open-questions.md) | All 11 open questions — sorted by urgency |
| [17-decisions-log.md](17-decisions-log.md) | CEO review + engineering review decisions log |
| [18-development-guidelines.md](18-development-guidelines.md) | Developer-facing implementation rules tying PRD + architecture + design system together |
| [19-milestone-0-validation.md](19-milestone-0-validation.md) | Validation prototype milestone definition and exit gate |
| [20-milestone-1-mlp.md](20-milestone-1-mlp.md) | MLP milestone definition, module groups, and launch gate |
| [21-milestone-2-growth.md](21-milestone-2-growth.md) | Growth milestone definition for post-MLP expansion |
| [22-milestone-3-platform.md](22-milestone-3-platform.md) | Platform milestone definition for team and ecosystem expansion |
| [23-useplatform-contract-note.md](23-useplatform-contract-note.md) | Plain-language explanation and working recommendation for Open Question #8 |
| [24-ipc-schema-tooling-note.md](24-ipc-schema-tooling-note.md) | Plain-language explanation and working recommendation for Open Question #9 |
| [25-shared-ui-boundary-note.md](25-shared-ui-boundary-note.md) | Plain-language explanation and working recommendation for Open Question #4 |
| [26-architecture-blockers-summary.md](26-architecture-blockers-summary.md) | One-page summary of the three sprint-1 architecture blocker decisions |

---

## Stage 2+ Epics (Post-MLP)

| File | Contents | Phase |
|---|---|---|
| [stage2-recording.md](stage2-recording.md) | FR34–39: screen/webcam/multi-track recording | Stage 2 |
| [stage2-ai-features.md](stage2-ai-features.md) | AI rough cut, hook intelligence, B-roll suggestion, LUT color room | Stage 2 |
| [stage3-studio.md](stage3-studio.md) | FR54–57: team workspaces, client review, brand kits | Stage 3 |

---

## Design Assets (Locked)

- Design guidelines: `_designs/design-guidelines.md`
- App UI screens: `_designs/app-ui/` (4 screens — locked)
  - `01-timeline-editor.html`
  - `02-transcript-view.html`
  - `03-audio-room.html`
  - `04-publish-package.html`
