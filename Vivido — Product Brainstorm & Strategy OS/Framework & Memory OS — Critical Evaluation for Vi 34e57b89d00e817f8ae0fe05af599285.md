# Framework & Memory OS — Critical Evaluation for Vivido

# Framework & Memory OS — Critical Evaluation for Vivido

> **Purpose:** Ruthlessly evaluate every major AI development framework + memory system before committing to a stack for Vivido — a large, greenfield, complex product built sequentially by a solo founder using Claude Code.
> 

> **Date:** April 2026
> 

> **Verdict:** At the bottom of this page.
> 

---

## 🎯 The Problem We're Solving

Vivido is not a weekend hack. It is:

- A **massive greenfield product** (4 stages, 23 MSP features, complex AI pipeline)
- Built **sequentially, story by story**, by a solo founder (Anand) using Claude Code
- Needs **deep context preservation** — Claude must remember architectural decisions made in Stage 0 when building Stage 3
- Needs **design-to-code quality** — Vivido's UI is a core differentiator, not an afterthought
- Needs **full SDLC documentation** — PRD → Epics → Stories → Design Spec → Dev Spec → QA → Deploy
- Cannot afford **context collapse** — where Claude starts hallucinating architecture because it forgot what was decided two weeks ago

Every framework below is evaluated against **this specific problem**, not generic use cases.

---

## ⚔️ Part 1 — The 6 Framework Comparison

### Framework Overview

