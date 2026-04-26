# Vivido

> *Make video creation as natural as writing a document — but as powerful as a full production studio.*

<div align="center">

**Next-generation video creation platform for YouTube creators and content teams**

[![Stage: Foundation](https://img.shields.io/badge/Stage-Foundation-yellow)]()
[![Build Status](https://img.shields.io/badge/build-in%20progress-orange)]()
[![License](https://img.shields.io/badge/license-proprietary-blue)]()

[Features](#-key-features) • [Vision](#-the-vision) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Roadmap](#-roadmap)

</div>

---

## 🎯 The Vision

**Vivido** is a next‑generation video editor designed for creators who want professional results without the complexity of traditional tools like Premiere Pro or Final Cut. Unlike mainstream editors that require weeks of learning, Vivido combines the ease‑of‑use of web‑based platforms (VEED, Riverside) with the multi‑track power of desktop software.

### The Problem We're Solving

Today's creators face an impossible choice:
- **Too Simple**: Tools like Canva Video and VEED lack multi-track editing and professional controls
- **Too Complex**: Premiere Pro and Final Cut require months to master and feel like overkill for content creation
- **Too Fragmented**: Creators juggle 3-5 tools (Descript for transcription, VEED for editing, CapCut for social clips) and lose hours in tool-switching

### Our Solution

Vivido bridges this gap by offering:
- ✨ **Unified Workspace**: Record → Edit → Polish → Repurpose → Publish in one unbroken workflow
- 🎬 **Multi-Track Editing**: Full timeline with unlimited video and audio tracks
- ✍️ **Text-Based Editing**: Edit the transcript, the video edits itself (inspired by Descript)
- 🤖 **AI That Actually Works**: One-click noise removal, auto-captions, silence removal, and smart scene detection
- 🎨 **Radical Simplicity**: A 5th grader could use it — big buttons, no hidden menus, drag-and-drop everything
- 🚀 **Professional Output**: Export to any format, resolution, or codec you need

With the name *Vivido* – short, vivid, and memorable – we position ourselves as the bright, effortless alternative in a crowded market.

---

## 🎯 Who It's For

### Solo YouTube Creators
- Makes 2–4 videos/month, 8–25 minutes long
- Tired of the Premiere learning curve
- Currently juggling Descript + VEED + CapCut
- **Dream**: Press record, get a great video, publish it, move on
- **Willing to pay**: ₹800–₹2,000/month for 10+ hours saved per week

### Agency & Brand Teams
- 2–10 person content teams
- 10–30 videos/month across multiple clients
- Need brand consistency, collaboration, and role-based access
- **Pain**: Worried about content ownership with tools like CapCut
- **Willing to pay**: $30–$80/month/seat for IP protection and workflow efficiency

**NOT building for**: Educators, Loom-replacement use cases, or B2B enterprise video platforms.

---

## ✨ Key Features

### 🎥 Recording Studio
- **Multi-source capture**: Camera + screen + audio simultaneously
- **Any format**: Portrait (TikTok/Reels), landscape (YouTube), or custom resolutions
- **In-app recording**: No need for external screen capture tools
- **Auto-framing** and acoustic environment simulation

### ✂️ Text-Based Editing
- **Edit by transcript**: Cut the text, cut the video — no razor tools needed
- **Auto-transcription**: Powered by Whisper AI
- **Multi-language support**: Accurate transcription in 50+ languages
- **Smart silence removal**: AI detects and removes dead air

### 🎨 Professional Timeline
- **Multi-track editing**: Unlimited video and audio layers
- **GPU-accelerated effects**: Real-time filters, transitions, and color grading
- **Preset library**: One-click animations, overlays, and lower thirds
- **Audio engine**: Background noise removal sharper than Riverside, with full EQ controls

### 🤖 AI-Powered Enhancements
- **Smart scene detection**: Automatically identify chapter breaks
- **Auto-captions**: Stylish, accurate subtitles with one click
- **Best-take compositor**: AI picks the best version of repeated takes
- **Rhythm DNA**: Analyzes pacing and suggests edits
- **Thumbnail prediction**: AI recommends the best frame for thumbnails

### 📱 Content Multiplier
- **11 pieces from 1 video**: Automatically repurpose long-form content into:
  - Short clips for TikTok/Reels/Shorts
  - Audiograms for podcasts
  - Quote cards for social media
  - Blog posts from transcripts
- **Platform adaptation**: Auto-resize and optimize for each platform
- **Direct publishing**: Schedule to YouTube, TikTok, Instagram from the app

### 🔒 Creator-First Principles
- ✅ **Auto-save every 30 seconds** with 30-day visible version history
- ✅ **Your content is yours**: 100% ownership pledge in our ToS
- ✅ **No dark patterns**: 1-click cancel, always
- ✅ **Export control**: Full control over bitrate, codec, and resolution
- ✅ **Background rendering**: Never block the UI — render while you work on the next project

---

## 🛠 Tech Stack

**Locked** — Changes require Architecture Decision Record (ADR)

| Layer | Technology | Reason |
|-------|-----------|---------|
| **Frontend** | React + Vite | Web-first, fast HMR |
| **Desktop** | Electron | Native file access, offline-first |
| **Video Engine** | FFmpeg WASM + Native | Industry standard, powerful, free |
| **AI/ML** | Claude API + Whisper | Transcription & script analysis |
| **Collaboration** | Liveblocks | Real-time multiplayer editing |
| **Cloud Render** | AWS MediaConvert | Background render queue |
| **Storage** | Supabase + Cloudflare R2 | Cost-effective, scalable |
| **Auth** | Supabase Auth | Simple, fast, secure |
| **Payments** | Stripe + Razorpay | Global + India UPI support |
| **Deployment** | Vercel + GitHub Actions | Fast CI/CD |

### Architecture Principles

1. **Local-first**: Files write to disk before cloud upload
2. **Never compress at capture**: Audio as WAV, video at source resolution (up to 4K)
3. **Background rendering**: Never block the editing UI
4. **Version history as diffs**: Not full file copies — 30-day retention
5. **No AI auto-apply**: Always check AI Trust Settings first

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 20.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vivido.git
cd vivido

# Install dependencies
npm install

# Start the web app
npm run dev:web

# Or start the desktop app
npm run dev:desktop
```

### Project Structure

```
vivido/
├── apps/
│   ├── desktop/          # Electron desktop application
│   └── web/              # React web application
├── packages/
│   ├── ai-layer/         # AI/ML integrations (Whisper, Claude)
│   ├── shared/           # Shared utilities and types
│   ├── ui/               # Design system components
│   └── video-engine/     # FFmpeg wrapper and video processing
├── supabase/
│   ├── functions/        # Edge functions
│   └── migrations/       # Database migrations
├── docs/                 # Documentation
└── _bmad/                # BMad Builder project management
```

---

## 🗺 Roadmap

### Current Status: **Stage 0 — Foundation** 🟡 In Progress

| Stage | Name | Status | Ships |
|-------|------|--------|-------|
| **Stage 0** | Foundation | 🟡 In Progress | Auth, project workspace, brand kit, design system, DB schema |
| **Stage 1** | Record | ⏸️ Not Started | Camera + screen + audio capture, auto-framing, sprint mode |
| **Stage 2** | AI Edit | ⏸️ Not Started | Smart editing, transcript-based editing, AI enhancements |
| **Stage 3** | Repurpose & Publish | ⏸️ Not Started | Content multiplier, platform adaptation, scheduling |
| **Stage 4** | MSP Polish | ⏸️ Not Started | Performance, onboarding, pricing, GTM |

### 🔒 Non-Negotiables (Must Ship Before Public Launch)

- [ ] Auto-save every 30 seconds with visible version history
- [ ] Export quality controls (bitrate, codec, resolution)
- [ ] Background rendering (work on next video while rendering)
- [ ] Content Ownership Pledge (in-app + ToS)
- [ ] 1-click cancel subscription
- [ ] First video created in under 5 minutes

---

## 🤝 Contributing

Vivido is currently in private development. If you're interested in contributing or have been invited to the project:

1. Read the [Project Constitution](./claude.md)
2. Check the [PRD](./Vivido%20—%20Product%20Brainstorm%20&%20Strategy%20OS/) for feature specs
3. Follow the architecture decisions — changes require an ADR
4. Never compress audio at capture stage
5. Never block the UI during rendering
6. Auto-save must work reliably

---

## 📄 License

Proprietary — All rights reserved.

---

## 🌟 Why "Vivido"?

The name comes from the Spanish/Italian word for **vivid** — bright, intense, full of life. It's:
- **Short**: Easy to type, say, and remember
- **Global**: Works across languages
- **Evocative**: Suggests vibrant, lively content creation
- **Memorable**: Stands out in a sea of generic tool names

Just like the product itself: **bright, effortful, and impossible to forget.**

---

<div align="center">

**Made with ❤️ for creators who deserve better tools**

[Report Bug](https://github.com/yourusername/vivido/issues) • [Request Feature](https://github.com/yourusername/vivido/issues) • [Documentation](./docs/)

</div>
