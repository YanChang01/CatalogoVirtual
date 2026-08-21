import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ProductResponse } from "@/lib/api/types.gen";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1760860992203-85ca32536788?w=64&h=64&fit=crop&auto=format";

interface ProductTableProps {
  products: ProductResponse[];
  showDeleted: boolean;
  busy?: boolean;
  categoryNames: Map<number, string>;
  onView: (product: ProductResponse) => void;
  onEdit: (product: ProductResponse) => void;
  onDelete: (name: string) => Promise<void>;
  onRestore: (name: string) => Promise<void>;
}

export function ProductTable({
  products,
  showDeleted,
  busy = false,
  categoryNames,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: ProductTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const deleted = showDeleted || product.is_deleted;
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => onView(product)}
                    className="flex items-center gap-3 text-left rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    <img
                      src={product.image_url || FALLBACK_IMAGE}
                      alt=""
                      loading="lazy"
                      className="size-8 shrink-0 rounded-sm border object-cover"
                    />
                    <span className="font-medium hover:text-primary transition-colors">
                      {product.name}
                    </span>
                  </button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {categoryNames.get(product.category_id) ?? "—"}
                </TableCell>
                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                <TableCell>
                  {deleted ? (
                    <Badge className="rounded-sm" variant="destructive">Eliminado</Badge>
                  ) : product.is_active === false ? (
                    <Badge className="rounded-sm" variant="secondary">Inactivo</Badge>
                  ) : (
                    <Badge className="rounded-sm" variant="outline">Activo</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(product.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {deleted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => onRestore(product.name)}
                    >
                      <RotateCcw /> Restaurar
                    </Button>
                  ) : (
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={busy}
                        onClick={() => onEdit(product)}
                        aria-label={`Editar ${product.name}`}
                      >
                        <Pencil />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              disabled={busy}
                              aria-label={`Eliminar ${product.name}`}
                            />
                          }
                        >
                          <Trash2 className="text-destructive" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar producto?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Se eliminará «{product.name}». Podrás restaurarlo más
                              tarde desde la papelera.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={busy}>
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              disabled={busy}
                              onClick={() => onDelete(product.name)}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
