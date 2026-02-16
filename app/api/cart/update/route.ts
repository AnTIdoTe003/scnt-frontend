import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { CART_LINES_UPDATE_MUTATION } from "@/lib/shopify/cart-queries"

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { lineId, quantity } = body as { lineId: string; quantity: number }
    if (!lineId || quantity == null) {
      return NextResponse.json({ error: "lineId and quantity required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const cartId = cookieStore.get("shopify_cart_id")?.value
    if (!cartId) return NextResponse.json({ error: "No cart" }, { status: 400 })

    const data = await shopifyFetch<{ cartLinesUpdate: { cart: { checkoutUrl: string }; userErrors: Array<{ message: string }> } }>(
      CART_LINES_UPDATE_MUTATION,
      { cartId, lines: [{ id: lineId, quantity }] }
    )
    if (data.cartLinesUpdate.userErrors?.length) {
      return NextResponse.json({ error: data.cartLinesUpdate.userErrors[0].message }, { status: 400 })
    }
    return NextResponse.json({ cart: data.cartLinesUpdate.cart })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
