/* Kidu – die Unterrichtsbeispiele nach Fächern (ab Version 4.57, Auftrag Mario 20.11.2026).
   Vier Fächer, je eine Lernumgebung aus dem Unterricht des Urhebers: GGK-Labor (Geschichte), GK-Labor (Politik),
   Psycho-Labor (Psychologie), Demokratiebildung (Jahreskompass). Je Fach: die Quintessenz, das Ganze (die Einheit oder
   das Jahr) und zwei bis drei Beispiele – was Lernende tun, was das Gerät kann, warum das trägt, wie du die Idee
   punktuell, phasenweise, durchgängig oder als ganze Einheit nutzt.

   Regeln (CLAUDE.md, »Wahrheit der Daten«):
   - Titel, Kurzbeschreibung, Fach, Status und Links der Beispiele kommen aus assets/daten/beispiele.js und werden hier
     nicht wiederholt. »beispiel« nennt die ID dort.
   - »teil« ist eine Stelle aus einem Beispiel (ein Blatt, eine Stunde) mit eigenem Titel, eigenem Link und eigenem Umfang.
     Titel und Link stammen aus der Quelle (Datei und Überschrift). Umfang und Prinzipien sind Vorschläge.
   - bild: eine Ansicht aus assets/daten/galerie.js (dort stehen Alternativtext und Bildtext) – nie ein neues Bild ohne
     Eintrag dort. Die Rahmenbilder (rahmen.bild) stehen nur hier, mit eigenem Alternativtext.
   - Jeder Satz hat einen Beleg in »belege« (Datei und Abschnitt der Quelle, Stand 20.11.2026). Was noch zu bestätigen ist,
     steht in »vorschlag« und in docs/datenluecken.md (python3 tools/datenluecken.py).
   - ort: kurze Ortsangabe (Modul, Blatt, Stunde) für Karte und Verweise; bei »teil« steht sie im teil.
   - kurz: Name im Verweis »Hier zu sehen«, wenn »ort« nicht eindeutig ist (sonst Fach und Ort).
   - satz: ein kurzer Satz für die Kachel oben (Fach wählen).
   - rahmen.kachel: true = das Rahmenbild ist auch das Bild der Kachel oben (sonst das Bild des ersten Beispiels).
   - Keine Wirkungsbehauptung: »warum« sagt, was im Unterricht gelingen kann, nicht, dass es wirkt.
   - Bilder nur aus eigenen Oberflächen. Bilder aus dem Material der Lehrkraft und fremde Fotos stehen nicht im
     öffentlichen Netz (Bildliste des GK-Labors, Moodle-Paket des GGK-Labors) – die Ausschnitte sind so gewählt.
   Prüfung: tests/labore.test.js und tools/pruefen.py. Darstellung: assets/labore.js. */

