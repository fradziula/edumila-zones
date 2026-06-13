import { createFileRoute } from "@tanstack/react-router";
import { AtSign, Mail, MapPin, Phone, Loader2, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { supabase } from "@/integrations/supabase/client";

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
              <div><div className="text-xs text-muted-foreground">Adres</div><div className="font-medium">ul. Pniaki 190, 34-124 Klecza Dolna</div></div>
            </div>
            <div className="card-surface p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-muted text-muted-foreground flex items-center justify-center"><MapPin size={18}/></div>
              <div><div className="text-xs text-muted-foreground">Lokalizacja</div><div className="font-medium">Wadowice + online (cała Polska)</div></div>
            </div>
            <div className="card-surface p-5">
              <div className="text-xs text-muted-foreground mb-1">Dane firmy</div>
              <div className="font-medium">Korepetycje- Karolina Widlarz</div>
              <div className="text-sm text-muted-foreground mt-1">NIP: 5512667603</div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactForm() {
  const [state, setState] = useState<
    { kind: "idle" } | { kind: "loading" } | { kind: "ok" } | { kind: "error"; message: string }
  >({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setState({ kind: "error", message: "Uzupełnij imię, e-mail i wiadomość." });
      return;
    }
    setState({ kind: "loading" });
    try {
      const { data, error } = await supabase.functions.invoke("send-form-email", {
        body: { kind: "contact", name, email, subject, message },
      });
      if (error) throw new Error(error.message || "Błąd sieci.");
      if (!data?.ok) {
        throw new Error(
          `Wysyłka nie powiodła się: ${data?.error ?? "unknown"}${
            data?.details ? ` (${JSON.stringify(data.details)})` : ""
          }`,
        );
      }
      setState({ kind: "ok" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState({ kind: "error", message: (err as Error)?.message ?? "Nie udało się wysłać wiadomości." });
    }
  }

  if (state.kind === "ok") {
    return (
      <div className="card-surface p-7 grid gap-3 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-parent/15 text-parent flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="font-display text-xl font-semibold">Wiadomość wysłana</h3>
        <p className="text-sm text-muted-foreground">Dziękuję! Odpowiem najszybciej, jak będzie to możliwe.</p>
        <button
          type="button"
          onClick={() => setState({ kind: "idle" })}
          className="mx-auto mt-2 px-5 py-2.5 rounded-full border border-border text-sm hover:bg-input/50 transition"
        >
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  const loading = state.kind === "loading";
  return (
    <form className="card-surface p-7 grid gap-4" onSubmit={onSubmit} noValidate>
      <h3 className="font-display text-xl font-semibold">Wyślij wiadomość</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Imię" name="name" required />
        <Field label="E-mail" name="email" type="email" required />
      </div>
      <Field label="Czego dotyczy?" name="subject" />
      <label className="text-sm">
        <span className="block mb-1.5 text-muted-foreground">Wiadomość *</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-karolina/40"
        />
      </label>
      {state.kind === "error" && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 flex items-start gap-2" role="alert">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}
      <div className="flex justify-between items-center pt-2 gap-3">
        <p className="text-xs text-muted-foreground">Odpowiadam w ciągu 24h.</p>
        <button
          disabled={loading}
          className="px-5 py-3 rounded-full bg-foreground text-background font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Wysyłam…" : "Wyślij"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="text-sm">
      <span className="block mb-1.5 text-muted-foreground">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-karolina/40" />
    </label>
  );
}
