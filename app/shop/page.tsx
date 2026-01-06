"use client"

import Link from "next/link"
import { Sparkles, Zap, Heart } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20 animated-gradient" />

          <div className="relative max-w-6xl mx-auto text-center py-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full mb-8 scale-fade-in hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-space font-bold tracking-widest gradient-text">
                EXPLORE OUR COLLECTIONS
              </span>
              <Zap className="w-5 h-5 text-accent animate-pulse" />
            </div>

            <h1 className="text-6xl md:text-9xl font-bebas mb-8 leading-none slide-in-bottom">
              <span className="block gradient-text text-glow">FIND YOUR</span>
              <span className="block text-foreground">SIGNATURE</span>
              <span className="block gradient-text-alt text-glow-accent">SCENT</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-dm slide-in-bottom leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Every vibe deserves its own fragrance. Discover premium scents crafted for{" "}
              <span className="text-primary font-bold">you</span>.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          {/* Main Collections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "For Him",
                href: "/men",
                emoji: "🔥",
                description: "Bold, confident, powerful fragrances",
                color: "from-blue-600/30 via-purple-600/30 to-primary/30",
                delay: "0s",
              },
              {
                name: "For Her",
                href: "/women",
                emoji: "✨",
                description: "Elegant, alluring, timeless scents",
                color: "from-pink-600/30 via-purple-600/30 to-primary/30",
                delay: "0.1s",
              },
              {
                name: "For Everyone",
                href: "/unisex",
                emoji: "💫",
                description: "Beyond gender, pure individuality",
                color: "from-purple-600/30 via-cyan-600/30 to-accent/30",
                delay: "0.2s",
              },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div
                  className={`group relative p-12 rounded-3xl glass-card hover:glow-primary transition-all duration-500 cursor-pointer hover:-translate-y-4 hover:rotate-1 scale-fade-in text-center`}
                  style={{ animationDelay: cat.delay }}
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cat.color} opacity-50 group-hover:opacity-70 transition-opacity`} />

                  <div className="relative">
                    <div className="text-7xl mb-6 group-hover:scale-125 transition-transform duration-300">
                      {cat.emoji}
                    </div>
                    <h2 className="text-3xl font-bebas gradient-text mb-3 group-hover:scale-110 transition-transform">
                      {cat.name}
                    </h2>
                    <p className="text-muted-foreground font-dm mb-6">{cat.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm font-space font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-4">
                      <Zap className="w-4 h-4 text-primary" />
                      EXPLORE NOW
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bundles Section */}
          <section className="relative mb-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl pulse-glow" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1s" }} />
            </div>

            <Link href="/combos">
              <div className="relative group p-16 rounded-3xl glass-card border-2 border-primary/30 hover:border-primary hover:glow-primary transition-all duration-500 cursor-pointer hover:-translate-y-2 text-center">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50 group-hover:opacity-70 transition-opacity" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
                    <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
                    <span className="text-sm font-space font-bold tracking-widest gradient-text">SPECIAL OFFER</span>
                  </div>

                  <h2 className="text-5xl md:text-6xl font-bebas gradient-text mb-4 group-hover:scale-105 transition-transform">
                    CURATED BUNDLES
                  </h2>
                  <p className="text-xl text-muted-foreground font-dm mb-6 max-w-2xl mx-auto">
                    Save up to <span className="text-primary font-bold">25%</span> with our expertly designed collections.
                    Mix and match your signature set.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-space font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-4">
                    <Sparkles className="w-5 h-5" />
                    SHOP BUNDLES
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Premium Quality",
                description: "100% authentic ingredients, zero compromises",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Free Shipping",
                description: "On all orders over ₹100. Fast & secure delivery",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Easy Returns",
                description: "Not feeling it? 30-day hassle-free returns",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`glass-card p-8 rounded-2xl hover:glow-subtle transition-all duration-500 hover:-translate-y-2 text-center scale-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white mb-6 hover:scale-110 hover:rotate-12 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bebas gradient-text mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-dm">{feature.description}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
