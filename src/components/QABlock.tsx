export function QABlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.q} className="card-surface p-6">
          <h3 className="font-display text-lg font-semibold mb-2">{it.q}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{it.a}</p>
        </div>
      ))}
    </div>
  );
}
