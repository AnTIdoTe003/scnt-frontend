"use client";

import { OFFER_POPUP_ENABLED } from "@/lib/feature-config";
import { OfferPopup } from "@/components/offer-popup";

export function OfferPopupWrapper() {
  if (!OFFER_POPUP_ENABLED) return null;
  return <OfferPopup />;
}
