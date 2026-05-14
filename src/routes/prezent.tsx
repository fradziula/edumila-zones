import { createFileRoute } from "@tanstack/react-router";

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

const ambasadorzy = [
  "Babcia",
  "Dziadek",
  "Wujek",
  "Ciocia",
  "Rodzina",
  "Ludzie dobrej woli wspierający naukę",
];

const packs = [
  { t: "1 lekcja", price: "80 zł" },
  { t: "4 lekcje", price: "304 zł" },
  { t: "16 lekcji", price: "1 088 zł" },
];

function Prezent() {
  return (
    <section className="container-page py-20 md:py-28">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-7xl md:text-9xl">
          Prezent
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Zapewnij Lekcję Uczniowi
        </p>
      </header>

      {/* Two columns */}
      <div className="mt-20 md:mt-28 grid gap-12 md:gap-16 lg:grid-cols-[1fr_minmax(0,420px)] items-start">
        {/* Left: Ambasadorzy */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-parent">
            Ambasadorzy Nauki
          </h2>
          <ul className="mt-8 space-y-4 text-lg md:text-xl text-foreground/90">
            {ambasadorzy.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="mt-12 space-y-3">
            {packs.map((p) => (
              <div key={p.t} className="flex items-baseline justify-between border-b border-border/60 py-2 max-w-sm">
                <span className="text-sm text-muted-foreground">{p.t}</span>
                <span className="font-display text-xl font-semibold">{p.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <form
          className="card-surface p-8 md:p-10 flex flex-col gap-6 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Formularz</h2>

          <div className="flex flex-col gap-5 mt-2">
            <Field label="imie ucznia" />
            <Field label="Numer telefonu" type="tel" />
            <Field label="adres email" type="email" />
          </div>

          <button
            type="submit"
            className="mt-4 w-full px-6 py-4 rounded-full bg-parent text-background font-display text-xl font-semibold hover:bg-parent/90 transition"
          >
            Zapłać
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="text-sm">
      <span className="block mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-parent/40"
      />
    </label>
  );
}