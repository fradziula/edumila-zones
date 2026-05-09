import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/uczen")({
  head: () => ({ meta: [{ title: "Strefa Ucznia — EduMila" }] }),
  component: StudentLayout,
});

function StudentLayout() {
  return <Outlet />;
}
