import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/rodzic/regulamin")({
  head: () => ({
    meta: [
      { title: "Regulamin usług edukacyjnych — EduMila" },
      {
        name: "description",
        content:
          "Regulamin korepetycji z matematyki i chemii prowadzonych przez EduMila — Karolinę Widlarz.",
      },
    ],
  }),
  component: Regulations,
});

const sections = [
  "Dane firmy",
  "Rodzaj i zakres świadczonych usług",
  "Płatności",
  "Odwoływanie zajęć",
  "Prawa i obowiązki Stron",
  "Warunki korzystania z usług w formie zdalnej",
  "Prawa autorskie",
  "Klauzula RODO",
  "Postanowienia końcowe",
];

const LetterList = ({ children }: { children: React.ReactNode }) => (
  <ol className="mt-4 list-[lower-alpha] space-y-3 pl-6 marker:font-semibold marker:text-parent">
    {children}
  </ol>
);

function Regulations() {
  return (
    <>
      <PageHero
        eyebrow="Regulamin"
        tone="parent"
        title="Regulamin usług edukacyjnych"
        subtitle="Warunki korepetycji stacjonarnych i online w roku szkolnym 2026/2027."
      />

      <Section>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="card-surface p-5 lg:sticky lg:top-32" aria-label="Spis treści">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-parent">
              Spis treści
            </p>
            <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
              {sections.map((section, index) => (
                <li key={section}>
                  <a className="transition hover:text-foreground" href={`#punkt-${index + 1}`}>
                    {index + 1}. {section}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="card-surface px-5 py-8 sm:px-8 lg:px-12">
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Niniejsze postanowienia określają warunki świadczenia usług edukacyjnych przez
              Karolinę Widlarz działającej pod firmą „Korepetycje - Karolina Widlarz”, zwaną dalej
              „Korepetytorem”. Usługi są świadczone na rzecz Uczniów (osób bezpośrednio
              uczestniczących w zajęciach), a umowa o ich świadczenie zawierana jest z Uczniem,
              jeśli jest osobą pełnoletnią, lub z jego Rodzicem/Opiekunem Prawnym (osobą
              reprezentującą Ucznia).
            </p>

            <div className="mt-10 space-y-12 leading-7 text-muted-foreground">
              <section id="punkt-1" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">1. Dane firmy</h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-parent">
                  <li>Nazwa firmy: Korepetycje - Karolina Widlarz</li>
                  <li>Imię i nazwisko właściciela: Karolina Widlarz</li>
                  <li>Adres siedziby firmy: ul. Pniaki 190, 34-124 Klecza Dolna</li>
                  <li>NIP: 5512667603</li>
                  <li>REGON: 529419519</li>
                  <li>
                    Adres e-mail:{" "}
                    <a
                      className="text-parent underline underline-offset-4"
                      href="mailto:edumila.kontakt@gmail.com"
                    >
                      edumila.kontakt@gmail.com
                    </a>
                  </li>
                  <li>
                    Numer telefonu:{" "}
                    <a className="text-parent underline underline-offset-4" href="tel:+48667541916">
                      667 541 916
                    </a>
                  </li>
                </ul>
              </section>

              <section id="punkt-2" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">
                  2. Rodzaj i zakres świadczonych usług
                </h2>
                <LetterList>
                  <li>
                    Korepetytor świadczy usługi edukacyjne, tj. udziela korepetycji z matematyki i
                    chemii, zwanych dalej „Zajęciami”, według metody autorskiej oraz z
                    wykorzystaniem materiałów przygotowanych przez Korepetytora.
                  </li>
                  <li>
                    Zajęcia są realizowane w formie lekcji indywidualnych/grupowych dwuosobowych
                    drogą elektroniczną (tj. zdalnie) albo stacjonarnie pod adresem ul. Pniaki 190,
                    34-124 Klecza Dolna.
                  </li>
                  <li>
                    Uczeń pełnoletni może zapisać się na zajęcia poprzez kontakt z Korepetytorem pod
                    numerem telefonu 667 541 916, mailowo na adres edumila.kontakt@gmail.com lub
                    przez formularz dostępny na stronie edumila.pl.
                  </li>
                  <li>
                    Ucznia niepełnoletniego zapisuje w wyżej opisany sposób Rodzic lub Opiekun
                    Prawny.
                  </li>
                  <li>Zajęcia odbywają się w terminie umówionym przez Korepetytora i Ucznia.</li>
                  <li>Każde z zajęć trwa pełne 60 lub 90 minut.</li>
                  <li>
                    Zajęcia realizowane drogą elektroniczną odbywają się w formie transmisji w
                    czasie rzeczywistym (na żywo), na platformach: Google Meet, Microsoft Teams,
                    Zoom udostępnionej przez Korepetytora.
                  </li>
                  <li>
                    Uczeń oraz Korepetytor wspólnie decydują o wyborze platformy wymienionej wyżej
                    przed rozpoczęciem Zajęć, z możliwością jej zmiany.
                  </li>
                </LetterList>
              </section>

              <section id="punkt-3" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">3. Płatności</h2>
                <LetterList>
                  <li>
                    Cena zajęć indywidualnych 60-minutowych w roku szkolnym 2026/2027 wynosi 80 zł
                    (słownie: osiemdziesiąt złotych).
                  </li>
                  <li>
                    Cena zajęć indywidualnych 90-minutowych w roku szkolnym 2026/2027 wynosi 110 zł
                    (słownie: sto dziesięć złotych).
                  </li>
                  <li>
                    Cena zajęć grupowych 60-minutowych w roku szkolnym 2026/2027 wynosi 60 zł
                    (słownie: sześćdziesiąt złotych) za osobę.
                  </li>
                  <li>Powyższe ceny są cenami brutto.</li>
                  <li>
                    Korepetytor nie jest płatnikiem podatku VAT i nie dolicza tego podatku do
                    powyższej ceny.
                  </li>
                  <li>
                    Zapłata za zajęcia odbywa się z góry, najpóźniej 1 godzinę przed planowaną
                    lekcją.
                  </li>
                  <li>
                    Brak zapłaty umówionej ceny w wyznaczonym terminie jest równoznaczny z
                    rezygnacją z zajęć.
                  </li>
                  <li>
                    W przypadku dni ustawowo wolnych, przerwy świątecznej czy ferii zajęcia odbywają
                    się jedynie za wyraźną prośbą Ucznia i zgodą Korepetytora.
                  </li>
                  <li>
                    Płatność następuje:
                    <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-parent">
                      <li>
                        przelewem na rachunek bankowy Korepetytora o numerze:{" "}
                        <strong className="text-foreground">
                          62 1050 1100 1000 0090 8407 4393
                        </strong>{" "}
                        (ING Bank Śląski S.A.);
                      </li>
                      <li>
                        przelewem przy użyciu aplikacji bankowej metodą BLIK na numer telefonu
                        Korepetytora: <strong className="text-foreground">667 541 916</strong>;
                      </li>
                      <li>za pomocą płatności elektronicznych dostępnych na stronie edumila.pl.</li>
                    </ul>
                  </li>
                  <li>
                    Tytuł przelewu powinien zawierać imię i nazwisko Ucznia oraz datę zajęć, za
                    które uregulowana zostaje należność (przykładowo: [imię nazwisko], 01.09.2026
                    r.).
                  </li>
                </LetterList>
              </section>

              <section id="punkt-4" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">4. Odwoływanie zajęć</h2>
                <LetterList>
                  <li>
                    Zarówno Uczeń, jak i Korepetytor mają prawo przełożyć zajęcia najpóźniej na 24
                    godziny przed planowaną lekcją.
                  </li>
                  <li>
                    Jeżeli Uczeń nie zachowa terminu wskazanego w pkt a) niniejszego Regulaminu,
                    zajęcia uznaje się za odbyte, a Korepetytorowi przysługuje prawo do uzyskania
                    pełnego wynagrodzenia.
                  </li>
                  <li>
                    Jeżeli Korepetytor nie zachowa terminu wskazanego w pkt a) niniejszego
                    Regulaminu, Uczniowi przysługuje prawo do odbycia nieodpłatnych zajęć, które
                    będą nie krótsze niż pierwotnie planowana lekcja.
                  </li>
                  <li>
                    Ewentualne zwolnienie Korepetytora z obowiązku odrabiania zajęć następuje tylko
                    na wyraźne życzenie Ucznia, któremu przysługuje nieodpłatna lekcja.
                  </li>
                </LetterList>
              </section>

              <section id="punkt-5" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">
                  5. Prawa i obowiązki Stron
                </h2>
                <LetterList>
                  <li>
                    Korepetytor zobowiązuje się zapewnić pomoce dydaktyczne, w tym multimedialne w
                    przypadku zajęć w trybie zdalnym, oraz przysługuje mu prawo do zadawania
                    dodatkowych zadań domowych.
                  </li>
                  <li>
                    Korepetytor zapewnia Uczniowi możliwość kontaktu telefonicznego bądź mailowego
                    celem udzielenia doraźnej pomocy poza wyznaczonymi godzinami zajęć i w czasie
                    dyspozycyjności Korepetytora.
                  </li>
                  <li>
                    Korepetytor zobowiązuje się wykonywać świadczone usługi z należytą starannością.
                  </li>
                  <li>
                    Korepetytor nie ponosi odpowiedzialności za zachowanie Ucznia podczas zajęć.
                  </li>
                  <li>Uczeń zobowiązuje się do udziału w umówionych zajęciach.</li>
                  <li>
                    Uczeń i Korepetytor powinni punktualnie stawiać się na lekcje. W przypadku
                    spóźnienia się Ucznia zajęcia nie ulegają przedłużeniu, tj. kończą się po
                    upływie wcześniej ustalonego czasu trwania zajęć od zaplanowanej godziny, a
                    kwota należna za lekcję nie ulega zmianie. W przypadku opóźnienia w rozpoczęciu
                    zajęć z powodów leżących po stronie Korepetytora zajęcia ulegają wydłużeniu o
                    czas spóźnienia bądź ustala się inny, dogodny dla obu stron termin, w którym
                    spóźnienie można odrobić.
                  </li>
                </LetterList>
              </section>

              <section id="punkt-6" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">
                  6. Warunki korzystania z usług w formie zdalnej
                </h2>
                <LetterList>
                  <li>
                    Możliwość prawidłowego korzystania z usług świadczonych przez Korepetytora w
                    formie zdalnej jest uzależnione od łącznego spełnienia przez Ucznia
                    następujących wymagań technicznych:
                    <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-parent">
                      <li>
                        posiadanie urządzenia umożliwiającego połączenie z Internetem oraz wysoką
                        jakość połączenia (komputer stacjonarny z monitorem, laptop, tablet min.
                        10”). Korzystanie przez Ucznia ze smartfona może spowodować nieczytelność i
                        utrudnienie prowadzenia zajęć, za co Korepetytor nie ponosi
                        odpowiedzialności;
                      </li>
                      <li>
                        posiadanie sprawnego sprzętu audio (tj. głośniki, mikrofon), których
                        działanie należy sprawdzić przed rozpoczęciem każdych Zajęć;
                      </li>
                      <li>dostęp do Internetu umożliwiający wysoką jakość połączenia;</li>
                      <li>dostęp do poczty elektronicznej;</li>
                      <li>oprogramowanie Windows, macOS, Android lub IOS.</li>
                    </ul>
                  </li>
                  <li>
                    Korepetytor nie ponosi odpowiedzialności za nieprawidłowości w funkcjonowaniu
                    usług świadczonych w formie zdalnej wynikające z niespełnienia przez Ucznia
                    wymagań technicznych. Nieprzeprowadzenie lub skrócenie zajęć z powodu
                    niespełnienia przez Ucznia wymagań technicznych może wiązać się z naliczeniem
                    pełnej odpłatności za zajęcia.
                  </li>
                  <li>
                    Przed przystąpieniem do zajęć zdalnych Uczeń ma obowiązek upewnić się, że jego
                    oprogramowanie jest aktualne oraz że ma połączenie z siecią Internet.
                  </li>
                  <li>
                    Korepetytor może utrwalać przebieg zajęć w formie zdalnej wyłącznie na własny
                    użytek.
                  </li>
                  <li>
                    Uczeń/Rodzic/Opiekun Prawny oświadcza, iż wyraża zgodę na rejestrowanie
                    wizerunku Ucznia w postaci nagrania z zajęć z zapisem audio i wideo przez
                    Korepetytora w celu potwierdzenia przeprowadzonych zajęć i obecności Ucznia na
                    zajęciach. Uczeń/Rodzic/Opiekun Prawny oświadcza, że zgoda jest dobrowolna i
                    została udzielona świadomie.
                  </li>
                  <li>
                    Nagrania z zajęć będą przechowywane przez Korepetytora na dysku zewnętrznym
                    przez 2 tygodnie od dnia odbytych zajęć i nie będą nigdzie udostępniane.
                  </li>
                </LetterList>
              </section>

              <section id="punkt-7" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">7. Prawa autorskie</h2>
                <LetterList>
                  <li>
                    Pytania, zadania, polecenia i pomoce dydaktyczne, w tym interaktywne, są objęte
                    prawami autorskimi i stanowią własność Korepetytora. Jakiekolwiek wykorzystanie
                    (zastosowanie na lekcjach w szkole, zastosowanie na korepetycjach, powielanie za
                    pomocą urządzeń elektronicznych, drukowanie) bez wiedzy oraz zgody Korepetytora
                    jest zabronione.
                  </li>
                  <li>
                    Świadczenie usług edukacyjnych drogą elektroniczną, tj. zdalnie, przez
                    Korepetytora nie stanowi udzielenia Uczniowi licencji do korzystania z tych
                    treści.
                  </li>
                  <li>
                    Przekazywane przez Korepetytora materiały do nauki mogą być objęte prawami
                    autorskimi osób trzecich. Świadczenie przez Korepetytora nie stanowi udzielenia
                    Uczniowi licencji do korzystania z tych treści.
                  </li>
                  <li>
                    Korepetytor nie wyraża zgody na rozpowszechnianie nagrań z zajęć w formie
                    zdalnej ani przekazywanych materiałów.
                  </li>
                </LetterList>
              </section>

              <section id="punkt-8" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">8. Klauzula RODO</h2>
                <LetterList>
                  <li>
                    Administratorem danych osobowych jest Korepetytor, tj. Karolina Widlarz
                    działająca pod firmą „Korepetycje - Karolina Widlarz” z siedzibą w ul. Pniaki
                    190, 34-124 Klecza Dolna, zarejestrowaną w Centralnej Ewidencji Informacji
                    Działalności Gospodarczej, NIP: 5512667603, REGON: 529419519, e-mail:
                    edumila.kontakt@gmail.com, nr tel.: 667 541 916.
                  </li>
                  <li>
                    Dane osobowe będą przetwarzane w celu wykonywania świadczonych niniejszym
                    Regulaminem usług edukacyjnych przez czas 6 miesięcy od zakończenia ich
                    wykonywania w celach archiwalnych i statystycznych.
                  </li>
                  <li>
                    Podstawą przetwarzania niniejszych danych osobowych jest dobrowolnie wyrażona
                    zgoda, którą można cofnąć w dowolnym momencie.
                  </li>
                  <li>
                    Dane osobowe będą przetwarzane przez okres niezbędny do realizacji wyżej
                    określonych celów lub do czasu cofnięcia zgody.
                  </li>
                  <li>
                    Uczniowi/Rodzicowi/Opiekunowi Prawnemu przysługuje prawo dostępu do treści
                    swoich danych osobowych oraz, z zastrzeżeniem przepisów prawa: prawo ich
                    sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do przenoszenia
                    danych i prawo do wniesienia sprzeciwu wobec przetwarzania.
                  </li>
                  <li>
                    Dodatkowo, przysługuje Uczniowi/Rodzicowi/Opiekunowi Prawnemu prawo wniesienia
                    skargi do organu nadzorczego, tj. Prezesa Urzędu Danych Osobowych, gdy Uczeń
                    uzna, że przetwarzanie danych osobowych przez Administratora narusza przepisy
                    prawa.
                  </li>
                </LetterList>
              </section>

              <section id="punkt-9" className="scroll-mt-36">
                <h2 className="text-2xl font-semibold text-foreground">9. Postanowienia końcowe</h2>
                <LetterList>
                  <li>
                    Korepetytor zastrzega sobie prawo do zmiany niniejszego Regulaminu. Informacja o
                    zmianie regulaminu zostanie zamieszczona na stronie internetowej edumila.pl oraz
                    przekazana aktualnie korzystającym z zajęć Uczniom i/lub ich Rodzicom/Opiekunom
                    Prawnym pocztą elektroniczną.
                  </li>
                  <li>
                    Wszelkie pytania lub uwagi dotyczące Regulaminu lub świadczenia usług proszę
                    kierować na adres e-mail:{" "}
                    <a
                      className="text-parent underline underline-offset-4"
                      href="mailto:edumila.kontakt@gmail.com"
                    >
                      edumila.kontakt@gmail.com
                    </a>
                    .
                  </li>
                </LetterList>
              </section>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
