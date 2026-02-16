// Quick script to verify Shopify products - run: node scripts/check-shopify.js
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
});
const domain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !token) {
  console.log('Missing .env vars. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  process.exit(1);
}

const url = `https://${domain.replace(/^https?:\/\//, '')}/api/2026-01/graphql.json`;
const query = `query { products(first: 10) { edges { node { title handle } } } }`;

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': token,
  },
  body: JSON.stringify({ query, variables: {} }),
})
  .then(res => res.json())
  .then(json => {
    const edges = json.data?.products?.edges ?? [];
    const count = edges.length;
    console.log('Shopify products found:', count);
    edges.forEach(e => {
      console.log('  -', e.node.title, '(' + e.node.handle + ')');
    });
    if (json.errors) console.error('Errors:', json.errors);
    if (count === 0 && !json.errors) console.log('No products returned.');
  })
  .catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
  });
