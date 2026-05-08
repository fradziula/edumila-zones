import type { ReactNode } from "react";
type Tone = "parent" | "student" | "karolina" | "default";
const toneMap: Record<Tone, { eyebrow: string; bg: string }> = {
  parent: { eyebrow: "text-parent", bg: "from-parent/10" },
  student: { eyebrow: "text-student", bg: "from-student/10" },
  karolina: { eyebrow: "text-karolina", bg: "from-karolina/10" },
  default: { eyebrow: "text-foreground", bg: "from-surface-2/40" },
};
export function PageHero({
  eyebrow, title, subtitle, tone = "default", children,
}: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; tone?: Tone; children?: ReactNode }) {
  const t = toneMap[tone];
  return (
    <section className={`relative overflow-hidden border-b border-border bg-gradient-to-b ${t.bg} to-transparent`}>
      <div className="container-page py-16 md:py-24">
        {eyebrow && (
          <div className={`uppercase text-xs tracking-[0.2em] font-medium mb-4 ${t.eyebrow}`}>
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] max-w-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
