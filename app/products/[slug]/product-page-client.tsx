"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Heart, ChevronRight, Share2, Minus, Plus, ShoppingBag, Star, Shield, Truck, Package, RefreshCcw, BadgeCheck, ChevronDown, ShieldCheck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductReviews } from "@/components/product-reviews"
import { DeliveryEstimator } from "@/components/delivery-estimator"
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
  const [descExpanded, setDescExpanded] = useState(false)
  const [notesExpanded, setNotesExpanded] = useState(true)

  // Bundle state
  const [inventoryQuantity, setInventoryQuantity] = useState<number | null>(null)
  const [selectedBundle, setSelectedBundle] = useState<number>(1)

  useEffect(() => {
    async function checkInventory() {
      if (!product.variantId) return
      try {
        const res = await fetch(`/api/inventory?variantId=${encodeURIComponent(product.variantId)}`)
        const data = await res.json()
        if (data.success && typeof data.inventoryQuantity === "number") {
          setInventoryQuantity(data.inventoryQuantity)
        }
      } catch (err) {
        console.error("Failed to check inventory", err)
      }
    }
    checkInventory()
  }, [product.variantId])

  const numericPrice = Number(product.price.replace(/[^0-9.]/g, ""))

  const handleAddToCart = async () => {
    setAdding(true)
    const qtyToAdd = inventoryQuantity !== null && inventoryQuantity > 5 ? selectedBundle : quantity
    try {
      if (product.variantId) {
        await addToCart(product.variantId, qtyToAdd)
      }
    } finally {
      setAdding(false)
    }
  }

  // Tiered Pricing Calculations
  const formatPrice = (val: number) => `₹${val.toFixed(2)}`
  const bundleOnePrice = formatPrice(numericPrice)
  const bundleTwoDiscount = numericPrice * 2 * 0.10
  const bundleTwoFinal = (numericPrice * 2) - bundleTwoDiscount
  const bundleThreeDiscount = numericPrice * 3 * 0.15
  const bundleThreeFinal = (numericPrice * 3) - bundleThreeDiscount

  const currentTotal = selectedBundle === 1
    ? numericPrice
    : selectedBundle === 2
      ? bundleTwoFinal
      : bundleThreeFinal

  const currentSavings = selectedBundle === 2
    ? bundleTwoDiscount
    : selectedBundle === 3
      ? bundleThreeDiscount
      : 0
  const originalTotal = numericPrice * selectedBundle

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
                        className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${activeImageIndex === idx
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
                          className={`h-11 w-11 rounded-xl border border-border bg-background/80 backdrop-blur grid place-items-center transition-all hover:border-accent ${isWishlisted ? "glow-subtle" : ""
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
                          className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${activeImageIndex === idx ? "border-accent" : "border-border"
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
                    className={`px-3 py-1 rounded-full border text-xs font-space font-bold transition-colors ${product.category === "Men" ? "bg-secondary border-border" : "bg-background border-border hover:bg-secondary"
                      }`}
                  >
                    For Men
                  </Link>
                  <Link
                    href="/women"
                    className={`px-3 py-1 rounded-full border text-xs font-space font-bold transition-colors ${product.category === "Women" ? "bg-secondary border-border" : "bg-background border-border hover:bg-secondary"
                      }`}
                  >
                    For Women
                  </Link>
                  <Link
                    href="/unisex"
                    className={`px-3 py-1 rounded-full border text-xs font-space font-bold transition-colors ${product.category === "Unisex" ? "bg-secondary border-border" : "bg-background border-border hover:bg-secondary"
                      }`}
                  >
                    Unisex
                  </Link>
                </div>
              </div>

              <div className="border-y border-border py-5 mb-6">
                <div className="text-3xl font-bebas text-foreground">{formatINR(product.price)}</div>
                <div className="text-xs text-muted-foreground font-dm">incl. of all taxes</div>
              </div>

              <div className="mb-6 rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <h3 className="font-space font-bold text-sm tracking-widest text-foreground">
                    THE STORY
                  </h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${descExpanded ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${descExpanded ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed font-dm">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-space font-bold mb-3 text-muted-foreground tracking-widest">SIZE</label>
                <div className="flex gap-2 flex-wrap">
                  {["50ml"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border font-space font-bold text-xs transition-colors ${selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-secondary"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* TIERED BUNDLE AND FBT */}
              <div className="mb-6">
                {product.availableForSale === false ? (
                  <div className="w-full h-14 flex items-center justify-center rounded-xl font-space font-bold text-sm tracking-widest bg-muted text-muted-foreground cursor-not-allowed">
                    OUT OF STOCK
                  </div>
                ) : inventoryQuantity !== null && inventoryQuantity > 5 ? (
                  <div className="p-5 border border-border rounded-xl glass-card relative overflow-hidden w-full">
                    {/* Decorative gradient blob */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                    <h3 className="text-lg font-space font-bold tracking-wider text-foreground mb-4">
                      Buy more, save more
                    </h3>

                    <div className="space-y-3">
                      {/* Tier 1 */}
                      <label
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedBundle === 1 ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40 bg-card'
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBundle === 1 ? 'border-accent' : 'border-muted-foreground/30'
                            }`}>
                            {selectedBundle === 1 && <div className="w-2 h-2 bg-accent rounded-full" />}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-space font-bold text-sm text-foreground">Buy 1</span>
                            <span className="text-[10px] font-dm bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">Full price</span>
                          </div>
                        </div>
                        <span className="font-space text-sm text-foreground text-right sm:text-left">{bundleOnePrice}</span>
                        <input type="radio" className="hidden" checked={selectedBundle === 1} onChange={() => setSelectedBundle(1)} />
                      </label>

                      {/* Tier 2 */}
                      <label
                        className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedBundle === 2 ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/70 bg-card shadow-sm'
                          }`}
                      >
                        <div className="absolute -top-3 right-4 bg-muted-foreground/80 text-background text-[9px] font-space font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md">
                          Popular
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-muted-foreground/80" />
                        </div>

                        <div className="flex items-center gap-3 mb-2 sm:mb-0 pt-1">
                          <div className={`w-4 h-4 rounded-full border flex shrink-0 items-center justify-center ${selectedBundle === 2 ? 'border-accent' : 'border-muted-foreground/30'
                            }`}>
                            {selectedBundle === 2 && <div className="w-2 h-2 bg-accent rounded-full" />}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-space font-bold text-sm text-foreground">Buy 2</span>
                            <span className="text-[10px] font-dm bg-muted-foreground/80 text-background px-2 py-0.5 rounded-full font-bold">Save 10%</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end text-right sm:text-left pt-1">
                          <span className="text-[10px] font-dm text-muted-foreground line-through decoration-muted-foreground/50">{formatPrice(numericPrice * 2)}</span>
                          <span className="font-space font-bold text-sm text-foreground">{formatPrice(bundleTwoFinal)}</span>
                        </div>
                        <input type="radio" className="hidden" checked={selectedBundle === 2} onChange={() => setSelectedBundle(2)} />
                      </label>

                      {/* Tier 3 */}
                      <label
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedBundle === 3 ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40 bg-card'
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className={`w-4 h-4 rounded-full border flex shrink-0 items-center justify-center ${selectedBundle === 3 ? 'border-accent' : 'border-muted-foreground/30'
                            }`}>
                            {selectedBundle === 3 && <div className="w-2 h-2 bg-accent rounded-full" />}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-space font-bold text-sm text-foreground">Buy 3+</span>
                            <span className="text-[10px] font-dm bg-muted-foreground/80 text-background px-2 py-0.5 rounded-full font-bold">Save 15%</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end text-right sm:text-left">
                          <span className="text-[10px] font-dm text-muted-foreground line-through decoration-muted-foreground/50">{formatPrice(numericPrice * 3)}</span>
                          <span className="font-space font-bold text-sm text-foreground">{formatPrice(bundleThreeFinal)}</span>
                        </div>
                        <input type="radio" className="hidden" checked={selectedBundle === 3} onChange={() => setSelectedBundle(3)} />
                      </label>
                    </div>

                    {/* Summary Block */}
                    <div className="mt-5 pt-4 border-t border-border flex flex-col justify-end gap-4">
                      <div className="flex items-end justify-between">
                        <span className="text-sm font-space font-bold text-foreground">Total</span>

                        <div className="flex flex-col items-end gap-0.5">
                          {selectedBundle > 1 && (
                            <div className="flex items-center gap-1.5 text-[10px] font-space font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded">
                              <ShieldCheck className="w-3 h-3" />
                              SAVE {formatPrice(currentSavings)}
                            </div>
                          )}
                          <div className="flex items-center justify-end gap-2">
                            {selectedBundle > 1 && (
                              <span className="text-xs font-dm text-muted-foreground line-through decoration-muted-foreground/50">
                                {formatPrice(originalTotal)}
                              </span>
                            )}
                            <span className="text-2xl font-space font-bold text-foreground leading-none">
                              {formatPrice(currentTotal)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={!product.variantId || adding}
                        className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-space font-bold text-sm tracking-widest hover:opacity-95 transition disabled:opacity-50 glow-primary flex items-center justify-center"
                      >
                        {adding ? "ADDING TO CART..." : "ADD SELECTED BUNDLE TO CART"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.variantId || adding}
                      className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-space font-bold text-sm tracking-widest hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
                    >
                      {adding ? "ADDING TO CART..." : "ADD TO CART"}
                    </button>

                    <div className="glass-card p-5 rounded-2xl border border-border flex flex-col gap-4 relative overflow-hidden">
                      {/* Decorative gradient blob */}
                      <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                      <h2 className="text-lg font-bebas text-foreground tracking-wider mb-2">FREQUENTLY BOUGHT TOGETHER</h2>

                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border shrink-0">
                          <Image src={product.images[0] || ""} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bebas text-lg text-foreground leading-none mb-1">{product.name}</h4>
                          <p className="text-xs font-space text-muted-foreground">{formatINR(product.price)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center -my-2 opacity-50">
                        <Plus className="w-4 h-4 text-foreground" />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border shrink-0">
                          <Image src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400" alt="Discovery Set" fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bebas text-lg text-foreground leading-none mb-1">Discovery Set</h4>
                          <p className="text-xs font-space text-muted-foreground">₹999</p>
                        </div>
                      </div>

                      <div className="mt-2 pt-4 border-t border-border flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-end">
                          <div className="flex flex-col">
                            <div className="text-xs font-space font-bold text-accent mb-1">BUNDLE 15% OFF</div>
                            <span className="text-sm font-dm line-through text-muted-foreground decoration-red-500/50 leading-none">
                              ₹{(parseInt(product.price) + 999).toString()}
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-space font-bold text-foreground leading-none">
                              ₹{Math.floor((parseInt(product.price) + 999) * 0.85).toString()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={async () => {
                            if (!product.variantId) return
                            setAdding(true)
                            try {
                              await addToCart(product.variantId, 1)
                            } finally {
                              setAdding(false)
                            }
                          }}
                          disabled={!product.variantId || adding}
                          className="w-full h-12 bg-linear-to-r from-primary to-accent text-white rounded-xl font-space font-bold tracking-widest hover:opacity-95 transition disabled:opacity-50 text-xs"
                        >
                          ADD BUNDLE
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DeliveryEstimator />
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
              <div className="rounded-2xl border border-border bg-card mb-8 overflow-hidden">
                <button
                  onClick={() => setNotesExpanded(!notesExpanded)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <h3 className="font-space font-bold text-sm tracking-widest text-foreground">
                    FRAGRANCE NOTES
                  </h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${notesExpanded ? "rotate-180" : ""}`} />
                </button>

                <div className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${notesExpanded ? "max-h-[500px] pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-4 pt-2">
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

        {/* FREQUENTLY BOUGHT TOGETHER vs TIERED BUNDLE moved to right column */}

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <ProductReviews productId={product.slug} />
        </div>

        {product.recommendations?.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 border-t border-primary/20 pt-20">
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
      </main>
      <Footer />
    </>
  )
}
