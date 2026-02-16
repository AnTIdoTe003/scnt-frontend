import { CategoryProductsPage } from "@/components/category-products-page"
import { getProductsByCategoryAsync } from "@/lib/products"

export default async function UnisexPage() {
  const products = await getProductsByCategoryAsync("Unisex")
  return (
    <CategoryProductsPage
      products={products}
      categoryName="BEYOND GENDER"
      categoryKey="unisex"
      subtitle="Pure individuality. Fragrances for everyone."
    />
  )
}
