"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown, Sparkles, MessageCircle, Mail } from "lucide-react"

const faqs = [
  {
    question: "What makes SCNT fragrances different?",
    answer:
      "Our fragrances are crafted with premium ingredients and a modern, luxury sensibility. Each scent is built for presence and performance—clean openings, rich dry-downs, and lasting projection.",
    emoji: "✦",
  },
  {
    question: "How long do the fragrances last?",
    answer:
      "Our fragrances range from 4–10+ hours depending on the profile and your skin chemistry. High-intensity options last longer, while fresh profiles are lighter and airier.",
    emoji: "✦",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you’re not happy with your purchase, you can return it for a refund or exchange (as per policy).",
    emoji: "✦",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping costs and delivery times vary by location. Orders over ₹100 qualify for free standard shipping.",
    emoji: "✦",
  },
  {
    question: "Can I create a custom fragrance?",
    answer:
      "Yes—reach out to us at hello@scnt.in to discuss your preferences and availability for custom consultations.",
    emoji: "✦",
  },
  {
    question: "Are your fragrances cruelty-free?",
    answer:
      "Yes, SCNT fragrances are cruelty-free and made with responsibly sourced ingredients.",
    emoji: "✦",
  },
  {
    question: "How do I choose the right fragrance?",
    answer:
      "Start with notes you already like (fresh, woody, spicy, amber) and choose intensity based on when you’ll wear it. If you’re unsure, contact us for recommendations.",
    emoji: "✦",
  },
  {
    question: "What are bundle deals?",
    answer:
      "Bundles are curated sets of 3 fragrances that complement each other. You save compared to buying individually and get a complete wardrobe of scents.",
    emoji: "✦",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl pulse-glow" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1s" }} />
          </div>

          <div className="relative max-w-4xl mx-auto text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6 scale-fade-in">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-space font-bold tracking-widest gradient-text">GOT QUESTIONS?</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bebas mb-6 gradient-text slide-in-bottom">
              WE GOT ANSWERS
            </h1>
            <p className="text-xl text-muted-foreground font-dm slide-in-bottom" style={{ animationDelay: "0.1s" }}>
              Everything you need to know about SCNT. 💡
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4">
          {/* FAQ Accordion */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left glass-card rounded-2xl p-6 hover:glow-subtle transition-all duration-500 scale-fade-in ${
                  openIndex === index ? "border-2 border-primary" : "border-2 border-transparent"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl mt-1">{faq.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-space font-bold text-lg mb-2 text-foreground">{faq.question}</h3>
                      {openIndex === index && (
                        <p className="text-muted-foreground leading-relaxed font-dm mt-3 animate-in slide-in-from-top-2 duration-300">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 mt-1 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="relative glass-card p-8 md:p-12 rounded-3xl border-2 border-primary/30 hover:border-primary hover:glow-primary transition-all duration-500 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-primary to-accent rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-space font-bold tracking-widest gradient-text">NEED MORE HELP?</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bebas gradient-text mb-4">
                STILL HAVE QUESTIONS?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 font-dm">
                Our team is here to help! Reach out and we'll get back to you ASAP. 🚀
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@scnt.in"
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 glow-primary inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  EMAIL US
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 glass-card border-2 border-primary/50 hover:bg-primary/20 rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  CONTACT FORM
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
