import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Shapes, ShapesIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/config/routes";
import { useAdminCategories } from "@/features/admin/hooks/useAdminCategories";
import { CategoryTable } from "@/features/admin/components/CategoryTable";
import { AdminPagination } from "@/features/admin/components/AdminPagination";
import {
  AdminPageHeader,
  AdminResultCount,
} from "@/features/admin/components/AdminPageHeader";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { AdminTableSkeleton } from "@/features/admin/components/AdminTableSkeleton";
import {
  deleteCategory,
  restoreCategory,
} from "@/features/admin/api/categories";
import { toast } from "@/components/ui/toast";

export default function AdminCategoriesPage() {
  const {
    categories,
    filteredCount,
    totalCount,
    loading,
    error,
    search,
    setSearch,
    showDeleted,
    setShowDeleted,
    reload,
    currentPage,
    setCurrentPage,
    totalPages,
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
      <AdminPageHeader
        title="Categorías"
        description="Gestiona las categorías del catálogo."
        actions={
          <Button render={<Link to={routes.admin.categories.new} />}>
            <Plus /> Nueva categoría
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Input
          name="search"
          placeholder="Buscar categorías..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          className="max-w-xs"
        />
        <label className="flex items-center gap-2 text-sm font-normal">
          <Switch
            checked={showDeleted}
            onCheckedChange={(checked) => setShowDeleted(checked === true)}
            aria-label="Ver categorías eliminadas"
          />
          Ver eliminadas
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <AdminTableSkeleton columns={4} />
      ) : categories.length === 0 ? (
        search || totalCount > 0 ? (
          <EmptyState
            icon={Shapes}
            title="Sin resultados"
            description={`Ninguna categoría coincide con «${search}».`}
          />
        ) : (
          <EmptyState
            icon={ShapesIcon}
            title="Aún no hay categorías"
            description="Crea la primera categoría para organizar el catálogo."
            action={
              <Button render={<Link to={routes.admin.categories.new} />} size="sm">
                <Plus /> Crear categoría
              </Button>
            }
          />
        )
      ) : (
        <>
          <AdminResultCount
            count={filteredCount}
            singular="categoría"
            plural="categorías"
            searching={!!search}
            query={search}
          />
          <CategoryTable
            categories={categories}
            showDeleted={showDeleted}
            busy={busy}
            onDelete={handleDelete}
            onRestore={handleRestore}
          />
          <AdminPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
