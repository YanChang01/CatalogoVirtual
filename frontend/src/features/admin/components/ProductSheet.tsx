import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { routes } from "@/config/routes";
import type { ProductResponse } from "@/lib/api/types.gen";
import { ProductForm } from "@/features/admin/components/ProductForm";

export type ProductSheetMode = "view" | "create" | "edit";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1760860992203-85ca32536788?w=800&h=600&fit=crop&auto=format";

interface ProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: ProductSheetMode;
  onModeChange: (mode: ProductSheetMode) => void;
  product: ProductResponse | null;
  categoryNames: Map<number, string>;
  onSuccess: () => void;
}

function ProductStatusBadge({ product }: { product: ProductResponse }) {
  if (product.is_deleted) {
    return <Badge className="rounded-sm" variant="destructive">Eliminado</Badge>;
  }
  if (product.is_active === false) {
    return <Badge className="rounded-sm" variant="secondary">Inactivo</Badge>;
  }
  return <Badge className="rounded-sm" variant="outline">Activo</Badge>;
}

export function ProductSheet({
  open,
  onOpenChange,
  mode,
  onModeChange,
  product,
  categoryNames,
  onSuccess,
}: ProductSheetProps) {
  const showForm = mode !== "view";
  const isEdit = mode === "edit" && !!product;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg flex flex-col gap-0 p-0">
        {showForm ? (
          <>
            <SheetHeader className="p-4 pb-0">
              <SheetTitle>
                {isEdit ? "Editar producto" : "Nuevo producto"}
              </SheetTitle>
              <SheetDescription>
                {isEdit
                  ? "Actualiza la información del producto."
                  : "Añade un nuevo producto al catálogo de la tienda."}
              </SheetDescription>
            </SheetHeader>
            <ProductForm
              key={isEdit ? product!.name : "create"}
              productName={isEdit ? product!.name : undefined}
              initialData={
                isEdit
                  ? {
                      name: product!.name,
                      price: String(Number(product!.price)),
                      description: product!.description,
                      imageUrl: product!.image_url ?? null,
                      isActive: product!.is_active ?? true,
                      categoryId: product!.category_id,
                    }
                  : undefined
              }
              onSuccess={onSuccess}
              onCancel={() =>
                isEdit ? onModeChange("view") : onOpenChange(false)
              }
            />
          </>
        ) : (
          product && (
            <div className="flex flex-1 flex-col min-h-0">
              <SheetHeader className="p-4 pb-0">
                <div className="flex items-center gap-2 pr-8">
                  <SheetTitle>{product.name}</SheetTitle>
                  <ProductStatusBadge product={product} />
                </div>
                <SheetDescription>
                  ${Number(product.price).toFixed(2)} ·{" "}
                  {categoryNames.get(product.category_id) ?? "Sin categoría"}
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <img
                  src={product.image_url || FALLBACK_IMAGE}
                  alt={`Imagen de ${product.name}`}
                  className="mt-3 aspect-[4/3] w-full rounded-lg border object-cover"
                />
                {product.description && (
                  <div className="mt-5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Descripción
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                      {product.description}
                    </p>
                  </div>
                )}
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4 text-sm">
                  <dt className="text-muted-foreground">Creado</dt>
                  <dd>{new Date(product.created_at).toLocaleDateString()}</dd>
                  <dt className="text-muted-foreground">Actualizado</dt>
                  <dd>{new Date(product.updated_at).toLocaleDateString()}</dd>
                </dl>
              </div>
              <SheetFooter className="border-t p-4 mt-0">
                <Button variant="outline" render={
                  <a
                    href={routes.product.link(product.name)}
                    target="_blank"
                    rel="noreferrer"
                  />
                }>
                  <ExternalLink /> Ver en tienda
                </Button>
                <Button onClick={() => onModeChange("edit")}>Editar</Button>
              </SheetFooter>
            </div>
          )
        )}
      </SheetContent>
    </Sheet>
  );
}
