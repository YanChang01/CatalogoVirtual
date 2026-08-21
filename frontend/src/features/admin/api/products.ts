import { client } from "@/lib/api/client.gen";
import type {
  ProductCreate,
  ProductResponse,
  ProductUpdate,
} from "@/lib/api/types.gen";

export async function fetchAdminProducts(): Promise<ProductResponse[]> {
  const response = await client.get({ url: "/products/read" });
  if (response.error) {
    throw new Error("Error al cargar los productos");
  }
  return (response.data as ProductResponse[]) ?? [];
}

export async function fetchAdminDeletedProducts(): Promise<ProductResponse[]> {
  const response = await client.get({ url: "/products/read-deleted" });
  if (response.error) {
    throw new Error("Error al cargar los productos eliminados");
  }
  return (response.data as ProductResponse[]) ?? [];
}

export async function createProduct(data: ProductCreate): Promise<ProductResponse> {
  const response = await client.post({
    url: "/products/create",
    body: data,
  });
  if (response.error || !response.data) {
    throw new Error("Error al crear el producto");
  }
  return response.data as ProductResponse;
}

export async function updateProduct(
  name: string,
  data: ProductUpdate
): Promise<ProductResponse> {
  const response = await client.put({
    url: "/products/update/{name}",
    path: { name },
    body: data,
  });
  if (response.error || !response.data) {
    throw new Error("Error al actualizar el producto");
  }
  return response.data as ProductResponse;
}

export async function deleteProduct(name: string): Promise<void> {
  const response = await client.delete({
    url: "/products/delete/{name}",
    path: { name },
  });
  if (response.error) {
    throw new Error("Error al eliminar el producto");
  }
}

export async function restoreProduct(name: string): Promise<ProductResponse> {
  const response = await client.patch({
    url: "/products/restaurar/{name}",
    path: { name },
  });
  if (response.error || !response.data) {
    throw new Error("Error al restaurar el producto");
  }
  return response.data as ProductResponse;
}
