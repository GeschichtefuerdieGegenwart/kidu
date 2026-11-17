/* Kidu – Skillkoffer (ab Version 4.46; vorher »Methodenkoffer«, bis 11.11.2026 »Werkzeugkiste«).
   Entscheidung Mario, 17.11.2026: Der Methodenkoffer heißt Skillkoffer und richtet sich an Fortgeschrittene. Je Skill:
   was er tut, wie das Ergebnis aussieht, wo du ihn auf Kidu schon in Aktion siehst – und der Download.
   Die Bau-Skills (Plugin »kidu-bau«) bleiben privat (Entscheidungen 10.11. und 17.11.2026): Sie stehen hier nur mit dem,
   was damit entsteht, ohne Download.
   Regeln: Nichts erfinden. »Damit gebaut« steht nur, wo es belegt ist (Versionsberichte, Tresor). Sonst heißt es
   »So sieht so etwas aus« und verweist auf eine echte Seite. Fassung, Datum, Lizenz und Kurztexte kommen aus
   assets/daten/kurzfassungen.js (erzeugt aus den Skills) – hier steht nur, was dort fehlt.
   Gelesen von assets/werkzeugkiste.js. Keine Namen von KI-Anbietern. */
var SKILLKOFFER = {
  /* Reihenfolge = Reihenfolge auf der Seite. name/kurz nur, wenn die Kurzfassung des Skills keinen Namen hat. */
  oeffentlich: [
    { id: "kidu-start", name: "Der Einstieg: kidu-start",
      kurz: "Ordnet deine Anfrage dem passenden Weg zu – Unterricht erstellen, Material prüfen oder KI für die Vorbereitung – und sagt in einem Satz, was passiert.",
      ergebnis: "Eine Rückfrage oder ein Weg: Das KI-System sagt, womit es anfängt und warum.",
      wo: [["index.html", "Startseite von Kidu"]] },
    { id: "unterricht-digitalisieren", name: "Unterricht digitalisieren",
      kurz: "Der geführte Weg von analogem zu lernwirksamem digitalem Unterricht – punktuell, phasenweise oder durchgängig, auch für eine ganze Einheit.",
      ergebnis: "Ein Plan Phase für Phase: was am Gerät passiert, was auf Papier bleibt und warum. Kein fertiges Material, sondern die Entscheidung davor.",
      belegt: "Im Testlauf an einer Doppelstunde »Freispiel« (Erzieher*innenausbildung, 25. Oktober 2026) blieben acht von neun Phasen auf Papier; eine Stelle wurde punktuell digital.",
      wo: [["digitalisieren.html", "Bisherigen Unterricht digitalisieren"], ["papierfrage.html#ganze-stunde", "Papierfrage: Die ganze Stunde prüfen"]] },
    { id: "digital-check", name: "Digital-Check",
      kurz: "Prüft fertiges Material auf pädagogische Qualität und digitalen Beitrag – in zwei getrennten Blöcken: Didaktik und Gestaltung.",
      ergebnis: "Ein Bericht in sechs Teilen: zuerst die besondere Stärke, dann die Bereiche, die Beobachtungen mit Fundstelle, Tablet oder Papier, höchstens drei Schritte und die Grenzen der Einschätzung. Keine Noten.",
      wo: [["digital-check.html#mit-ki", "Digital-Check: Mit KI prüfen"]] },
    { id: "lernmethode-einfuehren",
      ergebnis: "Ein Handout auf einer Seite: was die Methode ist, fünf Schritte, ein Beispiel mit typischem Fehler, wann das Tablet hilft – dazu ein Minutenplan für die erste Anwendung.",
      wo: [["auftraege.html#lernmethode", "Aufträge zum Kopieren"]] },
    { id: "ki-grenzen-einer-aufgabe",
      ergebnis: "Eine Tabelle mit Einstufung, Grund und Regel je Teil der Aufgabe. Dazu ein Regeltext für die Lernenden und drei bis fünf kleine Vorschläge zum Nachschärfen.",
      wo: [["auftraege.html#ki-grenzen", "Aufträge zum Kopieren"], ["lernende-ki.html", "Wenn deine Lernenden mit KI arbeiten"]] },
    { id: "ki-faktencheck",
      ergebnis: "Ein Arbeitsblatt mit Zeichen zum Markieren – etwa für eine Zahl ohne Beleg oder falsche Sicherheit – und ein Ablauf mit Minuten.",
      wo: [["auftraege.html#faktencheck", "Aufträge zum Kopieren"]] },
    { id: "ki-kompetenz-kollegium",
      ergebnis: "Ein Ablaufplan mit Minuten je Baustein, eine Übung am eigenen Material und eine Materialliste – dazu ein Termin für die Auswertung.",
      wo: [["auftraege.html#fortbildung", "Aufträge zum Kopieren"], ["ki-aufgaben.html", "Trainingsaufgaben"]] },
    { id: "praxisforschung-im-kollegium",
      ergebnis: "Ein Plan mit Frage, Ausgangslage, Veränderung, Belegen samt Aufwand, Leitfragen für die Auswertung – und wie du es im Kollegium teilst.",
      wo: [["auftraege.html#erkunden", "Aufträge zum Kopieren"], ["beobachtung.html", "Beobachtungsbogen"]] }
  ],
  /* Die Gestaltungsregeln (DESIGN.md) – öffentlich, als eigener Download */
  gestaltung: {
    name: "Gestaltungssystem von Kidu",
    kurz: "Farben, Schriften, Formen und Bewegung als Text für ein KI-System – damit auch deine Lernseite ruhig, lesbar und barrierearm wird.",
    ergebnis: "Seiten, die aussehen wie Kidu: zwei Druckfarben, große Schrift, keine Bewegung ohne Grund.",
    wo: [["gestaltung.html", "Gestaltungssystem ansehen"]]
  },
  /* Privat (Plugin »kidu-bau«) – kein Download. art: "gebaut" nur mit Beleg, sonst "so". */
  bau: [
    { id: "lernseite-bauen", name: "Lernseite bauen",
      tut: "Baut eine Lernseite als eine HTML-Datei: Labor, Lernpfad, Entscheidungsstunde, Selbsttest mit erklärender Rückmeldung.",
      art: "so", text: "Eine Lernseite mit Forschungsakten in drei Lesestufen und einem Marktplatz mit Rückmeldung.",
      href: "beispiel.html#m22-wie-war-das-moeglich", linktext: "Wie war das möglich? (M22)",
      bild: "assets/galerie/wie-war-das-moeglich-2.webp", alt: "Forschungsakte C »Browning: Ganz normale Männer« mit Leitfrage und den drei Lesestufen Einstieg, Vertiefung und Kontroverse",
      kurzfassung: "Die Kurzfassung steckt in »Bisherigen Unterricht digitalisieren« unter der Ausgabe »Lernseite als eine HTML-Datei«." },
    { id: "signatur-design", name: "Signatur-Design",
      tut: "Gibt einer Seite ein eigenes Erscheinungsbild: Bild aus dem Gegenstand, Farben, Schriften, ein Musterbuch für Bewegung.",
      art: "so", text: "Das Gestaltungssystem von Kidu mit seinen benannten Regeln.",
      href: "gestaltung.html", linktext: "Gestaltungssystem",
      bild: "assets/film/rg-start.webp", alt: "Startseite von Kidu mit der Wortmarke und den drei Wegen KI-Training, Digitaler Unterricht und Unterrichtsbeispiele" },
    { id: "website-design-workflow", name: "Website-Prüfkette",
      tut: "Die feste Kette von der Produktbeschreibung über das Gestaltungssystem bis zur gemessenen Prüfung – mit Pull Request.",
      art: "gebaut", text: "Kidu selbst: Produktbeschreibung, Gestaltungssystem und Prüfskript liegen im Repository.",
      href: "ueber.html#t-entstehung", linktext: "Wie Kidu entstanden ist",
      bild: "assets/film/rg-fahrplan-zu.webp", alt: "Bereich Digitaler Unterricht: der Fahrplan mit vier Phasen" },
    { id: "schaubild-design", name: "Schaubilder",
      tut: "Schaubilder, Erklärgrafiken und Mockups aus dem Designsystem – mit Alternativtext.",
      art: "so", text: "Das Prinzipienrad und das Schaubild »Wo in der Stunde das Gerät hilft«.",
      href: "sechs-hebel.html", linktext: "Wann funktioniert digitaler Unterricht?" },
    { id: "bewegung-als-lernmittel", name: "Bewegung als Lernmittel",
      tut: "Bewegung, die selbst Lerngegenstand ist: ziehen, vorher und nachher, Simulation – nur wenn die Lernenden sie steuern.",
      art: "so", text: "Die Proben zu den sechs Prinzipien: erst festlegen, dann ein Zustandswechsel.",
      href: "sechs-hebel.html#sh-probe", linktext: "Probier es an deiner Stunde" },
    { id: "film-regie", name: "Film-Regie",
      tut: "Filme mit System: der eine Moment, ein Drehbuch zur Freigabe, Bau aus Filmbausteinen, Kritik mit Standbildern.",
      art: "gebaut", text: "»Kidu in 100 Sekunden« und der Rundgang auf der Startseite.",
      href: "ueber.html", linktext: "Über Kidu: der Film",
      bild: "assets/film/kidu-pitch-poster.webp", alt: "Standbild aus dem Film »Kidu in 100 Sekunden«" }
  ]
};
if (typeof module !== "undefined") module.exports = SKILLKOFFER;
