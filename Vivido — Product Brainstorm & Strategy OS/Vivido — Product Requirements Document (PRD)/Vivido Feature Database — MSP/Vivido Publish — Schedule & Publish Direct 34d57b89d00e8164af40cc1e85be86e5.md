# Vivido Publish — Schedule & Publish Direct

Acceptance Criteria: 1. OAuth integrations at launch: YouTube, Instagram, LinkedIn, Twitter/X
2. Podcast integration via Anchor/Spotify RSS
3. Publish panel: select platforms, assign output formats per platform
4. Title + description: pull from Smart Chapters + Script Health Score, or write manually, or AI-generate from transcript
5. Scheduling: pick date/time, or use AI Optimal Time suggestion
6. Publish confirmation with per-platform status (queued / live / failed)
7. Post-publish: live performance card showing views + comments at 1h, 24h, 7d
8. Failed publishes show specific error + retry option
Build Complexity: High
Chapter: Last Tool Ever
Dependencies: OAuth integrations, Repurpose Engine, Smart Export, job queue system
One Line Description: Press Publish, choose platforms, schedule time — Vivido is the distribution layer, not just creation
Priority: P1 — Core
Stage: Stage 3 — Repurpose & Publish
Status: Not Started
Success Metric: 70% of finished edits published directly through Vivido within 30 days of Stage 3 launch. Zero silent publish failures (all errors shown to creator).
Technical Notes: YouTube Data API v3, Instagram Graph API, LinkedIn Video API, Twitter API v2. OAuth tokens stored encrypted. Scheduled publishes use a job queue (Vercel Cron or similar). Performance data polled from platform APIs.
User Story: As a creator, I want to go from finished edit to published video without leaving Vivido or logging into another platform.
WI Code: WI-44
Wow Factor: ⚡ Rare & Powerful