# Script Health Score — Pre-Recording Analyser

Acceptance Criteria: 1. Script input panel accessible from pre-record screen
2. Analysis runs via Claude API in < 10 seconds
3. Six checks: hook strength, sentence length, density, energy arc, CTA presence, estimated watch time
4. Inline highlighting: green / amber / red per sentence
5. AI rewrite suggestion for every red-flagged line — one-click to apply
6. Script flows into Teleprompter mode for recording
7. Analysis results saved with the project for reference
Build Complexity: Medium
Chapter: AI Co-Director
Dependencies: Claude API, Teleprompter component, Stage 0
One Line Description: Paste your script before recording — Vivido tells you exactly which lines will lose viewers
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: 80% of creators who use Script Health Score report 'fewer retakes'. Average script health score improves 20% between first and fifth video.
Technical Notes: Claude API with structured JSON output per sentence. Prompt engineered for YouTube creator context. Teleprompter renders cleaned script as scrolling overlay during recording.
User Story: As a creator who writes scripts, I want feedback on my script before I waste time recording a version that won't perform.
WI Code: WI-16
Wow Factor: ⚡ Rare & Powerful