import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products";

export function useCatalog() {
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
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
    setPriceRange([0, 9999]);
    setMinRating(0);
    setOnSaleOnly(false);
    setNewOnly(false);
    setSearch("");
  };

  const filteredProducts = useMemo(() => {
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
    (priceRange[0] > 0 || priceRange[1] < 9999 ? 1 : 0);

  const productsCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return {
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
  };
}
