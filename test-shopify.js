const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = "2026-01";

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

async function test() {
  const storeDomain = domain.startsWith("http") ? domain : `https://${domain}`;
  const apiUrl = `${storeDomain}/api/${apiVersion}/graphql.json`;

  console.log("URL:", apiUrl);

  const variables = {
    input: {
      email: "test+waitlist123@example.com",
      phone: "+919999999999",
      password: "TestPassword123!",
      acceptsMarketing: true,
    },
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: CUSTOMER_CREATE_MUTATION, variables }),
    });

    const body = await res.json();
    console.log(JSON.stringify(body, null, 2));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
