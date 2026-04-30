# Epic E1 — Foundation Shell

**Sprint:** 1–2
**Status:** IN PROGRESS
**Depends on:** Nothing — this is first
**Blocks:** Every other epic

---

## What This Is

The Electron + React + Vite shell with no features. By the end of this epic, you can launch a desktop app, open a blank project, and the IPC layer is wired, typed, and validated in CI. All subsequent epics build on this foundation.

This epic is also where the compliance and security baseline is established — EU AI Act disclosure scaffold, Electron hardening, CSP — all from sprint 1, not retrofitted at sprint 17.

---

## Deliverables

### Shell
- [ ] Electron app launches on Windows 10+ and macOS 13+
- [ ] React + Vite renderer with hot module reload in development
- [x] Native macOS menu bar (File, Edit, Clip, Mark, View, AI, Window) — see `_designs/app-ui/01-timeline-editor.html`
- [x] Traffic light window controls
- [x] Tab navigation: Editor | Transcript | Audio Room | Publish
- [x] Status bar (bottom)
- [ ] App icon, name, bundle ID registered

### Project File Format
- [x] `.vivido` JSON schema v1.0 defined and committed to `src/project/schema.ts`
- [x] `New Project` creates a blank `.vivido` file
- [x] `Open Project` loads a `.vivido` file from disk
- [ ] `.vivido` file association registered on install (macOS + Windows)
- [x] Default storage paths: `~/Movies/Vivido/` (Mac), `%USERPROFILE%\Videos\Vivido\` (Windows)
- [ ] Schema documented at `vivido.app/schema` (even if empty at launch — the endpoint must exist)

### IPC Layer
- [x] `src/ipc/contracts/` directory with Zod schemas for all renderer↔native message types
- [ ] CI gate: schema validation runs on every PR, blocks merge on violation
- [x] `usePlatform()` hook skeleton — routes compute to native (Electron) or WASM fallback (browser)
- [x] All IPC messages are typed. Zero untyped `ipcRenderer.send` calls.

### Electron Security Hardening
- [x] `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true` on all BrowserWindows
- [x] No remote module
- [x] CSP configured in renderer from day 1:
  ```
  default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:; media-src 'self' blob:;
  ```
- [x] No API keys in renderer process
- [x] Preload script is the only IPC bridge

### EU AI Act Compliance Scaffold
- [x] AI Trust Settings component exists (even if empty) — mounted from sprint 1
- [x] AI feature disclosure badge component (`<AIBadge>`) created and usable by all subsequent epics
- [ ] No AI feature can auto-apply without creator confirmation — this constraint is enforced at the component level, not per-feature

### Auto-save Infrastructure
- [x] Auto-save fires every 30 seconds on background thread
- [x] Write-to-temp + rename-on-success (atomic write, no partial saves)
- [ ] Auto-save never blocks the UI thread (< 50ms UI blocking, total write time may exceed 50ms on rotational disk)
- [x] On unexpected exit: restore last auto-saved state on next launch

### Version History Infrastructure
- [x] 30-day version history: every auto-save creates a versioned snapshot
- [x] Creator can see version history list in UI (even if restore is gated on later epic)

**Current E1 implementation note:** the shell now includes a basic restore action from version-history entries. This is sufficient for internal testing and foundation work, but the UX still needs polish before the feature is considered production-ready.

### Build Pipeline
- [ ] GitHub Actions CI/CD: builds Windows x64 + Mac arm64 + Mac x64 on merge to main
- [ ] Signed and notarized binaries (both platforms)
- [ ] `electron-updater` delta patching configured (even if no updates ship yet)
- [ ] FFmpeg GPL CI gate: validates build flags, blocks release if GPL components detected

---

## Pending Implementation Notes

These notes explain why certain E1 items are still open, so future agents and humans do not mistake an unchecked box for neglect or confusion.

### Shell

- `Electron app launches on Windows 10+ and macOS 13+`
  - Current status: the shell launches and is testable on the current local environment, but cross-platform launch has not yet been verified on real Windows and macOS target machines.
  - Why still open: we have not yet run a platform verification pass on both OS targets.
  - Next action: smoke-test packaged builds on Windows 10+ and macOS 13+ before marking complete.

- `React + Vite renderer with hot module reload in development`
  - Current status: the renderer scaffold and local preview path work, and typecheck/build pass.
  - Why still open: full HMR behavior has not been explicitly verified end-to-end in a normal unrestricted desktop dev session.
  - Next action: run `npm run dev:desktop`, edit a renderer file, and confirm live reload in the actual Electron developer flow.
  - Static preview note: the Electron preview build requires relative asset paths (`./assets/...`) because it is loaded from disk, not from an HTTP server.

- `App icon, name, bundle ID registered`
  - Current status: the shell uses the Vivido name in UI chrome, but packaging metadata is not finalized.
  - Why still open: icon assets, Electron Builder metadata, and per-platform identifiers are not yet configured.
  - Next action: add bundle identifiers, app icons, and packaging config once the shell layout is stable enough not to churn.

### Project File Format

- `.vivido file association registered on install (macOS + Windows)`
  - Current status: `.vivido` files can be created, opened, saved, exported, and parsed by the app.
  - Why still open: OS-level association is an installer concern, not just an app-runtime concern.
  - Next action: add installer metadata for file association during packaging work.

- Current shell behavior note
  - `Save` writes to the current bound project file.
  - `Save As` chooses or rebinds the active project file location.
  - `Export` creates a separate `.vivido` output without rebinding the active save location.
  - Recovery drafts are only expected after autosave has run and the app later exits unexpectedly; a clean session with no unclean close should correctly show no recovery draft.

- `Schema documented at vivido.app/schema`
  - Current status: the schema exists in code and drives the current shell flows.
  - Why still open: the public schema endpoint/site page does not exist yet.
  - Next action: publish the current schema shape to docs once the file format settles beyond the current shell version.

### IPC Layer

- `CI gate: schema validation runs on every PR, blocks merge on violation`
  - Current status: IPC contracts are typed in code and used by the shell.
  - Why still open: there is no GitHub Actions or PR enforcement yet.
  - Next action: add a CI job that runs typecheck, build, and explicit IPC/schema validation before merge.

- Current shell IPC note
  - The desktop shell now validates project IPC payloads and responses at the preload boundary and again in the Electron main process using shared Zod schemas.
  - Why this matters: future media and transcript features now have a stricter contract to build on instead of ad hoc message shapes.

### Electron Security Hardening

- Area status note
  - Current status: the core runtime hardening is already in place and is intentionally checked off.
  - Why no further checkmarks yet: the remaining work in this area is mainly packaging-time validation, not additional shell coding.
  - Next action: keep this area stable and re-verify during packaged build setup rather than churn working security defaults.

### EU AI Act Compliance Scaffold

- `AI Trust Settings component exists (even if empty) — mounted from sprint 1`
  - Current status: done. A lightweight trust settings scaffold is now mounted in the shell inspector.
  - Why this still matters even before AI features ship: it establishes the trust surface and language before later AI actions are added.
  - Next action: expand this scaffold into real settings once AI-assisted actions exist in later epics.

- `No AI feature can auto-apply without creator confirmation`
  - Current status: no auto-applying AI actions exist yet.
  - Why still open: the guardrail needs to be expressed in component architecture, not assumed because features are absent.
  - Next action: define the confirmation pattern and shared component contract before the first real AI action lands in later epics.

### Auto-save Infrastructure

- `Auto-save never blocks the UI thread (< 50ms UI blocking, total write time may exceed 50ms on rotational disk)`
  - Current status: autosave, atomic writes, recovery, version snapshots, and restore are all implemented.
  - Why still open: the behavior works functionally, but we have not yet instrumented and measured UI-thread impact to prove the performance budget.
  - Next action: profile autosave under larger project payloads and record the measured UI-blocking behavior.

- Current shell behavior note
  - The shell now explains that autosave runs 30 seconds after the last edit.
  - Why the 30-second wait exists: this avoids writing the project file on every keystroke while still giving frequent enough protection for normal editing.
  - Recovery drafts are not created merely by editing; they become relevant only after autosave has created recovery state and the app later exits unexpectedly.

### Version History Infrastructure

- Area status note
  - Current status: version snapshots, visible history, and restore are implemented for shell testing.
  - Why still not treated as fully closed beyond the current checkmarks: the UX is still functional-but-basic, and later epics may need filtering, labeling, or richer restore affordances.
  - Next action: improve version-history presentation only if E1 still has room after higher-priority foundation items.

### Build Pipeline

- `GitHub Actions CI/CD: builds Windows x64 + Mac arm64 + Mac x64 on merge to main`
  - Current status: local install, typecheck, and build pass in the current repo.
  - Why still open: there is no checked-in CI workflow yet.
  - Next action: add GitHub Actions once packaging metadata is ready enough to produce meaningful artifacts.

- `Signed and notarized binaries (both platforms)`
  - Current status: not started.
  - Why still open: signing depends on packaging config, certificates, Apple notarization setup, and release secrets.
  - Next action: do this together with installer and release pipeline work, not during raw shell iteration.

- `electron-updater delta patching configured`
  - Current status: not started.
  - Why still open: updater config should follow packaging identity and release-channel decisions.
  - Next action: add after bundle ID, signing, and release artifact generation are stable.

- `FFmpeg GPL CI gate`
  - Current status: not started because FFmpeg integration itself is not yet part of E1 shell code.
  - Why still open: the gate becomes meaningful once media/runtime dependencies are introduced into the build.
  - Next action: implement before E2 media/export work starts depending on FFmpeg packaging choices.

---

## Design Reference

The app shell matches `_designs/app-ui/01-timeline-editor.html` exactly for the chrome (titlebar, tab nav, status bar). Inner panels are empty at this stage.

**Current shell design note:** the left rail is being refined toward quieter professional-editor hierarchy. Utility controls should read as supporting chrome, not as primary content cards. Action groups should have one obvious primary action, restrained secondary actions, and status blocks should behave like compact system summaries rather than marketing panels.

**Current shell layout note:** side panels must scroll inside their own regions. Changes in status text, file paths, or history lists must never expand the editor canvas or push the main preview surface downward.

All implementation in this epic must also follow `prd/18-development-guidelines.md` and `_designs/design-guidelines.md`. The shell is not complete if it is merely functional but visually drifts from the locked editor language.

---

## Open Questions Blocking This Epic

- **#4** — RN component sharing boundary (`packages/ui/` vs `apps/desktop/`): must decide before writing any UI components
- **#8** — `usePlatform()` interface contract: must design before sprint 1
- **#9** — IPC schema validation toolchain: must name before sprint 1

See [16-open-questions.md](16-open-questions.md) for full context.

---

## Also Ships With This Epic (Infrastructure)

- Guest mode: No account required to open, import, edit, and export. Zero signup friction. UI must work fully without an authenticated session.
- Style model passive init: silent JSON accumulator starts from project 1. No UI at this stage — just the background observer writing to `~/.vivido/style/`.
- Crash recovery: on unexpected exit, detect the unclean shutdown flag on next launch and offer to restore.
