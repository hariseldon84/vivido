# Vivido Notes — Voice Note Edit Tasks

Acceptance Criteria: 1. Keyboard shortcut N or mic icon drops a voice note at current timestamp
2. Whisper transcribes note in < 5 seconds
3. Orange flag appears on timeline at that timestamp
4. Task card shows: transcription + suggested action buttons (Execute / Dismiss / Edit)
5. Task queue visible in sidebar showing all open notes across the project
6. Notes survive app close/reopen
Build Complexity: Low
Chapter: Speed Reinvented
Dependencies: Whisper API or WASM, timeline component, Stage 0
One Line Description: Leave a voice note at any timestamp while editing — AI transcribes it into a task card, execute tomorrow
Priority: P1 — Core
Stage: Stage 1 — Record
Status: Not Started
Success Metric: Used in 40% of edit sessions by beta users. Zero notes lost between sessions.
Technical Notes: Web Audio API records note. Whisper API (or local Whisper WASM) transcribes. Note stored in DB with timestamp reference. Execute button triggers relevant tool action.
User Story: As a creator editing at 2am, I want to leave myself instructions for tomorrow without losing my train of thought.
WI Code: WI-32
Wow Factor: ✅ Smart Execution