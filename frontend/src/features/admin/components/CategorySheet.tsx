import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CategoryResponse } from "@/lib/api/types.gen";
import { CategoryForm } from "@/features/admin/components/CategoryForm";

export type CategorySheetMode = "create" | "edit";

interface CategorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: CategorySheetMode;
  category: CategoryResponse | null;
  onSuccess: () => void;
}

export function CategorySheet({
  open,
  onOpenChange,
  mode,
  category,
  onSuccess,
}: CategorySheetProps) {
  const isEdit = mode === "edit" && !!category;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col gap-0 p-0">
        <SheetHeader className="p-4 pb-0">
          <SheetTitle>
            {isEdit ? "Editar categoría" : "Nueva categoría"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Cambia el nombre de la categoría."
              : "Agrupa los productos bajo un nombre común."}
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          key={isEdit ? category!.name : "create"}
          categoryName={isEdit ? category!.name : undefined}
          initialName={isEdit ? category!.name : undefined}
          onSuccess={onSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
