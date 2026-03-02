"use client";

import dynamic from "next/dynamic";
import { LAUNCH_COUNTDOWN_ENABLED } from "@/lib/feature-config";
import { HomeContent } from "@/components/home-content";

const LaunchCountdown = dynamic(
  () =>
    import("@/components/launch-countdown").then((m) => ({
      default: m.LaunchCountdown,
    })),
  { ssr: false }
);

export default function Home() {
  return LAUNCH_COUNTDOWN_ENABLED ? <LaunchCountdown /> : <HomeContent />;
}
