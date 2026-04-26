# Smart Captions — Self-Styling Subtitles

Acceptance Criteria: 1. 6 content-type styles applied automatically: Punchline / Key Term / Disclaimer / Emphasis / Question / Statistic
2. Per-rule style settings: font size modifier, weight, colour, animation type
3. Per-rule on/off toggle in caption settings
4. Master caption style (font, base size, position) controlled separately
5. Preview mode shows all captions rendered before exporting
6. Export formats: Burned-in / SRT / VTT / ASS (animated)
7. Creator can manually override style for any individual caption
Build Complexity: Medium
Chapter: Language & Geography
Dependencies: Whisper, Claude API, FFmpeg subtitle processing, brand kit
One Line Description: Captions that style themselves — punchlines pop, stats go bold, disclaimers go small
Priority: P1 — Core
Stage: Stage 2 — AI Edit
Status: Not Started
Success Metric: Smart Captions used in 80% of short-form exports. 'Caption quality' rated 4.5/5 or higher in beta surveys.
Technical Notes: Claude API classifies each sentence/phrase into content type. Classification output maps to CSS-equivalent style rules. ASS format supports animation. Burned-in via FFmpeg subtitle filter.
User Story: As a short-form creator, I want my captions to communicate as much as my voice so viewers watching on mute still get the full experience.
WI Code: WI-38
Wow Factor: ⚡ Rare & Powerful