# Smart Export — Platform Adaptation

Acceptance Criteria: 1. 8 platform profiles at launch: YouTube Long, YouTube Shorts, Instagram Reels, Instagram Post, TikTok, LinkedIn, Twitter/X, WhatsApp
2. Per platform: correct aspect ratio auto-applied, resolution, bitrate, caption format
3. Platform profile auto-selected based on Repurpose Engine output type
4. Creator can manually select any platform for any export
5. Preview shows how video will appear on selected platform
6. Export settings fully reviewable and overridable before final render
7. Platform specs updated as platforms change (maintainable config file)
Build Complexity: Medium
Chapter: Platform Freedom
Dependencies: FFmpeg, Repurpose Engine, Smart Captions, Stage 0
One Line Description: Auto-adapts video to every platform's exact specs — aspect ratio, resolution, bitrate, caption style
Priority: P1 — Core
Stage: Stage 3 — Repurpose & Publish
Status: Not Started
Success Metric: Zero platform rejection errors reported (wrong spec) for videos exported through Smart Export.
Technical Notes: Platform specs stored as JSON config — easy to update. FFmpeg handles transcode per spec. Aspect ratio change crops or letterboxes based on creator preference. Captions burned-in for mobile platforms automatically.
User Story: As a creator publishing to 4 platforms, I want Vivido to handle every platform's technical requirements so I never have to look up specs again.
WI Code: WI-24
Wow Factor: ⚡ Rare & Powerful