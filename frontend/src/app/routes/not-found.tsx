import { routes } from "@/config/routes";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-6xl font-bold text-destructive">Error 404</h1>
      <h2 className="text-2xl mt-4 text-primary">Página no encontrada</h2>
      <p className="text-lg mt-2 mb-4 text-gray-300">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        to={routes.home.path}
        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors duration-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
