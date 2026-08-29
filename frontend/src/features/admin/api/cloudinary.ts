import { client } from "@/lib/api/client.gen";
import type { SignatureResponse } from "@/lib/api/types.gen";

export async function fetchCloudinarySignature(): Promise<SignatureResponse> {
  const response = await client.post({
    url: "/cloudinary/signature",
  });
  if (response.error || !response.data) {
    throw new Error("Error al obtener la firma de Cloudinary");
  }
  return response.data as SignatureResponse;
}

export async function uploadToCloudinary(
  file: File,
  signature: SignatureResponse,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.api_key);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("upload_preset", signature.upload_preset);
  formData.append("folder", signature.folder);

  const url = `https://api.cloudinary.com/v1_1/${signature.cloud_name}/image/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      (body as { error?: { message?: string } })?.error?.message ??
      `Error al subir la imagen (${response.status})`;
    throw new Error(message);
  }

  const data = (await response.json()) as { secure_url?: string; url?: string };
  const secureUrl = data.secure_url ?? data.url;
  if (!secureUrl) {
    throw new Error("Cloudinary no devolvió una URL de imagen");
  }
  return secureUrl;
}

export async function uploadImageFile(file: File): Promise<string> {
  const signature = await fetchCloudinarySignature();
  return uploadToCloudinary(file, signature);
}
