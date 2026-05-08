import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/rodzic/regulamin")({
  head: () => ({ meta: [{ title: "Regulamin — EduMila" }] }),
  component: Reg,
});

const items = [
  { t: "Rezerwacja terminu", d: "Termin ustalamy mailowo lub telefonicznie. Potwierdzenie obowiązuje obie strony." },
  { t: "Odwoływanie lekcji", d: "Lekcję można odwołać bez kosztu do 24 godzin przed jej rozpoczęciem." },
  { t: "Spóźnienia", d: "Lekcja kończy się o ustalonej godzinie. Spóźnienie ucznia nie wydłuża spotkania." },
  { t: "Płatność", d: "Po lekcji (BLIK / przelew) lub z góry za pakiet. Faktura na życzenie." },
  { t: "Pakiety", d: "Lekcje z pakietu można wykorzystać w ciągu 6 miesięcy od zakupu." },
  { t: "Materiały", d: "Notatki z lekcji online udostępniam uczniowi po zajęciach." },
];

function Reg() {
  return (
    <>
      <PageHero eyebrow="Regulamin" tone="parent" title="Krótko i wprost" subtitle="Bez ukrytych zasad. Wszystko, co warto wiedzieć przed startem." />
      <Section>
        <ol className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <li key={it.t} className="card-surface p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-parent mb-2">§ {i + 1}</div>
              <h3 className="font-display text-lg font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
