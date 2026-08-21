import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { client } from "@/lib/api/client.gen";
import type { ProductResponse } from "@/lib/api/types.gen";
import { ProductForm } from "@/features/admin/components/ProductForm";

export default function AdminProductEditPage() {
  const { productName } = useParams();
  const name = productName ? decodeURIComponent(productName) : "";
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await client.get({
          url: "/products/read/{name}",
          path: { name },
        });
        if (response.error || !response.data) {
          setError("Producto no encontrado");
        } else {
          setProduct(response.data as ProductResponse);
        }
      } catch {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    }
    if (name) load();
  }, [name]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Cargando producto...</p>;
  }

  if (error || !product) {
    return <p className="text-sm text-destructive">{error ?? "Producto no encontrado"}</p>;
  }

  return (
    <ProductForm
      productName={product.name}
      initialData={{
        name: product.name,
        price: String(Number(product.price)),
        description: product.description,
        imageUrl: product.image_url ?? null,
        isActive: product.is_active ?? true,
        categoryId: product.category_id,
      }}
    />
  );
}
