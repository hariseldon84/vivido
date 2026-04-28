# Vivido Design Guidelines
**Version:** 1.0 — Locked from app UI screens (2026-04-27)
**Source:** `_designs/app-ui/01-timeline-editor.html` → `04-publish-package.html`

These guidelines are the authoritative design reference for Vivido. Every component, every screen, every new feature starts here.

---

## 1. Design Principles

**Cinema-grade without the learning tax.**
Every panel should feel like DaVinci Resolve or Final Cut Pro when you open it — serious, dark, professional. But every action should complete in fewer steps than those tools require.

**Dark is the product, not a theme.**
There is no light mode. The dark environment isn't a preference — it's the product. Video editing happens in dark rooms. The UI retreats so footage is the protagonist.

**Information density over whitespace.**
Panels are dense. Controls are small. The editor knows where things are. We don't waste screen real estate on visual breathing room — every pixel is timeline, preview, or control.

**AI assists, creator decides.**
AI features (noise removal, transcription, chapter generation, style suggestions) always show before applying. Never silent auto-apply. The AI badge means "this was AI-assisted" — not "this happened automatically."

---

## 2. Color System

### Base Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0e0e10` | App background, timeline canvas |
| `--bg-panel` | `#141416` | Sidebars, inspector, title bar, footer bars |
| `--bg-surface` | `#1a1a1e` | Cards, input fields, track rows |
| `--bg-elevated` | `#222226` | Dropdowns, tooltips, selected states |
| `--bg-hover` | `#2a2a30` | Hover states on panels |

The base/panel/surface stack creates a 4-level depth system. Never create a new level. Always use one of these four.

### Borders

| Token | Value | Usage |
|---|---|---|
| `--border` | `rgba(255,255,255,0.07)` | Default panel borders, input outlines, dividers |
| `--border-strong` | `rgba(255,255,255,0.12)` | Hover state borders, active outlines |

Borders are ultra-subtle. They define structure without shouting. Never use a solid color border.

### Accent

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#6366f1` | Primary CTAs, active states, playhead, selected clips, progress fills |
| `--accent-bright` | `#818cf8` | Hover accent, secondary text on accent backgrounds |
| `--accent-dim` | `rgba(99,102,241,0.15)` | Active tab backgrounds, AI badge backgrounds, selected rows |

The accent is **Indigo 500**. It's the single dominant color. Don't introduce a second brand color.

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--green` | `#22c55e` | Success, LUFS pass, confidence high, auto-saved |
| `--amber` | `#f59e0b` | Warning, LUFS near-limit, filler words, Shorts markers |
| `--red` | `#ef4444` | Error, LUFS over, missing checklist items, muted tracks |
| `--teal` | `#14b8a6` | Audio tracks, secondary accent for audio-specific UI |

Use semantic colors only for their semantic meaning. Don't use amber for branding.

### Text

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#f0f0f4` | Main content, active controls, clip names |
| `--text-secondary` | `#8b8b9a` | Labels, panel titles, inactive controls |
| `--text-muted` | `#4a4a58` | Section dividers, timestamps, metadata |
| `--text-accent` | `#818cf8` | AI-related labels, accent callouts, active tab text |

---

