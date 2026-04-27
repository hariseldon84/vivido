# Vivido — Advanced Elicitation Session
**Date:** 2026-04-26
**Context:** Project discovery / classification for PRD — greenfield YouTube creator video platform
**Session goal:** Deepen understanding of users, positioning, risks, and first principles before locking in product vision

---

<!-- Elicitation outputs appended below as sessions complete -->

---

## Method 1: User Persona Focus Group

**Three core target personas react to Vivido's concept.**

### Persona A — Maya, 29, Solo YouTube Creator (Tech Reviews, 180K subs)
_Publishes 2x/week. Primary income. Stack: OBS → DaVinci → Submagic → Opus Clip → Buffer._

> "My biggest nightmare is my edit taking 9 hours on a Tuesday when I need to publish by Wednesday evening. I've tried Descript but it felt built for podcasters — I don't want to edit in a transcript like a Word doc, I want a real timeline. Opus Clip saves me on Shorts but it's another $30/mo on top of everything else. What kills me is the context-switching — I'm in five tools and none of them talk to each other. If Vivido is genuinely one place from record to publish, I'm in. But I've heard that promise before. The question is whether the editing is actually powerful enough that I don't feel like I'm compromising."

**Unmet need:** Power without complexity. Creator-friendly UX that doesn't compromise on editing capability. Trust that the "all-in-one" promise is real.

---

### Persona B — Ravi, 34, Agency Video Producer
_Runs a 4-person team producing YouTube for 8 brand clients. Stack: Riverside → Premiere → Frame.io → Notion._

> "My problem is coordination and brand consistency. Each editor has their own way of doing things and clients notice when the tone shifts between videos. I need a tool where brand kits live at the workspace level — fonts, colors, intros, end cards — and every editor pulls from them automatically. Client review is a nightmare — I send a Vimeo link, they comment in a Google Doc, I manually reconcile. If Vivido had a built-in review/approval flow I'd switch tomorrow. And the Liveblocks multiplayer angle is interesting — can two editors actually work on the same timeline simultaneously, or is it just shared storage?"

**Unmet need:** Brand consistency enforcement at the workspace level. Client review/approval workflow built into the tool. Real multiplayer editing — not just file sharing.

---

### Persona C — Jess, 25, CapCut Refugee (Lifestyle/Travel Creator, 45K subs)
_Used CapCut for everything. Hit by the US ban. Now bouncing between VEED and InShot, frustrated._

> "CapCut just worked. I never had to think about it. Templates, auto-captions, trend sounds — it was all there. Everything I've tried since feels either too basic or too complicated. I just want something that's easy like CapCut but I can actually trust — not owned by ByteDance. I also want to know it'll still exist in two years. I don't need crazy AI features. I need: easy editing, good templates, fast export, auto-captions that work, and a way to make Shorts from my long videos without manually trimming every clip."

**Unmet need:** Ease and trust. CapCut parity on UX simplicity + stability + transparent ownership.

---

### Focus Group Synthesis

| Dimension | Maya (Power Creator) | Ravi (Agency) | Jess (CapCut Refugee) |
|---|---|---|---|
| Primary pain | Tool fragmentation + time | Coordination + brand consistency | Trust vacuum + UX simplicity |
| Willing to pay | $30–60/mo | $50–100/mo per seat | $10–15/mo max |
| Must-have | Real timeline editing + AI repurposing | Brand kit + client review + multiplayer | Simple UX + templates + auto-captions |
| Risk of losing them | If editing feels like a downgrade | If no team/approval workflow | If onboarding feels complex |
| Vivido fit | Core target — Stage 1 win | Stage 3–4 expansion | Onboarding/template layer needed |

### Key Insights
- **Two fundamentally different UX needs in one product:** Maya wants power + integration; Jess wants simplicity + trust. These require deliberate UX layering.
- **Jess = volume opportunity (CapCut migration, lower ARPU); Maya = retention engine (higher ARPU, word-of-mouth)**
- **Open question:** Do Ravi's agency needs (multiplayer, brand kit, client review) justify pulling Stage 4 earlier, or is Stage 3–4 sequencing correct?

---

## Method 2: Shark Tank Pitch

**Stress-testing "YouTube OS" against three skeptical investors.**

