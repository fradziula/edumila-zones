import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/karolina/metoda")({
  head: () => ({ meta: [{ title: "Metoda — Karolina | EduMila" }] }),
  component: M,
});

const principles = [
  { t: "Najpierw zrozumieć", d: "Wzór i zadanie później. Najpierw musi być sens." },
  { t: "Tempo ucznia", d: "Lepiej zrobić mniej, ale dobrze, niż przelecieć po wszystkim." },
  { t: "Bez wstydu", d: "Wszystkie pytania są w porządku. Brak pytań to dopiero problem." },
  { t: "Konkretna informacja zwrotna", d: "Mówię, co działa i nad czym warto popracować. Bez owijania." },
];

function M() {
  return (
    <>
      <PageHero eyebrow="Metoda" tone="karolina" title="Jak pracuję" />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.t} className="card-surface p-7 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-karolina/10 blur-2xl" />
              <h3 className="font-display text-xl font-semibold">{p.t}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
