"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveLeft, Sparkles, ArrowRight, RefreshCcw } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const QUIZ_QUESTIONS = [
  {
    id: "occasion",
    question: "What's the main occasion for this scent?",
    options: [
      { id: "everyday", label: "Everyday Signature", emoji: "✨", description: "Office-safe, clean, daily driver" },
      { id: "date_night", label: "Date Night", emoji: "🍷", description: "Intimate, seductive, close encounters" },
      { id: "statement", label: "Making a Statement", emoji: "🔥", description: "Loud, bold, room-filling projection" },
    ]
  },
  {
    id: "vibe",
    question: "Pick your aesthetic/vibe:",
    options: [
      { id: "dark_mysterious", label: "Dark & Mysterious", emoji: "🌑", description: "Leather jackets, late nights, enigmatic" },
      { id: "clean_fresh", label: "Clean & Fresh", emoji: "🌊", description: "Fresh out the shower, minimalist, crisp" },
      { id: "warm_cozy", label: "Warm & Rich", emoji: "🍂", description: "Cozy sweaters, vanilla, inviting" },
      { id: "floral_elegant", label: "Floral & Elegant", emoji: "🌸", description: "Sophisticated, beautiful, timeless" },
    ]
  },
  {
    id: "intensity",
    question: "How strong do you want it?",
    options: [
      { id: "subtle", label: "Subtle Skin Scent", emoji: "🕊️", description: "Only people hugging you can smell it" },
      { id: "moderate", label: "Noticeable Trail", emoji: "💨", description: "Leaves a gentle scent trail as you walk" },
      { id: "beast", label: "Beast Mode", emoji: "🦁", description: "Lingers in the room after you leave" },
    ]
  }
];

const PRODUCTS = [
  {
    name: "Midnight Essence",
    slug: "midnight-essence",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    description: "The ultimate date night choice. Woody and spicy with unbelievable longevity.",
    tags: ["date_night", "dark_mysterious", "moderate", "beast"]
  },
  {
    name: "Night Bloom",
    slug: "night-bloom",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    description: "An elegant, room-filling floral explosion that stops traffic.",
    tags: ["statement", "floral_elegant", "beast"]
  },
  {
    name: "Ethereal",
    slug: "ethereal",
    image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
    description: "The perfect everyday clean aesthetic. Light, airy, and beautiful.",
    tags: ["everyday", "clean_fresh", "subtle", "moderate"]
  },
  {
    name: "Obsidian",
    slug: "obsidian",
    image: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
    description: "Warm, rich, and intensely powerful. A true masterpiece.",
    tags: ["statement", "date_night", "warm_cozy", "dark_mysterious", "beast"]
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<typeof PRODUCTS[0] | null>(null);

  const handleSelect = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(curr => curr + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    setIsCalculating(true);

    // Simple scoring algorithm based on matching tags
    let bestMatch = PRODUCTS[0];
    let highestScore = -1;

    PRODUCTS.forEach(product => {
      let score = 0;
      Object.values(finalAnswers).forEach(answer => {
        if (product.tags.includes(answer)) score++;
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = product;
      }
    });

    setTimeout(() => {
      setResult(bestMatch);
      setIsCalculating(false);
    }, 2000); // Fake calculation time for anticipation
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-20 px-4 flex flex-col items-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-3xl relative z-10">
          {!result && !isCalculating && (
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 font-space text-sm tracking-wider transition-colors">
                <MoveLeft className="w-4 h-4" /> BACK
              </Link>

              {/* Progress Bar */}
              <div className="flex gap-2 mt-8 mb-12">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? "bg-amber-500" : "bg-white/10"}`}
                  />
                ))}
              </div>
            </div>
          )}

          {isCalculating ? (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
              <Sparkles className="w-12 h-12 text-amber-500 animate-pulse mb-6" />
              <h2 className="font-bebas text-4xl text-white mb-2 tracking-wider">ANALYZING YOUR VIBE...</h2>
              <p className="text-white/50 font-dm">Scanning our collection for the perfect match.</p>
            </div>
          ) : result ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-space font-bold text-sm tracking-widest mb-4">
                  100% MATCH
                </span>
                <h2 className="font-bebas text-5xl md:text-7xl text-white">YOUR SIGNATURE SCENT</h2>
              </div>

              <div className="glass-card p-6 md:p-10 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(183,139,91,0.2)]">
                  <Image src={result.image} alt={result.name} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <h3 className="font-bebas text-4xl text-white mb-4">{result.name}</h3>
                  <p className="text-white/70 font-dm mb-8 text-lg">{result.description}</p>

                  <div className="flex flex-col w-full gap-3">
                    <Link href={`/products/${result.slug}`} className="w-full relative group">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500 to-amber-700 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                      <button className="relative w-full py-4 bg-zinc-900 border border-amber-500/50 rounded-xl text-white font-space font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
                        SHOP {result.name} <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>

                    <button onClick={resetQuiz} className="w-full py-4 glass-card hover:bg-white/5 rounded-xl text-white/70 font-space font-bold tracking-widest flex items-center justify-center gap-2 transition-colors">
                      <RefreshCcw className="w-4 h-4" /> RETAKE QUIZ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={currentStep} className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="font-bebas text-4xl md:text-5xl text-white mb-8 text-center px-4">
                {QUIZ_QUESTIONS[currentStep].question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUIZ_QUESTIONS[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(QUIZ_QUESTIONS[currentStep].id, option.id)}
                    className={`
                      text-left p-6 rounded-2xl border transition-all duration-300 group
                      ${answers[QUIZ_QUESTIONS[currentStep].id] === option.id
                        ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_30px_rgba(183,139,91,0.15)]'
                        : 'glass-card border-white/10 hover:border-amber-500/50 hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">{option.emoji}</div>
                    <div className="font-space font-bold text-white text-lg tracking-wider mb-1">{option.label}</div>
                    <div className="font-dm text-sm text-white/50">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
