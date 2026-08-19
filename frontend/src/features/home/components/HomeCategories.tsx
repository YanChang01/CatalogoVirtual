import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import type { CategoryWithCount } from "@/types/product";

const CATEGORY_GRADIENTS = [
  "bg-gradient-to-br from-rose-500/20 to-orange-500/10",
  "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10",
  "bg-gradient-to-br from-sky-500/20 to-indigo-500/10",
  "bg-gradient-to-br from-emerald-500/20 to-teal-500/10",
  "bg-gradient-to-br from-amber-500/20 to-yellow-500/10",
];

interface HomeCategoriesProps {
  categories: CategoryWithCount[];
  loading: boolean;
}

export function HomeCategories({ categories, loading }: HomeCategoriesProps) {
  return (
    <section id="categorias" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <h2
          className="text-2xl"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        >
          Por categoría
        </h2>
        <Link
          to="/catalogo"
          className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver todo <ChevronRight size={14} />
        </Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[520px] md:h-[600px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden bg-card animate-pulse ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <div className="absolute inset-0 bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[520px] md:h-[600px]">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/catalogo?categoria=${encodeURIComponent(cat.name.toLowerCase())}`}
              className={`group relative overflow-hidden flex flex-col justify-end p-5 md:p-8 transition-colors duration-300 ${
                CATEGORY_GRADIENTS[i % CATEGORY_GRADIENTS.length]
              } ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p
                className={`relative text-foreground font-medium leading-tight mb-1 ${i === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                {cat.name}
              </p>
              <p className="relative text-muted-foreground text-xs tracking-wider uppercase">
                {cat.count} {cat.count === 1 ? "producto" : "productos"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
