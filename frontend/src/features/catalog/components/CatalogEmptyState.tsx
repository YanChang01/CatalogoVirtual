interface CatalogEmptyStateProps {
  onClearFilters: () => void;
}

export function CatalogEmptyState({ onClearFilters }: CatalogEmptyStateProps) {
  return (
    <div className="py-24 text-center">
      <p
        className="text-muted-foreground text-lg mb-3"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
      >
        No encontramos productos con esos filtros.
      </p>
      <button
        onClick={onClearFilters}
        className="text-sm text-primary hover:text-primary/80 transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  );
}