## 3. Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
```
Ship with system fonts. Inter as fallback. Never bundle a custom Latin typeface for the UI chrome.

### Monospace (timecodes, values, frequencies)
```css
font-family: 'SF Mono', 'Menlo', monospace;
```
Use monospace for: timecodes, LUFS values, Hz/frequency labels, file sizes, version strings.

### Scale

| Use | Size | Weight | Notes |
|---|---|---|---|
| App chrome body | `12px` | `400` | Default body size throughout the app |
| Panel titles | `11px` | `600` | All-caps + letter-spacing `0.3px` |
| Section labels | `10px` | `600` | All-caps + letter-spacing `0.7px` + `--text-muted` |
| Clip names | `10px` | `500` | Truncate with ellipsis |
| Property labels | `11px` | `400` | `--text-secondary` |
| Timecode display | `13px` | `600` | Monospace + `letter-spacing: 1px` |
| Transcript words | `15px` | `400` | Line-height `1.75` |
| Metadata title input | `14px` | `600` | In Publish screen only |
| Readiness / LUFS numerals | `18–22px` | `700–800` | Large value displays |

---

## 4. Layout System

### App Shell
Every screen uses the same shell: **title bar → main panels → timeline/footer**.

```
┌─────────────────────────────────────────────────────┐
│ Title Bar (36px)                                     │
├──────────┬──────────────────────┬───────────────────┤
│ Left     │ Center / Main        │ Right             │
│ Panel    │ (preview / content)  │ Inspector / Panel │
│ (220px)  │ (flex 1)             │ (260–400px)       │
├──────────┴──────────────────────┴───────────────────┤
│ Timeline / Footer (220px or 28px)                    │
└─────────────────────────────────────────────────────┘
```

Column widths are fixed at those values. Don't create fluid column panels. The editor knows where things are muscle-memory-first.

### Title Bar (36px)
- macOS traffic lights left, app name, menu items
- Transport controls center (play/pause + timecode)
- View navigation tabs as a pill group
- Right: context CTAs (Transcript, Audio Room, Publish)
- Background: `--bg-panel` / border-bottom: `--border`

### Panel Headers (32–40px)
All secondary panel headers follow the same pattern:
- Height: `32px` (compact) or `40px` (primary)
- `--bg-panel` background
- Border-bottom: `--border`
- Content: `PANEL TITLE` in 11px 600 uppercase-secondary + optional right-aligned tab row or action

### Panels
- No outer padding on panel containers
- Content inside panels: `10–14px` padding
- Scrollable areas get a custom scrollbar: `4–5px` width, `--bg-elevated` thumb, no track background

---

## 5. Component Library

### Buttons

**Primary (accent filled)**
```css
background: --accent; border: 1px solid --accent; color: white;
height: 24px; padding: 0 10px; border-radius: 5px;
font-size: 11px; font-weight: 500;
```
Hover: `background: --accent-bright`

**Large Primary (publish/action)**
```css
background: linear-gradient(135deg, #4f46e5, #7c3aed);
height: 44px; border-radius: 8px; font-size: 14px; font-weight: 700;
box-shadow: 0 4px 20px rgba(99,102,241,0.3);
```
Hover: `transform: translateY(-1px); box-shadow: 0 6px 28px rgba(99,102,241,0.4)`

**Secondary (surface outlined)**
```css
background: --bg-surface; border: 1px solid --border; color: --text-secondary;
height: 24px; padding: 0 10px; border-radius: 5px; font-size: 11px;
```
Hover: `border-color: --border-strong; color: --text-primary`

**Icon Button (square)**
```css
width: 22–26px; height: 22–26px; border-radius: 3–4px;
background: none; border: none; color: --text-muted;
```
Hover: `background: --bg-hover; color: --text-secondary`
Active: `color: --accent-bright`

**Card Action Buttons** (inside AI cards)
```css
height: 22px; padding: 0 9px; border-radius: 4px; font-size: 10px;
```
Apply variant: `background: --accent; color: white`
Dismiss variant: `background: none; border: 1px solid --border; color: --text-muted`

### AI Badge
The AI badge is used wherever AI-generated content or AI-assisted actions are present.
```css
display: inline-flex; align-items: center; gap: 4px;
background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
border: 1px solid rgba(99,102,241,0.3); border-radius: 4px;
padding: 2px 8px; font-size: 10px; color: #818cf8; font-weight: 500;
```
Always paired with a 4px pulsing dot: `background: --accent-bright; box-shadow: 0 0 4px --accent`

**Rule:** Any button, badge, or indicator that triggers or reveals AI behavior gets this exact treatment. No exceptions.

### Toggle Switch
```css
width: 36px; height: 20px; border-radius: 10px;
/* on */ background: --accent;
/* off */ background: --bg-elevated; border: 1px solid --border;
/* knob */ width: 16px; height: 16px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);
```

### Tabs (Panel tabs)
```css
/* container */
background: --bg-surface; border-radius: 6px; padding: 2px; border: 1px solid --border;

