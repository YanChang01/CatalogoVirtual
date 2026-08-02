import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/constants";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <p className="text-xs text-primary tracking-widest uppercase mb-2">
          {product.category}
        </p>
        <h1
          className="text-3xl md:text-4xl text-foreground leading-tight"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        >
          {product.name}
        </h1>
      </div>

      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-medium text-foreground">
          ${product.price.toFixed(2)}
        </span>
        {!product.isActive && (
          <span className="text-xl text-muted-foreground line-through">
            No disponible
          </span>
        )}
      </div>

      {product.description && (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {product.description}
        </p>
      )}

      <div className="pt-6">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hola, me interesa el producto: ${product.name}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/80"
        >
          <MessageCircle size={16} className="mr-2" />
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}