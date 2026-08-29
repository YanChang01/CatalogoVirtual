import { useCallback, useState } from "react";
import { uploadImageFile } from "@/features/admin/api/cloudinary";

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<string> => {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImageFile(file);
      return url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al subir la imagen";
      setError(message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { upload, uploading, error, resetError };
}
