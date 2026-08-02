import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2
        className="text-xl text-foreground mb-4"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
      >
        Detalles del producto
      </h2>
      <div className="prose prose-muted max-w-none">
        {product.description ? (
          <p className="text-muted-foreground leading-relaxed mb-4">
            {product.description}
          </p>
        ) : (
          <p className="text-muted-foreground leading-relaxed mb-4">
            Información detallada no disponible para este producto.
          </p>
        )}
        <h3 className="text-lg font-medium text-foreground mb-3">
          Información adicional
        </h3>
        <dl className="space-y-2 text-muted-foreground">
          <div className="flex gap-4">
            <dt className="font-medium min-w-[120px]">Categoría:</dt>
            <dd>{product.category}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-medium min-w-[120px]">Estado:</dt>
            <dd>{product.isActive ? "Disponible" : "No disponible"}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-medium min-w-[120px]">Creado:</dt>
            <dd>
              {new Date(product.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-medium min-w-[120px]">Actualizado:</dt>
            <dd>
              {new Date(product.updatedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}