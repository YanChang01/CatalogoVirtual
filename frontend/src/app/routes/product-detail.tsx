import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { MessageCircle, ChevronLeft } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { WHATSAPP_NUMBER } from "@/config/constants";
import { fetchProductByName } from "@/lib/api/products";
import ContentLayout from "@/components/layouts/content-layout";

export default function ProductDetail() {
  const { productName } = useParams();
  const name = productName ? decodeURIComponent(productName) : "";
  const [selectedImage, setSelectedImage] = useState(0);
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

  const images = [
    product.img,
    "photo-1653974123568-b5eff6d851e1",
    "photo-1695048367315-3d4bcd9c5df4",
    "photo-1772987714654-2df39af2c658",
  ];

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4 min-w-0">
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
                    className={`relative shrink-0 w-20 h-20 min-w-[80px] rounded-md overflow-hidden border-2 transition-colors ${
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
            <div className="space-y-6 min-w-0">
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
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
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
                      Precio original: ${product.originalPrice.toFixed(2)}
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

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  img: string;
  material?: string;
  isNew?: boolean;
  onSale?: boolean;
}
