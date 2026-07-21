import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type ZoneKey = "rodzic" | "uczen" | "karolina";

const zones: {
  key: ZoneKey;
  to: "/rodzic" | "/uczen" | "/karolina";
  label: string;
  dot: string;
  active: string;
  soft: string;
}[] = [
  {
    key: "rodzic",
    to: "/rodzic",
    label: "Rodzic",
    dot: "bg-parent",
    active: "bg-parent text-background",
    soft: "bg-parent-soft/40",
  },
  {
    key: "uczen",
    to: "/uczen",
    label: "Uczeń",
    dot: "bg-student",
    active: "bg-student text-background",
    soft: "bg-student-soft/40",
  },
  {
    key: "karolina",
    to: "/karolina",
    label: "Karolina",
    dot: "bg-karolina",
    active: "bg-karolina text-background",
    soft: "bg-karolina-soft/40",
  },
];

const subNav: Record<ZoneKey, { to: string; label: string }[]> = {
  rodzic: [
    { to: "/rodzic", label: "Strona główna" },
    { to: "/rodzic/oferta", label: "Oferta" },
    { to: "/rodzic/cennik", label: "Cennik" },
    { to: "/rodzic/opinie", label: "Opinie" },
    { to: "/rodzic/wsparcie", label: "Prezent" },
    { to: "/rodzic/regulamin", label: "Regulamin" },
  ],
  uczen: [
    { to: "/uczen", label: "Strona główna" },
    { to: "/uczen/jak-to-dziala", label: "Jak to działa" },
    { to: "/uczen/pytania", label: "Pytania" },
    { to: "/uczen/opinie", label: "Opinie" },
    { to: "/uczen/dialog", label: "Pierwsza rozmowa" },
  ],
  karolina: [
    { to: "/karolina", label: "Strona główna" },
    { to: "/karolina/historia", label: "Historia" },
    { to: "/karolina/metoda", label: "Metoda" },
    { to: "/karolina/dorobek", label: "Dorobek" },
  ],
};

function activeZoneFromPath(pathname: string): ZoneKey | null {
  if (pathname.startsWith("/rodzic")) return "rodzic";
  if (pathname.startsWith("/uczen")) return "uczen";
  if (pathname.startsWith("/karolina")) return "karolina";
  return null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const activeZone = activeZoneFromPath(loc.pathname);
  const zone = activeZone ? zones.find((z) => z.key === activeZone)! : null;
  const subLinks = activeZone ? subNav[activeZone] : [];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
      {/* TOP BAR */}
      <div className="container-page flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="font-display text-xl font-semibold tracking-tight">
            Edu<span className="text-karolina">Mila</span>
          </span>
        </Link>

        {/* Pill-style 3-zone toggle */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border bg-surface/60 backdrop-blur">
          {zones.map((z) => {
            const isActive = activeZone === z.key;
            return (
              <Link
                key={z.key}
                to={z.to}
                className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition ${
                  isActive
                    ? `${z.active} font-medium shadow-[0_0_24px_-8px_currentColor]`
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-background/70" : z.dot}`}
                />
                {z.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/kontakt"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition"
          >
            Umów lekcję
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-surface"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* SECOND-LEVEL CONTEXTUAL NAV */}
      {zone && (
        <div className={`hidden md:block border-t border-border ${zone.soft}`}>
          <div className="container-page flex gap-1 overflow-x-auto py-2.5">
            {subLinks.map((l) => {
              const isActive = loc.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                    isActive
                      ? `${zone.active} font-medium`
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="container-page py-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {zones.map((z) => {
                const isActive = activeZone === z.key;
                return (
                  <Link
                    key={z.key}
                    to={z.to}
                    onClick={() => setOpen(false)}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border border-border ${
                      isActive
                        ? `${z.active} font-medium border-transparent`
                        : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-background/70" : z.dot}`}
                    />
                    {z.label}
                  </Link>
                );
              })}
            </div>

            {zone && (
              <div className="flex flex-col gap-1 pt-2 border-t border-border">
                {subLinks.map((l) => {
                  const isActive = loc.pathname === l.to;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        isActive
                          ? `${zone.active} font-medium`
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            )}

            <Link
              to="/kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center items-center px-4 py-2 rounded-full text-sm font-medium bg-foreground text-background"
            >
              Umów lekcję
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
