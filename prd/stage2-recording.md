# Stage 2 — Recording & Capture

**Phase:** Growth (Months 10–18)
**Depends on:** MLP gate passed (1,000 weekly active creators, $50K ARR)
**Gate:** Legal review of recording consent requirements completed before this ships.

---

## Why Recording

Recording is the missing upstream step. Riverside and Loom own this segment. When Vivido records, it kills the separate recording tool and makes the entire pipeline from capture to publish internal.

The strategic value: once footage is recorded in Vivido, it is already in the project. No import step. No format negotiation. Transcript starts immediately on recording end.

---

## Functional Requirements

### FR34 — Screen Capture

Creator can record screen (full display / specific window / region) at up to 4K/60fps.

**Implementation:**
- Mac: `ScreenCaptureKit` (macOS 13+). Requires screen recording permission (`Privacy & Security → Screen Recording`). Permission requested on first use with explanation of why.
- Windows: `Windows.Graphics.Capture` API (Windows 10 build 1903+). Requires user confirmation dialog per session (OS-enforced).
- Audio capture: system audio (loopback) captured as separate track from mic. Both always recorded independently.
- No downsampling at capture — record at source resolution and frame rate.
- Output: H.264 at source quality written to disk in real-time. WAV audio written separately.

**Minimum spec impact:** Screen capture is CPU-bound. Warn creator if CPU usage > 80% during capture (thermal throttling risk). Suggest lowering capture resolution if sustained CPU pressure detected.

---

### FR35 — Webcam Recording (Solo + PiP)

Creator can record webcam as standalone clip or as picture-in-picture overlay on screen capture.

**Solo mode:** Webcam fills frame. Useful for talking-head intros, commentary.

**PiP mode:** Webcam appears as inset on top of screen capture. Size and position configurable (corner, size %). PiP is a composited preview during recording; the webcam track is recorded as a separate file. Position/size is a timeline effect, not baked into the file — creator can reposition in post.

**Multi-cam:** If multiple cameras are connected, creator selects primary camera before recording. Secondary camera can be added as a second track (Stage 3 — not initial recording feature).

---

### FR36 — Multi-Track Local Recording

Creator can record screen, webcam, microphone, and system audio as separate, independent tracks simultaneously.

**Track structure on recording end:**
```
Project created automatically:
├── Screen capture track    → Screen Capture 2024-01-15 14:32.mp4
├── Webcam track            → Webcam 2024-01-15 14:32.mp4
├── Microphone track        → Mic 2024-01-15 14:32.wav
└── System audio track      → System Audio 2024-01-15 14:32.wav
```

Each track is an independent file on disk before any cloud sync or auto-upload. Network interruption during recording cannot cause data loss.

**Write strategy:** Ring buffer to disk. Flush every 2 seconds. On unexpected process kill, recording up to last flush is recoverable.

---

### FR37 — Auto-Project Creation on Recording End

When recording stops, Vivido automatically:
1. Creates a new project with the recording date/time as the default name.
2. Places all recorded tracks on the timeline in the correct arrangement.
3. Initiates Whisper transcription on the microphone track (background, no UI block).
4. Shows the creator the timeline editor — recording becomes editing without a manual import step.

Creator can rename the project from the auto-generated name at any time.

---

### FR38 — Scene Composer

Creator can select a scene layout preset before recording.

**Presets:**
| Preset | Layout | Typical use |
|---|---|---|
| Solo Cam | Webcam full frame | Talking-head, commentary |
| Tutorial | Screen capture + webcam PiP (bottom-right) | Software tutorial, code review |
| Podcast | Webcam full frame, system audio for music | Interview-style, monologue |
| Cinematic | Screen capture full frame, no PiP | Game capture, cinematic demo |
| Custom | User-configured layout | Saved from previous sessions |

Scene Composer is a preset system, not an OBS replacement. Vivido does not support RTMP streaming, browser sources, or remote inputs at this stage.

---

### FR39 — Recording Consent (Compliance)

**US all-party consent states (13):** CA, CT, FL, IL, MD, MA, MI, MT, NV, NH, OR, PA, WA.

When recording is initiated and creator's jurisdiction is detected as an all-party consent state:
- Non-dismissible consent notice shown before capture starts: "You are in [State], which requires all parties to consent to recording. Ensure all participants have consented before proceeding."
- Creator must click "I confirm consent" to proceed.
- Consent record (timestamp, jurisdiction, session ID) stored with project metadata.

**Remote guest recording:** Each guest receives a consent acknowledgment screen before their capture begins. Consent record stored per guest per session.

**EU/UK/Canada/Australia:** Consent notice localizable. Legal review required for jurisdiction-specific language before shipping recording feature in those markets.

**Note:** This requirement is a legal blocker. Recording feature does not ship to any jurisdiction without jurisdiction-specific consent handling reviewed by counsel.

---

## Architecture Notes

### OS-Level Capture APIs

| Platform | API | Notes |
|---|---|---|
| Mac 13+ | `ScreenCaptureKit` | Requires permission dialog. Most efficient path. |
| Mac 12 and below | `CGDisplayStream` | Fallback only. Mac 12 is below minimum spec at Stage 2. |
| Windows 10/11 | `Windows.Graphics.Capture` | Requires per-session user confirmation. |
| Windows 8/earlier | Not supported | Below minimum spec. |

Capture API invoked from Electron main process via IPC. Renderer shows preview via shared texture or frame relay.

### Disk Write Strategy

- Each track writes to its own file handle, opened at recording start.
- Atomic flush every 2 seconds via `fsync`.
- Temp filename until recording stops, then renamed to final filename (same atomic write pattern as project auto-save).
- If disk space < 5GB remaining: warn creator before recording starts. If disk space drops below 1GB during recording: auto-pause + alert (never silently lose frames).

### Transcript Auto-Start

On recording end, `whisper_transcribe(mic_track)` is called immediately. This is the same Whisper.cpp subprocess used for imported files (FR15). Recording end → transcript available in 1–2 minutes for a 10-minute recording on minimum spec.

---

## Kills Competition

| Tool replaced | Why |
|---|---|
| Riverside.fm | Screen + webcam + multi-track local recording with auto-project creation |
| Loom | Screen + webcam capture that goes directly into a full editing workflow |
| OBS (for non-streamers) | Scene presets without the complexity — Tutorial/Podcast modes cover 80% of OBS use cases for creators |

---

## Legal Review Requirement

**Do not ship recording to any market without legal review of:**
1. All-party consent notice language (13 US states)
2. EU GDPR consent requirements for recording third parties
3. UK, Canada, Australia jurisdiction-specific requirements

Legal review must be completed and signed off before Stage 2 recording ships. This is a non-negotiable gate.
