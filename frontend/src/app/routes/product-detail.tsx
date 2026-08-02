import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { MessageCircle, ChevronLeft } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/constants";
import { fetchProductByName } from "@/lib/api/products";
import ContentLayout from "@/components/layouts/content-layout";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetail() {
  const { productName } = useParams();
  const name = productName ? decodeURIComponent(productName) : "";
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

  if (loading) {
    return (
      <ContentLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </ContentLayout>
    );
  }

  if (error || !product) {
    return (
      <ContentLayout>
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-foreground mb-4">{error || "Producto no encontrado"}</p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ChevronLeft size={16} />
              Volver al catálogo
            </Link>
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Gallery */}
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

            {/* Product Info */}
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

              {/* Details */}
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
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}