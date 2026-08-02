import { useState, useEffect } from "react";
import { fetchCategoriesWithCounts, type CategoryWithCount } from "@/lib/api/products";
import { fetchFeaturedProducts, type Product } from "@/lib/api/products";

export function useHomeData() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [cats, products] = await Promise.all([
          fetchCategoriesWithCounts(),
          fetchFeaturedProducts(4),
        ]);
        if (mounted) {
          setCategories(cats);
          setFeaturedProducts(products);
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

  return { categories, featuredProducts, loading };
}