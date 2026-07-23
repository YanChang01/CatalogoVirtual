import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { StarRating } from "@/components/ui/star-rating";
import { routes } from "@/config/routes";
import { WHATSAPP_NUMBER } from "@/config/constants";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list";
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}

export function ProductCard({
  product,
  view = "grid",
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  if (view === "list") {
    return (
      <div className="group bg-card border border-border flex gap-5 p-4 hover:border-border/60 transition-colors">
        <div className="relative w-28 h-28 shrink-0 overflow-hidden bg-muted">
          <Link to={routes.product.path(product.id)} className="block w-full h-full">
            <img
              src={`https://images.unsplash.com/${product.img}?w=300&h=300&fit=crop&auto=format`}
              alt={product.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          </Link>
          {product.badge && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-1.5 py-0.5">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0 py-1">
          <p className="text-xs text-primary tracking-widest uppercase mb-1">
            {product.category}
          </p>
          <Link to={routes.product.path(product.id)} className="hover:text-primary transition-colors">
            <h3
              className="text-lg text-foreground mb-1 leading-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
            >
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={product.rating} size={12} />
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-auto">
            {product.material}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-foreground">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                aria-label="Favorito"
              >
                <Heart
                  size={13}
                  fill={isWishlisted ? "#c4355a" : "none"}
                  stroke={isWishlisted ? "#c4355a" : "#f0ebe3"}
                />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hola, me interesa el producto: ${product.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/80 text-xs tracking-widest uppercase"
              >
                <MessageCircle size={13} className="mr-1" />
                Contactar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-card border border-border flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={routes.product.path(product.id)} className="block w-full h-full">
          <img
            src={`https://images.unsplash.com/${product.img}?w=500&h=500&fit=crop&auto=format`}
            alt={product.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-2 py-1">
            {product.badge}
          </span>
        )}
        {product.onSale && !product.badge && (
          <span className="absolute top-3 left-3 bg-card/90 text-foreground text-[9px] tracking-widest uppercase px-2 py-1 border border-border">
            Oferta
          </span>
        )}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
          aria-label="Favorito"
        >
          <Heart
            size={13}
            fill={isWishlisted ? "#c4355a" : "none"}
            stroke={isWishlisted ? "#c4355a" : "#f0ebe3"}
          />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-primary tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <Link to={routes.product.path(product.id)} className="hover:text-primary transition-colors">
          <h3
            className="text-base text-foreground mb-1.5 leading-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} size={12} />
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
<div className="flex items-center gap-2 mt-auto mb-3">
            <span className="text-base font-medium text-foreground">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola, me interesa el producto: ${product.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full text-[10px] tracking-widest uppercase py-2.5 bg-primary text-primary-foreground hover:bg-primary/80"
          >
            <MessageCircle size={12} className="mr-1" />
            Contactar
          </a>
      </div>
    </div>
  );
}
