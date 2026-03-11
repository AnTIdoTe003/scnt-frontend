import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const variantId = searchParams.get("variantId");

  if (!variantId) {
    return NextResponse.json({ error: "Variant ID is required" }, { status: 400 });
  }

  try {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN; // Actually Admin Token in this config

    if (!domain || !token) {
      return NextResponse.json({ error: "Shopify client not configured" }, { status: 500 });
    }

    const storeDomain = domain.startsWith("http") ? domain : `https://${domain}`;
    const apiUrl = `${storeDomain}/admin/api/2026-01/graphql.json`;

    // Query specifically for inventory details using Admin API
    const PRODUCT_VARIANT_QUERY = `
      query ProductVariantInventory($id: ID!) {
        productVariant(id: $id) {
          id
          inventoryQuantity
          inventoryPolicy
        }
      }
    `;

    const formattedId = variantId.includes("gid://shopify/ProductVariant/")
      ? variantId
      : `gid://shopify/ProductVariant/${variantId}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({
        query: PRODUCT_VARIANT_QUERY,
        variables: { id: formattedId },
      }),
    });

    if (!res.ok) {
       console.error("Shopify HTTP error:", res.status, res.statusText);
       return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }

    const json = await res.json();

    if (json.errors) {
       console.error("Shopify GraphQL errors:", json.errors);
       return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }

    const variant = json?.data?.productVariant;

    if (!variant) {
      return NextResponse.json({ error: "Variant not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      inventoryQuantity: variant.inventoryQuantity,
      inventoryPolicy: variant.inventoryPolicy
    });
  } catch (error) {
    console.error("Inventory API GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
