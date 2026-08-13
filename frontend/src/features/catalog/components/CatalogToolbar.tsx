import { ChevronDown, Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { SORT_OPTIONS } from "@/data/products";

interface CatalogToolbarProps {
  filteredCount: number;
  sort: string;
  setSort: (val: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeFiltersCount: number;
  sidebarContent: React.ReactNode;
}

export function CatalogToolbar({
  filteredCount,
  sort,
  setSort,
  viewMode,
  setViewMode,
  sidebarOpen,
  setSidebarOpen,
  activeFiltersCount,
  sidebarContent,
}: CatalogToolbarProps) {
  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center gap-2 border border-border text-foreground text-xs tracking-widest uppercase px-4 py-2.5 hover:border-foreground/30 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-[9px] w-4 h-4 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
          <p className="text-sm text-muted-foreground hidden sm:block">
            <span className="text-foreground font-medium">{filteredCount}</span>{" "}
            productos
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-card border border-border text-foreground text-xs px-4 py-2.5 pr-8 focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Vista en cuadrícula"
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Vista en lista"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-80 max-w-full bg-background border-r border-border p-6 overflow-y-auto ml-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium">Filtros</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            {sidebarContent}
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full bg-primary text-primary-foreground text-xs tracking-widest uppercase py-3 mt-4"
            >
              Ver {filteredCount} productos
            </button>
          </div>
        </div>
      )}
    </>
  );
}