# User Journeys

---

## Journey 1 — Maya: The CapCut Refugee (Primary — Success Path)

Maya, 28, independent YouTube creator, 45K subscribers, Windows laptop, Delhi. Tech explainer videos. CapCut banned January 2025. Now: Premiere trial (watermark countdown: 6 days), Submagic, Canva, YouTube Studio. Every video takes 4 hours longer. Upload frequency: weekly → biweekly. Channel growth stalled.

**Scene:** Sunday. 2 hours of raw footage from a product review. Four tabs open.

1. Downloads Vivido. No account. No wizard. No preset dialog.
2. Drags footage. Plays immediately — 4K, full resolution. Sidebar: transcript appearing live. Two things her current workflow couldn't do in 10 minutes.
3. Edits by deleting filler words. Timeline updates in sync.
4. Drags a Chapter marker. Marks two Shorts segments.
5. Clicks "Remove Background Noise." HVAC hum disappears.
6. Clicks "Publish Package." 40 seconds. A folder: `main.mp4`, `shorts-reveal.mp4`, `shorts-verdict.mp4`, `thumbnail-01.jpg`, `thumbnail-02.jpg`, `thumbnail-03.jpg`, `chapters.txt`.
7. Copies `chapters.txt` into YouTube Studio. Uploads. Done.
8. Vivido shows: *"Project 1 complete. Your style is starting to take shape — save it so Vivido remembers you."* She creates an account.

**Result:** 1:20 total vs previous 3:45. Zero external tools. One tweet: *"Just edited my first video with @VividoApp and I genuinely don't understand why I was using 4 apps before."*

**Capabilities revealed:** Guest mode, instant GPU playback, background Whisper, transcript editing, chapter markers, Shorts markers, AI noise removal, LUFS normalization, Publish Package, style model passive init, frictionless account creation.

---

## Journey 2 — Ravi: The Agency Studio Lead (Secondary — Operations Path)

Ravi, 34, runs a 3-person video agency in Mumbai. Eight brand YouTube channels under management. Monthly tool stack: Premiere × 3 seats ($60 × 3) + Frame.io ($25) + Dropbox Business ($20) + Notion ($16) = $121/mo. Last month an editor sent the wrong cut to a client. Ravi apologized for 45 minutes on a call.

1. Onboards Vivido Studio. Creates workspace "Ravi Creative Studio." Invites two editors (role: Editor). Creates client logins (role: Reviewer). Loads Brand Kit for the fintech client.
2. Editor #1 opens the fintech project. Brand Kit pre-loaded. Edits, clicks "Submit for Review." Review link generated.
3. Ravi opens review link on phone: frame-accurate comment markers. Adds: *"Cut the pause at 1:42."* Client approves. Editor makes change, resubmits. Client approves.
4. Projects dashboard: eight channels, all statuses visible. One channel 2 days behind. Flagged in one click.

**Result:** Wrong-version incident never again. Monthly cost: $41.58/mo vs $121/mo.

**Capabilities revealed:** Multi-workspace, role-based access, Brand Kit, frame-accurate review comments, client approval flow, project status dashboard. *(Stage 3)*

---

## Journey 3 — Arjun: The First-Time Filmmaker (Primary — New Market Path)

Arjun, 26, marketing professional. Shot 6 hours of documentary footage. Opened Premiere once — saw the sequence dialog, closed it. Opened DaVinci once — saw the Color Room tabs, closed it. Sitting on footage for 4 months.

1. Downloads Vivido. Drags a 12-minute interview clip. It plays.
2. Uses transcript view as primary interface — highlights quotes that tell the story, deletes the gaps. Never touches the timeline until the story structure exists in words.
3. Switches to timeline for the first time. Vivido nudges: *"Your average clip is 45 seconds — longer than typical. Want to see where viewers might lose attention?"* Three clips highlighted. He trims them. Accepts 3 of 4 B-roll suggestions.
4. At project 3: selects "Archive Export" (ProRes 422). Submits to a short film festival.

**Result:** The documentary he sat on for 4 months is submitted. Three projects in, he marks chapters on every YouTube upload.

**Capabilities revealed:** Transcript-first editing as primary interface, B-roll suggestion from transcript context, ProRes/archive export, gentle intelligence nudges. *(B-roll suggestion: Stage 2)*

---

## Journey 4 — Jess: Mobile-Native Creator Going Desktop (Primary — Friction Path)

Jess, 22, 180K YouTube subscribers. Shorts-focused, shifting to long-form. Edited everything on phone with CapCut Mobile. Never used a desktop editor.

1. Installs Vivido on Windows laptop. Drops a 22-minute vlog. It plays. Transcript appears. Starts there.
2. First friction: adding a music track. On mobile: one tap. On Vivido: drag audio file. Right-clicks, nothing obvious. Opens keyboard shortcut reference (`?`). Finds it. Drags. 3 minutes vs 10 seconds on mobile — but she did it.
3. First delight: marks 4 Shorts sections while editing long-form. Publish Package outputs all 4 pre-cropped to 9:16, already captioned. Uploads all 4 Shorts same day as the long-form.
4. Long-form retention 40% higher. Traces it to chapter markers. Shares in a creator Discord. Three creators download Vivido the same day.

**Note on friction:** Learning curve is real — 3 videos before it feels fast. Not zero. That's honest. The Shorts-from-long-form workflow is the unlock.

**Capabilities revealed:** Mobile-to-desktop onboarding, keyboard shortcut discoverability (`?` key), Shorts crop preview before export, horizontal source warning, retention insight loop.

---

## Journey 5 — Support Operations (Internal Path)

**Scenario:** Creator reports Shorts clip exported in 16:9 instead of 9:16 after marking a horizontal source clip as Shorts.

Support accesses project metadata (never raw files, never without consent). Source clip was 16:9 — Vivido attempted auto-crop silently with no warning. Bug identified: Shorts marker on horizontal source must surface a crop preview before export (FR29). Creator consent model for support metadata access documented.

**Capabilities revealed:** Support read-only metadata access with explicit consent model, Shorts crop preview before export (FR29), horizontal source detection and warning, creator consent model for troubleshooting.

---

## Journey Requirements Summary

| Capability Area | Revealed By | Phase |
|---|---|---|
| Guest mode + frictionless account creation at value moment | Journey 1 | MLP |
| Native GPU playback, background Whisper, transcript editing | Journeys 1, 3 | MLP |
| YouTube-native primitives (chapters, Shorts, End Screens) | Journeys 1, 4 | MLP |
| AI noise removal + LUFS normalization + Publish Package | Journey 1 | MLP |
| Style model initialization and "save moment" conversion | Journey 1 | MLP |
| Transcript-first editing as primary (not secondary) interface | Journeys 3, 4 | MLP |
| Shorts crop preview + horizontal source warning | Journeys 4, 5 | MLP |
| Keyboard shortcut discoverability | Journey 4 | MLP |
| B-roll suggestion from transcript context (Claude API) | Journey 3 | Stage 2 |
| ProRes / archive export | Journey 3 | Stage 2 |
| Multi-workspace, role-based access, Brand Kit | Journey 2 | Stage 3 |
| Frame-accurate review + client approval flow | Journey 2 | Stage 3 |
| Project status dashboard (multi-channel) | Journey 2 | Stage 3 |
| Support read-only metadata access with consent model | Journey 5 | MLP |
