import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser, updateUser } from "@/features/admin/api/users";

interface UserFormProps {
  initialData?: {
    fullname: string;
    phone: string;
    email: string;
  };
  userEmail?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UserForm({
  initialData,
  userEmail,
  onSuccess,
  onCancel,
}: UserFormProps) {
  const isEdit = !!userEmail;

  const [fullname, setFullname] = useState(initialData?.fullname ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!fullname.trim() || fullname.trim().length < 2)
      nextErrors.fullname = "Nombre inválido (mínimo 2 caracteres)";
    if (!/^\d{8}$/.test(phone)) nextErrors.phone = "El teléfono debe tener 8 dígitos";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Email inválido";
    if (!isEdit && password.length < 6)
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      if (isEdit && userEmail) {
        await updateUser(userEmail, {
          fullname: fullname.trim(),
          phone,
          email: email.trim(),
        });
        toast.add({ type: "success", title: "Usuario actualizado" });
      } else {
        await createUser({
          fullname: fullname.trim(),
          phone,
          email: email.trim(),
          password,
        });
        toast.add({ type: "success", title: "Usuario creado" });
      }
      onSuccess();
    } catch (err) {
      toast.add({
        type: "error",
        title: err instanceof Error ? err.message : "Error inesperado",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col min-h-0">
      <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-4 flex-1">
        <Input
          name="fullname"
          label="Nombre completo"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          error={errors.fullname}
          required
        />
        <Input
          name="phone"
          label="Teléfono"
          inputMode="numeric"
          maxLength={8}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          error={errors.phone}
          helperText="8 dígitos."
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        {!isEdit && (
          <Input
            name="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
        )}
      </div>
      <div className="flex justify-end gap-2 border-t p-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear usuario"}
        </Button>
      </div>
    </form>
  );
}
