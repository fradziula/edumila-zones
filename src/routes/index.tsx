import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Heart, Sparkles } from "lucide-react";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
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
          className="absolute inset-0 -z-10 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
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
                Zobacz cennik
              </Link>
            </div>
            <p className="mt-6 font-hand text-2xl text-muted-foreground">
              „Nauka to czary, które naprawdę działają.”
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-karolina/20 via-student/10 to-transparent blur-3xl -z-10" />
            <PhotoPlaceholder
              label="TUTAJ WSTAW ZDJĘCIE KOREPETYTORKI"
              caption="Karolina — twórczyni marki EduMila"
              tone="karolina"
              aspect="aspect-[4/5]"
            />
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
        eyebrow="Wybierz swoją drogę"
        title="Trzy wejścia, jedna marka"
        subtitle="Mówię osobno do rodzica, ucznia i o sobie. Wybierz, co pasuje teraz."
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
              d: "Lekcje zdalne (Meet, Skype, Teams) lub stacjonarnie u mnie.",
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
          {[1, 2, 3, 4].map((n) => (
            <PhotoPlaceholder
              key={n}
              label={`TUTAJ WSTAW ZDJĘCIE KUBKA ${n}`}
              caption={`Kubek EduMila — ujęcie ${n}`}
              aspect="aspect-[4/3]"
              tone={n % 2 ? "karolina" : "default"}
            />
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
