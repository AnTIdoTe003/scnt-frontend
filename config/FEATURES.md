# Feature Toggles

## Launch Countdown (April 15, 2026)

Full-screen countdown overlay that blocks scrolling. Creates hype before launch.

**Toggle:** `NEXT_PUBLIC_LAUNCH_COUNTDOWN_ENABLED` in `.env`

- `true` → Countdown shows on home page, scroll locked
- `false` → Normal site (use for local development)

## Offer Popup

Customizable popup for promotions, early-bird offers, or newsletter signup.

**Toggle:** `NEXT_PUBLIC_OFFER_POPUP_ENABLED` in `.env`

- `true` → Popup appears after delay (site-wide)
- `false` → No popup

**Customize:** Edit `lib/offer-popup-config.ts` for:
- Title, message, CTA text & link
- Delay before showing (ms)
- Dismiss duration (days)
- Accent color (amber, rose, emerald, violet)
