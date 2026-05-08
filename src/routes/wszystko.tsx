import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

export const Route = createFileRoute("/wszystko")({
  head: () => ({ meta: [{ title: "Cała strona — EduMila" }] }),
  component: All,
});

const groups = [
  {
    label: "Strefa Rodzica", color: "parent",
    links: [
      { to: "/rodzic", t: "Start" },
      { to: "/rodzic/oferta", t: "Oferta" },
      { to: "/rodzic/cennik", t: "Cennik" },
      { to: "/rodzic/opinie", t: "Opinie" },
      { to: "/rodzic/wsparcie", t: "Sponsoruj lekcje" },
      { to: "/rodzic/regulamin", t: "Regulamin" },
    ],
  },
  {
    label: "Strefa Ucznia", color: "student",
    links: [
      { to: "/uczen", t: "Start" },
      { to: "/uczen/jak-to-dziala", t: "Jak to działa" },
      { to: "/uczen/narzedzia", t: "Narzędzia" },
      { to: "/uczen/pytania", t: "Pytania" },
      { to: "/uczen/opinie", t: "Opinie" },
      { to: "/uczen/dialog", t: "Pierwsza rozmowa" },
    ],
  },
  {
    label: "Strefa Karoliny", color: "karolina",
    links: [
      { to: "/karolina", t: "Start" },
      { to: "/karolina/historia", t: "Historia" },
      { to: "/karolina/metoda", t: "Metoda" },
      { to: "/karolina/dorobek", t: "Dorobek" },
    ],
  },
] as const;

function All() {
  return (
    <>
      <PageHero eyebrow="Wszystko" title="Cała strona w jednym miejscu" subtitle="Mapa stron — wybierz, dokąd chcesz przejść." />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((g) => (
            <div key={g.label} className="card-surface p-6">
              <div className={`text-xs uppercase tracking-[0.2em] mb-4 ${g.color === "parent" ? "text-parent" : g.color === "student" ? "text-student" : "text-karolina"}`}>{g.label}</div>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.to}><Link to={l.to} className="text-foreground/90 hover:text-foreground underline-offset-4 hover:underline">{l.t}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Drobiazgi" title="EduMila w realu" subtitle="Coś od nas — kubki EduMila. Drobiazgi, które trafiają do uczniów po dłuższej współpracy.">
        <div className="grid gap-5 sm:grid-cols-2">
          {[1,2,3,4].map((n) => (
            <PhotoPlaceholder key={n} label={`TUTAJ WSTAW ZDJĘCIE KUBKA ${n}`} caption={`Kubek EduMila — ujęcie ${n}`} aspect="aspect-[4/3]" tone={n%2 ? "karolina":"default"} />
          ))}
        </div>
      </Section>
    </>
  );
}
