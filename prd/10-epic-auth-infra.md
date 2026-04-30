# Epic E8 — Auth, Accounts & Cloud Infrastructure

**Sprint:** 15–16
**Status:** NOT STARTED
**Depends on:** E1 (Foundation — guest mode scaffold from sprint 1)
**Blocks:** E7 (Style Model cloud sync), E6 (YouTube OAuth upload)

---

## What This Is

The infrastructure layer that converts a guest session into an account — at exactly the right moment. The "save style" moment after project 1 completion is the only signup trigger. Zero friction before that.

This epic also covers Supabase Auth + Cloudflare R2 integration, Stripe + Razorpay payment processing, and the referral program.

## Design Adherence

All implementation in this epic must follow `prd/18-development-guidelines.md` and `_designs/design-guidelines.md`.

Any surfaced account, billing, privacy, or upgrade UI must preserve:

- zero-friction first-session behavior
- no dark patterns, forced walls, or noisy upsell styling
- visibility of locked capabilities without blocking core editing
- local-first trust language and privacy clarity
- dense desktop-tool settings presentation rather than marketing-page UI patterns

This epic is successful only if the account layer feels subordinate to the editor, not like the product is trying to become a SaaS dashboard.

---

## Functional Requirements

### Guest Mode (Infrastructure in E1 — wired fully in this epic)
- **FR51:** Creator can use Vivido's full editor without creating an account (guest mode) — style model accumulates locally.

### Account Creation
- **FR52:** Creator can create an account with email or OAuth (Google) and sync style model to the cloud. Account creation is only surfaced at the "save style" moment after project 1 completion — **never at first launch.**
- Vivido shows: *"Project 1 complete. Your style is starting to take shape — save it so Vivido remembers you."* → Create account / Continue as guest.

### Subscription Management
- **FR53:** Creator can manage subscription tier, billing, and payment method from within the app.

---

## Supabase Auth

- Email + password (with email verification)
- OAuth: Google
- Sessions: JWT, stored securely in OS keychain (not localStorage)
- Supabase schema design: supports 1M+ creator records without query degradation

---

## Cloudflare R2

- Rendered outputs only (never raw footage)
- Objects: private by default, accessed via signed URLs with 1-hour expiry
- R2 objects deleted after 90 days unless creator opts into extended storage
- Creator footage: raw video files **never leave the creator's machine** unless they explicitly initiate a cloud upload

---

## Stripe + Razorpay

**Payment architecture:**
- Stripe: global primary (Creator $199/yr, Lifetime $599, Studio $499/yr)
- Razorpay: India primary (RBI mandate — Stripe card processing has friction for Indian cards)
- PCI-DSS: card data **never touches Vivido servers**. Stripe.js / Razorpay.js handle card input directly.
- Webhook verification: Stripe and Razorpay webhooks handled by Supabase Edge Functions with HMAC signature verification. Webhook secrets stored as Supabase environment variables — never in client-accessible config or renderer process.

**Referral program (ships with MLP):**
- Creator earns 1 month free per confirmed referral (3 referrals = 3 months free)
- Referred creator gets 30 days free Creator tier before paywall
- Referral link generated from account settings — no separate affiliate dashboard
- Powered by Stripe billing credits, no custom billing infrastructure

---

## Security Requirements

- All data in transit: TLS 1.3 minimum
- Style model data at rest: AES-256 in Supabase
- R2 objects: private by default, signed URLs with 1-hour expiry
- YouTube OAuth tokens: encrypted in Supabase — **never in localStorage**
- Stripe/Razorpay card data: never touches Vivido servers
- Payment webhooks: Supabase Edge Functions + HMAC signature verification
- **Creator data isolation:** No creator can access another creator's project data, style model, or media files

---

## CCPA / GDPR Deletion

On account deletion:
- Supabase auth record deleted
- Style model data deleted from Supabase (local SQLite remains until creator clears app data)
- Project metadata deleted from Supabase
- R2 rendered outputs deleted (within 30 days of deletion request, per CCPA)
- YouTube OAuth tokens revoked via YouTube API

Creator can revoke YouTube OAuth at any time from account settings. Revocation takes effect within 1 hour.

---

## Privacy Settings UI

From account settings, creator can:
- View their style model observations (FR42)
- Delete their style model (FR43)
- Export their style model as JSON (FR44)
- Opt in/out of anonymous product analytics (FR60)
- Revoke YouTube OAuth
- Delete account (with CCPA cascade)
