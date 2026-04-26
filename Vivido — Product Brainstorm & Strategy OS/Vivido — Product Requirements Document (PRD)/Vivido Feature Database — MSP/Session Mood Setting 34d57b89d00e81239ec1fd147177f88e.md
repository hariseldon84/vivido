# Session Mood Setting

Acceptance Criteria: 1. 5 mood cards shown on session start screen
2. Each mood changes: AI silence threshold, default music genre, caption animation style, colour grade warmth, Creator Style Template suggestion
3. Mood persists through the entire session into edit
4. Mood can be changed at any point in edit without losing work
5. Mood preference per project type remembered for future sessions
Build Complexity: Low
Chapter: Knows Me
Dependencies: Stage 0, Sound Rooms, Caption system
One Line Description: Pick Energetic / Reflective / Educational / Entertaining before recording — Vivido adjusts everything to match
Priority: P1 — Core
Stage: Stage 1 — Record
Status: Not Started
Success Metric: 70% of creators pick a mood before every session within first 2 weeks. 60% keep the default mood settings rather than overriding.
Technical Notes: Mood stored as a JSON config object that seeds all downstream AI and design defaults. Simple lookup table to map mood → parameter set.
User Story: As a creator, I want the tool to dress itself for the type of video I'm making so I don't have to configure anything.
WI Code: WI-35
Wow Factor: ✅ Smart Execution