# Milestone 1 — MLP

**Phase:** Core product launch
**Window:** Months 2–11
**Status:** PLANNED

---

## Purpose

Ship the Minimum Legendary Product: the smallest version of Vivido where a creator finishes a real YouTube project start-to-finish with zero tool switching and feels a category-level difference.

---

## Included Epics

- E1 Foundation Shell
- E2 Media Import & GPU Playback
- E4 Transcript & Captions
- E3 Timeline Editor
- E6 YouTube Primitives & Publish Package
- E5 Audio Room
- E7 Style Model
- E8 Auth, Accounts & Cloud Infrastructure

Execution order follows `prd/14-build-order.md`.

---

## Module Groups

### Platform Foundation

- shell, menu, navigation, status bar
- typed IPC contracts
- `usePlatform()` boundary
- autosave, crash recovery, version history
- security/compliance scaffolding

### Media And Playback

- import pipelines
- asset browser
- thumbnail generation
- hardware decode and fallback
- first-frame preview

### Core Editing

- timeline model
- track system
- clip operations
- transcript sync
- caption styling

### Creator Output

- YouTube-native timeline markers
- Audio Room processing
- Publish Package
- YouTube upload

### Retention Infrastructure

- guest mode
- account conversion moment
- style model passive initialization
- cloud sync and billing infrastructure

---

## Exit Criteria

- creator completes project start-to-finish in Vivido
- zero mandatory tool switching
- playback and scrub behavior meet PRD expectations on minimum spec
- Publish Package is complete and usable
- guest-to-account flow works at the save-style moment

