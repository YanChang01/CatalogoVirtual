import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useAdminCategories } from "@/features/admin/hooks/useAdminCategories";
import { CategoryTable } from "@/features/admin/components/CategoryTable";
import {
  deleteCategory,
  restoreCategory,
} from "@/features/admin/api/categories";
import { toast } from "@/components/ui/toast";

export default function AdminCategoriesPage() {
  const {
    categories,
    loading,
    error,
    search,
    setSearch,
    showDeleted,
    setShowDeleted,
    reload,
  } = useAdminCategories();
  const [busy, setBusy] = useState(false);

  async function handleDelete(name: string) {
    setBusy(true);
    try {
      await deleteCategory(name);
      toast.add({ type: "success", title: "Categoría eliminada" });
      await reload();
    } catch (err) {
      toast.add({
        type: "error",
        title: err instanceof Error ? err.message : "Error inesperado",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleRestore(name: string) {
    setBusy(true);
    try {
      await restoreCategory(name);
      toast.add({ type: "success", title: "Categoría restaurada" });
      await reload();
    } catch (err) {
      toast.add({
        type: "error",
        title: err instanceof Error ? err.message : "Error inesperado",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categorías</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona las categorías del catálogo.
          </p>
        </div>
        <Button render={<Link to={routes.admin.categories.new} />}>
          <Plus /> Nueva categoría
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Input
          name="search"
          placeholder="Buscar categorías..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          className="max-w-xs"
        />
        <label className="flex items-center gap-2 text-sm font-normal">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            className="size-4 accent-primary"
          />
          Ver eliminadas
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Cargando categorías...
        </p>
      ) : (
        <CategoryTable
          categories={categories}
          showDeleted={showDeleted}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
      )}
      {busy && (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Procesando...
        </p>
      )}
    </div>
  );
}
