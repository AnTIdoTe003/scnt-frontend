"use client"

import Image from "next/image"
import { Check, ShoppingBag, Sparkles, Zap, Heart, Gift } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatINR } from "@/lib/currency"

const combos = [
  {
    id: 1,
    name: "Night Shift Essentials",
    description: "Perfect for the nocturnal adventurer",
    originalPrice: "₹268",
    price: "₹229",
    discount: "15%",
    items: ["Midnight Essence", "Shadow", "Eclipse"],
    tags: ["Night Out", "Versatile"],
    image: "night shift essentials",
    emoji: "✦",
  },
  {
    id: 2,
    name: "Feminine Mystique",
    description: "A trio of elegance and allure",
    originalPrice: "₹279",
    price: "₹235",
    discount: "16%",
    items: ["Night Bloom", "Velvet Rose", "Seduction"],
    tags: ["Date Night", "Luxe"],
    image: "feminine mystique",
    emoji: "✦",
  },
  {
    id: 3,
    name: "Signature Power",
    description: "For those who command presence",
    originalPrice: "₹287",
    price: "₹240",
    discount: "16%",
    items: ["Obsidian", "Phantom", "Venom"],
    tags: ["Intense", "Bold"],
    image: "signature power",
    emoji: "✦",
  },
  {
    id: 4,
    name: "The Unisex Collection",
    description: "Beyond boundaries, pure individuality",
    originalPrice: "₹283",
    price: "₹238",
    discount: "16%",
    items: ["Ethereal", "Sanctuary", "Reverie"],
    tags: ["Universal", "Subtle"],
    image: "unisex collection",
    emoji: "✦",
  },
  {
    id: 5,
    name: "Office to Afterparty",
    description: "Transition from boardroom to nightclub",
    originalPrice: "₹264",
    price: "₹224",
    discount: "15%",
    items: ["Noir", "Twilight", "Catalyst"],
    tags: ["Versatile", "Fresh"],
    image: "office to afterparty",
    emoji: "✦",
  },
  {
    id: 6,
    name: "The Romantic",
    description: "Whisper sweet nothings with scent",
    originalPrice: "₹273",
    price: "₹232",
    discount: "15%",
    items: ["Moonlight", "Dusk", "Enchant"],
    tags: ["Intimate", "Sensual"],
    image: "romantic",
    emoji: "✦",
  },
]

export default function CombosPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20 animated-gradient" />

          <div className="relative max-w-6xl mx-auto text-center py-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full mb-8 scale-fade-in hover:scale-110 transition-transform duration-300">
              <Gift className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-space font-bold tracking-widest gradient-text">
                BUNDLE & SAVE
              </span>
              <Heart className="w-5 h-5 text-accent fill-accent animate-pulse" />
            </div>

            <h1 className="text-6xl md:text-9xl font-bebas mb-8 leading-none slide-in-bottom">
              <span className="block gradient-text text-glow">CURATED</span>
              <span className="block text-foreground">COLLECTIONS</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-dm slide-in-bottom" style={{ animationDelay: "0.2s" }}>
              Expertly designed fragrance bundles for every vibe. Save up to{" "}
              <span className="text-primary font-bold">25%</span> when you bundle.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm font-space scale-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-accent" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Gift Ready</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          {/* Combos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {combos.map((combo, index) => (
              <div
                key={combo.id}
                className={`group glass-card rounded-3xl overflow-hidden hover:glow-subtle transition-all duration-500 hover:-translate-y-2 scale-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative h-80 bg-gradient-to-b from-secondary/50 to-background overflow-hidden">
                  <Image
                    src={`/luxury-perfume-bottle-.jpg?height=400&width=400&query=perfume collection bundle ${combo.image}`}
                    alt={combo.name}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-space font-bold pulse-glow">
                    SAVE {combo.discount}
                  </div>

                  {/* Emoji Badge */}
                  <div className="absolute top-4 left-4 text-4xl group-hover:scale-125 transition-transform duration-300">
                    {combo.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bebas gradient-text mb-2 group-hover:scale-105 transition-transform">
                    {combo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-dm">{combo.description}</p>

                  {/* Items List */}
                  <div className="mb-4 space-y-2">
                    {combo.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm font-dm">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {combo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 glass-card rounded-full font-space font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Section */}
                  <div className="border-t border-primary/20 pt-4 mb-4">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bebas gradient-text">{formatINR(combo.price)}</span>
                      <span className="text-sm text-muted-foreground line-through font-dm">
                        {formatINR(combo.originalPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-dm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-accent" />
                      All three fragrances included
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="group/btn w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 glow-primary flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    ADD BUNDLE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Bundles Section */}
          <section className="relative mb-20 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl pulse-glow" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1s" }} />
            </div>

            <div className="relative glass-card p-12 rounded-3xl">
              <h2 className="text-5xl md:text-6xl font-bebas gradient-text mb-12 text-center">
                WHY BUNDLE UP?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Save Big",
                    description: "Get up to 25% off compared to buying individually.",
                  },
                  {
                    icon: <Sparkles className="w-8 h-8" />,
                    title: "Expert Curation",
                    description: "Designed to layer beautifully across occasions.",
                  },
                  {
                    icon: <Heart className="w-8 h-8" />,
                    title: "Discover More",
                    description: "Explore complementary scents you might not try solo.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className={`text-center scale-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white mb-6 hover:scale-110 hover:rotate-12 transition-all duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bebas gradient-text mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground font-dm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative glass-card p-12 md:p-16 rounded-3xl border-2 border-primary/30 hover:border-primary hover:glow-primary transition-all duration-500 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary to-accent rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
                <Gift className="w-5 h-5 text-primary" />
                <span className="text-sm font-space font-bold tracking-widest gradient-text">CUSTOM BUNDLE</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bebas gradient-text mb-4">
                CAN'T FIND THE PERFECT BUNDLE?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-dm">
                Create your own custom fragrance collection. Mix and match any three fragrances for the same bundle
              price.
              </p>
              <button className="group px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-space font-bold text-lg hover:scale-110 hover:rotate-1 transition-all duration-300 glow-primary shadow-2xl inline-flex items-center gap-3">
                <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                BUILD YOUR BUNDLE
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
