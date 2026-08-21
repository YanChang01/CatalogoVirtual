import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/features/admin/api/products";
import { fetchAdminCategories } from "@/features/admin/api/categories";
import type { CategoryResponse } from "@/lib/api/types.gen";

interface ProductFormProps {
  initialData?: {
    name: string;
    price: string;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean;
    categoryId: number;
  };
  productName?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({
  initialData,
  productName,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const isEdit = !!productName;

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [name, setName] = useState(initialData?.name ?? "");
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [categoryId, setCategoryId] = useState<string>(
    initialData ? String(initialData.categoryId) : ""
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    fetchAdminCategories()
      .then((cats) => {
        if (active) setCategories(cats);
      })
      .catch(() => {
        if (active)
          toast.add({ type: "error", title: "Error al cargar las categorías" });
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "El nombre es obligatorio";
    if (!price || isNaN(Number(price)) || Number(price) < 0)
      nextErrors.price = "Precio inválido";
    if (!categoryId) nextErrors.categoryId = "Selecciona una categoría";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        price: Number(price),
        description: description.trim() || null,
        image_url: imageUrl.trim() || null,
        is_active: isActive,
        category_id: Number(categoryId),
      };
      if (isEdit && productName) {
        await updateProduct(productName, payload);
        toast.add({ type: "success", title: "Producto actualizado" });
      } else {
        await createProduct(payload);
        toast.add({ type: "success", title: "Producto creado" });
      }
      onSuccess();
    } catch (err) {
      toast.add({
        type: "error",
        title: err instanceof Error ? err.message : "Error inesperado",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col min-h-0">
      <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-4 flex-1">
        <Input
          name="name"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            name="price"
            label="Precio"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Categoría
            </label>
            <Select value={categoryId} onValueChange={(value) => setCategoryId(value ?? "")}>
              <SelectTrigger
                className={`w-full ${errors.categoryId ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-destructive">{errors.categoryId}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex w-full rounded-lg border border-input bg-card px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Input
          name="imageUrl"
          label="URL de imagen"
          type="url"
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          helperText="Opcional. Debe ser una URL válida."
        />
        {imageUrl.trim() && (
          <div className="flex items-center gap-3 rounded-lg border border-dashed p-3">
            <img
              src={imageUrl.trim()}
              alt={`Vista previa de ${name || "producto"}`}
              className="size-16 shrink-0 rounded-sm border object-cover"
              onError={(e) => {
                e.currentTarget.style.opacity = "0";
              }}
              onLoad={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              style={{ opacity: 0 }}
            />
            <p className="text-xs text-muted-foreground">
              Vista previa de la imagen.
            </p>
          </div>
        )}
        <label className="flex items-center justify-between gap-2 text-sm font-medium text-foreground">
          Producto activo
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked === true)}
            aria-label="Producto activo"
          />
        </label>
      </div>
      <div className="flex justify-end gap-2 border-t p-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
        </Button>
      </div>
    </form>
  );
}
