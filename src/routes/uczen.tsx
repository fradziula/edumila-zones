import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/uczen")({
  head: () => ({ meta: [{ title: "Strefa Ucznia — EduMila" }] }),
  component: StudentLayout,
});

const tabs = [
  { to: "/uczen", label: "Start" },
  { to: "/uczen/jak-to-dziala", label: "Jak to działa" },
  { to: "/uczen/narzedzia", label: "Narzędzia" },
  { to: "/uczen/pytania", label: "Pytania" },
  { to: "/uczen/opinie", label: "Opinie" },
  { to: "/uczen/dialog", label: "Pierwsza rozmowa" },
];

function StudentLayout() {
  const loc = useLocation();
  return (
    <>
      <div className="border-b border-border bg-student-soft/40 sticky top-16 z-40 backdrop-blur-xl">
        <div className="container-page flex gap-1 overflow-x-auto py-3">
          {tabs.map((t) => {
            const active = loc.pathname === t.to;
            return (
              <Link key={t.to} to={t.to}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition ${active ? "bg-student text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-surface"}`}>
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </>
  );
}
