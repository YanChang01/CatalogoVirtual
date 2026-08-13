import { FOOTER_COLUMNS } from "@/data/footer";

export default function Footer() {
  return (
    <footer className="pt-4 pb-8 px-6 md:px-12 max-w-7xl mx-auto mt-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
        <div className="col-span-2 md:col-span-1">
          <span
            className="text-2xl mb-4 block"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
          >
            <span className="text-primary">Sex</span>Shop
          </span>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Bienestar íntimo sin tabúes. Calidad premium, discreción total.
          </p>
          <div className="flex gap-4">{/* Brands */}</div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs tracking-widest uppercase text-foreground mb-5">
              {col.title}
            </p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2026 SexShop. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
