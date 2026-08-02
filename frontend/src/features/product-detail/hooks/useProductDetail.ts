import { useState, useEffect } from "react";
import { fetchProductByName, type Product } from "@/lib/api/products";

interface UseProductDetailReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProductDetail(name: string): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!name) return;
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductByName(name);
        if (mounted) {
          if (data) {
            setProduct(data);
            setError(null);
          } else {
            setError("Producto no encontrado");
          }
        }
      } catch (e) {
        if (mounted) {
          setError("Error al cargar el producto");
          console.error(e);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProduct();
    return () => {
      mounted = false;
    };
  }, [name]);

  return { product, loading, error };
}