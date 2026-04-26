# Vivido Signal — Energy Detection

Acceptance Criteria: 1. Coloured ring renders around camera frame in real-time
2. Three states: green / amber / red updating at max 1s intervals
3. Energy scored from: speech pace, volume variation, filler frequency, sentence completion
4. Toggle on/off in recording settings
5. Post-recording timeline colour-coded by energy zone
6. Colour coding persists into edit view
Build Complexity: Medium
Chapter: Camera Intelligence
Dependencies: Stage 0 complete, Web Audio API, ONNX runtime WASM
One Line Description: Real-time energy ring while recording — green = in the zone, amber = watch it, red = losing them
Priority: P1 — Core
Stage: Stage 1 — Record
Status: Not Started
Success Metric: Energy detection accuracy > 80% correlation with creator self-report. 30% reduction in retakes reported by beta users.
Technical Notes: Web Audio API for real-time audio analysis. Lightweight ONNX model running in WASM for classification. No cloud calls during recording — fully local.
User Story: As a solo creator, I want to know while I'm recording whether I'm delivering well so I stop wasting takes.
WI Code: WI-01
Wow Factor: ⚡ Rare & Powerful