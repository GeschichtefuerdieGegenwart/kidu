/* Kidu – Trainingsaufgaben im KI-Training (ab Version 4.46, Seite ki-aufgaben.html).
   Übungen, mit denen Lehrkräfte lernen, gut mit KI zu arbeiten – am eigenen Material, mit dem KI-System der Schule.
   Gegliedert nach den Fähigkeiten des Skills »ki-kompetenz-kollegium« (Abschnitt »Bausteine«; dort nach dem AI-Fluency-Rahmen
   von Dakan und Feller und dem KI-Kompetenzrahmen der UNESCO). Namen der Fähigkeiten wie im Skill.
   funktion  – was die Aufgabe im KI-System nutzt (Schlüssel aus funktionen). »ohne« = ohne KI.
   schritte  – drei Schritte. geschafft – woran du merkst, dass es geklappt hat: ein Nebensatz nach »Geschafft, wenn …«.
   dazu      – Werkzeuge in Kidu, die du dafür brauchst ([Adresse, Name]).
   zeit      – (ab 4.47) grob geschätzt, wie viel Zeit die Aufgabe braucht: Schlüssel aus zeiten. Keine Minutenangaben –
               die Aufgaben sind noch nicht erprobt (Recherche 17.11.2026: Zeit und KI-Bedarf auf einen Blick).
   ki        – (freiwillig) ein Auftrag zum Kopieren, gleiche fünf Teile wie die Schnell-Anfrage; gebaut mit WERKSTATT_ANFRAGE.auftrag.
   Regeln: Alle Aufgaben sind Vorschläge und noch nicht erprobt. Keine Minutenangaben (nur der grobe Zeitbedarf), keine Wirkungsversprechen.
   Keine Namen von KI-Anbietern oder Sprachmodellen. AIS.chat und F13 nur mit Stand (Ausnahme in CLAUDE.md).
   Funktionen von AIS.chat laut Land Baden-Württemberg (Pressemitteilung zum Start, Oktober 2025), Berliner Bildungsverwaltung
   (Pressemitteilung 2026) und Schulministerium NRW (Umbenennung von »telli« in »AIS.chat«, Mai 2026). Stand: November 2026.
   Tests: tests/training.test.js */
