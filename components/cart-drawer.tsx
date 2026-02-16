"use client"

import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatINR } from "@/lib/currency"

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateLine, removeLine, isLoading } = useCart()

  const lines = cart?.lines?.edges ?? []
  const isEmpty = lines.length === 0

  const formatPrice = (amount: string, currencyCode: string) => {
    if (currencyCode === "INR") return `₹${Math.round(parseFloat(amount))}`
    return `${currencyCode} ${parseFloat(amount).toFixed(2)}`
  }

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-bebas text-2xl gradient-text">YOUR BAG</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
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
            <div className="space-y-4">
              {lines.map(({ node: line }) => {
                const img = line.merchandise.product?.images?.edges?.[0]?.node?.url
                const price = formatPrice(
                  line.merchandise.price.amount,
                  line.merchandise.price.currencyCode
                )
                return (
                  <div
                    key={line.id}
                    className="flex gap-4 p-4 rounded-xl border border-border bg-card"
                  >
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-secondary">
                      {img && (
                        <Image
                          src={img}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${line.merchandise.product.handle}`}
                        onClick={() => setCartOpen(false)}
                        className="font-space font-bold text-sm hover:text-primary line-clamp-2"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {line.merchandise.title || "Default"}
                      </p>
                      <p className="text-sm font-bold mt-1">{price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg border border-border overflow-hidden">
                          <button
                            onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                            disabled={isLoading}
                            className="h-8 w-8 flex items-center justify-center hover:bg-secondary"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="h-8 w-8 flex items-center justify-center text-sm font-space font-bold border-x border-border">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateLine(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="h-8 w-8 flex items-center justify-center hover:bg-secondary"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeLine(line.id)}
                          disabled={isLoading}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        {!isEmpty && cart?.checkoutUrl && (
          <div className="border-t border-border pt-4 space-y-4">
            <a
              href={cart.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full h-12 font-space font-bold text-sm tracking-widest">
                CHECKOUT
              </Button>
            </a>
            <Link href="/shop" onClick={() => setCartOpen(false)}>
              <Button variant="outline" className="w-full font-space">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
