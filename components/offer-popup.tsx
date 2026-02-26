"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Gift, Sparkles } from "lucide-react";
import { offerPopupConfig } from "@/lib/offer-popup-config";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "xperfumes-offer-dismissed";

function getDismissedUntil(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function setDismissed(days: number) {
  if (typeof window === "undefined") return;
  try {
    const until = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(until));
  } catch {}
}

const accentStyles = {
  amber: {
    gradient: "from-amber-500 to-amber-700",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_40px_rgba(183,139,91,0.25)]",
    icon: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  rose: {
    gradient: "from-rose-500 to-rose-700",
    border: "border-rose-400/30",
    glow: "shadow-[0_0_40px_rgba(244,63,94,0.25)]",
    icon: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  emerald: {
    gradient: "from-emerald-500 to-emerald-700",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.25)]",
    icon: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  violet: {
    gradient: "from-violet-500 to-violet-700",
    border: "border-violet-400/30",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.25)]",
    icon: "text-violet-500",
    bg: "bg-violet-500/10",
  },
} as const;

export function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissedUntil = getDismissedUntil();
    if (dismissedUntil > Date.now() && offerPopupConfig.dismissDurationDays > 0) return;

    const timer = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setVisible(true));
    }, offerPopupConfig.delayMs);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (remember: boolean) => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
    if (remember && offerPopupConfig.dismissDurationDays > 0) {
      setDismissed(offerPopupConfig.dismissDurationDays);
    }
  };

  const style = accentStyles[offerPopupConfig.accentColor];

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9998] flex items-center justify-center p-4 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => handleDismiss(false)}
      />

      {/* Popup card */}
      <div
        className={cn(
          "relative w-full max-w-md rounded-2xl border bg-card shadow-2xl overflow-hidden transition-all duration-300",
          style.border,
          style.glow,
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Decorative gradient bar */}
        <div className={cn("h-1.5 w-full bg-linear-to-r", style.gradient)} />

        <div className="p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={() => handleDismiss(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className={cn("inline-flex p-3 rounded-xl mb-4", style.bg)}>
            <Gift className={cn("w-8 h-8", style.icon)} />
          </div>

          {/* Content */}
          <h2 className="font-bebas text-2xl sm:text-3xl text-foreground mb-2">
            {offerPopupConfig.title}
          </h2>
          <p className="text-muted-foreground font-dm text-sm sm:text-base leading-relaxed mb-6">
            {offerPopupConfig.message}
          </p>

          {/* CTA */}
          <Link href={offerPopupConfig.ctaLink} onClick={() => handleDismiss(true)}>
            <button
              className={cn(
                "w-full py-4 rounded-xl font-space font-bold text-sm tracking-wider text-white transition-all hover:scale-[1.02] active:scale-[0.98]",
                `bg-linear-to-r ${style.gradient}`,
                style.glow
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                {offerPopupConfig.ctaText}
              </span>
            </button>
          </Link>

          {/* Secondary */}
          {offerPopupConfig.secondaryText && (
            <button
              onClick={() => handleDismiss(true)}
              className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground font-dm transition-colors"
            >
              {offerPopupConfig.secondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
