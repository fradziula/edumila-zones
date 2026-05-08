import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ReviewCard } from "@/components/ReviewCard";
import { QABlock } from "@/components/QABlock";

export const Route = createFileRoute("/rodzic/")({
  head: () => ({ meta: [{ title: "Rodzic — EduMila" }, { name: "description", content: "Co warto wiedzieć przed pierwszą lekcją." }] }),
  component: ParentHome,
});

function ParentHome() {
  return (
    <>
      <PageHero
        eyebrow="Strefa Rodzica"
        tone="parent"
        title={<>Spokojne wsparcie w nauce, <span className="text-parent">bez presji.</span></>}
        subtitle="Matematyka i chemia — klasy 4–8, liceum, matura. Mówię prosto, jak wyglądają lekcje, ile to kosztuje i czego można się spodziewać."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/rodzic/oferta" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-medium">
            Zobacz ofertę <ArrowRight size={16} />
          </Link>
          <Link to="/rodzic/cennik" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-surface">
            Cennik
          </Link>
        </div>
      </PageHero>

      <Section title="Co dziecko dostaje na lekcjach">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Wytłumaczenie tematu krok po kroku — bez przeskakiwania.",
            "Zadania dobrane do poziomu, a nie do średniej klasy.",
            "Spokojne tempo i czas na pytania, nawet te 'głupie'.",
            "Krótkie podsumowanie po lekcji — co poszło, nad czym pracujemy dalej.",
          ].map((p) => (
            <div key={p} className="card-surface p-5 flex gap-3">
              <CheckCircle2 className="text-parent shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-foreground/90">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Najczęstsze pytania" title="Dobre, żeby wiedzieć">
        <QABlock items={[
          { q: "Jak wygląda pierwsza lekcja?", a: "Sprawdzam, gdzie uczeń jest naprawdę, a nie gdzie powinien być według programu. Bez sprawdzania z ocen." },
          { q: "Czy lekcje online działają?", a: "Tak. Korzystam z tablicy graficznej i zapisuję notatki. Po lekcji dziecko ma do nich dostęp." },
          { q: "Czy mogę być na pierwszej lekcji?", a: "Oczywiście. Część rodziców tak woli — szczególnie u młodszych dzieci." },
        ]} />
      </Section>

      <Section eyebrow="Opinie" title="Co mówią rodzice">
        <div className="grid gap-5 md:grid-cols-3">
          <ReviewCard name="Anna B." role="mama 8-klasisty" text="Syn idzie na lekcje bez marudzenia. Po kilku miesiącach widać różnicę w ocenach i w pewności siebie." />
          <ReviewCard name="Marta P." role="mama licealistki" text="Konkretne wytłumaczenia, dobry kontakt. Córka sama prosiła o więcej lekcji przed maturą." />
          <ReviewCard name="Tomasz W." role="tata 6-klasistki" text="Wreszcie ktoś, kto nie traktuje matematyki jak wyścigu. Spokojnie, krok po kroku." />
        </div>
      </Section>
    </>
  );
}
