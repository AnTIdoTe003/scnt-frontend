import { CategoryProductsPage } from "@/components/category-products-page"
import { getProductsByCategoryAsync } from "@/lib/products"

export default async function MenPage() {
  const products = await getProductsByCategoryAsync("Men")
  return (
    <CategoryProductsPage
      products={products}
      categoryName="BOLD & POWERFUL"
      categoryKey="men"
      subtitle="Modern fragrances built for confidence and presence."
    />
  )
}
