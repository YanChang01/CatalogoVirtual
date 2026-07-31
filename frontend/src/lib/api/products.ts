import { client } from "@/lib/api/client.gen";
import type { ProductResponse, CategoryResponse } from "@/lib/api/types.gen";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

function mapProductResponseToProduct(
  apiProduct: ProductResponse,
  categoryMap: Map<number, string>
): Product {
  const price = typeof apiProduct.price === "string" ? parseFloat(apiProduct.price) : apiProduct.price;

  const categoryName = categoryMap.get(apiProduct.category_id) ?? "General";

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    category: categoryName,
    price,
    description: apiProduct.description,
    imageUrl: apiProduct.image_url ?? null,
    isActive: apiProduct.is_active ?? true,
    createdAt: apiProduct.created_at,
    updatedAt: apiProduct.updated_at,
  };
}

async function fetchCategories(): Promise<Map<number, string>> {
  const response = await client.get({
    url: "/categories/read",
  });
  if (response.error || !response.data) {
    return new Map();
  }
  const categoryMap = new Map<number, string>();
  for (const cat of response.data as CategoryResponse[]) {
    categoryMap.set(cat.id, cat.name);
  }
  return categoryMap;
}

export async function fetchProducts(): Promise<Product[]> {
  const [productsResponse, categoryMap] = await Promise.all([
    client.get({
      url: "/products/read",
    }),
    fetchCategories(),
  ]);

  if (productsResponse.error) {
    throw new Error("Failed to fetch products");
  }
  return (productsResponse.data as ProductResponse[] ?? []).map((p) =>
    mapProductResponseToProduct(p, categoryMap)
  );
}

export async function fetchProductByName(name: string): Promise<Product | null> {
  const categoryMap = await fetchCategories();
  const response = await client.get({
    url: "/products/read/{name}",
    path: { name },
  });
  if (response.error || !response.data) {
    return null;
  }
  return mapProductResponseToProduct(response.data as ProductResponse, categoryMap);
}

export async function fetchFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await fetchProducts();
  return products.slice(0, limit);
}

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

export interface CategoryWithCount {
  name: string;
  count: number;
}

export async function fetchCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const [products, categoryMap] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const counts = getProductsCountByCategory(products);
  const categories: CategoryWithCount[] = [];

  for (const [, name] of categoryMap.entries()) {
    const count = counts[name] ?? 0;
    if (count > 0) {
      categories.push({ name, count });
    }
  }

  return categories.sort((a, b) => b.count - a.count);
}