import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  Search,
  SlidersHorizontal,
  X,
  Heart,
  Star,
  Grid3X3,
  List,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import ContentLayout from "@/components/layouts/content-layout";

// ── DATA ──────────────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Velvet Rose Pro",
    category: "Vibradores",
    subcategory: "Clitoris",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 312,
    badge: "Más Vendido",
    img: "photo-1760860992203-85ca32536788",
    material: "Silicona médica",
    isNew: false,
    onSale: true,
  },
  {
    id: 2,
    name: "Duo Pulse Connect",
    category: "Parejas",
    subcategory: "App",
    price: 129.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 187,
    badge: "Nuevo",
    img: "photo-1779556507342-7951f64a3b86",
    material: "Silicona médica",
    isNew: true,
    onSale: false,
  },
  {
    id: 3,
    name: "Silk Touch Massager",
    category: "Vibradores",
    subcategory: "Cuerpo",
    price: 64.5,
    originalPrice: 85.0,
    rating: 4.7,
    reviews: 428,
    badge: null,
    img: "photo-1695048367315-3d4bcd9c5df4",
    material: "Silicona médica",
    isNew: false,
    onSale: true,
  },
  {
    id: 4,
    name: "Midnight Ritual Set",
    category: "BDSM",
    subcategory: "Sets",
    price: 149.0,
    originalPrice: null,
    rating: 5.0,
    reviews: 94,
    badge: "Edición Limitada",
    img: "photo-1772987714654-2df39af2c658",
    material: "Cuero vegano",
    isNew: false,
    onSale: false,
  },
  {
    id: 5,
    name: "Noir Wand Elite",
    category: "Vibradores",
    subcategory: "Varita",
    price: 109.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 203,
    badge: null,
    img: "photo-1633793566063-52465a148cc7",
    material: "Silicona médica",
    isNew: false,
    onSale: false,
  },
  {
    id: 6,
    name: "Obsidian Cuffs Set",
    category: "BDSM",
    subcategory: "Esposas",
    price: 59.0,
    originalPrice: 79.0,
    rating: 4.6,
    reviews: 145,
    badge: null,
    img: "photo-1633793566189-8e9fe6f817fc",
    material: "Cuero vegano",
    isNew: false,
    onSale: true,
  },
  {
    id: 7,
    name: "Lumière Duo",
    category: "Parejas",
    subcategory: "Vibrador",
    price: 98.0,
    originalPrice: null,
    rating: 4.9,
    reviews: 267,
    badge: "Nuevo",
    img: "photo-1633793565852-04e2a1482614",
    material: "Silicona médica",
    isNew: true,
    onSale: false,
  },
  {
    id: 8,
    name: "Petal Bloom G-Spot",
    category: "Vibradores",
    subcategory: "Punto G",
    price: 74.99,
    originalPrice: 99.0,
    rating: 4.7,
    reviews: 389,
    badge: null,
    img: "photo-1602037299890-c593f4c81d47",
    material: "Silicona médica",
    isNew: false,
    onSale: true,
  },
  {
    id: 9,
    name: "Velvet Rope Kit",
    category: "BDSM",
    subcategory: "Bondage",
    price: 44.0,
    originalPrice: null,
    rating: 4.5,
    reviews: 112,
    badge: null,
    img: "photo-1633793566102-ee7793834059",
    material: "Algodón",
    isNew: false,
    onSale: false,
  },
  {
    id: 10,
    name: "Aqua Glide Premium",
    category: "Lubricantes",
    subcategory: "Base agua",
    price: 24.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 520,
    badge: "Más Vendido",
    img: "photo-1698593975704-f415e32689fa",
    material: "Sin parabenos",
    isNew: false,
    onSale: false,
  },
  {
    id: 11,
    name: "Silk & Satin Blend",
    category: "Lubricantes",
    subcategory: "Base silicona",
    price: 32.0,
    originalPrice: 42.0,
    rating: 4.6,
    reviews: 198,
    badge: null,
    img: "photo-1700225195176-39ebd9cd5550",
    material: "Sin parabenos",
    isNew: false,
    onSale: true,
  },
  {
    id: 12,
    name: "Aurora Wearable",
    category: "Parejas",
    subcategory: "Wearable",
    price: 115.0,
    originalPrice: null,
    rating: 4.9,
    reviews: 156,
    badge: "Nuevo",
    img: "photo-1775255487971-af15499994b1",
    material: "Silicona médica",
    isNew: true,
    onSale: false,
  },
  {
    id: 13,
    name: "Blindfold Luxe",
    category: "BDSM",
    subcategory: "Antifaz",
    price: 28.0,
    originalPrice: null,
    rating: 4.4,
    reviews: 87,
    badge: null,
    img: "photo-1760860992203-85ca32536788",
    material: "Seda",
    isNew: false,
    onSale: false,
  },
  {
    id: 14,
    name: "Feather Teaser",
    category: "Accesorios",
    subcategory: "Sensitivo",
    price: 18.5,
    originalPrice: 24.0,
    rating: 4.3,
    reviews: 64,
    badge: null,
    img: "photo-1602037299924-64d70ca69264",
    material: "Plumas naturales",
    isNew: false,
    onSale: true,
  },
  {
    id: 15,
    name: "Crimson Harness",
    category: "BDSM",
    subcategory: "Arnés",
    price: 89.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 73,
    badge: "Nuevo",
    img: "photo-1633793566189-8e9fe6f817fc",
    material: "Cuero vegano",
    isNew: true,
    onSale: false,
  },
  {
    id: 16,
    name: "Pulse Ring Duo",
    category: "Parejas",
    subcategory: "Anillo",
    price: 39.99,
    originalPrice: 52.0,
    rating: 4.5,
    reviews: 241,
    badge: null,
    img: "photo-1772987714654-2df39af2c658",
    material: "Silicona médica",
    isNew: false,
    onSale: true,
  },
  {
    id: 17,
    name: "Warming Massage Oil",
    category: "Lubricantes",
    subcategory: "Aceite masaje",
    price: 29.0,
    originalPrice: null,
    rating: 4.7,
    reviews: 315,
    badge: null,
    img: "photo-1698593975704-f415e32689fa",
    material: "Natural",
    isNew: false,
    onSale: false,
  },
  {
    id: 18,
    name: "Velvet Paddle",
    category: "BDSM",
    subcategory: "Paleta",
    price: 47.0,
    originalPrice: null,
    rating: 4.6,
    reviews: 99,
    badge: null,
    img: "photo-1633793565852-04e2a1482614",
    material: "Cuero vegano",
    isNew: false,
    onSale: false,
  },
  {
    id: 19,
    name: "Satin Sleep Mask",
    category: "Accesorios",
    subcategory: "Sensorial",
    price: 16.0,
    originalPrice: 22.0,
    rating: 4.2,
    reviews: 44,
    badge: null,
    img: "photo-1602037299890-c593f4c81d47",
    material: "Seda",
    isNew: false,
    onSale: true,
  },
  {
    id: 20,
    name: "Solo Bliss Rechargeable",
    category: "Vibradores",
    subcategory: "Recargable",
    price: 79.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 477,
    badge: "Más Vendido",
    img: "photo-1695048367315-3d4bcd9c5df4",
    material: "Silicona médica",
    isNew: false,
    onSale: false,
  },
];

