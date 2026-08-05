# Inhalts-Register

*Stand: 5. August 2026 · nach 0.43*

Wo im Prototyp echter Moosburger Inhalt steht, wo etwas nur plausibel gesetzt ist und
worauf sich das „echt" jeweils stützt. Das Register ist ein Hintergrunddokument: es
gehört nicht auf die Website, sondern beantwortet vor jeder Präsentation die Frage,
welche Zahl man zitieren darf und welche nicht.

Belegt wurde gegen den Crawl in [scrape-out/](../scrape-out/), gegen die Datendateien in
[src/data/](../src/data/) und — beim Stadtrat — gegen das Geschwister-Projekt `council`.
Alle Nachweise sind nachvollziehbar: ein Begriff, der in `scrape-out/consolidated/pages`
nicht vorkommt, steht hier als erfunden.

---

## Stufen

| Stufe | Bedeutung | Freigabe |
|---|---|---|
| **A — belegt** | Aus einer benennbaren Quelle übernommen, Abfragedatum bekannt | zitierfähig, Alter prüfen |
| **B — abgeleitet** | Reale Grundlage, im Prototyp umgerechnet, umsortiert oder redaktionell neu geschrieben | inhaltlich prüfen, dann zitierfähig |
| **C — plausibel gesetzt** | Erfunden. Sieht echt aus, ist es nicht | vor Livegang vollständig ersetzen |
| **D — Mechanik-Mock** | Der Inhalt trägt nichts, er führt nur die Interaktion vor | braucht ein Zielsystem, keinen Text |
| **E — Weiterleitung** | Die Seite hält keinen eigenen Inhalt, sie verweist | Linkziel prüfen |

Eine Seite trägt oft zwei Stufen — reale Gebührentabelle über einem gemockten Kalender.
Dann stehen beide.

---

## Quellen und ihr Abfragestand

| Quelle | Umfang | Abgefragt | Liegt in |
|---|---|---|---|
| moosburg.de — Rathaus & Service | 738 Seiten | 23.–24.05.2026 | `scrape-out/moosburg-de` |
| moosburg.de — Leben & Freizeit | 732 Seiten | 24.05.2026 | `scrape-out/moosburg-de-leben` |
| moosburg.de — BAUEN | 118 Seiten | 24.05.2026 | `scrape-out/moosburg-de-bauen` |
| moosburg.de — Wirtschaft & Standort | 115 Seiten | 24.05.2026 | `scrape-out/moosburg-de-wirtschaft` |
| meinmoosburg.de — neun Teilbereiche | u. a. Firmenverzeichnis | 24.05.2026 | `scrape-out/meinmoosburg-*` |
| Zusammenführung beider Sites | 2.272 kanonische URLs | 25.05.2026 | `scrape-out/consolidated` |
| `haushaltvis` — Haushalt der Stadt | Ansatz 2024, brutto | Haushaltsjahr 2024 | `src/data/haushalt.ts` |
| `datahub` — Bürgerumfragen | vier Erhebungen 2023–2025 | verlinkt, nicht eingebettet | `Beteiligung.tsx` |
| `council` — Stadtratsdaten | 54 Mandate, Ämter mit Zeiträumen; 11 angekündigte Sitzungen | abgeglichen 05.08.2026 | `src/data/stadtrat.ts` (Kopie) |
| OpenStreetMap (Overpass) | Straßengeometrien im Gemeindegebiet | 20.–21.07.2026 | `public/data/strassen-geo.json` |
| Kommunalwahl Moosburg | Stimmen, Stichwahl, Beteiligung | März 2026 | `src/data/wahlen.ts` |

Der Crawl ist die Grundlage der meisten A-Einträge. Er ist inzwischen **rund zweieinhalb
Monate alt** — für Satzungstitel und Ansprechpartner unkritisch, für Baustellen und
Öffnungszeiten nicht.

---

## Rathaus

