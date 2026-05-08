import type { ReactNode } from "react";
export function Section({
  title, eyebrow, subtitle, children, className = "",
}: { title?: ReactNode; eyebrow?: string; subtitle?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container-page">
        {eyebrow && (
          <div className="uppercase text-xs tracking-[0.2em] font-medium mb-3 text-muted-foreground">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-2xl">{title}</h2>
        )}
        {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
        <div className={title ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}
