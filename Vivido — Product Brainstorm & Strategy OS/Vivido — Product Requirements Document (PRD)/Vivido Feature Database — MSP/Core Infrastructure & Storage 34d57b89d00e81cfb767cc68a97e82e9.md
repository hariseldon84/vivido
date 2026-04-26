# Core Infrastructure & Storage

Acceptance Criteria: 1. FFmpeg WASM working in browser for preview processing
2. Cloudflare R2 for raw video/audio storage with signed URLs
3. AWS MediaConvert job queue for cloud renders
4. Auto-save triggers every 30 seconds
5. 30-day version history per edit
6. App loads in < 2s on Vercel edge
Build Complexity: High
Chapter: Foundation
Dependencies: AWS account, Cloudflare account, Supabase project
One Line Description: FFmpeg WASM, Supabase DB, Cloudflare R2 storage, AWS MediaConvert render queue, Vercel deploy
Priority: P0 — Blocker
Stage: Stage 0 — Foundation
Status: Not Started
Success Metric: Zero data loss incidents. Render queue p95 < 4 min for 10-min 1080p video. App load < 2s.
Technical Notes: FFmpeg.wasm for browser. Electron uses native FFmpeg binary. R2 for storage. MediaConvert for final export. Version snapshots stored as diffs.
User Story: As a creator, my videos are stored safely, render in the background and never block my workflow.
WI Code: —
Wow Factor: ✅ Smart Execution