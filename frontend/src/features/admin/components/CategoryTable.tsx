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
import type { CategoryResponse } from "@/lib/api/types.gen";

interface CategoryTableProps {
  categories: CategoryResponse[];
  showDeleted: boolean;
  onDelete: (name: string) => Promise<void>;
  onRestore: (name: string) => Promise<void>;
}

export function CategoryTable({
  categories,
  showDeleted,
  onDelete,
  onRestore,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No hay categorías para mostrar.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Creada</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(category.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {showDeleted || category.is_deleted ? (
                  <Badge className="rounded-sm" variant="destructive">Eliminada</Badge>
                ) : (
                  <Badge className="rounded-sm" variant="outline">Activa</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                {showDeleted || category.is_deleted ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestore(category.name)}
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
                          to={routes.admin.categories.edit(category.name)}
                          aria-label={`Editar ${category.name}`}
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
                            aria-label={`Eliminar ${category.name}`}
                          />
                        }
                      >
                        <Trash2 className="text-destructive" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            ¿Eliminar categoría?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Se eliminará «{category.name}». Podrás restaurarla más
                            tarde desde la papelera.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => onDelete(category.name)}
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
