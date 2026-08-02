import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import ContentLayout from "@/components/layouts/content-layout";

interface ProductNotFoundProps {
  error: string;
}

export function ProductNotFound({ error }: ProductNotFoundProps) {
  return (
    <ContentLayout>
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-foreground mb-4">{error}</p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ChevronLeft size={16} />
            Volver al catálogo
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
}