import { Star } from "lucide-react";
export function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} z 5 gwiazdek`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < n ? "fill-karolina text-karolina" : "text-muted-foreground/40"} />
      ))}
    </div>
  );
}
