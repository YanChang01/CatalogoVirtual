import { client } from "@/lib/api/client.gen";
import type { ProductResponse, CategoryResponse } from "@/lib/api/types.gen";

export type Product = {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  img: string;
  material?: string;
  isNew?: boolean;
  onSale?: boolean;
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
    subcategory: undefined,
    price,
    originalPrice: apiProduct.image_url ? price * 1.3 : null,
    rating: 4.5,
    reviews: Math.floor(Math.random() * 500) + 50,
    badge: apiProduct.is_active ? "Nuevo" : apiProduct.image_url ? "Destacado" : null,
    img: apiProduct.image_url
      ? apiProduct.image_url.replace("https://images.unsplash.com/", "")
      : "photo-1760860992203-85ca32536788",
    material: "Silicona médica",
    isNew: apiProduct.is_active,
    onSale: !!apiProduct.image_url,
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

export function getMaterialsFromProducts(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.material).filter(Boolean))) as string[];
}

export function getProductsCountByCategory(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
}