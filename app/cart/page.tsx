"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { cart, updateLine, removeLine, refreshCart, isLoading } = useCart()

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const lines = cart?.lines?.edges ?? []
  const isEmpty = lines.length === 0

  const formatPrice = (amount: string, currencyCode: string) => {
    if (currencyCode === "INR") return `₹${Math.round(parseFloat(amount))}`
    return `${currencyCode} ${parseFloat(amount).toFixed(2)}`
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bebas gradient-text mb-8">YOUR CART</h1>

          {isEmpty ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-bebas mb-4">Your bag is empty</h2>
              <p className="text-muted-foreground font-dm mb-8">
                Discover your next signature scent
              </p>
              <Link href="/shop">
                <Button className="font-space">
                  SHOP NOW
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {lines.map(({ node: line }) => {
                const img = line.merchandise.product?.images?.edges?.[0]?.node?.url
                const price = formatPrice(
                  line.merchandise.price.amount,
                  line.merchandise.price.currencyCode
                )
                const lineTotal = parseFloat(line.merchandise.price.amount) * line.quantity
                const lineTotalFormatted =
                  line.merchandise.price.currencyCode === "INR"
                    ? `₹${Math.round(lineTotal)}`
                    : `${line.merchandise.price.currencyCode} ${lineTotal.toFixed(2)}`

                return (
                  <div
                    key={line.id}
                    className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-border glass-card"
                  >
                    <div className="relative w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-secondary">
                      {img && (
                        <Image
                          src={img}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${line.merchandise.product.handle}`}
                          className="font-space font-bold text-lg hover:text-primary"
                        >
                          {line.merchandise.product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {line.merchandise.title || "Default"} · {price}
                        </p>
                        <p className="text-lg font-bold mt-2">{lineTotalFormatted}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center rounded-xl border border-border overflow-hidden">
                          <button
                            onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                            disabled={isLoading}
                            className="h-11 w-11 flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="h-11 w-12 flex items-center justify-center text-sm font-space font-bold border-x border-border">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateLine(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="h-11 w-11 flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeLine(line.id)}
                          disabled={isLoading}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="mt-8 p-6 rounded-2xl border border-primary/30 bg-primary/5">
                <a
                  href={cart?.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="lg"
                    className="w-full h-14 font-space font-bold text-base tracking-widest"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <p className="text-center text-xs text-muted-foreground mt-3 font-dm">
                  You&apos;ll complete payment on Shopify&apos;s secure checkout
                </p>
              </div>

              <Link href="/shop">
                <Button variant="outline" className="font-space">
                  CONTINUE SHOPPING
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
