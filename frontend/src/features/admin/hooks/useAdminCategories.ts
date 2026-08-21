import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAdminCategories,
  fetchAdminDeletedCategories,
} from "@/features/admin/api/categories";
import type { CategoryResponse } from "@/lib/api/types.gen";

export function useAdminCategories() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [deleted, setDeleted] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

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
  /* eslint-enable react-hooks/set-state-in-effect */

  const source = showDeleted ? deleted : categories;

  const filtered = useMemo(() => {
    if (!search) return source;
    const q = search.toLowerCase();
    return source.filter((c) => c.name.toLowerCase().includes(q));
  }, [source, search]);

  return {
    categories: filtered,
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
