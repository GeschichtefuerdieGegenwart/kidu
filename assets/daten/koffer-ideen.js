/* Kidu – Aufgabenkoffer nach Unterrichtsphasen (ab Version 4.44).
   Ergänzt AUFGABEN (aufgaben.js) je Aufgabenform um das, was die Seite für den Einsatz am Gerät braucht:
   phasen   – in welcher Phase der Stunde die Idee passt (erste = zuerst gedacht). VORSCHLAG, bis Mario ihn prüft.
              Schlüssel wie TAXONOMIEN.phasen (taxonomien.js); Namen und Hilfetexte stehen nur dort.
   kurz     – ein Satz für die Karte.
   schritte – »So setzt du es digital um«, vier Schritte, fächerübergreifend.
   demoFach – Fach der Probe zum Ausprobieren (assets/aufgabenkoffer.js). Die Proben sind ausgedacht und nicht erprobt.
   faecher  – drei ausgedachte Beispiele aus anderen Fächern, zur Anregung, nicht erprobt.
   ohneGeraet – Aufgabenformen, bei denen das Gerät kaum etwas beiträgt: keine Karte, nur der Hinweis und die Papierfassung.
   Regeln: Nichts erfinden. Erfahrungen und Belege bleiben in aufgaben.js und werden hier nicht wiederholt.
   Ab 4.46 (Entscheidung Mario, 17.11.2026): »Ideen und Kniffe« gehen im Koffer auf. Die elf Kniffe selbst stehen weiter an einer
   Stelle – WERKSTATT.muster in assets/daten/werkstatt.js (auch der KI-Auftrag je Kniff). Hier steht nur, wo sie hingehören:
   kniffe    – je Idee die Kniffe, mit denen sie sich überschneidet (Id aus WERKSTATT.muster). Die Zuordnung ist ein VORSCHLAG,
               begründet in docs/version-4-46.md. Ein Kniff darf bei mehreren Ideen stehen; im Fenster der Idee steht er kurz,
               sein eigenes Fenster (#kn-<id>) zeigt ihn ganz: am Gerät, auf Papier, mit KI-Auftrag.
   jedePhase – Kniffe, die in jede Phase passen; sie stehen unter »In jeder Phase« (Name und Hilfe aus taxonomien.js).
   Ab 4.46 auch für den »Aufgabenkoffer auf Papier« (papierkoffer.html, assets/papierkoffer.js): dieselben Ideen, Kniffe und Phasen.
   papierPhasen – Phase der zwei Aufgabenformen ohne Gerät (ohneGeraet), die im digitalen Koffer keine Phase haben. VORSCHLAG,
               bis Mario ihn prüft (docs/version-4-46.md).
   Ab 4.49, Variante B (Auftrag Mario 17.11.2026: der Papier-Koffer nach Anlass, im Raster des digitalen Koffers):
   papierAnlaesse – die vier Anlässe der ersten Ebene, je mit Name, einem Satz »was du damit erhältst«, Bildzeichen
               (Schlüssel in PAPIERKOFFER.BILD) und den Einträgen in ihrer Reihenfolge: Ids aus AUFGABEN.aufgaben oder,
               für die drei Kniffe in jeder Phase, aus WERKSTATT.muster. Jeder der 21 Einträge steht genau einmal
               (tests/papierkoffer.test.js). Grundlage: die sieben Zwecke in AUFGABEN.zwecke, paarweise zusammengelegt.
               Die Zuordnung ist ein VORSCHLAG, begründet in docs/koffer-zuordnung.md. Die Sätze stammen aus den Feldern
               »papier« der Einträge. */
