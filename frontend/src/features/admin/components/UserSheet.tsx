import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { UserResponse } from "@/lib/api/types.gen";
import { UserForm } from "@/features/admin/components/UserForm";

export type UserSheetMode = "create" | "edit";

interface UserSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: UserSheetMode;
  user: UserResponse | null;
  onSuccess: () => void;
}

export function UserSheet({
  open,
  onOpenChange,
  mode,
  user,
  onSuccess,
}: UserSheetProps) {
  const isEdit = mode === "edit" && !!user;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col gap-0 p-0">
        <SheetHeader className="p-4 pb-0">
          <SheetTitle>
            {isEdit ? `Editar ${user!.fullname}` : "Nuevo usuario"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Actualiza los datos del usuario. La contraseña no se puede cambiar desde aquí."
              : "Registra una nueva cuenta de usuario."}
          </SheetDescription>
        </SheetHeader>
        <UserForm
          key={isEdit ? user!.email : "create"}
          userEmail={isEdit ? user!.email : undefined}
          initialData={
            isEdit
              ? {
                  fullname: user!.fullname,
                  phone: user!.phone,
                  email: user!.email,
                }
              : undefined
          }
          onSuccess={onSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
