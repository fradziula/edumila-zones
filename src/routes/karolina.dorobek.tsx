import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/karolina/dorobek")({
  head: () => ({ meta: [{ title: "Dorobek — Karolina | EduMila" }] }),
  component: D,
});

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="card-surface p-7 text-center">
      <div className="font-display text-4xl md:text-5xl font-semibold text-karolina">{v}</div>
      <div className="mt-2 text-sm text-muted-foreground">{l}</div>
    </div>
  );
}

function D() {
  return (
    <>
      <PageHero eyebrow="Dorobek" tone="karolina" title="Liczby z kilku ostatnich lat" />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <Stat v="1000+" l="przeprowadzonych lekcji" />
          <Stat v="100+" l="uczniów" />
          <Stat v="2" l="przedmioty: matematyka i chemia" />
        </div>
      </Section>
      <Section title="Czym się zajmuję">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Korepetycje 1 na 1 i w parach.",
            "Przygotowanie do egzaminu ósmoklasisty.",
            "Przygotowanie do matury podstawowej i rozszerzonej.",
            "Praca z uczniami z trudnościami i z bardzo dobrymi.",
          ].map((x) => (
            <li key={x} className="card-surface px-5 py-4 text-sm">{x}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
