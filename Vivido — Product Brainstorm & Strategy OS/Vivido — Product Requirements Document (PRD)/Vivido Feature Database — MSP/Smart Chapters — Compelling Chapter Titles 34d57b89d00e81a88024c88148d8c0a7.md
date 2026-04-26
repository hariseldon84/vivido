# Smart Chapters — Compelling Chapter Titles

Acceptance Criteria: 1. Auto-triggered after transcript is generated
2. AI detects natural topic shifts and marks chapter boundaries
3. Chapter titles use emotional/narrative framing rather than descriptive labels
4. Creator can edit any chapter title inline
5. Exports as: YouTube description with timestamps / SRT chapter file / plain text
6. Preview of how chapters will look in YouTube UI shown
7. Minimum 3 chapters, maximum 20
Build Complexity: Low
Chapter: AI Co-Director
Dependencies: Whisper transcription, Claude API
One Line Description: AI writes chapter titles that make people click deeper — not 'Introduction', but 'The day everything changed'
Priority: P2 — Important
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: Smart Chapters used in 70% of YouTube exports. Average of 8 chapters generated per video.
Technical Notes: Claude API with prompt for 'narrative chapter title generation for YouTube'. Transcript segmentation via topic shift detection (TF-IDF or embedding similarity). Chapter timestamps mapped to transcript positions.
User Story: As a YouTube creator, I want chapter titles that are emotionally compelling so more viewers use chapters and watch longer.
WI Code: WI-21
Wow Factor: ✅ Smart Execution