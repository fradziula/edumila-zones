import { ImageIcon } from "lucide-react";

export function PhotoPlaceholder({
  label,
  caption,
  aspect = "aspect-[4/5]",
  tone = "default",
}: {
  label: string;
  caption?: string;
  aspect?: string;
  tone?: "default" | "karolina" | "student" | "parent";
}) {
  const ring =
    tone === "karolina"
      ? "ring-karolina/40 from-karolina/20"
      : tone === "student"
      ? "ring-student/40 from-student/20"
      : tone === "parent"
      ? "ring-parent/40 from-parent/20"
      : "ring-border from-surface-2";
  return (
    <figure className="w-full">
      <div
        className={`relative ${aspect} w-full rounded-3xl overflow-hidden ring-1 ${ring} bg-gradient-to-br to-surface border border-dashed border-border/80 flex items-center justify-center`}
      >
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
        <div className="relative text-center px-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
            <ImageIcon className="text-muted-foreground" size={20} />
          </div>
          <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
            Placeholder
          </div>
          <div className="font-display text-base md:text-lg text-foreground/90">{label}</div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center">{caption}</figcaption>
      )}
    </figure>
  );
}
