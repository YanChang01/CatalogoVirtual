import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAdminDeletedUsers,
  fetchAdminUsers,
} from "@/features/admin/api/users";
import type { UserResponse } from "@/lib/api/types.gen";

const PAGE_SIZE = 10;

export function useAdminUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [deleted, setDeleted] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, showDeleted]);
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

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    [filtered.length]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return {
    users: paginated,
    filteredCount: filtered.length,
    totalCount: source.length,
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
  };
}
