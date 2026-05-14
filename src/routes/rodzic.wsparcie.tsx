import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GiftPackageSelect, formatGiftDisplay, type GiftPackage } from "@/components/GiftPackageSelect";

export const Route = createFileRoute("/rodzic/wsparcie")({
  head: () => ({
    meta: [
      { title: "Prezent — Sponsoruj lekcje | EduMila" },
      { name: "description", content: "Zapewnij lekcję uczniowi. Prezent od babci, dziadka, cioci lub wujka." },
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

// Pakiety prezentowe. Do Stripe wysyłamy WYŁĄCZNIE `packageId`;
// backend mapuje go na Stripe Price ID i weryfikuje cenę.
const giftPackages: GiftPackage[] = [
  { packageId: "gift-1-lessons", lessonsCount: 1, pricePln: 80, displayName: "1 lekcja — 80 zł" },
  { packageId: "gift-2-lessons", lessonsCount: 2, pricePln: 156, displayName: "2 lekcje — 156 zł" },
  { packageId: "gift-3-lessons", lessonsCount: 3, pricePln: 231, displayName: "3 lekcje — 231 zł" },
  { packageId: "gift-4-lessons", lessonsCount: 4, pricePln: 304, displayName: "4 lekcje — 304 zł" },
  { packageId: "gift-5-lessons", lessonsCount: 5, pricePln: 375, displayName: "5 lekcji — 375 zł" },
  { packageId: "gift-6-lessons", lessonsCount: 6, pricePln: 445, displayName: "6 lekcji — 445 zł" },
  { packageId: "gift-7-lessons", lessonsCount: 7, pricePln: 514, displayName: "7 lekcji — 514 zł" },
  { packageId: "gift-8-lessons", lessonsCount: 8, pricePln: 582, displayName: "8 lekcji — 582 zł" },
  { packageId: "gift-9-lessons", lessonsCount: 9, pricePln: 649, displayName: "9 lekcji — 649 zł" },
  { packageId: "gift-10-lessons", lessonsCount: 10, pricePln: 715, displayName: "10 lekcji — 715 zł" },
  { packageId: "gift-11-lessons", lessonsCount: 11, pricePln: 780, displayName: "11 lekcji — 780 zł" },
  { packageId: "gift-12-lessons", lessonsCount: 12, pricePln: 844, displayName: "12 lekcji — 844 zł" },
  { packageId: "gift-13-lessons", lessonsCount: 13, pricePln: 907, displayName: "13 lekcji — 907 zł" },
  { packageId: "gift-14-lessons", lessonsCount: 14, pricePln: 969, displayName: "14 lekcji — 969 zł" },
  { packageId: "gift-15-lessons", lessonsCount: 15, pricePln: 1029, displayName: "15 lekcji — 1029 zł" },
  { packageId: "gift-16-lessons", lessonsCount: 16, pricePln: 1088, displayName: "16 lekcji — 1088 zł" },
];

function Prezent() {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = giftPackages.find((p) => p.packageId === selectedPackageId) ?? null;
  // Stan formularza zgodny z późniejszą integracją Stripe.
  // Do backendu wysyłamy tylko `selectedPackageId`; cena jest weryfikowana po stronie serwera.
  const formState = {
    selectedPackageId,
    selectedLessonsCount: selected?.lessonsCount ?? null,
    selectedPricePln: selected?.pricePln ?? null,
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.selectedPackageId) {
      setError("Wybierz pakiet lekcji.");
      return;
    }
    setError(null);
    // TODO(Stripe): POST { packageId } -> server function -> Stripe Checkout Session.
  }

  return (
    <section className="container-page py-20 md:py-28">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-7xl md:text-9xl">
          Prezent
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Zapewnij Lekcję Uczniowi
        </p>
      </header>

      <div className="mt-20 md:mt-28 grid gap-12 md:gap-16 lg:grid-cols-[1fr_minmax(0,420px)] items-start">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-parent">
            Ambasadorzy Nauki
          </h2>
          <ul className="mt-8 space-y-4 text-lg md:text-xl text-foreground/90">
            {ambasadorzy.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <form
          className="card-surface p-8 md:p-10 flex flex-col gap-6 w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Formularz</h2>

          <div className="flex flex-col gap-5 mt-2">
            <Field label="imie ucznia" />
            <Field label="Numer telefonu" type="tel" />
            <Field label="adres email" type="email" />
          </div>

          <fieldset className="mt-4 flex flex-col gap-3">
            <legend className="font-display text-xl font-semibold mb-1">
              Wybierz ilość lekcji
            </legend>
            <p className="text-sm text-muted-foreground -mt-1 mb-2">
              Wybierz pakiet prezentowy. Cena zostanie przypisana automatycznie do wybranego pakietu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {giftPackages.map((p) => {
                const active = selectedPackageId === p.packageId;
                return (
                  <label
                    key={p.packageId}
                    className={`cursor-pointer rounded-xl border px-4 py-3 transition select-none ${
                      active
                        ? "border-parent bg-parent/10 ring-2 ring-parent/40"
                        : "border-border bg-input/40 hover:bg-input/70"
                    }`}
                  >
                    <input
                      type="radio"
                      name="giftPackage"
                      value={p.packageId}
                      checked={active}
                      onChange={() => {
                        setSelectedPackageId(p.packageId);
                        setError(null);
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg font-semibold">
                        {p.lessonsCount} {p.lessonsCount === 1 ? "lekcja" : "lekcji"}
                      </span>
                      <span className="text-base font-semibold">{p.pricePln} zł</span>
                    </div>
                  </label>
                );
              })}
            </div>

            {selected && (
              <p className="mt-3 text-sm text-foreground/80">
                Wybrany pakiet: <span className="font-semibold">{selected.displayName}</span>
              </p>
            )}
            {error && (
              <p className="mt-2 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
          </fieldset>

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
