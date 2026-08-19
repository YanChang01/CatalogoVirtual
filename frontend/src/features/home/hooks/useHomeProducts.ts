import { useState, useEffect } from "react";
import { fetchFeaturedProducts } from "@/features/home/api/products";
import type { Product } from "@/types/product";

export function useHomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const data = await fetchFeaturedProducts(4);
        if (mounted) {
          setProducts(data);
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

  return { products, loading };
}
