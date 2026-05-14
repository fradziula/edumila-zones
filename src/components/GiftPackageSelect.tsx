import { useEffect, useRef, useState } from "react";

export type GiftPackage = {
  packageId: string;
  lessonsCount: number;
  pricePln: number;
  displayName: string;
};

export function GiftPackageSelect({
  packages,
  value,
  onChange,
}: {
  packages: GiftPackage[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = packages.find((p) => p.packageId === value) ?? null;

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-input border border-border hover:bg-input/80 focus:outline-none focus:ring-2 focus:ring-parent/40 transition text-left"
      >
        <span className={selected ? "font-display text-base" : "text-muted-foreground text-sm"}>
          {selected ? selected.displayName : "Wybierz pakiet"}
        </span>
        <svg
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 w-full max-h-72 overflow-auto rounded-xl border border-border bg-card shadow-card backdrop-blur p-1"
        >
          {packages.map((p) => {
            const active = p.packageId === value;
            return (
              <li key={p.packageId}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(p.packageId);
                    setOpen(false);
                  }}
                  className={`w-full flex items-baseline justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition ${
                    active
                      ? "border border-parent bg-parent/10"
                      : "border border-transparent hover:bg-input/70"
                  }`}
                >
                  <span className="font-display text-base">
                    {p.lessonsCount} {lessonsLabel(p.lessonsCount)}
                  </span>
                  <span className="text-sm font-semibold">{p.pricePln} zł</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function lessonsLabel(n: number): string {
  if (n === 1) return "lekcja";
  if (n >= 2 && n <= 4) return "lekcje";
  return "lekcji";
}

export function formatGiftDisplay(p: GiftPackage): string {
  return `${p.lessonsCount} ${lessonsLabel(p.lessonsCount)} — ${p.pricePln} zł`;
}