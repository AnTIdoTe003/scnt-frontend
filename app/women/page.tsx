import { CategoryProductsPage } from "@/components/category-products-page"
import { getProductsByCategoryAsync } from "@/lib/products"

export default async function WomenPage() {
  const products = await getProductsByCategoryAsync("Women")
  return (
    <CategoryProductsPage
      products={products}
      categoryName="ELEGANT & ALLURING"
      categoryKey="women"
      subtitle="Timeless scents crafted for elegance and charm."
    />
  )
}
