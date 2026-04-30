# Vivido — Sprint 1 Architecture Blockers Summary

**Status:** Working decisions
**Purpose:** One-page summary of the three pre-sprint architecture blockers and the current recommended direction for each.

---

## 1. `usePlatform()` Contract

### What It Is

The bridge between the UI and heavy runtime capabilities.

### Working Decision

- use a capability-based grouped API
- examples:
  - `platform.media.importFiles(...)`
  - `platform.transcript.startJob(...)`
  - `platform.publish.renderPackage(...)`
- use direct typed async results for small operations
- use job-based flows for long-running operations
- return explicit `UNSUPPORTED` errors on web
- keep UI state out of this layer

### Why

This keeps renderer code clean, testable, and independent from native implementation details.

---

## 2. IPC Schema / Tooling

### What It Is

The formal validated message system between the React renderer and the Electron/native side.

### Working Decision

- use **Zod** for IPC request/response schemas
- use **zod-to-json-schema** for generated JSON Schema output
- keep shared contracts in `packages/ipc`
- validate payloads at both renderer and native boundaries
- block untyped/raw IPC in feature code
- enforce contract validity in CI

### Why

This reduces crashes, schema drift, and unsafe message handling while fitting the PRD’s typed-contract requirement.

---

## 3. Shared UI Boundary

### What It Is

The split between reusable UI primitives and desktop-specific editor features.

### Working Decision

- `packages/ui` contains reusable design-system primitives only
- `apps/desktop` contains feature-level editor UI and Electron-specific behavior
- move components into shared only after they prove portable
- do not optimize sprint 1 around hypothetical React Native reuse

### Why

This avoids premature abstraction and prevents desktop-only complexity from polluting the shared design-system layer.

---

## Final Sprint 1 Direction

Use this stack and boundary model:

- grouped `usePlatform()` capability API
- Zod-based shared IPC contracts in `packages/ipc`
- primitive-only shared UI in `packages/ui`
- feature-heavy editor composition inside `apps/desktop`

These three decisions are strong enough to begin repo scaffolding unless a materially better alternative appears before implementation starts.
