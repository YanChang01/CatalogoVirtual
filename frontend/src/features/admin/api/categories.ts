import { client } from "@/lib/api/client.gen";
import type {
  CategoryCreate,
  CategoryResponse,
  CategoryUpdate,
} from "@/lib/api/types.gen";

export async function fetchAdminCategories(): Promise<CategoryResponse[]> {
  const response = await client.get({ url: "/categories/read" });
  if (response.error) {
    throw new Error("Error al cargar las categorías");
  }
  return (response.data as CategoryResponse[]) ?? [];
}

export async function fetchAdminDeletedCategories(): Promise<CategoryResponse[]> {
  const response = await client.get({ url: "/categories/read-deleted" });
  if (response.error) {
    throw new Error("Error al cargar las categorías eliminadas");
  }
  return (response.data as CategoryResponse[]) ?? [];
}

export async function createCategory(
  data: CategoryCreate
): Promise<CategoryResponse> {
  const response = await client.post({
    url: "/categories/create",
    body: data,
  });
  if (response.error || !response.data) {
    throw new Error("Error al crear la categoría");
  }
  return response.data as CategoryResponse;
}

export async function updateCategory(
  name: string,
  data: CategoryUpdate
): Promise<CategoryResponse> {
  const response = await client.put({
    url: "/categories/update/{name}",
    path: { name },
    body: data,
  });
  if (response.error || !response.data) {
    throw new Error("Error al actualizar la categoría");
  }
  return response.data as CategoryResponse;
}

export async function deleteCategory(name: string): Promise<void> {
  const response = await client.delete({
    url: "/categories/delete/{name}",
    path: { name },
  });
  if (response.error) {
    throw new Error("Error al eliminar la categoría");
  }
}

export async function restoreCategory(name: string): Promise<CategoryResponse> {
  const response = await client.patch({
    url: "/categories/restaurar/{name}",
    path: { name },
  });
  if (response.error || !response.data) {
    throw new Error("Error al restaurar la categoría");
  }
  return response.data as CategoryResponse;
}
