import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createCategory,
  updateCategory,
} from "@/features/admin/api/categories";

interface CategoryFormProps {
  initialName?: string;
  categoryName?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CategoryForm({
  initialName,
  categoryName,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const isEdit = !!categoryName;

  const [name, setName] = useState(initialName ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (name.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (isEdit && categoryName) {
        await updateCategory(categoryName, { name: name.trim() });
        toast.add({ type: "success", title: "Categoría actualizada" });
      } else {
        await createCategory({ name: name.trim() });
        toast.add({ type: "success", title: "Categoría creada" });
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
          error={error ?? undefined}
          helperText="Entre 3 y 100 caracteres."
          required
        />
      </div>
      <div className="flex justify-end gap-2 border-t p-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear categoría"}
        </Button>
      </div>
    </form>
  );
}
