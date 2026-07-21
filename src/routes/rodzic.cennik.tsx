import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/rodzic/cennik")({
  head: () => ({
    meta: [
      { title: "Cennik — EduMila" },
      { name: "description", content: "Ceny lekcji indywidualnych, grupowych i pakietów." },
    ],
  }),
  component: Cennik,
});

const single = [
  { t: "60 minut", price: "80 zł", d: "Pojedyncza lekcja indywidualna." },
  { t: "90 minut", price: "110 zł", d: "Dłuższa praca, dobra na trudne tematy.", featured: true },
  { t: "Zajęcia w parze", price: "60 zł/osobę", d: "Min. 2 osoby. Cena za osobę." },
];

const packs = [
  {
    t: "Promocyjny pakiet",
    off: "75 zł / lekcja",
    d: "Przy zakupie minimum 12 lekcji obowiązuje promocyjna cena 75 zł za lekcję.",
    featured: true,
  },
];

function Cennik() {
  return (
    <>
      <PageHero
        eyebrow="Cennik"
        tone="parent"
        title="Jasne ceny, bez gwiazdek."
        subtitle="Płatność po lekcji lub z góry za pakiet. Faktury — na życzenie."
      />
      <Section title="Pojedyncze lekcje">
        <div className="grid gap-5 md:grid-cols-3">
          {single.map((p) => (
            <div
              key={p.t}
              className={`card-surface p-7 relative ${p.featured ? "glow-parent ring-1 ring-parent/40" : ""}`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-parent text-background font-medium">
                  Polecane
                </span>
              )}
              <div className="text-sm text-muted-foreground">{p.t}</div>
              <div className="mt-2 font-display text-4xl font-semibold">{p.price}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        title="Pakiety"
        subtitle="Jeden raz płacisz, potem korzystasz z lekcji w swoim tempie."
      >
        <div className="grid gap-5 md:grid-cols-1">
          {packs.map((p) => (
            <div
              key={p.t}
              className={`card-surface p-7 relative ${p.featured ? "glow-parent ring-1 ring-parent/50" : ""}`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-parent text-background font-medium inline-flex items-center gap-1">
                  <Sparkles size={12} /> Najczęściej wybierany
                </span>
              )}
              <div className="font-display text-xl font-semibold">{p.t}</div>
              <div className="mt-2 text-3xl font-semibold text-parent">{p.off}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check size={16} className="text-parent mt-0.5" /> Ważność 6 miesięcy
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-parent mt-0.5" /> Możliwość przesunięcia terminu
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/kontakt"
            className="inline-flex px-5 py-3 rounded-full bg-foreground text-background font-medium"
          >
            Zarezerwuj lekcję
          </Link>
          <Link
            to="/rodzic/regulamin"
            className="inline-flex px-5 py-3 rounded-full border border-border"
          >
            Regulamin
          </Link>
        </div>
      </Section>
    </>
  );
}
