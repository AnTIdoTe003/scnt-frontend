"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      title: string
      handle: string
      images?: { edges: Array<{ node: { url: string } }> }
    }
    price: { amount: string; currencyCode: string }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  lines: { edges: Array<{ node: CartLine }> }
} | null

type CartContextValue = {
  cart: Cart
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  updateLine: (lineId: string, quantity: number) => Promise<void>
  removeLine: (lineId: string) => Promise<void>
  refreshCart: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart")
      const data = await res.json()
      setCart(data.cart ?? null)
    } catch {
      setCart(null)
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId, quantity }),
          credentials: "include",
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? "Failed to add to cart")
        setCart(data.cart)
        setCartOpen(true)
      } catch (e) {
        setError((e as Error).message)
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId, quantity }),
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to update")
      await refreshCart()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [refreshCart])

  const removeLine = useCallback(async (lineId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineIds: [lineId] }),
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to remove")
      await refreshCart()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [refreshCart])

  const value: CartContextValue = {
    cart,
    cartOpen,
    setCartOpen,
    addToCart,
    updateLine,
    removeLine,
    refreshCart,
    isLoading,
    error,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
