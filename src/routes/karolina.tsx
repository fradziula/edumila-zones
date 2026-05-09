import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/karolina")({
  head: () => ({ meta: [{ title: "Strefa Karoliny — EduMila" }] }),
  component: KLayout,
});

function KLayout() {
  return <Outlet />;
}
