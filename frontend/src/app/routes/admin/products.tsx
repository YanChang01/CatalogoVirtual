import { useState } from "react";
import { Package, PackageSearch, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProducts";
import { ProductTable } from "@/features/admin/components/ProductTable";
import { ProductSheet, type ProductSheetMode } from "@/features/admin/components/ProductSheet";
import { AdminPagination } from "@/features/admin/components/AdminPagination";
import {
  AdminPageHeader,
  AdminResultCount,
} from "@/features/admin/components/AdminPageHeader";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { AdminTableSkeleton } from "@/features/admin/components/AdminTableSkeleton";
import { deleteProduct, restoreProduct } from "@/features/admin/api/products";
import type { ProductResponse } from "@/lib/api/types.gen";
import { toast } from "@/components/ui/toast";

interface ProductSheetState {
  mode: ProductSheetMode;
  product: ProductResponse | null;
}

export default function AdminProductsPage() {
  const {
    products,
    filteredCount,
    totalCount,
    loading,
    error,
    search,
    setSearch,
    showDeleted,
    setShowDeleted,
    reload,
    categoryNames,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useAdminProducts();
  const [busy, setBusy] = useState(false);
  const [sheet, setSheet] = useState<ProductSheetState | null>(null);

  async function handleDelete(name: string) {
    setBusy(true);
    try {
      await deleteProduct(name);
      toast.add({ type: "success", title: "Producto eliminado" });
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
      await restoreProduct(name);
      toast.add({ type: "success", title: "Producto restaurado" });
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
        title="Productos"
        description="Gestiona el catálogo de productos."
        actions={
          <Button onClick={() => setSheet({ mode: "create", product: null })}>
            <Plus /> Nuevo producto
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Input
          name="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          className="max-w-xs"
        />
        <label className="flex items-center gap-2 text-sm font-normal">
          <Switch
            checked={showDeleted}
            onCheckedChange={(checked) => setShowDeleted(checked === true)}
            aria-label="Ver productos eliminados"
          />
          Ver eliminados
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <AdminTableSkeleton columns={6} />
      ) : products.length === 0 ? (
        search || totalCount > 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="Sin resultados"
            description={`Ningún producto coincide con «${search}».`}
          />
        ) : (
          <EmptyState
            icon={Package}
            title="Aún no hay productos"
            description="Crea tu primer producto para que aparezca en la tienda."
            action={
              <Button
                size="sm"
                onClick={() => setSheet({ mode: "create", product: null })}
              >
                <Plus /> Crear producto
              </Button>
            }
          />
        )
      ) : (
        <>
          <AdminResultCount
            count={filteredCount}
            singular="producto"
            plural="productos"
            searching={!!search}
            query={search}
          />
          <ProductTable
            products={products}
            showDeleted={showDeleted}
            busy={busy}
            categoryNames={categoryNames}
            onView={(product) => setSheet({ mode: "view", product })}
            onEdit={(product) => setSheet({ mode: "edit", product })}
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

      <ProductSheet
        open={sheet !== null}
        onOpenChange={(open) => {
          if (!open) setSheet(null);
        }}
        mode={sheet?.mode ?? "view"}
        onModeChange={(mode) =>
          setSheet((prev) => (prev ? { ...prev, mode } : prev))
        }
        product={sheet?.product ?? null}
        categoryNames={categoryNames}
        onSuccess={() => {
          setSheet(null);
          reload();
        }}
      />
    </div>
  );
}
