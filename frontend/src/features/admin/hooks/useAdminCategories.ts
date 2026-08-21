import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAdminCategories,
  fetchAdminDeletedCategories,
} from "@/features/admin/api/categories";
import type { CategoryResponse } from "@/lib/api/types.gen";

const PAGE_SIZE = 10;

export function useAdminCategories() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [deleted, setDeleted] = useState<CategoryResponse[]>([]);
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
        fetchAdminCategories(),
        fetchAdminDeletedCategories(),
      ]);
      setCategories(active);
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

  const source = showDeleted ? deleted : categories;

  const filtered = useMemo(() => {
    if (!search) return source;
    const q = search.toLowerCase();
    return source.filter((c) => c.name.toLowerCase().includes(q));
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
    categories: paginated,
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
