/**
 * Customize your offer popup here.
 * Edit title, message, CTA, and styling to match your brand.
 */

export const offerPopupConfig = {
  /** Popup enabled via NEXT_PUBLIC_OFFER_POPUP_ENABLED env var */

  /** Main headline */
  title: "Early Bird Exclusive",

  /** Subheadline / offer details */
  message:
    "Be the first to know when we drop. Subscribe now and get 15% off your first order + free shipping.",

  /** CTA button text */
  ctaText: "Claim My 15% Off",

  /** CTA button link (e.g. /shop, /contact, or external URL) */
  ctaLink: "/shop",

  /** Optional: secondary link text (e.g. "No thanks") */
  secondaryText: "Maybe later",

  /** Delay before popup appears (ms) - 0 = immediate */
  delayMs: 2000,

  /** How long to remember "don't show again" (days). 0 = show every visit */
  dismissDurationDays: 7,

  /** Accent color for CTA - "amber" | "rose" | "emerald" | "violet" */
  accentColor: "amber" as "amber" | "rose" | "emerald" | "violet",
};
