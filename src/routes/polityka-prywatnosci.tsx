import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka prywatności — EduMila" },
      { name: "description", content: "Polityka prywatności serwisu edumila.pl" },
    ],
  }),
  component: Polityka,
});

function Polityka() {
  return (
    <>
      <PageHero eyebrow="Dokumenty" title="Polityka prywatności" subtitle="Informacje o przetwarzaniu danych osobowych w serwisie edumila.pl." />
      <Section>
        <article className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto text-foreground/90 space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">1. Administrator danych</h2>
            <p className="text-sm text-muted-foreground">
              Administratorem Twoich danych osobowych jest:
            </p>
            <ul className="mt-3 text-sm space-y-1">
              <li><strong>Korepetycje- Karolina Widlarz</strong></li>
              <li>ul. Pniaki 190, 34-124 Klecza Dolna</li>
              <li>NIP: 5512667603</li>
              <li>REGON: 529419519</li>
              <li>e-mail: edumila.kontakt@gmail.com</li>
              <li>tel.: 667 541 916</li>
              <li>Adres serwisu: https://edumila.pl/</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">2. Zakres zbieranych danych</h2>
            <p className="text-sm text-muted-foreground">
              W ramach korzystania z serwisu oraz kontaktu z Administratorem mogą być przetwarzane następujące dane:
              imię i nazwisko, adres e-mail, numer telefonu, treść wiadomości oraz dane techniczne (np. adres IP,
              typ przeglądarki) zbierane automatycznie przez serwis.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">3. Cele i podstawy przetwarzania</h2>
            <p className="text-sm text-muted-foreground">
              Dane osobowe przetwarzane są w celu:
            </p>
            <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
              <li>udzielenia odpowiedzi na zapytanie kontaktowe (art. 6 ust. 1 lit. b i f RODO),</li>
              <li>realizacji usług korepetycji oraz zawartych umów (art. 6 ust. 1 lit. b RODO),</li>
              <li>wystawienia dokumentów księgowych i wypełnienia obowiązków prawnych (art. 6 ust. 1 lit. c RODO),</li>
              <li>zapewnienia prawidłowego funkcjonowania serwisu i jego bezpieczeństwa (art. 6 ust. 1 lit. f RODO).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">4. Okres przechowywania danych</h2>
            <p className="text-sm text-muted-foreground">
              Dane przechowywane są przez okres niezbędny do realizacji wskazanych celów, a po ich zakończeniu —
              przez okres wymagany przepisami prawa (np. podatkowymi i rachunkowymi).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">5. Odbiorcy danych</h2>
            <p className="text-sm text-muted-foreground">
              Dane mogą być przekazywane podmiotom wspierającym Administratora w prowadzeniu działalności, takim jak
              dostawcy hostingu, systemów e-mail, biura rachunkowego oraz operatorom płatności — wyłącznie w zakresie
              niezbędnym do realizacji usług.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">6. Prawa osoby, której dane dotyczą</h2>
            <p className="text-sm text-muted-foreground">
              Przysługuje Ci prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
              przenoszenia, wniesienia sprzeciwu oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">7. Pliki cookies</h2>
            <p className="text-sm text-muted-foreground">
              Serwis może wykorzystywać pliki cookies w celu zapewnienia poprawnego działania strony oraz analizy
              ruchu. Możesz w każdej chwili zmienić ustawienia cookies w swojej przeglądarce.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">8. Kontakt</h2>
            <p className="text-sm text-muted-foreground">
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt: edumila.kontakt@gmail.com lub
              telefonicznie pod numerem 667 541 916.
            </p>
          </section>
        </article>
      </Section>
    </>
  );
}
