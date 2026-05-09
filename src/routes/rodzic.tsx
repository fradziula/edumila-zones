import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/rodzic")({
  head: () => ({
    meta: [
      { title: "Strefa Rodzica — EduMila" },
      { name: "description", content: "Konkretne odpowiedzi dla rodziców: oferta, cennik, regulamin, opinie, sponsorowanie lekcji." },
    ],
  }),
  component: ParentLayout,
});

function ParentLayout() {
  return <Outlet />;
}
