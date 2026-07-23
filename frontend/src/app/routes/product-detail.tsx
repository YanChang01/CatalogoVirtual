import { useState } from "react";
import { useParams } from "react-router";
import {
  ChevronLeft,
  Heart,
  Share2,
  Truck,
  Shield,
  Package,
  X,
} from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";

import { ALL_PRODUCTS } from "@/data/products";
import ContentLayout from "@/components/layouts/content-layout";

export default function ProductDetail() {
  const { productId } = useParams();
  const id = Number(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) return null;

  const images = [
    product.img,
    "photo-1653974123568-b5eff6d851e1",
    "photo-1695048367315-3d4bcd9c5df4",
    "photo-1772987714654-2df39af2c658",
  ];

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={`https://images.unsplash.com/${images[selectedImage]}?w=800&h=800&fit=crop&auto=format`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
                {product.onSale && !product.badge && (
                  <span className="absolute top-4 left-4 bg-card/90 text-foreground text-[9px] tracking-widest uppercase px-2.5 py-1 border border-border">
                    Oferta
                  </span>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    className={`relative shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-current={selectedImage === i}
                  >
                    <img
                      src={`https://images.unsplash.com/${img}?w=200&h=200&fit=crop&auto=format`}
                      alt={`${product.name} - vista ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs text-primary tracking-widest uppercase mb-2">
                  {product.category} / {product.subcategory}
                </p>
                <h1
                  className="text-3xl md:text-4xl text-foreground leading-tight"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
                >
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size={16} />
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviews} reseñas)
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-medium text-foreground">
                  €{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.onSale && product.originalPrice && (
                  <span className="bg-destructive/10 text-destructive text-xs tracking-widest uppercase px-2 py-1 rounded">
                    -
                    {Math.round(
                      (1 - product.price / product.originalPrice!) * 100,
                    )}
                    %
                  </span>
                )}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.material}
              </p>

              <div className="border-t border-b border-border py-6 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-28 shrink-0">
                    Cantidad
                  </span>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Disminuir cantidad"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                    <span className="w-12 text-center text-foreground font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <ChevronLeft
                        size={16}
                        className="text-muted-foreground rotate-180"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-28 shrink-0">
                    Añadir
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="lg"
                      className="flex-1 py-3 text-sm tracking-widest uppercase"
                      onClick={() => {}}
                    >
                      Añadir al carrito
                    </Button>
                    <button
                      onClick={() => setWishlisted(!wishlisted)}
                      className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary/50 hover:bg-muted transition-colors rounded-md"
                      aria-label={
                        wishlisted
                          ? "Quitar de favoritos"
                          : "Añadir a favoritos"
                      }
                    >
                      <Heart
                        size={18}
                        fill={wishlisted ? "#c4355a" : "none"}
                        stroke={wishlisted ? "#c4355a" : "#8a7d80"}
                      />
                    </button>
                    <button
                      className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary/50 hover:bg-muted transition-colors rounded-md"
                      aria-label="Compartir"
                    >
                      <Share2 size={18} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center gap-1.5">
                  <Truck size={20} className="text-primary" />
                  <span className="text-xs text-foreground font-medium">
                    Envío 48h
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Península
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-x border-border">
                  <Shield size={20} className="text-primary" />
                  <span className="text-xs text-foreground font-medium">
                    Pago seguro
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    SSL 256-bit
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Package size={20} className="text-primary" />
                  <span className="text-xs text-foreground font-medium">
                    Discreto
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Sin marcas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="mt-16 border-t border-border pt-10">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl text-foreground mb-6"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                Detalles del producto
              </h2>
              <div className="prose prose-muted max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.name} es un producto de bienestar íntimo de alta
                  calidad, diseñado con materiales{" "}
                  {product.material?.toLowerCase() || "premium"} y pensado para
                  ofrecer la mejor experiencia. Cada detalle ha sido
                  cuidadosamente seleccionado para garantizar tu comodidad y
                  satisfacción.
                </p>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  Características principales
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Material: {product.material ?? "—"}</li>
                  <li>Categoría: {product.category}</li>
                  <li>Subcategoría: {product.subcategory ?? "—"}</li>
                  {product.originalPrice && (
                    <li>
                      Precio original: €{product.originalPrice.toFixed(2)}
                    </li>
                  )}
                  {product.onSale && <li>En oferta: Sí</li>}
                  {product.isNew && <li>Novedad: Sí</li>}
                </ul>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  Cuidados y uso
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Para mantener tu producto en óptimas condiciones, límpialo
                  antes y después de cada uso con agua tibia y jabón neutro o un
                  limpiador específico para juguetes. Guárdalo en un lugar
                  fresco y seco, preferiblemente en su bolsa original, y evita
                  el contacto con otros materiales de silicona.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
