import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export function HomeHero() {
  return (
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
      </div>
      <div className="relative min-h-[50vh] lg:min-h-0 bg-muted overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1653974123568-b5eff6d851e1?w=1200&h=1400&fit=crop&auto=format"
          alt="Habitación íntima de lujo"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-transparent" />
      </div>
    </section>
  );
}
