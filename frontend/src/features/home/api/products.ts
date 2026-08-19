import { fetchProducts } from "@/api/products";

export async function fetchFeaturedProducts(limit = 4) {
  const products = await fetchProducts();
  return products.slice(0, limit);
}
