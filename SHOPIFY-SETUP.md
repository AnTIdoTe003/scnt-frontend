# Shopify Headless Integration Setup

Your Next.js site is now wired to fetch products from your Shopify store when env vars are set. If Shopify fails or is not configured, it falls back to the static product data.

## 1. Storefront API Access Token

The token in `.env` must be a **Storefront API access token**, not an Admin API token.

To get a Storefront API token:

1. In **Shopify Admin** → **Settings** → **Apps and sales channels** → **Develop apps**
2. Click **Create an app** (or use an existing custom app)
3. Click **Configure Storefront API scopes**
4. Enable scopes such as: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`
5. Click **Save** → **Install app** → **Reveal token once**
6. Copy the **Storefront API access token** and set it in `.env`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=tmws4n-uv.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_api_token_here
```

> Note: `shpss_` tokens are typically Admin/session tokens. Storefront API tokens are different and created as above.

## 2. Product Data Mapping

- **Name, handle, description, images, price** → from Shopify
- **Category (Men/Women/Unisex)** → from `productType` or metafield `custom.category`
- **Fragrance notes, longevity, intensity** → optional metafields (see below)

### Optional: Perfume Metafields

To show top/heart/base notes, longevity, and intensity, add product metafields in Shopify Admin:

| Namespace | Key         | Type               | Example                    |
|-----------|-------------|--------------------|----------------------------|
| custom    | top_notes   | List (text)        | `["Bergamot", "Ginger"]`   |
| custom    | heart_notes | List (text)        | `["Leather", "Incense"]`   |
| custom    | base_notes  | List (text)        | `["Sandalwood", "Musk"]`   |
| custom    | longevity   | Single line text   | `8–10 hours`               |
| custom    | intensity   | Single line text   | `High`                     |
| custom    | category    | Single line text   | `Men` or `Women` or `Unisex` |

Set **Storefront access** to `Public` on each metafield definition so the Storefront API can read them.

## 3. Collections (Optional)

If you use collections for Men/Women/Unisex, you can fetch by collection handle in `lib/shopify/products.ts`:

```ts
fetchShopifyProducts({ collectionHandle: "men", first: 50 })
```

## 4. Cart & Checkout (Next Step)

The current setup shows products from Shopify. For **Add to Cart** and checkout, you’ll need to use Shopify’s cart mutations and redirect to Shopify Checkout. That can be added as a follow-up integration.
