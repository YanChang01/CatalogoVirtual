import { client } from "@/lib/api/client.gen";
import type { ProductResponse, CategoryResponse } from "@/lib/api/types.gen";
import type { Product } from "@/types/product";

export function mapProductResponseToProduct(
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

export async function fetchCategories(): Promise<Map<number, string>> {
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
