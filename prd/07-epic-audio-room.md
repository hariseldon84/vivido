# Epic E5 — Audio Room

**Sprint:** 11–12
**Status:** NOT STARTED
**Depends on:** E1 (Foundation), E2 (Media Import)
**Blocks:** E6 (Publish — LUFS normalization is a publish prerequisite)

---

## What This Is

The screen that kills Riverside's audio post-processing and iZotope RX for the creator market. One action removes HVAC hum. One button normalizes loudness for YouTube, Shorts, Podcast, or Broadcast. The output meters tell you exactly whether you pass platform specs before you export.

All effects are visible, labeled (AI-badged where applicable), and reversible. No silent processing — ever.

---

## Functional Requirements

- **FR21:** Creator can apply AI-powered noise removal to any audio clip with a single action — no parameters required.
- **FR22:** Creator can apply EQ presets by content type (Voice Only, Voice + Music, Interview, Cinematic) to audio clips or the master output.
- **FR23:** Vivido automatically applies platform-specific loudness normalization based on selected export target:
  - YouTube: −14 LUFS
  - Shorts: −13 LUFS
  - Podcast: −16 LUFS
  - Broadcast / TV: −23 LUFS
- **FR24:** Creator can adjust audio levels per clip and per track with visual waveform feedback.
- **FR25:** Creator can add background music tracks with automatic ducking when voice is detected.
- **FR26:** Creator can preview audio with normalization applied before export.

---

## Design Reference

`_designs/app-ui/03-audio-room.html`:

**Layout:** Track list (left, 260px) | Main workspace (center) | Output meters (right, 260px)

**Track list:**
- Track types: Primary Voice (VOICE badge, blue waveform), Background Music (MUSIC badge, green waveform), Sound FX (SFX badge, orange waveform), Room Tone (AMBIENCE badge, green waveform)
- Each track: Solo (S) + Mute (M) buttons + volume fader + level value

**Main workspace:**
- Waveform display (selected track): filename + format badge (48kHz · WAV)
- EQ tabs: Primary Voice | Parametric EQ | Graphic | Linear | **✦ AI Enhance** (active)
- EQ Curve visualization: frequency axis (20Hz → 20kHz), dB curve, draggable control points (teal, amber, red dots)
- Effects chain list (below EQ):
  | Effect | Status | Value | Badge |
  |---|---|---|---|
  | Noise Removal | ON (toggle) | −18 dB | AI |
  | De-Esser | ON | 7kHz · −4dB | — |
  | Compression | ON | −3.2 dB GR | — |
  | LUFS Normalizer | ON | −14 LUFS | AI |
  | Reverb | OFF | Room simulation | — |
  - Add effect button (+) at top right

**Output Meters (right panel):**
- Peak Level: dual channel VU meters (green → amber → red)
- Integrated LUFS: large numeric display (e.g., −14.2, Target: −14) ✅
- True Peak: numeric display (e.g., −1.8 dBTP, Max: −1.0) ✅
- Short Term: −11.8 (Watch: −12)
- LRA: 6.4 LU range

**Platform Targets:**
- YouTube: −14 LUFS · −1 dBTP → ✅ Pass
- Podcast / Spotify: −16 LUFS · −1 dBTP → ⚠ +2 LU (warning)
- Instagram / TikTok: −14 LUFS · −1 dBTP → ✅ Pass
- Broadcast / TV: −23 LUFS · −1 dBTP → ❌ −9 LU (fail)
- "Auto-Normalize for All Platforms" full-width indigo button

**Top bar:** Back to Timeline | Preview Output | Apply & Return

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md`, `_designs/design-guidelines.md`, and `_designs/app-ui/03-audio-room.html`.

This epic is not complete unless it preserves:

- audio-specific semantic color usage and meter clarity
- serious studio-tool layout instead of wizard-style processing UI
- prominent LUFS and output-status visibility
- explicit, reversible effect-chain visibility
- AI badge treatment exactly as standardized in the shared system
- dense control layout without visual noise or decorative chrome

The Audio Room must feel like a real post-audio workspace for creators, not a generic “enhance audio” panel.

---

## AI Features in This Epic

All AI features must use `<AIBadge>` component from E1. All require explicit creator action — no auto-apply.

| Feature | AI Badge | Creator Action Required |
|---|---|---|
| Noise Removal | ✅ | Toggle ON — creator sees before/after preview |
| AI Enhance (EQ) | ✅ | Select tab, then apply |
| LUFS Normalizer | ✅ | Shown as a suggested effect, creator enables |
| Auto-Normalize for All Platforms | ✅ | Single button press — shows preview of target values |

EU AI Act: All AI suggestions disclosed. Creator can disable any individual AI feature from AI Trust Settings without losing access to manual equivalents.

---

## Effects Processing Architecture

- All audio processing runs in Electron main (native side), never in the renderer
- Effects chain applies in order: Noise Removal → De-Esser → Compression → LUFS Normalizer → Reverb
- Non-destructive: effects stored as parameters in `.vivido` JSON, applied on export (or preview render)
- Preview: rendered to a temp file for playback — never writes over source
- Background music ducking: voice activity detection triggers gain reduction on music track when voice detected (threshold configurable, default −12dB duck)

---

## Noise Removal Implementation

- AI noise removal: a local noise suppression model (no external API)
- Candidate libraries: RNNoise (Mozilla, open-source), Krisp SDK (licensed), Odin (open-source)
- Decision: select library before sprint 11. Constraint: must work offline, no API call.
- No parameters required from the creator: the model detects and removes background noise automatically
- Creator can A/B preview before applying
