# Dark Room — Total Focus Mode

Acceptance Criteria: 1. Keyboard shortcut Cmd+Shift+D activates Dark Room
2. Interface collapses: only footage player, waveform, transcript
3. All panels, toolbars, AI suggestions hidden
4. Keyboard shortcuts: J/K/L playback, I/O in/out, D delete, M mark, N note
5. Keyboard shortcut reference card available (press ? to show)
6. Escape or Cmd+Shift+D exits — all panels restore to previous state
7. 300ms graceful fade transition in and out
Build Complexity: Low
Chapter: Speed Reinvented
Dependencies: Timeline component, keyboard shortcut system
One Line Description: Cmd+Shift+D — strips interface to footage + waveform only. Keyboard editing. Zero distractions.
Priority: P2 — Important
Stage: Stage 1 — Record
Status: Not Started
Success Metric: Used by 30% of power users (3+ videos/month) regularly. Zero 'how do I exit Dark Room' support tickets after help docs published.
Technical Notes: Dark Room is a UI mode flag. Panel visibility controlled via CSS transitions + state. Keyboard event handlers registered on mode entry, removed on exit. No data or processing changes.
User Story: As a serious creator, I want a mode that treats me like a craftsperson and gets everything else out of the way.
WI Code: WI-48
Wow Factor: ✅ Smart Execution