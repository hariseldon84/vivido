# AI Trust Settings

Acceptance Criteria: 1. Settings panel: AI Trust Settings with all automated tasks listed
2. 7 tasks configurable at launch: silence removal, filler removal, take selection, Sound Room, caption styling, colour grade, chapter titles
3. Three trust levels per task: Full Auto / AI Suggests I Review / Always Manual
4. Settings persist per workspace
5. Visual indicator in editor showing which tasks are in which mode
6. Trust settings applied immediately — no restart needed
7. Quick preset: 'Trust AI Fully' / 'Balanced' / 'I Control Everything'
Build Complexity: Medium
Chapter: Speed Reinvented
Dependencies: Creator Prefs system, all AI features in Stage 2
One Line Description: Set exactly how much AI does automatically vs asks first — per task, per workspace
Priority: P2 — Important
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: 60% of creators customise at least 3 trust settings. 'AI feels respectful not pushy' cited in 70% of positive beta reviews.
Technical Notes: Trust settings stored as JSON in Creator Prefs per workspace. Each automated action checks trust level before executing. Full Auto = fire and done. Suggest = show recommendation panel. Manual = open tool directly.
User Story: As a creator who wants AI help but hates surprises, I want to define exactly when AI acts and when it asks.
WI Code: WI-43
Wow Factor: ⚡ Rare & Powerful