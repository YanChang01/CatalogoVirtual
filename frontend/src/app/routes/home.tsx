import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronRight, Package, Shield, Truck, Star } from "lucide-react";
import ContentLayout from "@/components/layouts/content-layout";
import { StarRating } from "@/components/ui/star-rating";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/components/products/product-card";
import { TESTIMONIALS } from "@/data/testimonials";
import { fetchFeaturedProducts, fetchCategoriesWithCounts, type CategoryWithCount } from "@/lib/api/products";
import type { Product } from "@/types/product";

const CATEGORY_GRADIENTS = [
  "bg-gradient-to-br from-rose-500/20 to-orange-500/10",
  "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10",
  "bg-gradient-to-br from-sky-500/20 to-indigo-500/10",
  "bg-gradient-to-br from-emerald-500/20 to-teal-500/10",
  "bg-gradient-to-br from-amber-500/20 to-yellow-500/10",
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [products, cats] = await Promise.all([
          fetchFeaturedProducts(4),
          fetchCategoriesWithCounts(),
        ]);
        setFeaturedProducts(products);
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
            <p className="text-primary text-sm mt-0.5">$89.99</p>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section
        id="categorias"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex items-end justify-between mb-12">
          <SectionHeader subtitle="Explorar" title="Por categoría" />
          <Link
            to="/catalogo"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todo <ChevronRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[520px] md:h-[600px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden bg-card animate-pulse ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <div className="absolute inset-0 bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[520px] md:h-[600px]">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                to={`/catalogo?categoria=${encodeURIComponent(cat.name.toLowerCase())}`}
                className={`group relative overflow-hidden flex flex-col justify-end p-5 md:p-8 transition-colors duration-300 ${
                  CATEGORY_GRADIENTS[i % CATEGORY_GRADIENTS.length]
                } ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p
                  className={`relative text-foreground font-medium leading-tight mb-1 ${i === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
                >
                  {cat.name}
                </p>
                <p className="relative text-muted-foreground text-xs tracking-wider uppercase">
                  {cat.count} {cat.count === 1 ? "producto" : "productos"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-24 bg-secondary/30">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader subtitle="Selección" title="Más deseados" />
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
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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
          <SectionHeader
            subtitle="Clientes"
            title="Lo que dicen de nosotros"
            center
          />
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
    </ContentLayout>
  );
}