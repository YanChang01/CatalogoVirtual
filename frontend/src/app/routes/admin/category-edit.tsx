import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { client } from "@/lib/api/client.gen";
import type { CategoryResponse } from "@/lib/api/types.gen";
import { CategoryForm } from "@/features/admin/components/CategoryForm";

export default function AdminCategoryEditPage() {
  const { categoryName } = useParams();
  const name = categoryName ? decodeURIComponent(categoryName) : "";
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await client.get({
          url: "/categories/read/{name}",
          path: { name },
        });
        if (response.error || !response.data) {
          setError("Categoría no encontrada");
        } else {
          setCategory(response.data as CategoryResponse);
        }
      } catch {
        setError("Error al cargar la categoría");
      } finally {
        setLoading(false);
      }
    }
    if (name) load();
  }, [name]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Cargando categoría...</p>;
  }

  if (error || !category) {
    return <p className="text-sm text-destructive">{error ?? "Categoría no encontrada"}</p>;
  }

  return <CategoryForm initialName={category.name} categoryName={category.name} />;
}
