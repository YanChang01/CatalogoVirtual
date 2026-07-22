interface SectionHeaderProps {
  subtitle: string;
  title: string;
  className?: string;
  center?: boolean;
}

export function SectionHeader({ subtitle, title, className = "", center = false }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start text-left"} ${className}`}>
      <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3">
        {subtitle}
      </p>
      <h2
        className="text-4xl md:text-5xl"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
      >
        {title}
      </h2>
    </div>
  );
}
