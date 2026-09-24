import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function Section({
  id,
  children,
  className = "",
  eyebrow,
  title,
  subtitle,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-14">
            {eyebrow && (
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-blush-dark">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-light text-3xl md:text-4xl text-ink mt-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-charcoal/70 mt-4 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
