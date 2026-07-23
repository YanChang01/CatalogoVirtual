import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

interface CatalogProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

export function CatalogProductGrid({
  products,
  viewMode,
  wishlist,
  onToggleWishlist,
}: CatalogProductGridProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            view={viewMode}
            isWishlisted={wishlist.includes(p.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          view={viewMode}
          isWishlisted={wishlist.includes(p.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}