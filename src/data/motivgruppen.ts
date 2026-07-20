/**
 * Motivgruppen der Moosburger Straßennamen — thematische Viertel mit
 * redaktionellem Inhalt (Viertel-Beschreibung + je Straße Kurz-/Langtext).
 *
 * Diese Daten speisen den Karten-Explorer auf der Straßennamen-Seite: Die
 * `name`-Werte entsprechen exakt den OSM-Straßennamen in
 * public/data/strassen-geo.json, sodass die Straßen auf der Karte hervorgehoben
 * werden können. Lange Texte sind mit Backticks umschlossen, damit Anführungs-
 * zeichen im Text unproblematisch sind.
 */

export type MotivStrasse = { name: string; kurz: string; lang: string };

export type MotivViertel = {
  id: string;
  name: string;
  familie: string;
  accent: string; // CSS-Farbe für UI-Akzente
  beschreibung: string;
  strassen: MotivStrasse[];
};

export const motivViertel: MotivViertel[] = [
  {
    id: "komponisten",
    name: "Komponistenviertel",
    familie: "Persönlichkeiten · Musik & Literatur",
    accent: "var(--color-rb-7)",
    beschreibung:
      `Nach Komponisten benannte Straßen gehören zu den häufigsten thematischen Benennungsmustern in deutschen Städten — kaum ein Ort ohne Bach-, Beethoven- oder Mozartstraße. Solche Namen gelten als politisch unverfänglich und eignen sich gut, um bei der Erschließung neuer Wohngebiete gleich mehrere Straßen konsistent zu benennen, ohne lokale Kontroversen auszulösen. Verbreitet ist das Muster über alle Regionen und Ortsgrößen hinweg, mit Häufungen in Neubaugebieten, die „auf einen Schlag" erschlossen wurden.`,
    strassen: [
      {
        name: "Bachstraße",
        kurz: `Johann Sebastian Bach (1685–1750) war ein Komponist und Organist des Barock, einer der wichtigsten Musiker überhaupt.`,
        lang: `Johann Sebastian Bach (1685–1750) wirkte unter anderem als Organist und Kapellmeister in Weimar und Köthen, bevor er 1723 Thomaskantor in Leipzig wurde. Sein Werk umfasst geistliche Kantaten, die Matthäus- und die Johannespassion, die h-Moll-Messe sowie Instrumentalwerke wie die Brandenburgischen Konzerte und das Wohltemperierte Klavier. Er gilt als Meister des Kontrapunkts und der Fuge und als eine der zentralen Figuren der abendländischen Musikgeschichte, dessen Einfluss bis in die Moderne reicht.`,
      },
      {
        name: "Beethovenstraße",
        kurz: `Ludwig van Beethoven (1770–1827) war ein Komponist, der die Musik von der Klassik zur Romantik weiterentwickelte.`,
        lang: `Ludwig van Beethoven (1770–1827) wurde in Bonn geboren und lebte ab 1792 überwiegend in Wien. Trotz zunehmender Ertaubung ab etwa 1800 komponierte er neun Sinfonien, zahlreiche Klaviersonaten, Streichquartette und sein einziges Opernwerk „Fidelio". Seine 9. Sinfonie mit der Vertonung von Schillers „Ode an die Freude" gilt als Meilenstein der Musikgeschichte und ist heute Grundlage der Europahymne. Beethoven markiert den Übergang von der Wiener Klassik zur Romantik.`,
      },
      {
        name: "Brucknerstraße",
        kurz: `Anton Bruckner (1824–1896) war ein österreichischer Komponist und Organist, bekannt für seine gewaltigen Sinfonien.`,
        lang: `Anton Bruckner (1824–1896) stammte aus Oberösterreich und wirkte zunächst als Organist im Stift St. Florian und am Linzer Dom, später als Hoforganist und Professor in Wien. Bekannt ist er vor allem für seine neun nummerierten, klanglich monumentalen Sinfonien sowie geistliche Chorwerke wie die Messen und das Te Deum. Sein tief religiöses Weltbild prägte sein Schaffen ebenso wie der Einfluss Richard Wagners, dessen Musik er bewunderte.`,
      },
      {
        name: "Haydnstraße",
        kurz: `Joseph Haydn (1732–1809) war ein Komponist, der die Sinfonie und das Streichquartett entscheidend geprägt hat.`,
        lang: `Joseph Haydn (1732–1809) stand über Jahrzehnte in den Diensten der Fürstenfamilie Esterházy, wo er einen Großteil seines umfangreichen Werks schuf. Er komponierte über 100 Sinfonien, zahlreiche Streichquartette, Messen und Oratorien wie „Die Schöpfung" und gilt als maßgeblicher Wegbereiter der klassischen Sonatenform. Haydn war zudem Freund und Förderer Mozarts sowie Lehrer des jungen Beethoven und prägte damit die Wiener Klassik entscheidend mit.`,
      },
      {
        name: "Mozartstraße",
        kurz: `Wolfgang Amadeus Mozart (1756–1791) war ein Komponist und Wunderkind, eines der größten musikalischen Genies überhaupt.`,
        lang: `Wolfgang Amadeus Mozart (1756–1791) wurde in Salzburg geboren und trat bereits als Kind in ganz Europa als Wunderkind auf, bevor er sich ab 1781 in Wien als freischaffender Komponist niederließ. Sein Werk umfasst über 600 Kompositionen nahezu aller Gattungen, darunter Opern wie „Die Zauberflöte" und „Die Hochzeit des Figaro", Sinfonien, Klavier- und Violinkonzerte sowie das unvollendete Requiem. Er starb bereits mit 35 Jahren, gilt aber bis heute als eines der größten musikalischen Genies der Geschichte.`,
      },
      {
        name: "Regerstraße",
        kurz: `Max Reger (1873–1916) war ein bayerischer Komponist und Organist, bekannt für seine komplexen Orgelwerke.`,
        lang: `Max Reger (1873–1916) wurde im oberpfälzischen Brand geboren und wirkte unter anderem in Weiden, München, Leipzig und Meiningen als Komponist, Organist und Dirigent. Er hinterließ ein sehr umfangreiches Werk, darunter komplexe, chromatisch geprägte Orgelwerke, Kammermusik, Orchesterwerke und Lieder. Reger gilt als einer der bedeutendsten Vertreter der Spätromantik im deutschsprachigen Raum und wird oft für die kontrapunktische Dichte und harmonische Komplexität seiner Musik hervorgehoben.`,
      },
      {
        name: "Richard-Strauss-Straße",
        kurz: `Richard Strauss (1864–1949) war ein Münchner Komponist und Dirigent, bekannt für Opern wie „Salome".`,
        lang: `Richard Strauss (1864–1949) wurde in München geboren und war neben seiner Tätigkeit als Komponist auch als Dirigent international tätig, unter anderem an der Wiener und der Berliner Staatsoper. Bekannt wurde er durch sinfonische Tondichtungen wie „Also sprach Zarathustra" und „Till Eulenspiegels lustige Streiche" sowie durch Opern wie „Salome", „Elektra" und „Der Rosenkavalier". Er zählt zu den bedeutendsten spätromantischen Komponisten und übernahm 1933 kurzzeitig ein offizielles Amt in der nationalsozialistischen Reichsmusikkammer, von dem er sich 1935 zurückzog.`,
      },
    ],
  },
  {
    id: "dichter",
    name: "Dichterviertel",
    familie: "Persönlichkeiten · Musik & Literatur",
    accent: "var(--color-rb-8)",
    beschreibung:
      `Nach Dichtern und Schriftstellern benannte Straßen sind in Deutschland ebenfalls ein sehr verbreitetes Muster — insbesondere Goethe- und Schillerstraßen finden sich in nahezu jeder deutschen Stadt. Diese Praxis hat ihren Ursprung vor allem im 19. Jahrhundert, als sich im Zuge eines wachsenden nationalen Kulturbewusstseins der literarische Kanon der Weimarer Klassik als Namensgeber etablierte, und setzte sich im 20. Jahrhundert fort. Wie bei den Musikerstraßen handelt es sich um unpolitische, konsensfähige Namen, die sich gut für die geschlossene Benennung mehrerer Straßen eines Viertels eignen.`,
    strassen: [
      {
        name: "Eichendorffstraße",
        kurz: `Joseph von Eichendorff (1788–1857) war ein Dichter der Romantik, bekannt für Naturgedichte und „Aus dem Leben eines Taugenichts".`,
        lang: `Joseph von Eichendorff (1788–1857) entstammte einem schlesischen Adelsgeschlecht und gilt als einer der wichtigsten Lyriker der deutschen Romantik. Viele seiner Gedichte, geprägt von Naturbildern, Wanderschaft und Sehnsucht, wurden später vertont und zählen zu den bekanntesten deutschen Kunstliedern. Bekanntheit erlangte er zudem durch seine Novelle „Aus dem Leben eines Taugenichts", die das romantische Ideal eines unbeschwerten, naturverbundenen Lebens verkörpert.`,
      },
      {
        name: "Goethestraße",
        kurz: `Johann Wolfgang von Goethe (1749–1832) war Dichter und Staatsmann – die wohl wichtigste Figur der deutschen Literatur.`,
        lang: `Johann Wolfgang von Goethe (1749–1832) wurde in Frankfurt am Main geboren und wirkte den größten Teil seines Lebens in Weimar, unter anderem als Minister im Herzogtum Sachsen-Weimar-Eisenach. Sein literarisches Werk reicht vom Sturm-und-Drang-Roman „Die Leiden des jungen Werthers" bis zum Drama „Faust", daneben war er als Naturforscher unter anderem in der Farbenlehre und Morphologie tätig. Gemeinsam mit Friedrich Schiller prägte er die Weimarer Klassik und gilt bis heute als zentrale Gestalt der deutschen Literaturgeschichte.`,
      },
      {
        name: "Hans-Sachs-Straße",
        kurz: `Hans Sachs (1494–1576) war ein Nürnberger Schuhmacher, der nebenbei tausende Gedichte und Lieder schrieb.`,
        lang: `Hans Sachs (1494–1576) war Schuhmachermeister in Nürnberg und zugleich der bekannteste Vertreter des Meistersangs, einer bürgerlichen Dichtungstradition des Spätmittelalters. Er verfasste mehrere tausend Werke, darunter Meisterlieder, Fastnachtsspiele und Schwänke, und unterstützte die Reformation und Martin Luther mit seinen Schriften. Bekannt ist er bis heute nicht zuletzt durch Richard Wagners Oper „Die Meistersinger von Nürnberg", in der er als Titelfigur auftritt.`,
      },
      {
        name: "Schillerstraße",
        kurz: `Friedrich Schiller (1759–1805) war ein Dichter und Dramatiker, bekannt für Stücke wie „Wilhelm Tell".`,
        lang: `Friedrich Schiller (1759–1805) wurde in Marbach am Neckar geboren und schuf mit Dramen wie „Die Räuber", „Don Carlos", „Wallenstein" und „Wilhelm Tell" zentrale Werke des deutschen Theaters. Neben seiner dichterischen Arbeit war er auch als Historiker und Philosoph tätig und stand ab 1794 in enger freundschaftlicher und künstlerischer Zusammenarbeit mit Goethe in Weimar. Sein Gedicht „An die Freude" wurde durch Beethovens Vertonung in dessen 9. Sinfonie weltberühmt.`,
      },
    ],
  },
  {
    id: "voegel",
    name: "Vogelviertel",
    familie: "Tiere · Vögel & Fische",
    accent: "var(--color-rb-6)",
    beschreibung:
      `Nach Vogelarten benannte Straßenzüge sind in deutschen Wohngebieten ein bekanntes und relativ häufiges Muster. Die hier versammelten Arten reichen von häufigen Garten- und Waldvögeln (Amsel, Meise, Fink) über typische Feld- und Wiesenvögel (Lerche, Kiebitz) bis zu Greifvögeln (Falke, Habicht, Sperber). Moosburg hat dabei einen konkreten Bezug: Unmittelbar an der Stadt liegt mit der seit 1982 geschützten Vogelfreistätte Mittlere Isarstauseen eines der bedeutendsten Wasservogelschutzgebiete Bayerns, und der Landkreis Freising gilt als bayernweit bedeutender Brutraum für den gefährdeten Kiebitz.`,
    strassen: [
      {
        name: "Amselstraße",
        kurz: `Die Amsel ist ein weit verbreiteter Singvogel mit auffällig orangefarbenem Schnabel und melodischem Gesang.`,
        lang: `Die Amsel (Turdus merula) gehört zur Familie der Drosseln und zählt zu den häufigsten und bekanntesten Singvögeln in deutschen Gärten und Parks. Die Männchen sind komplett schwarz gefiedert mit einem markanten orangegelben Schnabel, während Weibchen eher unscheinbar braun gefärbt sind. Bekannt ist die Amsel vor allem für ihren melodischen, weit hörbaren Gesang, mit dem sie oft schon in der Morgendämmerung beginnt.`,
      },
      {
        name: "Auerhahnstraße",
        kurz: `Der Auerhahn ist der größte europäische Waldvogel, bekannt für sein imposantes Balzverhalten und selten geworden.`,
        lang: `Der Auerhahn, das Männchen des Auerhuhns (Tetrao urogallus), ist der größte Vertreter der Raufußhühner in Europa und bewohnt bevorzugt störungsarme, alte Nadel- und Mischwälder. Bekannt ist er vor allem für sein auffälliges Balzverhalten im Frühjahr, bei dem die Hähne mit gesträubtem Gefieder und typischen Balzlauten um die Weibchen werben. Durch den Verlust geeigneter Waldlebensräume ist der Bestand in weiten Teilen Deutschlands stark zurückgegangen, weshalb die Art heute streng geschützt ist.`,
      },
      {
        name: "Drosselweg",
        kurz: `Drosseln sind eine Familie von Singvögeln, zu der unter anderem Sing- und Wacholderdrossel gehören.`,
        lang: `Als Drosseln (Turdidae) bezeichnet man eine Familie von Singvögeln, zu der neben der Amsel auch die Singdrossel und die Wacholderdrossel zählen. Viele Arten sind für ihren kräftigen, oft mehrstrophigen Gesang bekannt und ernähren sich überwiegend von Insekten, Würmern und Beeren. Drosseln sind in Wäldern, Parks und Gärten weit verbreitet und zählen zu den häufig zu beobachtenden heimischen Singvögeln.`,
      },
      {
        name: "Falkenstraße",
        kurz: `Falken sind schnelle Greifvögel; der bei uns häufigste Vertreter ist der Turmfalke.`,
        lang: `Falken (Falconidae) bilden eine eigene Familie unter den Greifvögeln und sind für ihren schnellen, wendigen Flug bekannt. Der in Deutschland häufigste Vertreter ist der Turmfalke (Falco tinnunculus), der häufig im charakteristischen Rüttelflug über Feldern nach Mäusen jagt. Andere heimische Arten wie der Wanderfalke gelten als die schnellsten Tiere der Welt und erreichen im Sturzflug Geschwindigkeiten von über 300 km/h.`,
      },
      {
        name: "Fasanenstraße",
        kurz: `Der Fasan ist ein ursprünglich aus Asien stammender Hühnervogel, der seit Jahrhunderten in Europa als Jagdwild gilt.`,
        lang: `Der Fasan (Phasianus colchicus) stammt ursprünglich aus Asien und wurde bereits vor Jahrhunderten in Europa als Jagd- und Ziervogel eingeführt, wo er sich vielerorts dauerhaft angesiedelt hat. Die Männchen fallen durch ihr prachtvolles, buntes Federkleid und den langen Schwanz auf, während Weibchen unscheinbar braun gefärbt sind. Fasane bevorzugen offenes, strukturreiches Agrarland mit Hecken und Feldrändern und gelten bis heute als beliebtes Niederwild.`,
      },
      {
        name: "Finkenstraße",
        kurz: `Finken sind kleine Singvögel; der Buchfink zählt zu den häufigsten Vogelarten Deutschlands.`,
        lang: `Zur Familie der Finken (Fringillidae) gehören zahlreiche kleine, meist bunt gefärbte Singvögel mit kräftigem, kegelförmigem Schnabel, der zum Knacken von Sämereien geeignet ist. Der bekannteste heimische Vertreter, der Buchfink (Fringilla coelebs), zählt zu den häufigsten Brutvögeln Deutschlands und ist an seinem charakteristischen, weithin hörbaren Gesang zu erkennen. Finken besiedeln vor allem Wälder, Gärten und Parks und ernähren sich überwiegend von Samen und Insekten.`,
      },
      {
        name: "Geibitzstraße",
        kurz: `Der Kiebitz ist ein gefährdeter Wiesenvogel mit markanter Federhaube, dessen Bestand stark zurückgegangen ist.`,
        lang: `Der Kiebitz (Vanellus vanellus), in bairischer Mundart auch „Geibitz" genannt, ist ein Watvogel mit auffälliger Federhaube und einem unverwechselbaren, ruckartigen Balzflug. Er brütet bevorzugt am Boden offener, feuchter Wiesen und Weiden und ist an seinem charakteristischen „kiwitt"-Ruf gut zu erkennen. Durch die Trockenlegung von Feuchtwiesen und die Intensivierung der Landwirtschaft ist der Bestand stark zurückgegangen, weshalb der Kiebitz heute als gefährdet gilt. Der Landkreis Freising zählt bayernweit zu den wichtigeren Brutgebieten der Art.`,
      },
      {
        name: "Habichtweg",
        kurz: `Der Habicht ist ein kräftiger Waldgreifvogel, der in dichten Wäldern lebt und Vögel und Kleinsäuger jagt.`,
        lang: `Der Habicht (Accipiter gentilis) ist ein mittelgroßer bis kräftiger Greifvogel, der bevorzugt in geschlossenen Wäldern lebt und dort mit hoher Wendigkeit zwischen den Bäumen jagt. Er ernährt sich vor allem von mittelgroßen Vögeln und Säugetieren wie Tauben oder Krähen, die er im schnellen Verfolgungsflug erbeutet. Wegen seiner Jagdfähigkeiten wurde der Habicht historisch auch in der Falknerei eingesetzt und gilt bis heute als einer der geschicktesten heimischen Jäger unter den Vögeln.`,
      },
      {
        name: "Kleiberstraße",
        kurz: `Der Kleiber ist ein kleiner Singvogel, der als einziger heimischer Vogel kopfüber Bäume hinabläuft.`,
        lang: `Der Kleiber (Sitta europaea) ist an seiner blaugrauen Oberseite, dem kräftigen Schnabel und dem schwarzen Augenstreif gut zu erkennen. Als einzige heimische Vogelart ist er in der Lage, Baumstämme nicht nur hinauf, sondern auch kopfüber hinabzulaufen, auf der Suche nach Insekten in der Rinde. Charakteristisch ist zudem sein Verhalten, den Eingang seiner Bruthöhle mit Lehm auf die passende Größe zu verkleinern, was ihm im Volksmund den Namen „Spechtmeise" eingebracht hat.`,
      },
      {
        name: "Lerchenstraße",
        kurz: `Die Feldlerche ist ein Vogel offener Felder, bekannt für ihren Gesang im hohen Steigflug.`,
        lang: `Die Feldlerche (Alauda arvensis), meist einfach als „Lerche" bezeichnet, ist ein unscheinbar braun gefärbter Vogel offener Acker- und Wiesenlandschaften. Bekannt ist sie vor allem für ihren charakteristischen Gesang, den die Männchen oft minutenlang im steilen Aufstiegsflug hoch über dem Feld vortragen. Als Symbol des Frühlings besungen, ist ihr Bestand durch die Intensivierung der Landwirtschaft in den letzten Jahrzehnten spürbar zurückgegangen.`,
      },
      {
        name: "Meisenstraße",
        kurz: `Meisen sind kleine, gesellige Singvögel, die häufig Gärten und Nistkästen besiedeln.`,
        lang: `Zur Familie der Meisen (Paridae) gehören mehrere kleine, meist bunt gefärbte Singvogelarten, von denen die Kohlmeise (Parus major) mit ihrer gelben Brust und schwarzer Kopfzeichnung die bekannteste ist. Meisen sind sehr wendige und geschickte Vögel, die sich häufig an Gärten und Futterstellen zeigen und gerne künstliche Nistkästen als Bruthöhle annehmen. Als eifrige Insektenjäger leisten sie zudem einen wichtigen Beitrag zur biologischen Schädlingsbekämpfung.`,
      },
      {
        name: "Schwalbenstraße",
        kurz: `Schwalben sind Zugvögel, die den Sommer über in Lehmnestern an Gebäuden brüten.`,
        lang: `Schwalben (Hirundinidae) wie die Rauch- (Hirundo rustica) und die Mehlschwalbe (Delichon urbicum) sind wendige Flieger, die einen Großteil ihrer Zeit jagend in der Luft verbringen, wo sie Insekten im Flug erbeuten. Sie überwintern in Afrika und legen dabei jährlich tausende Kilometer zurück, bevor sie im Frühjahr an ihre Brutplätze zurückkehren. Charakteristisch sind ihre aus Lehm und Speichel gebauten Nester an Gebäuden, weshalb die Schwalbe seit jeher als Glücksbringer und Bote des Sommers gilt.`,
      },
      {
        name: "Sperberstraße",
        kurz: `Der Sperber ist ein kleiner, wendiger Greifvogel, der vor allem kleine Singvögel jagt.`,
        lang: `Der Sperber (Accipiter nisus) ist ein kleiner, sehr wendiger Greifvogel, der mit kurzen, gerundeten Flügeln geschickt zwischen Bäumen und Hecken jagt. Er hat sich auf die Jagd nach kleinen bis mittelgroßen Vögeln spezialisiert, die er in schnellen Überraschungsangriffen aus Deckungen heraus erbeutet. Der Sperber ist inzwischen auch in Siedlungsgebieten häufig anzutreffen, wo er gezielt Gärten mit Futterstellen als Jagdrevier nutzt.`,
      },
      {
        name: "Starenweg",
        kurz: `Der Star ist ein geselliger Singvogel, bekannt für seine riesigen, kunstvoll fliegenden Schwärme im Herbst.`,
        lang: `Der Star (Sturnus vulgaris) ist ein mittelgroßer Singvogel mit dunklem, im Sonnenlicht metallisch schimmerndem Gefieder. Bekannt ist er vor allem für sein ausgeprägtes Sozialverhalten: Besonders im Herbst versammeln sich Stare zu riesigen Schwärmen, die in eindrucksvoll koordinierten Flugformationen am Himmel Muster bilden. Zudem ist der Star ein begabter Stimmenimitator, der Rufe anderer Vögel und selbst Umgebungsgeräusche in seinen Gesang einbaut.`,
      },
      {
        name: "Taubenstraße",
        kurz: `Tauben sind weit verbreitete Vögel; die Ringeltaube ist die häufigste heimische Wildtaubenart.`,
        lang: `Zur Familie der Tauben (Columbidae) zählen sowohl wild lebende Arten wie die Ringeltaube (Columba palumbus), die häufigste heimische Wildtaube, als auch die von der Felsentaube abstammende Haustaube, die seit Jahrtausenden vom Menschen gehalten wird. Tauben sind an ihrem gedrungenen Körperbau, dem kleinen Kopf und dem charakteristischen, gurrenden Ruf zu erkennen. Als Symbol des Friedens ist die Taube zudem tief in Kultur, Religion und Kunst verankert.`,
      },
    ],
  },
  {
    id: "fische",
    name: "Fischviertel",
    familie: "Tiere · Vögel & Fische",
    accent: "var(--color-turquoise-accent)",
    beschreibung:
      `Nach Fischarten benannte Straßen sind seltener als etwa Vogel- oder Pflanzennamen, kommen aber ebenfalls vor — häufig in Gewässernähe oder in Gegenden mit Bezug zu Fischerei und Teichwirtschaft. Die hier versammelten Arten (Forelle, Hecht, Karpfen, Schleie und Zander) zählen zu den bekanntesten heimischen Speise- und Angelfischen. Der regionale Bezug ist deutlich: Alle fünf Arten sind in Gewässern bei Moosburg dokumentiert — etwa in der Isar, im Moosburger Weiher, im Sempt-Flutkanal oder in der Amper — und werden dort bis heute aktiv beangelt.`,
    strassen: [
      {
        name: "Forellenstraße",
        kurz: `Forellen sind schnelle Raubfische klarer, sauerstoffreicher Gewässer und beliebte Angelfische.`,
        lang: `Forellen, allen voran die heimische Bachforelle und die ursprünglich aus Nordamerika stammende Regenbogenforelle, bevorzugen klare, kühle und sauerstoffreiche Fließgewässer. Sie sind schnelle Jäger, die sich vor allem von Insekten, Kleinkrebsen und kleineren Fischen ernähren, und zählen zu den beliebtesten Zielfischen beim Sport- und Fliegenfischen. Die Isar bei Moosburg gilt selbst als klassischer Forellenfluss und wird entsprechend zum Fliegen- und Spinnfischen genutzt.`,
      },
      {
        name: "Hechtstraße",
        kurz: `Der Hecht ist ein gefräßiger Raubfisch und einer der häufigsten Angelfische heimischer Gewässer.`,
        lang: `Der Hecht ist ein schlanker, langgestreckter Raubfisch mit charakteristisch nach hinten verlagerten Flossen, der reglos im Schilf oder Krautfeld auf Beute lauert, bevor er blitzschnell zuschnappt. Er zählt zu den größten heimischen Süßwasserfischen und ernährt sich vor allem von anderen Fischen. In der Isar sowie in mehreren Gewässern bei Moosburg, etwa im Moosburger Weiher und im Sempt-Flutkanal, gehört der Hecht zu den am häufigsten gefangenen Arten.`,
      },
      {
        name: "Karpfenstraße",
        kurz: `Der Karpfen ist ein genügsamer Fisch stehender Gewässer und seit dem Mittelalter beliebter Teichfisch.`,
        lang: `Der Karpfen ist ein robuster, genügsamer Fisch, der bevorzugt in ruhigen, nährstoffreichen Gewässern wie Teichen und Weihern lebt und sich dort überwiegend am Gewässergrund von Kleintieren und Pflanzenresten ernährt. Bereits im Mittelalter wurde er von Klöstern gezielt in Teichen gezüchtet, unter anderem um an Fastentagen eine Fleischalternative zu haben, und zählt seither zu den wichtigsten Speisefischen Mitteleuropas. Auch in Gewässern rund um Moosburg, etwa im Moosburger Weiher oder in der Isar selbst, ist der Karpfen weit verbreitet.`,
      },
      {
        name: "Schleienstraße",
        kurz: `Die Schleie ist ein genügsamer Fisch schlammiger Weiher und Seen mit charakteristisch grünlicher Haut.`,
        lang: `Die Schleie ist an ihrer oliv- bis dunkelgrünen, schleimigen Haut und den kleinen, tief angesetzten Augen gut zu erkennen. Sie bevorzugt ruhige, pflanzenreiche und schlammige Gewässer wie Weiher und Altarme und kommt dabei auch mit geringem Sauerstoffgehalt gut zurecht. Im Moosburger Weiher zählt die Schleie neben Karpfen und Hecht zu den dokumentierten heimischen Fischarten.`,
      },
      {
        name: "Zanderstraße",
        kurz: `Der Zander ist ein kräftiger Raubfisch größerer Flüsse und Seen und ein beliebter Speisefisch.`,
        lang: `Der Zander ist ein schlanker, kräftiger Raubfisch mit markanten Reißzähnen, der vor allem in größeren, etwas trüberen Flüssen und Seen vorkommt. Er jagt bevorzugt in der Dämmerung und Nacht, wobei ihm seine an schwaches Licht angepassten Augen zugutekommen. Als schmackhafter Speisefisch ist der Zander bei Anglern sehr beliebt. In der Amper bei Moosburg zählt er zu den Hauptfischarten, deren Bestand durch regelmäßige Besatzmaßnahmen gefördert wird.`,
      },
    ],
  },
];
