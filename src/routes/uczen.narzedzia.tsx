import { createFileRoute } from "@tanstack/react-router";
import { PenSquare, Video, FileText, Lock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/uczen/narzedzia")({
  head: () => ({ meta: [{ title: "Narzędzia — EduMila" }] }),
  component: Tools,
});

const tools = [
  { icon: Video, t: "Google Meet / Skype / Teams", d: "Wybierasz, na czym Ci wygodniej." },
  { icon: PenSquare, t: "Tablica graficzna", d: "Piszę i rysuję na żywo. Wszystko jak na zwykłej tablicy." },
  { icon: FileText, t: "Notatki po lekcji", d: "Dostajesz zapis tego, co zrobiliśmy." },
  { icon: Lock, t: "Quizy i materiały online", d: "W przygotowaniu.", soon: true },
];

function Tools() {
  return (
    <>
      <PageHero eyebrow="Narzędzia" tone="student" title="Czego używamy na lekcjach" />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {tools.map((t) => (
            <div key={t.t} className={`card-surface p-6 flex gap-4 ${t.soon ? "opacity-70" : ""}`}>
              <div className="shrink-0 w-11 h-11 rounded-xl bg-student-soft text-student flex items-center justify-center"><t.icon size={18}/></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{t.t}</h3>
                  {t.soon && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">W przygotowaniu</span>}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
