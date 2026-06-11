import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Heart, Sparkles } from "lucide-react";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import karolinaPhoto from "@/assets/karolina.jpeg";
import kubek1 from "@/assets/kubek-1.jpeg";
import kubek2 from "@/assets/kubek-2.jpeg";
import kubek3 from "@/assets/kubek-3.jpeg";
import kubek4 from "@/assets/kubek-4.jpeg";
import { ReviewCard } from "@/components/ReviewCard";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduMila — Korepetycje z matematyki i chemii | Karolina" },
      { name: "description", content: "Wadowice i online. Klasy 4–8, liceum, matura. Spokojnie, kameralnie, z wyczuciem." },
    ],
  }),
  component: Home,
});

const zones = [
  {
    to: "/rodzic",
    title: "Rodzic",
    promise: "Konkretne odpowiedzi i jasne zasady współpracy.",
    color: "parent",
    icon: Heart,
  },
  {
    to: "/uczen",
    title: "Uczeń",
    promise: "Bez stresu, w swoim tempie. Zobacz, jak wyglądają lekcje.",
    color: "student",
    icon: GraduationCap,
  },
  {
    to: "/karolina",
    title: "Karolina",
    promise: "Poznaj mnie, moją metodę i podejście do nauki.",
    color: "karolina",
    icon: Sparkles,
  },
] as const;

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
        {/* Math grid */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.96 0.01 250 / 0.6) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.96 0.01 250 / 0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
          }}
        />
        {/* Math motifs */}
        <svg
          aria-hidden
          className="absolute inset-0 -z-10 w-full h-full text-foreground opacity-[0.18]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="none"
        >
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <circle cx="8%" cy="22%" r="70" />
            <circle cx="92%" cy="78%" r="110" strokeDasharray="3 6" />
            <circle cx="60%" cy="12%" r="36" />
            <polygon points="120,520 200,640 40,640" />
            <rect x="78%" y="18%" width="90" height="90" transform="rotate(18 0 0)" />
            <path d="M 0 70% Q 25% 30%, 50% 55% T 100% 35%" strokeDasharray="2 6" />
            <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="1 10" />
            <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="1 10" />
            <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="2 12" />
          </g>
          <g fill="currentColor" fontFamily="var(--font-display)" opacity="0.55">
            <text x="6%" y="38%" fontSize="26">∫ f(x) dx</text>
            <text x="82%" y="28%" fontSize="34">π</text>
            <text x="70%" y="90%" fontSize="22">a² + b² = c²</text>
            <text x="18%" y="86%" fontSize="32">∑</text>
            <text x="44%" y="20%" fontSize="22">√x</text>
            <text x="92%" y="55%" fontSize="28">∞</text>
            <text x="32%" y="55%" fontSize="20">f(x) = ax + b</text>
            <text x="10%" y="62%" fontSize="20">θ</text>
            <text x="86%" y="40%" fontSize="20">Δ</text>
          </g>
          <g fill="currentColor" opacity="0.5">
            <circle cx="15%" cy="48%" r="2" />
            <circle cx="35%" cy="72%" r="2" />
            <circle cx="68%" cy="42%" r="2" />
            <circle cx="80%" cy="65%" r="2" />
            <circle cx="50%" cy="30%" r="2" />
          </g>
        </svg>
        {/* Subtle glow accents */}
        <div aria-hidden className="absolute -z-10 top-10 left-1/4 w-[420px] h-[420px] rounded-full bg-student/10 blur-3xl" />
        <div aria-hidden className="absolute -z-10 bottom-0 right-10 w-[480px] h-[480px] rounded-full bg-karolina/10 blur-3xl" />
        <div className="container-page pt-16 md:pt-24 pb-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-karolina" />
              Wadowice + online · cała Polska
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
              Odkryj ze mną <span className="text-karolina">siłę nauki</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Korepetycje z matematyki i chemii dla klas 4–8, liceum i matury.
              Spokojne tempo, jasne wytłumaczenie, szczera informacja zwrotna.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition"
              >
                Umów pierwszą lekcję <ArrowRight size={16} />
              </Link>
              <Link
                to="/rodzic/cennik"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-surface transition"
              >
                Cennik
              </Link>
            </div>
            <p className="mt-6 font-hand text-2xl text-muted-foreground">
              „Nauka to czary, które naprawdę działają.”
            </p>
          </div>

          <div className="relative">
            <figure className="w-full max-w-md mx-auto">
              <div className="relative aspect-square w-full rounded-full overflow-hidden">
                <img
                  src={karolinaPhoto}
                  alt="Karolina — korepetytorka, twórczyni marki EduMila"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
              <figcaption className="mt-4 text-sm text-muted-foreground text-center">
                Karolina — twórczyni marki EduMila
              </figcaption>
            </figure>
          </div>
        </div>

        {/* social proof */}
        <div className="container-page pb-12">
          <div className="card-surface px-6 py-5 flex flex-wrap items-center gap-x-10 gap-y-3 justify-around text-center">
            <Stat value="1000+" label="przeprowadzonych lekcji" />
            <Stat value="100+" label="uczniów" />
            <Stat value="2" label="przedmioty: matematyka i chemia" />
            <Stat value="4–matura" label="klasa 4 SP do matury rozszerzonej" />
          </div>
        </div>
      </section>

      {/* THREE ZONES */}
      <Section
        title="Trzy wejścia, jedna marka"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {zones.map((z) => (
            <Link
              key={z.to}
              to={z.to}
              className="group card-surface p-7 transition hover:-translate-y-1 duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                  z.color === "parent"
                    ? "bg-parent-soft text-parent"
                    : z.color === "student"
                    ? "bg-student-soft text-student"
                    : "bg-karolina-soft text-karolina"
                }`}
              >
                <z.icon size={20} />
              </div>
              <div className="uppercase text-xs tracking-[0.2em] text-muted-foreground mb-1">Strefa</div>
              <h3 className="font-display text-2xl font-semibold">{z.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{z.promise}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Wejdź <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/wszystko" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
            Zobacz całą stronę liniowo
          </Link>
        </div>
      </Section>

      {/* SUPPORTING BLOCKS */}
      <Section eyebrow="O EduMili" title="Spokojnie, kameralnie, skutecznie">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Bez wyścigu",
              d: "Pracuję w tempie ucznia. Najpierw zrozumienie, potem zadania.",
            },
            {
              t: "Jasne zasady",
              d: "Cennik, regulamin i forma lekcji są opisane wprost. Bez gwiazdek.",
            },
            {
              t: "Online lub w Wadowicach",
              d: "Lekcje zdalne (Meet, Skype, Teams) lub Stacjonarnie w siedzibie.",
            },
          ].map((b) => (
            <div key={t(b.t)} className="card-surface p-6">
              <h3 className="font-display text-lg font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* REVIEWS */}
      <Section eyebrow="Opinie" title="Co mówią uczniowie i rodzice">
        <div className="grid gap-5 md:grid-cols-3">
          <ReviewCard
            name="Wojtek K."
            role="uczeń liceum"
            text="Pani Karolina tłumaczy tak, że w końcu rozumiem, o co chodzi w zadaniach. Stres przed sprawdzianami spadł."
          />
          <ReviewCard
            name="Anna B."
            role="mama 8-klasisty"
            text="Syn idzie na lekcje bez marudzenia. Po kilku miesiącach widać różnicę w ocenach i pewności siebie."
          />
          <ReviewCard
            name="Kuba M."
            role="maturzysta"
            text="Konkretne wyjaśnienia, dobrze dobrane zadania. Wiem, co robię i po co."
          />
        </div>
      </Section>

      {/* EDU MILA W REALU */}
      <Section eyebrow="Drobiazgi" title="EduMila w realu" subtitle="Coś od nas — kubki EduMila. Drobiazgi, które trafiają do uczniów po dłuższej współpracy.">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { src: kubek1, n: 1 },
            { src: kubek2, n: 2 },
          ].map(({ src, n }) => (
            <figure key={n} className="w-full">
              <div className="w-full rounded-3xl overflow-hidden ring-1 ring-border bg-surface-2">
                <img
                  src={src}
                  alt={`Kubek EduMila — ujęcie ${n}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </figure>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="card-surface p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-hero)" }} />
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Zaczynamy?</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Pierwsza rozmowa jest niezobowiązująca. Pomagam też dobrać formę i częstotliwość lekcji.
          </p>
          <Link
            to="/kontakt"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition"
          >
            Napisz do mnie <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function t(s: string) { return s; }

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl md:text-3xl font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
