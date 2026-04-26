# Creator Preferences — Reusable Edit Rules

Acceptance Criteria: 1. After any manual edit decision, toast prompt appears: 'Save as your default for [clip type]?'
2. Saveable rules: zoom level/timing, gap between cuts, caption style, lower third position, music fade duration, Sound Room preference
3. Rules stored in Creator Prefs profile per workspace
4. Settings → My Editing Style: view and edit all rules
5. Auto-applied to every new edit session in that workspace
6. Rules can be overridden per-project without deleting the global rule
Build Complexity: Medium
Chapter: Speed Reinvented
Dependencies: Stage 0, timeline component, caption system
One Line Description: Every manual edit decision can be saved as a permanent rule — reusable logic, not repeated effort
Priority: P1 — Core
Stage: Stage 1 — Record
Status: Not Started
Success Metric: Average of 5+ Creator Prefs rules saved per user by end of month 1. 50% reduction in time-to-first-edit in sessions 3+.
Technical Notes: Creator Prefs stored as JSON object in DB per user-workspace pair. Each rule is a key-value with a scope (global / project / clip-type). Applied as defaults when new timeline is created.
User Story: As a creator who makes the same style of video every week, I want my editing preferences remembered so I never configure the same thing twice.
WI Code: WI-41
Wow Factor: ✅ Smart Execution