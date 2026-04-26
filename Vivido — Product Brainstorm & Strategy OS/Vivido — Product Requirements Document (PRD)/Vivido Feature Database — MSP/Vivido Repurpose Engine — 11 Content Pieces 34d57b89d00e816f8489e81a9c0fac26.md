# Vivido Repurpose Engine — 11 Content Pieces

Acceptance Criteria: 1. Repurpose panel opens after edit is finished
2. All 11 output types listed with checkboxes — creator picks what they want
3. Shorts: AI selects 3 best moments (hook quality scored), reformats to 9:16, adds captions
4. Podcast audio: cleans audio track, adds intro/outro from brand kit
5. LinkedIn + Twitter: Claude extracts key insight, formats to platform norms
6. Carousels: key points as designed slides using brand kit colours + fonts
7. Newsletter: summary + key quotes + CTA block in Markdown
8. Blog post: full transcript cleaned and structured with headings
9. All outputs generated in < 3 minutes for a 20-min video
10. Each output editable before download/publish
Build Complexity: High
Chapter: Platform Freedom
Dependencies: All Stage 2 AI features, FFmpeg, Claude API, brand kit, Stage 0
One Line Description: One session → full YouTube edit, 3 Shorts, podcast, LinkedIn, Twitter thread, 2 carousels, newsletter, blog, captions, 3 thumbnails
Priority: P0 — Blocker
Stage: Stage 3 — Repurpose & Publish
Status: Not Started
Success Metric: Repurpose Engine used in 70% of completed edits. Average 6 outputs selected per session. 'Saves me 3+ hours' cited by 80% of users.
Technical Notes: Pipeline: transcript → Claude API for text outputs → FFmpeg for video reformatting → Canvas for carousel slides → ZIP download or direct to publish queue. Shorts selection uses energy scores + hook strength from Stage 2.
User Story: As a creator who hates spending a whole day repurposing, I want one click to produce my entire week of content from a single recording.
WI Code: WI-29
Wow Factor: 🤯 Never Been Done