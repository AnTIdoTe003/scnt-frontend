import { NextResponse } from "next/server";

const ADMIN_CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        phone
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();

    if (!email || !phone) {
      return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
    }

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN; // Using this as it was configured with admin token

    if (!domain || !token) {
      return NextResponse.json(
        { error: "Shopify client not configured" },
        { status: 500 }
      );
    }

    const storeDomain = domain.startsWith("http") ? domain : `https://${domain}`;
    const apiUrl = `${storeDomain}/admin/api/2026-01/graphql.json`;

    const variables = {
      input: {
        email,
        phone,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "SINGLE_OPT_IN",
        },
      },
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({ query: ADMIN_CUSTOMER_CREATE_MUTATION, variables }),
    });

    if (!res.ok) {
        console.error("Shopify HTTP error:", res.status, res.statusText);
        return NextResponse.json({ error: "Failed to communicate with Shopify" }, { status: 500 });
    }

    const json = await res.json();

    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      return NextResponse.json({ error: "Failed to communicate with Shopify" }, { status: 500 });
    }

    const { customerCreate } = json.data || {};

    if (customerCreate?.userErrors && customerCreate.userErrors.length > 0) {
      const errorMsg = customerCreate.userErrors.map((e: any) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    return NextResponse.json({ success: true, customer: customerCreate?.customer });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

