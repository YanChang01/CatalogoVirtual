import { client } from "@/lib/api/client.gen";
import type {
  UserCreate,
  UserResponse,
  UserUpdate,
} from "@/lib/api/types.gen";

export async function fetchAdminUsers(): Promise<UserResponse[]> {
  const response = await client.get({ url: "/users/read" });
  if (response.error) {
    throw new Error("Error al cargar los usuarios");
  }
  return (response.data as UserResponse[]) ?? [];
}

export async function fetchAdminDeletedUsers(): Promise<UserResponse[]> {
  const response = await client.get({ url: "/users/read-deleted" });
  if (response.error) {
    throw new Error("Error al cargar los usuarios eliminados");
  }
  return (response.data as UserResponse[]) ?? [];
}

export async function createUser(data: UserCreate): Promise<UserResponse> {
  const response = await client.post({
    url: "/users/create",
    body: data,
  });
  if (response.error || !response.data) {
    throw new Error("Error al crear el usuario");
  }
  return response.data as UserResponse;
}

export async function updateUser(
  email: string,
  data: UserUpdate
): Promise<UserResponse> {
  const response = await client.put({
    url: "/users/update/{email}",
    path: { email },
    body: data,
  });
  if (response.error || !response.data) {
    throw new Error("Error al actualizar el usuario");
  }
  return response.data as UserResponse;
}

export async function deleteUser(email: string): Promise<void> {
  const response = await client.delete({
    url: "/users/delete/{email}",
    path: { email },
  });
  if (response.error) {
    throw new Error("Error al eliminar el usuario");
  }
}

export async function restoreUser(email: string): Promise<UserResponse> {
  const response = await client.patch({
    url: "/users/restaurar/{email}",
    path: { email },
  });
  if (response.error || !response.data) {
    throw new Error("Error al restaurar el usuario");
  }
  return response.data as UserResponse;
}
