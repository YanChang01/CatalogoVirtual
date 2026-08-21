import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAdminDeletedProducts,
  fetchAdminProducts,
} from "@/features/admin/api/products";
import { fetchAdminCategories } from "@/features/admin/api/categories";
import type { CategoryResponse, ProductResponse } from "@/lib/api/types.gen";

const PAGE_SIZE = 10;

export function useAdminProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [deleted, setDeleted] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, deletedItems, cats] = await Promise.all([
        fetchAdminProducts(),
        fetchAdminDeletedProducts(),
        fetchAdminCategories(),
      ]);
      setProducts(active);
      setDeleted(deletedItems);
      setCategories(cats);
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

  const source = showDeleted ? deleted : products;

  const filtered = useMemo(() => {
    if (!search) return source;
    const q = search.toLowerCase();
    return source.filter((p) => p.name.toLowerCase().includes(q));
  }, [source, search]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    [filtered.length]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const categoryNames = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  return {
    products: paginated,
    filteredCount: filtered.length,
    totalCount: source.length,
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
  };
}
