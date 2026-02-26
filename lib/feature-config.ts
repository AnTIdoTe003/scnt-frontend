/**
 * Feature flags for launch countdown & offer popup.
 * Set in .env for easy toggling:
 *
 * NEXT_PUBLIC_LAUNCH_COUNTDOWN_ENABLED=true   → Show countdown overlay (blocks scroll)
 * NEXT_PUBLIC_LAUNCH_COUNTDOWN_ENABLED=false  → Hide countdown (for local dev)
 *
 * NEXT_PUBLIC_OFFER_POPUP_ENABLED=true        → Show offer popup
 * NEXT_PUBLIC_OFFER_POPUP_ENABLED=false       → Hide popup
 */

export const LAUNCH_COUNTDOWN_ENABLED =
  process.env.NEXT_PUBLIC_LAUNCH_COUNTDOWN_ENABLED === "true";

export const OFFER_POPUP_ENABLED =
  process.env.NEXT_PUBLIC_OFFER_POPUP_ENABLED === "true";
