import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/karolina/historia")({
  head: () => ({ meta: [{ title: "Historia — Karolina | EduMila" }] }),
  component: H,
});

const items = [
  { y: "Początki", t: "Pierwsze korepetycje", d: "Zaczęłam od pomocy znajomym z liceum. Okazało się, że mam do tego głowę i cierpliwość." },
  { y: "Rok po roku", t: "Kilkudziesięciu uczniów", d: "Z polecenia trafiali kolejni — od podstawówki, przez liceum, po maturę rozszerzoną." },
  { y: "Dziś", t: "Marka EduMila", d: "Postawiłam markę, żeby praca była uporządkowana, a uczniowie mieli jasne ramy." },
];

function H() {
  return (
    <>
      <PageHero eyebrow="Historia" tone="karolina" title="Krótko, jak to się zaczęło" />
      <Section>
        <ol className="space-y-5 max-w-3xl">
          {items.map((it) => (
            <li key={it.t} className="card-surface p-7 flex gap-6">
              <div className="font-display text-karolina text-lg w-28 shrink-0">{it.y}</div>
              <div>
                <h3 className="font-display text-xl font-semibold">{it.t}</h3>
                <p className="mt-2 text-muted-foreground">{it.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
