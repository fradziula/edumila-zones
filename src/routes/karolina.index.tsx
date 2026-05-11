import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import karolinaPhoto from "@/assets/karolina.jpeg";

export const Route = createFileRoute("/karolina/")({
  head: () => ({ meta: [{ title: "Karolina — EduMila" }] }),
  component: KHome,
});

function KHome() {
  return (
    <>
      <PageHero
        eyebrow="Karolina"
        tone="karolina"
        title={<>Cześć, jestem <span className="text-karolina">Karolina</span>.</>}
        subtitle="Uczę matematyki i chemii, prowadzę markę EduMila. Lubię proste tłumaczenia i spokojne lekcje."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/karolina/historia" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-medium">Moja historia <ArrowRight size={16}/></Link>
          <Link to="/karolina/metoda" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border">Jak pracuję</Link>
        </div>
      </PageHero>

      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Math-themed background */}
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.96 0.01 250 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.96 0.01 250 / 0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <svg
          aria-hidden
          className="absolute inset-0 -z-10 w-full h-full opacity-[0.07] text-foreground"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="1">
            <circle cx="12%" cy="20%" r="80" />
            <circle cx="85%" cy="75%" r="120" />
            <path d="M 5% 80% Q 30% 30%, 60% 60% T 95% 40%" />
            <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="2 8" />
            <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="2 8" />
            <polygon points="200,400 260,500 140,500" />
          </g>
          <g fill="currentColor" fontFamily="var(--font-display)" fontSize="22" opacity="0.6">
            <text x="8%" y="35%">∫ f(x) dx</text>
            <text x="78%" y="22%">π</text>
            <text x="70%" y="88%">a² + b² = c²</text>
            <text x="20%" y="85%">∑</text>
            <text x="45%" y="15%">√x</text>
            <text x="90%" y="50%">∞</text>
          </g>
        </svg>
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <figure className="w-full max-w-sm mx-auto">
            <div className="relative aspect-square w-full rounded-full overflow-hidden ring-1 ring-karolina/40 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-4 rounded-full bg-karolina/15 blur-2xl -z-10" />
              <img
                src={karolinaPhoto}
                alt="Karolina — korepetytorka EduMila"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted-foreground text-center">Karolina — EduMila</figcaption>
          </figure>
          <div>
            <p className="font-hand text-3xl text-karolina">„Nauka to czary, które naprawdę działają.”</p>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Pracuję z uczniami od kilku lat. Przez ten czas miałam ich kilkudziesięciu i poprowadziłam ponad tysiąc lekcji.
              Wiem, jak rozmawiać z dzieckiem, które boi się sprawdzianu, i z licealistą, który chce zdać maturę rozszerzoną.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Najbardziej zależy mi na tym, żeby uczeń wyszedł z lekcji z poczuciem, że coś rozumie.
              Bez wstydu, bez wyścigu i bez sztucznego entuzjazmu.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
