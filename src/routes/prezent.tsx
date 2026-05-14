import { createFileRoute } from "@tanstack/react-router";
import { Gift, Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/prezent")({
  head: () => ({
    meta: [
      { title: "Prezent — Sponsoruj lekcje | EduMila" },
      { name: "description", content: "Podaruj bliskiej osobie lekcje z matematyki lub chemii. Strona dla babć, dziadków, cioć i wujków." },
      { property: "og:title", content: "Prezent — Sponsoruj lekcje | EduMila" },
      { property: "og:description", content: "Podaruj bliskiej osobie lekcje z matematyki lub chemii." },
    ],
  }),
  component: Prezent,
});

const packs = [
  { t: "1 lekcja", price: "80 zł", d: "Drobny gest. Pierwsza lekcja jako prezent." },
  { t: "4 lekcje", price: "304 zł", d: "Cały miesiąc spokojnej nauki.", featured: true },
  { t: "16 lekcji", price: "1 088 zł", d: "Maturalny finisz lub solidny semestr." },
];

function Prezent() {
  return (
    <>
      <PageHero
        eyebrow="Sponsoruj lekcje"
        tone="parent"
        title={<>Najpiękniejszy prezent? <span className="text-parent">Spokój przy nauce.</span></>}
        subtitle="Strona dla babć, dziadków, cioć i wujków. Możesz podarować dziecku konkretne lekcje, nie kolejną zabawkę."
      />
      <Section title="Wybierz pakiet">
        <div className="grid gap-5 md:grid-cols-3">
          {packs.map((p) => (
            <div key={p.t} className={`card-surface p-7 relative ${p.featured ? "ring-1 ring-parent/50 glow-parent" : ""}`}>
              {p.featured && <span className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-parent text-background font-medium">Najpopularniejszy</span>}
              <Gift className="text-parent mb-4" />
              <div className="font-display text-xl font-semibold">{p.t}</div>
              <div className="mt-2 text-3xl font-semibold">{p.price}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Dane do prezentu">
        <form className="card-surface p-7 grid gap-4 md:grid-cols-2 max-w-3xl" onSubmit={(e) => e.preventDefault()}>
          <Field label="Twoje imię" />
          <Field label="Twój e-mail" type="email" />
          <Field label="Imię ucznia" />
          <Field label="Krótka dedykacja (opcjonalnie)" />
          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs text-muted-foreground inline-flex items-center gap-2"><Heart size={14}/> Płatność uruchomimy w kolejnym kroku.</p>
            <button className="px-5 py-3 rounded-full bg-parent text-background font-medium">Przejdź do płatności</button>
          </div>
        </form>
      </Section>
      <Section>
        <div className="card-surface p-8 max-w-3xl">
          <p className="font-hand text-2xl text-parent">„Babciu, dziadku — najlepszy prezent to spokojna głowa przed sprawdzianem.”</p>
          <p className="mt-3 text-sm text-muted-foreground">Po opłaceniu prześlemy uczniowi prosty bon i ustalimy terminy lekcji.</p>
        </div>
      </Section>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="text-sm">
      <span className="block mb-1.5 text-muted-foreground">{label}</span>
      <input type={type} className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-parent/40" />
    </label>
  );
}