### Shark 1 — Marcus (Growth investor, consumer SaaS)
> "What actually stops Descript or Riverside from shipping the two features they're missing and closing the gap on you in 6 months? 'All-in-one' isn't a moat — it's a feature list."

**Stress point:** Integration alone isn't defensible.
**Answer:** The moat is the YouTube API analytics feedback loop + transcript corpus = a compounding data flywheel competitors can't replicate quickly. But Vivido must actually build the flywheel, not just connect tools.

### Shark 2 — Priya (Operator, consumer marketplace)
> "Video creators are notoriously tool-promiscuous. What keeps Maya on Vivido in month 7? She can export her MP4s and leave anytime. What's the stickiness? And — desktop-first or web-first? That's a massive GTM difference."

**Stress point:** Retention mechanics and switching costs from raw video files are low.
**Answer:** Lock-in lives in *metadata and intelligence*, not media files — edit history/diffs, transcript corpus, channel analytics integration, brand kit. That's what's hard to move. Desktop-first vs web-first is a real GTM fork the PRD must decide.

### Shark 3 — Derek (Technical founder)
> "You're describing five separate hard problems — recording engine, video editor, AI pipeline, repurposing, publishing, real-time collaboration. Every one has a well-funded competitor. What's your Stage 1 that's actually shippable in 6 months? Because if you're still building the editor when the CapCut window closes, you've lost."

**Stress point:** Scope creep is the execution killer.
**Answer:** Stage 1 must be ruthlessly scoped to what makes a creator switch TODAY — not the full platform.

### Pitch Synthesis

| Challenge | What it exposed | Implication for PRD |
|---|---|---|
| "All-in-one isn't a moat" | Need a defensible flywheel | YouTube API analytics integration is the moat — build early, not late |
| "Creators are tool-promiscuous" | Lock-in can't come from video files | Stickiness = transcript history, edit versions, channel analytics, brand kit |
| "Five hard problems" | Scope is dangerous | Stage 1 must be ruthlessly scoped — minimum to make a creator switch and stay |

### Key Question Surfaced
> **What does a creator need to switch to Vivido TODAY?**
> Likely answer: **record + edit + auto-captions + one-click Shorts** — the four things done every week, better than their current stack, in one place. Everything else is retention and expansion.

---

## Shark Follow-Up Q&A — Hard Objections

### Q1: Riverside + FCP (Rs 399/mo Apple bundle) + OBS (free) covers everything. Why pay for Vivido?

**Honest answer:**

The cost math is deceptive. The full creator stack is:
- FCP: Rs 399/mo
- Riverside promo: ~Rs 667/mo
- Opus Clip (Shorts): ~Rs 1,250–2,400/mo
- Captions tool: ~Rs 800/mo
- Scheduler: ~Rs 1,000/mo
- **Total: Rs 4,100–5,400/mo** across 5 disconnected tools

Vivido at Rs 1,500–2,000/mo all-in wins on price — but ONLY if the editing is good enough that Maya doesn't feel she's downgrading from FCP.

**Real answer:** FCP is Mac-only (excludes 60%+ of creators). OBS requires setup expertise. None of them talk to each other. The fragmentation pain is the actual problem — not any individual tool's quality.

**Honest concession:** Mac creators already happy with FCP + Riverside need to feel the Shorts/repurposing pain as the wedge. Vivido's editing must be FCP-competitive or they won't switch.

**PRD implication:** Price must undercut the full stack, not individual tools. Editing experience must clear the FCP bar for Mac creators.

---

### Q2: VidIQ already does analytics AND creates Shorts from long-form. Everything is already done. Why buy Vivido in 6 months when it's not even ready?

**Honest answer:** Partially true. The "YouTube API integration as moat" framing was weak.

VidIQ owns the analytics + SEO optimization layer — keyword research, channel SEO, thumbnail/title scoring, AI Shorts. That's real and already in market.

**What VidIQ is NOT:** An editor. It sits *after* the upload — on top of the publishing workflow. It doesn't replace recording, editing, or repurposing. Vivido lives in a different layer: the creation workflow before publish.

**The 6-month readiness challenge is valid.** Stage 1 must ship 4 things creators can switch to NOW: record → edit → auto-captions → one-click Shorts. Everything else waits.

**PRD implication:** Drop YouTube analytics from Stage 1. Ship the creation workflow fast. Miss the CapCut window = lose the market entry.


