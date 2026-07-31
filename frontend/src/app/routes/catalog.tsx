import ContentLayout from "@/components/layouts/content-layout";
import { CatalogPageHeader } from "@/features/catalog/components/CatalogPageHeader";
import { ActiveFilterChips } from "@/features/catalog/components/ActiveFilterChips";
import { CatalogToolbar } from "@/features/catalog/components/CatalogToolbar";
import { CatalogProductGrid } from "@/features/catalog/components/CatalogProductGrid";
import { CatalogEmptyState } from "@/features/catalog/components/CatalogEmptyState";
import { CatalogSidebar } from "@/features/catalog/components/catalog-sidebar";
import { useCatalog } from "@/features/catalog/hooks/useCatalog";

export default function Catalog() {
  const {
    search,
    setSearch,
    selectedCategories,
    toggleCategory,
    priceRange,
    setPriceRange,
    sort,
    setSort,
    viewMode,
    setViewMode,
    sidebarOpen,
    setSidebarOpen,
    filteredProducts,
    activeFiltersCount,
    productsCountByCategory,
    categories,
    loading,
    clearAll,
  } = useCatalog();

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        <CatalogPageHeader totalProducts={filteredProducts.length} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <ActiveFilterChips
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            onRemoveCategory={toggleCategory}
            onClearAll={clearAll}
            onSetPriceRange={setPriceRange}
          />

          <div className="flex gap-10">
            {/* Sidebar — desktop */}
            <div className="hidden md:block">
              <CatalogSidebar
                search={search}
                setSearch={setSearch}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                clearAll={clearAll}
                activeFiltersCount={activeFiltersCount}
                categories={categories}
                productsCountByCategory={productsCountByCategory}
              />
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0">
              <CatalogToolbar
                filteredCount={filteredProducts.length}
                sort={sort}
                setSort={setSort}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeFiltersCount={activeFiltersCount}
                sidebarContent={
                  <CatalogSidebar
                    search={search}
                    setSearch={setSearch}
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    clearAll={clearAll}
                    activeFiltersCount={activeFiltersCount}
                    categories={categories}
                    productsCountByCategory={productsCountByCategory}
                  />
                }
              />

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-muted-foreground">Cargando productos...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <CatalogEmptyState onClearFilters={clearAll} />
              ) : (
                <CatalogProductGrid
                  products={filteredProducts}
                  viewMode={viewMode}
                />
              )}

              {filteredProducts.length > 0 && !loading && (
                <p className="text-center text-xs text-muted-foreground mt-10">
                  Mostrando {filteredProducts.length} de {filteredProducts.length} productos
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}