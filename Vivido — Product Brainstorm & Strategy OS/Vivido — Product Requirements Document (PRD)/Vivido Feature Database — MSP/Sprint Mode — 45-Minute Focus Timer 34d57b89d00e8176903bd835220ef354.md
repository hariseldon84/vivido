# Sprint Mode — 45-Minute Focus Timer

Acceptance Criteria: 1. Sprint button in top bar — click to activate
2. Timer defaults to 45 min, adjustable to 25 / 60 min
3. Interface streamlines: hides advanced panels, shows only Cut / Caption / Export
4. All Creator Prefs auto-applied immediately on activation
5. No A/B preview, no comparison mode in Sprint
6. Gentle alarm at 5 min remaining
7. At timer end: 'Your video is ready. Publish or save draft?' prompt
Build Complexity: Low
Chapter: Speed Reinvented
Dependencies: Creator Prefs, timeline, export flow
One Line Description: Timer-driven mode that streamlines the interface to essentials and auto-applies all preferences
Priority: P2 — Important
Stage: Stage 1 — Record
Status: Not Started
Success Metric: Sprint Mode sessions complete export 2x faster than standard sessions. 80% of Sprint sessions result in a publish or draft save.
Technical Notes: Pure UI state management — Sprint Mode is a UI flag that triggers panel visibility and panel lock. All AI defaults pre-applied via Creator Prefs. Timer runs in a Web Worker.
User Story: As a creator paralysed by perfectionism, I want the tool to force me to finish so I actually publish.
WI Code: WI-42
Wow Factor: ✅ Smart Execution