import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { fetchProducts, getCategoriesFromProducts, getProductsCountByCategory, type Product } from "@/lib/api/products";

export function useCatalog() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get("categoria") ?? "";
    if (cat) {
      return [cat];
    }
    return [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (mounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError("Error al cargar los productos");
          console.error(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const clearAll = () => {
    setSelectedCategories([]);
    setPriceRange([0, 9999]);
    setSearch("");
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
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
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [
    search,
    selectedCategories,
    priceRange,
    sort,
    products,
  ]);

  const activeFiltersCount =
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 9999 ? 1 : 0);

  const productsCountByCategory = useMemo(
    () => getProductsCountByCategory(products),
    [products],
  );

  const categories = useMemo(
    () => getCategoriesFromProducts(products),
    [products],
  );

  return {
    loading,
    error,
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
    clearAll,
  };
}