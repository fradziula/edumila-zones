import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/uczen/")({
  head: () => ({ meta: [{ title: "Uczeń — EduMila" }] }),
  component: StuHome,
});

const familiar = [
  "Patrzę na zadanie i nie wiem, od czego zacząć.",
  "Na lekcji wszystko rozumiem, w domu nic.",
  "Sprawdzian za tydzień, a ja jeszcze nie zacząłem.",
  "Nie ogarniam wzorów, ale zadania bym chciał zrobić.",
];

function StuHome() {
  return (
    <>
      <PageHero
        eyebrow="Strefa Ucznia"
        tone="student"
        title={<>Lekcje, które <span className="text-student">faktycznie pomagają</span>.</>}
        subtitle="Bez krzyku, bez wstydu, bez wyścigu. Tłumaczę spokojnie, tyle razy ile trzeba."
      >
        <Link to="/uczen/dialog" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-medium">
          Zobacz, jak wygląda pierwsza rozmowa <ArrowRight size={16} />
        </Link>
      </PageHero>

      <Section title="Brzmi znajomo?">
        <div className="grid gap-4 md:grid-cols-2">
          {familiar.map((f) => (
            <div key={f} className="card-surface p-6">
              <p className="text-foreground/90">{f}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Spokojnie. To są typowe rzeczy. Da się je rozłożyć na czynniki.</p>
      </Section>

      <Section eyebrow="Co dalej?" title="Wybierz, co Cię interesuje">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { to: "/uczen/jak-to-dziala", t: "Jak wygląda lekcja", d: "Krok po kroku, bez ściemy." },
            { to: "/uczen/narzedzia", t: "Narzędzia", d: "Czego używamy podczas pracy." },
            { to: "/uczen/pytania", t: "Pytania", d: "Krótkie odpowiedzi na typowe rzeczy." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="card-surface p-6 hover:-translate-y-0.5 transition">
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-student">Otwórz <ArrowRight size={14}/></div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
