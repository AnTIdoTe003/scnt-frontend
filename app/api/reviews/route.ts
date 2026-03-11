import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId"); // Now interpreted as a slug handle

  if (!productId) {
    return NextResponse.json({ error: "Product handle is required" }, { status: 400 });
  }

  try {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!domain || !token) {
      return NextResponse.json({ error: "Shopify client not configured" }, { status: 500 });
    }

    const storeDomain = domain.startsWith("http") ? domain : `https://${domain}`;
    const apiUrl = `${storeDomain}/admin/api/2026-01/graphql.json`;

    // Query product by handle to get its ID and Metafield
    const PRODUCT_REVIEWS_QUERY = `
      query ProductReviewsByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          metafield(namespace: "custom", key: "reviews") {
            value
            id
          }
        }
      }
    `;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({
        query: PRODUCT_REVIEWS_QUERY,
        variables: { handle: productId },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }

    const json = await res.json();
    const productData = json?.data?.productByHandle;
    const metafield = productData?.metafield;

    let reviews = [];
    if (metafield?.value) {
      try {
        reviews = JSON.parse(metafield.value);
      } catch (e) {
        console.error("Failed to parse reviews metafield JSON:", e);
      }
    }

    return NextResponse.json({ success: true, reviews, metafieldId: metafield?.id, targetProductId: productData?.id });
  } catch (error) {
    console.error("Reviews API GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, author, rating, title, content } = body;

    if (!productId || !author || !rating || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!domain || !token) {
      return NextResponse.json({ error: "Shopify client not configured" }, { status: 500 });
    }

    const storeDomain = domain.startsWith("http") ? domain : `https://${domain}`;
    const apiUrl = `${storeDomain}/admin/api/2026-01/graphql.json`;

    // 1. Fetch existing reviews to append the new one + grab the global product ID required for mutation
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const targetHostUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${protocol}://${host}`

    let existingReviews = [];
    let targetProductId = "";

    try {
      const getRes = await fetch(`${targetHostUrl}/api/reviews?productId=${encodeURIComponent(productId)}`);
      if (getRes.ok) {
         const getData = await getRes.json();
         existingReviews = getData.reviews || [];
         targetProductId = getData.targetProductId;
      }
    } catch(e) {
      console.error("Warning: internal fetch to /api/reviews failed:", e)
      // Fallback: we could just query Shopify directly here for the ID.
      // But let's do it manually since it's safer.
      const FETCH_ID_QUERY = `
        query ProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            id
            metafield(namespace: "custom", key: "reviews") {
              value
            }
          }
        }
      `;
      const fallbackRes = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
        body: JSON.stringify({ query: FETCH_ID_QUERY, variables: { handle: productId } }),
      });
      const fallbackJson = await fallbackRes.json();
      targetProductId = fallbackJson?.data?.productByHandle?.id;
      const mVal = fallbackJson?.data?.productByHandle?.metafield?.value;
      if (mVal) {
        try { existingReviews = JSON.parse(mVal); } catch(x){}
      }
    }

    if (!targetProductId) {
       return NextResponse.json({ error: "Failed to locate Shopify Product ID for handle " + productId }, { status: 404 });
    }

    // 2. Add the new review
    const newReview = {
      id: Date.now().toString(),
      author,
      rating: Number(rating),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      title: title || "",
      content,
      verified: true, // Assuming true for this demo since we don't have login
      helpful: 0,
    };

    const updatedReviews = [newReview, ...existingReviews]; // Add to top

    // 3. Mutate the Product Metafield in Shopify
    const UPDATE_METAFIELD_MUTATION = `
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            key
            namespace
            value
            createdAt
            updatedAt
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `;

    const variables = {
      metafields: [
        {
          ownerId: targetProductId,
          namespace: "custom",
          key: "reviews",
          type: "json",
          value: JSON.stringify(updatedReviews),
        },
      ],
    };

    const mutationRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({
        query: UPDATE_METAFIELD_MUTATION,
        variables,
      }),
    });

    if (!mutationRes.ok) {
       console.error("Shopify Metafield Mutation HTTP error:", mutationRes.status);
       return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    const mutationJson = await mutationRes.json();

    if (mutationJson.errors) {
       console.error("Shopify GraphQL errors:", mutationJson.errors);
       return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }

    const { metafieldsSet } = mutationJson.data || {};

    if (metafieldsSet?.userErrors && metafieldsSet.userErrors.length > 0) {
      const errorMsg = metafieldsSet.userErrors.map((e: any) => e.message).join(", ");
      console.error("Shopify user errors:", errorMsg);
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error("Reviews API POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
