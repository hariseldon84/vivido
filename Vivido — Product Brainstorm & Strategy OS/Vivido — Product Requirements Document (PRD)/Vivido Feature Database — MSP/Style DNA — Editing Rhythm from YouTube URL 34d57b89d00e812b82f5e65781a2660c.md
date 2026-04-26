# Style DNA — Editing Rhythm from YouTube URL

Acceptance Criteria: 1. URL input in Style DNA panel — supports any public YouTube URL
2. Server-side analysis extracts: avg cut duration, silence ratio, zoom frequency, music timing, caption timing, energy arc
3. Style DNA card shown with these parameters visually
4. 'Apply to edit' button restructures cut timing and pacing
5. 4 built-in preset DNA cards: High-Energy / Calm Authority / Storyteller / Tutorial Pro
6. Applied style can be intensity-dialled: 0% (none) to 100% (full match)
7. Creator can undo style application with one click
Build Complexity: High
Chapter: Editing Reimagined
Dependencies: Server-side YouTube processing pipeline, FFmpeg, Claude API, Stage 0
One Line Description: Paste a YouTube URL, get that creator's editing DNA applied to your footage
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: Style DNA used in 40% of edits within first month. Creators report 'pacing feels right' without manual adjustment.
Technical Notes: YouTube video downloaded server-side (Puppeteer/yt-dlp). FFmpeg scene detection for cut points. PySceneDetect or similar for cut frequency. Results cached by URL. Claude API for energy arc classification.
User Story: As a creator who admires another YouTuber's pacing, I want to apply their editing rhythm to my video without manually copying it.
WI Code: WI-15
Wow Factor: 🤯 Never Been Done