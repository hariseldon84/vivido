# Distribution & Creator Acquisition

---

## Phase: MLP Launch + Ongoing

---

## Channel 1 — Validation Creators as Launch Amplifiers

The 5 validation creators are not just testers. They are the first distribution channel.

**Mechanics:**
- Each validation creator uses Vivido on 3 real videos before public launch.
- If gate passes (≥ 3 of 5 say "I'd pay for this today"), ask each creator for one piece of public content: a tweet, a YouTube comment, a community post — in their own words.
- Do not script it. Genuine frustration → genuine relief is the story. Let them tell it.
- Target: 5 organic creator testimonials published within 48 hours of MLP launch.

**Why this works:** Creators trust other creators. A 45K-subscriber creator saying "I cancelled Premiere because of this" reaches the same audience that Vivido is targeting. No ad budget can buy that trust.

**Recruitment criteria (repeat from Open Question #1):**
- Windows creator (not Mac-first)
- 10K–200K subscribers
- Currently paying for ≥ 2 tools Vivido replaces
- Has expressed frustration with current workflow on record (tweet, Reddit post, YouTube comment)
- Available to use Vivido on 3 real videos within 30 days of prototype access

**Outreach order:** Warm intros → creators founder has publicly engaged with → creator communities (r/editors, r/youtubers).

---

## Channel 2 — Build in Public (YouTube)

**Format:** Documentary-style YouTube series. "I'm building the video editor I've always needed."

**Why:** Founders who build in public attract early adopters who are invested in the product's success before it ships. They become advocates, testers, and amplifiers at launch.

**Episodes (suggested arc):**
1. "Why I'm leaving Premiere and building my own editor" — the frustration, the vision
2. "Building a video editor in Electron — what I've learned" — technical progress
3. "I showed 5 creators my prototype — here's what happened" — validation results
4. "We're launching next week" — final push, early access signup

**Constraint:** Episode 1 does not require Vivido to be built. It requires the founder's voice and the story. Record it now, before the sprint clock starts.

**Lead generation:** Each episode links to a waitlist / early access signup. Email list is the owned asset — not social followers.

---

## Channel 3 — Community Presence

**Communities:**
- r/editors (Reddit) — 800K+ members. CapCut ban thread had 4,000+ upvotes. Vivido solves the stated problem.
- r/youtubers — 800K+ members. Workflow frustration posts are weekly.
- Creator Discord servers — find servers for mid-tier creators (10K–500K range)
- Twitter/X — creator-tech discourse, #VideoEditing hashtag

**MLP approach:**
- Do not post product announcements. Post founder perspective.
- Participate in frustration threads ("4 apps to make one YouTube video") with genuine solutions.
- Show Publish Package output as a screen recording — one video, one click, one folder.
- Reply to CapCut ban threads with availability for testing.

**Rule:** Never post "check out my new app." Post the thing the app does.

---

## Channel 4 — Product Hunt Launch

**Target:** Front page on launch day.

**Preparation (start 4 weeks before launch):**
1. Build maker following by participating in other launches genuinely.
2. Write the PH listing: focus on the "zero tool switches" story, the Publish Package demo GIF, the style model promise.
3. Thumbnail: Publish Package folder output — instantly legible, shows the value without a word.
4. Line up 50+ upvote commitments from validation creators + early access list before launch day.
5. Schedule for Tuesday–Thursday (highest PH traffic).

**Day-of:** Post at 12:01 AM PST. Founder online for first 6 hours to respond to every comment.

---

## Channel 5 — Technical Distribution (Desktop App)

### GitHub Releases

- Signed binaries distributed via GitHub Releases.
- `electron-builder` produces:
  - Mac: `.dmg` (universal — Apple Silicon + Intel)
  - Windows: `.exe` installer (NSIS) + `.exe` portable
- All builds signed and notarized before release:
  - Mac: Apple Developer ID + notarization via `notarytool`
  - Windows: Code signing certificate (EV cert preferred for SmartScreen reputation)

### Auto-Update (electron-updater)

- `electron-updater` checks GitHub Releases on startup and every 4 hours.
- **Delta patching:** `blockmap`-based differential updates — creators download only changed blocks, not full binary on every update.
- Creator can defer updates but not block security patches (security patches force-apply on next quit).
- Update notification: non-intrusive banner in project library. Never interrupts active session or render.

### File Associations

- `.vivido` project files registered with OS on install.
- Dock/taskbar recent projects via native OS API.
- Native OS notifications: export completion, style model milestones.

### Default File Locations

| Platform | Default path |
|---|---|
| Mac | `~/Movies/Vivido/` |
| Windows | `%USERPROFILE%\Videos\Vivido\` |

---

## Channel 6 — Steam (Stage 2)

**Rationale:** Steam has 130M+ active users. Creative tools (DaVinci Resolve, Celtx, Scrivener) have proven that professional creative software sells on Steam. Vivido's lifetime tier ($599) maps well to the Steam purchase model.

**Timing:** Stage 2 (Months 10–18). Not an MLP distribution channel.

**Requirements before Steam launch:**
- Stable MLP with ≥ 1,000 weekly active creators (validates product quality before mass exposure)
- Steam Direct fee ($100 per SKU)
- Steam build pipeline added to GitHub Actions CI/CD (Steam SDK integration)
- Age gating: not required (no age-restricted content)
- Steam page: screenshots of all 4 core screens (timeline, transcript, audio room, publish package)

---

## Channel 7 — React Native Companion (Stage 2)

- iOS App Store + Google Play Store.
- Distribution via Fastlane for both stores.
- App Store: requires Apple Developer Program ($99/yr). Review timeline: 1–7 days.
- Play Store: requires Google Play Developer account ($25 one-time). Review timeline: hours to days.
- Companion scope at Stage 2: project library, style model summary, review links (approve Shorts from phone), push notifications for export completion.
- Full timeline editing in browser: Stage 2.

---

## Success Metrics (Distribution)

| Metric | Target | Timing |
|---|---|---|
| Validation creator testimonials published | 5 | Launch day |
| Email waitlist at launch | 1,000+ | Pre-launch |
| Product Hunt ranking | Front page (#1–#5) | Launch day |
| GitHub Releases downloads (first 30 days) | 5,000 | 30 days post-launch |
| Week-1 active creators (completed ≥1 project) | 200 | 7 days post-launch |
| Weekly active creators at 3 months | 1,000 | 3 months post-launch |

---

## What Not To Do

- No paid ads at MLP launch. Budget is zero. Organic trust is the only credible signal at this stage.
- No press embargo / TechCrunch pitch at launch. Creators don't read TechCrunch. Their community does.
- No influencer deals at MLP. Authentic testimonials first. Paid partnerships only after organic proof of value.
- No AppSumo lifetime deal at MLP. The $599 Lifetime tier is the launch offer — don't undercut it by putting it on AppSumo at $49.
