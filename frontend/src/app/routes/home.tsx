import { useState } from "react";
import { Link } from "react-router";
import {
  Star,
  ChevronRight,
  Heart,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import ContentLayout from "@/components/layouts/content-layout";

const CATEGORIES = [
  {
    name: "Vibradores",
    count: "124 productos",
    img: "photo-1760860992203-85ca32536788",
    span: "col-span-2 row-span-2",
  },
  {
    name: "Para Parejas",
    count: "68 productos",
    img: "photo-1699800900071-ae073285ca02",
    span: "col-span-1 row-span-1",
  },
  {
    name: "BDSM & Bondage",
    count: "89 productos",
    img: "photo-1653974123568-b5eff6d851e1",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Lubricantes",
    count: "43 productos",
    img: "photo-1775255487971-af15499994b1",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Accesorios",
    count: "57 productos",
    img: "photo-1700225195176-39ebd9cd5550",
    span: "col-span-1 row-span-1",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Velvet Rose Pro",
    category: "Vibrador",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 312,
    badge: "Más Vendido",
    img: "photo-1760860992203-85ca32536788",
  },
  {
    id: 2,
    name: "Duo Pulse Connect",
    category: "Parejas",
    price: 129.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 187,
    badge: "Nuevo",
    img: "photo-1779556507342-7951f64a3b86",
  },
  {
    id: 3,
    name: "Silk Touch Massager",
    category: "Masajeador",
    price: 64.5,
    originalPrice: 85.0,
    rating: 4.7,
    reviews: 428,
    badge: null,
    img: "photo-1695048367315-3d4bcd9c5df4",
  },
  {
    id: 4,
    name: "Midnight Ritual Set",
    category: "BDSM",
    price: 149.0,
    originalPrice: null,
    rating: 5.0,
    reviews: 94,
    badge: "Edición Limitada",
    img: "photo-1772987714654-2df39af2c658",
  },
];

const TESTIMONIALS = [
  {
    name: "Ana M.",
    location: "Vedado",
    text: "Envío discretísimo, producto de altísima calidad. La atención al cliente fue impecable. Ya es mi tienda de confianza.",
    rating: 5,
    verified: true,
  },
  {
    name: "Carlos R.",
    location: "Centro Habana",
    text: "Calidad premium comparable a marcas europeas del doble de precio. Llegó en 48h perfectamente empaquetado.",
    rating: 5,
    verified: true,
  },
  {
    name: "Valentina G.",
    location: "Habana del Este",
    text: "Me encanta la filosofía de la marca: placer sin tabúes. La selección de productos es sofisticada y bien curada.",
    rating: 5,
    verified: true,
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= rating ? "#c4355a" : "none"}
          stroke={s <= rating ? "#c4355a" : "#8a7d80"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  return (
    <ContentLayout>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 bg-background">
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6">
            Nueva Colección 2026
          </p>
          <h1
            className="text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-8 text-foreground"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          >
            El placer
            <br />
            <em className="not-italic text-primary">es tuyo.</em>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-10">
            Productos de bienestar íntimo de calidad premium. Diseñados con
            cuidado, entregados con discreción absoluta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors duration-200"
            >
              Explorar Colección <ChevronRight size={16} />
            </Link>
            <a
              href="#categorias"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 text-sm tracking-wide uppercase hover:border-foreground/30 transition-colors duration-200"
            >
              Ver Categorías
            </a>
          </div>
          <div className="mt-16 flex flex-wrap gap-6">
            {[
              { icon: Package, label: "Envío discreto" },
              { icon: Shield, label: "Materiales seguros" },
              { icon: Truck, label: "48h garantizado" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-muted-foreground text-xs tracking-wide"
              >
                <Icon size={14} className="text-primary" /> {label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[50vh] lg:min-h-0 bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1653974123568-b5eff6d851e1?w=1200&h=1400&fit=crop&auto=format"
            alt="Habitación íntima de lujo"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-transparent" />
          <div className="absolute bottom-10 left-8 bg-card/80 backdrop-blur-sm border border-border px-5 py-4">
            <p className="text-xs text-muted-foreground mb-1 tracking-wider uppercase">
              Destacado
            </p>
            <p
              className="text-foreground text-sm font-medium"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Velvet Rose Pro
            </p>
            <p className="text-primary text-sm mt-0.5">€89.99</p>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section
        id="categorias"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3">
              Explorar
            </p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
            >
              Por categoría
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todo <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[520px] md:h-[600px]">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/catalogo?categoria=${cat.name.toLowerCase()}`}
              className={`relative group overflow-hidden bg-card ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={`https://images.unsplash.com/${cat.img}?w=800&h=800&fit=crop&auto=format`}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p
                  className={`text-foreground font-medium leading-tight mb-1 ${i === 0 ? "text-2xl md:text-3xl" : "text-base md:text-lg"}`}
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
                >
                  {cat.name}
                </p>
                <p className="text-muted-foreground text-xs">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-24 bg-secondary/30">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3">
                Selección
              </p>
              <h2
                className="text-4xl md:text-5xl"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                Más deseados
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver catálogo <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={`https://images.unsplash.com/${product.img}?w=600&h=600&fit=crop&auto=format`}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-2.5 py-1">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Añadir a favoritos"
                  >
                    <Heart
                      size={14}
                      fill={wishlist.includes(product.id) ? "#c4355a" : "none"}
                      stroke={
                        wishlist.includes(product.id) ? "#c4355a" : "#f0ebe3"
                      }
                    />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-primary tracking-widest uppercase mb-1">
                    {product.category}
                  </p>
                  <h3
                    className="text-lg text-foreground mb-2 leading-tight"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-auto mb-4">
                    <span className="text-lg font-medium text-foreground">
                      €{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="w-full border border-border text-foreground text-xs tracking-widest uppercase py-3 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMESA */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {[
            {
              icon: Package,
              title: "Envío 100% discreto",
              desc: "Cajas neutras sin ninguna indicación del contenido. Tu privacidad es nuestra prioridad absoluta en cada pedido.",
            },
            {
              icon: Shield,
              title: "Materiales body-safe",
              desc: "Solo silicona médica, ABS y materiales certificados. Cero ftalatos, cero compromisos con tu salud.",
            },
            {
              icon: Star,
              title: "Calidad premium",
              desc: "Cada producto es seleccionado y probado por nuestro equipo. Si no cumple nuestros estándares, no llega a ti.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-start gap-5">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3
                  className="text-xl text-foreground mb-3"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                >
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3">
            Clientes
          </p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          >
            Lo que dicen de nosotros
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border p-8 flex flex-col gap-5"
            >
              <StarRating rating={t.rating} size={13} />
              <p
                className="text-foreground/80 text-sm leading-relaxed flex-1 italic"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                "{t.text}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
                {t.verified && (
                  <span className="text-[10px] text-primary tracking-widest uppercase border border-primary/30 px-2 py-0.5">
                    Verificado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-secondary/40 border-t border-b border-border py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">
            Newsletter
          </p>
          <h2
            className="text-4xl md:text-5xl mb-5"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          >
            Únete a nuestra comunidad
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-10">
            Sé la primera persona en conocer nuevos productos, colecciones
            exclusivas y ofertas privadas. Sin spam.
          </p>
          {subscribed ? (
            <div className="border border-primary/30 px-8 py-5 text-primary text-sm tracking-wide">
              ¡Gracias! Bienvenido/a a la comunidad de SexShop.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-card border border-border text-foreground placeholder:text-muted-foreground px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-7 py-4 text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
          )}
          <p className="text-muted-foreground text-xs mt-5">
            Al suscribirte aceptas nuestra política de privacidad. Cancela
            cuando quieras.
          </p>
        </div>
      </section>
    </ContentLayout>
  );
}
