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
            <h2 className="font-display text-2xl font-semibold mb-3">I. Postanowienia ogólne</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Polityka prywatności określa, jak zbierane, przetwarzane i przechowywane są dane osobowe Użytkowników niezbędne do świadczenia usług drogą elektroniczną za pośrednictwem serwisu internetowego https://edumila.pl/ (dalej: Serwis).</li>
              <li>Serwis zbiera wyłącznie dane osobowe niezbędne do świadczenia i rozwoju usług w nim oferowanych.</li>
              <li>Dane osobowe zbierane za pośrednictwem Serwisu są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, dalej RODO) oraz ustawą o ochronie danych osobowych z dnia 10 maja 2018 r.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">II. Administrator danych</h2>
            <p className="text-sm text-muted-foreground">
              Administratorem danych osobowych zbieranych poprzez Serwis jest Karolina Widlarz zam. ul. Pniaki 190, 34-124 Klecza Dolna, prowadząca działalność gospodarczą pod firmą „Korepetycje- Karolina Widlarz” z siedzibą ul. Pniaki 190, 34-124 Klecza Dolna, zarejestrowaną w Centralnej Ewidencji Informacji Działalności Gospodarczej, NIP: 5512667603, REGON: 529419519, e-mail: edumila.kontakt@gmail.com, nr tel.: 667 541 916.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">III. Cel zbierania danych osobowych</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Dane osobowe wykorzystywane są w celu:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>rejestracji konta i weryfikacji tożsamości Użytkownika,</li>
                  <li>umożliwienia logowania do Serwisu,</li>
                  <li>realizacji umowy dotyczącej usług i e-usług,</li>
                  <li>komunikacji z Użytkownikiem (livechat, formularz kontaktowy itp.),</li>
                  <li>wysyłki newslettera (po wyrażeniu zgody Użytkownika na jego otrzymywanie),</li>
                  <li>prowadzenia systemu komentarzy,</li>
                  <li>świadczenia usług społecznościowych,</li>
                  <li>promocji oferty Administratora,</li>
                  <li>marketingu, remarketingu, afiliacji,</li>
                  <li>personalizacji Serwisu dla Użytkowników,</li>
                  <li>działań analitycznych i statystycznych,</li>
                  <li>windykacji należności,</li>
                  <li>ustalenia i dochodzenia roszczeń albo obrony przed nimi.</li>
                </ul>
              </li>
              <li>Podanie danych jest dobrowolne, ale niezbędne do zawarcia umowy albo skorzystania z innych funkcjonalności Serwisu.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">IV. Rodzaj przetwarzanych danych osobowych</h2>
            <p className="text-sm text-muted-foreground">
              Administrator może przetwarzać dane osobowe Użytkownika: imię i nazwisko, data urodzenia, adres zamieszkania, adres e-mail, numer telefonu, NIP.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">V. Okres przetwarzania danych osobowych</h2>
            <p className="text-sm text-muted-foreground">
              Dane osobowe Użytkowników będą przetwarzane przez okres:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
              <li>gdy podstawą przetwarzania danych jest wykonanie umowy – do momentu przedawnienia roszczeń po jej wykonaniu,</li>
              <li>gdy podstawą przetwarzania danych jest zgoda – do momentu jej odwołania, a po odwołaniu zgody do przedawnienia roszczeń.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              W obu przypadkach termin przedawnienia wynosi 6 lat, a dla roszczeń o świadczenia okresowe i roszczeń dotyczących prowadzenia działalności gospodarczej – 3 lata (jeśli przepis szczególny nie stanowi inaczej).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">VI. Udostępnianie danych osobowych</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Dane osobowe Użytkowników mogą być przekazywane: podmiotom powiązanym z Administratorem, jego podwykonawcom, podmiotom współpracującym z Administratorem np. firmom obsługującym e-płatności, firmom świadczącym usługi kurierskie/pocztowe, kancelariom prawnym.</li>
              <li>Dane osobowe Użytkowników nie będą przekazywane poza teren Europejskiego Obszaru Gospodarczego (EOG).</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">VII. Prawa Użytkowników</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Użytkownik Serwisu ma prawo do: dostępu do treści swoich danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu wobec przetwarzania, cofnięcia zgody w każdej chwili (co nie ma wpływu na zgodność z prawem przetwarzania dokonanego w oparciu o zgodę przed jej cofnięciem).</li>
              <li>Zgłoszenie o wystąpieniu przez Użytkownika z uprawnieniem wynikającym z wymienionych praw należy przesłać na adres edumila.kontakt@gmail.com</li>
              <li>Administrator spełnia lub odmawia spełnienia żądania niezwłocznie – maksymalnie w ciągu miesiąca od jego otrzymania.</li>
              <li>Użytkownik ma prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeśli uzna, że przetwarzanie narusza jego prawa i wolności (RODO).</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">VIII. Pliki cookies</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Serwis zbiera informacje za pomocą plików cookies – sesyjnych, stałych i podmiotów zewnętrznych.</li>
              <li>Zbieranie plików cookies wspiera poprawne świadczenie usług w Serwisie i służy celom statystycznym.</li>
              <li>Użytkownik może określić zakres dostępu plików cookies do swojego urządzenia w ustawieniach przeglądarki.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">IX. Zautomatyzowane podejmowanie decyzji i profilowanie</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Dane Użytkowników nie mogą być przetwarzane w zautomatyzowany sposób tak, że na skutek tego mogłyby zapaść wobec nich jakiekolwiek decyzje.</li>
              <li>Dane Użytkowników mogą być profilowane celem dostosowania treści i personalizacji oferty po wyrażeniu przez nich zgody.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">X. Postanowienia końcowe</h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>Administrator ma prawo do wprowadzenia zmian w Polityce prywatności, przy czym prawa Użytkowników nie zostaną ograniczone.</li>
              <li>Informacja o wprowadzonych zmianach pojawi się w formie komunikatu dostępnego w Serwisie.</li>
              <li>W sprawach nieuregulowanych w niniejszej Polityce prywatności obowiązują przepisy RODO i przepisy prawa polskiego.</li>
            </ol>
          </section>
        </article>
      </Section>
    </>
  );
}
