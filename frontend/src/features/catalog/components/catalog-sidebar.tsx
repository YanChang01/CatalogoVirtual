import { useState } from "react";
import { Search, X, Check, ChevronUp, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/ui/star-rating";

interface CatalogSidebarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  selectedMaterials: string[];
  toggleMaterial: (mat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (val: boolean) => void;
  newOnly: boolean;
  setNewOnly: (val: boolean) => void;
  clearAll: () => void;
  activeFiltersCount: number;
  categories: string[];
  materials: string[];
  productsCountByCategory: Record<string, number>;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <span className="text-xs tracking-widest uppercase text-foreground">
          {title}
        </span>
        {open ? (
          <ChevronUp
            size={14}
            className="text-muted-foreground group-hover:text-foreground transition-colors"
          />
        ) : (
          <ChevronDown
            size={14}
            className="text-muted-foreground group-hover:text-foreground transition-colors"
          />
        )}
      </button>
      {open && children}
    </div>
  );
}

export function CatalogSidebar({
  search,
  setSearch,
  selectedCategories,
  toggleCategory,
  selectedMaterials,
  toggleMaterial,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onSaleOnly,
  setOnSaleOnly,
  newOnly,
  setNewOnly,
  clearAll,
  activeFiltersCount,
  categories,
  materials,
  productsCountByCategory,
}: CatalogSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs tracking-widest uppercase text-foreground">
          Filtros
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Limpiar todo ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Búsqueda */}
      <div className="relative mb-6">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          size="sm"
          className="pl-9 pr-4"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Categoría */}
      <FilterSection title="Categoría">
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center justify-between text-sm text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                    selectedCategories.includes(cat)
                      ? "bg-primary border-primary"
                      : "border-border group-hover:border-muted-foreground"
                  }`}
                >
                  {selectedCategories.includes(cat) && (
                    <Check size={10} className="text-primary-foreground" />
                  )}
                </div>
                <span
                  className={`transition-colors ${
                    selectedCategories.includes(cat)
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {cat}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {productsCountByCategory[cat] || 0}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Precio */}
      <FilterSection title="Precio">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">€{priceRange[0]}</span>
            <span className="text-muted-foreground">€{priceRange[1]}</span>
          </div>
          <div className="relative h-1 bg-muted">
            <div
              className="absolute h-full bg-primary"
              style={{
                left: `${(priceRange[0] / 200) * 100}%`,
                right: `${100 - (priceRange[1] / 200) * 100}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={200}
              step={5}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Math.min(Number(e.target.value), priceRange[1] - 10),
                  priceRange[1],
                ])
              }
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1"
            />
            <input
              type="range"
              min={0}
              max={200}
              step={5}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(Number(e.target.value), priceRange[0] + 10),
                ])
              }
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1"
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              size="sm"
              className="w-full"
            />
            <span className="text-muted-foreground text-xs self-center">–</span>
            <Input
              type="number"
              min={priceRange[0]}
              max={200}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </FilterSection>

      {/* Valoración */}
      <FilterSection title="Valoración mínima">
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r === minRating ? 0 : r)}
              className="flex items-center gap-3 group"
            >
              <div
                className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                  minRating === r && r > 0
                    ? "bg-primary border-primary"
                    : "border-border group-hover:border-muted-foreground"
                }`}
              >
                {minRating === r && r > 0 && (
                  <Check size={10} className="text-primary-foreground" />
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <StarRating rating={r || 1} size={11} />
                <span className="text-xs text-muted-foreground">
                  {r > 0 ? `${r}+ estrellas` : "Todos"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Material" defaultOpen={false}>
        <div className="flex flex-col gap-2">
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              className="flex items-center gap-2.5 text-sm group"
            >
              <div
                className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                  selectedMaterials.includes(mat)
                    ? "bg-primary border-primary"
                    : "border-border group-hover:border-muted-foreground"
                }`}
              >
                {selectedMaterials.includes(mat) && (
                  <Check size={10} className="text-primary-foreground" />
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  selectedMaterials.includes(mat)
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {mat}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {[
          { label: "En oferta", value: onSaleOnly, set: setOnSaleOnly },
          { label: "Novedades", value: newOnly, set: setNewOnly },
        ].map(({ label, value, set }) => (
          <button
            key={label}
            onClick={() => set(!value)}
            className="flex items-center justify-between group"
          >
            <span
              className={`text-sm transition-colors ${
                value ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {label}
            </span>
            <div
              className={`w-9 h-5 relative transition-colors ${
                value ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-foreground transition-transform ${
                  value ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}