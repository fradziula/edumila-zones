import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/karolina")({
  head: () => ({ meta: [{ title: "Strefa Karoliny — EduMila" }] }),
  component: KLayout,
});

const tabs = [
  { to: "/karolina", label: "Start" },
  { to: "/karolina/historia", label: "Historia" },
  { to: "/karolina/metoda", label: "Metoda" },
  { to: "/karolina/dorobek", label: "Dorobek" },
];

function KLayout() {
  const loc = useLocation();
  return (
    <>
      <div className="border-b border-border bg-karolina-soft/40 sticky top-16 z-40 backdrop-blur-xl">
        <div className="container-page flex gap-1 overflow-x-auto py-3">
          {tabs.map((t) => {
            const active = loc.pathname === t.to;
            return (
              <Link key={t.to} to={t.to}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition ${active ? "bg-karolina text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-surface"}`}>
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
