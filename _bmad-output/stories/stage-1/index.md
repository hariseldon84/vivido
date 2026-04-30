# Stage 1 Story Map — MLP

**Status:** Draft backlog
**Purpose:** Module-level story buckets derived from the MLP epics.

---

## E1 Foundation Shell

### F1 Shell And Navigation

- F1.1 Electron app shell boots on Windows and macOS
- F1.2 Renderer navigation matches locked chrome and tabs
- F1.3 Status bar, menu bar, and window controls are wired

### F2 Contracts And Runtime Boundary

- F2.1 Define `usePlatform()` contract
- F2.2 Create typed IPC schema package
- F2.3 Enforce IPC validation in CI

### F3 Project Persistence

- F3.1 Define `.vivido` schema v1
- F3.2 Create/open blank project flow
- F3.3 Autosave and crash recovery infrastructure
- F3.4 Version history snapshot foundation

### F4 Security And Compliance

- F4.1 Electron hardening defaults
- F4.2 Renderer CSP and preload bridge
- F4.3 AI Trust Settings and shared `AIBadge`

---

## E2 Media Import & GPU Playback

### M1 Asset Intake

- M1.1 Import supported video formats
- M1.2 Import supported audio formats
- M1.3 Detect media properties automatically

### M2 Media Browser

- M2.1 Asset library data model and usage status
- M2.2 Thumbnail generation pipeline
- M2.3 Media browser UI matches locked design

### M3 Playback Engine

- M3.1 Native first-frame playback path
- M3.2 Frame-accurate scrub behavior
- M3.3 GPU decode fallback chain and Performance Mode indicator

---

## E4 Transcript & Captions

### T1 Whisper Runtime

- T1.1 Whisper local job orchestration
- T1.2 Model download and resume UX
- T1.3 Language detection and override flow

### T2 Transcript Editing

- T2.1 Transcript view shell and filters
- T2.2 Word-level playback and selection states
- T2.3 Transcript delete and rearrange sync contracts
- T2.4 Low-confidence review handling

### T3 Captions

- T3.1 Project-wide caption style controls
- T3.2 SRT/VTT export pipeline

---

## E3 Timeline Editor

### TL1 Timeline Data Model

- TL1.1 Multi-track timeline structure
- TL1.2 Non-destructive clip edit operations
- TL1.3 Transition and speed metadata model

### TL2 Timeline Interaction

- TL2.1 Drag, reorder, snap, and ripple workflows
- TL2.2 Keyboard shortcut system
- TL2.3 Virtualized rendering for large projects

### TL3 Inspector And State

- TL3.1 Clip inspector tabs and controls
- TL3.2 Timeline save/restore integration

---

## E6 YouTube Primitives & Publish Package

### P1 Timeline Primitives

- P1.1 Chapters as first-class timeline objects
- P1.2 Shorts markers and 9:16 preview state
- P1.3 End Screen and Info Card markers

### P2 Publish Workspace

- P2.1 Publish checklist and readiness model
- P2.2 Metadata editor and chapter description mapping
- P2.3 Render queue and background render states

### P3 Output And Upload

- P3.1 Publish Package file generation
- P3.2 YouTube OAuth and upload lifecycle
- P3.3 Review link surface

---

## E5 Audio Room

### A1 Audio Workspace

- A1.1 Track list, meters, and selected-track workspace
- A1.2 EQ and effects-chain visualization
- A1.3 Platform target summaries

### A2 Processing

- A2.1 AI noise removal pipeline
- A2.2 EQ presets and manual controls
- A2.3 LUFS normalization and preview
- A2.4 Music ducking logic

---

## E7 Style Model

### S1 Passive Collection

- S1.1 Per-project observation capture
- S1.2 Local JSON accumulator lifecycle

### S2 Creator Control

- S2.1 Observation confirmation surface
- S2.2 View, export, and delete style data

### S3 Sync

- S3.1 SQLite cache and sync model
- S3.2 Multi-machine conflict strategy

---

## E8 Auth, Accounts & Cloud Infrastructure

### C1 Guest To Account

- C1.1 Guest-mode continuity across editor surfaces
- C1.2 Save-style moment conversion UX
- C1.3 Email and Google auth flows

### C2 Cloud And Billing

- C2.1 Supabase account/session model
- C2.2 R2 rendered-output handling
- C2.3 Stripe and Razorpay billing flows
- C2.4 Referral program plumbing

### C3 Privacy And Controls

- C3.1 Privacy/settings surface
- C3.2 Account deletion and revocation flows

