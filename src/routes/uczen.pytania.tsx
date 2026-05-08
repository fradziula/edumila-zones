import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { QABlock } from "@/components/QABlock";

export const Route = createFileRoute("/uczen/pytania")({
  head: () => ({ meta: [{ title: "Pytania — EduMila" }] }),
  component: Q,
});

function Q() {
  return (
    <>
      <PageHero eyebrow="Pytania" tone="student" title="Krótkie odpowiedzi na typowe rzeczy" />
      <Section>
        <QABlock items={[
          { q: "A jak nic nie umiem?", a: "To nie problem. Pierwsza lekcja jest właśnie po to, żeby zobaczyć, od czego zacząć." },
          { q: "Czy będzie zadana praca domowa?", a: "Czasem tak — krótka, sensowna. Jeśli nie zrobisz, nie ma kary. Ale szybciej idzie, jeśli robisz." },
          { q: "Mogę pisać między lekcjami?", a: "Tak, jeśli utknąłeś na zadaniu. Odpiszę, jak będę miała chwilę." },
        ]} />
      </Section>
    </>
  );
}
