# Vivido — Shared UI Boundary Note

**Status:** Working recommendation
**Purpose:** Explain the shared UI boundary in plain language and define the preferred split before sprint 1 scaffolding.

---

## What It Is

This decision answers:

- what should be reusable across platforms
- what should stay part of the desktop editor only

The goal is to avoid mixing simple reusable components with complex desktop-specific editor surfaces.

---

## Plain-English Rule

Share the Lego bricks, not the assembled houses.

That means:

- reusable primitives go into shared packages
- full editor surfaces stay local to the desktop app

---

## Recommended Split

### Shared: `packages/ui`

Put reusable design-system primitives here:

- buttons
- icon buttons
- tabs
- chips
- badges
- inputs
- sliders
- progress bars
- typography wrappers
- token exports
- small panel/header primitives

These should be lightweight and mostly presentational.

### Desktop-only: `apps/desktop`

Keep full desktop editor features here:

- title bar shell
- media browser
- timeline workspace
- transcript workspace
- Audio Room
- Publish Package workspace
- inspector panels
- desktop shortcuts
- Electron-specific drag/drop and file behavior

These are feature compositions with desktop assumptions and should not be forced into the shared package early.

---

## Why This Fits Vivido

Vivido’s future mobile experience will not be the desktop editor squeezed onto a phone.

It may reuse:

- tokens
- button patterns
- badges
- some form controls

But it will not reuse the desktop editing surface wholesale.

So sprint 1 should optimize for:

- clean desktop implementation
- reusable primitives where obvious
- minimal premature abstraction

---

## Current Recommended Decision

For sprint 1, use:

- `packages/ui` for primitives only
- `apps/desktop` for feature-level editor UI
- promotion into shared only after a component proves portable
- no aggressive React Native-driven refactoring before it is needed

This should be treated as the default decision unless replaced by a stronger alternative before scaffolding begins.
