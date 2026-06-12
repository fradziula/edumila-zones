// Dane 12 pakietów lekcji — wykorzystywane na /zakup.
// Ceny zgodne z istniejącym cennikiem prezentowym (80 zł / lekcja,
// promocja 75 zł / lekcja od 12 lekcji).
export type Package = {
  id: string;
  slug: string;
  name: string;
  priceGross: number;
  currency: "PLN";
  shortDescription: string;
  features: string[];
  lessonsCount: number;
  badge?: string;
};

function lessonsLabel(n: number): string {
  if (n === 1) return "lekcja";
  if (n >= 2 && n <= 4) return "lekcje";
  return "lekcji";
}

function build(n: number, opts: { badge?: string; promo?: boolean } = {}): Package {
  const pricePerLesson = opts.promo ? 75 : 80;
  const price = n === 12 ? 900 : n * pricePerLesson;
  return {
    id: `pkg-${n}`,
    slug: `pakiet-${n}-${lessonsLabel(n)}`,
    name: `Pakiet ${n} ${lessonsLabel(n)}`,
    priceGross: price,
    currency: "PLN",
    shortDescription:
      n === 1
        ? "Pojedyncza lekcja — idealna na start lub doraźnie."
        : n <= 4
          ? `Krótki pakiet ${n} lekcji — dobry na bieżącą pomoc.`
          : n <= 8
              ? `Solidny pakiet ${n} lekcji — regularna praca nad tematem.`
              : `Duży pakiet ${n} lekcji — pełne wsparcie do egzaminu.`,
    features: [
      `${n} ${lessonsLabel(n)} po 60 minut`,
      "Matematyka lub chemia",
      "Materiały i zadania w cenie",
      opts.promo ? "Promocyjna cena 75 zł / lekcja" : `${pricePerLesson} zł za lekcję`,
    ],
    lessonsCount: n,
    badge: opts.badge,
  };
}

export const packages: Package[] = [
  build(1),
  build(2),
  build(3),
  build(4, { badge: "Popularny" }),
  build(5),
  build(6),
  build(7),
  build(8, { badge: "Najczęściej wybierany" }),
  build(9),
  build(10),
  build(11),
  build(12, { badge: "Promocja −60 zł", promo: true }),
];

export function formatPLN(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}

export const SELLER = {
  name: "Korepetycje — Karolina Widlarz",
  nip: "5512667603",
  address: "ul. Pniaki 190, 34-124 Klecza Dolna",
};