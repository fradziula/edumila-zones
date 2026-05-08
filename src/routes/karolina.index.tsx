import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

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

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <PhotoPlaceholder label="TUTAJ WSTAW ZDJĘCIE KOREPETYTORKI" caption="Karolina — EduMila" tone="karolina" />
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
      </Section>
    </>
  );
}
