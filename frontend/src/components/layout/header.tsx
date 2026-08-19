import { useState } from "react";
import { Link } from "react-router";
import { Search, MessageCircle, Menu, X, LogOut } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/constants";
import { useAuth } from "@/features/auth/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <span
            className="text-xl"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            <span className="text-primary">Sex</span>Shop
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/catalogo"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Catálogo"
          >
            <Search size={18} />
            <span className="hidden sm:inline text-sm tracking-widest uppercase">
              Catálogo
            </span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline text-sm tracking-widest uppercase">
              WhatsApp
            </span>
          </a>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm tracking-widest uppercase">
                Salir
              </span>
            </button>
          )}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          <Link
            to="/catalogo"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            onClick={() => setMenuOpen(false)}
          >
            Catálogo
          </Link>
          {isAuthenticated && (
            <button
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 text-left"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}