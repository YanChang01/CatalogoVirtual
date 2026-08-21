import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { client } from "@/lib/api/client.gen";
import type { UserResponse } from "@/lib/api/types.gen";
import { UserForm } from "@/features/admin/components/UserForm";

export default function AdminUserEditPage() {
  const { userEmail } = useParams();
  const email = userEmail ? decodeURIComponent(userEmail) : "";
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await client.get({
          url: "/users/read/{email}",
          path: { email },
        });
        if (response.error || !response.data) {
          setError("Usuario no encontrado");
        } else {
          setUser(response.data as UserResponse);
        }
      } catch {
        setError("Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    }
    if (email) load();
  }, [email]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Cargando usuario...</p>;
  }

  if (error || !user) {
    return <p className="text-sm text-destructive">{error ?? "Usuario no encontrado"}</p>;
  }

  return (
    <UserForm
      userEmail={user.email}
      initialData={{
        fullname: user.fullname,
        phone: user.phone,
        email: user.email,
      }}
    />
  );
}
