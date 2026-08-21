import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/config/routes";
import {
  createCategory,
  updateCategory,
} from "@/features/admin/api/categories";

interface CategoryFormProps {
  initialName?: string;
  categoryName?: string;
}

export function CategoryForm({ initialName, categoryName }: CategoryFormProps) {
  const navigate = useNavigate();
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
      navigate(routes.admin.categories.path);
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
    <form onSubmit={handleSubmit} className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEdit ? "Editar categoría" : "Nueva categoría"}
          </CardTitle>
          <CardDescription>
            {isEdit
              ? "Cambia el nombre de la categoría."
              : "Agrupa los productos bajo un nombre común."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            name="name"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error ?? undefined}
            helperText="Entre 3 y 100 caracteres."
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(routes.admin.categories.path)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear categoría"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
