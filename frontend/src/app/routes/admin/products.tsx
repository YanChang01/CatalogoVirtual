import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProducts";
import { ProductTable } from "@/features/admin/components/ProductTable";
import { deleteProduct, restoreProduct } from "@/features/admin/api/products";
import { toast } from "@/components/ui/toast";

export default function AdminProductsPage() {
  const {
    products,
    loading,
    error,
    search,
    setSearch,
    showDeleted,
    setShowDeleted,
    reload,
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona el catálogo de productos.
          </p>
        </div>
        <Button render={<Link to={routes.admin.products.new} />}>
          <Plus /> Nuevo producto
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Input
          name="search"
          placeholder="Buscar productos..."
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
          Ver eliminados
        </label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {loading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Cargando productos...
        </p>
      ) : (
        <ProductTable
          products={products}
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
