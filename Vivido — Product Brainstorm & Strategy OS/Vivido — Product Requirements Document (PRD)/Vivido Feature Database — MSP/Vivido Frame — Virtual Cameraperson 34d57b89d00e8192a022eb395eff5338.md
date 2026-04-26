# Vivido Frame — Virtual Cameraperson

Acceptance Criteria: 1. Face + body detection running at 30fps during recording
2. Three modes: Locked (tight face crop), Follow (tracks movement), Director (auto-selects)
3. Source video always saved at full resolution — crop applied virtually
4. Smooth repositioning — no jarring snaps, max 200ms transition
5. Any auto-framing decision can be overridden per-clip in edit timeline
6. Works on external cameras, not just built-in webcam
Build Complexity: Medium
Chapter: Camera Intelligence
Dependencies: MediaPipe WASM, Stage 0 complete
One Line Description: Auto-framing from a fixed webcam — tracks face and body, keeps creator perfectly in frame
Priority: P1 — Core
Stage: Stage 1 — Record
Status: Not Started
Success Metric: 90% of auto-framed clips rated 'correctly framed' by creators. Zero jarring snap transitions reported in beta.
Technical Notes: MediaPipe FaceMesh + Pose landmarks in WASM. Virtual crop applied as a transform layer, not destructive to source. Director mode uses movement velocity to choose frame size.
User Story: As a creator who paces and gestures while recording, I want to stay perfectly framed without a cameraperson.
WI Code: WI-05
Wow Factor: ⚡ Rare & Powerful