| Seite | Stufe | Woher | Stand | Offen |
|---|---|---|---|---|
| [Termin buchen](../src/pages/flagship/TerminBuchen.tsx) | D | Slot-Raster gerechnet, jeder fünfte Termin gilt als belegt | — | Reale Dienststellen, Öffnungszeiten, Buchungssystem |
| [Online-Dienste](../src/pages/flagship/OnlineDienste.tsx) | A + B | Leistungsnamen aus dem Aufgabenkatalog „Was finde ich wo"; BayernPortal-Deeplinks echt, Erfüllungswege (PDF / intern / extern) handkuratiert | 25.05.2026 | Deeplink-IDs; ob die Stadt ein eigenes Serviceportal betreibt |
| [Stellenangebote](../src/data/jobs.ts) | C | elf erfundene Stellen | Fristen gerechnet ab 25.04.2026 | vollständig ersetzen |
| [Kontakt & Organigramm](../src/data/ansprechpartner.ts) | A | 96 Personen aus Verwaltungsgliederung, Telefonliste und Aufgabenkatalog | 25.05.2026 | Personalwechsel seit Mai; Porträts fehlen (Initialen-Platzhalter) |
| [Ver- & Entsorgung](../src/pages/flagship/VerEntsorgung.tsx) | A + D | Gebühren Restmüll, Wasser, Abwasser und Wertstoffhof aus dem Crawl | 24.05.2026 | Gebührenstand 2026; „Müllkalender für Ihre Adresse" ist ein Konto-Mock ohne Abfuhrdaten |
| [Bauen & Planen](../src/pages/flagship/Bauen.tsx) | B | Verfahrenswege redaktionell; Zuständigkeit Landratsamt Freising korrekt | — | Maßangaben zu verfahrensfreien Vorhaben gegen die BayBO |
| [Notdienste](../src/pages/flagship/Notfall.tsx) | A | Notrufnummern, Polizeiinspektion, BRK, drei Feuerwehren, Pegeldienste | — | Nummern stichprobenartig; die meisten Ziele sind externe Fachportale |
| [Satzungen](../src/data/satzungen.ts) | A + B | 98 Titel von `/Satzungen-und-Verordnungen`; die laienverständlichen Untertitel sind geschrieben, nicht übernommen | 24.05.2026 | **Kein PDF ist verlinkt** — `href` ist durchgehend Mock |

---

## Mein Moosburg

