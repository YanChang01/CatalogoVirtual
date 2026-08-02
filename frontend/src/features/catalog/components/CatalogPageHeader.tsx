interface CatalogPageHeaderProps {
  totalProducts: number;
}

export function CatalogPageHeader({ totalProducts }: CatalogPageHeaderProps) {
  return (
    <div className="border-b border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2">
          Tienda
        </p>
        <h1
          className="text-4xl md:text-5xl text-foreground"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        >
          Catálogo completo
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          {totalProducts} productos · Colección 2026
        </p>
      </div>
    </div>
  );
}