import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";
import { useAuth } from "@/features/auth/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Formato de correo inválido";
    if (!password) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await login({ username: email, password });
      navigate(routes.home.path);
    } catch (err) {
      setErrors({ general: (err as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="font-heading text-2xl font-light tracking-tight mt-4">
            Iniciar sesión
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Accede a tu cuenta
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border rounded-xl p-6 shadow-sm"
          noValidate
          aria-describedby={errors.general ? "login-error" : undefined}
        >
          <div className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
              disabled={isLoading}
              leftIcon={<Mail size={16} className="text-muted-foreground" />}
            />

            <Input
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
              disabled={isLoading}
              leftIcon={<Lock size={16} className="text-muted-foreground" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>

            <div
              id="login-error"
              role={errors.general ? "alert" : undefined}
              aria-live="polite"
              className="min-h-[1.25rem]"
            >
              {errors.general && (
                <p className="text-sm text-destructive text-center">
                  {errors.general}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 pt-4 border-t text-center">
            <Link
              to={routes.home.path}
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
