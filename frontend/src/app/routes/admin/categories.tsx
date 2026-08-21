import { useState } from "react";
import { Plus, Search, Shapes, ShapesIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAdminCategories } from "@/features/admin/hooks/useAdminCategories";
import { CategoryTable } from "@/features/admin/components/CategoryTable";
import {
  CategorySheet,
  type CategorySheetMode,
} from "@/features/admin/components/CategorySheet";
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
import type { CategoryResponse } from "@/lib/api/types.gen";
import { toast } from "@/components/ui/toast";

interface CategorySheetState {
  mode: CategorySheetMode;
  category: CategoryResponse | null;
}

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
  const [sheet, setSheet] = useState<CategorySheetState | null>(null);

  async function handleDelete(name: string) {
    setBusy(true);
    try {
      await deleteCategory(name);
      toast.add({ type: "success", title: "Categoría eliminada" });
      await reload();
      setSheet(null);
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
          <Button onClick={() => setSheet({ mode: "create", category: null })}>
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
              <Button
                size="sm"
                onClick={() => setSheet({ mode: "create", category: null })}
              >
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
            onEdit={(category) => setSheet({ mode: "edit", category })}
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

      <CategorySheet
        open={sheet !== null}
        onOpenChange={(open) => {
          if (!open) setSheet(null);
        }}
        mode={sheet?.mode ?? "create"}
        category={sheet?.category ?? null}
        onSuccess={() => {
          setSheet(null);
          reload();
        }}
      />
    </div>
  );
}
