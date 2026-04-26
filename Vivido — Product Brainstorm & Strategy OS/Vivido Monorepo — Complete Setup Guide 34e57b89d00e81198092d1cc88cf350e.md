# Vivido Monorepo — Complete Setup Guide

# Vivido Monorepo — Complete Setup Guide

> **Status:** Do this before writing a single line of Vivido code
> 

> **Time to complete:** ~45 minutes
> 

> **Prerequisite:** Node.js 20+, Git, VS Code with the Vivido folder open
> 

---

## 🏗️ The Complete Folder Structure We Are Building

Before you touch any installer, here is exactly what the Vivido monorepo will look like when fully set up:

```
vivido/
│
├── CLAUDE.md                    ← Project constitution. Claude reads this every session.
├── .gitignore
├── package.json                 ← Workspace root
├── README.md
│
├── _bmad/                       ← BMAD runtime (auto-installed)
│   ├── core/                    ← Core agents + tasks
│   ├── bmm/                     ← BMad Method module
│   └── _config/                 ← Manifest + help catalog
│
├── _bmad-output/               ← Where BMAD writes PRD shards, stories, arch docs
│   ├── architecture.md
│   ├── prd-shards/
│   └── stories/
│       ├── stage-0/
│       ├── stage-1/
│       ├── stage-2/
│       └── stage-3/
│
├── .claude/                     ← Claude Code config
│   ├── commands/                ← BMAD slash commands
│   └── skills/
│       └── gstack/              ← Gstack skills (auto-installed)
│
├── .agent/                      ← claude-mem memory directory
│   └── rules/
│
├── .hebbs/                      ← HEBBS memory index (auto-created)
│
├── docs/                        ← Human-readable documentation
│   ├── DESIGN.md                ← Vivido design system (Gstack output)
│   ├── architecture.md          ← Final locked architecture
│   ├── decisions/               ← Architecture Decision Records
│   └── api/                     ← API contracts
│
├── apps/                        ← Monorepo apps
│   ├── web/                     ← React web app (Vite)
│   └── desktop/                 ← Electron wrapper
│
├── packages/                    ← Shared packages
│   ├── ui/                      ← Design system components
│   ├── video-engine/            ← FFmpeg WASM wrapper
│   ├── ai-layer/                ← Claude API + Whisper integration
│   └── shared/                  ← Types, utils, constants
│
└── supabase/                    ← DB migrations + edge functions
    ├── migrations/
    └── functions/
```

---

## ⚠️ Before You Start — Critical Points

1. **Everything runs from the `vivido/` root** in VS Code terminal. Never run installers from a subfolder.
2. **BMAD installs into the project** (`_bmad/` folder inside Vivido). claude-mem and Gstack install **globally** (`~/.claude/`). This is by design.
3. **Do not create `apps/` or `packages/` yet.** Set up the tooling layer first. Build scaffolding comes in Phase 3.
4. **Git init first** — all tools expect a git repo.
5. **Node.js 20+ required** for BMAD. Run `node --version` to confirm.

---

## 📦 PHASE 1 — Repo Foundation (5 minutes)

Open your VS Code terminal in the `vivido/` folder.

### Step 1.1 — Git Init

```bash
git init
git branch -M main
```

### Step 1.2 — Create root package.json

```bash
npm init -y
```

Then update `package.json` to:

```json
{
  "name": "vivido",
  "version": "0.1.0",
  "private": true,
  "description": "Vivido — Next-generation video creation platform",
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "engines": {
    "node": ">=20.0.0"
  },
  "scripts": {
    "dev:web": "npm run dev --workspace=apps/web",
    "dev:desktop": "npm run dev --workspace=apps/desktop",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces"
  }
}
```

### Step 1.3 — Create .gitignore

```bash
cat > .gitignore << 'EOF'
# Node
node_modules/
.npm

# Build outputs
dist/
.next/
.vite/

# Environment
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# BMAD output (optional — commit when ready for review)
# _bmad-output/

# claude-mem database (personal, not team)
.claude-mem/

# Electron
out/
release/

# Supabase
.supabase/
EOF
```

### Step 1.4 — Create folder scaffolding

