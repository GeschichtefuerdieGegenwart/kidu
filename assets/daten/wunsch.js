/* Kidu – Die Wunsch-Methode (ab Version 4.52, Seite wunsch-methode.html, KI-Training · Phase »Grundlagen«).
   Die eine Quelle für das Modell »Vier Sätze, drei Kreise«: vier Sätze sagen, was du tust; drei Kreise sagen, für wen.
   Jeder Satz kreuzt jeden Kreis – das ergibt zwölf Felder. Grundlage: Auftrag Mario (18.11.2026) und das Dokument
   »KI-Curriculum für Kidu – Vier Sätze, drei Kreise« vom selben Tag.
   saetze    – die vier Sätze. faehigkeit = die Fähigkeit im Filter des Fahrplans (training.js), zu der der Satz gehört.
   kreise    – die drei Kreise. Sie ordnen keine Menschen, sie sagen nur, wessen Arbeit dein Tun gerade trifft.
               Es gibt keine Stufen, keinen Gesamtstand, keine Punkte (Entscheidung Mario, 18.11.2026).
   felder    – zwölf Felder. grund = gehört zur Grundausstattung (fünf Felder).
               kann      – was du in diesem Feld kannst, als Tätigkeit.
               beispiel  – eine typische Situation. Alle Beispiele sind ausgedacht.
               schritt   – der erste Schritt (immer »kurz«). ohneKi = geht ohne KI-System. wo = [Adresse, Name] eines Werkzeugs in Kidu.
               uebung    – die Übung dazu: zeit (Schlüssel aus zeiten), text, wo = Liste aus [Adresse, Name]; leer = noch kein Werkzeug.
               kniff     – »Der Kniff dazu«, ein Satz.
               aussage   – für »Wo stehst du?«: etwas, das du in den letzten vier Wochen getan hast (Verhalten, kein Gefühl).
   reihenfolge – in dieser Folge schlägt »Wo stehst du?« nächste Schritte vor: erst die Grundausstattung, mit dem Prüfen zuerst
               (wie im Plan »Vier Wochen«: Prüfen · Entscheiden · Beschreiben), dann von innen nach außen.
   zeiten    – dieselben Wörter wie in src/fahrplan-ki.json und training.js. Geschätzt, nichts ist gemessen.
   Regeln: Alles ist ein Vorschlag und noch nicht erprobt. Keine Minutenangaben, keine Wirkungsversprechen, keine Namen von
   KI-Anbietern. Tests: tests/wunsch.test.js */