const CATEGORIES = [
  "Vibradores",
  "Parejas",
  "BDSM",
  "Lubricantes",
  "Accesorios",
];
const MATERIALS = [
  "Silicona médica",
  "Cuero vegano",
  "Algodón",
  "Seda",
  "Natural",
  "Sin parabenos",
  "Plumas naturales",
];
const SORT_OPTIONS = [
  { value: "popular", label: "Más populares" },
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= Math.round(rating) ? "#c4355a" : "none"}
          stroke={s <= Math.round(rating) ? "#c4355a" : "#8a7d80"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
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

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function Catalog() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get("categoria");
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
        !selectedMaterials.includes(p.material)
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

  // ── SIDEBAR ────────────────────────────────────────────────────────────────

  const Sidebar = () => (
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
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
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
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center justify-between text-sm text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${selectedCategories.includes(cat) ? "bg-primary border-primary" : "border-border group-hover:border-muted-foreground"}`}
                >
                  {selectedCategories.includes(cat) && (
                    <Check size={10} className="text-primary-foreground" />
                  )}
                </div>
                <span
                  className={`transition-colors ${selectedCategories.includes(cat) ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                >
                  {cat}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {ALL_PRODUCTS.filter((p) => p.category === cat).length}
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
            <input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-full bg-card border border-border text-foreground text-xs px-3 py-2 focus:outline-none focus:border-primary/50"
            />
            <span className="text-muted-foreground text-xs self-center">–</span>
            <input
              type="number"
              min={priceRange[0]}
              max={200}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full bg-card border border-border text-foreground text-xs px-3 py-2 focus:outline-none focus:border-primary/50"
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
                className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${minRating === r && r > 0 ? "bg-primary border-primary" : "border-border group-hover:border-muted-foreground"}`}
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
          {MATERIALS.map((mat) => (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              className="flex items-center gap-2.5 text-sm group"
            >
              <div
                className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${selectedMaterials.includes(mat) ? "bg-primary border-primary" : "border-border group-hover:border-muted-foreground"}`}
              >
                {selectedMaterials.includes(mat) && (
                  <Check size={10} className="text-primary-foreground" />
                )}
              </div>
              <span
                className={`text-sm transition-colors ${selectedMaterials.includes(mat) ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
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
              className={`text-sm transition-colors ${value ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
            >
              {label}
            </span>
            <div
              className={`w-9 h-5 relative transition-colors ${value ? "bg-primary" : "bg-muted"}`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-foreground transition-transform ${value ? "translate-x-4" : "translate-x-0.5"}`}
              />
            </div>
          </button>
        ))}
      </div>
    </aside>
  );

  // ── PRODUCT CARD ──────────────────────────────────────────────────────────

  const ProductCard = ({ product }: { product: (typeof ALL_PRODUCTS)[0] }) => {
    if (viewMode === "list") {
      return (
        <div className="group bg-card border border-border flex gap-5 p-4 hover:border-border/60 transition-colors">
          <div className="relative w-28 h-28 shrink-0 overflow-hidden bg-muted">
            <img
              src={`https://images.unsplash.com/${product.img}?w=300&h=300&fit=crop&auto=format`}
              alt={product.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {product.badge && (
              <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-1.5 py-0.5">
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex flex-col flex-1 min-w-0 py-1">
            <p className="text-xs text-primary tracking-widest uppercase mb-1">
              {product.category}
            </p>
            <h3
              className="text-lg text-foreground mb-1 leading-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating} />
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-auto">
              {product.material}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-foreground">
                  €{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                  aria-label="Favorito"
                >
                  <Heart
                    size={13}
                    fill={wishlist.includes(product.id) ? "#c4355a" : "none"}
                    stroke={
                      wishlist.includes(product.id) ? "#c4355a" : "#f0ebe3"
                    }
                  />
                </button>
                <button className="border border-border text-foreground text-xs tracking-widest uppercase px-4 py-2 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200">
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="group bg-card border border-border flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={`https://images.unsplash.com/${product.img}?w=500&h=500&fit=crop&auto=format`}
            alt={product.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-2 py-1">
              {product.badge}
            </span>
          )}
          {product.onSale && !product.badge && (
            <span className="absolute top-3 left-3 bg-card/90 text-foreground text-[9px] tracking-widest uppercase px-2 py-1 border border-border">
              Oferta
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
            aria-label="Favorito"
          >
            <Heart
              size={13}
              fill={wishlist.includes(product.id) ? "#c4355a" : "none"}
              stroke={wishlist.includes(product.id) ? "#c4355a" : "#f0ebe3"}
            />
          </button>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[10px] text-primary tracking-widest uppercase mb-1">
            {product.category}
          </p>
          <h3
            className="text-base text-foreground mb-1.5 leading-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-2 mt-auto mb-3">
            <span className="text-base font-medium text-foreground">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button className="w-full border border-border text-foreground text-[10px] tracking-widest uppercase py-2.5 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200">
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  };

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
              <Sidebar />
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
                    <Sidebar />
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
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
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
