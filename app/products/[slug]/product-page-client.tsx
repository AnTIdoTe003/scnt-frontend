"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Heart, ChevronRight, Share2, Minus, Plus, ShoppingBag, Star, Shield, Truck, Package, RefreshCcw, BadgeCheck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { formatINR } from "@/lib/currency"
import type { Product } from "@/lib/products"

interface ProductPageClientProps {
  product: Product
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState("50ml")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const images = product.images?.length
    ? product.images
    : [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
      ]

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-space scale-fade-in">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-bold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 mb-20">
            {/* Product Gallery */}
            <div className="slide-in-left">
              <div className="sticky top-28">
                <div className="flex gap-4">
                  <div className="hidden sm:flex flex-col gap-3 w-20">
                    {images.map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                          activeImageIndex === idx
                            ? "border-accent shadow-sm"
                            : "border-border hover:border-accent/60"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <Image src={src} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                  <div className="relative flex-1">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border bg-card">
                      <Image
                        src={images[Math.min(activeImageIndex, images.length - 1)]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute top-5 left-5">
                        <div className="rounded-full bg-background/80 backdrop-blur border border-border px-4 py-2 text-xs font-space font-bold">
                          100% Money-back
                        </div>
                      </div>
                      <div className="absolute top-5 right-5 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={`h-11 w-11 rounded-xl border border-border bg-background/80 backdrop-blur grid place-items-center transition-all hover:border-accent ${
                            isWishlisted ? "glow-subtle" : ""
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <Heart className={`w-5 h-5 ${isWishlisted ? "text-accent fill-accent" : "text-foreground"}`} />
                        </button>
                        <button
                          type="button"
                          className="h-11 w-11 rounded-xl border border-border bg-background/80 backdrop-blur grid place-items-center transition-all hover:border-accent"
                          aria-label="Share"
                        >
                          <Share2 className="w-5 h-5 text-foreground" />
                        </button>
                      </div>
                    </div>
                    <div className="sm:hidden mt-4 grid grid-cols-5 gap-2">
                      {images.map((src, idx) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                            activeImageIndex === idx ? "border-accent" : "border-border"
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <Image src={src} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col slide-in-bottom">
              <div className="mb-6">
                <div className="text-xs font-space tracking-widest text-muted-foreground mb-2">
                  The XPerfumes Collection
                </div>
                {product.availableForSale === false && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-space font-bold bg-destructive/20 text-destructive mb-3">
                    OUT OF STOCK
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl font-bebas text-foreground leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="text-sm font-dm text-muted-foreground">4.7 (469)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link
                    href="/men"
                    className={`px-3 py-1 rounded-full border text-xs font-space font-bold transition-colors ${
                      product.category === "Men" ? "bg-secondary border-border" : "bg-background border-border hover:bg-secondary"
                    }`}
                  >
                    For Men
                  </Link>
                  <Link
                    href="/women"
                    className={`px-3 py-1 rounded-full border text-xs font-space font-bold transition-colors ${
                      product.category === "Women" ? "bg-secondary border-border" : "bg-background border-border hover:bg-secondary"
                    }`}
                  >
                    For Women
                  </Link>
                  <Link
                    href="/unisex"
                    className={`px-3 py-1 rounded-full border text-xs font-space font-bold transition-colors ${
                      product.category === "Unisex" ? "bg-secondary border-border" : "bg-background border-border hover:bg-secondary"
                    }`}
                  >
                    Unisex
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-y border-border py-5 mb-6">
                <div>
                  <div className="text-3xl font-bebas text-foreground">{formatINR(product.price)}</div>
                  <div className="text-xs text-muted-foreground font-dm">incl. of all taxes</div>
                </div>
                <div className="flex items-center rounded-xl border border-border overflow-hidden bg-card">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-11 w-11 grid place-items-center hover:bg-secondary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="h-11 w-12 grid place-items-center text-sm font-space font-bold border-x border-border">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-11 w-11 grid place-items-center hover:bg-secondary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed font-dm">
                {product.description}
              </p>

              <div className="mb-6">
                <label className="block text-xs font-space font-bold mb-3 text-muted-foreground tracking-widest">SIZE</label>
                <div className="flex gap-2 flex-wrap">
                  {["30ml", "50ml", "100ml"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border font-space font-bold text-xs transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:bg-secondary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {product.availableForSale === false ? (
                <div className="w-full h-14 flex items-center justify-center rounded-xl font-space font-bold text-sm tracking-widest bg-muted text-muted-foreground cursor-not-allowed">
                  OUT OF STOCK
                </div>
              ) : (
                <button
                  onClick={async () => {
                    if (!product.variantId) return
                    setAdding(true)
                    try {
                      await addToCart(product.variantId, quantity)
                    } finally {
                      setAdding(false)
                    }
                  }}
                  disabled={!product.variantId || adding}
                  className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-space font-bold text-sm tracking-widest hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? "ADDING TO CART..." : "ADD TO CART"}
                </button>
              )}

              <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-6">
                <div className="text-center font-space font-bold tracking-widest text-sm mb-5">
                  TRY XPERFUMES RISK‑FREE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="px-2">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-background border border-border grid place-items-center">
                      <Package className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="text-sm font-space font-bold">Find your scent</div>
                    <div className="text-xs text-muted-foreground font-dm mt-1">Pick a profile that matches your vibe.</div>
                  </div>
                  <div className="px-2">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-background border border-border grid place-items-center">
                      <RefreshCcw className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="text-sm font-space font-bold">Easy exchange</div>
                    <div className="text-xs text-muted-foreground font-dm mt-1">Not a match? Swap within 48 hours.</div>
                  </div>
                  <div className="px-2">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-background border border-border grid place-items-center">
                      <BadgeCheck className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="text-sm font-space font-bold">Money-back</div>
                    <div className="text-xs text-muted-foreground font-dm mt-1">If you don't like it, we refund.</div>
                  </div>
                </div>
                <div className="text-center text-[11px] text-muted-foreground font-dm mt-5">
                  For help, email us at <span className="font-semibold">support@xperfumes.in</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-space">100% Authentic</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-space">Free Shipping</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <ShoppingBag className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-space">Fast Delivery</p>
                </div>
              </div>

              {(product.topNotes?.length > 0 || product.heartNotes?.length > 0 || product.baseNotes?.length > 0) && (
                <div className="rounded-2xl border border-border bg-card p-6 mb-8">
                  <h3 className="font-space font-bold text-sm tracking-widest text-foreground mb-6">
                    FRAGRANCE NOTES
                  </h3>
                  <div className="space-y-4">
                    {product.topNotes?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-space font-bold mb-2 text-muted-foreground tracking-widest">TOP</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.topNotes.map((note) => (
                            <span key={note} className="px-3 py-1 bg-secondary rounded-full text-xs font-dm border border-border">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.heartNotes?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-space font-bold mb-2 text-muted-foreground tracking-widest">HEART</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.heartNotes.map((note) => (
                            <span key={note} className="px-3 py-1 bg-secondary rounded-full text-xs font-dm border border-border">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.baseNotes?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-space font-bold mb-2 text-muted-foreground tracking-widest">BASE</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.baseNotes.map((note) => (
                            <span key={note} className="px-3 py-1 bg-secondary rounded-full text-xs font-dm border border-border">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground font-space mb-1">INTENSITY</p>
                  <p className="font-bebas text-xl gradient-text">{product.intensity}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground font-space mb-1">LONGEVITY</p>
                  <p className="font-bebas text-xl gradient-text">{product.longevity}</p>
                </div>
              </div>
            </div>
          </div>

          {product.recommendations?.length > 0 && (
            <section className="border-t border-primary/20 pt-20">
              <div className="mb-12">
                <h2 className="text-5xl md:text-6xl font-bebas gradient-text mb-4">YOU MIGHT ALSO LIKE</h2>
                <p className="text-lg text-muted-foreground font-dm">More from this collection.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.recommendations.map((rec) => (
                <ProductCard
                  key={rec.slug}
                  name={rec.name}
                  price={rec.price}
                  notes="Premium Fragrance"
                  slug={rec.slug}
                  variantId={rec.variantId}
                  availableForSale={rec.availableForSale}
                />
              ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