var KOFFER = {
  phasen: ["einstieg", "erarbeitung", "sicherung", "abschluss"],
  ohneGeraet: ["lesen-schritte", "urteil"],
  kniffe: {
    versuch: ["erleben"],
    entscheiden: ["zusatz"],
    markieren: ["beleg"],
    zuordnen: ["zwischenstand", "beleg"],
    reihe: ["zwischenstand"],
    struktur: ["stolper"],
    stufen: ["hilfekarten"],
    auswahl: ["fehlvorstellungen"],
    einschaetzen: ["selbstdiagnose"],
    klassenbild: ["thesen"],
    urteil: ["ranking"]
  },
  jedePhase: ["uebersicht", "hilfekarten", "fehlvorstellungen"],
  papierPhasen: { "lesen-schritte": ["erarbeitung"], urteil: ["abschluss", "erarbeitung"] },
  papierAnlaesse: [
    { id: "erschliessen", name: "Erschließen und ordnen", bild: "erschliessen",
      satz: "Lesekarten, Texte mit Rand, Bildfolgen und Kartensätze zum Legen.",
      eintraege: ["lesen-schritte", "markieren", "film", "zuordnen", "reihe", "struktur"] },
    { id: "urteilen", name: "Vermuten und urteilen", bild: "urteilen",
      satz: "Strichlisten, verdeckte Zettel, Fälle mit Skala und Aufgaben für ein begründetes Urteil.",
      eintraege: ["versuch", "klassenbild", "regler", "entscheiden", "einordnen", "urteil"] },
    { id: "festigen", name: "Üben und festigen", bild: "festigen",
      satz: "Fragen zum Erinnern, Karteikarten, Lösungsblätter mit Erklärungen und ein Plan zum Erklären.",
      eintraege: ["abruf", "kartei", "auswahl", "video"] },
    { id: "differenzieren", name: "Differenzieren und rückmelden", bild: "differenzieren",
      satz: "Gestufte Blätter, Hilfekarten, eine Liste »Ich kann …« und ein Ausgangsticket.",
      eintraege: ["stufen", "hilfekarten", "uebersicht", "einschaetzen", "fehlvorstellungen"] }
  ],
  ideen: {
    abruf: {
      phasen: ["einstieg", "sicherung"],
      kurz: "Alle schreiben auf, was sie noch wissen. Erst dann deckt das Gerät auf.",
      schritte: [
        "Stell zwei oder drei Fragen zur letzten Stunde auf die erste Seite.",
        "Jede Person schreibt allein – ins Feld oder auf einen Zettel.",
        "Erst wenn etwas dasteht, gibt das Gerät den Merkzettel frei.",
        "Alle ergänzen, was fehlte. Du fragst im Raum: Was war bei vielen offen?"
      ],
      demoFach: "Pflege",
      faecher: [
        ["Mathematik", "Drei Regeln zum Bruchrechnen aus der letzten Woche aufschreiben."],
        ["Geschichte", "Drei Ursachen aus der letzten Stunde nennen, dann mit der Merkseite vergleichen."],
        ["Kfz-Technik", "Die Schritte der letzten Prüfung aus dem Kopf notieren."]
      ]
    },
    klassenbild: {
      phasen: ["einstieg", "abschluss"],
      kurz: "Alle stimmen ohne Namen ab. Die Klasse sieht sich als Bild und spricht darüber.",
      schritte: [
        "Formulier eine Frage mit drei oder vier klaren Antworten.",
        "Alle stimmen ohne Namen ab. Am einfachsten läuft das an einem Gerät vorne.",
        "Das Bild der Klasse erscheint erst, wenn alle abgestimmt haben.",
        "Sprecht über das Bild: Warum ist es so verteilt? Was heißt das für die Stunde?"
      ],
      demoFach: "Mathematik",
      faecher: [
        ["Gemeinschaftskunde", "Vor der Stunde: Soll das Wahlalter sinken? Am Ende noch einmal abstimmen."],
        ["Psychologie", "Welche Linie ist länger? Die Stimmen zeigen die Täuschung."],
        ["Sozialpädagogik", "Würdest du in diesem Fall eingreifen? Das Bild öffnet das Gespräch."]
      ]
    },
    entscheiden: {
      phasen: ["einstieg", "erarbeitung", "abschluss"],
      kurz: "Erst entscheidet jede Person selbst. Dann zeigt das Gerät, wie es weiterging.",
      schritte: [
        "Führ bis zu einer offenen Lage – als Text, Bild oder kurzer Fall.",
        "Jede Person entscheidet allein und sagt, wie sicher sie ist.",
        "Erst dann deckt das Gerät auf, wie es weiterging.",
        "Im Raum vergleicht ihr die Gründe: Was konnte man vorher wissen, was nicht?"
      ],
      demoFach: "Sozialpädagogik",
      faecher: [
        ["Geschichte", "Eine Regierung muss entscheiden. Was sie damals nicht wissen konnte, bleibt verdeckt."],
        ["Wirtschaft", "Ein Betrieb bekommt zwei Angebote. Erst wählen, dann die Folgen sehen."],
        ["Pflege", "Eine Lage auf Station. Erst die eigene Entscheidung, dann der fachliche Standard."]
      ]
    },
    versuch: {
      phasen: ["einstieg", "erarbeitung"],
      kurz: "Erst vermuten, dann selbst messen, dann mit einem bekannten Wert vergleichen.",
      schritte: [
        "Stell eine Frage, die sich messen lässt.",
        "Alle legen ihre Vermutung fest, bevor etwas passiert.",
        "Das Gerät führt den Versuch durch, misst und rechnet aus.",
        "Stellt das Ergebnis neben einen bekannten Wert. Gedeutet wird im Raum, gesichert auf Papier."
      ],
      demoFach: "Psychologie",
      faecher: [
        ["Physik", "Fallzeit schätzen, mit dem Gerät stoppen, mit der Rechnung vergleichen."],
        ["Sport", "Den eigenen Puls nach Belastung schätzen, messen, vergleichen."],
        ["Deutsch", "Schätzen, wie viele Wörter man in einer Minute liest. Dann messen."]
      ]
    },
    regler: {
      phasen: ["erarbeitung"],
      kurz: "Einen Wert verschieben und sofort sehen, was sich ändert – und was nicht.",
      schritte: [
        "Wähl einen Zusammenhang, bei dem ein Wert eine sichtbare Folge hat.",
        "Lass zuerst vermuten. Erst dann gibt der Regler frei.",
        "Die Lernenden verschieben den Wert und beschreiben: Was ändert sich, was bleibt gleich?",
        "Stell am Ende die Frage: Was lässt dieses Modell weg?"
      ],
      demoFach: "Wirtschaft",
      faecher: [
        ["Gemeinschaftskunde", "Einen Steuersatz verschieben und sehen, wer mehr oder weniger zahlt."],
        ["Biologie", "Die Temperatur ändern und sehen, wie schnell ein Enzym arbeitet."],
        ["Kfz-Technik", "Die Übersetzung ändern und Drehzahl und Kraft am Rad vergleichen."]
      ]
    },
    film: {
      phasen: ["erarbeitung"],
      kurz: "Ein Ablauf zum Ziehen: vor, zurück, anhalten – mit einer Frage im Kopf.",
      schritte: [
        "Zerleg den Ablauf in wenige Schritte mit je einem Satz.",
        "Schreib einen Satz zur Bedienung davor: Du kannst ziehen und zurückgehen.",
        "Stell eine Frage, bevor sich etwas bewegt.",
        "Die Lernenden ziehen selbst durch den Ablauf und beantworten die Frage."
      ],
      demoFach: "Kfz-Technik",
      faecher: [
        ["Gemeinschaftskunde", "Der Weg eines Gesetzes, Schritt für Schritt zum Ziehen."],
        ["Biologie", "Die Zellteilung in Phasen. Frage davor: Wann sind die Chromosomen doppelt?"],
        ["Pflege", "Ein Ablauf wie das Anlegen eines Verbands, Schritt für Schritt."]
      ]
    },
    markieren: {
      phasen: ["erarbeitung"],
      kurz: "Höchstens drei Stellen markieren. Dann legt das Gerät die Markierung der Lehrkraft daneben.",
      schritte: [
        "Gib einen kurzen Text und einen Suchauftrag: wenig markieren, und wonach.",
        "Die Lernenden markieren höchstens drei Stellen.",
        "Erst danach legt das Gerät deine Markierung daneben.",
        "Wo ihr abweicht, entsteht eine Frage – das ist der Anlass fürs Gespräch. Längere Texte bleiben auf Papier."
      ],
      demoFach: "Lernen lernen",
      faecher: [
        ["Gemeinschaftskunde", "In einem Artikel des Grundgesetzes markieren: Was ist Recht, was ist Pflicht?"],
        ["Deutsch", "In einem Kommentar die These und das stärkste Argument markieren."],
        ["Sozialpädagogik", "In einer Beobachtung markieren, was man sehen kann – nicht, was gedeutet ist."]
      ]
    },
    zuordnen: {
      phasen: ["erarbeitung", "sicherung"],
      kurz: "Beispiele in Felder legen – mit Grund. Falsche Karten gehen einzeln zurück.",
      schritte: [
        "Sammle Beispiele, bei denen man einen Grund nennen muss.",
        "Die Lernenden legen Karte für Karte in ein Feld.",
        "Ab etwa fünf Karten gibt es einen Zwischenstand: Falsche Karten gehen einzeln zurück, mit Grund.",
        "Der Stand wird gespeichert. Am Ende klärt ihr zwei strittige Karten im Raum."
      ],
      demoFach: "Sozialpädagogik",
      faecher: [
        ["Geschichte", "Aussagen einer Quelle zuordnen: Ursache, Anlass oder Folge?"],
        ["Deutsch", "Sätze zuordnen: Tatsache oder Meinung?"],
        ["Pflege", "Maßnahmen zuordnen: vorbeugen, behandeln oder nachsorgen?"]
      ]
    },
    stufen: {
      phasen: ["erarbeitung", "sicherung"],
      kurz: "Derselbe Inhalt in mehreren Zugängen. Jede Person wählt selbst – niemand sieht es.",
      schritte: [
        "Schreib denselben Inhalt in zwei oder drei Zugängen: Einstieg, Vertiefung, Kontroverse.",
        "Leg Hilfen an denselben Ort, zum Selbst-Öffnen.",
        "Die Lernenden wählen ihre Stufe. Niemand sieht die Wahl.",
        "Die gemeinsame Aufgabe am Ende ist für alle gleich."
      ],
      demoFach: "Wirtschaft",
      faecher: [
        ["Geschichte", "Dieselbe Akte in drei Lesestufen, die Aufgabe dazu bleibt gleich."],
        ["Mathematik", "Dieselbe Aufgabe mit Tippkarten: erster Schritt, Ansatz, Rechenweg."],
        ["Englisch", "Derselbe Text mit und ohne Worthilfen am Rand."]
      ]
    },
    auswahl: {
      phasen: ["sicherung"],
      kurz: "Eine Antwort wählen. Das Gerät erklärt sofort, warum sie passt oder nicht.",
      schritte: [
        "Stell eine Frage mit einer klaren Antwort.",
        "Nimm als falsche Antworten echte Irrtümer deiner Lernenden.",
        "Schreib zu jeder Antwort einen Satz, der erklärt.",
        "Lass einen zweiten Versuch zu. Punkte und Ranglisten gibt es nicht."
      ],
      demoFach: "Mathematik",
      faecher: [
        ["Gemeinschaftskunde", "Wer wählt den Bundeskanzler? Jede falsche Antwort zeigt eine typische Verwechslung."],
        ["Pflege", "Welcher Wert liegt im Normbereich? Zu jeder Antwort steht der Grund."],
        ["Kfz-Technik", "Welches Bauteil passt zum Fehlerbild? Die Rückmeldung erklärt den Zusammenhang."]
      ]
    },
    kartei: {
      phasen: ["sicherung"],
      kurz: "Erst antworten, dann umdrehen. Schwere Karten kommen öfter wieder.",
      schritte: [
        "Lass die Karten in eigenen Worten schreiben: vorne die Frage, hinten die Antwort.",
        "Erst antworten – laut oder schriftlich. Dann dreht das Gerät die Karte um.",
        "Sortieren: wusste ich, teilweise, noch nicht.",
        "Schwere Karten kommen öfter wieder, über mehrere Wochen."
      ],
      demoFach: "alle Fächer",
      faecher: [
        ["Englisch", "Vokabeln mit einem eigenen Beispielsatz auf der Rückseite."],
        ["Pflege", "Fachbegriffe: vorne das Wort, hinten die Erklärung in eigenen Worten."],
        ["Mathematik", "Vorne die Formel, hinten: Wofür brauche ich sie?"]
      ]
    },
    reihe: {
      phasen: ["sicherung", "erarbeitung"],
      kurz: "Schritte in die richtige Folge legen und sagen, was woraus folgt.",
      schritte: [
        "Zerleg den Ablauf in vier bis sieben Karten ohne Nummern.",
        "Die Lernenden legen die Folge.",
        "Unterwegs prüfen: Falsche Karten gehen einzeln zurück.",
        "Zwischen zwei Karten sagen sie ein Wort: dann, weil, führt zu. Der fertige Weg kommt nach vorne."
      ],
      demoFach: "Gemeinschaftskunde",
      faecher: [
        ["Kfz-Technik", "Die Schritte eines Radwechsels in die richtige Folge bringen."],
        ["Geschichte", "Ereignisse eines Jahres ordnen und sagen, was woraus folgt."],
        ["Sozialpädagogik", "Den Ablauf einer Eingewöhnung legen und begründen."]
      ]
    },
    struktur: {
      phasen: ["sicherung"],
      kurz: "Begriffe zu einem Bild legen. An jeder Verbindung steht ein Wort.",
      schritte: [
        "Klär die Begriffe zuerst einzeln.",
        "Gib einen Satz Begriffskarten und wenige Arten von Verbindungen.",
        "Die Lernenden legen selbst und beschriften jede Verbindung.",
        "Erst danach zeigst du deinen Vorschlag. Eine Struktur kommt nach vorne. Später wird weitergelegt."
      ],
      demoFach: "Biologie",
      faecher: [
        ["Gemeinschaftskunde", "Bundestag, Bundesrat, Regierung, Gericht: Wer wählt, wer kontrolliert wen?"],
        ["Wirtschaft", "Angebot, Nachfrage, Preis: Was wirkt worauf?"],
        ["Sozialpädagogik", "Bildung, Erziehung, Betreuung: Wie hängen die drei zusammen?"]
      ]
    },
    einschaetzen: {
      phasen: ["sicherung", "abschluss"],
      kurz: "Einschätzen, was man schon kann – und danach wählen, was man übt.",
      schritte: [
        "Schreib drei bis fünf Ich-kann-Sätze zum Thema.",
        "Die Lernenden schätzen sich ein – am Anfang, in der Mitte, am Ende.",
        "Das Gerät merkt sich den Verlauf und schlägt eine passende Übung vor.",
        "Die Einschätzung bleibt bei der Person. Sie ist keine Note."
      ],
      demoFach: "alle Fächer",
      faecher: [
        ["Mathematik", "Ich kann Prozentwert, Grundwert und Prozentsatz unterscheiden."],
        ["Deutsch", "Ich kann eine These mit einem Beleg stützen."],
        ["Pflege", "Ich kann die Schritte der Händedesinfektion erklären."]
      ]
    },
    einordnen: {
      phasen: ["abschluss", "erarbeitung"],
      kurz: "Einen neuen Fall selbst einordnen. Dann einen begründeten Vorschlag daneben sehen.",
      schritte: [
        "Gib einen neuen Fall und feste Merkmale oder zwei Pole.",
        "Die Lernenden setzen ihre Marke und nennen ein Merkmal als Grund.",
        "Erst dann zeigt das Gerät einen begründeten Vorschlag daneben.",
        "Im Raum: Wo liegt ihr auseinander – und an welchem Merkmal liegt das?"
      ],
      demoFach: "Sozialpädagogik",
      faecher: [
        ["Geschichte", "Einen neuen Länderfall zwischen zwei Begriffen einordnen."],
        ["Gemeinschaftskunde", "Eine Maßnahme einordnen: eher Freiheit oder eher Sicherheit?"],
        ["Deutsch", "Einen Text einordnen: eher sachlich oder eher wertend?"]
      ]
    },
    video: {
      phasen: ["abschluss"],
      kurz: "In höchstens zwei Minuten etwas für andere erklären. Der Plan entsteht zuerst.",
      schritte: [
        "Gib ein enges Thema und ein Publikum: Erklär es jemandem, der gefehlt hat.",
        "Der Plan entsteht auf Papier: ein Satz, ein Beispiel, ein Bild.",
        "Aufnahme am Gerät, höchstens zwei Minuten. Wiederholen ist erlaubt.",
        "Zwei Aufnahmen kommen nach vorne. Die Klasse prüft: Stimmt es fachlich?"
      ],
      demoFach: "alle Fächer",
      faecher: [
        ["Mathematik", "Einen Rechenweg erklären – für jemanden, der gefehlt hat."],
        ["Kfz-Technik", "Einen Arbeitsschritt an der Werkbank zeigen und begründen."],
        ["Sozialpädagogik", "Einen Fachbegriff an einem Beispiel aus der Praxis erklären, ohne Namen."]
      ]
    }
  }
};
if (typeof module !== "undefined") module.exports = KOFFER;
