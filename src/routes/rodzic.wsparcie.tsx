import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendGiftEmail } from "@/lib/send-gift-email.functions";
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
  { packageId: "gift-2-lessons", lessonsCount: 2, pricePln: 160, displayName: "2 lekcje — 160 zł" },
  { packageId: "gift-3-lessons", lessonsCount: 3, pricePln: 240, displayName: "3 lekcje — 240 zł" },
  { packageId: "gift-4-lessons", lessonsCount: 4, pricePln: 320, displayName: "4 lekcje — 320 zł" },
  { packageId: "gift-5-lessons", lessonsCount: 5, pricePln: 400, displayName: "5 lekcji — 400 zł" },
  { packageId: "gift-6-lessons", lessonsCount: 6, pricePln: 480, displayName: "6 lekcji — 480 zł" },
  { packageId: "gift-7-lessons", lessonsCount: 7, pricePln: 560, displayName: "7 lekcji — 560 zł" },
  { packageId: "gift-8-lessons", lessonsCount: 8, pricePln: 640, displayName: "8 lekcji — 640 zł" },
  { packageId: "gift-9-lessons", lessonsCount: 9, pricePln: 720, displayName: "9 lekcji — 720 zł" },
  { packageId: "gift-10-lessons", lessonsCount: 10, pricePln: 800, displayName: "10 lekcji — 800 zł" },
  { packageId: "gift-11-lessons", lessonsCount: 11, pricePln: 880, displayName: "11 lekcji — 880 zł" },
  { packageId: "gift-12-lessons", lessonsCount: 12, pricePln: 900, displayName: "12 lekcji — 900 zł" },
  { packageId: "gift-13-lessons", lessonsCount: 13, pricePln: 975, displayName: "13 lekcji — 975 zł" },
  { packageId: "gift-14-lessons", lessonsCount: 14, pricePln: 1050, displayName: "14 lekcji — 1050 zł" },
  { packageId: "gift-15-lessons", lessonsCount: 15, pricePln: 1125, displayName: "15 lekcji — 1125 zł" },
  { packageId: "gift-16-lessons", lessonsCount: 16, pricePln: 1200, displayName: "16 lekcji — 1200 zł" },
];

function Prezent() {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const send = useServerFn(sendGiftEmail);

  const selected = giftPackages.find((p) => p.packageId === selectedPackageId) ?? null;
  // Stan formularza zgodny z późniejszą integracją Stripe.
  // Do backendu wysyłamy tylko `selectedPackageId`; cena jest weryfikowana po stronie serwera.
  const formState = {
    selectedPackageId,
    selectedLessonsCount: selected?.lessonsCount ?? null,
    selectedPricePln: selected?.pricePln ?? null,
  };

  const STRIPE_LINK = "https://buy.stripe.com/6oU6oIgjofuFbk91Ni33W00";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formState.selectedPackageId || !selected) {
      setError("Wybierz pakiet lekcji.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const studentName = String(fd.get("studentName") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    if (!studentName || !phone || !email) {
      setError("Uzupełnij wszystkie pola formularza.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await send({
        data: {
          studentName,
          phone,
          email,
          packageId: selected.packageId,
          lessonsCount: selected.lessonsCount,
          pricePln: selected.pricePln,
        },
      });
      window.location.href = STRIPE_LINK;
    } catch (err) {
      console.error(err);
      setError("Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.");
      setSubmitting(false);
    }
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
            <Field label="imie ucznia" name="studentName" required />
            <Field label="Numer telefonu" name="phone" type="tel" required />
            <Field label="adres email" name="email" type="email" required />
          </div>

          <fieldset className="mt-4 flex flex-col gap-3">
            <legend className="font-display text-xl font-semibold mb-1">
              Wybierz ilość lekcji
            </legend>
            <p className="text-sm text-muted-foreground -mt-1 mb-2">
              Wybierz pakiet prezentowy. Cena zostanie przypisana automatycznie do wybranego pakietu.
            </p>
            <p className="text-sm text-parent font-medium">
              Przy zakupie minimum 12 lekcji obowiązuje promocyjna cena 75 zł za lekcję.
            </p>

            <GiftPackageSelect
              packages={giftPackages}
              value={selectedPackageId}
              onChange={(id) => {
                setSelectedPackageId(id);
                setError(null);
              }}
            />

            {selected && (
              <p className="mt-3 text-sm text-foreground/80">
                Wybrany pakiet: <span className="font-semibold">{formatGiftDisplay(selected)}</span>
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
            disabled={submitting}
            className="mt-4 w-full px-6 py-4 rounded-full bg-parent text-background font-display text-xl font-semibold hover:bg-parent/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Wysyłanie…" : "Zapłać"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="text-sm">
      <span className="block mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-parent/40"
      />
    </label>
  );
}