---

### Q3: Metadata isn't a moat. Analytics are everywhere — VidIQ, native YouTube, even Claude can analyze it. Why does it matter?

**Honest answer:** Correct. "Metadata and analytics as lock-in" was weak framing. Easily bypassed.

**What actually creates lock-in (revised):**
- Raw footage library in Vivido
- Transcript corpus with edit history, chapter markers, timestamps
- Reusable project templates, brand kit, intros/outros
- Shorts clip history ("this hook version hit 200K") — creative institutional memory

This is **creative project continuity**, not analytics. It builds over months of use and is painful to rebuild elsewhere. Analytics are just one input — not the moat itself.

**PRD implication:** Drop "YouTube API analytics integration" as moat narrative. Reframe: **"your creative workspace grows smarter over time"** — accumulated project context, not raw analytics, is the retention driver.

---

### Revised Value Proposition (post-grilling)

| Claim | Verdict |
|---|---|
| "YouTube API is a moat" | ❌ Dead — VidIQ already does this better |
| "Metadata lock-in" | ❌ Dead — easily bypassed |
| "Price advantage vs full stack" | ❌ Removed — Riverside handles captions/scheduling natively; stack is lean |
| "Beats Mac + FCP + VidIQ creator" | ❌ It doesn't. Wrong target. Stop trying. |
| "Creative project continuity" | ⚠️ Soft retention signal only — not an acquisition argument |
| "CapCut migration (Windows/new creators)" | ✅ Strong — right ICP, real window |
| "YouTube-native editor (chapters, Shorts panel, end cards, hook memory)" | ✅ Strong — FCP is general-purpose; Vivido is YouTube-specific |
| "AI intelligence inside the edit (pre-publish, not post-publish)" | ✅ Strong — VidIQ is post-publish; Vivido is pre-publish |
| "Best editing experience for YouTube creators" | 🚨 The whole bet — if this fails, nothing else saves it |

### Critical ICP Correction
**NOT targeting:** Optimized Mac creators (FCP + Riverside + VidIQ). They don't need Vivido.
**Actually targeting:**
- Windows creators — FCP unavailable, stuck with Premiere complexity or DaVinci learning curve
- CapCut refugees — haven't built a serious stack, actively shopping
- Serious creators building their first pro workflow — before they lock into 3 separate tools

---

## Method 3: Pre-mortem Analysis

**It's Q1 2028. Vivido is shutting down. Five independent failure scenarios.**

### Failure 1 — "The Editor Wasn't Good Enough"
Creators tried Stage 1. Churn hit 68% by month 3. Exit surveys: "The editing felt clunky. I went back to DaVinci."

**Root cause:** Building a genuinely excellent video editor is a 3–5 year engineering problem. The team underestimated it. Functional shipped. Delightful didn't.

**Hidden insight:** Maybe Vivido shouldn't try to build a FCP-class general timeline editor. The YouTube-native editor might be a *constrained, opinionated* experience built around YouTube video structure (hook → content → CTA → end card) — faster and more purposeful, not more powerful. **This is a fundamental product architecture question that must be answered before PRD is written.**

---

### Failure 2 — "Missed the Window"
CapCut divested to an American holding company. By September 2025 it was back in US app stores. Vivido was still in Stage 1 beta. The migration window closed before anything shipped.

**Root cause:** The acquisition thesis was a time-boxed window, not a permanent market shift. Vivido treated it like a permanent opportunity.

**Hidden insight:** The CapCut migration is an acquisition *channel*, not the reason to exist. Vivido needs a reason to exist independent of CapCut's status. That reason must be the YouTube-native editor — but only if it's genuinely better, not just "one less tool."

---

### Failure 3 — "Descript Shipped It"
November 2025: Descript launches a full timeline editor. January 2026: CapCut (new ownership) launches a desktop app with Shorts workflow. Vivido's planned differentiators — YouTube-native timeline, Shorts panel, auto-chapters — were all copied by players with bigger teams and existing user bases.

**Root cause:** Individual features are copyable. No proprietary technology required.

**Hidden insight:** The uncopyable thing is not a feature — it's **first-mover depth**. The creator who built their entire workflow in Vivido from day one (project history, brand kit, Shorts clip library) doesn't leave even when Descript ships a timeline. But this only works if you got them early and gave them something immediately valuable.

