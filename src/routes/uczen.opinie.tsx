import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ReviewCard } from "@/components/ReviewCard";

export const Route = createFileRoute("/uczen/opinie")({
  head: () => ({ meta: [{ title: "Opinie uczniów — EduMila" }] }),
  component: O,
});

const r = [
  { name: "Wojtek K.", text: "Bałem się matmy od podstawówki. Teraz po prostu siadam i robię." },
  { name: "Ola N.", text: "Pani Karolina tłumaczy chemię tak, że w końcu coś z tego wynika." },
  { name: "Kuba M.", text: "Konkretnie, bez lania wody. Dobre tempo." },
  { name: "Maja L.", text: "Spokojnie odpowiada na każde pytanie, nawet to dziesiąte." },
  { name: "Piotr W.", text: "Dzięki lekcjom przestałem panikować przed sprawdzianami." },
  { name: "Zosia D.", text: "Lubię tu wracać. Po prostu się uczy." },
];

function O() {
  return (
    <>
      <PageHero eyebrow="Opinie" tone="student" title="Co mówią inni uczniowie" />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {r.map((x) => <ReviewCard key={x.name} {...x} />)}
        </div>
      </Section>
    </>
  );
}
