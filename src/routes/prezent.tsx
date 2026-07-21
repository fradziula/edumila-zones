import { createFileRoute } from "@tanstack/react-router";
import { PurchaseFlow } from "./zakup";

export const Route = createFileRoute("/prezent")({
  head: () => ({
    meta: [
      { title: "Prezent — pakiet lekcji | EduMila" },
      {
        name: "description",
        content:
          "Podaruj pakiet korepetycji z matematyki lub chemii i przejdź przez bezpieczny proces zamówienia.",
      },
    ],
  }),
  component: GiftPurchasePage,
});

function GiftPurchasePage() {
  return <PurchaseFlow mode="gift" />;
}
