import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const zones = [
  { to: "/rodzic", label: "Rodzic", color: "text-parent" },
  { to: "/uczen", label: "Uczeń", color: "text-student" },
  { to: "/karolina", label: "Karolina", color: "text-karolina" },
] as const;

const links = [
  { to: "/rodzic/cennik", label: "Cennik" },
  { to: "/uczen/jak-to-dziala", label: "Jak to działa" },
  { to: "/karolina/historia", label: "O Karolinie" },
  { to: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-xl font-semibold tracking-tight">
            Edu<span className="text-karolina">Mila</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition">
            Strona główna
          </Link>
          <div className="h-5 w-px bg-border mx-2" />
          {zones.map((z) => (
            <Link
              key={z.to}
              to={z.to}
              className={`px-3 py-2 text-sm font-medium ${z.color} hover:opacity-80 transition`}
            >
              {z.label}
            </Link>
          ))}
          <div className="h-5 w-px bg-border mx-2" />
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              {l.label}
            </Link>
          ))}
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
            className="lg:hidden p-2 rounded-md hover:bg-surface"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="container-page py-4 flex flex-col gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Strona główna</Link>
            {zones.map((z) => (
              <Link key={z.to} to={z.to} onClick={() => setOpen(false)} className={`px-3 py-2 text-sm font-medium ${z.color}`}>
                {z.label}
              </Link>
            ))}
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-muted-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
