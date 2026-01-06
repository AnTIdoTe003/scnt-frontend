"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Sparkles, Zap, Heart, Star, Play, Clock, Flame, TrendingUp, Quote, Instagram, Send, Gift, Truck, Shield, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 animated-gradient opacity-20" />

          {/* Floating orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl float opacity-40" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl float opacity-30" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl pulse-glow" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center py-20">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full border border-primary/30 scale-fade-in hover:scale-110 transition-transform duration-300 cursor-pointer">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-sm font-space font-bold tracking-widest gradient-text">
                TRENDING IN INDIA
              </span>
              <TrendingUp className="w-5 h-5 text-green-500 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas mb-8 leading-none slide-in-bottom">
              <span className="block gradient-text text-glow">SCENT THE</span>
              <span className="block text-foreground">NIGHT.</span>
              <span className="block gradient-text-alt text-glow-accent">OWN THE DAY.</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-dm slide-in-bottom leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Premium fragrances that hit different. Clean openings, rich dry-downs, and compliment-magnet performance.
              <span className="text-primary font-semibold"> Made for the main character era.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-in-bottom" style={{ animationDelay: "0.4s" }}>
              <Link href="/shop">
                <button className="group px-10 py-5 bg-linear-to-r from-primary to-accent text-white rounded-2xl font-space font-bold text-lg hover:scale-110 hover:rotate-1 transition-all duration-300 glow-primary flex items-center gap-3 shadow-2xl">
                  SHOP THE DROP
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/about">
                <button className="group px-10 py-5 glass-card border-2 border-primary/20 text-foreground rounded-2xl font-space font-bold text-lg hover:scale-110 hover:-rotate-1 hover:bg-secondary transition-all duration-300 shadow-2xl flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  WATCH OUR STORY
                </button>
              </Link>
            </div>

            {/* Social Proof Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 scale-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-2 text-sm font-dm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent border-2 border-background" />
                  ))}
                </div>
                <span><span className="text-foreground font-bold">2,847+</span> happy customers this month</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto scale-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="glass-card p-4 rounded-xl hover:glow-subtle transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bebas gradient-text mb-1">10K+</div>
                <div className="text-xs text-muted-foreground font-space">HAPPY CUSTOMERS</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover:glow-subtle transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bebas gradient-text mb-1">4.9★</div>
                <div className="text-xs text-muted-foreground font-space">AVG RATING</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover:glow-subtle transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bebas gradient-text mb-1">8-10h</div>
                <div className="text-xs text-muted-foreground font-space">LONGEVITY</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover:glow-subtle transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bebas gradient-text mb-1">100%</div>
                <div className="text-xs text-muted-foreground font-space">AUTHENTIC</div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
        <section className="py-4 bg-linear-to-r from-primary via-accent to-primary overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8 text-white font-space font-bold text-sm tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                FREE SHIPPING ON ₹999+
                <span className="mx-4">•</span>
                <Zap className="w-4 h-4" />
                EASY RETURNS
                <span className="mx-4">•</span>
                <Gift className="w-4 h-4" />
                COMPLIMENTARY SAMPLES
                <span className="mx-4">•</span>
                <Flame className="w-4 h-4" />
                NEW DROP EVERY MONTH
              </span>
            ))}
          </div>
        </section>

        {/* Trending Section - TikTok Style */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-500 to-purple-500 rounded-full">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white font-space font-bold text-sm">TRENDING NOW</span>
              </div>
              <span className="text-muted-foreground font-dm">What Gen Z is obsessed with rn</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Midnight Essence", tag: "#1 Bestseller", sold: "2.3K sold", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", slug: "midnight-essence" },
                { name: "Night Bloom", tag: "Viral on Insta", sold: "1.8K sold", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", slug: "night-bloom" },
                { name: "Obsidian", tag: "Date Night Fav", sold: "1.5K sold", image: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=400", slug: "obsidian" },
                { name: "Ethereal", tag: "Clean Girl Era", sold: "1.2K sold", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=400", slug: "ethereal" },
              ].map((item, index) => (
                <Link key={item.name} href={`/product/${item.slug}`}>
                  <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer scale-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-accent text-xs font-space font-bold rounded-full text-black">{item.tag}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bebas text-2xl mb-1">{item.name}</h3>
                      <p className="text-white/70 text-sm font-dm">{item.sold}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Find Your Scent Quiz CTA */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-primary/20">
              <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-accent/10" />
              <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-space font-bold gradient-text">2 MIN QUIZ</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bebas mb-4">
                    <span className="gradient-text">NOT SURE WHERE</span>
                    <br />
                    <span className="text-foreground">TO START?</span>
                  </h2>
                  <p className="text-muted-foreground font-dm mb-6">
                    Take our quick quiz and discover your perfect signature scent based on your vibe, personality, and lifestyle. No cap, it's lowkey accurate. 🎯
                  </p>
                  <button className="group px-8 py-4 bg-linear-to-r from-primary to-accent text-white rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    FIND MY SCENT
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600"
                    alt="Find your scent"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Highlights */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-bebas mb-4">
                <span className="gradient-text">FIND YOUR VIBE</span>
              </h2>
              <p className="text-lg text-muted-foreground font-dm">
                Every scent tells a story. What's yours? ✨
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "For Him",
                  href: "/men",
                  emoji: "🔥",
                  color: "from-blue-600/30 to-purple-600/30",
                  description: "Bold & Powerful",
                  tagline: "Main character energy",
                  image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
                },
                {
                  title: "For Her",
                  href: "/women",
                  emoji: "✨",
                  color: "from-pink-600/30 to-purple-600/30",
                  description: "Elegant & Fierce",
                  tagline: "That girl aesthetic",
                  image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
                },
                {
                  title: "Unisex",
                  href: "/unisex",
                  emoji: "💫",
                  color: "from-purple-600/30 to-cyan-600/30",
                  description: "Beyond Labels",
                  tagline: "No rules, just vibes",
                  image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800"
                },
              ].map((cat, index) => (
                <Link key={cat.title} href={cat.href}>
                  <div
                    className={`group relative h-[450px] rounded-3xl overflow-hidden glass-card hover:glow-primary transition-all duration-500 cursor-pointer hover:-translate-y-4 hover:rotate-1 scale-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`absolute inset-0 bg-linear-to-b ${cat.color} group-hover:opacity-80 transition-opacity`} />
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8">
                      <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                        {cat.emoji}
                      </div>
                      <h3 className="text-4xl font-bebas text-white mb-1 group-hover:scale-110 transition-transform">
                        {cat.title}
                      </h3>
                      <p className="text-white/80 font-space text-sm mb-2">{cat.description}</p>
                      <p className="text-accent font-dm text-sm italic mb-4">{cat.tagline}</p>
                      <div className="flex items-center gap-2 text-white font-space font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        EXPLORE
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl pulse-glow" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-space font-bold text-orange-500">HOT RIGHT NOW</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bebas mb-2">
                  <span className="gradient-text">BESTSELLERS</span>
                </h2>
                <p className="text-lg text-muted-foreground font-dm">The scents everyone's talking about 💬</p>
              </div>
              <Link href="/shop">
                <button className="hidden md:flex items-center gap-2 px-6 py-3 glass-card hover:bg-primary/20 rounded-xl font-space font-bold text-sm hover:scale-105 transition-all duration-300">
                  VIEW ALL
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Midnight Essence", price: "₹2,499", notes: "Woody, Spicy", slug: "midnight-essence" },
                { name: "Night Bloom", price: "₹2,799", notes: "Floral, Citrus", slug: "night-bloom" },
                { name: "Shadow", price: "₹2,199", notes: "Woody, Amber", slug: "shadow" },
                { name: "Obsidian", price: "₹2,999", notes: "Spicy, Oriental", slug: "obsidian" },
              ].map((product) => (
                <ProductCard key={product.name} {...product} />
              ))}
            </div>

            <Link href="/shop">
              <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 glass-card hover:bg-primary/20 rounded-xl font-space font-bold hover:scale-105 transition-all duration-300">
                VIEW ALL PRODUCTS
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>

        {/* Social Proof - Reviews */}
        <section className="py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-space font-bold">4.9/5 FROM 2,847 REVIEWS</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bebas gradient-text mb-4">
                THE HYPE IS REAL
              </h2>
              <p className="text-muted-foreground font-dm">Don't just take our word for it 👀</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya S.",
                  location: "Mumbai",
                  review: "Literally got 5 compliments on my first day wearing Midnight Essence. The longevity is INSANE - lasted through my entire 12-hour shift. 10/10 no cap 🔥",
                  product: "Midnight Essence",
                  rating: 5,
                  avatar: "P"
                },
                {
                  name: "Arjun M.",
                  location: "Delhi",
                  review: "Finally found a fragrance that doesn't smell like my dad's cologne but still feels premium. Obsidian is the perfect balance of sophisticated and youthful. Main character vibes fr.",
                  product: "Obsidian",
                  rating: 5,
                  avatar: "A"
                },
                {
                  name: "Sneha R.",
                  location: "Bangalore",
                  review: "Night Bloom is giving everything it was supposed to give. Got it for my bestie's birthday and now we're both obsessed. The packaging is so aesthetic too! 💜",
                  product: "Night Bloom",
                  rating: 5,
                  avatar: "S"
                },
              ].map((review, index) => (
                <div
                  key={review.name}
                  className="glass-card p-6 rounded-2xl hover:glow-subtle transition-all duration-300 scale-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-foreground font-dm mb-4 leading-relaxed">{review.review}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-space font-bold text-sm">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                    <span className="text-xs text-primary font-space">{review.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Style Grid */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-space font-bold">@SCNTOFFICIAL</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bebas gradient-text mb-4">
                JOIN THE COMMUNITY
              </h2>
              <p className="text-muted-foreground font-dm">Tag us in your pics for a chance to be featured ✨</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=300",
                "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300",
                "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=300",
                "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=300",
                "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=300",
                "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=300",
              ].map((src, index) => (
                <div key={index} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                  <Image src={src} alt={`Community post ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 glass-card border border-pink-500/50 hover:bg-pink-500/10 rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 text-pink-500">
                  <Instagram className="w-5 h-5" />
                  FOLLOW US ON INSTAGRAM
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Features/USP */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bebas gradient-text mb-4">
                WHY SCNT?
              </h2>
              <p className="text-muted-foreground font-dm">We're not like other perfume brands fr fr</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield className="w-7 h-7" />,
                  title: "100% Authentic",
                  description: "Premium ingredients, zero compromises",
                },
                {
                  icon: <Clock className="w-7 h-7" />,
                  title: "8-10hr Longevity",
                  description: "All-day confidence guaranteed",
                },
                {
                  icon: <Truck className="w-7 h-7" />,
                  title: "Free Shipping",
                  description: "On orders above ₹999",
                },
                {
                  icon: <Gift className="w-7 h-7" />,
                  title: "Free Samples",
                  description: "With every order",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`glass-card p-6 rounded-2xl hover:glow-subtle transition-all duration-500 hover:-translate-y-2 text-center scale-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-primary to-accent text-white mb-4 hover:scale-110 hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bebas gradient-text mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground font-dm text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limited Drop / FOMO Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-accent/5 to-primary/5" />
          <div className="relative max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl overflow-hidden border border-accent/30">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto min-h-[400px]">
                  <Image
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"
                    alt="Limited Edition"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-accent text-black font-space font-bold text-sm rounded-full animate-pulse">
                      LIMITED EDITION
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-accent font-space font-bold text-sm">DROPPING SOON</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bebas mb-4">
                    <span className="gradient-text">SUMMER</span>
                    <br />
                    <span className="text-foreground">COLLECTION 2026</span>
                  </h2>
                  <p className="text-muted-foreground font-dm mb-6">
                    Fresh, citrusy, and perfect for the hot girl summer. Only 500 bottles available. Join the waitlist to get early access. 🌴
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 glass-card border border-accent/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-dm"
                    />
                    <button className="px-6 py-3 bg-accent text-black rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      NOTIFY ME
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 font-dm">
                    🔒 247 people already on the waitlist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span className="text-xs font-space font-bold tracking-widest">OUR STORY</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bebas mb-8">
              <span className="gradient-text">BORN FOR THE</span>
              <br />
              <span className="text-foreground">NEW GENERATION</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6 font-dm leading-relaxed">
              SCNT was created by perfume lovers who were tired of fragrances that smelled like our parents' generation. We wanted something
              <span className="text-primary font-semibold"> fresh</span>,{" "}
              <span className="text-accent font-semibold">bold</span>, and{" "}
              <span className="gradient-text font-semibold">unapologetically us</span>.
            </p>
            <p className="text-lg text-muted-foreground mb-8 font-dm">
              Every bottle is crafted with premium ingredients, designed for all-day performance, and made to turn heads. Because you deserve a scent that matches your main character energy. 🌟
            </p>
            <Link href="/about">
              <button className="group px-8 py-4 glass-card border-2 border-primary/50 hover:bg-primary/20 rounded-xl font-space font-bold hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                READ OUR FULL STORY
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-4 border-t border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-primary to-accent rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-space font-bold tracking-widest gradient-text">JOIN 10K+ SUBSCRIBERS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bebas mb-4 gradient-text">STAY IN THE LOOP</h2>
            <p className="text-lg text-muted-foreground mb-8 font-dm">
              Be the first to know about new drops, exclusive deals, and insider vibes. Plus get <span className="text-accent font-bold">10% off</span> your first order! 🎁
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm"
              />
              <button className="px-8 py-4 bg-linear-to-r from-primary to-accent text-white rounded-xl font-space font-bold hover:scale-105 hover:rotate-1 transition-all duration-300 glow-primary shadow-2xl">
                GET 10% OFF
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-dm">
              No spam, just good vibes. Unsubscribe anytime. 🤝
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
