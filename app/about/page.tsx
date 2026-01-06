"use client"

import Link from "next/link"
import { ChevronRight, Sparkles, Zap, Heart, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20 animated-gradient" />

          <div className="relative max-w-5xl mx-auto text-center py-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full mb-8 scale-fade-in">
              <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
              <span className="text-sm font-space font-bold tracking-widest gradient-text">
                OUR STORY
              </span>
            </div>

            <h1 className="text-6xl md:text-9xl font-bebas mb-8 leading-none slide-in-bottom">
              <span className="block gradient-text text-glow">THE SCNT</span>
              <span className="block text-foreground">STORY</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-dm slide-in-bottom" style={{ animationDelay: "0.2s" }}>
              Built for nights out and everyday signatures.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="glass-card p-8 md:p-12 rounded-3xl scale-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bebas gradient-text">THE BEGINNING</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed font-dm mb-6">
                SCNT was born from a simple belief: <span className="text-primary font-bold">scent is power</span>.
                In a world where personal expression is everything, we create fragrances for those who refuse to blend in,
                who own their presence, and who understand that every moment deserves an olfactory signature.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-dm">
                Founded in the heart of the night—literally and figuratively—SCNT draws inspiration from the energy of
                nightlife, the confidence of self-assured individuals, and the beauty of individuality. We believe that
                fragrance is not just about smelling good; it's about <span className="text-accent font-bold">feeling invincible</span>.
              </p>
            </div>

            {/* Section 2 */}
            <div className="glass-card p-8 md:p-12 rounded-3xl scale-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bebas gradient-text">OUR PHILOSOPHY</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed font-dm mb-6">
                Every SCNT fragrance is meticulously crafted to tell a story. Our master perfumers source the finest
                ingredients from around the world, blending them with precision and passion. We don't compromise on
                quality—<span className="text-primary font-bold">we never will</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-dm">
                We're committed to creating fragrances that transcend trends and stand the test of time. Dark luxury,
                modern aesthetics, and an uncompromising dedication to excellence define everything we do.
              </p>
            </div>

            {/* Section 3 */}
            <div className="glass-card p-8 md:p-12 rounded-3xl scale-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bebas gradient-text">WHO WE'RE FOR</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed font-dm mb-6">
                SCNT is for the <span className="gradient-text font-bold">night owl</span>, the{" "}
                <span className="gradient-text font-bold">trailblazer</span>, the{" "}
                <span className="gradient-text font-bold">rule-breaker</span>. It's for people who don't ask for
                permission to be themselves.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-dm">
                Whether you're owning a boardroom, commanding a nightclub, or simply living life on your own terms,
                SCNT is your olfactory declaration of independence. We're not just a brand—we're a{" "}
                <span className="text-accent font-bold">movement</span>.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Authentic",
                  description: "Clean formulas, honest quality",
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Inclusive",
                  description: "For everyone, no exceptions",
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Bold",
                  description: "Confident, modern, distinct",
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className={`glass-card p-6 rounded-2xl text-center hover:glow-subtle transition-all duration-500 hover:-translate-y-2 scale-fade-in`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white mb-4 hover:scale-110 hover:rotate-12 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bebas gradient-text mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-dm">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Quote Section */}
            <div className="relative glass-card p-12 rounded-3xl text-center overflow-hidden scale-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/50 rounded-full blur-3xl pulse-glow" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/50 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1s" }} />
              </div>

              <div className="relative">
                <p className="text-3xl md:text-4xl font-bebas gradient-text mb-6 leading-tight">
                  "SCENT THE NIGHT. OWN THE DAY."
                </p>
                <p className="text-lg text-primary font-space font-bold">— The SCNT Team</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-primary/30 hover:border-primary hover:glow-primary transition-all duration-500 scale-fade-in" style={{ animationDelay: "0.7s" }}>
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bebas gradient-text mb-4">
                  READY TO FIND YOUR SIGNATURE?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 font-dm">
                  Start exploring our collections and discover the fragrance that defines you.
                </p>
                <Link href="/shop">
                  <button className="group px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-space font-bold text-lg hover:scale-110 hover:rotate-1 transition-all duration-300 glow-primary shadow-2xl inline-flex items-center gap-3">
                    EXPLORE COLLECTIONS
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
