import { Link } from "react-router";
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
import { routes } from "@/config/routes";
import type { ProductResponse } from "@/lib/api/types.gen";

interface ProductTableProps {
  products: ProductResponse[];
  showDeleted: boolean;
  onDelete: (name: string) => Promise<void>;
  onRestore: (name: string) => Promise<void>;
}

export function ProductTable({
  products,
  showDeleted,
  onDelete,
  onRestore,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No hay productos para mostrar.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell>
                {showDeleted || product.is_deleted ? (
                  <Badge className="rounded-sm" variant="destructive">Eliminado</Badge>
                ) : product.is_active === false ? (
                  <Badge className="rounded-sm" variant="secondary">Inactivo</Badge>
                ) : (
                  <Badge className="rounded-sm" variant="outline">Activo</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                {showDeleted || product.is_deleted ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestore(product.name)}
                  >
                    <RotateCcw /> Restaurar
                  </Button>
                ) : (
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={
                        <Link
                          to={routes.admin.products.edit(product.name)}
                          aria-label={`Editar ${product.name}`}
                        />
                      }
                    >
                      <Pencil />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Eliminar ${product.name}`}
                          />
                        }
                      >
                        <Trash2 className="text-destructive" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Se eliminará «{product.name}». Podrás restaurarlo más
                            tarde desde la papelera.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