```bash
mkdir -p _bmad-output/stories/stage-0
mkdir -p _bmad-output/stories/stage-1
mkdir -p _bmad-output/stories/stage-2
mkdir -p _bmad-output/stories/stage-3
mkdir -p _bmad-output/prd-shards
mkdir -p docs/decisions
mkdir -p docs/api
mkdir -p apps/web
mkdir -p apps/desktop
mkdir -p packages/ui
mkdir -p packages/video-engine
mkdir -p packages/ai-layer
mkdir -p packages/shared
mkdir -p supabase/migrations
mkdir -p supabase/functions

# Keep empty folders in git
touch _bmad-output/stories/stage-0/.gitkeep
touch _bmad-output/stories/stage-1/.gitkeep
touch _bmad-output/stories/stage-2/.gitkeep
touch _bmad-output/stories/stage-3/.gitkeep
touch _bmad-output/prd-shards/.gitkeep
touch docs/decisions/.gitkeep
touch docs/api/.gitkeep
```

### Step 1.5 — Initial commit

```bash
git add .
git commit -m "chore: vivido monorepo foundation"
```

---

## 🧠 PHASE 2 — Install All Tools (20 minutes)

### Step 2.1 — Install claude-mem (Memory Layer)

**Install globally** — works across all your projects:

```bash
npx claude-mem install
```

When it asks for configuration:

- **Mode:** code (default)
- **AI model:** claude-sonnet-4-6 (or your preferred model)
- **Port:** 37777 (default)
- **Data directory:** ~/.claude-mem (default)

Verify it's running:

```bash
curl http://localhost:37777/health
# Should return: {"status": "ok"}
```

**What just happened:** claude-mem is now running as a background worker. Every Claude Code session in any project will automatically have its observations captured and stored.

---

### Step 2.2 — Install Gstack (Design + Build + Ship)

**Install globally** — linked into Claude Code's skills system:

```bash
git clone --single-branch --depth 1 \
  https://github.com/garrytan/gstack.git \
  ~/.claude/skills/gstack

cd ~/.claude/skills/gstack && ./setup

# Return to your vivido folder
cd /path/to/vivido
```

Then add Gstack to the Vivido project so teammates (future) get it automatically:

```bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
rm -rf .claude/skills/gstack/.git
cd .claude/skills/gstack && ./setup
cd /path/to/vivido
```

---

### Step 2.3 — Install BMAD (Documentation + Stories)

**Install into the Vivido project root:**

```bash
# From your vivido/ root
npx bmad-method install
```

When the interactive installer runs, answer as follows:

| Prompt | Answer |
| --- | --- |
| Install directory | current directory (vivido/) |
| Select modules | BMad Method (BMM) — select this, skip others for now |
| Select IDE tools | claude-code ❤️ (starred as preferred) |
| Module config | Accept defaults |

After install, you will see:

```
vivido/
  _bmad/          ← created
  _bmad-output/   ← already existed
  .claude/commands/  ← slash command stubs created
```

Verify BMAD slash commands are available in Claude Code:

```bash
ls .claude/commands/
# Should show: bmad-help.md, bmad-pm.md, bmad-architect.md, etc.
```

---

### Step 2.4 — Install Superpowers (TDD Enforcement)

Superpowers is installed via the Claude Code plugin marketplace:

1. Open Claude Code in your terminal from the `vivido/` folder: `claude`
2. Type: `/plugins` or open the plugin marketplace
3. Search: **Superpowers**
4. Install

Alternatively via npm if direct install is available:

```bash
npm install -g @superpowers/claude-plugin
```

Check Anthropic's Claude Code plugin marketplace at:

