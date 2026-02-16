import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductPageClient } from "./product-page-client"
import { getProductAsync } from "@/lib/products"

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug
  const product = resolvedSlug ? await getProductAsync(resolvedSlug) : undefined
  if (!product) return { title: "Product Not Found | VYBZ" }
  return {
    title: `${product.name} - Premium ${product.category} Perfume | VYBZ`,
    description: `Shop ${product.name} - ${product.notes} fragrance. ${product.longevity} longevity. Free shipping above ₹999.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug
  const product = resolvedSlug ? await getProductAsync(resolvedSlug) : undefined

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bebas mb-4 gradient-text">PRODUCT NOT FOUND</h1>
            <Link href="/shop">
              <button className="px-6 py-3 glass-card hover:bg-primary/20 rounded-xl font-space font-bold transition-all duration-300">
                BACK TO SHOP
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            brand: { "@type": "Brand", name: "VYBZ" },
            offers: {
              "@type": "Offer",
              url: `https://vybz.in/product/${product.slug}`,
              priceCurrency: "INR",
              price: product.price.replace(/[₹,]/g, ""),
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "VYBZ" },
            },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "469" },
            category: product.category,
          }),
        }}
      />
      <ProductPageClient product={product} />
    </>
  )
}