/* inactive tab */
padding: 3px 12px; border-radius: 4px; font-size: 11px; color: --text-muted;

/* active tab */
background: --bg-elevated; color: --text-primary;
```

### Section Label / Divider
```css
font-size: 10px; font-weight: 600; letter-spacing: 0.7–0.8px;
text-transform: uppercase; color: --text-muted;
margin-bottom: 8px;
/* optional */ border-bottom: 1px solid --border; padding-bottom: 5px;
```

### Filter Chip
```css
height: 22px; padding: 0 9px; border-radius: 11px; font-size: 10px;
border: 1px solid --border; color: --text-muted;

/* active */
background: --accent-dim; border-color: rgba(99,102,241,0.35); color: --text-accent;
```

### Input Field
```css
height: 22–26px; background: --bg-surface; border: 1px solid --border;
border-radius: 4–6px; color: --text-primary; font-size: 11–12px;
padding: 0 7–12px;
```
Focus: `border-color: --accent`

### Slider
```css
/* track */
height: 3px; background: --bg-elevated; border-radius: 2px;

/* fill */
background: linear-gradient(90deg, --accent, --accent-bright);

/* thumb */
width: 10px; height: 10px; border-radius: 50%;
background: white; border: 1.5px solid --accent; box-shadow: 0 1px 4px rgba(0,0,0,0.5);
```

### Progress / Stat Bar
```css
height: 3–4px; background: --bg-elevated; border-radius: 2px;
/* fill colors: --green (ok), --amber (warn), --red (error) */
```

### Card (AI suggestions, platform destinations)
```css
background: --bg-surface; border: 1px solid --border;
border-radius: 8px; padding: 10–12px;
```
Hover: `border-color: --border-strong; background: --bg-elevated`
Highlight (AI): `border-color: rgba(99,102,241,0.3); background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(124,58,237,0.05))`

---

## 6. Timeline Components

### Track Structure
- Track label width: `220px` fixed
- Track height: `44px`
- Track border-bottom: `--border`
- Track label padding: `0 10px`

### Track Color Coding
| Track type | Icon bg | Clip bg | Border |
|---|---|---|---|
| Video | `rgba(99,102,241,0.2)` / indigo | `#4f52c8 → #3d3fa0` | `rgba(99,102,241,0.5)` |
| Audio | `rgba(20,184,166,0.2)` / teal | `#0f8f84 → #0b706a` | `rgba(20,184,166,0.4)` |
| Caption | `rgba(245,158,11,0.2)` / amber | `rgba(180,110,10,0.6)` | `rgba(245,158,11,0.35)` |

### Clip Style
```css
border-radius: 4px; top: 4px; bottom: 4px;
clip-name: font-size 10px; font-weight 500; color rgba(255,255,255,0.85);
```
Selected: `box-shadow: 0 0 0 1.5px --accent; filter: brightness(1.1)`

### Playhead
```css
width: 1px; background: --accent; z-index: 10;
/* triangle head */
width: 9px; clip-path: polygon(0 0, 100% 0, 50% 100%);
```

### Ruler
- Background: `--bg-surface`
- Tick lines: `rgba(255,255,255,0.06)`
- Tick labels: 8px monospace `--text-muted`

---

## 7. Media Thumbnails (Media Browser)

```css
aspect-ratio: 16/9; background: --bg-surface;
border: 1px solid --border; border-radius: 4px;
```
Hover: `border-color: --accent`

Gradient placeholder backgrounds (6 rotating):
- `linear-gradient(135deg, #1a1060, #2d1b69, #0f172a)` — deep indigo
- `linear-gradient(135deg, #0f1f1a, #0d3830, #052e2a)` — deep teal
- `linear-gradient(135deg, #1c0f22, #2d1047, #0e0014)` — deep violet
- `linear-gradient(135deg, #1a120a, #3d2008, #1c0a00)` — deep amber
- `linear-gradient(135deg, #0a1520, #0d2235, #061018)` — deep blue
- `linear-gradient(135deg, #201010, #4a1010, #200808)` — deep red

---

## 8. Transcript View

