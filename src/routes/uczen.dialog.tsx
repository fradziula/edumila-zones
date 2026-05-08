import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/uczen/dialog")({
  head: () => ({ meta: [{ title: "Pierwsza rozmowa — EduMila" }] }),
  component: D,
});

const dialog = [
  { who: "Karolina", text: "Cześć! Z czym konkretnie chcesz popracować?" },
  { who: "Uczeń", text: "Matma. Sprawdzian z funkcji w piątek, a ja kompletnie tego nie ogarniam." },
  { who: "Karolina", text: "Spokojnie. Pokaż mi kartkówki i zeszyt, zobaczymy, gdzie się gubisz." },
  { who: "Uczeń", text: "Ok. Tylko nie wiem, czy zdążymy." },
  { who: "Karolina", text: "Zrobimy tyle, ile się da. Od najważniejszego." },
];

function D() {
  return (
    <>
      <PageHero eyebrow="Pierwsza rozmowa" tone="student" title="Tak to mniej więcej wygląda" subtitle="Nie ma tu sztywnego scenariusza. Najpierw słucham, potem mówię, co możemy zrobić." />
      <Section>
        <div className="max-w-2xl space-y-3">
          {dialog.map((d, i) => (
            <div key={i} className={`card-surface p-5 max-w-[85%] ${d.who === "Karolina" ? "" : "ml-auto bg-student-soft border-student/30"}`}>
              <div className={`text-xs mb-1 ${d.who === "Karolina" ? "text-karolina" : "text-student"}`}>{d.who}</div>
              <p className="text-foreground/90">{d.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/kontakt" className="inline-flex px-5 py-3 rounded-full bg-foreground text-background font-medium">Napisz do mnie</Link>
        </div>
      </Section>
    </>
  );
}
