import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Lock, Mail, ChevronLeft } from "lucide-react";
import ContentLayout from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  };

  return (
    <ContentLayout>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link
              to={routes.home.path}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft size={18} />
              Volver al inicio
            </Link>
            <h1
              className="text-3xl md:text-4xl font-medium mb-3"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
            >
              Iniciar sesión
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-8"
            noValidate
          >
            <div className="space-y-6">
              <Input
                label="Correo electrónico"
                type="email"
                name="email"
                id="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                helperText={
                  !errors.email ? "Nunca compartiremos tu correo" : undefined
                }
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

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </ContentLayout>
  );
}
