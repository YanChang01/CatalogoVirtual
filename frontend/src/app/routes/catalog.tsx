import ContentLayout from "@/components/layouts/content-layout";
import { CatalogPageHeader } from "@/features/catalog/components/CatalogPageHeader";
import { ActiveFilterChips } from "@/features/catalog/components/ActiveFilterChips";
import { CatalogToolbar } from "@/features/catalog/components/CatalogToolbar";
import { CatalogProductGrid } from "@/features/catalog/components/CatalogProductGrid";
import { CatalogEmptyState } from "@/features/catalog/components/CatalogEmptyState";
import { CatalogSidebar } from "@/features/catalog/components/catalog-sidebar";
import { useCatalog } from "@/features/catalog/hooks/useCatalog";
import { CATEGORIES, MATERIALS } from "@/data/products";

export default function Catalog() {
  const {
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
    filteredProducts,
    activeFiltersCount,
    productsCountByCategory,
    sort,
    setSort,
    viewMode,
    setViewMode,
    wishlist,
    toggleWishlist,
    sidebarOpen,
    setSidebarOpen,
  } = useCatalog();

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        <CatalogPageHeader totalProducts={filteredProducts.length} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <ActiveFilterChips
            selectedCategories={selectedCategories}
            selectedMaterials={selectedMaterials}
            onSaleOnly={onSaleOnly}
            newOnly={newOnly}
            minRating={minRating}
            priceRange={priceRange}
            onRemoveCategory={toggleCategory}
            onRemoveMaterial={toggleMaterial}
            onToggleOnSaleOnly={() => setOnSaleOnly(!onSaleOnly)}
            onToggleNewOnly={() => setNewOnly(!newOnly)}
            onClearAll={clearAll}
            onSetMinRating={setMinRating}
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
                }
              />

              {filteredProducts.length === 0 ? (
                <CatalogEmptyState onClearFilters={clearAll} />
              ) : (
                <CatalogProductGrid
                  products={filteredProducts}
                  viewMode={viewMode}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />
              )}

              {filteredProducts.length > 0 && (
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