import { useState } from "react";
import { Link } from "react-router";
import { Package, PackageSearch, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/config/routes";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProducts";
import { ProductTable } from "@/features/admin/components/ProductTable";
import { AdminPagination } from "@/features/admin/components/AdminPagination";
import {
  AdminPageHeader,
  AdminResultCount,
} from "@/features/admin/components/AdminPageHeader";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { AdminTableSkeleton } from "@/features/admin/components/AdminTableSkeleton";
import { deleteProduct, restoreProduct } from "@/features/admin/api/products";
import { toast } from "@/components/ui/toast";

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

  async function handleDelete(name: string) {
    setBusy(true);
    try {
      await deleteProduct(name);
      toast.add({ type: "success", title: "Producto eliminado" });
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
          <Button render={<Link to={routes.admin.products.new} />}>
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
              <Button render={<Link to={routes.admin.products.new} />} size="sm">
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
