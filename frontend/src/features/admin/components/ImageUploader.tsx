import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCloudinaryUpload } from "@/features/admin/hooks/useCloudinaryUpload";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  productName?: string;
  disabled?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  productName,
  disabled,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, error } = useCloudinaryUpload();
  const [localError, setLocalError] = useState<string | null>(null);

  const displayError = localError ?? error;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalError(null);

    try {
      const url = await upload(file);
      onChange(url);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    setLocalError(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const isDisabled = disabled || uploading;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">Imagen</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isDisabled}
      />

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-dashed p-3">
          <img
            src={value}
            alt={`Imagen de ${productName || "producto"}`}
            className="size-16 shrink-0 rounded-sm border object-cover"
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
            onLoad={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            style={{ opacity: 0 }}
          />
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-xs text-muted-foreground line-clamp-1 break-all">{value}</p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                disabled={isDisabled}
              >
                <Upload className="size-3.5" />
                {uploading ? "Subiendo..." : "Cambiar"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isDisabled}
                aria-label="Quitar imagen"
              >
                <X className="size-3.5" />
                Quitar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isDisabled}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/20 px-4 py-8 text-sm transition-colors hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload className="size-5 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {uploading ? "Subiendo imagen..." : "Selecciona una imagen"}
          </span>
          <span className="text-xs text-muted-foreground">
            Haz clic para elegir un archivo de tu dispositivo
          </span>
        </button>
      )}

      {displayError && <p className="text-sm text-destructive">{displayError}</p>}
    </div>
  );
}
