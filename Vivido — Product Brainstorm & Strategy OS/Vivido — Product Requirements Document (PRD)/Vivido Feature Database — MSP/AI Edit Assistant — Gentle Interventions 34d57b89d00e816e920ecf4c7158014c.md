# AI Edit Assistant — Gentle Interventions

Acceptance Criteria: 1. Sidebar panel — collapsed by default, expandable
2. Minimum 5 observation types active at launch: filler count, intro length, B-roll gap, audio mismatch, jump cut cluster
3. Each observation has: Ignore / Fix Automatically / Show Me buttons
4. AI learns from accepted/rejected suggestions — stops showing suggestions creator consistently ignores after 5 rejections
5. Observations update in real-time as edit progresses
6. Never shows more than 3 observations at once — prioritises highest impact
7. Observation history accessible in panel
Build Complexity: Medium
Chapter: Knows Me
Dependencies: Whisper, Claude API, timeline analysis, Stage 0
One Line Description: Non-intrusive sidebar that tells you what your co-editor would say — filler count, intro length, B-roll gaps
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: 50% of AI suggestions accepted by creators. Average 3 suggestions per edit session. Net Promoter Score impact: AI Edit Assistant cited as top 3 favourite feature.
Technical Notes: Observation engine runs as a background worker analyzing timeline state. Filler count from Whisper transcript. Intro length from timeline metadata. B-roll gap from clip type tags. Claude API for complex observations.
User Story: As a creator, I want gentle nudges from Vivido that improve my video without interrupting my flow.
WI Code: WI-34
Wow Factor: ✅ Smart Execution