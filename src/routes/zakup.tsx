import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  Check,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { packages, formatPLN, SELLER, type Package } from "@/lib/packages";
import { buildOrderPayload, startPayment, type CustomerData } from "@/lib/payments";

export const Route = createFileRoute("/zakup")({
  head: () => ({
    meta: [
      { title: "Zakup pakietu lekcji | EduMila" },
      {
        name: "description",
        content:
          "Wybierz pakiet lekcji, dodaj do koszyka i przejdź do bezpiecznej płatności online.",
      },
    ],
  }),
  component: ZakupPage,
});

type Step = "select" | "form" | "summary" | "success";

type CartItem = {
  pkg: Package;
  quantity: number;
};

const giftSupporters = [
  "Babcia",
  "Dziadek",
  "Wujek",
  "Ciocia",
  "Rodzina",
  "Ludzie dobrej woli wspierający naukę",
];

function ZakupPage() {
  return <PurchaseFlow />;
}

export function PurchaseFlow({ mode = "standard" }: { mode?: "standard" | "gift" }) {
  const isGift = mode === "gift";
  const [cart, setCart] = useState<CartItem | null>(null);
  const [step, setStep] = useState<Step>("select");
  const [customer, setCustomer] = useState<CustomerData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    nip: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});
  const [paymentState, setPaymentState] = useState<
    { kind: "idle" } | { kind: "loading" } | { kind: "error"; message: string }
  >({ kind: "idle" });
  const [toast, setToast] = useState<string | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);

  function selectPackage(pkg: Package) {
    // Prosty checkout dla jednego pakietu: nowy wybór ZAWSZE zastępuje
    // poprzednią pozycję w koszyku. Ilość jest zawsze 1.
    setCart({ pkg, quantity: 1 });
    const replaced = cart && cart.pkg.id !== pkg.id;
    setToast(
      replaced ? `Zamieniono pakiet w koszyku na: ${pkg.name}` : `Dodano do koszyka: ${pkg.name}`,
    );
    window.setTimeout(() => setToast(null), 2200);
    // Na mniejszych ekranach koszyk jest pod listą pakietów —
    // przewijamy do niego, żeby użytkownik od razu widział wybór.
    if (
      typeof window !== "undefined" &&
      (isGift || window.matchMedia("(max-width: 1023px)").matches)
    ) {
      window.setTimeout(() => {
        cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  function validateForm(): boolean {
    const e: Partial<Record<keyof CustomerData, string>> = {};
    if (!customer.fullName.trim()) e.fullName = "Podaj imię i nazwisko.";
    if (!customer.email.trim()) e.email = "Podaj adres e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
      e.email = "Nieprawidłowy adres e-mail.";
    if (!customer.phone.trim()) e.phone = "Podaj numer telefonu.";
    if (customer.nip && !/^\d{10}$/.test(customer.nip.replace(/[\s-]/g, "")))
      e.nip = "NIP powinien mieć 10 cyfr.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePay() {
    if (!cart) return;
    if (!acceptedTerms) return;
    setPaymentState({ kind: "loading" });
    try {
      const payload = buildOrderPayload(
        cart.pkg,
        cart.quantity,
        customer,
        acceptedTerms,
        acceptedPrivacy,
      );
      const { paymentUrl } = await startPayment(payload);
      // TODO: w produkcji `window.location.href = paymentUrl` przekieruje do P24.
      // Tu zostawiamy mock — pokazujemy ekran sukcesu.
      console.log("[zakup] paymentUrl", paymentUrl);
      setStep("success");
      setPaymentState({ kind: "idle" });
    } catch (err) {
      console.error(err);
      setPaymentState({
        kind: "error",
        message: "Nie udało się rozpocząć płatności. Spróbuj ponownie.",
      });
    }
  }

  const total = useMemo(() => (cart ? cart.pkg.priceGross * cart.quantity : 0), [cart]);

  const stepContent = (
    <>
      {step === "select" && !isGift && (
        <PackageGrid
          packages={packages}
          selectedId={cart?.pkg.id ?? null}
          onSelect={selectPackage}
        />
      )}
      {step === "form" && (
        <CheckoutForm
          customer={customer}
          setCustomer={setCustomer}
          errors={errors}
          onBack={() => setStep("select")}
          onNext={() => {
            if (validateForm()) setStep("summary");
          }}
        />
      )}
      {step === "summary" && cart && (
        <OrderSummary
          cart={cart}
          customer={customer}
          acceptedTerms={acceptedTerms}
          acceptedPrivacy={acceptedPrivacy}
          setAcceptedTerms={setAcceptedTerms}
          setAcceptedPrivacy={setAcceptedPrivacy}
          paymentState={paymentState}
          onBack={() => setStep("form")}
          onPay={handlePay}
        />
      )}
      {step === "success" && cart && <SuccessPanel cart={cart} customer={customer} />}
    </>
  );

  return (
    <section className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="uppercase text-xs tracking-[0.2em] font-medium mb-3 text-muted-foreground">
          {isGift ? "Prezent" : "Zakup pakietu"}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
          {isGift ? "Podaruj pakiet lekcji" : "Wybierz pakiet i przejdź do płatności"}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {isGift
            ? "Wybierz liczbę lekcji, podaj dane zamówienia i przejdź przez bezpieczny proces płatności."
            : "Prosty proces zakupowy w czterech krokach. Wszystkie ceny brutto, w PLN."}
        </p>
      </header>

      <Stepper step={step} />

      {isGift ? (
        <div className="mt-10">
          {step === "select" ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start">
              <GiftSupporters />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-parent mb-3">
                  Wybierz prezent
                </p>
                <PackageGrid
                  packages={packages}
                  selectedId={cart?.pkg.id ?? null}
                  onSelect={selectPackage}
                />
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">{stepContent}</div>
          )}

          <div ref={cartRef} className="mt-8 max-w-4xl mx-auto scroll-mt-28">
            <CartSummary
              cart={cart}
              total={total}
              step={step}
              onGoToForm={() => setStep("form")}
              onBackToPackages={() => setStep("select")}
              onClear={() => setCart(null)}
            />
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] items-start">
          <div>{stepContent}</div>
          <aside className="lg:sticky lg:top-24">
            <div ref={cartRef} />
            <CartSummary
              cart={cart}
              total={total}
              step={step}
              onGoToForm={() => setStep("form")}
              onBackToPackages={() => setStep("select")}
              onClear={() => setCart(null)}
            />
          </aside>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-full bg-foreground text-background text-sm shadow-card flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}
    </section>
  );
}

function GiftSupporters() {
  return (
    <div className="card-surface p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-parent">Dla kogo jest ta opcja?</p>
      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">Ambasadorzy Nauki</h2>
      <ul className="mt-6 space-y-3 text-base sm:text-lg text-foreground/90">
        {giftSupporters.map((supporter) => (
          <li key={supporter} className="flex items-start gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-parent shrink-0" />
            <span>{supporter}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- Stepper -------------------- */

function Stepper({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "select", label: "1. Pakiet" },
    { key: "form", label: "2. Dane" },
    { key: "summary", label: "3. Podsumowanie" },
    { key: "success", label: "4. Płatność" },
  ];
  const activeIdx = steps.findIndex((s) => s.key === step);
  return (
    <ol className="mt-8 flex flex-wrap gap-2 text-sm">
      {steps.map((s, i) => {
        const active = i === activeIdx;
        const done = i < activeIdx;
        return (
          <li
            key={s.key}
            className={`px-3 py-1.5 rounded-full border ${
              active
                ? "bg-foreground text-background border-foreground"
                : done
                  ? "bg-parent/10 text-parent border-parent/30"
                  : "border-border text-muted-foreground"
            }`}
          >
            {s.label}
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------- Lista pakietów -------------------- */

function PackageGrid({
  packages,
  selectedId,
  onSelect,
}: {
  packages: Package[];
  selectedId: string | null;
  onSelect: (p: Package) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const selected = packages.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls="package-options"
        className="card-surface w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left transition hover:border-parent/50"
      >
        <span>
          <span className="block text-xs uppercase tracking-[0.18em] text-parent">
            {selected ? "Wybrany pakiet" : "Prezent edukacyjny"}
          </span>
          <span className="mt-1 block font-display text-xl sm:text-2xl font-semibold">
            {selected ? selected.name : "Wybierz pakiet lekcji"}
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            {selected
              ? `${formatPLN(selected.priceGross)} · kliknij, aby zmienić`
              : `${packages.length} wariantów do wyboru`}
          </span>
        </span>
        <span className="w-10 h-10 rounded-full bg-parent/15 text-parent flex items-center justify-center shrink-0">
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {expanded && (
        <div id="package-options" className="grid gap-5 sm:grid-cols-2">
          {packages.map((p) => {
            const active = p.id === selectedId;
            return (
              <article
                key={p.id}
                className={`relative card-surface p-6 flex flex-col gap-4 transition ${
                  active ? "ring-2 ring-parent border-parent" : "hover:border-foreground/20"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-5 px-2.5 py-1 text-xs rounded-full bg-parent text-background font-medium">
                    {p.badge}
                  </span>
                )}
                <header>
                  <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.shortDescription}</p>
                </header>
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-parent shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-3xl font-semibold">
                      {formatPLN(p.priceGross)}
                    </span>
                    <span className="text-xs text-muted-foreground">cena brutto</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(p);
                      setExpanded(false);
                    }}
                    className={`mt-4 w-full px-4 py-3 rounded-full font-display font-semibold text-base transition ${
                      active
                        ? "bg-parent/15 text-parent border border-parent"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    {active ? "W koszyku ✓" : "Dodaj do koszyka"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------- Koszyk / sticky summary -------------------- */

function CartSummary({
  cart,
  total,
  step,
  onGoToForm,
  onBackToPackages,
  onClear,
}: {
  cart: CartItem | null;
  total: number;
  step: Step;
  onGoToForm: () => void;
  onBackToPackages: () => void;
  onClear: () => void;
}) {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted-foreground">
          <ShoppingCart className="w-4 h-4" />
          {cart ? "Twoje zamówienie" : "Twój koszyk"}
        </div>
        {cart && (
          <span className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-parent/15 text-parent">
            1 pozycja
          </span>
        )}
      </div>

      {!cart ? (
        <div className="mt-5 text-sm text-muted-foreground">
          Koszyk jest pusty. Wybierz jeden z 12 pakietów po lewej, aby kontynuować.
        </div>
      ) : (
        <>
          <div className="mt-5 flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg font-semibold">{cart.pkg.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {cart.pkg.lessonsCount} {lessonsLabel(cart.pkg.lessonsCount)} · ilość:{" "}
                {cart.quantity}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-semibold">{formatPLN(cart.pkg.priceGross)}</div>
              <div className="text-xs text-muted-foreground">za pakiet</div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Razem (brutto)</span>
            <span className="font-display text-2xl font-semibold">{formatPLN(total)}</span>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {step === "select" && (
              <button
                type="button"
                onClick={onGoToForm}
                className="w-full px-4 py-3 rounded-full bg-parent text-background font-display font-semibold hover:bg-parent/90 transition flex items-center justify-center gap-2"
              >
                Przejdź do zamówienia
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {step !== "select" && step !== "success" && (
              <button
                type="button"
                onClick={onBackToPackages}
                className="w-full px-4 py-2.5 rounded-full border border-border text-sm hover:bg-input/50 transition"
              >
                Zmień pakiet
              </button>
            )}
            {step === "select" && (
              <button
                type="button"
                onClick={onClear}
                className="w-full px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition"
              >
                Wyczyść koszyk
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------- Formularz checkout -------------------- */

function CheckoutForm({
  customer,
  setCustomer,
  errors,
  onBack,
  onNext,
}: {
  customer: CustomerData;
  setCustomer: (c: CustomerData) => void;
  errors: Partial<Record<keyof CustomerData, string>>;
  onBack: () => void;
  onNext: () => void;
}) {
  function update<K extends keyof CustomerData>(key: K, value: string) {
    setCustomer({ ...customer, [key]: value });
  }
  return (
    <form
      className="card-surface p-6 md:p-8 flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="font-display text-2xl md:text-3xl font-semibold">Dane do zamówienia</h2>
      <p className="text-sm text-muted-foreground -mt-3">
        Wypełnij dane potrzebne do realizacji zamówienia i kontaktu.
      </p>

      <FormField
        label="Imię i nazwisko"
        value={customer.fullName}
        onChange={(v) => update("fullName", v)}
        error={errors.fullName}
        required
        autoComplete="name"
      />
      <FormField
        label="Adres e-mail"
        type="email"
        value={customer.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        required
        autoComplete="email"
      />
      <FormField
        label="Numer telefonu"
        type="tel"
        value={customer.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
        required
        autoComplete="tel"
      />
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Nazwa firmy (opcjonalnie)"
          value={customer.company ?? ""}
          onChange={(v) => update("company", v)}
          autoComplete="organization"
        />
        <FormField
          label="NIP (opcjonalnie)"
          value={customer.nip ?? ""}
          onChange={(v) => update("nip", v)}
          error={errors.nip}
        />
      </div>

      <div className="mt-4 flex flex-col-reverse sm:flex-row gap-3 justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-full border border-border text-sm hover:bg-input/50 transition flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Wróć do pakietów
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-foreground text-background font-display font-semibold hover:bg-foreground/90 transition flex items-center justify-center gap-2"
        >
          Przejdź do podsumowania <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="text-sm block">
      <span className="block mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-lg bg-input border focus:outline-none focus:ring-2 focus:ring-parent/40 ${
          error ? "border-red-500/60" : "border-border"
        }`}
      />
      {error && (
        <span className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </span>
      )}
    </label>
  );
}

/* -------------------- Podsumowanie + płatność -------------------- */

function OrderSummary({
  cart,
  customer,
  acceptedTerms,
  acceptedPrivacy,
  setAcceptedTerms,
  setAcceptedPrivacy,
  paymentState,
  onBack,
  onPay,
}: {
  cart: CartItem;
  customer: CustomerData;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  setAcceptedTerms: (v: boolean) => void;
  setAcceptedPrivacy: (v: boolean) => void;
  paymentState: { kind: "idle" } | { kind: "loading" } | { kind: "error"; message: string };
  onBack: () => void;
  onPay: () => void;
}) {
  const total = cart.pkg.priceGross * cart.quantity;
  const loading = paymentState.kind === "loading";

  return (
    <div className="card-surface p-6 md:p-8 flex flex-col gap-6">
      <div>
        <p className="uppercase text-xs tracking-[0.2em] font-medium text-parent mb-2">
          Krok 3 / 4
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold">Podsumowanie zamówienia</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sprawdź szczegóły zanim przejdziesz do płatności.
        </p>
      </div>

      <div className="rounded-xl border border-border p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-lg font-semibold">{cart.pkg.name}</div>
            <div className="text-sm text-muted-foreground mt-0.5">
              {cart.pkg.lessonsCount} {lessonsLabel(cart.pkg.lessonsCount)} · ilość: {cart.quantity}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{formatPLN(cart.pkg.priceGross)}</div>
            <div className="text-xs text-muted-foreground">cena jednostkowa</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-baseline justify-between">
          <span className="text-sm">Suma (cena brutto)</span>
          <span className="font-display text-2xl font-semibold">{formatPLN(total)}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-border p-5">
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Kupujący
          </div>
          <div className="font-medium">{customer.fullName}</div>
          <div className="text-muted-foreground">{customer.email}</div>
          <div className="text-muted-foreground">{customer.phone}</div>
          {customer.company && <div className="mt-1">{customer.company}</div>}
          {customer.nip && <div className="text-muted-foreground">NIP: {customer.nip}</div>}
        </div>
        <div className="rounded-xl border border-border p-5">
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Sprzedawca
          </div>
          <div className="font-medium">{SELLER.name}</div>
          <div className="text-muted-foreground">NIP: {SELLER.nip}</div>
          <div className="text-muted-foreground">{SELLER.address}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Checkbox
          checked={acceptedTerms}
          onChange={setAcceptedTerms}
          label={
            <>
              Akceptuję{" "}
              <Link
                to="/rodzic/regulamin"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-parent"
              >
                regulamin serwisu
              </Link>
              . *
            </>
          }
        />
        <Checkbox
          checked={acceptedPrivacy}
          onChange={setAcceptedPrivacy}
          label={
            <>
              Zapoznałem/am się z{" "}
              <Link
                to="/polityka-prywatnosci"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-parent"
              >
                polityką prywatności
              </Link>
              .
            </>
          }
        />
      </div>

      {paymentState.kind === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 mt-0.5" />
          {paymentState.message}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="px-5 py-3 rounded-full border border-border text-sm hover:bg-input/50 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Wróć do danych
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={!acceptedTerms || loading}
          className="px-6 py-3 rounded-full bg-parent text-background font-display text-lg font-semibold hover:bg-parent/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Przekierowuję…
            </>
          ) : (
            <>Przejdź do płatności</>
          )}
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Po kliknięciu zostaniesz przekierowany do bezpiecznej bramki płatności (Przelewy24).
      </p>
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-parent shrink-0"
      />
      <span>{label}</span>
    </label>
  );
}

/* -------------------- Sukces (mock) -------------------- */

function SuccessPanel({ cart, customer }: { cart: CartItem; customer: CustomerData }) {
  return (
    <div className="card-surface p-8 md:p-10 text-center flex flex-col items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-parent/15 text-parent flex items-center justify-center">
        <Check className="w-7 h-7" />
      </div>
      <h2 className="font-display text-3xl font-semibold">Zamówienie przyjęte</h2>
      <p className="text-muted-foreground max-w-md">
        (Tryb demo) W produkcji w tym miejscu nastąpi przekierowanie do bramki Przelewy24 na
        podstawie <code>paymentUrl</code> zwróconego przez backend.
      </p>
      <div className="mt-2 text-sm text-muted-foreground">
        Wybrany pakiet: <span className="font-semibold text-foreground">{cart.pkg.name}</span> ·{" "}
        {formatPLN(cart.pkg.priceGross * cart.quantity)}
      </div>
      <div className="text-sm text-muted-foreground">
        Potwierdzenie wyślemy na:{" "}
        <span className="font-medium text-foreground">{customer.email}</span>
      </div>
      <Link
        to="/"
        className="mt-4 px-5 py-2.5 rounded-full border border-border text-sm hover:bg-input/50 transition"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function lessonsLabel(n: number): string {
  if (n === 1) return "lekcja";
  if (n >= 2 && n <= 4) return "lekcje";
  return "lekcji";
}
