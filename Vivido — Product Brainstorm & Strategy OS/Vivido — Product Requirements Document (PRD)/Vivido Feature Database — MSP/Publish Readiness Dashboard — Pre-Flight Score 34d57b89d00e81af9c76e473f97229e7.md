# Publish Readiness Dashboard — Pre-Flight Score

Acceptance Criteria: 1. Dashboard appears automatically when creator clicks Publish
2. 8 checks run: audio quality, hook strength, retention prediction, caption coverage, thumbnail, format, upload time, music clearance
3. Each check shows green / amber / red with specific detail
4. Red items block publish unless manually overridden with a stated reason
5. Amber items show warning but don't block
6. All checks complete in < 15 seconds
7. Override reason stored in project history for accountability
Build Complexity: Medium
Chapter: AI Co-Director
Dependencies: Claude API, FFmpeg, Whisper, thumbnail system, export system
One Line Description: 8-point checklist before every publish — green lights across = you're good to go
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: 90% of publishes pass all 8 checks within 2 months of launch. 'Post-publish regret' (creator edits within 24h) drops 50%.
Technical Notes: Audio quality via FFmpeg loudnorm + clipping detection. Hook via Claude API on first 30s transcript. Retention via ML model trained on creator data. Caption coverage via transcript-to-audio alignment. Format via metadata check.
User Story: As a creator, I want to know my video is actually ready before I publish so I stop uploading things that could have been better.
WI Code: WI-20
Wow Factor: ⚡ Rare & Powerful