var LABORE = [
  {
    id: "ggk-labor",
    name: "GGK-Labor",
    fach: "Geschichte",
    gruppe: "Berufliches Gymnasium",
    frage: "Geschichte für die Gegenwart",
    satz: "Urteilen mit dem Wissen von damals.",
    quintessenz: [
      "Die Lernenden urteilen mit dem Wissen von damals.",
      "Das Gerät hält zurück, was erst später geschah – bis sich alle festgelegt haben.",
      "Dann wird aufgedeckt, verglichen und im Raum gestritten: Was konnte man damals wissen?"
    ],
    fachregel: "Verdecken ist hier das wichtigste Prinzip: Es hält die Zukunft offen. Keine Rollen als Täterinnen oder Täter, keine Punkte über Menschenleben.",
    rahmen: {
      titel: "Drei Kapitel auf einem Zeitstrahl",
      saetze: [
        "Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt: jedes Kapitel ein eigener Zeitstrahl.",
        "Jedes Modul zeigt, wo es in der Zeit liegt. Zuerst stehen die Daten, die man kennen sollte.",
        "Die kognitive Landkarte ordnet alle Module nach denselben Prinzipien der Geschichte – quer durch die Epochen."
      ],
      leiste: [
        { kurz: "1", name: "Weimarer Republik", notiz: "16 Module" },
        { kurz: "2", name: "Nationalsozialismus", notiz: "11 Module" },
        { kurz: "3", name: "Ost-West-Konflikt", notiz: "9 Stunden" }
      ],
      bild: "assets/galerie/labor-ggk-1.webp", breite: 1040, hoehe: 337,
      alt: "Startseite des GGK-Labors, Kapitel Weimarer Republik: Zeitstrahl von 1914 bis 1929 mit den Modulen M1 bis M14.2 und den Merkdaten darüber und darunter",
      link: "https://geschichtefuerdiegegenwart.github.io/GGK-Einheit-Nationalsozialismus/",
      einheit: "ns-einheit"
    },
    beispiele: [
      { beispiel: "m20-dilemmata", ort: "M20", bild: "assets/galerie/dilemmata-1.webp",
        was: "Als Abgeordnete entscheiden die Lernenden dreimal: Mai 1940, Juli 1941, Februar 1944. Sie lesen geprüfte Quellen, diskutieren in zwei kurzen Runden und stimmen ab.",
        warum: "Erst entscheiden, dann sehen, was geschah: So entsteht ein Urteil mit dem Wissen der Zeit. Danach fragt die Klasse, ob man heute anders urteilen darf." },
      { beispiel: "m22-wie-war-das-moeglich", ort: "M22", bild: "assets/galerie/wie-war-das-moeglich-2.webp",
        was: "Die Lernenden versiegeln eine erste Antwort, gehen den Fall Józefów 1942 durch und lesen Forschungsakten. Auf dem Marktplatz streiten sie über Erklärungen und bauen am Tisch ein Modell.",
        warum: "Alle lesen am selben Fall, jede und jeder in der passenden Tiefe. Am Ende öffnen sie ihre erste Antwort wieder: Was denke ich jetzt anders?" },
      { beispiel: "m19-appeasement", ort: "M19", bild: "assets/galerie/appeasement-1.webp", stimme: true,
        was: "Als Abgeordnete im Unterhaus erfahren die Lernenden in fünf Bausteinen nur, was London von 1933 bis 1939 jeweils wusste. Dreimal stimmen sie ab – mit der Stimmkarte im Raum.",
        warum: "So sieht hybrid aus: Das Gerät trägt Material und Auflösung. Abgestimmt wird im Raum, gesichert an der Tafel." }
    ],
    wege: {
      punktuell: "Eine Entscheidungsfrage mit dem Wissen von damals: Alle legen sich fest, dann zeigt das Gerät, was später geschah.",
      phasenweise: "Das Material in Bausteinen freigeben – immer nur so viel, wie man damals wusste. Abgestimmt und gesichert wird im Raum.",
      durchgaengig: "Eine Doppelstunde als Entscheidungslabor: Lage, Optionen, Diskussion, Abstimmung, Auswertung. Diskussion und Urteil bei geschlossenem Gerät.",
      einheit: "Ein Zeitstrahl über alle Stunden: Jede Stunde zeigt, wo sie in der Zeit liegt, und endet mit einem Satz in der Lernspur."
    },
    belege: {
      quintessenz: "Kidu, Seite »Wann funktioniert digitaler Unterricht?«: Verdecken – »In Geschichte hält es die Zukunft offen«; M20 und M22 (Daten der Beispiele).",
      fachregel: "Kidu, »Wann funktioniert digitaler Unterricht?«, Vertiefung »Geschichte, Politik, Psychologie, Sozialpädagogik« (wörtlich).",
      rahmen: "Moodle-Paket GGK-Labor, Fassung 6.0 (20.11.2026), index.html: »Drei Zeitstrahlen … untersucht mit der kognitiven Landkarte«, »sechzehn Module«, »elf Module«, »neun Stunden«, »Dieselben Module – nach Prinzip geordnet«.",
      wege: "ns-einheit (Rahmen: Codewort nach der Abstimmung, ab M20 durchgängig mit Plenumsphasen bei geschlossenem Gerät); index.html: »Du siehst, wo du in der Zeit bist«, »Lernspur sichern«."
    },
    vorschlag: { wege: true, quintessenz: true }
  },

  {
    id: "gk-labor",
    name: "GK-Labor",
    fach: "Politik",
    gruppe: "Gemeinschaftskunde J1",
    frage: "Was braucht eine Demokratie, um nicht zu scheitern?",
    satz: "Echtes Material, Rückmeldung mit Grund.",
    quintessenz: [
      "Die Lernenden arbeiten mit echtem Material: dem Stimmzettel ihres Wahlkreises, Positionen wörtlich aus den Wahlprogrammen, der amtlichen Wahlstatistik.",
      "Bei Wissensfragen antwortet das Gerät sofort und begründet.",
      "Beim Urteilen schweigt es: Was kontrovers ist, bleibt kontrovers."
    ],
    fachregel: "Beim Urteilen bewertet das Gerät nie. Jede Position hat eine Quelle.",
    rahmen: {
      titel: "Ein Hefter für das Halbjahr",
      saetze: [
        "Acht Karten: die Grundlagen, fünf Module, die Klassenarbeit und eine Bilanz.",
        "Jedes Blatt hat links ein Register mit allen Aufträgen und rechts immer genau einen.",
        "Am Ende jedes Moduls steht eine Zusammenfassung zum Abheften."
      ],
      leiste: [
        { kurz: "G", name: "Grundlagen", notiz: "3 Blätter" },
        { kurz: "M1", name: "Parteien und Wahlen", notiz: "7 Blätter" },
        { kurz: "KA", name: "Klassenarbeit", notiz: "Wiederholung" },
        { kurz: "M2", name: "Verbände und Lobbyismus", notiz: "1 Blatt" },
        { kurz: "M3", name: "Medien", notiz: "geplant", geplant: true },
        { kurz: "M4", name: "Deutschland und die EU", notiz: "geplant", geplant: true },
        { kurz: "M5", name: "Gefährdungen der Demokratie", notiz: "geplant", geplant: true },
        { kurz: "B", name: "Bilanz", notiz: "geplant", geplant: true }
      ],
      bild: "assets/galerie/labor-gk-1.webp", breite: 1040, hoehe: 153,
      alt: "Kopf des Hefters im GK-Labor: die Frage »Was braucht eine Demokratie, um nicht zu scheitern?«, der Knopf »Los geht’s« und »Dein Stand« mit acht Kreisen von G bis B, vier davon gestrichelt",
      link: "https://geschichtefuerdiegegenwart.github.io/Gemeinschaftskunde/",
      einheit: null
    },
    beispiele: [
      { beispiel: "politik-werkstatt", bild: "assets/galerie/politik-werkstatt-1.webp",
        teil: { ort: "M1.4", titel: "Wählen und auszählen", umfang: "phasenweise", prinzipien: ["buendeln", "variieren"],
                link: "https://geschichtefuerdiegegenwart.github.io/Gemeinschaftskunde/m1-4-waehlen.html",
                geraet: "Das Gerät zählt die Klassenwahl ohne Namen aus. Im Sitzrechner schaltest du die 5-%-Hürde an und aus und siehst, wie sich die Sitze verteilen." },
        was: "Die Lernenden wählen mit dem amtlichen Stimmzettel ihres Wahlkreises, eine Person nach der anderen am Gerät vorn – wie im Wahllokal. Dann wird aus den Stimmen ein Parlament.",
        warum: "Was die Hürde bewirkt, sieht die Klasse an ihren eigenen Stimmen. Gezählt werden nur Summen: keine Namen, keine Reihenfolge." },
      { beispiel: "politik-werkstatt", bild: "assets/galerie/gk-m12-1.webp", stimme: true,
        teil: { ort: "M1.2", titel: "Funktionen erkennen", umfang: "phasenweise", prinzipien: ["rueckmelden"],
                link: "https://geschichtefuerdiegegenwart.github.io/Gemeinschaftskunde/m1-2-erkennen.html",
                geraet: "Ab fünf gelegten Karten prüft das Gerät einen Zwischenstand und begründet jede Karte. Falsch Gelegtes geht mit einem Knopf zurück." },
        was: "Zu zweit ordnen die Lernenden zwölf Beispiele den Aufgaben der Politik zu – erst grob, dann genau. Gesichert wird im Plenum.",
        warum: "Die Rückmeldung kommt, während noch gedacht wird, und sagt, warum etwas passt. Den Zwischenstand haben sich die Lernenden nach der Erprobung gewünscht." },
      { beispiel: "politik-werkstatt", bild: "assets/galerie/gk-m15-1.webp",
        teil: { ort: "M1.5", titel: "Warum wählen Menschen so?", umfang: "phasenweise", prinzipien: ["verdecken"],
                link: "https://geschichtefuerdiegegenwart.github.io/Gemeinschaftskunde/m1-5-warum-so.html",
                geraet: "Erst tragen die Lernenden ihre Schätzung ein. Dann deckt das Gerät die amtliche Wahlstatistik auf – neben dem eigenen Tipp." },
        was: "Welche Partei lag 2025 bei den 18- bis 24-Jährigen vorn? Die Lernenden schätzen für mindestens drei Parteien und decken dann auf.",
        warum: "Die eigene Schätzung macht den Abstand zur echten Zahl sichtbar. Dieser Abstand ist der Anlass für das Gespräch." }
    ],
    wege: {
      punktuell: "Eine Zahl schätzen lassen, dann die amtliche Statistik aufdecken. Der Abstand ist der Gesprächsanlass.",
      phasenweise: "Eine Station am Gerät mit Rückmeldung zu jeder Karte. Gesichert wird im Plenum: Was kam am häufigsten vor?",
      durchgaengig: "Zwei Doppelstunden mit Stationen. Jede Station beginnt mit »Erst erinnern« – ohne Gerät.",
      einheit: "Ein Hefter für das Halbjahr: Jede Karte ist ein Modul. Man sieht, was fertig ist und was noch kommt."
    },
    belege: {
      quintessenz: "Repository Gemeinschaftskunde, README (Stand 18.11.2026): Stimmzettel des Wahlkreises 260, Positionen wörtlich aus den Wahlprogrammen 2025, Repräsentative Wahlstatistik 2025; Kontroversität, keine Parteiempfehlung, kein Übereinstimmungswert.",
      fachregel: "Kidu, »Wann funktioniert digitaler Unterricht?«, Vertiefung »Geschichte, Politik, Psychologie, Sozialpädagogik« (wörtlich).",
      rahmen: "Paket GK-Labor, Hefter und Blätter Fassung 3 (19.11.2026), BERICHT_UMBAU.md: acht Karten G · M1 · KA · M2 · M3 · M4 · M5 · B, zwölf Blätter, M3 bis B »geplant«; Register und Zusammenfassung je Blatt.",
      beispiele: "m1-4-waehlen.html: »Wahllokal am Lehrkraftgerät … Gezählt werden nur Summen: keine Namen, keine Reihenfolge, keine Uhrzeit«, »5-%-Hürde anwenden«; m1-2-erkennen.html: »Sobald fünf Karten liegen, kannst du einen Zwischenstand prüfen«, Rückmeldung »Passt.« mit Grund; m1-5-warum-so.html, Auftrag 3: »Trag deine Schätzung in Prozent ein, mindestens für drei Parteien. Dann aufdecken.«",
      wege: "BERICHT_UMBAU.md: »Erst erinnern« ist Auftrag 1 der Stationen 2 bis 6; m1-2-erkennen.html, Auftrag 4: »Welche Funktion kam am häufigsten vor?«; Hefter: »Kreuz = fertig · gestrichelt = geplant«."
    },
    vorschlag: { wege: true, quintessenz: true, teile: "Umfang je Blatt: eine Station der Doppelstunde (M1.4: »Station 4 von 6 · 60 Minuten«). Prinzipien aus dem, was das Blatt tut." }
  },

  {
    id: "psycho-labor",
    name: "Psycho-Labor",
    fach: "Psychologie",
    gruppe: "Wahlfach J2",
    frage: "Was passiert in deinem Kopf?",
    satz: "Erst vermuten, dann selbst messen.",
    quintessenz: [
      "Jeder Versuch beginnt mit der eigenen Vermutung.",
      "Dann erleben die Lernenden den Effekt selbst, und das Gerät misst mit.",
      "Zum Schluss steht das eigene Ergebnis neben der Originalstudie."
    ],
    fachregel: "Messen ist hier das wichtigste Prinzip. Jede Täuschung im Versuch wird aufgelöst.",
    rahmen: {
      titel: "Eine Reihe für das Schuljahr",
      saetze: [
        "Block 1 Wahrnehmung mit vier Versuchen, dann die Klassenarbeit, dann Block 2 Motivation mit sechs Doppelstunden.",
        "Gedächtnis, Denken und Intelligenz sind in Planung.",
        "Für jede Stunde wird neu entschieden, ob das Gerät hilft."
      ],
      leiste: [
        { kurz: "1", name: "Wahrnehmung", notiz: "abgeschlossen" },
        { kurz: "KA", name: "Klassenarbeit 1", notiz: "Wahrnehmung" },
        { kurz: "2", name: "Motivation", notiz: "läuft" },
        { kurz: "3", name: "Gedächtnis", notiz: "in Planung", geplant: true },
        { kurz: "4", name: "Denken", notiz: "in Planung", geplant: true },
        { kurz: "5", name: "Intelligenz", notiz: "in Planung", geplant: true }
      ],
      bild: "assets/galerie/labor-psy-1.webp", breite: 1040, hoehe: 358,
      alt: "Startseite des Psycho-Labors: die Frage »Was passiert in deinem Kopf?« und sechs Kacheln von Wahrnehmung bis Intelligenz, Motivation läuft gerade",
      link: "https://geschichtefuerdiegegenwart.github.io/psycho-labor/",
      einheit: "psycho-einheit"
    },
    beispiele: [
      { beispiel: "psycho-ds2", ort: "DS 2", bild: "assets/galerie/psycho-ds2-1.webp",
        was: "Zwei Bilder wechseln sich ab. Die Lernenden schätzen vorher, wie lange sie brauchen, und tippen auf »Gefunden!«, sobald sie die Änderung sehen.",
        warum: "Der Befund wird am eigenen Erleben geprüft, nicht nur gelesen. Das Kursbild entsteht ohne Namen – per QR-Code am Gerät der Lehrkraft." },
      { beispiel: "psycho-ds3-6", bild: "assets/galerie/psycho-ds3-6-1.webp",
        teil: { ort: "DS 5", titel: "Wie sehr beeinflussen mich andere?", umfang: "durchgaengig", prinzipien: ["messen", "buendeln", "rueckmelden"],
                link: "https://geschichtefuerdiegegenwart.github.io/psycho-labor/ds05-andere.html",
                geraet: "Zwei Fassungen, verteilt über zwei QR-Codes: Die eine Kurshälfte sieht erfundene Antworten anderer, die andere nicht. Wer was sieht, bleibt bis zur Auflösung verdeckt. Die Ergebnisse kommen ohne Namen ins Kursbild." },
        was: "Die Lernenden schätzen Punkte und vergleichen Linien. Ein Teil sieht dabei die Antworten anderer im Gruppenchat. Danach wird die Täuschung aufgelöst und mit Aschs Studie verglichen.",
        warum: "Den Einfluss der Gruppe sieht der Kurs an den eigenen Daten. Die Täuschung ist am Anfang angekündigt und wird vollständig aufgelöst." },
      { beispiel: "psycho-einheit", bild: "assets/galerie/psycho-motivation-1.webp",
        teil: { ort: "DS 6–11", titel: "Motivation: Was treibt mich an – und was bremst mich?", umfang: "einheit", prinzipien: ["rueckmelden", "stufen"],
                link: "https://geschichtefuerdiegegenwart.github.io/psycho-labor/motivation.html",
                geraet: "Am Ende jeder Stunde legen die Lernenden neue Begriffe in den Motivationskreis, mit gestufter Rückmeldung. Auf der Einheitsseite wächst daraus ihr eigener Überblick." },
        was: "Sechs Doppelstunden, ein Weg: erst ein Fall, dann drei Geschichten, am Ende die Lernenden selbst. Geschrieben wird wie in der Klassenarbeit, mit drei Zugängen: mit Beispiel, mit Hilfekarte oder ohne Hilfe.",
        warum: "Der Kreis verbindet die Stunden: Jeder neue Begriff bekommt einen Ort neben den alten. Wer Hilfe braucht, wählt sie – wer ohne kann, schreibt ohne." }
    ],
    wege: {
      punktuell: "Ein kurzer Selbstversuch zu Beginn: erst vermuten, dann messen, dann der Befund.",
      phasenweise: "Das Labor als Einstieg. Erklärt, angewendet und gesichert wird danach auf Papier.",
      durchgaengig: "Eine Doppelstunde als Lernweg: Versuch, Stationen mit Rückmeldung, eigener Text mit Kriterien.",
      einheit: "Ein Modell, das über die Stunden wächst: Jede Stunde legt neue Begriffe hinein, am Ende steht der eigene Überblick."
    },
    belege: {
      quintessenz: "Repository psycho-labor, index.html: »Jeder Versuch beginnt mit deiner Vermutung«; Kidu, Messen: »erst vermuten, dann der Selbstversuch, dann das eigene Ergebnis neben der Originalstudie«.",
      fachregel: "Kidu, »Wann funktioniert digitaler Unterricht?«, Vertiefung »Geschichte, Politik, Psychologie, Sozialpädagogik« (wörtlich).",
      rahmen: "Repository psycho-labor (17.11.2026), index.html: Wahrnehmung (Block 1 · abgeschlossen), Klassenarbeit 1, Motivation (Block 2 · Doppelstunde 6–11 · läuft), Gedächtnis, Denken, Intelligenz (in Planung); Kidu psycho-einheit.",
      beispiele: "docs/ds05-fassung2.md: Fassung 2 »trägt die ganze Doppelstunde«, »verdeckte Bedingungen für zwei Kurshälften, Kursdaten ohne Namen und eine eigene Rückmeldung zu jeder Antwortoption«, »Ankündigung der Täuschung«; ds05-andere.html, Auflösung: »Es gab zwei Fassungen, verteilt über die zwei QR-Codes«; docs/motivation-einheit.md: Motivationskreis mit 22 Begriffen, Rückmeldung gestuft, Schreiben mit drei Zugängen; motivation.html: »Sechs Doppelstunden, ein Weg …«.",
      wege: "PRODUCT.md des Psycho-Labors: »Ein kurzer Selbstversuch zu Beginn einer Doppelstunde … Erklären, Anwenden und Sichern geschehen danach analog.«; DS 5 Fassung 2 (Stationen, Kriterienraster nach dem eigenen Text); Einheit Motivation."
    },
    vorschlag: { wege: true, quintessenz: true, teile: "DS 5: Umfang aus docs/ds05-fassung2.md (Variante B, durchgängig). Motivation: eine Einheit über sechs Doppelstunden; Status der Stunden noch offen (auf der Startseite: »läuft«)." }
  },

  {
    id: "demokratiebildung",
    name: "Demokratiebildung",
    fach: "Sozialpädagogik",
    gruppe: "Fachschule, Abschlussklasse",
    frage: "Demokratie, jetzt und in Zukunft",
    satz: "Ein Kompass durch das Schuljahr.",
    quintessenz: [
      "Ein Kompass führt durch das Schuljahr. In der Mitte stehen immer die Kinderrechte.",
      "Jede Etappe beginnt mit einer Szene aus einer Kita, zu der sich alle festlegen. Am Ende kehren sie zu ihrer ersten Position zurück.",
      "Das Gerät trägt Szene, Festlegung und Rückmeldung. Gehandelt und gestritten wird im Raum."
    ],
    fachregel: "Oft reicht ein Moment am Gerät. Das Handeln am Fall passiert auf dem Tisch. Fälle sind ausgedacht, Biografisches bleibt freiwillig.",
    rahmen: {
      titel: "Ein Kompass für das Jahr",
      saetze: [
        "Acht Etappen führen durch das Schuljahr. In der Mitte stehen die Kinderrechte: Schutz, Förderung, Beteiligung.",
        "Jede Etappe ist ein Arbeitsblatt für eine Doppelstunde: erinnern, Szene, Position, erarbeiten, üben, eigenes Produkt, Rückblick.",
        "Der rote Faden sammelt je Etappe einen eigenen Satz und eine eigene Antwort auf die Leitfrage."
      ],
      leiste: [
        { kurz: "1", name: "Verstehen", notiz: "" }, { kurz: "2", name: "Warum Kita?", notiz: "" },
        { kurz: "3", name: "Kinderrechte", notiz: "" }, { kurz: "4", name: "Macht", notiz: "" },
        { kurz: "5", name: "Strukturen", notiz: "" }, { kurz: "6", name: "Alltag", notiz: "" },
        { kurz: "7", name: "Position", notiz: "" }, { kurz: "8", name: "Praxis", notiz: "" }
      ],
      bild: "assets/galerie/labor-demo-1.webp", breite: 1040, hoehe: 650, kachel: true,
      alt: "Jahreskompass des Wahlfachs: acht Etappen im Kreis um die Kinderrechte mit Schutz, Förderung und Beteiligung; die Nadel zeigt auf Etappe 1 »Verstehen«, daneben die Karte der Etappe",
      link: null,
      einheit: null,
      status: "in Entwicklung"
    },
    beispiele: [
      { beispiel: "demokratie-e3", ort: "Etappe 3", bild: "assets/galerie/demokratie-e3-1.webp",
        was: "»Wer Kinder liebt, braucht keine Kinderrechte.« Zu diesem Satz legen sich alle fest. Dann prüfen sie Szenen aus dem Kita-Alltag an drei Prüfsteinen und gestalten ein Plakat für die Kita.",
        warum: "Die Rechte werden am Alltag geprüft, nicht auswendig gelernt. Am Ende zeigt die erste Position, was sich am eigenen Denken verändert hat." },
      { beispiel: "gene", ort: "Einheit Nationalismus", kurz: "Gene ohne Reisepass", bild: "assets/galerie/gene-1.webp",
        was: "Die Lernenden schätzen Aussagen zur Abstammung ein. Dann verschieben sie mit Reglern eine Grenze und sehen, was sich ändert – und was nicht.",
        warum: "Der Regler zeigt jede Variante sofort, auf Papier wäre jede ein neues Blatt. Das Urteil über Abstammung fällt danach im Gespräch." },
      { beispiel: "nationalismus-demokratie", ort: "Einheit Nationalismus", kurz: "Nationalismus und Demokratie", bild: "assets/galerie/nationalismus-demokratie-1.webp",
        was: "Wann wird das Wir zur Gefahr? Die Lernenden stellen mit fünf Reglern Kipp-Punkte ein, testen historische Fälle und bauen am Ende ein eigenes Urteil.",
        warum: "Die Regler zeigen, wie sich das Gesamtbild verändert, wenn einzelne Punkte kippen. Der Maßstab bleibt das Grundgesetz." }
    ],
    wege: {
      punktuell: "Eine Szene, ein Satz, eine Position: Alle legen sich fest, bevor gesprochen wird.",
      phasenweise: "Ein Regler-Experiment in der Erarbeitung. Gedeutet und geurteilt wird im Gespräch.",
      durchgaengig: "Ein Arbeitsblatt für die Doppelstunde, gemeinsam am Smartboard geführt. Jeder Auftrag sagt, wann das Gerät beiseitegelegt wird.",
      einheit: "Ein Kompass für das Jahr: Jede Etappe hat ihre Szene und ihre Leitfrage. Der rote Faden sammelt die eigenen Sätze."
    },
    belege: {
      quintessenz: "Repository demokratiebildung-fruehe-kindheit, Version 5.0 (18.11.2026), Kompass: »Acht Etappen führen durch das Jahr. Jede beginnt mit einer Szene aus einer Kita. Im Mittelpunkt steht immer dasselbe: die Rechte jedes Kindes.«; README, Fassung 5.0: Szene mit Festlegung, Rückblick mit Rückkehr zur ersten Position; »Positionslinie, Rundgang im Plenum und Stimmkarten bleiben im Raum«.",
      fachregel: "Kidu, »Wann funktioniert digitaler Unterricht?«, Vertiefung »Geschichte, Politik, Psychologie, Sozialpädagogik« (wörtlich).",
      rahmen: "README: acht Etappen, Kinderrechte in der Mitte (im Kompass: Schutz · Förderung · Beteiligung), Bogen jedes Blatts, roter Faden »ein Satz je Etappe und eine eigene Antwort auf jede Leitfrage«; Stand: »Entwurf, noch nicht im Unterricht erprobt«.",
      wege: "README, Entscheidungen: »Die Arbeitsblätter tragen eine ganze Doppelstunde, gemeinsam geführt am Smartboard … jeder Auftrag nennt in ›Zurück in den Raum‹, wann das Gerät beiseitegelegt wird«; Gene ohne Reisepass und Nationalismus und Demokratie (Daten der Beispiele)."
    },
    vorschlag: { wege: true, quintessenz: true, link: "Ob die Seite über GitHub Pages erreichbar ist, ist noch offen – darum steht kein Link." }
  }
];

if (typeof module !== "undefined") module.exports = LABORE;
