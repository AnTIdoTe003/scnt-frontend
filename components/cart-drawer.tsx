"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Loader2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatINR } from "@/lib/currency"

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateLine, removeLine, isLoading } = useCart()
  const [loadingAction, setLoadingAction] = useState<{ id: string; type: "plus" | "minus" | "remove" } | null>(null)

  const lines = cart?.lines?.edges ?? []

  const handleUpdate = async (id: string, quantity: number, type: "plus" | "minus") => {
    setLoadingAction({ id, type })
    try {
      await updateLine(id, quantity)
    } finally {
      setLoadingAction(null)
    }
  }

  const handleRemove = async (id: string) => {
    setLoadingAction({ id, type: "remove" })
    try {
      await removeLine(id)
    } finally {
      setLoadingAction(null)
    }
  }
  const isEmpty = lines.length === 0

  const formatPrice = (amount: string, currencyCode: string) => {
    if (currencyCode === "INR") return `₹${Math.round(parseFloat(amount))}`
    return `${currencyCode} ${parseFloat(amount).toFixed(2)}`
  }

  // Calculate subtotal and item count
  const itemCount = lines.reduce((acc, { node }) => acc + node.quantity, 0)
  const subtotal = lines.reduce((acc, { node }) => {
    return acc + parseFloat(node.merchandise.price.amount) * node.quantity
  }, 0)

  const currencyCode = lines[0]?.node?.merchandise?.price?.currencyCode || "INR"
  const formattedSubtotal = formatPrice(subtotal.toString(), currencyCode)

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl p-0">
        <SheetHeader className="p-6 border-b border-border/50 flex-none">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-bebas text-3xl tracking-wider text-foreground flex items-center gap-3">
              YOUR BAG
              {itemCount > 0 && (
                <span className="bg-accent/10 border border-accent/20 text-accent text-sm font-space font-bold px-3 py-1 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
          {/* Decorative subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-dm mb-4">Your bag is empty</p>
              <Link href="/shop" onClick={() => setCartOpen(false)}>
                <Button variant="outline" className="font-space">
                  CONTINUE SHOPPING
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-5 relative z-10">
              {lines.map(({ node: line }) => {
                const img = line.merchandise.product?.images?.edges?.[0]?.node?.url
                const price = formatPrice(
                  line.merchandise.price.amount,
                  line.merchandise.price.currencyCode
                )
                const lineTotal = formatPrice(
                  (parseFloat(line.merchandise.price.amount) * line.quantity).toString(),
                  line.merchandise.price.currencyCode
                )

                return (
                  <div
                    key={line.id}
                    className="flex gap-5 p-4 rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm hover:border-accent/40 hover:bg-card/90 transition-all group"
                  >
                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-secondary border border-border/50 group-hover:border-accent/20 transition-colors">
                      {img ? (
                        <Image
                          src={img}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingBag className="w-8 h-8 opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${line.merchandise.product.handle}`}
                            onClick={() => setCartOpen(false)}
                            className="font-space font-bold text-base hover:text-accent transition-colors line-clamp-1"
                          >
                            {line.merchandise.product.title}
                          </Link>
                          <button
                            onClick={() => handleRemove(line.id)}
                            disabled={isLoading}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors -mr-1.5 -mt-1.5 disabled:opacity-50"
                            aria-label="Remove item"
                          >
                            {loadingAction?.id === line.id && loadingAction.type === "remove" ? (
                              <Loader2 className="w-4 h-4 animate-spin text-destructive" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground font-dm mt-1">
                          {line.merchandise.title === "Default Title" ? "Single Item" : line.merchandise.title}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center rounded-xl border border-border/60 bg-background/50 overflow-hidden shadow-sm">
                          <button
                            onClick={() => handleUpdate(line.id, Math.max(1, line.quantity - 1), "minus")}
                            disabled={isLoading || line.quantity <= 1}
                            className="h-8 w-8 flex items-center justify-center hover:bg-secondary hover:text-foreground text-muted-foreground transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                          >
                            {loadingAction?.id === line.id && loadingAction.type === "minus" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="h-8 w-8 flex items-center justify-center text-sm font-space font-bold border-x border-border/60 bg-background select-none">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdate(line.id, line.quantity + 1, "plus")}
                            disabled={isLoading}
                            className="h-8 w-8 flex items-center justify-center hover:bg-secondary hover:text-foreground text-muted-foreground transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                          >
                            {loadingAction?.id === line.id && loadingAction.type === "plus" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="font-space font-bold text-foreground">
                          {lineTotal}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        {!isEmpty && cart?.checkoutUrl && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl p-6 flex-none shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-muted-foreground font-dm text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between text-foreground">
                <span className="font-space font-bold text-lg">Subtotal</span>
                <span className="font-bebas text-2xl tracking-wider text-accent">{formattedSubtotal}</span>
              </div>
            </div>

            <a
              href={cart.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 font-space font-bold tracking-widest flex items-center justify-center gap-2 rounded-xl transition-all shadow-lg shadow-foreground/10 group">
                PROCEED TO CHECKOUT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground font-dm">
              <ShieldCheck className="w-4 h-4" /> Secure SSL Checkout
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
