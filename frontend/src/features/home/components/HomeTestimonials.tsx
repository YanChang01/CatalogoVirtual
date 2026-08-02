import { StarRating } from "@/components/ui/star-rating";
import { TESTIMONIALS } from "@/data/testimonials";

export function HomeTestimonials() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
          Lo que dicen de nosotros
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-card border border-border p-8 flex flex-col gap-5"
          >
            <StarRating rating={t.rating} size={13} />
            <p
              className="text-foreground/80 text-sm leading-relaxed flex-1 italic"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
            >
              "{t.text}"
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-foreground text-sm font-medium">
                  {t.name}
                </p>
                <p className="text-muted-foreground text-xs">{t.location}</p>
              </div>
              {t.verified && (
                <span className="text-[10px] text-primary tracking-widest uppercase border border-primary/30 px-2 py-0.5">
                  Verificado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}