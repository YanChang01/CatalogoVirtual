import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

interface HomeFeaturedProductsProps {
  products: Product[];
  loading: boolean;
}

export function HomeFeaturedProducts({ products, loading }: HomeFeaturedProductsProps) {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
            Más deseados
          </h2>
          <Link
            to="/catalogo"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver catálogo <ChevronRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}