import { useMemo } from "react";
import ContentLayout from "@/components/layouts/content-layout";
import { CatalogPageHeader } from "@/features/catalog/components/CatalogPageHeader";
import { ActiveFilterChips } from "@/features/catalog/components/ActiveFilterChips";
import { CatalogToolbar } from "@/features/catalog/components/CatalogToolbar";
import { CatalogProductGrid } from "@/features/catalog/components/CatalogProductGrid";
import { CatalogEmptyState } from "@/features/catalog/components/CatalogEmptyState";
import { CatalogSidebar } from "@/features/catalog/components/catalog-sidebar";
import { useCatalog } from "@/features/catalog/hooks/useCatalog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
    paginatedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    activeFiltersCount,
    productsCountByCategory,
    categories,
    loading,
    clearAll,
  } = useCatalog();

  const showPages = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

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
                <>
                  <CatalogProductGrid
                    products={paginatedProducts}
                    viewMode={viewMode}
                  />
                  {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              currentPage > 1 ? setCurrentPage((p) => Math.max(1, p - 1)) : undefined
                            }
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        {showPages.map((page, i) =>
                          page === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${i}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={page}>
                              <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              currentPage < totalPages
                                ? setCurrentPage((p) => Math.min(totalPages, p + 1))
                                : undefined
                            }
                            aria-disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}

              {filteredProducts.length > 0 && !loading && (
                <p className="text-center text-xs text-muted-foreground mt-10">
                  Mostrando{" "}
                  {(currentPage - 1) * 12 + 1}{" "}
                  –
                  {Math.min(currentPage * 12, filteredProducts.length)} de{" "}
                  {filteredProducts.length} productos
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}