import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ReviewCard } from "@/components/ReviewCard";

export const Route = createFileRoute("/rodzic/opinie")({
  head: () => ({ meta: [{ title: "Opinie rodziców — EduMila" }] }),
  component: Op,
});

const reviews = [
  { name: "Anna B.", role: "mama ósmoklasisty", text: "Syn przestał bać się matematyki. Po kilku miesiącach poprawił oceny i sam prosi o lekcje." },
  { name: "Marta P.", role: "mama licealistki", text: "Konkretne wyjaśnienia i dobry kontakt z dzieckiem. Polecam." },
  { name: "Tomasz W.", role: "tata 6-klasistki", text: "Spokojnie, bez wyścigów. Tak właśnie powinno wyglądać uczenie." },
  { name: "Joanna R.", role: "mama maturzysty", text: "Dobre tempo i duża cierpliwość. Syn idzie na maturę bardziej pewny siebie." },
  { name: "Piotr S.", role: "tata licealisty", text: "Karolina umie wytłumaczyć temat na kilka sposobów. To robi różnicę." },
  { name: "Magda K.", role: "mama 7-klasistki", text: "Jasne zasady i regularne podsumowania po lekcjach. Wiem, co się dzieje." },
];

function Op() {
  return (
    <>
      <PageHero eyebrow="Opinie" tone="parent" title="Słowa rodziców" subtitle="Krótkie, autentyczne komentarze po dłuższej współpracy." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => <ReviewCard key={r.name} {...r} />)}
        </div>
      </Section>
    </>
  );
}
