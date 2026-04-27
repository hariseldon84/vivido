# Vivido — Project Constitution

## What is Vivido
Vivido is a next-generation video creation platform for solo YouTube creators
and agency/brand teams. It combines recording, AI-powered editing, repurposing,
and publishing in one unified workflow.

Target users: Solo YouTube creators + Agency/brand teams.
NOT building for: Educators, Loom-replacement, B2B enterprise.

## Current Build Status
- Stage 0 — Foundation: IN PROGRESS
- Stage 1 — Record: NOT STARTED
- Stage 2 — AI Edit: NOT STARTED
- Stage 3 — Repurpose + Publish: NOT STARTED
- Stage 4 — MSP Polish: NOT STARTED

## Tech Stack (LOCKED — Do Not Change Without ADR)
| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Vite | Web-first, fast HMR |
| Desktop | Electron | Wraps the web app, native file access |
| Video Engine | FFmpeg WASM (browser) + FFmpeg native (Electron) | Industry standard |
| AI / ML | Anthropic Claude API (claude-sonnet-4-6) + Whisper | Transcription, script analysis |
| Real-time Collab | Liveblocks | Multiplayer editing |
| Cloud Render | AWS MediaConvert | Background render queue |
| Storage | Supabase + Cloudflare R2 | Cost-effective, scalable |
| Auth | Supabase Auth | Simple, fast |
| Payments | Stripe + Razorpay (India fallback) | Global + India |
| Deploy | Vercel (web) + GitHub Actions (Electron) | Fast CI/CD |

## Architecture Decisions (Locked)
1. Local-first recording — files write to disk before cloud upload
2. Audio recorded as WAV (uncompressed) by default, never compressed at capture
3. Video stored at source resolution, up to 4K — never downsample at capture
4. Background rendering via AWS MediaConvert job queue — never block the UI
5. Version history as diffs, not full file copies — 30-day retention
6. Brand kit stored as JSON per workspace, not per user
7. Creator Prefs stored per user-workspace pair, not globally

## Critical Constraints
- NEVER compress audio at the recording stage
- NEVER block the editing UI during rendering — always use background queue
- NEVER store video files in Supabase — only metadata; files go to Cloudflare R2
- NEVER change DB schema without a migration file in supabase/migrations/
- NEVER auto-apply AI features — always check AI Trust Settings first
- ALWAYS auto-save every 30 seconds minimum
- ALWAYS show version history as visible, accessible UI — not hidden

## Gstack Configuration
Use /browse skill from gstack for all web browsing.
Never use mcp__claude-in-chrome__* tools.

Available gstack skills:
/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship,
/land-and-deploy, /canary, /benchmark, /browse, /connect-chrome, /qa,
/qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro,
/investigate, /document-release, /codex, /cso, /autoplan,
/plan-devex-review, /devex-review, /careful, /freeze, /guard, /unfreeze,
/gstack-upgrade, /learn

If gstack skills aren't working:
cd .claude/skills/gstack && ./setup

## Monorepo Structure

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
