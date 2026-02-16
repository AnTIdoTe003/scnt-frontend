const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = "2026-01"

if (!domain || !token) {
  console.warn(
    "Shopify env vars missing. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN."
  )
}

const storeDomain = domain
  ? domain.startsWith("http")
    ? domain
    : `https://${domain}`
  : ""

const apiUrl = storeDomain ? `${storeDomain}/api/${apiVersion}/graphql.json` : ""

export type ShopifyRequest = <TData = unknown>(
  query: string,
  variables?: Record<string, unknown>
) => Promise<{ data?: TData; errors?: { message?: string } }>

export const shopifyRequest: ShopifyRequest | null =
  domain && token
    ? async (query, variables = {}) => {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": token,
          },
          body: JSON.stringify({ query, variables }),
        })
        if (!res.ok) {
          const err = new Error(`Shopify API: ${res.status} ${res.statusText}`)
          ;(err as Error & { response?: Response }).response = res
          throw err
        }
        const json = await res.json()
        return { data: json.data, errors: json.errors }
      }
    : null