[https://docs.claude.com/claude-code/plugins](https://docs.claude.com/claude-code/plugins)

---

### Step 2.5 — Set Up HEBBS (Contradiction Detection)

```bash
# Install HEBBS globally
npm install -g @hebbs/cli

# Initialize in the Vivido project
hebbs init
```

Create `.hebbs-ignore` in the project root:

```bash
cat > .hebbs-ignore << 'EOF'
# Exclude from memory index
.env
.env.*
*.key
*.pem
node_modules/
_bmad/
.claude-mem/
dist/
out/
EOF
```

The `.hebbs/` folder will auto-create on first indexing run.

---

### Step 2.6 — Commit the Tool Setup

```bash
git add .
git commit -m "chore: install BMAD, Gstack, claude-mem, HEBBS, Superpowers"
```

---

## 📖 PHASE 3 — Write the Vivido [CLAUDE.md](http://CLAUDE.md) (15 minutes)

This is the most important file in the entire project. Claude reads it at the start of every session. It is the project constitution.

Create `CLAUDE.md` in the vivido root:

```markdown
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

## Monorepo Structure
```

vivido/

├── apps/web/           React + Vite — main web application

├── apps/desktop/       Electron — wraps apps/web

├── packages/ui/        Shared design system components

├── packages/video-engine/  FFmpeg WASM wrapper

├── packages/ai-layer/  Claude API + Whisper integration

├── packages/shared/    Types, utils, constants

├── supabase/           DB migrations + edge functions

├── _bmad/              BMAD runtime — do not edit manually

├── _bmad-output/       BMAD generated artifacts (PRD shards, stories)

├── docs/               Human-readable docs ([DESIGN.md](http://DESIGN.md), [architecture.md](http://architecture.md))

```

## Installed Tools + How to Use Them

### BMAD — Documentation + Stories
- Run agents with: /bmad-pm, /bmad-architect, /bmad-sm, /bmad-dev, /bmad-qa
- All generated artifacts go to _bmad-output/
- Run `bmad-help` anytime to see what to do next

### Gstack — Design + Build + Ship
- /design-consultation → builds DESIGN.md
- /design-shotgun     → generates visual mockup variants
- /plan-ceo-review    → challenges product decisions
- /plan-eng-review    → locks architecture
- /review             → auto-fix + flag issues
- /qa                 → real browser testing
- /ship               → PR + deploy

### Superpowers — TDD Enforcement
- Applied to every story involving: audio processing, video engine, AI features
- Tests MUST be written before code — no exceptions
- Never rationalize skipping the test phase

### claude-mem — Memory
- Runs automatically in background on port 37777
- Captures every session automatically — no manual action needed
- Check memory: open http://localhost:37777 in browser

### HEBBS — Contradiction Detection
- Run `hebbs check` before starting any story to surface contradictions
- Run `hebbs reflect` weekly to cluster insights

## MSP Feature Status
See Notion Feature Database for full status:
https://www.notion.so/34d57b89d00e8185bec0ca6d6b8bc207

## Related Notion Pages
- PRD: https://www.notion.so/34d57b89d00e8185bec0ca6d6b8bc207
- Feature Database: linked in PRD
- User Research: https://www.notion.so/34d57b89d00e8168ac82d676f40c31fa
- What If List: https://www.notion.so/34d57b89d00e815ba621f1886c509f34
- Strategy OS: https://www.notion.so/34d57b89d00e81d9bd77db7254c9e23b

## How to Start a Build Session
1. Open terminal in vivido/ root
2. Run: claude (opens Claude Code)
3. claude-mem auto-injects prior context at session start
4. Run: hebbs check (surface any contradictions)
5. Check _bmad-output/stories/ for next story to work on
6. Begin with Superpowers: write tests first
7. Build, then run /review
8. Run /qa when a screen or flow is complete
9. Update this CLAUDE.md if any new arch decisions are made
```

Save `CLAUDE.md` and commit:

```bash
git add CLAUDE.md
git commit -m "docs: add Vivido CLAUDE.md project constitution"
```

---

## 🔒 PHASE 4 — Configure Gstack for Vivido (5 minutes)

Add the Gstack section to the bottom of your `CLAUDE.md`. This tells Claude Code exactly how to use Gstack:

```markdown
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
```

---

## ✅ PHASE 5 — Verify Everything Works (5 minutes)

Run this checklist before starting any BMAD or Gstack work:

```bash
# 1. Confirm Node version
node --version
# Must be v20.0.0 or higher

# 2. Confirm BMAD is installed
ls _bmad/
# Should show: core/ bmm/ _config/

# 3. Confirm BMAD slash commands are wired
ls .claude/commands/
# Should show multiple .md files

# 4. Confirm Gstack skills are available
ls .claude/skills/gstack/
# Should show skill folders: plan-ceo-review/, design-shotgun/, etc.

# 5. Confirm claude-mem is running
curl -s http://localhost:37777/health
# Should return {"status": "ok"}

# 6. Confirm CLAUDE.md exists
cat CLAUDE.md | head -5
# Should show Vivido project constitution

# 7. Check git status is clean
git status
# Should show: nothing to commit, working tree clean
```

If all 7 checks pass, your monorepo is ready.

---

## 🚀 PHASE 6 — First Claude Code Session (What to Run First)

Once everything is installed, open Claude Code from the vivido/ root:

```bash
claude
```

Then run these in order in the first session:

```
1. /bmad-help
   → Confirms BMAD is loaded and shows what's available

2. /office-hours
   → Gstack's YC-partner pressure test on Vivido
   → Feed it the PRD summary from Notion
   → Let it challenge the product decisions

3. /design-consultation
   → Start building DESIGN.md for Vivido
   → Vivido's design system: dark-mode first, creator tool aesthetic
   → Output goes to docs/DESIGN.md

4. /plan-ceo-review
   → Challenge every Stage 0 foundation decision
   → Particularly: Supabase vs PlanetScale, Liveblocks vs Yjs, R2 vs S3

5. /plan-eng-review
   → Lock the architecture
   → Output: architecture.md in docs/

6. /bmad-architect
   → BMAD Architect agent generates full architecture doc from PRD
   → Cross-reference with Gstack /plan-eng-review output
   → Reconcile any differences before proceeding

7. /bmad-pm
   → Feed BMAD the Vivido PRD from Notion
   → Shard into epic files → output to _bmad-output/prd-shards/

8. /bmad-sm
   → Scrum Master generates Stage 0 stories
   → Output: _bmad-output/stories/stage-0/
   → These become your build queue
```

After Step 8, you have:

- A locked architecture document
- A design system in progress
- A sharded PRD
- A sequenced story queue for Stage 0

**You are now ready to build Vivido.**

---

## 🗓️ The Weekly Rhythm

This is how each build week should run:

| Day | Activity |
| --- | --- |
| Monday | Run `hebbs check`. Review story queue. Pick 3-5 stories for the week. |
| Daily | Open Claude Code, claude-mem auto-loads context. Build story. Run /review. |
| When a screen is done | Run /qa — real browser test. Fix anything flagged. |
| Friday | Run /retro. Update Notion Feature Database statuses. Run `hebbs reflect`. |
| End of stage | Run /ship. Tag the release. Celebrate. Plan next stage. |

---

## ⚠️ Common Mistakes to Avoid

| Mistake | Why it hurts | Fix |
| --- | --- | --- |
| Running installers from a subfolder | BMAD installs in wrong location | Always run from vivido/ root |
| Starting to code before /plan-eng-review | Arch decisions made in a rush become tech debt | Do /plan-eng-review first, always |
| Skipping tests because "it's quick" | Superpowers 1% rule exists for a reason | Tests before code. Every time. |
| Not updating [CLAUDE.md](http://CLAUDE.md) after arch decisions | Future sessions lose context | Write it down immediately |
| Working on two stories at once | BMAD stories have dependencies | One story at a time, in sequence |
| Pushing to main without /review | Lint issues and race conditions slip through | /review gates every merge |

---

## 🔗 Related Notion Pages

- [Vivido PRD](Vivido%20%E2%80%94%20Product%20Requirements%20Document%20(PRD)%2034d57b89d00e8185bec0ca6d6b8bc207.md)
- [Framework & Memory OS Evaluation](Framework%20&%20Memory%20OS%20%E2%80%94%20Critical%20Evaluation%20for%20Vi%2034e57b89d00e817f8ae0fe05af599285.md)
- [User Research](User%20Research%20%E2%80%94%20Competitor%20Reviews%20&%20Creator%20Pain%20%2034d57b89d00e8168ac82d676f40c31fa.md)
- [What If List](The%20Crazy%20What%20If%20List%20%E2%80%94%2050%20Unimaginable%20Video%20Ide%2034d57b89d00e815ba621f1886c509f34.md)
- [Vivido Strategy OS](../Vivido%20%E2%80%94%20Product%20Brainstorm%20&%20Strategy%20OS%2034d57b89d00e81d9bd77db7254c9e23b.md)