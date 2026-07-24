import { X } from "lucide-react";

interface ActiveFilterChipsProps {
  selectedCategories: string[];
  selectedMaterials: string[];
  onSaleOnly: boolean;
  newOnly: boolean;
  minRating: number;
  priceRange: [number, number];
  onRemoveCategory: (cat: string) => void;
  onRemoveMaterial: (mat: string) => void;
  onToggleOnSaleOnly: () => void;
  onToggleNewOnly: () => void;
  onClearAll: () => void;
  onSetMinRating: (rating: number) => void;
  onSetPriceRange: (range: [number, number]) => void;
}

export function ActiveFilterChips({
  selectedCategories,
  selectedMaterials,
  onSaleOnly,
  newOnly,
  minRating,
  priceRange,
  onRemoveCategory,
  onRemoveMaterial,
  onToggleOnSaleOnly,
  onToggleNewOnly,
  onClearAll,
  onSetMinRating,
  onSetPriceRange,
}: ActiveFilterChipsProps) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedMaterials.length > 0 ||
    onSaleOnly ||
    newOnly ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedCategories.map((c) => (
        <button
          key={c}
          onClick={() => onRemoveCategory(c)}
          className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
        >
          {c} <X size={10} />
        </button>
      ))}
      {selectedMaterials.map((m) => (
        <button
          key={m}
          onClick={() => onRemoveMaterial(m)}
          className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
        >
          {m} <X size={10} />
        </button>
      ))}
      {onSaleOnly && (
        <button
          onClick={onToggleOnSaleOnly}
          className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
        >
          En oferta <X size={10} />
        </button>
      )}
      {newOnly && (
        <button
          onClick={onToggleNewOnly}
          className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
        >
          Novedades <X size={10} />
        </button>
      )}
      {minRating > 0 && (
        <button
          onClick={() => onSetMinRating(0)}
          className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
        >
          {minRating}+ estrellas <X size={10} />
        </button>
      )}
      {(priceRange[0] > 0 || priceRange[1] < 200) && (
        <button
          onClick={() => onSetPriceRange([0, 200])}
          className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
        >
          ${priceRange[0]} – ${priceRange[1]} <X size={10} />
        </button>
      )}
      <button
        onClick={onClearAll}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
      >
        Limpiar todo
      </button>
    </div>
  );
}
