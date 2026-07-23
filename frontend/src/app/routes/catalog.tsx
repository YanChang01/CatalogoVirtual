import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ChevronDown,
} from "lucide-react";
import ContentLayout from "@/components/layouts/content-layout";
import { ProductCard } from "@/components/products/product-card";
import { CatalogSidebar } from "@/components/catalog/catalog-sidebar";
import {
  ALL_PRODUCTS,
  CATEGORIES,
  MATERIALS,
  SORT_OPTIONS,
} from "@/data/products";

// ── COMPONENTS ────────────────────────────────────────────────────────────────

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function Catalog() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get("categoria") ?? "";
    if (cat) {
      const match = CATEGORIES.find((c) =>
        c.toLowerCase().includes(cat.toLowerCase()),
      );
      return match ? [match] : [];
    }
    return [];
  });
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(
    searchParams.get("filtro") === "nuevo",
  );
  const [sort, setSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const toggleMaterial = (mat: string) =>
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat],
    );

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange([0, 200]);
    setMinRating(0);
    setOnSaleOnly(false);
    setNewOnly(false);
    setSearch("");
  };

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS.filter((p) => {
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.category.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      )
        return false;
      if (
        selectedMaterials.length > 0 &&
        !selectedMaterials.includes(p.material ?? "")
      )
        return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.rating < minRating) return false;
      if (onSaleOnly && !p.onSale) return false;
      if (newOnly && !p.isNew) return false;
      return true;
    });

    switch (sort) {
      case "newest":
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [
    search,
    selectedCategories,
    selectedMaterials,
    priceRange,
    minRating,
    onSaleOnly,
    newOnly,
    sort,
  ]);

  const activeFiltersCount =
    selectedCategories.length +
    selectedMaterials.length +
    (onSaleOnly ? 1 : 0) +
    (newOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);

  const productsCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // ── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        {/* Page header */}
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
              {ALL_PRODUCTS.length} productos · Colección 2026
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          {/* Active filter chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCategory(c)}
                  className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
                >
                  {c} <X size={10} />
                </button>
              ))}
              {selectedMaterials.map((m) => (
                <button
                  key={m}
                  onClick={() => toggleMaterial(m)}
                  className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
                >
                  {m} <X size={10} />
                </button>
              ))}
              {onSaleOnly && (
                <button
                  onClick={() => setOnSaleOnly(false)}
                  className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
                >
                  En oferta <X size={10} />
                </button>
              )}
              {newOnly && (
                <button
                  onClick={() => setNewOnly(false)}
                  className="flex items-center gap-1.5 text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
                >
                  Novedades <X size={10} />
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
              >
                Limpiar todo
              </button>
            </div>
          )}

          <div className="flex gap-10">
            {/* Sidebar — desktop */}
            <div className="hidden md:block">
              <CatalogSidebar
                search={search}
                setSearch={setSearch}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedMaterials={selectedMaterials}
                toggleMaterial={toggleMaterial}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                onSaleOnly={onSaleOnly}
                setOnSaleOnly={setOnSaleOnly}
                newOnly={newOnly}
                setNewOnly={setNewOnly}
                clearAll={clearAll}
                activeFiltersCount={activeFiltersCount}
                categories={CATEGORIES}
                materials={MATERIALS}
                productsCountByCategory={productsCountByCategory}
              />
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0">
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
                    <span className="text-foreground font-medium">
                      {filtered.length}
                    </span>{" "}
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
                      className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      aria-label="Vista en cuadrícula"
                    >
                      <Grid3X3 size={14} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
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
                    <CatalogSidebar
                      search={search}
                      setSearch={setSearch}
                      selectedCategories={selectedCategories}
                      toggleCategory={toggleCategory}
                      selectedMaterials={selectedMaterials}
                      toggleMaterial={toggleMaterial}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      minRating={minRating}
                      setMinRating={setMinRating}
                      onSaleOnly={onSaleOnly}
                      setOnSaleOnly={setOnSaleOnly}
                      newOnly={newOnly}
                      setNewOnly={setNewOnly}
                      clearAll={clearAll}
                      activeFiltersCount={activeFiltersCount}
                      categories={CATEGORIES}
                      materials={MATERIALS}
                      productsCountByCategory={productsCountByCategory}
                    />
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="w-full bg-primary text-primary-foreground text-xs tracking-widest uppercase py-3 mt-4"
                    >
                      Ver {filtered.length} productos
                    </button>
                  </div>
                </div>
              )}

              {/* Product grid / list */}
              {filtered.length === 0 ? (
                <div className="py-24 text-center">
                  <p
                    className="text-muted-foreground text-lg mb-3"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
                  >
                    No encontramos productos con esos filtros.
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      view={viewMode}
                      isWishlisted={wishlist.includes(p.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filtered.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      view={viewMode}
                      isWishlisted={wishlist.includes(p.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              )}

              {/* Footer count */}
              {filtered.length > 0 && (
                <p className="text-center text-xs text-muted-foreground mt-10">
                  Mostrando {filtered.length} de {ALL_PRODUCTS.length} productos
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
