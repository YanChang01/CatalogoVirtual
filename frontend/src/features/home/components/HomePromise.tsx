import { Package, Shield, Star } from "lucide-react";

export function HomePromise() {
  const promises = [
    {
      icon: Package,
      title: "Envío 100% discreto",
      desc: "Cajas neutras sin ninguna indicación del contenido. Tu privacidad es nuestra prioridad absoluta en cada pedido.",
    },
    {
      icon: Shield,
      title: "Materiales body-safe",
      desc: "Solo silicona médica, ABS y materiales certificados. Cero ftalatos, cero compromisos con tu salud.",
    },
    {
      icon: Star,
      title: "Calidad premium",
      desc: "Cada producto es seleccionado y probado por nuestro equipo. Si no cumple nuestros estándares, no llega a ti.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {promises.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-start gap-5">
            <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
              <Icon size={20} className="text-primary" />
            </div>
            <div>
              <h3
                className="text-xl text-foreground mb-3"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
              >
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}