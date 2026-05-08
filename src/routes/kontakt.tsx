import { createFileRoute } from "@tanstack/react-router";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/kontakt")({
  head: () => ({ meta: [{ title: "Kontakt — EduMila" }, { name: "description", content: "Telefon, e-mail, Instagram. Wadowice + online." }] }),
  component: K,
});

function K() {
  return (
    <>
      <PageHero eyebrow="Kontakt" title="Napisz lub zadzwoń" subtitle="Najszybciej odpowiadam wieczorem. Pierwsza rozmowa jest bez zobowiązań." />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-3">
            <a href="tel:667541916" className="card-surface p-5 flex items-center gap-4 hover:bg-surface-2 transition">
              <div className="w-11 h-11 rounded-xl bg-karolina-soft text-karolina flex items-center justify-center"><Phone size={18}/></div>
              <div><div className="text-xs text-muted-foreground">Telefon</div><div className="font-medium">667 541 916</div></div>
            </a>
            <a href="mailto:edumila.kontakt@gmail.com" className="card-surface p-5 flex items-center gap-4 hover:bg-surface-2 transition">
              <div className="w-11 h-11 rounded-xl bg-parent-soft text-parent flex items-center justify-center"><Mail size={18}/></div>
              <div><div className="text-xs text-muted-foreground">E-mail</div><div className="font-medium">edumila.kontakt@gmail.com</div></div>
            </a>
            <a href="https://instagram.com/korepetycje_edumila" target="_blank" rel="noreferrer" className="card-surface p-5 flex items-center gap-4 hover:bg-surface-2 transition">
              <div className="w-11 h-11 rounded-xl bg-student-soft text-student flex items-center justify-center"><AtSign size={18}/></div>
              <div><div className="text-xs text-muted-foreground">Instagram</div><div className="font-medium">@korepetycje_edumila</div></div>
            </a>
            <div className="card-surface p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-muted text-muted-foreground flex items-center justify-center"><MapPin size={18}/></div>
              <div><div className="text-xs text-muted-foreground">Lokalizacja</div><div className="font-medium">Wadowice + online (cała Polska)</div></div>
            </div>
          </div>

          <form className="card-surface p-7 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-display text-xl font-semibold">Wyślij wiadomość</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Imię" />
              <Field label="E-mail" type="email" />
            </div>
            <Field label="Czego dotyczy?" />
            <label className="text-sm">
              <span className="block mb-1.5 text-muted-foreground">Wiadomość</span>
              <textarea rows={5} className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-karolina/40" />
            </label>
            <div className="flex justify-between items-center pt-2">
              <p className="text-xs text-muted-foreground">Odpowiadam w ciągu 24h.</p>
              <button className="px-5 py-3 rounded-full bg-foreground text-background font-medium">Wyślij</button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="text-sm">
      <span className="block mb-1.5 text-muted-foreground">{label}</span>
      <input type={type} className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-karolina/40" />
    </label>
  );
}