### Word States
```css
.word         { cursor: pointer; border-radius: 2px; padding: 1px 0; }
.word:hover   { background: rgba(255,255,255,0.06); }
.word.playing { background: rgba(99,102,241,0.25); border-bottom: 1.5px solid --accent; color: white; }
.word.filler  { color: --text-muted; text-decoration: line-through; opacity: 0.5; }
.word.filler-marked { background: rgba(239,68,68,0.1); color: #fca5a5; text-decoration: line-through; }
.word.silence { color: --text-muted; font-style: italic; background: rgba(255,255,255,0.03); }
```

### Chapter Markers (inline)
Left border accent: `3px solid --accent` (chapters) or `3px solid --teal` (later chapters)
Background: `--bg-surface`
Border-radius: `0 6px 6px 0`

### Shorts Markers (inline)
Left border: `3px solid --amber`
Background: `rgba(245,158,11,0.06)`
Border: `1px solid rgba(245,158,11,0.2)`

---

## 9. Audio Room

### Level Meters
- Container: `--bg-surface` border, thin vertical bars
- Fill gradient (bottom to top): `--green → --amber → --red`
- Target line: `rgba(245,158,11,0.5)`

### EQ Curve
- SVG path with `rgba(99,102,241,0.8)` stroke, `stroke-width: 2`
- Fill area: gradient `rgba(99,102,241,0.3)` → transparent
- Grid lines: `rgba(255,255,255,0.04)`
- Zero line: `rgba(255,255,255,0.08)`
- EQ nodes: 14px circles, border matches node type color

### LUFS Value Display
Large numerals (`18–22px`) in semantic color:
- `< −14` integrated: `--green`
- Near limit: `--amber`
- Over limit: `--red`

---

## 10. Publish Package

### Readiness Ring
SVG circle, `stroke-dasharray: 201`, dashoffset = `201 × (1 - readiness%)`
Stroke: `linear-gradient(#6366f1, #14b8a6)` — indigo to teal

### Checklist Icons
```css
.ok      { background: rgba(34,197,94,0.15); color: --green; }
.warn    { background: rgba(245,158,11,0.12); color: --amber; }
.missing { background: rgba(239,68,68,0.1);  color: --red; }
```
All 16×16px, border-radius 4px.

### Platform Status
Inline dot (6px circle) + text: green = Pass, amber = near limit, red = fail.

---

## 11. Spacing Reference

| Scale | Value | Use |
|---|---|---|
| xs | `4px` | Internal gap within components |
| sm | `6–8px` | Between related controls |
| md | `10–12px` | Panel padding, card padding |
| lg | `14–16px` | Section padding, toolbar padding |
| xl | `20–24px` | Page padding (transcript, metadata editor) |
| 2xl | `28px` | Between major sections |

Never use spacing values outside this scale.

---

## 12. Motion

Transitions are minimal and fast. The editor shouldn't feel animated — it should feel instant.

| Property | Duration | Easing |
|---|---|---|
| Color / background | `0.1s` | `ease` |
| Border transitions | `0.15s` | `ease` |
| Hover states | `0.1–0.15s` | `ease` |
| Toggle switches | `0.2s` | `ease` |
| Large transforms (button lift) | `0.2s` | `ease` |
| Playback animations | None — hardware driven | — |

No bouncy easing. No spring physics. No entrance animations on panels.

---

## 13. What We Never Do

- **No light mode.** The dark environment is the product, not a setting.
- **No rounded hero elements** (> 10px radius on panels). This is a professional tool, not a consumer app.
- **No gradient backgrounds on entire screens.** Gradients live in thumbnails and specific accents only.
- **No colored panel backgrounds.** Every panel is one of the four base tokens.
- **No font sizes below 9px** in any non-thumbnail context.
- **No AI feature that auto-applies.** Always badge + confirm.
- **No "loading" spinners** on timeline scrub or playback — if it spins, it's a GPU bug, not a design solution.
- **No second brand accent color.** Indigo is the only accent.
- **No floating action buttons.** Every action lives in a toolbar or panel.
- **No empty state illustrations.** Empty states show a functional hint, not a cartoon.
