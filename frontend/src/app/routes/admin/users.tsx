import { useState } from "react";
import { Plus, Search, Users, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAdminUsers } from "@/features/admin/hooks/useAdminUsers";
import { UserTable } from "@/features/admin/components/UserTable";
import {
  UserSheet,
  type UserSheetMode,
} from "@/features/admin/components/UserSheet";
import { AdminPagination } from "@/features/admin/components/AdminPagination";
import {
  AdminPageHeader,
  AdminResultCount,
} from "@/features/admin/components/AdminPageHeader";
import { EmptyState } from "@/features/admin/components/EmptyState";
import { AdminTableSkeleton } from "@/features/admin/components/AdminTableSkeleton";
import { deleteUser, restoreUser } from "@/features/admin/api/users";
import type { UserResponse } from "@/lib/api/types.gen";
import { toast } from "@/components/ui/toast";

interface UserSheetState {
  mode: UserSheetMode;
  user: UserResponse | null;
}

export default function AdminUsersPage() {
  const {
    users,
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
  } = useAdminUsers();
  const [busy, setBusy] = useState(false);
  const [sheet, setSheet] = useState<UserSheetState | null>(null);

  async function handleDelete(email: string) {
    setBusy(true);
    try {
      await deleteUser(email);
      toast.add({ type: "success", title: "Usuario eliminado" });
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
      <AdminPageHeader
        title="Usuarios"
        description="Gestiona los usuarios del sistema."
        actions={
          <Button onClick={() => setSheet({ mode: "create", user: null })}>
            <Plus /> Nuevo usuario
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Input
          name="search"
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={16} />}
          className="max-w-xs"
        />
        <label className="flex items-center gap-2 text-sm font-normal">
          <Switch
            checked={showDeleted}
            onCheckedChange={(checked) => setShowDeleted(checked === true)}
            aria-label="Ver usuarios eliminados"
          />
          Ver eliminados
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <AdminTableSkeleton columns={5} />
      ) : users.length === 0 ? (
        search || totalCount > 0 ? (
          <EmptyState
            icon={UsersRound}
            title="Sin resultados"
            description={`Ningún usuario coincide con «${search}».`}
          />
        ) : (
          <EmptyState
            icon={Users}
            title="Aún no hay usuarios"
            description="Crea el primer usuario del sistema."
            action={
              <Button
                size="sm"
                onClick={() => setSheet({ mode: "create", user: null })}
              >
                <Plus /> Crear usuario
              </Button>
            }
          />
        )
      ) : (
        <>
          <AdminResultCount
            count={filteredCount}
            singular="usuario"
            plural="usuarios"
            searching={!!search}
            query={search}
          />
          <UserTable
            users={users}
            showDeleted={showDeleted}
            busy={busy}
            onEdit={(user) => setSheet({ mode: "edit", user })}
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

      <UserSheet
        open={sheet !== null}
        onOpenChange={(open) => {
          if (!open) setSheet(null);
        }}
        mode={sheet?.mode ?? "create"}
        user={sheet?.user ?? null}
        onSuccess={() => {
          setSheet(null);
          reload();
        }}
      />
    </div>
  );
}