---

### Failure 4 — "YouTube Changed the Rules"
Mid-2026: YouTube updated API terms restricting third-party programmatic publishing without lengthy certification. Vivido's one-click publish — core to Stage 2 pitch — blocked for 8 months. (This has happened before — YouTube 2018 API changes killed entire tool categories.)

**Root cause:** Over-indexed on platform integration as a moat.

**Hidden insight:** YouTube integration = convenience layer, not structural moat. Core value must exist even if the API is unavailable. **Platform integrations are table stakes, not strategy.**

---

### Failure 5 — "The ICP Was Wrong"
Windows serious YouTube creators: smaller and harder-to-reach than expected. CapCut refugees: mostly settled for free alternatives (VN, InShot, Meta Edits). Creators willing to pay $20+/mo already had a happy stack. Paid conversion stayed below 4%.

**Root cause:** ICP was a description, not a distribution channel. No clear path to reach these users at scale.

**Hidden insight:** The ICP needs a **distribution channel, not just demographics.** "Windows YouTube creator" must map to: where they hang out, who influences them, what search terms they use, what makes them share Vivido. Without a channel, even a correct ICP doesn't convert.

---

### Pre-mortem Synthesis

| Failure Mode | Root Cause | PRD Implication |
|---|---|---|
| Editor not good enough | Underestimated quality bar | Define editor scope precisely — opinionated/constrained vs general? |
| Missed the window | Built on a channel, not a product | Value must exist independent of CapCut's status |
| Features get copied | No uncopyable differentiation | First-mover depth > any single feature |
| YouTube changes API rules | Over-indexed on platform integration | YouTube API = convenience, not moat |
| ICP too diffuse | No acquisition channel | ICP needs a distribution channel defined, not just demographics |

### The Central Unanswered Question
**What is the ONE thing Vivido does that makes a creator say "I can't imagine going back"?**

Not price. Not analytics. Not metadata. Not "all-in-one." Features get copied. Windows close.

The answer must be something that **compounds** — gets better with use, painful to rebuild elsewhere. **This is not yet clear. Finding it is the next step.**

---

## Method 4: First Principles Analysis

**Strip every assumption. Rebuild from fundamental truths.**

### Assumptions Challenged

| Assumption | Status | Truth |
|---|---|---|
| All-in-one is the value | ❌ | Time compression is the value |
| Recording is Stage 1 | ❌ | Editing is Stage 1. Recording can come later. |
| Tool fragmentation = primary pain | ❌ | TIME = primary pain. Fragmentation is one cause. |
| YouTube-native UI = differentiator | ⚠️ | The AI behind the UI is the differentiator |
| Moat = workflow integration | ❌ | Moat = compounding edit intelligence |
| "YouTube OS" = right framing | ❌ | "The editor that gets smarter every video" = right framing |

### Where Time Actually Goes

| Step | Time spent | AI compressible? |
|---|---|---|
| Ideation/scripting | 2–4 hrs | Partially |
| Recording | 1–3 hrs | No — you're on camera |
| **Editing** | **4–8 hrs** | **Yes — dramatically** |
| Thumbnails | 1–2 hrs | Partially |
| Description/chapters/tags | 30–60 min | Yes — fully |
| Publishing | 15–30 min | Yes — trivially |
| Shorts repurposing | 1–3 hrs | Yes — dramatically |

The edit is where the time goes. That is the product.

### What "Editing Not Sucking" Looks Like

1. Upload footage → AI rough cut in 5 minutes (silences gone, bad takes marked, structure suggested)
2. Edit by reading a transcript — delete a word, delete the footage. No scrubbing.
3. While editing long-form, the 3 best Shorts moments are already marked — embedded, not separate
4. Audio cleaned automatically — noise, levels, music ducking
5. Chapters and description draft themselves from the transcript as you edit

**Result: 4–8 hours → 45–90 minutes. That is the product.**

### The Compounding Answer (Pre-mortem question answered)

**"What is the ONE thing Vivido does that makes a creator say 'I can't imagine going back'?"**

**Your editing history becomes your creative intelligence.**

