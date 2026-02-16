import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_QUERY,
} from "@/lib/shopify/cart-queries"

const CART_COOKIE = "shopify_cart_id"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token) throw new Error("Shopify not configured")

  const url = `https://${domain.replace(/^https?:\/\//, "")}/api/2026-01/graphql.json`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Shopify API ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0]?.message ?? "Shopify error")
  return json.data as T
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const cartId = cookieStore.get(CART_COOKIE)?.value
    if (!cartId) {
      return NextResponse.json({ cart: null })
    }
    const data = await shopifyFetch<{ cart: CartType | null }>(CART_QUERY, { cartId })
    return NextResponse.json({ cart: data.cart })
  } catch (e) {
    return NextResponse.json({ cart: null })
  }
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: { title: string; handle: string; images?: { edges: Array<{ node: { url: string } }> } }
    price: { amount: string; currencyCode: string }
  }
}

export type CartType = {
  id: string
  checkoutUrl: string
  lines: { edges: Array<{ node: CartLine }> }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { variantId, quantity = 1 } = body as { variantId: string; quantity?: number }
    if (!variantId) {
      return NextResponse.json({ error: "variantId required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    let cartId = cookieStore.get(CART_COOKIE)?.value

    let cart: CartType | null = null

    if (cartId) {
      const data = await shopifyFetch<{ cartLinesAdd: { cart: CartType; userErrors: Array<{ message: string }> } }>(
        CART_LINES_ADD_MUTATION,
        {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        }
      )
      if (data.cartLinesAdd.userErrors?.length) {
        return NextResponse.json({ error: data.cartLinesAdd.userErrors[0].message }, { status: 400 })
      }
      cart = data.cartLinesAdd.cart
    } else {
      const data = await shopifyFetch<{ cartCreate: { cart: CartType | null; userErrors: Array<{ message: string }> } }>(
        CART_CREATE_MUTATION,
        {
          input: {
            lines: [{ merchandiseId: variantId, quantity }],
          },
        }
      )
      if (data.cartCreate.userErrors?.length) {
        return NextResponse.json({ error: data.cartCreate.userErrors[0].message }, { status: 400 })
      }
      cart = data.cartCreate.cart
      if (cart) {
        cartId = cart.id
      }
    }

    const res = NextResponse.json({ cart })
    if (cartId) {
      res.cookies.set(CART_COOKIE, cartId, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    }
    return res
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
