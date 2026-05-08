import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/rodzic")({
  head: () => ({
    meta: [
      { title: "Strefa Rodzica — EduMila" },
      { name: "description", content: "Konkretne odpowiedzi dla rodziców: oferta, cennik, regulamin, opinie, sponsorowanie lekcji." },
    ],
  }),
  component: ParentLayout,
});

const tabs = [
  { to: "/rodzic", label: "Start", exact: true },
  { to: "/rodzic/oferta", label: "Oferta" },
  { to: "/rodzic/cennik", label: "Cennik" },
  { to: "/rodzic/opinie", label: "Opinie" },
  { to: "/rodzic/wsparcie", label: "Sponsoruj lekcje" },
  { to: "/rodzic/regulamin", label: "Regulamin" },
];

function ParentLayout() {
  const loc = useLocation();
  return (
    <>
      <div className="border-b border-border bg-parent-soft/40 sticky top-16 z-40 backdrop-blur-xl">
        <div className="container-page flex gap-1 overflow-x-auto py-3">
          {tabs.map((t) => {
            const active = t.exact ? loc.pathname === t.to : loc.pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                  active ? "bg-parent text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
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
