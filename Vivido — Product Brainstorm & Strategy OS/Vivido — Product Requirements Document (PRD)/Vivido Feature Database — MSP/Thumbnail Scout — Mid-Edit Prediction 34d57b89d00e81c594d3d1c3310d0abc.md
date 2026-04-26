# Thumbnail Scout — Mid-Edit Prediction

Acceptance Criteria: 1. Runs automatically when edit is 80% complete (or on-demand)
2. Scans all frames of main camera track
3. Scores frames on: expression intensity, eye contact, gesture clarity, framing quality
4. Top 5 candidate frames surfaced in Thumbnail panel
5. 3 treatments per candidate: Bold overlay / Minimal / Brand Kit
6. CTR prediction shown relative to channel average (if YouTube connected)
7. One-click export at correct resolution: 1280x720 (YouTube), 1080x1350 (Instagram)
8. Custom text overlay editable before export
Build Complexity: Medium
Chapter: AI Co-Director
Dependencies: FFmpeg frame extraction, MediaPipe expression analysis, brand kit, Canvas API
One Line Description: Vivido scans every frame, finds your best expression, generates 5 thumbnail treatments with CTR prediction
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: Thumbnail Scout used in 60% of edits. Creators report 20% improvement in thumbnail CTR within 3 months.
Technical Notes: Frame extraction via FFmpeg at 1fps. Face expression analysis via MediaPipe or OpenCV. Treatment generation via canvas + brand kit colors/fonts. CTR prediction is a relative score, not absolute.
User Story: As a creator, I want the best thumbnail frame found for me automatically so I stop using mediocre screenshots.
WI Code: WI-19
Wow Factor: ⚡ Rare & Powerful