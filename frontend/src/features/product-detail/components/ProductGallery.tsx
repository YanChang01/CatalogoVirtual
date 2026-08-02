import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="space-y-4 min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sin imagen
          </div>
        )}
        {!product.isActive && (
          <span className="absolute top-4 left-4 bg-muted/90 text-foreground text-[9px] tracking-widest uppercase px-2.5 py-1 border border-border">
            No disponible
          </span>
        )}
      </div>
    </div>
  );
}