| # | Framework | Creator | Stars | Core Philosophy | Layer |
| --- | --- | --- | --- | --- | --- |
| 1 | **BMAD** | BMad Code (open source) | ~15K | Spec-first, agent personas, artifact-driven SDLC | Documentation + Planning |
| 2 | **Gstack** | Garry Tan (YC) | ~66K | Role-based virtual team, design-to-ship pipeline | Design + Build + Ship |
| 3 | **Superpowers** | Jesse Vincent | ~106K | TDD-enforced 7-phase pipeline, 1% rule | Build Quality + Testing |
| 4 | **Agent OS** | Community | ~5K | Lightweight persona config + [CLAUDE.md](http://CLAUDE.md) conventions | Configuration |
| 5 | **Spec Kit** | GitHub (official) | ~40K | Spec-driven dev, Jira/Linear/GitHub integration | Documentation + Tickets |
| 6 | **Kiro** | Amazon (AWS) | Backed | Spec-driven IDE, hooks + steering documents | IDE-native Spec-driven Dev |

---

### The Full Comparison Table

| Criteria | BMAD | Gstack | Superpowers | Agent OS | Spec Kit | Kiro |
| --- | --- | --- | --- | --- | --- | --- |
| **PRD Generation** | Full — PM agent, shards into Epics | Via /office-hours — design docs, not formal PRD | Brainstorm + Spec, not structured PRD | None | Yes — [spec.md](http://spec.md)  • task breakdown | Yes — spec-to-story native |
| **Epic + Story Generation** | Best in class — Scrum Master agent, sequenced stories | Partial — implementation plans, not agile stories | Task plans, not agile stories | None | Yes — Coordinator + QA workflow | Yes — spec to issues to tasks |
| **Design Spec / UI Mockups** | UX Expert agent — text spec + Lovable prompts, no visual mockups | Best in class — /design-consultation, /design-shotgun (4-6 variants), /design-html, /design-review | None | None | None | Some — steering docs, no visual generation |
| **Architecture Document** | Full — Architect agent, DB schema, API contracts, locked before build | /plan-eng-review locks architecture and data flow | Plan phase produces architecture before code | [CLAUDE.md](http://CLAUDE.md) is manually written | Yes — implementation plan generation | Yes — spec-driven architecture |
| **Dev Spec / Coding** | Shards PRD into story files for Dev agent | Build agent implements against [DESIGN.md](http://DESIGN.md)  • 23 specialist skills | Mandatory TDD: test-first then subagent implementation | Guides Claude via [CLAUDE.md](http://CLAUDE.md) | MAQA: Coordinator to Feature agent to QA | Hooks enforce spec compliance |
| **QA / Testing** | QA agent validates each story | /qa opens real browser, clicks through app, generates regression tests | Best in class TDD — mandatory tests before code via 1% rule | None | CI gate blocks QA until pipeline green | Steering docs for test strategy |
| **Deploy / Ship** | Not built-in | /ship + /land-and-deploy | Finalize phase, no direct deploy | None | CI integration, not full deploy | Partial |
| **Context Preservation** | PRD sharding by epic — story loads only relevant context | [CLAUDE.md](http://CLAUDE.md)  • /learn preserves decisions | No native memory — manual [CLAUDE.md](http://CLAUDE.md) | Manual [CLAUDE.md](http://CLAUDE.md) | Static spec files | Static steering docs |
| **Solo Founder Fit** | Yes — designed for solo | Yes — Garry Tan built it solo | Yes | Yes | Better for teams | Better for teams |
| **Claude Code Native** | Yes | Exclusively Claude Code | Yes — Anthropic plugin marketplace | Yes | Yes | No — AWS/IDE native |
| **Greenfield Large Project** | Best — designed for greenfield | Yes — sequential sprint model | Yes — phases prevent scope creep | Too lightweight | Yes — spec-first prevents vibe coding | Yes |
| **Sequential Build Support** | Story-by-story is core | Sprint-by-sprint model | Phase-by-phase enforcement | None | Task graph with dependency ordering | Yes |
| **Cost** | Free, open source | Free, MIT | Free, MIT, Anthropic official | Free | Free, GitHub official | AWS pricing |
| **Maturity** | V6, active 2026 | V0.15, 204 commits, very active | V5.0.5, Anthropic marketplace approved | Community maintained | GitHub official, very active | Early, launched 2025 |
| **Vivido Fit Score** | 5/5 | 5/5 | 4/5 | 2/5 | 3/5 | 3/5 |

---

### Deep Dive: Where Each Framework Wins and Loses for Vivido

#### 1. BMAD — The Documentation Powerhouse

**Why it wins for Vivido:** The only framework that produces a genuine, structured, sharded PRD to Epics to Stories pipeline. Scrum Master agent generates stories with acceptance criteria, sequenced correctly. Architect agent produces a locked architecture document before a line of code is written. PO Master Checklist validates PRD and architecture alignment. PRD sharding means Claude only loads the relevant epic's context per session — critical for a 4-stage project. Scale-adaptive: explicitly adjusts planning depth from bug fix to enterprise system.

**Where it loses:** No visual design capability — text spec, not mockups. Coordination overhead on edits where implementation discovers design issues. Does not include deploy tooling.

**Verdict for Vivido:** Essential. Use BMAD to produce the architecture doc, shard the PRD into epic files, and generate the story queue. This is the documentation spine of the entire build.

---

#### 2. Gstack — The Virtual Engineering Team

**Why it wins for Vivido:** Design pipeline is unmatched — /design-consultation to /design-shotgun (visual variants) to /design-html (production HTML) to /design-review is a complete design-to-code system. /plan-ceo-review pressure-tests product decisions like a YC partner before code is written. /plan-eng-review locks architecture with a REVIEW READINESS DASHBOARD. Real browser QA via /qa — Claude sees the actual UI. /ship and /land-and-deploy close the loop to production. Cross-model review with /codex. Garry Tan shipped 600K+ lines in 60 days solo using this.

**Where it loses:** Requires Claude Code terminal — not web UI. No formal PRD/Epic/Story generation. Context across sprints relies on [CLAUDE.md](http://CLAUDE.md) unless paired with a memory tool.

**Verdict for Vivido:** Essential. The execution engine. Pairs directly with BMAD's story files.

---

#### 3. Superpowers — The Quality Enforcer

**Why it wins for Vivido:** 7-phase mandatory pipeline with no shortcuts. The 1% Rule — if there's even a 1% chance a phase applies, the agent invokes it. Red Flags sections preempt the exact rationalizations agents use to skip steps. TDD-first is non-negotiable: tests written before code, every time. Anthropic official Claude Code plugin marketplace — highest trust signal here.

**Where it loses:** Build speed takes a hit — TDD-first with mandatory reviews consumes more tokens. No design layer. No PRD/Epic/Story generation.

**Verdict for Vivido:** Layer on during Stage 1+ build. Every Vivido story involving AI features or audio/video processing must have tests before code.

---

#### 4. Agent OS — The Lightweight Config Layer

**Verdict for Vivido:** Skip as a primary framework. Too lightweight for Vivido's scale. The [CLAUDE.md](http://CLAUDE.md) conventions it promotes are handled better by BMAD's artifact system and Gstack's [CLAUDE.md](http://CLAUDE.md) integration.

---

#### 5. Spec Kit — GitHub's Official Spec-Driven Tool

**Why it wins:** GitHub official, deeply integrated with GitHub Issues, Jira, Linear, and Trello. MAQA workflow with parallel worktree implementation. CI gate blocks QA until pipeline is green.

**Where it loses for Vivido:** Optimised for teams in CI/CD pipelines, not solo founders using Lovable/Bolt. No design layer. Static spec files with no compression across sessions.

**Verdict for Vivido:** Revisit at Stage 3-4 when Vivido has a GitHub repo, CI/CD pipeline, and a small team.

---

#### 6. Kiro — Amazon's Spec-Driven IDE

**Verdict for Vivido:** Skip. AWS ecosystem, not Claude Code native. Early maturity with performance issues. Switching cost unjustified. Vivido is Claude Code native — stay in that ecosystem.

---

## 🧠 Part 2 — Memory Systems for Vivido

### Why Memory is the Most Critical Problem

Vivido has 4 build stages, 23 MSP features, a complex AI pipeline (Whisper + Claude API + FFmpeg + MediaPipe), built over months of daily Claude Code sessions. Without persistent memory:

- Claude forgets Stage 0 chose Supabase over Postgres-direct by Week 3
- Claude re-architects the audio pipeline it designed in Stage 1 when working in Stage 2
- Claude repeats mistakes already fixed in previous sessions
- Every new session starts with 10+ minutes of manual context re-injection

Memory is not a nice-to-have for Vivido. **It is infrastructure.**

---

### Memory Tool Comparison

| Tool | Stars | How It Works | Vivido Fit | Verdict |
| --- | --- | --- | --- | --- |
| **claude-mem** | 67K | 5 lifecycle hooks capture everything, AI-compresses to SQLite + ChromaDB, injects relevant context at SessionStart | 5/5 | Install now |
| **HEBBS** | Early | .git-like memory index, answers 4 query types (similarity, temporal, causal, contradiction), reflect pipeline surfaces contradictions | 4/5 | Pair with claude-mem |
| [**CLAUDE.md**](http://CLAUDE.md) (native) | Built-in | Manual markdown Claude reads at session start | 3/5 | Use as foundation layer |
| **Mem0** | YC-backed, $24M Series A | Vector + graph memory, framework-agnostic. Graph features $249/mo Pro. | 2/5 | Later — overkill now |
| **Zep** | Established | Extracts entities + facts from conversations. More for chat agents than coding. | 1/5 | Not relevant |
| [**AGENTS.md**](http://AGENTS.md) | Joint Google/OpenAI/Cursor standard | Vendor-neutral markdown spec | 3/5 | Good standard to follow |

---

### claude-mem — Deep Dive (67K Stars, 244 Releases)

claude-mem runs five lifecycle hooks silently during every Claude Code session:

- **SessionStart** → Inject compressed context from last 10 sessions
- **UserPromptSubmit** → Create session, save user prompts
- **PostToolUse** → Capture observations (file reads, writes, architectural decisions)
- **Summary** → AI-compress session into structured observations
- **SessionEnd** → Store to SQLite + ChromaDB vector index

**Why this matters for Vivido specifically:** Claude will remember that the audio engine uses RNNoise, not DeepFilterNet, from Session 1. Claude will recall the exact DB schema from Stage 0 when building Stage 2. Claude will know which stories are done without being told. The hybrid search (FTS5 keyword + Chroma semantic) retrieves relevant context without dumping everything into context. Token-efficient 3-layer MCP = roughly 10x token savings.

**Install:** `npx claude-mem install`

**Known issues:** Endless Mode 95% token reduction claims disputed by community. AGPL-3.0 license — check implications for commercial team use. 151 open issues — active but rough edges.

---

### HEBBS — Deep Dive

HEBBS builds a .git-like memory index that answers four query types vector databases alone cannot handle:

1. **Similarity** — what looks like this?
2. **Temporal** — what changed recently?
3. **Causal** — why was this decision made?
4. **Contradiction** — where does this conflict with prior decisions?

The contradiction detection is the killer feature for Vivido. When Stage 0 decides to use AWS MediaConvert for cloud render, and Stage 3 proposes FFmpeg-only cloud export, HEBBS surfaces: "Architectural decision — MediaConvert for cloud render. This contradicts current proposal."

The reflect pipeline clusters raw memories, proposes insights, validates them, and stores consolidated knowledge with full lineage. Privacy model works like .gitignore — credentials and env files excluded.

**Status:** Early stage, not yet battle-tested at scale. Architecture is sound and contradiction detection is unique.

---

### About BoringOS

Honest assessment of your friend's project: BoringOS is a TypeScript library that handles orchestration primitives, agent scaffolding, and workflow routing for building agentic platforms. It has a [CLAUDE.md](http://CLAUDE.md) and BUILD_[GUIDELINE.md](http://GUIDELINE.md), suggesting it was built with Claude Code.

However:

- Only **4 stars** and **10 commits** — extremely early, not battle-tested
- **0 issues, 0 pull requests** — no community usage yet
- Solves a **different problem** — it is a platform builder (for creating agentic apps), not a development workflow framework for building Vivido itself
- Could be relevant if Vivido's internal AI features need their own agent orchestration — but that is Stage 5+ territory

**Verdict:** Support your friend, star the repo, but do not build Vivido's development workflow on a 4-star library with 10 commits. The risk of hitting an unsolved bug with zero community is real. Revisit when it has meaningful traction.

---

## 🏗️ Part 3 — The Vivido Stack Recommendation

### The 5-Layer Vivido Development OS

**Layer 1 — Memory (Always On)**

- claude-mem → Auto-captures every session
- HEBBS → Contradiction detection + insight clustering
- [CLAUDE.md](http://CLAUDE.md) → Project constitution (foundation layer)

**Layer 2 — Documentation (Before Any Build)**

- BMAD → PRD shard to Epics to Stories
- BMAD → Architect agent to locked architecture doc
- BMAD → PO checklist to validation
- Notion → Living source of truth

**Layer 3 — Design (Before Each Stage)**

- Gstack /design-consultation → [DESIGN.md](http://DESIGN.md)
- Gstack /design-shotgun → Visual variants
- Gstack /plan-design-review → Rate 0-10, kill AI slop
- Gstack /design-html → Production HTML

**Layer 4 — Build (Story by Story)**

- Gstack /plan-ceo-review → Challenge decisions
- Gstack /plan-eng-review → Lock architecture
- Superpowers TDD → Tests before code
- Gstack /review → Auto-fix, flag bugs
- Gstack /qa → Real browser testing

**Layer 5 — Ship (Each Stage Completion)**

- Gstack /ship → PR, tests, merge
- Gstack /land-and-deploy → Production deploy
- Gstack /retro → What broke, what worked

---

### Why This Stack for Vivido's Scale

| Challenge | Solution |
| --- | --- |
| Vivido spans 4 stages and months of development | BMAD shards PRD by epic — Claude loads only relevant context per story |
| Claude forgets architectural decisions between sessions | claude-mem captures and injects all decisions automatically |
| Stage 3 code might contradict Stage 0 architecture | HEBBS contradiction detection surfaces conflicts before they become bugs |
| Vivido's UI is a core differentiator | Gstack /design-shotgun generates real visual variants, /plan-design-review kills AI slop |
| Complex AI features need testing | Superpowers mandatory TDD — tests before code, no exceptions |
| Solo founder — no team to catch mistakes | Gstack /review auto-fixes; /qa clicks through the actual app |
| Sequential build — stories must not break prior stages | BMAD story sequencing + Superpowers regression testing |
| Context window collapses on long sessions | claude-mem + PRD sharding keeps context lean |

---

## 📋 Part 4 — Recommended Next Steps (Sequenced)

### Step 1 — Install Memory Infrastructure (Do This Today)

```bash
# Install claude-mem
npx claude-mem install

# Install Gstack
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# Install BMAD
npx bmad-method install

# Install Superpowers via Claude Code plugin manager
```

### Step 2 — Write the Vivido [CLAUDE.md](http://CLAUDE.md) (Project Constitution)

This file is what Claude reads at the start of every session. Include:

- Core architecture decisions and why each was made
- The MSP feature list with current status
- Stage map and current stage
- Critical constraints (never change DB schema without migration, always use background render for exports)
- Links to Notion PRD, Feature Database, and What If list

### Step 3 — Run BMAD on the Vivido PRD

```
npx bmad-method
→ Agent: PM → Feed Vivido PRD → Sharded epic files + story queue
→ Agent: Architect → Full architecture document from PRD
→ Agent: PO → Master checklist to validate PRD to Architecture alignment
```

### Step 4 — Run Gstack Design Phase for Stage 0

```
/design-consultation  → Build DESIGN.md for Vivido
/design-shotgun       → Generate 5-6 UI variants of the editor
/plan-design-review   → Rate 0-10. Kill anything generic.
/plan-ceo-review      → Challenge every Stage 0 decision
/plan-eng-review      → Lock the architecture document
```

### Step 5 — Build Stage 0, Story by Story

```
For each story from BMAD:
1. claude-mem auto-loads prior context at session start
2. Superpowers — write tests first
3. Implement with Gstack /review gating each commit
4. Run /qa when a screen or flow is complete
5. Update CLAUDE.md with any new architectural decisions
6. HEBBS auto-indexes the memory
```

### Step 6 — Weekly Retro Ritual

```
/retro → what shipped, what broke, what changed
Update Notion Feature Database → flip statuses to Shipped
Update claude-mem memory → prune stale observations
Plan next week's story queue from BMAD
```

---

## 🧭 Final Verdicts — One Line Each

| Tool | Verdict |
| --- | --- |
| **BMAD** | Use — The documentation spine. Feed it the Vivido PRD now. |
| **Gstack** | Use — The execution engine. Design + build + ship. Install today. |
| **Superpowers** | Layer on — The quality enforcer. TDD mandatory for all AI features. |
| **Agent OS** | Skip — Too lightweight. BMAD + Gstack cover everything it does, better. |
| **Spec Kit** | Later — Revisit at Stage 3-4 when you have a team and CI/CD pipeline. |
| **Kiro** | Skip — AWS ecosystem, not Claude Code native. Irrelevant for Vivido now. |
| **claude-mem** | Install today — Most critical single tool for a long-running build. 67K stars. |
| **HEBBS** | Pair with claude-mem — Unique contradiction detection. No other tool does this. |
| **BoringOS** | Support your friend — Star the repo. Do not build on it yet. Revisit at 500+ stars. |
| **Notion** | Living source of truth — PRD, Features, What Ifs, Research all here already. |

> **The one-sentence verdict:** Install claude-mem and Gstack today, run BMAD on the PRD this week, layer Superpowers on when Stage 1 build starts — and you will have the most disciplined solo-founder AI development stack anyone has assembled for a product of Vivido's ambition.
> 

---

## 🔗 Related Pages

- [Vivido PRD](Vivido%20%E2%80%94%20Product%20Requirements%20Document%20(PRD)%2034d57b89d00e8185bec0ca6d6b8bc207.md)
- [User Research — Competitor Reviews](User%20Research%20%E2%80%94%20Competitor%20Reviews%20&%20Creator%20Pain%20%2034d57b89d00e8168ac82d676f40c31fa.md)
- [The Crazy What If List](The%20Crazy%20What%20If%20List%20%E2%80%94%2050%20Unimaginable%20Video%20Ide%2034d57b89d00e815ba621f1886c509f34.md)
- [Vivido Brainstorm & Strategy OS](../Vivido%20%E2%80%94%20Product%20Brainstorm%20&%20Strategy%20OS%2034d57b89d00e81d9bd77db7254c9e23b.md)