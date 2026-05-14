import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rodzic/wsparcie")({
  head: () => ({ meta: [{ title: "Sponsoruj lekcje — EduMila" }, { name: "description", content: "Strona dla babć, dziadków i bliskich, którzy chcą wesprzeć naukę dziecka." }] }),
  component: Wsp,
});

const prices = ["80 zł", "304 zł", "1 088 zł"];

function Wsp() {
  return (
    <div
      className="relative -mt-px min-h-screen w-full"
      style={{
        background: "#f6f6f4",
        color: "#0a0a0a",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {/* Cover the global dark math background */}
      <div className="absolute inset-0 -z-10" style={{ background: "#f6f6f4" }} />

      <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-24 pb-24">
        {/* Header */}
        <header className="text-center">
          <h1
            className="font-display tracking-tight leading-none"
            style={{
              fontSize: "clamp(72px, 14vw, 200px)",
              color: "#0a0a0a",
            }}
          >
            Prezent
          </h1>
          <p className="mt-6 text-sm md:text-base tracking-wide" style={{ color: "#1a1a1a" }}>
            Zapewnij Lekcję Uczniowi
          </p>
        </header>

        {/* Two columns */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left column */}
          <div className="md:pl-4 md:pt-12">
            <h2 className="text-base md:text-lg mb-8" style={{ color: "#0a0a0a" }}>
              Ambasadorzy Nauki:
            </h2>
            <ul className="space-y-3 text-sm md:text-base" style={{ color: "#0a0a0a" }}>
              <li>Babcia</li>
              <li>Dziadek</li>
              <li>Wujek</li>
              <li>Ciocia</li>
              <li>Rodzina</li>
              <li>Ludzie dobrzy</li>
              <li>wspierający nauke</li>
            </ul>

            {/* Hidden prices preserved for checkout logic */}
            <div className="sr-only" aria-hidden="true">
              {prices.map((p) => (
                <span key={p} data-price={p}>{p}</span>
              ))}
            </div>
          </div>

          {/* Right column — form box */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full mx-auto md:ml-auto"
            style={{
              border: "1px solid #0a0a0a",
              padding: "32px 24px 24px",
              maxWidth: "420px",
              minHeight: "560px",
              display: "flex",
              flexDirection: "column",
              background: "transparent",
            }}
          >
            <div className="text-center text-sm md:text-base mb-10" style={{ color: "#0a0a0a" }}>
              Formularz
            </div>

            <div className="flex-1 flex flex-col gap-10">
              <BareField label="imie ucznia" />
              <BareField label="Numer telefonu" type="tel" />
              <BareField label="adres email" type="email" />
            </div>

            <button
              type="submit"
              className="mt-12 w-full text-center"
              style={{
                fontSize: "28px",
                letterSpacing: "0.02em",
                paddingTop: "16px",
                borderTop: "1px solid #0a0a0a",
                color: "#0a0a0a",
                background: "transparent",
              }}
            >
              Zapłać
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function BareField({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-xs md:text-sm" style={{ color: "#0a0a0a" }}>
      <span className="block mb-2">{label}</span>
      <input
        type={type}
        className="w-full bg-transparent focus:outline-none"
        style={{
          borderBottom: "1px solid #0a0a0a",
          padding: "4px 2px",
          color: "#0a0a0a",
          fontFamily: "inherit",
        }}
      />
    </label>
  );
}
