# Non-Functional Requirements

---

## Performance

| Requirement | Target | Condition |
|---|---|---|
| Import to first frame | < 3 seconds | MP4/H.264, minimum spec |
| 4K scrubbing | Zero buffering, hardware-decode | All supported hardware |
| Whisper transcription | < 10% of audio duration | 10-min audio < 60s, min spec |
| Audio processing (noise + LUFS) | < 5% of audio duration | On minimum spec |
| Publish Package export | < 2× real-time | 10-min video < 20 min, min spec |
| All editing UI interactions | < 100ms response | Cuts, trims, scrub, transcript edits |
| Auto-save background write | < 50ms UI blocking | Write runs on background thread — total write time may exceed 50ms on rotational disk, UI never stalls |
| Timeline data model | 90+ min, 500+ clips | No performance degradation — requires virtual scrolling (react-window or @tanstack/virtual); test before sprint 9 |

**Minimum spec (hardware decode):** GPU with hardware video decode (NVDEC/D3D11VA on Windows, VideoToolbox on Mac, 2018+), 8GB RAM, 50GB free disk.
**Minimum spec (software decode fallback):** Any CPU with AVX2 support, 8GB RAM, 50GB free disk. "Performance mode" activated.
**Recommended spec:** Dedicated GPU (NVIDIA RTX 3060 or Apple M1+), 16GB RAM, NVMe SSD.

---

## Security

- All data in transit: TLS 1.3 minimum
- Style model data at rest: AES-256 in Supabase; R2 objects private by default, signed URLs with 1-hour expiry
- **Electron hardening:** `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, no remote module
- **IPC security:** All renderer↔native messages validated against typed schemas. No eval. No dynamic code execution over IPC.
- **Credential handling:** No API keys ever in the renderer process. YouTube OAuth tokens encrypted in Supabase — never in localStorage. Stripe/Razorpay card data never touches Vivido servers.
- **Payment webhooks:** Stripe and Razorpay webhook endpoints handled by Supabase Edge Functions with HMAC signature verification. Webhook secrets stored as Supabase environment variables — never in client-accessible config or the renderer process.
- **Electron CSP (renderer):**
  ```
  default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:; media-src 'self' blob:;
  ```
  `blob:` required for video preview canvas. CSP string committed to code, not deferred to deployment config.
- **Creator data isolation:** No creator can access another creator's project data, style model, or media files.
- **Creator footage:** Raw video files never leave the creator's machine unless they explicitly initiate an upload.

---

## Privacy by Design

- Style model stores behavioral metadata only: cut durations, clip counts, audio treatment flags, chapter density, Shorts cadence. **Never video content, transcripts, or PII about subjects in videos.**
- Transcript cloud sync is opt-in (required for collaboration); local-only mode always available.
- Analytics: aggregate anonymous product usage metrics only — never per-creator content analysis. Opt-out available (FR60).
- YouTube OAuth tokens: creator can revoke at any time from account settings. Revocation takes effect within 1 hour.

---

## Reliability

- **Offline-first core:** Cuts, trims, transcript editing, audio processing, and local export work with zero network connectivity.
- **Atomic save:** Project writes use write-to-temp + rename-on-success. No partial saves.
- **Crash recovery:** On unexpected exit, restore last auto-saved state on next launch. Zero data loss beyond last 30-second window.
- **Recording integrity:** Tracks written to disk in real-time — no frame loss on network interruption during capture. *(Stage 2)*
- **Update safety:** Auto-updates install on next launch — never interrupt an active session or active export.

---

## Scalability

- Server-side components (Supabase, R2, Vercel) support 10× user growth (100K creators) with < 10% performance degradation.
- Supabase schema designed for 1M+ creator style model records without query degradation.
- AWS MediaConvert scales horizontally — no concurrency limit at architecture level.
- Vercel + Cloudflare CDN: < 100ms TTFB for static assets in primary markets (India, US, Europe).

---

## Accessibility

- **Keyboard navigation:** All primary editing operations accessible via keyboard shortcuts.
- **Keyboard discoverability:** `?` key or Help menu opens shortcut reference at all times. Contextual shortcut hints on hover.
- **Color contrast:** WCAG AA minimum (4.5:1) for all text and interactive elements.
- **Screen reader:** Core project management UI (project library, account settings, subscription management) compatible with VoiceOver (Mac) and NVDA (Windows).
- **Reduced motion:** Respects OS-level reduced motion preference for UI animations.

---

## Integration Reliability

| Integration | Purpose | Required For | Graceful Degradation |
|---|---|---|---|
| Supabase Auth | Email + OAuth, creator identity | MLP | Local-only guest mode |
| Supabase DB | Style model metadata, project metadata, subscription status | MLP | Local SQLite fallback |
| Cloudflare R2 | Rendered output storage, optional asset backup | MLP (on auth) | Local export folder |
| YouTube Data API v3 | Video upload, chapter metadata, Analytics | MLP (upload), Stage 2 (analytics) | Cached data, retry queue |
| Stripe + Razorpay | Payment processing, subscription lifecycle | MLP | Show error, retry |
| Whisper.cpp | Local transcription — fully offline | MLP | N/A — local only |
| Anthropic Claude API | B-roll suggestion, hook detection, metadata writing | Stage 2 | Disable AI suggestions |
| Liveblocks | Real-time collaborative editing presence | Stage 3 | Async-only fallback |
| AWS MediaConvert | Cloud render queue | Stage 2+ | Desktop render fallback |
