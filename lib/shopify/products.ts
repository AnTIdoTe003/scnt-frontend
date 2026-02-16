import { shopifyRequest } from "./client"
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, COLLECTION_PRODUCTS_QUERY } from "./queries"
import type { Product, ProductCategory } from "@/lib/products"

type ShopifyProductNode = {
  id: string
  title: string
  handle: string
  description?: string
  productType?: string
  vendor?: string
  tags?: string[]
  images?: {
    edges: Array<{
      node: { url: string; altText?: string }
    }>
  }
  variants?: {
    edges: Array<{
      node: {
        id: string
        availableForSale?: boolean
        price?: { amount: string; currencyCode: string }
      }
    }>
  }
  metafields?: Array<{ key: string; value: string }>
}

function parseMetafield(metafields: Array<{ key: string; value: string }> | undefined, key: string): string | string[] | undefined {
  const m = metafields?.find((x) => x.key === key)
  if (!m?.value) return undefined
  try {
    const parsed = JSON.parse(m.value)
    return Array.isArray(parsed) ? parsed : m.value
  } catch {
    return m.value
  }
}

function mapShopifyToProduct(node: ShopifyProductNode, allProducts?: ShopifyProductNode[]): Product {
  const metafields = node.metafields ?? []
  const topNotes = (parseMetafield(metafields, "top_notes") as string[]) ?? []
  const heartNotes = (parseMetafield(metafields, "heart_notes") as string[]) ?? []
  const baseNotes = (parseMetafield(metafields, "base_notes") as string[]) ?? []
  const longevity = (parseMetafield(metafields, "longevity") as string) ?? "6–8 hours"
  const intensityRaw = (parseMetafield(metafields, "intensity") as string) ?? "Medium"
  const intensity = ["Low", "Medium", "High"].includes(intensityRaw) ? (intensityRaw as "Low" | "Medium" | "High") : "Medium"
  const categoryRaw = (parseMetafield(metafields, "category") as string) ?? node.productType ?? "Unisex"
  const category: ProductCategory =
    categoryRaw === "Men" || categoryRaw === "Women" || categoryRaw === "Unisex"
      ? categoryRaw
      : "Unisex"

  const priceAmount = node.variants?.edges?.[0]?.node?.price?.amount ?? "0"
  const currencyCode = node.variants?.edges?.[0]?.node?.price?.currencyCode ?? "INR"
  const price =
    currencyCode === "INR"
      ? `₹${Math.round(parseFloat(priceAmount))}`
      : `${currencyCode} ${parseFloat(priceAmount).toFixed(2)}`

  const images =
    node.images?.edges?.map((e) => e.node.url).filter(Boolean) ?? []

  const firstVariant = node.variants?.edges?.[0]?.node
  const variantId = firstVariant?.id
  const availableForSale = firstVariant?.availableForSale ?? true

  const recommendations =
    allProducts
      ?.filter((p) => p.handle !== node.handle)
      .slice(0, 3)
      .map((p) => ({
        name: p.title,
        slug: p.handle,
        price:
          p.variants?.edges?.[0]?.node?.price?.amount != null
            ? `₹${Math.round(parseFloat(p.variants.edges[0].node.price!.amount))}`
            : "₹0",
        variantId: p.variants?.edges?.[0]?.node?.id,
        availableForSale: p.variants?.edges?.[0]?.node?.availableForSale ?? true,
      })) ?? []

  const notesFromTags =
    node.tags?.filter((t) => /^[A-Z][a-z]+/.test(t)).slice(0, 3).join(", ") ?? "Premium Fragrance"

  return {
    name: node.title,
    slug: node.handle,
    variantId,
    availableForSale,
    price,
    notes: notesFromTags,
    intensity,
    category,
    description: node.description ?? "",
    topNotes: Array.isArray(topNotes) ? topNotes : topNotes ? [topNotes] : [],
    heartNotes: Array.isArray(heartNotes) ? heartNotes : heartNotes ? [heartNotes] : [],
    baseNotes: Array.isArray(baseNotes) ? baseNotes : baseNotes ? [baseNotes] : [],
    longevity,
    recommendations,
    images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"],
  }
}

export async function fetchShopifyProducts(opts?: {
  first?: number
  query?: string
  collectionHandle?: string
}): Promise<Product[]> {
  if (!shopifyRequest) return []

  try {
    let nodes: ShopifyProductNode[] = []

    if (opts?.collectionHandle) {
      const { data, errors } = await shopifyRequest(COLLECTION_PRODUCTS_QUERY, {
        handle: opts.collectionHandle,
        first: opts.first ?? 50,
      })
      if (errors) {
        console.error("Shopify collection error:", errors)
        return []
      }
      const collection = (data as { collection?: { products?: { edges: Array<{ node: ShopifyProductNode }> } } })?.collection
      nodes = collection?.products?.edges?.map((e) => e.node) ?? []
    } else {
      const variables: Record<string, unknown> = { first: opts?.first ?? 50 }
      if (opts?.query) variables.query = opts.query
      const { data, errors } = await shopifyRequest(PRODUCTS_QUERY, variables)
      if (errors) {
        console.error("Shopify products error:", errors)
        return []
      }
      const products = (data as { products?: { edges: Array<{ node: ShopifyProductNode }> } })?.products
      nodes = products?.edges?.map((e) => e.node) ?? []
    }

    return nodes.map((node) => mapShopifyToProduct(node, nodes))
  } catch (e) {
    console.error("Shopify fetch error:", e)
    return []
  }
}

export async function fetchShopifyProductByHandle(handle: string): Promise<Product | undefined> {
  if (!shopifyRequest) return undefined

  try {
    const { data, errors } = await shopifyRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
    if (errors) {
        console.error("Shopify product error:", errors)
      return undefined
    }
    const product = (data as { product?: ShopifyProductNode })?.product
    if (!product) return undefined
    return mapShopifyToProduct(product)
  } catch (e) {
    console.error("Shopify fetch product error:", e)
    return undefined
  }
}
