"use client"

import { useState } from "react"
import { Filter, X, Sparkles } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"

interface CategoryProductsPageProps {
  products: Product[]
  categoryName: string
  categoryKey: string
  subtitle: string
}

export function CategoryProductsPage({
  products,
  categoryName,
  categoryKey,
  subtitle,
}: CategoryProductsPageProps) {
  const [filters, setFilters] = useState({
    priceRange: "all",
    notes: [] as string[],
    intensity: [] as string[],
  })
  const [showFilters, setShowFilters] = useState(false)

  const allNotes = Array.from(
    new Set(products.flatMap((p) => p.notes.split(", ").filter(Boolean)))
  ).slice(0, 12)
  const allIntensities = ["Low", "Medium", "High"]

  const filteredProducts = products.filter((p) => {
    const noteMatch =
      filters.notes.length === 0 ||
      filters.notes.some((n) => p.notes.toLowerCase().includes(n.toLowerCase()))
    const intensityMatch =
      filters.intensity.length === 0 || filters.intensity.includes(p.intensity)
    const priceNum = parseInt(p.price.replace(/[^0-9]/g, ""), 10) || 0
    const priceMatch =
      filters.priceRange === "all" ||
      (filters.priceRange === "under50" && priceNum < 50) ||
      (filters.priceRange === "50-100" && priceNum >= 50 && priceNum <= 100) ||
      (filters.priceRange === "over100" && priceNum > 100)
    return noteMatch && intensityMatch && priceMatch
  })

  const toggleFilter = (category: string, value: string) => {
    setFilters((prev) => {
      const current = prev[category as keyof typeof prev] as string[]
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) }
      }
      return { ...prev, [category]: [...current, value] }
    })
  }

  const activeFiltersCount =
    filters.notes.length + filters.intensity.length + (filters.priceRange !== "all" ? 1 : 0)

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="relative mb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6 scale-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-space font-bold tracking-widest gradient-text">
                {categoryKey === "men" ? "FOR HIM" : categoryKey === "women" ? "FOR HER" : "FOR EVERYONE"}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bebas mb-6 gradient-text slide-in-bottom">
              {categoryName}
            </h1>
            <p
              className="text-xl text-muted-foreground font-dm max-w-2xl mx-auto slide-in-bottom"
              style={{ animationDelay: "0.1s" }}
            >
              {subtitle}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-primary/20 rounded-xl font-space font-bold text-sm transition-all duration-300 lg:hidden"
              >
                <Filter className="w-4 h-4" />
                FILTERS
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-primary to-accent text-white rounded-full text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <div className="text-sm font-dm">
                <span className="text-foreground font-bold">{filteredProducts.length}</span>{" "}
                <span className="text-muted-foreground">products found</span>
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={() =>
                  setFilters({ priceRange: "all", notes: [], intensity: [] })
                }
                className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-destructive/20 rounded-xl font-space font-bold text-sm text-destructive transition-all duration-300"
              >
                <X className="w-4 h-4" />
                CLEAR ALL
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="sticky top-32 space-y-4">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="font-space font-bold text-lg mb-4 gradient-text flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    PRICE
                  </h3>
                  <div className="space-y-3 text-sm font-dm">
                    {["all", "under50", "50-100", "over100"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="price"
                          value={option}
                          checked={filters.priceRange === option}
                          onChange={() =>
                            setFilters({ ...filters, priceRange: option })
                          }
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {option === "all"
                            ? "All Prices"
                            : option === "under50"
                              ? "Under ₹50"
                              : option === "50-100"
                                ? "₹50 - ₹100"
                                : "Over ₹100"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                {allNotes.length > 0 && (
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-space font-bold text-lg mb-4 gradient-text flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      NOTES
                    </h3>
                    <div className="space-y-3 text-sm font-dm">
                      {allNotes.map((note) => (
                        <label
                          key={note}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.notes.includes(note)}
                            onChange={() => toggleFilter("notes", note)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="group-hover:text-primary transition-colors">
                            {note}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="font-space font-bold text-lg mb-4 gradient-text flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    INTENSITY
                  </h3>
                  <div className="space-y-3 text-sm font-dm">
                    {allIntensities.map((intensity) => (
                      <label
                        key={intensity}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters.intensity.includes(intensity)}
                          onChange={() =>
                            toggleFilter("intensity", intensity)
                          }
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {intensity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.slug}
                    name={product.name}
                    price={product.price}
                    notes={product.notes}
                    slug={product.slug}
                    image={product.images?.[0]}
                    variantId={product.variantId}
                    availableForSale={product.availableForSale}
                  />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">😕</div>
                  <h3 className="text-2xl font-bebas gradient-text mb-2">
                    NO MATCHES FOUND
                  </h3>
                  <p className="text-muted-foreground font-dm mb-6">
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={() =>
                      setFilters({ priceRange: "all", notes: [], intensity: [] })
                    }
                    className="px-6 py-3 glass-card hover:bg-primary/20 rounded-xl font-space font-bold transition-all duration-300"
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
