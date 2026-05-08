import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Calculator, FlaskConical, GraduationCap, Monitor, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/rodzic/oferta")({
  head: () => ({ meta: [{ title: "Oferta — EduMila" }, { name: "description", content: "Matematyka i chemia, klasy 4–8, liceum, matura. Online i w Wadowicach." }] }),
  component: Oferta,
});

const subjects = [
  { icon: Calculator, t: "Matematyka", d: "Od podstawówki po maturę rozszerzoną. Skupiamy się na zrozumieniu, nie na wkuwaniu wzorów." },
  { icon: FlaskConical, t: "Chemia", d: "Logika, równania, obliczenia stechiometryczne. Spokojnie układamy temat od początku." },
];

const levels = [
  "Klasy 4–8 szkoły podstawowej",
  "Egzamin ósmoklasisty",
  "Liceum",
  "Matura podstawowa",
  "Matura rozszerzona",
];

function Oferta() {
  return (
    <>
      <PageHero eyebrow="Oferta" tone="parent" title="Co prowadzę i dla kogo" />
      <Section title="Przedmioty">
        <div className="grid gap-5 md:grid-cols-2">
          {subjects.map((s) => (
            <div key={s.t} className="card-surface p-7">
              <div className="w-11 h-11 rounded-xl bg-parent-soft text-parent flex items-center justify-center mb-4">
                <s.icon size={20} />
              </div>
              <h3 className="font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Poziomy">
        <ul className="grid gap-3 md:grid-cols-2">
          {levels.map((l) => (
            <li key={l} className="card-surface px-5 py-4 flex items-center gap-3">
              <GraduationCap className="text-parent" size={18} />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Forma i miejsce">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card-surface p-6"><Monitor className="text-parent mb-3" /><h3 className="font-display text-lg font-semibold">Online</h3><p className="mt-2 text-sm text-muted-foreground">Google Meet, Skype lub MS Teams. Tablica graficzna i notatki po lekcji.</p></div>
          <div className="card-surface p-6"><MapPin className="text-parent mb-3" /><h3 className="font-display text-lg font-semibold">Wadowice</h3><p className="mt-2 text-sm text-muted-foreground">Lekcje stacjonarne — kameralne miejsce, spokojna atmosfera.</p></div>
          <div className="card-surface p-6"><Clock className="text-parent mb-3" /><h3 className="font-display text-lg font-semibold">Indywidualnie lub w parze</h3><p className="mt-2 text-sm text-muted-foreground">60 lub 90 minut. Można pracować 1 na 1 albo w mini-grupie 2 osób.</p></div>
        </div>
      </Section>
    </>
  );
}