var WUNSCH = {
  stand: "November 2026",
  status: "Vorschlag, noch nicht erprobt",

  zeiten: { kurz: "kurz", freistunde: "eine Freistunde", mehrere: "mehrere Termine" },

  saetze: [
    { id: "wissen", wort: "Wissen", satz: "Wissen, was du willst.", meint: "Du klärst dein Anliegen. Dann entscheidest du, ob KI dafür taugt.", faehigkeit: "abgeben" },
    { id: "sagen", wort: "Sagen", satz: "Sagen, was du willst.", meint: "Du gibst der KI, was sie braucht, damit sie nicht rät.", faehigkeit: "beschreiben" },
    { id: "pruefen", wort: "Prüfen", satz: "Prüfen, was du bekommst.", meint: "Du übernimmst nichts ungeprüft.", faehigkeit: "pruefen" },
    { id: "verantworten", wort: "Verantworten", satz: "Verantworten, was du weitergibst.", meint: "Du stehst für das ein, was du nutzt, zeigst und weitergibst.", faehigkeit: "verantworten" }
  ],

  kreise: [
    { id: "mich", name: "Für mich", meint: "Du nutzt KI für deine eigene Arbeit.", folge: "Ein Fehler trifft zuerst dich.",
      einstieg: { ich: "»Ich fange gerade erst an.«", wege: [["erste-minuten.html", "Deine ersten zehn Minuten"], ["pruef-labor.html", "Prüf-Labor"]] } },
    { id: "lernende", name: "Für meine Lernenden", meint: "Dein Tun trifft deine Lernenden: was sie mit KI dürfen, wie sie prüfen lernen, wie du bewertest.", folge: "Ein Fehler trifft deine Lernenden.",
      einstieg: { ich: "»Meine Lernenden nutzen KI.«", wege: [["lernende-ki.html", "Wenn deine Lernenden mit KI arbeiten"], ["auftraege.html#ki-grenzen", "Auftrag »KI-Regeln für eine Aufgabe festlegen«"]] } },
    { id: "andere", name: "Für andere", meint: "Du baust etwas, mit dem andere arbeiten: eine feste Anweisung, eine Vorlage, Regeln für die Fachgruppe.", folge: "Ein Fehler vervielfacht sich.",
      einstieg: { ich: "»Ich baue etwas für andere.«", wege: [["ki-fach.html", "KI für dein Fach einrichten"], ["kollegium.html", "Mit dem Kollegium"]] } }
  ],

  felder: [
    {
      id: "wissen-mich", satz: "wissen", kreis: "mich", grund: true,
      kann: "Du entscheidest vor einer Anfrage: abgeben, gemeinsam mit KI bearbeiten oder selbst machen. Den Grund sagst du in einem Satz. Bewerten und Entscheidungen über Personen gibst du nicht ab.",
      beispiel: "Sonntagabend, drei Dinge stehen an: Übungsaufgaben in drei Schwierigkeiten, die Begründung einer Zeugnisnote, ein Elternbrief zum Wandertag. Welche gibst du ab?",
      schritt: { text: "Mach im Prüf-Labor die Übung »Abgeben oder selbst machen«.", ohneKi: true, wo: ["pruef-labor.html#pl-abgeben", "Prüf-Labor"] },
      uebung: { zeit: "kurz", text: "Ordne die Aufgaben deiner Woche. Schreib zu jeder einen Grund.", wo: [["ki-aufgaben.html#tr-woche", "Trainingsaufgabe »Deine Woche sortieren«"]] },
      kniff: "Lass dir erst Ideen zeigen. Dann entscheidest du, was ausgearbeitet wird.",
      aussage: "Ich habe entschieden, eine Aufgabe nicht an die KI zu geben, und wusste, warum."
    },
    {
      id: "wissen-lernende", satz: "wissen", kreis: "lernende", grund: true,
      kann: "Du zerlegst eine Aufgabe in Teile und legst für jeden fest: KI hilft, KI ist egal oder KI ersetzt das Lernen. Du planst eine Stelle, an der deine Lernenden zeigen, was sie ohne KI können.",
      beispiel: "Deine Lernenden sollen ein eigenes Urteil bilden. Die KI liefert ein fertiges Urteil mit.",
      schritt: { text: "Zerleg eine Aufgabe der nächsten Woche in Teile. Kreuz bei jedem Teil an: KI hilft, KI ist egal, KI ersetzt das Lernen.", ohneKi: true, wo: ["lernende-ki.html", "Wenn deine Lernenden mit KI arbeiten"] },
      uebung: { zeit: "freistunde", text: "Leg die Regeln für eine Aufgabe fest und begründe sie mit dem Lernziel. Prüf, ob eine Schülerin den Text ohne Rückfrage versteht.", wo: [["auftraege.html#ki-grenzen", "Auftrag »KI-Regeln für eine Aufgabe festlegen«"]] },
      kniff: "Erst selbst, dann KI. Die Reihenfolge legst du fest.",
      aussage: "Ich habe für eine Aufgabe festgelegt, was meine Lernenden mit KI dürfen."
    },
    {
      id: "wissen-andere", satz: "wissen", kreis: "andere", grund: false,
      kann: "Du erkennst, welche Aufgabe so oft wiederkehrt, dass sich eine feste Anweisung lohnt. Eine fremde Vorlage prüfst du, bevor du sie einrichtest oder weitergibst. »Ich brauche nichts Zusätzliches« ist ein vollwertiges Ergebnis.",
      beispiel: "Eine Kollegin empfiehlt dir eine fertige Vorlage. Sie sieht gut aus. Passt sie zu deinem Fach und zu den Regeln deiner Schule?",
      schritt: { text: "Notier drei Aufträge der letzten Wochen, die du fast gleich mehrmals gestellt hast.", ohneKi: true, wo: null },
      uebung: { zeit: "freistunde", text: "Prüf eine empfohlene Vorlage mit sieben Fragen: Nutzen, Passung, Voraussetzungen, Aufwand, Risiken, Alternative, erster Test.", wo: [] },
      kniff: "Die einfachste Lösung zuerst. Oft reicht eine feste Anweisung.",
      aussage: "Ich habe eine Vorlage geprüft, bevor ich sie empfohlen habe."
    },
    {
      id: "sagen-mich", satz: "sagen", kreis: "mich", grund: true,
      kann: "Du nennst in einer Anfrage Ziel, Lerngruppe, Anforderungen, Format und Prüfkriterien. Fehlt der KI eine Angabe, lässt du sie nachfragen.",
      beispiel: "»Mach mir ein Arbeitsblatt zur Bremsanlage« bringt etwas Übliches. Mit »erstes Ausbildungsjahr, viele lesen langsam, eine Seite« passt es zu deiner Klasse.",
      schritt: { text: "Hol dir in der Schnell-Anfrage einen Prompt: Anlass wählen, drei Angaben, kopieren.", ohneKi: false, wo: ["schnell-anfrage.html", "Schnell-Anfrage"] },
      uebung: { zeit: "kurz", text: "Bau eine schwache Anfrage um, bis alle fünf Teile drinstehen.", wo: [["ki-aufgaben.html#tr-umbauen", "Trainingsaufgabe »Eine schwache Anfrage umbauen«"], ["prompten.html", "Prompten lernen"]] },
      kniff: "Sprich deine Anfrage ein, statt zu tippen. Und lass die KI zuerst nachfragen.",
      aussage: "Ich habe einer KI Ziel, Lerngruppe und Form genannt."
    },
    {
      id: "sagen-lernende", satz: "sagen", kreis: "lernende", grund: false,
      kann: "Du schreibst für deine Lernenden einen Auftrag an die KI, der Hinweise gibt statt Lösungen. Eine Lernaufgabe mit KI spielst du selbst durch, bevor du sie teilst.",
      beispiel: "In der Übungsphase lassen sich Lernende die Lösung geben und schreiben sie ab.",
      schritt: { text: "Schreib einen Lern-Auftrag mit Grenze und probier ihn selbst aus: »Gib mir die Lösung erst, wenn ich darum bitte.«", ohneKi: false, wo: null },
      uebung: { zeit: "freistunde", text: "Spiel selbst durch, was deine Lernenden erleben.", wo: [["ki-aufgaben.html#tr-lernszenario", "Trainingsaufgabe »Ein Lernszenario selbst durchspielen«"], ["ki-aufgaben.html#tr-dialogpartner", "Trainingsaufgabe »Einen Dialogpartner testen«"]] },
      kniff: "Erst selbst durchspielen, dann teilen.",
      aussage: "Ich habe für Lernende einen Auftrag an die KI geschrieben."
    },
    {
      id: "sagen-andere", satz: "sagen", kreis: "andere", grund: false,
      kann: "Du schreibst eine Anweisung, die ohne dich funktioniert: für dein Fach, als feste Anweisung im KI-System deiner Schule oder als Auftrag zum Kopieren. Jede Regel steht darin an einem Ort. Sie setzt nichts voraus, was andere nicht haben.",
      beispiel: "Dein Auftrag liefert bei dir gute Ergebnisse. Ein Kollege kopiert ihn und bekommt etwas ganz anderes. Im Auftrag fehlte, was du im Kopf hattest.",
      schritt: { text: "Schreib drei Sätze auf, die in deinem Fach immer gelten. Das ist der Anfang von »KI für dein Fach einrichten«.", ohneKi: true, wo: ["ki-fach.html", "KI für dein Fach einrichten"] },
      uebung: { zeit: "freistunde", text: "Leg eine feste Anweisung für dein Fach an. Für Fortgeschrittene gibt es den Skillkoffer.", wo: [["ki-aufgaben.html#tr-assistent", "Trainingsaufgabe »Einen Assistenten für dein Fach anlegen«"], ["skillkoffer.html", "Skillkoffer"]] },
      kniff: "Einmal sagen statt jedes Mal.",
      aussage: "Ich habe eine feste Anweisung geschrieben, die auch jemand anderes nutzt."
    },
    {
      id: "pruefen-mich", satz: "pruefen", kreis: "mich", grund: true,
      kann: "Du prüfst mindestens zwei Angaben am Original, bevor du etwas übernimmst. Du erkennst die häufigen Fehler: Zahl ohne Herkunft, falsches Zitat, erfundene Quelle, zu einfach, scheinbare Einigkeit.",
      beispiel: "Ein Erwartungshorizont aus der KI nennt die Aussage eines Historikers. Im Buch findest du sie nicht.",
      schritt: { text: "Mach im Prüf-Labor die Übung »Fehler finden«.", ohneKi: true, wo: ["pruef-labor.html#pl-fehler", "Prüf-Labor"] },
      uebung: { zeit: "freistunde", text: "Prüf drei Stellen einer eigenen KI-Antwort aus deinem Fach am Original.", wo: [["ki-aufgaben.html#tr-faktencheck", "Trainingsaufgabe »Drei Stellen nachprüfen«"]] },
      kniff: "Gib die Prüfkriterien gleich mit. Und frag: »Was konntest du nicht prüfen?«",
      aussage: "Ich habe eine Angabe aus einer KI-Antwort an einer zweiten Stelle nachgesehen."
    },
    {
      id: "pruefen-lernende", satz: "pruefen", kreis: "lernende", grund: false,
      kann: "Deine Lernenden prüfen eine KI-Antwort in vier Schritten: Stopp, Art der Aussage bestimmen, Original finden, Unbelegtes zurückverfolgen. Du prüfst einmal laut vor der Klasse.",
      beispiel: "Eine Präsentation nennt eine Zahl, und niemand weiß, woher sie stammt.",
      schritt: { text: "Probier die Markierzeichen aus dem Auftrag an einer eigenen KI-Antwort aus.", ohneKi: false, wo: ["auftraege.html#faktencheck", "Auftrag »Eine Übung: KI-Antworten prüfen«"] },
      uebung: { zeit: "mehrere", text: "Plan die Übung für eine Klasse: allein markieren, zu zweit prüfen, in der Klasse vergleichen. Dazu zwei kurze Wiederholungen.", wo: [["auftraege.html#faktencheck", "Auftrag »Eine Übung: KI-Antworten prüfen«"]] },
      kniff: "Prüf einmal laut vor der Klasse: einmal mit Treffer, einmal ohne.",
      aussage: "Meine Lernenden haben eine KI-Antwort geprüft."
    },
    {
      id: "pruefen-andere", satz: "pruefen", kreis: "andere", grund: false,
      kann: "Du testest eine Anweisung an einem nachgestellten Fall, bevor andere sie nutzen. Woran du ein gutes Ergebnis erkennst, legst du vorher fest. Du sagst offen, was nicht geprüft ist.",
      beispiel: "Du gibst eine Vorlage an die Fachgruppe weiter. Erst dort fällt auf, dass sie bei einem anderen Thema Unsinn liefert.",
      schritt: { text: "Probier deine feste Anweisung an einem alten Auftrag aus. Schreib vorher auf, woran du ein besseres Ergebnis erkennst.", ohneKi: false, wo: null },
      uebung: { zeit: "freistunde", text: "Im Tandem: Eine Kollegin nutzt deine Anweisung für ihren Anlass. Du notierst zwei Stellen, an denen sie hängen bleibt.", wo: [["kollegium.html#ko-tandem", "Mit dem Kollegium: KI-Tandem"]] },
      kniff: "Erst festlegen, woran du es erkennst. Dann vergleichen.",
      aussage: "Ich habe eine Anweisung an einem Fall getestet, bevor ich sie weitergegeben habe."
    },
    {
      id: "verantworten-mich", satz: "verantworten", kreis: "mich", grund: true,
      kann: "Du nutzt das an deiner Schule freigegebene KI-System. Namen, Noten und andere Angaben über Personen gibst du nicht ein. Du lädst nur Material hoch, an dem du die Rechte hast.",
      beispiel: "Du willst Hilfe bei der Rückmeldung zu einem Aufsatz. In der Kopfzeile stehen Name und Note.",
      schritt: { text: "Mach im Prüf-Labor die Übung »Was darf hinein?«.", ohneKi: true, wo: ["pruef-labor.html#pl-hinein", "Prüf-Labor"] },
      uebung: { zeit: "kurz", text: "Lies die fünf Regeln. Schreib dann einen eigenen Text so um, dass keine Person mehr darin steht.", wo: [["sicher.html", "Sicher arbeiten in fünf Regeln"], ["ki-aufgaben.html#tr-darf-rein", "Trainingsaufgabe »Darf das rein?«"]] },
      kniff: "Erst umschreiben, dann eingeben: ohne Namen, ohne Noten.",
      aussage: "Ich habe einen Text umgeschrieben, bevor ich ihn eingegeben habe."
    },
    {
      id: "verantworten-lernende", satz: "verantworten", kreis: "lernende", grund: false,
      kann: "Du machst KI-Hilfe in deinem Material kenntlich, deine Lernenden kennzeichnen ihre. Du baust eine Aufgabe so um, dass der Arbeitsweg zählt. Keine deiner Regeln hängt davon ab, KI-Texte zu erkennen. Die Bewertung bleibt bei dir.",
      beispiel: "Eine Hausarbeit kommt bei allen glatt und fehlerfrei zurück. Du weißt nicht, was deine Lernenden selbst können.",
      schritt: { text: "Schreib einen Satz, mit dem du KI-Hilfe in deinem Material kennzeichnest.", ohneKi: true, wo: ["ki-aufgaben.html#tr-sichtbar", "Trainingsaufgabe »KI-Hilfe sichtbar machen«"] },
      uebung: { zeit: "freistunde", text: "Lass eine eigene Aufgabe von der KI lösen. Bau sie dann so um, dass der Arbeitsweg zählt.", wo: [["bewertung.html", "Werkstatt Bewertungskultur"]] },
      kniff: "Lass die KI deine Aufgabe lösen, bevor es deine Lernenden tun.",
      aussage: "Ich habe eine Aufgabe umgebaut, weil KI sie lösen kann."
    },
    {
      id: "verantworten-andere", satz: "verantworten", kreis: "andere", grund: false,
      kann: "Du nennst den Stand: Vorschlag, Entwurf oder erprobt. Du hältst fest, wofür deine Anweisung nicht taugt. Du gibst nichts weiter, das Namen enthält, und nennst Quelle und Lizenz. In der Fachgruppe passen eure Regeln auf eine Seite.",
      beispiel: "Deine Fachgruppe nutzt drei verschiedene Vorlagen. Niemand weiß, welche geprüft ist.",
      schritt: { text: "Schreib unter deine Anweisung drei Zeilen: Stand, wofür sie nicht taugt, letzter Fehler.", ohneKi: true, wo: null },
      uebung: { zeit: "mehrere", text: "Arbeitet als Fachgruppe über mehrere Treffen. Am Ende stehen eure Regeln auf einer Seite. Offenes heißt »noch offen«.", wo: [["kollegium.html#ko-fachgruppe", "Mit dem Kollegium: Die Fachgruppe als Lerngemeinschaft"]] },
      kniff: "Notier den Fallstrick, sobald er passiert.",
      aussage: "Ich habe mit Kolleg*innen eine Regel zum Umgang mit KI aufgeschrieben."
    }
  ],

  // Vorschlag für nächste Schritte: erst die Grundausstattung (Prüfen zuerst), dann von innen nach außen.
  reihenfolge: ["pruefen-mich", "wissen-mich", "verantworten-mich", "sagen-mich", "wissen-lernende",
    "pruefen-lernende", "verantworten-lernende", "sagen-lernende",
    "wissen-andere", "sagen-andere", "pruefen-andere", "verantworten-andere"],

  // Zum Aufklappen: was in der Lampe wirklich steckt – die technische Seite in fünf Sätzen.
  lampe: [
    "In der Lampe wohnt kein Geist. Dort rechnet ein Programm.",
    "Es hat sehr viele Texte ausgewertet. Daraus berechnet es, welches Wort wahrscheinlich als nächstes passt.",
    "Darum klingt es flüssig, auch wenn es falsch liegt.",
    "Es weiß nicht, was stimmt, und es will nichts. Manche KI-Systeme können nachschlagen. Prüfen musst du trotzdem.",
    "Es kennt deine Klasse nicht. Was du nicht sagst, füllt es mit dem Üblichen."
  ]
};

if (typeof module !== "undefined") module.exports = WUNSCH;
