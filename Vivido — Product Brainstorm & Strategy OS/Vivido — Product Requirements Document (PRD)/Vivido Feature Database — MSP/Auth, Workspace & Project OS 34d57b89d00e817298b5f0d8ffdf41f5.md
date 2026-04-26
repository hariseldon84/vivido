# Auth, Workspace & Project OS

Acceptance Criteria: 1. Email + Google OAuth working
2. Workspace created on signup
3. Roles: Owner / Editor / Reviewer / Viewer functional
4. Projects support folders and series grouping
5. Brand kit: logo, colours, fonts, lower thirds, music slots all saveable
6. Brand kit auto-applies to new edits in workspace
Build Complexity: Medium
Chapter: Foundation
Dependencies: Supabase project setup, Cloudflare R2 bucket, domain + SSL
One Line Description: User auth, workspace model, role system, project/folder structure, brand kit
Priority: P0 — Blocker
Stage: Stage 0 — Foundation
Status: Not Started
Success Metric: 100% of beta users complete setup in < 5 min. Zero auth-related support tickets in first month.
Technical Notes: Supabase Auth + DB. Workspace model: users → workspaces → projects → sessions → edits. Brand kit stored as JSON per workspace.
User Story: As a creator, I can sign up, create a workspace, invite team members, set my brand kit and start a project in under 5 minutes.
WI Code: —
Wow Factor: ✅ Smart Execution