Every project builds a model of your channel:
- Which hook structures your audience finishes vs abandons
- Which segments you always cut vs always keep
- Which moments become your best Shorts
- Where your pacing consistently drags
- What topics generate your highest retention

This is *edit-time* intelligence from *your* history in *your* editor. Not copyable by VidIQ (post-publish only). Not available in FCP (no project history model). Compounds every video. After 20 videos, the editor understands your creative patterns better than any tool you've used.

**That's what you can't get back if you leave.**

### Revised Core Product Definition
> **Fast, AI-native video editor for YouTube creators. Rough cut in minutes. Edit by transcript. Shorts embedded in the workflow. Gets smarter about your channel with every video.**

### Stage 1 Re-scoped From First Principles
**IN:**
- AI rough cut from raw footage (silence removal, filler cut, bad take detection)
- Transcript editing as the primary interface
- Embedded Shorts marking (part of the edit, not a separate tool)
- Auto-clean audio
- Auto-chapters from transcript

**OUT of Stage 1:**
- Recording (solved by OBS/Riverside — distraction from the edit)
- Publishing/scheduling (convenience, not the pain)
- YouTube API integration (Stage 2 when editor is proven)
- Team collaboration (Stage 3)

---

## Method 5: What If Scenarios

**Five alternative realities — each a serious path.**

### What If 1 — No Editor, Just AI Layer
Vivido builds the AI processing only (rough cut, transcript, Shorts extractor, audio clean, chapters) and exports XML/EDL into FCP, Premiere, or DaVinci. Becomes the best companion to existing editors, not a replacement.

**Why compelling:** Zero competition with FCP/Premiere. Mac creators become customers. Ships in 3 months. Compounding intelligence model works identically.
**Why problematic:** No workflow lock-in. Transactional relationship. "Edit by transcript" UX lost.
**PRD decision required:** Is the editor the product, or is AI pre-processing the product?

### What If 2 — Mobile-First
Vivido ships iOS/Android first. Desktop Electron later. CapCut refugees live on mobile — they will never download an Electron app.

**Why compelling:** Where the CapCut refugees actually are. App store discovery. Jess is a customer.
**Why problematic:** Maya (serious 4K creator) needs desktop. Mobile editing is still a compromise for long-form.
**PRD decision required:** Is Vivido for Jess (mobile, casual-serious) or Maya (desktop, serious)? Different architectures.

### What If 3 — Agency-First (B2B)
Target Ravi (4-person agency, 8 clients) first. $200–400/mo per workspace. Solo creator features come later.

**Why compelling:** Higher ARPU, lower churn, no CapCut dependency. Agencies as word-of-mouth vector.
**Why problematic:** Longer sales cycles. Compounding intelligence less compelling across 8 different client channels. Bigger build (collaboration + approval flows).
**PRD decision required:** Consumer bottom-up vs enterprise top-down GTM?

### What If 4 — Constrained/Opinionated Editor
Build a deliberately constrained editor around YouTube video structure only: Hook → Intro → Content Sections → CTA → End Card. Transcript IS the edit. No freeform timeline, no multi-track, no colour grading.

**Why compelling:** Ships in 4 months. Removes the "editor not good enough" failure mode. Not competing with FCP — offering something structurally different.
**Why problematic:** Power creators feel constrained. Perception risk of "toy, not real editor."
**PRD decision required:** Opinionated/fast (Basecamp) vs flexible/powerful (Jira)? Determines engineering scope entirely.

### What If 5 — India-First
Built and priced for Indian YouTube creator market first. Rs 499–999/mo, INR pricing, Hindi/Tamil/Telugu transcription, Razorpay native. India is 2nd largest YouTube market by uploads. CapCut was dominant there.

**Why compelling:** Massive creator base, tight community, word-of-mouth spreads fast, Razorpay already in the stack. Proven India beachhead → global expansion.
**Why problematic:** Lower ARPU (~$6/mo). Infrastructure costs are global, not India-adjusted. Risk of being pigeonholed as "Indian creator tool."
**PRD decision required:** India as beachhead or global from day one?

### Three Decisions the PRD Must Explicitly Make

1. **Full timeline editor vs constrained/structured editor** — biggest Stage 1 build decision
2. **Desktop-first vs mobile-first** — determines the ICP between Maya and Jess
3. **AI pre-processing layer only vs integrated editor** — different competitive dynamics entirely
