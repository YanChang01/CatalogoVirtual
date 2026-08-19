import { fetchProducts, fetchCategories } from "@/api/products";
import type { CategoryWithCount } from "@/types/product";

export async function fetchCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const [products, categoryMap] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  const categories: CategoryWithCount[] = [];

  for (const [, name] of categoryMap.entries()) {
    const count = counts[name] ?? 0;
    if (count > 0) {
      categories.push({ name, count });
    }
  }

  return categories.sort((a, b) => b.count - a.count);
}
