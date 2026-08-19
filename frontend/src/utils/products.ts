import type { Product } from "@/types/product";

export function getCategoriesFromProducts(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export function getProductsCountByCategory(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
}
