import { client } from "@/lib/api/client.gen";
import type { ProductResponse } from "@/lib/api/types.gen";
import { fetchCategories, mapProductResponseToProduct } from "@/api/products";

export async function fetchProductByName(name: string) {
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
