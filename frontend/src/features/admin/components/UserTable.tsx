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
import type { UserResponse } from "@/lib/api/types.gen";

interface UserTableProps {
  users: UserResponse[];
  showDeleted: boolean;
  busy?: boolean;
  onDelete: (email: string) => Promise<void>;
  onRestore: (email: string) => Promise<void>;
}

export function UserTable({
  users,
  showDeleted,
  busy = false,
  onDelete,
  onRestore,
}: UserTableProps) {
  if (users.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No hay usuarios para mostrar.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                {showDeleted || user.is_deleted ? (
                  <Badge className="rounded-sm" variant="destructive">Eliminado</Badge>
                ) : (
                  <Badge className="rounded-sm" variant="outline">Activo</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                {showDeleted || user.is_deleted ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={busy}
                    onClick={() => onRestore(user.email)}
                  >
                    <RotateCcw /> Restaurar
                  </Button>
                ) : (
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={busy}
                      render={
                        <Link
                          to={routes.admin.users.edit(user.email)}
                          aria-label={`Editar ${user.fullname}`}
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
                            disabled={busy}
                            aria-label={`Eliminar ${user.fullname}`}
                          />
                        }
                      >
                        <Trash2 className="text-destructive" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Se eliminará «{user.fullname}» ({user.email}). Podrás
                            restaurarlo más tarde desde la papelera.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={busy}>
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            disabled={busy}
                            onClick={() => onDelete(user.email)}
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
