import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, BookOpen, PenLine, RefreshCcw } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/uczen/jak-to-dziala")({
  head: () => ({ meta: [{ title: "Jak to działa — EduMila" }] }),
  component: How,
});

const steps = [
  { icon: MessageCircle, t: "Krótka rozmowa", d: "Mówisz, co Cię interesuje, czego potrzebujesz i kiedy masz czas." },
  { icon: BookOpen, t: "Pierwsza lekcja", d: "Sprawdzamy, co już ogarniasz, a co trzeba poukładać. Bez ocen." },
  { icon: PenLine, t: "Pracujemy razem", d: "Tłumaczę temat, robisz przykłady. Pytasz, kiedy chcesz." },
  { icon: RefreshCcw, t: "Wracamy do trudnych miejsc", d: "Jak coś nie wchodzi za pierwszym razem — wracamy. To normalne." },
];

function How() {
  return (
    <>
      <PageHero eyebrow="Jak to działa" tone="student" title="Cztery kroki, bez tajemnic" />
      <Section>
        <ol className="grid gap-5 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.t} className="card-surface p-7 flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-student-soft text-student flex items-center justify-center">
                <s.icon size={20}/>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-student">Krok {i+1}</div>
                <h3 className="font-display text-lg font-semibold mt-1">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
