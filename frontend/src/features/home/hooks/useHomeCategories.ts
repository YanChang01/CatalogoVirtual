import { useState, useEffect } from "react";
import { fetchCategoriesWithCounts } from "@/features/home/api/categories";
import type { CategoryWithCount } from "@/types/product";

export function useHomeCategories() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const cats = await fetchCategoriesWithCounts();
        if (mounted) {
          setCategories(cats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return { categories, loading };
}