| Seite | Stufe | Woher | Stand | Offen |
|---|---|---|---|---|
| [Firmenverzeichnis](../src/data/firmen.ts) | A | 554 Einträge von meinmoosburg.de | 24.05.2026 | Pflege liegt bei der Marketing eG; die Kategorie „Informationen" enthält städtische Infoseiten, keine Firmen |
| [Essen & Trinken](../src/pages/flagship/Essen.tsx) | A | Filter über dieselben 554 Einträge | 24.05.2026 | wie oben |
| [Gesundheit](../src/pages/flagship/Gesundheit.tsx) | A + E | dito, dazu Apotheken- und Ärztesuche extern | 24.05.2026 | wie oben |
| [Einkaufen & Märkte](../src/pages/flagship/Einkaufen.tsx) | A + B | Firmen belegt; Wochenmarkt und Moosburg-Card redaktionell | 24.05.2026 | Markttage und -zeiten, Card-Konditionen |
| [Freizeit & Sport](../src/pages/flagship/Freizeit.tsx) | A + B | Städtische Einrichtungen belegt (Bücherei, Clariant Arena, Bäder, Stadthalle, Heimatmuseum, Münster); Öffnungszeiten teils redaktionell | 24.05.2026 | Öffnungszeiten, Eintritte |
| [Mobilität & Verkehr](../src/pages/flagship/Mobilitaet.tsx) | A + D | sechs Baustellen mit Original-Deeplinks; Kartenpins mit Mock-Koordinaten | 24.05.2026 | **alle sechs Zeiträume sind abgelaufen** |
| [Umwelt & Klima](../src/pages/flagship/Umwelt.tsx) | A | Chronik 2007–2018 mit Beschlussdaten, Fachbüros, Klimaschutzmanagerin | 24.05.2026 | die Chronik endet 2018 — acht Jahre fehlen |
| [Wohnen](../src/pages/flagship/Wohnen.tsx) | B | Wegweisertext, Firmen-Filter | 24.05.2026 | Wohngeld-Zuständigkeit, Bauplatzlisten fehlen ganz |
| [Familie & Bildung](../src/data/familieBildung.ts) | A | 28 Einrichtungen: Kitas, Schulen, Jugend, Spielplätze | **vor dem 13.05.2026**, außerhalb des Crawls erhoben | Erhebungsweg nachtragen — die Daten sind nicht aus `scrape-out` belegbar |
| [Was ist los?](../src/pages/flagship/Veranstaltungen.tsx) | C | acht erfundene Termine samt erfundener Autorin und erfundenem Fußballspiel | — | vollständig ersetzen; laut P3 die *einzige* Veranstaltungsquelle |
| [Diese Woche](../src/pages/flagship/DieseWoche.tsx) | C + D | Namen und Orte real („Oberes Gereuth", Drei-Rosen-Kindergarten), die Beschlüsse und Daten dazu erfunden; Wetter deterministischer Mock | — | vollständig ersetzen |
| [Stadtplan](../src/data/stadtkarte.ts) | D | 30 Punkte, Näherungskoordinaten im Stadtkern | — | reale Geodaten |

---

## Zu Besuch

| Seite | Stufe | Woher | Offen |
|---|---|---|---|
| [Moosburg entdecken](../src/data/sehenswuerdigkeiten.ts) | B | sieben Objekte; Eckdaten zu Münster und Leinberger-Altar real, Texte redaktionell | Jahreszahlen gegen Denkmalliste |
| [Geschichte & Erinnerung](../src/pages/flagship/Geschichte.tsx) | B + E | Zeitstrahl redaktionell; verweist auf stalag7a.de, stalag-moosburg.de, moosburg.org | Datierungen |
| [Stadtführungen](../src/data/fuehrungen.ts) | C | sechs Angebote prototypisch, Buchung als Mock über die Kontaktseite | gibt es reale Führungen, und wer bietet sie an |
| [Essen & Übernachten](../src/data/gastgeber.ts) | B + C | sieben Häuser — **Namen real**, Lage, Preisklasse und Merkmale ergänzt | alle Detailangaben |
| [Veranstaltungs-Highlights](../src/data/jahreshighlights.ts) | B + C | Frühlingsfest, Maibaum, Solar- & Umwelttage, Christkindlmarkt real; einzelne Sommer- und Herbsttermine ergänzt | Termine des laufenden Jahres |
| [Anreise & Parken](../src/pages/flagship/Anreise.tsx) | B | Parkflächen real benannt (Viehmarktplatz, P+R am Bahnhof, Plan …), die Regelungen dazu redaktionell | Höchstparkdauer, Gebühren, Wohnmobilstellplatz |

---

## Mitgestalten

| Seite | Stufe | Woher | Offen |
|---|---|---|---|
| [Wahlen](../src/data/wahlen.ts) | A + B | Kommunalwahl 2026: Stimmenanteile, Bürgermeisterwahl, Stichwahl, Wahlbeteiligung real | die Sitzverteilung ist aus den Anteilen **gerechnet** (Hare-Niemeyer), nicht amtlich übernommen |
| [Haushalt](../src/data/haushalt.ts) | A | Ansatz 2024 brutto, gerechnet aus `haushaltvis` | Fortschreibung auf 2026; Pro-Kopf-Wert hängt an der Einwohnerzahl (s. u.) |
| [Stadtrat](../src/data/stadtrat.ts) | A | Ämter und elf angekündigte Sitzungen aus `council`; Sitzverteilung aus `wahlen.ts`; Porträts aus `council/img/members` | Termine ab Januar 2027; Fraktionsvorsitzende führt `council` nicht |
| [Bürgerbeteiligung](../src/pages/flagship/Beteiligung.tsx) | C + A | vier laufende Verfahren erfunden; die vier verlinkten Umfragen sind reale Erhebungen | Verfahren ersetzen; Linkziele prüfen (s. Widerspruch 5) |
| [Stadtentwicklung](../src/pages/flagship/Stadtentwicklung.tsx) | C | acht Projekte — **keines** ist im Crawl belegt | reale Verfahren aus dem Bauamt |
| [Mängel melden](../src/pages/flagship/MaengelMelden.tsx) | D | Formular ohne Empfänger, vier Beispielmeldungen, Mock-Pins | Zielsystem und Bearbeitungsweg |

Erfunden, aber quer über vier Seiten konsistent durchgezogen: Bebauungsplan „Am
Amperwerk", Neubaugebiet Westerberg, Kita Pfettracher Straße, Sanierung
Kastulus-Realschule, Radwegekonzept, Innenstadtkonzept 2035, Klimaanpassungskonzept.
Sie tauchen in Stadtentwicklung, Beteiligung, Stadtrat und im Veranstaltungskalender
gleichlautend auf. Wer eines ersetzt, muss alle vier Stellen anfassen.

---

## Lebenslagen und Themenseiten

Die zwölf Lebenslagen sind durchgehend **Stufe B**: Verfahrenswissen, das allgemein
korrekt ist (Sterbeurkunde beim Standesamt, Pflegegrad bei der Kasse), redaktionell
formuliert und intern weiterverlinkt. Sie behaupten keine Moosburger Einzelheiten und
sind damit das am wenigsten prüfungsbedürftige Material der Site. Zwei Ausnahmen:

- **Vereinsleben** — die Vereinsliste ist als illustrativ markiert und ist es auch: TSV,
  Tennisclub, Schützengesellschaft und Stadtkapelle sind belegt, der „Gesangverein
  Liederkranz" kommt im gesamten Crawl nicht vor.
- **Neu in Moosburg** — verlinkt auf `/rathaus/breitband`, eine Seite, die es nicht gibt.

| Themenseite | Stufe | Woher |
|---|---|---|
| [Straßennamen](../src/data/motivgruppen.ts) | A + B | Straßennamen und Geometrien aus OSM (21.07.2026); die Motivgruppen sind eine Lesehilfe, keine amtliche Zuordnung — im Datenkopf ausdrücklich vermerkt |
| [Partnerstädte](../src/data/partnerstaedte.ts) | A + B | Unterzeichnungsdaten, Einwohnerzahlen, Lage real; die erzählenden Texte geschrieben |
| [Fair-Trade-Stadt](../src/pages/thema/FairTrade.tsx) | B + E | Kriterien und Kampagnenkontext von fairtrade-towns.de; Moosburger Bezug redaktionell |

---

## Rahmen

| Bereich | Stufe | Anmerkung |
|---|---|---|
| Startseite, Hub-Seiten | E | Navigationsflächen; Inhalt kommt aus `routes.ts` |
| [Nutzerkonto](../src/pages/Konto.tsx) | D | vollständig gemockt — Adress-Heuristik nach Anfangsbuchstabe, erfundene Vorgänge, Empfehlungsregeln. Kein Persistenzweg, wie vorgesehen |
| [Konzept](../src/pages/Konzept.tsx) | — | interne Projektdokumentation, keine Bürgerseite |
| Impressum, Datenschutz, Barrierefreiheit, Leichte Sprache | — | im Footer verlinkt, **existieren nicht** — s. Widerspruch 6 |

---

## Widersprüche, die vor einer Freigabe zu klären sind

**1. Drei Einwohnerzahlen gleichzeitig sichtbar.**
`Entdecken` zeigt 19.309 (Ende 2021, amtlich, mit Jahresangabe — korrekt).
`haushalt.ts` rechnet den Pro-Kopf-Haushalt gegen 20.107 („Stand 2025", ohne Quelle).
`Konzept` nennt 20.990. CLAUDE.md führt diese Frage seit April als offen (Abschnitt 10.9);
solange sie offen ist, sollte nur die amtliche Zahl mit Stichtag im Umlauf sein — und
der Pro-Kopf-Wert im Haushalt auf derselben Basis stehen.

**2. Die eigene Bürgerbefragung wird mit zwei Fallzahlen zitiert.**
`Beteiligung.tsx` nennt n = 98, CLAUDE.md und der LMU-Bericht nennen n = 86. Eine der
beiden Zahlen ist falsch, und es ist die Befragung, auf der die Feature-Priorisierung
dieses Projekts beruht.

**3. Die Bürgermeister-Riege auf der Stadtratsseite stimmt nicht.** — *behoben am 05.08.2026*
Drei der vier genannten Personen trugen ein Amt, das sie nicht haben: Zweiter
Bürgermeister ist Reinhard Lauterbach (FW), nicht Nathalie von Pressentin; Dritter ist
Dr. Michael Stanglmaier (Grüne), nicht Erwin Weber, dessen Mandat am 30.04.2026 endete;
Philipp Fincke ist FDP, nicht parteilos. Die Seite zeigt jetzt die drei Bürgermeister
nach `council`, mit deren Porträts. Fraktionsvorsitze behauptet sie nicht mehr —
`council` führt sie nicht.

Im selben Zug zwei Funde derselben Art auf derselben Seite entfernt: der Erste
Bürgermeister war mit einem **Stockfoto** abgebildet und trug ein **erfundenes Zitat** in
Anführungszeichen. Beides jetzt ersetzt — echtes Porträt aus `council`, statt des Zitats
das Wahlergebnis und die Vorzimmer-Nummer aus `ansprechpartner.ts`. Die Zimmerangabe
„1. OG, Zimmer 14" war ebenfalls erfunden und ist raus.

**4. Die Baustellenliste ist abgelaufen.**
Sechs echte Sperrungen aus dem Crawl, letzter Zeitraum bis 07.08.2026, die übrigen
längst vorbei. Echte Daten mit abgelaufenem Stand wirken in einer Demo schlechter als
offensichtliche Platzhalter.

**5. Drei von vier Umfrage-Links zeigen auf nicht veröffentlichte Datensätze.**
`Beteiligung.tsx` verlinkt `website_innovationen_2025`, `bahnhofumfrage_2023`,
`christkindlmarkt_2025` und `volksfest_2024` in den `datahub`. Dort sind nur
`bahnhofumfrage_2023`, `volksfest_2024` und `statistik_kommunal_2022` öffentlich; ein
Workflow-Schritt löscht die übrigen Rohdaten aus dem Build. Vor der nächsten
Präsentation prüfen, ob die Links laufen.

**6. Die Pflichtseiten fehlen.**
Impressum, Datenschutz, Barrierefreiheitserklärung und Leichte Sprache stehen im Footer
und führen auf „Seite nicht gefunden". Für einen Prototyp vertretbar, für die
Barrierefreiheitserklärung ab Livegang nicht — sie ist selbst Gegenstand der
BITV-Prüfung.

**7. Keine einzige Satzung ist verlinkt.**
98 Titel mit handgeschriebenen Erklärungen, `href` durchgehend Mock. Die PDFs liegen
auf moosburg.de und wären mechanisch aus dem Crawl zuzuordnen.

**8. Der Lorem-Ipsum-Generator ist toter Code.**
`src/lib/lorem.ts` füllt `StubPage`. Seit alle 47 Routen aus `routes.ts` eine eigene
Seite haben, wird dort nur noch der „Seite nicht gefunden"-Zweig erreicht — Lorem ipsum
kann nicht mehr auf den Bildschirm kommen. Gemeldet, nicht gelöscht.

---

## Was nur weiterleitet

Ziele außerhalb des Prototyps, gruppiert nach Verlässlichkeit:

**Behörden und Fachportale** — dauerhaft, unkritisch: bayernportal.de,
fuehrungszeugnis.bund.de, personalausweisportal.de, portal.ikfz.de, kreis-freising.de,
arbeitsagentur.de, rundfunkbeitrag.de, muenchen.ihk.de, mvv-muenchen.de, bahn.de,
portal.little-bird.de.

**Notfall und Gesundheit** — fünfzehn Domains allein auf `/rathaus/notfall`, darunter
116117.de, aponet.de, krisendienste.bayern, hnd.bayern.de, hochwasserinfo.bayern.de,
polizei.bayern.de, brk-moosburg.de, telefonseelsorge, nummergegenkummer.de. Diese Seite
ist fast vollständig Stufe E; sie hält kaum eigenen Inhalt, und das ist richtig so.
`/mein-moosburg/gesundheit` ergänzt aponet.de und blaek.de für Notdienst- und
Arztsuche.

**Kuratierte Partner im Footer** (Prinzip P4) — seit 05.08.2026 fünf Ziele: moosburg.org,
alt-moosburg.de, meinmoosburg.de, stalag7a.de und der Wikipedia-Artikel. Der tote
`href="#"` beim Heimatmuseum ist damit weg, dermoosburger.de ist aus der Liste
genommen. Auf der Geschichtsseite steht zusätzlich stalag-moosburg.de.

**Geschwister-Projekte** — bagruber.github.io/council (Stadtrat, Stadtentwicklung,
Wahlen) und bagruber.github.io/datahub (Beteiligung). Nach dem Umzug auf moosburg.eu
sind das `/stadtrat/` und `/data/`; die Links im Prototyp zeigen noch auf GitHub Pages.

**Altbestand** — meinmoosburg.de wird von fünf Seiten aus verlinkt (Einkaufen, Essen,
Gesundheit, Freizeit, Mobilität), moosburg.de von dreien. Beide Domains sollen nach
Prinzip P3 aufgehen; die Links sind Übergangsbehelf und gehören auf die Abschaltliste.
