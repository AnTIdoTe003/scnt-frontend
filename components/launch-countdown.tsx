"use client";

import { useEffect, useState } from "react";
import { Sparkles, Instagram } from "lucide-react";

const LAUNCH_DATE = new Date("2026-04-15T00:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const diff = LAUNCH_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { ...timeLeft, mounted };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(183,139,91,0.15)] overflow-hidden">
        <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-amber-400 tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 to-transparent pointer-events-none" />
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-space font-bold tracking-[0.2em] text-white/50 uppercase">
        {label}
      </span>
    </div>
  );
}

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-md bg-zinc-900 border border-amber-500/20 rounded-2xl shadow-[0_0_40px_rgba(183,139,91,0.15)] overflow-hidden">
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        <div className="relative p-6 sm:p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          <h2 className="font-bebas text-3xl text-white mb-2">JOIN THE WAITLIST</h2>
          <p className="text-white/60 font-dm text-sm mb-6">Be the first to know when we launch and get exclusive early access.</p>

          {status === "success" ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-amber-400 font-space font-bold text-lg mb-1">YOU'RE ON THE LIST</h3>
              <p className="text-white/70 text-sm">Keep an eye on your inbox. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="email" className="block text-xs font-space font-bold tracking-wider text-white/50 mb-1.5 uppercase">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-space font-bold tracking-wider text-white/50 mb-1.5 uppercase">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm font-dm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-space font-bold text-sm tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function LaunchCountdown() {
  const { days, hours, mins, secs, mounted } = useCountdown();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-primary">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-600/15 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-space font-bold tracking-[0.2em] text-amber-400/90">
            COMING SOON
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.1s" }}>
          XPERFUMES
        </h1>
        <p className="text-white/60 font-dm text-sm sm:text-base mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.2s" }}>
          Premium fragrances for the bold.
        </p>

        {/* Countdown grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.3s" }}>
          <CountdownUnit value={days} label="Days" />
          <CountdownUnit value={hours} label="Hours" />
          <CountdownUnit value={mins} label="Mins" />
          <CountdownUnit value={secs} label="Secs" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-amber-500 to-amber-700 text-white font-space font-bold text-sm tracking-wider hover:scale-105 transition-all duration-300 shadow-[0_8px_32px_rgba(183,139,91,0.4)]"
          >
            <Sparkles className="w-5 h-5" />
            JOIN THE WAITLIST
          </button>
          <a
            href="https://www.instagram.com/xperfumes.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-space font-bold text-sm tracking-wider hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
          >
            <Instagram className="w-5 h-5" />
            FOLLOW US
          </a>
        </div>

        <p className="text-white/40 text-xs font-space tracking-widest animate-in fade-in duration-1000" style={{ animationDelay: "0.6s" }}>
          PREPARE TO SCENT THE NIGHT
        </p>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
