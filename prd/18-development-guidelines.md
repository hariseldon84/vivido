# Vivido — Development Guidelines

**Status:** Approved
**Purpose:** Align engineering execution to the locked PRD, architecture, and design system so implementation does not drift from the intended product.

---

## 1. Source Of Truth Order

When requirements conflict, use this order:

1. `prd/02-architecture.md` for architecture and runtime boundaries
2. `prd/01-vision.md` for product intent, design laws, and user positioning
3. `_designs/design-guidelines.md` for UI principles, tokens, component rules, spacing, and motion
4. `_designs/app-ui/*.html` for screen-level reference and layout behavior
5. Epic files in `prd/03` through `prd/10` for feature-specific deliverables
6. `final_prd.md` as a summary document only

If a conflict appears between `final_prd.md` and `prd/`, `prd/` wins.

---

## 2. Product Development Rules

These rules are not optional implementation preferences. They are part of the product.

### MLP Focus

- Build only what is required for a creator to finish a first YouTube video with zero tool switching.
- Do not add Stage 2 or Stage 3 ideas into MLP epics because they feel adjacent.
- If a feature improves delight but does not improve first-project completion, it is not MLP by default.

### Runtime Discipline

- The desktop app is the primary product.
- The web app is a companion surface at MLP, not the main editing environment.
- All compute-heavy behavior must route through the typed platform boundary, never directly from renderer code.
- Native media performance is a product requirement, not a later optimization pass.

### Offline And Trust Rules

- Core editing must function offline.
- AI must always be disclosed before creator action completes.
- AI can suggest and preview, but never silently apply.
- Creator data remains local-first unless a specific sync or upload action is requested.

---

## 3. Design Is Part Of The Spec

The design system is not a moodboard. It is a behavioral contract for implementation.

### Non-Negotiable Product Feel

- Vivido must feel cinema-grade, dense, and serious.
- The app must feel easier than Resolve or FCP without looking toy-like.
- Dark mode is not a mode. It is the only product surface.
- Footage is the protagonist. Chrome exists to support action, not attract attention.

### What Developers Must Preserve

- Fixed panel muscle-memory layout
- Dark-only surface hierarchy
- Dense information layout over roomy whitespace
- AI disclosure and reversibility
- Professional tool aesthetic over consumer SaaS polish

Developers should assume that changing these is equivalent to changing the product strategy.

---

## 4. Visual Token Rules

Use the locked tokens from `_designs/design-guidelines.md`.

### Color System

- Only use the four base background layers: `--bg-base`, `--bg-panel`, `--bg-surface`, `--bg-elevated`
- Use `--accent` indigo as the only brand accent in the app
- Use semantic colors only for meaning:
  - green = success/pass
  - amber = warning/marker
  - red = error/missing
  - teal = audio-specific UI
- Do not invent new panel colors, gradients, or accent families

### Typography

- Use system font stack for app chrome
- Use monospace only for timecodes, meters, values, file sizes, and technical readouts
- Respect the locked size bands in the design guidelines
- Do not introduce oversized marketing-style typography into editor surfaces

### Spacing

- Stay within the locked spacing scale
- Avoid arbitrary one-off paddings and margins
- Dense does not mean cramped; it means deliberate and repeatable

### Motion

- Motion should be fast, minimal, and mostly invisible
- No springy motion
- No decorative panel entrances
- Playback and scrub states should feel instant, not animated

---

## 5. Screen-Level Implementation Rules

The HTML files in `_designs/app-ui/` are the implementation targets for interaction shape and layout composition.

### 01 Timeline Editor

Must preserve:

- title bar structure
- left media/browser region
- central preview + timeline composition
- fixed track label width
- track color coding for video, audio, and captions
- playhead prominence
- professional dense timeline layout

### 02 Transcript View

Must preserve:

- transcript as a primary editing surface, not a side utility
- word-state styling for playing, filler, silence, and selection
- inline chapter and Shorts markers
- confidence and AI assistance visibility

### 03 Audio Room

Must preserve:

- audio-specific semantic color usage
- metering readability
- EQ/processing controls that feel like a real audio tool, not a simplified wizard
- LUFS visibility as a first-class value

### 04 Publish Package

Must preserve:

- readiness/status framing
- package completeness visibility
- platform-specific checklist clarity
- publish as a workflow endpoint, not a file-export dialog

---

## 6. Component Rules

Before creating or modifying components, engineers should check `_designs/design-guidelines.md` for the exact intended treatment.

### Must Be Standardized

- title bars
- panel headers
- tabs
- buttons
- icon buttons
- AI badge
- toggle switches
- filter chips
- input fields
- sliders
- cards
- progress bars
- timeline clips
- transcript word states
- checklist states

### Specific Enforcement

- There must be exactly one `AIBadge` visual treatment
- There must be exactly one panel-depth system
- There must be exactly one spacing scale
- There must be exactly one timeline track coding system

If multiple implementations emerge, consolidate them instead of allowing visual forks.

---

## 7. Prohibited UI Drift

Do not introduce any of the following without an explicit design decision:

- light mode
- broad rounded consumer-SaaS styling
- gradient screen backgrounds
- floating action buttons
- decorative empty-state illustrations
- second accent color in the editor
- AI actions that skip confirmation
- spinner-based timeline or playback UX as a “design solution”
- fluid panel widths that break muscle memory

If the app starts to look like a generic AI SaaS dashboard, it is wrong.

---

## 8. Definition Of Done For UI Work

No UI story is done unless it passes all of these checks:

- matches the relevant PRD epic requirements
- respects `_designs/design-guidelines.md`
- visually maps to the corresponding `_designs/app-ui/*.html` target where relevant
- uses approved tokens and shared components
- preserves dense professional editor feel
- preserves AI disclosure rules
- works on minimum supported screen sizes for desktop
- does not degrade playback or editing responsiveness

For screen work, developers should include before/after screenshots or equivalent visual verification in the PR/review workflow.

---

## 9. Engineering Workflow Guidance

### Build Sequence

- Start with the shell and shared foundations
- Build shared tokens/components before feature-specific variants
- Implement layout skeletons before feature logic when creating new screens
- Prefer story slices that produce visible, testable screen progress

### Review Sequence

Every UI change should be checked in this order:

1. product requirement fit
2. architecture/runtime correctness
3. design token/layout adherence
4. responsiveness and performance
5. edge-state and empty-state handling

---

## 10. Developer Summary

Build Vivido as:

- a serious desktop creative tool
- with local-first performance characteristics
- with a strict design system
- with AI that assists but never hijacks
- with YouTube-native workflows embedded in the edit surface

If an implementation is technically correct but breaks the intended product feel, it is not complete.
