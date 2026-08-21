import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAdminDeletedProducts,
  fetchAdminProducts,
} from "@/features/admin/api/products";
import type { ProductResponse } from "@/lib/api/types.gen";

export function useAdminProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [deleted, setDeleted] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, deletedItems] = await Promise.all([
        fetchAdminProducts(),
        fetchAdminDeletedProducts(),
      ]);
      setProducts(active);
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

  const source = showDeleted ? deleted : products;

  const filtered = useMemo(() => {
    if (!search) return source;
    const q = search.toLowerCase();
    return source.filter((p) => p.name.toLowerCase().includes(q));
  }, [source, search]);

  return {
    products: filtered,
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
