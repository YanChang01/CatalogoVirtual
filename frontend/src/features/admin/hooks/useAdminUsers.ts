import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAdminDeletedUsers,
  fetchAdminUsers,
} from "@/features/admin/api/users";
import type { UserResponse } from "@/lib/api/types.gen";

export function useAdminUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [deleted, setDeleted] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, deletedItems] = await Promise.all([
        fetchAdminUsers(),
        fetchAdminDeletedUsers(),
      ]);
      setUsers(active);
      setDeleted(deletedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    reload();
  }, [reload]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const source = showDeleted ? deleted : users;

  const filtered = useMemo(() => {
    if (!search) return source;
    const q = search.toLowerCase();
    return source.filter(
      (u) =>
        u.fullname.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
    );
  }, [source, search]);

  return {
    users: filtered,
    totalCount: source.length,
    loading,
    error,
    search,
    setSearch,
    showDeleted,
    setShowDeleted,
    reload,
  };
}