var TRAINING = {
  stand: "November 2026",
  status: "Vorschlag, noch nicht erprobt",

  funktionen: [
    { id: "chat", name: "Chat", text: "Fragen stellen, Material anhängen, Ergebnisse überarbeiten." },
    { id: "assistent", name: "Assistent", text: "Eine feste Anweisung für Aufgaben, die immer wiederkommen. Du kannst ihn mit Kolleg*innen deiner Schule teilen." },
    { id: "lernszenario", name: "Lernszenario", text: "Eine Aufgabe mit KI für deine Lernenden. Du teilst sie per Link oder QR-Code." },
    { id: "dialogpartner", name: "Dialogpartner", text: "Die Lernenden sprechen mit einer historischen oder ausgedachten Person. Auch per Link oder QR-Code." },
    { id: "modell", name: "Sprachmodell wählen", text: "Es stehen mehrere Sprachmodelle zur Wahl. Welche, ändert sich mit der Zeit." },
    { id: "kontingent", name: "Kontingent", text: "Deine Nutzung ist begrenzt. Ein guter Auftrag spart Nachfragen." }
  ],

  // ab 4.47: grober Zeitbedarf, geschätzt – nicht gemessen. Bewusst nicht »Umfang«: Das ist in taxonomien.js der Umfang des Gerätes im Unterricht.
  zeiten: [
    { id: "kurz", name: "kurz", text: "zwischendurch, in einer Pause oder vor dem Unterricht" },
    { id: "freistunde", name: "eine Freistunde", text: "etwa so lang wie eine Schulstunde" }
  ],

  gruppen: [
    { id: "abgeben", name: "Abgeben oder selbst machen", frage: "Welche Aufgabe gebe ich ab, welche bleibt bei mir – und warum?" },
    { id: "beschreiben", name: "Gut beschreiben", frage: "Was braucht die KI, damit sie nicht rät?" },
    { id: "pruefen", name: "Kritisch prüfen", frage: "Stimmt das? Fehlt etwas? Woher weiß ich das?" },
    { id: "verantworten", name: "Verantwortlich handeln", frage: "Darf ich das eingeben? Wie mache ich KI-Hilfe sichtbar?" },
    { id: "begleiten", name: "Lernende begleiten", frage: "Wie lernen Lernende mit KI, ohne dass die KI das Denken übernimmt?" }
  ],

  aufgaben: [
    {
      id: "woche", gruppe: "abgeben", funktion: "chat", zeit: "kurz",
      name: "Deine Woche sortieren",
      ziel: "Du entscheidest bewusst, was die KI übernehmen darf.",
      schritte: [
        "Schreib fünf Aufgaben deiner nächsten Woche auf: Unterricht, Korrektur, Organisation.",
        "Sortier sie in drei Spalten: abgeben · gemeinsam · selbst. Schreib zu jeder einen Grund.",
        "Nimm eine Aufgabe aus »gemeinsam« und gib sie mit der Schnell-Anfrage an das KI-System."
      ],
      geschafft: "du für jede Aufgabe sagen kannst, warum sie in ihrer Spalte steht.",
      dazu: [["schnell-anfrage.html", "Schnell-Anfrage"]]
    },
    {
      id: "erst-selbst", gruppe: "abgeben", funktion: "chat", zeit: "kurz",
      name: "Erst selbst, dann KI",
      ziel: "Du siehst, was die KI ergänzt – und was nur du über deine Klasse weißt.",
      schritte: [
        "Plan einen Stundeneinstieg selbst, in Stichworten.",
        "Lass dir vom KI-System zwei Einstiege zum selben Thema vorschlagen.",
        "Vergleich: Was hattest du, was die KI nicht hatte? Was nimmst du mit?"
      ],
      geschafft: "du einen Unterschied nennen kannst, den nur deine Lerngruppe erklärt.",
      dazu: [["schnell-anfrage.html", "Schnell-Anfrage »Einstieg mit Vermutung«"]]
    },
    {
      id: "modelle", gruppe: "abgeben", funktion: "modell", zeit: "kurz",
      name: "Zwei Sprachmodelle vergleichen",
      ziel: "Du weißt, welches Sprachmodell für eine Aufgabe reicht. Größer ist nicht immer besser.",
      schritte: [
        "Nimm einen fertigen Auftrag, zum Beispiel die Schnell-Anfrage »Exit-Ticket am Stundenende«.",
        "Schick ihn zweimal: einmal mit einem großen, einmal mit einem kleinen Sprachmodell.",
        "Vergleich die Ergebnisse mit den Prüfkriterien am Ende des Auftrags."
      ],
      geschafft: "du für eine Aufgabe, die oft wiederkommt, ein Sprachmodell gewählt hast – mit Grund.",
      dazu: [["schnell-anfrage.html", "Schnell-Anfrage"]]
    },
    {
      id: "umbauen", gruppe: "beschreiben", funktion: "chat", zeit: "kurz",
      name: "Eine schwache Anfrage umbauen",
      ziel: "Du erlebst, was die fünf Teile einer guten Anfrage ausmachen.",
      schritte: [
        "Schick einen kurzen Satz: »Mach mir ein Arbeitsblatt zu …« – mit deinem Thema.",
        "Bau dieselbe Anfrage mit den fünf Teilen: Ziel, Kontext, Anforderungen, Format, Prüfkriterien.",
        "Leg beide Ergebnisse nebeneinander. Was ist besser geworden?"
      ],
      geschafft: "du sagen kannst, welcher der fünf Teile am meisten gebracht hat.",
      dazu: [["prompten.html", "Prompten lernen"]]
    },
    {
      id: "assistent", gruppe: "beschreiben", funktion: "assistent", zeit: "freistunde",
      name: "Einen Assistenten für dein Fach anlegen",
      ziel: "Du schreibst einmal auf, was in deinem Fach gilt – und musst es nicht jedes Mal neu erklären.",
      schritte: [
        "Bau deine feste Anweisung auf der Seite »KI für dein Fach einrichten«.",
        "Leg einen Assistenten an und füg den Text als Anweisung ein.",
        "Test ihn mit drei kurzen Aufträgen. Ändere die Anweisung, wo er rät."
      ],
      geschafft: "ein Auftrag in einem Satz reicht und das Ergebnis zu deinem Fach passt. Erst dann teilst du ihn mit deiner Fachschaft.",
      dazu: [["ki-fach.html", "KI für dein Fach einrichten"]]
    },
    {
      id: "anhaengen", gruppe: "beschreiben", funktion: "chat", zeit: "kurz",
      name: "Eigenes Material anhängen",
      ziel: "Die KI arbeitet an deinem Material statt an einem ausgedachten.",
      schritte: [
        "Nimm ein eigenes Arbeitsblatt. Lösch vorher alle Namen und Noten.",
        "Häng es an und nimm die Schnell-Anfrage »In drei Niveaus differenzieren«.",
        "Prüf: Führen alle drei Fassungen zum selben Lernziel?"
      ],
      geschafft: "du drei Fassungen hast, die du auf Papier einsetzen würdest.",
      dazu: [["schnell-anfrage.html", "Schnell-Anfrage"], ["sicher.html", "Sicher arbeiten in fünf Regeln"]]
    },
    {
      id: "gegenprobe", gruppe: "pruefen", funktion: "modell", zeit: "kurz",
      name: "Gegenprobe mit einem zweiten Sprachmodell",
      ziel: "Du lässt prüfen – und entscheidest selbst.",
      schritte: [
        "Nimm ein Ergebnis aus einer anderen Trainingsaufgabe.",
        "Wechsle das Sprachmodell und kopier den Auftrag unten. Füg den Text darunter ein.",
        "Entscheid du: Welcher Hinweis stimmt? Welcher nicht?"
      ],
      geschafft: "du einen Hinweis begründet übernommen und einen begründet verworfen hast.",
      ki: {
        ziel: "Prüfe den Text unten wie eine erfahrene Fachkollegin. Du verbesserst ihn nicht, du prüfst ihn.",
        anforderungen: [
          "Nenne, was fachlich falsch oder ungenau ist – mit einem Satz Begründung.",
          "Nenne, was für das Lernziel fehlt.",
          "Nenne jede Angabe, die ich an einer Quelle nachprüfen sollte: Zahlen, Zitate, Namen, Daten.",
          "Sag auch, was gut ist und bleiben sollte."
        ],
        format: "Drei kurze Listen: »Falsch oder ungenau« · »Fehlt« · »Nachprüfen«. Darunter ein Satz: Was gut ist.",
        pruef: ["Ist jede Kritik begründet?", "Hast du etwas als falsch markiert, das nur anders formuliert ist?"],
        material: true
      }
    },
    {
      id: "faktencheck", gruppe: "pruefen", funktion: "chat", zeit: "freistunde",
      name: "Drei Stellen nachprüfen",
      ziel: "Du merkst, wo eine KI-Antwort sicher klingt, ohne sicher zu sein.",
      schritte: [
        "Lass dir einen kurzen Sachtext zu deinem Thema schreiben, mit Quellen.",
        "Markier: ★ Zahl ohne Beleg · ! falsche Sicherheit · ? fehlende Gegenposition.",
        "Prüf zwei Angaben und eine Quelle am Original."
      ],
      geschafft: "du weißt, welche Angabe du nicht übernehmen würdest – und warum.",
      dazu: [["auftraege.html#faktencheck", "Eine Übung: KI-Antworten prüfen"]]
    },
    {
      id: "darf-rein", gruppe: "verantworten", funktion: "ohne", zeit: "kurz",
      name: "Darf das rein?",
      ziel: "Du entscheidest sicher, was du eingeben darfst.",
      schritte: [
        "Schreib zehn Dinge auf Kärtchen, die du gern eingeben würdest: ein Arbeitsblatt, eine Notenliste, ein Elternbrief …",
        "Sortier sie: darf rein · nur ohne Namen · nie.",
        "Gleich ab mit den fünf Regeln. Wo bist du unsicher? Das klärst du mit der Schulleitung."
      ],
      geschafft: "du zu jeder Karte sagen kannst, warum sie dort liegt.",
      dazu: [["sicher.html", "Sicher arbeiten in fünf Regeln"]]
    },
    {
      id: "sichtbar", gruppe: "verantworten", funktion: "ohne", zeit: "kurz",
      name: "KI-Hilfe sichtbar machen",
      ziel: "Wer dein Material nutzt, weiß, wobei die KI geholfen hat.",
      schritte: [
        "Nimm ein Material, das mit KI entstanden ist.",
        "Schreib einen Satz dazu: Wobei hat die KI geholfen? Was hast du geprüft?",
        "Schreib einen zweiten Satz für die Lernenden – in einfacher Sprache."
      ],
      geschafft: "beide Sätze auf dem Material stehen und stimmen.",
      dazu: []
    },
    {
      id: "lernszenario", gruppe: "begleiten", funktion: "lernszenario", zeit: "freistunde",
      name: "Ein Lernszenario selbst durchspielen",
      ziel: "Du prüfst, ob die KI deinen Lernenden hilft – oder ihnen das Denken abnimmt.",
      schritte: [
        "Leg ein Lernszenario an. Nimm als Anweisung den Auftrag, der Hinweise statt Lösungen gibt.",
        "Spiel es selbst als Lernende*r durch. Versuch, die Lösung zu bekommen, ohne selbst zu denken.",
        "Gibt es die Lösung zu früh? Dann schärf die Anweisung nach und spiel es noch einmal."
      ],
      geschafft: "das Szenario nach deinem eigenen Versuch fragt und erst dann Hinweise gibt.",
      dazu: [["lernende-ki.html", "Wenn deine Lernenden mit KI arbeiten"]]
    },
    {
      id: "dialogpartner", gruppe: "begleiten", funktion: "dialogpartner", zeit: "freistunde",
      name: "Einen Dialogpartner testen",
      ziel: "Du weißt, wofür eine gespielte Person im Unterricht taugt – und wofür nicht.",
      schritte: [
        "Lass dir mit dem Auftrag unten eine Anweisung schreiben. Leg damit einen Dialogpartner an.",
        "Stell ihm drei Fragen, wie Lernende sie stellen würden – auch eine Fangfrage.",
        "Prüf: Bleibt er bei belegten Fakten? Sagt er, wenn er etwas nicht weiß?"
      ],
      geschafft: "du weißt, was die Lernenden danach ohne KI zeigen sollen.",
      ki: {
        ziel: "Schreib mir die Anweisung für einen Dialogpartner: eine Person zu meinem Thema, mit der meine Lernenden ein Gespräch führen – historisch, ausgedacht oder aus dem Berufsalltag.",
        anforderungen: [
          "Die Person sagt am Anfang, dass sie von einer KI gespielt wird.",
          "Sie spricht in einfacher Sprache und duzt die Lernenden.",
          "Sie bleibt bei dem, was belegt ist. Weiß sie etwas nicht, sagt sie das.",
          "Sie gibt keine fertigen Lösungen für Aufgaben. Sie fragt zurück.",
          "Sie fragt nicht nach persönlichen Daten der Lernenden."
        ],
        format: "Die Anweisung in höchstens 15 Sätzen. Darunter drei Fragen, mit denen ich den Dialogpartner vorher teste – eine davon ist eine Fangfrage.",
        pruef: ["Stimmen die Fakten, die die Person nennt?", "Gibt die Person irgendwo doch eine fertige Lösung?"],
        material: false
      }
    }
  ]
};

if (typeof module !== "undefined") module.exports = TRAINING;
