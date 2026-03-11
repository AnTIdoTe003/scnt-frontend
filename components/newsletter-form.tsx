"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface NewsletterFormProps {
  buttonText?: string;
  sourceText?: string;
}

export function NewsletterForm({ buttonText = "SUBSCRIBE", sourceText = "Newsletter Sign Up" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Pass phone as empty string since it's required by our API but not for a basic newsletter
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: sourceText }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 font-space font-bold">
        <CheckCircle2 className="w-5 h-5" />
        YOU'RE ON THE LIST!
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-linear-to-r from-primary to-accent text-white rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {buttonText === "NOTIFY ME" && <Send className="w-4 h-4" />}
              {buttonText}
            </>
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-sm font-dm mt-2 text-left">{errorMessage}</p>
      )}
    </div>
  );
}
