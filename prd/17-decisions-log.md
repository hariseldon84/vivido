# Decisions Log

All decisions from CEO review and Engineering review sessions. Append new decisions here as they are made.

---

## CEO Review — 2026-04-28

| ID | Decision | Selected | PRD Impact |
|---|---|---|---|
| D2 | GPU software decode fallback | Add FR-61: SW decode fallback with "Performance mode" indicator | Added to E2 (Media), sprint 3-4 |
| D3 | Whisper model download UX | Add FR-62 through FR-66: full model download flow spec | Added to E4 (Transcript), sprint 5-6 |
| D4 | Descript FTO timing | Move to Pre-Sprint 0 (not sprint 17-18) | Updated sprint table, risk table, open questions |
| D5 | Patent provisionals sequencing | Fix: filings before validation prototype, not after | Pre-Sprint 0 gate added |
| D6 | Team hiring sequence | Founder solo through validation, hire Electron engineer first | Team section |
| D7 | Validation creator criteria | Add recruitment spec | Validation Prototype section |
| D8 | Prototype telemetry | Minimal behavioral telemetry (sessions, edits, exports, duration) | Validation section |
| D9 | Distribution strategy | Full Creator Acquisition section | 15-distribution.md |
| D10 | FCP XML importer | Add to Phase 2 scope | stage2-ai-features.md |
| D11 | Build in public | Add to distribution as Channel 5 | 15-distribution.md |
| D12 | Steam distribution | Add to Stage 2 distribution | 15-distribution.md |
| D13 | Descript importer | Defer to TODOS.md (post-MLP validation gate) | TODOS.md |
| D14 | Multi-language Whisper | Add to MLP scope as FR-WL1 | E4 (Transcript), sprint 5-6 |
| D15 | Outside voice (Codex) | Get cross-model perspective | 24 tensions surfaced |
| D16 | Import formats (R3D/BRAW) | Cut from MLP — MP4/MOV/MKV/AVI/WebM only | FR1 updated; R3D/BRAW → Stage 2 |
| D17 | Win+Mac simultaneous launch | Keep simultaneous | Confirmed |
| D18 | Free tier entitlements | Unlimited projects + no AI features | Confirmed |
| D19 | Style model moat framing | Reframe as switching-cost moat + patent legal layer + Stage 2 signal depth | Strategic framing updated |

---

## Engineering Review — 2026-04-28

| Finding | Severity | Fix Applied |
|---|---|---|
| `usePlatform()` hook had no interface design | Critical | Added Open Question #8 (blocking sprint 1) |
| IPC schema validation toolchain unnamed | Critical | Added Open Question #9 (blocking sprint 1–2) |
| RN component sharing boundary mislabeled as post-MLP | Critical | Open Question #4 elevated to blocking before sprint 1 |
| GPU fallback chain order not specified | High | FR-61 updated: NVDEC → D3D11VA → CPU (Windows), VideoToolbox → CPU (Mac) |
| Whisper integration method (N-API vs child_process) unresolved | High | Added Open Question #10 (blocking sprint 5) |
| YouTube OAuth token refresh cycle not specified | High | FR32 updated with refresh behavior + expired token handling |
| Local render progress UI missing from FRs | High | Sprint 13–14 deliverable updated with progress UI + cancel + background render |
| Style model sync conflict strategy undefined | Medium | Added Open Question #11 (blocking sprint 14) |
| Electron CSP policy string was a placeholder | Medium | Explicit CSP policy added to 11-nfr.md |
| Payment webhook verification location unspecified | Medium | Added to 11-nfr.md: Supabase Edge Functions + HMAC verification |
| Timeline virtualization not specified for 500+ clips | Medium | NFR updated with react-window requirement, test before sprint 9 |
| Auto-save NFR ambiguous | Low | Clarified: <50ms UI blocking, background thread, rotational disk acceptable |
