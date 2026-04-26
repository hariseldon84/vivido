# Take Composer — Best-Take Sentence Compositor

Acceptance Criteria: 1. Takes tracked within a session — up to 5 takes per segment
2. Take Composer available after session ends
3. All takes transcribed and aligned at sentence level
4. Each sentence scored: delivery confidence, clarity, pace, filler count, energy
5. Composite assembled automatically with provenance shown (Sentence 1 from Take 3...)
6. Creator can swap any sentence to a different take version via dropdown
7. Output: single seamless clip with audio crossfades at join points
8. Processing time < 60s for a 3-minute segment
Build Complexity: High
Chapter: Camera Intelligence
Dependencies: Whisper forced-alignment, Claude API for scoring, FFmpeg, session recording system
One Line Description: Record 5 takes, AI builds the perfect composite — best delivery of each sentence, seamlessly joined
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: Take Composer is the #1 mentioned feature in beta feedback. Composite output rated 'better than any single take' in 80% of trials.
Technical Notes: Whisper forced-alignment for sentence-level timestamps. Custom scoring model (fine-tuned or rule-based) for delivery quality. FFmpeg crossfade at joins — 50ms dissolve. Take tracking stored as session metadata.
User Story: As a creator who stumbles through the same paragraph 5 times, I want AI to build the perfect version from all my attempts.
WI Code: WI-02
Wow Factor: 🤯 Never Been Done