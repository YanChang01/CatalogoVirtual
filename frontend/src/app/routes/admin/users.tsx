import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useAdminUsers } from "@/features/admin/hooks/useAdminUsers";
import { UserTable } from "@/features/admin/components/UserTable";
import { deleteUser, restoreUser } from "@/features/admin/api/users";
import { toast } from "@/components/ui/toast";

export default function AdminUsersPage() {
  const {
    users,
    loading,
    error,
    search,
    setSearch,
    showDeleted,
    setShowDeleted,
    reload,
  } = useAdminUsers();
  const [busy, setBusy] = useState(false);

  async function handleDelete(email: string) {
    setBusy(true);
    try {
      await deleteUser(email);
      toast.add({ type: "success", title: "Usuario eliminado" });
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

  async function handleRestore(email: string) {
    setBusy(true);
    try {
      await restoreUser(email);
      toast.add({ type: "success", title: "Usuario restaurado" });
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
          <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los usuarios del sistema.
          </p>
        </div>
        <Button render={<Link to={routes.admin.users.new} />}>
          <Plus /> Nuevo usuario
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Input
          name="search"
          placeholder="Buscar usuarios..."
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

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Cargando usuarios...
        </p>
      ) : (
        <UserTable
          users={users}
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
