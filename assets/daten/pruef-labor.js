/* Kidu – Prüf-Labor (ab Version 4.47, Seite pruef-labor.html). Drei Übungen, die ohne KI-System gehen – auch auf Papier.
   Entscheidung Mario, 17.11.2026: die Erkenntnisse der Recherche umsetzen (Übungen ohne KI-Kontingent für Lehrkräfte mit
   verschiedenen Vorkenntnissen; erst festlegen, dann auflösen; Rückmeldung in Worten, ohne Punkte).
   1 fehler  – Fehler finden in einem Übungstext. Der Text ist VON HAND GESCHRIEBEN, keine KI-Antwort (CLAUDE.md: keine
               simulierten KI-Antworten). Er enthält absichtlich Fehler, wie sie auch in KI-Entwürfen vorkommen. Fehlerarten
               wie im Skill »ki-faktencheck«. Was stimmt, stimmt wirklich (Gutenberg: Mainz, um 1450, bewegliche Lettern aus
               Metall, lateinische Bibel mit meist 42 Zeilen je Seite, Schätzung etwa 180 Stück). Erfundenes ist als erfunden
               benannt: Das Zitat und die Studie gibt es nicht.
   2 abgeben – Abgeben oder selbst machen: acht Aufgaben aus dem Schulalltag. Kein Richtig oder Falsch – der Vorschlag von Kidu
               mit Begründung, nach den Regeln in sicher.html und der Handlungsempfehlung der KMK (2024): Bewertung und
               Entscheidungen über Personen bleiben bei der Lehrkraft.
   3 hinein  – Was darf hinein? Acht Angaben als Ampel, mit einer datensparsamen Fassung. Nach den fünf Regeln in sicher.html.
   Regeln: keine Punkte, keine Zeitangaben, keine Namen von KI-Anbietern. Status: Vorschlag, noch nicht erprobt.
   Tests: tests/pruef-labor.test.js */
var PRUEFLABOR = {
  stand: "November 2026",
  status: "Vorschlag, noch nicht erprobt",

  fehler: {
    titel: "Der Buchdruck",
    hinweis: "Übungstext. Von Hand geschrieben, nicht von einer KI. Er enthält absichtlich Fehler, wie sie auch in KI-Entwürfen vorkommen.",
    arten: ["Zahl ohne Herkunft", "falsches Zitat", "erfundene Quelle", "zu einfach", "scheinbare Einigkeit"],
    saetze: [
      { id: "s1", text: "Johannes Gutenberg lebte im 15. Jahrhundert in Mainz.", fehler: "",
        warum: "So steht es in jedem Lexikon." },
      { id: "s2", text: "Um 1450 entwickelte er ein Verfahren, mit beweglichen Buchstaben aus Metall zu drucken.", fehler: "",
        warum: "»Um 1450« ist vorsichtig formuliert – so soll es sein, wenn ein Jahr nicht genau feststeht." },
      { id: "s3", text: "Von seiner Bibel druckte er genau 1.000 Stück.", fehler: "Zahl ohne Herkunft",
        warum: "Die Zahl ist zu hoch, und »genau« ist zu sicher. Die Forschung schätzt etwa 180 Stück. Frag bei jeder Zahl: Wer hat das gezählt?" },
      { id: "s4", text: "Gutenberg selbst schrieb dazu: »Mein Werk wird die Welt für immer verändern.«", fehler: "falsches Zitat",
        warum: "Dieses Zitat haben wir für die Übung erfunden. Zitate prüfst du am Original oder in einer Quellenausgabe." },
      { id: "s5", text: "Das zeigt die Studie »Druck und Wandel« von Petra Albers aus dem Jahr 2019.", fehler: "erfundene Quelle",
        warum: "Diese Studie haben wir erfunden. Sie klingt echt – so sehen erfundene Quellen oft aus. Such Titel und Autorin im Bibliothekskatalog." },
      { id: "s6", text: "Die Bibel hat meist 42 Zeilen auf jeder Seite.", fehler: "",
        warum: "Deshalb heißt sie auch 42-zeilige Bibel. Eine genaue Angabe ist nicht automatisch falsch – prüfen lohnt sich trotzdem." },
      { id: "s7", text: "Vorher konnte in Europa niemand Bücher vervielfältigen.", fehler: "zu einfach",
        warum: "Bücher wurden vorher von Hand abgeschrieben, und es gab Drucke mit geschnitzten Holztafeln." },
      { id: "s8", text: "Alle Fachleute sind sich einig, dass der Buchdruck die wichtigste Erfindung der Geschichte ist.", fehler: "scheinbare Einigkeit",
        warum: "»Alle« und »die wichtigste« sind Warnwörter. Über solche Rangfolgen gibt es keine Einigkeit." }
    ],
    pruefschritte: [
      ["Stopp", "Nicht gleich glauben, nicht gleich verwerfen."],
      ["Art der Aussage bestimmen", "Ist es eine Zahl, ein Zitat, eine Quelle oder eine Deutung?"],
      ["Original finden", "Lexikon, Bibliothekskatalog, Gesetzestext, Quellenausgabe."],
      ["Unbelegtes zurückverfolgen", "Woher stammt die Angabe? Findest du nichts, bleibt sie draußen."]
    ]
  },

  wege: [
    { id: "selbst", name: "Selbst machen" },
    { id: "gemeinsam", name: "Gemeinsam mit KI" },
    { id: "abgeben", name: "Abgeben und prüfen" }
  ],
  abgeben: [
    { id: "a1", aufgabe: "Drei Fassungen einer Übungsaufgabe in verschiedenen Schwierigkeiten", vorschlag: "abgeben",
      warum: "Das ist Routine, und ein Entwurf entsteht schnell. Du prüfst, ob die Aufgaben fachlich stimmen, und rechnest die Lösungen selbst." },
    { id: "a2", aufgabe: "Die Noten im Zeugnis begründen", vorschlag: "selbst",
      warum: "Die Bewertung bleibt bei dir. Namen und Noten gehören nicht in ein KI-System." },
    { id: "a3", aufgabe: "Ein Elternbrief zum Wandertag, ohne Namen", vorschlag: "abgeben",
      warum: "Ein Entwurf spart Zeit. Datum, Ort, Kosten und den Ton prüfst du selbst – das sind die Stellen, an denen Fehler auffallen." },
    { id: "a4", aufgabe: "Eine Rückmeldung zu einem Aufsatz", vorschlag: "selbst",
      warum: "Die Rückmeldung kommt von dir, in deinen Worten. Die KI darf dir helfen, ein Raster mit Kriterien zu entwerfen – ohne den Aufsatz." },
    { id: "a5", aufgabe: "Einen Sachtext in einfache Sprache übertragen", vorschlag: "abgeben",
      warum: "Das kann ein KI-System oft gut. Du prüfst, ob die Fachbegriffe stimmen und nichts Wichtiges verloren geht." },
    { id: "a6", aufgabe: "Ein Gespräch mit Eltern über einen Konflikt in der Klasse vorbereiten", vorschlag: "selbst",
      warum: "Es geht um Personen und um Vertrauen. Einen allgemeinen Gesprächsleitfaden ohne Einzelheiten kannst du dir entwerfen lassen." },
    { id: "a7", aufgabe: "Literatur für eine neue Unterrichtsreihe finden", vorschlag: "gemeinsam",
      warum: "Die KI liefert Suchwörter und Ideen. Sie erfindet aber oft Quellen. Jede Quelle prüfst du im Katalog, bevor du sie nutzt." },
    { id: "a8", aufgabe: "Einen Erwartungshorizont zu deiner Klausur entwerfen", vorschlag: "gemeinsam",
      warum: "Ein Entwurf spart Zeit. Was als richtig gilt und wie viel eine Leistung wert ist, legst du fest." }
  ],

  ampel: [
    { id: "gruen", name: "Darf hinein" },
    { id: "gelb", name: "Erst umschreiben" },
    { id: "rot", name: "Bleibt draußen" }
  ],
  hinein: [
    { id: "h1", angabe: "»Kfz-Technik, Bremsanlage, erstes Ausbildungsjahr«", vorschlag: "gruen",
      warum: "Fach, Thema und Lerngruppe. Niemand ist erkennbar.", fassung: "" },
    { id: "h2", angabe: "Ein Aufsatz mit Name und Note in der Kopfzeile", vorschlag: "gelb",
      warum: "Name und Note sind personenbezogen. Auch der Inhalt kann eine Person erkennbar machen.",
      fassung: "Name und Note entfernen, Einzelheiten verändern – oder einen ausgedachten Text nehmen." },
    { id: "h3", angabe: "Eine Liste deiner Klasse mit Namen und Fehlzeiten", vorschlag: "rot",
      warum: "Namen mit Fehlzeiten sind personenbezogene Daten. Umschreiben hilft hier nicht.",
      fassung: "Brauchst du nur die Form? Lass dir eine leere Vorlage bauen und trag die Daten selbst ein." },
    { id: "h4", angabe: "Ein Arbeitsblatt, das du selbst geschrieben hast", vorschlag: "gruen",
      warum: "Du hast die Rechte daran, und es steht keine Person darin.", fassung: "" },
    { id: "h5", angabe: "Ein Kapitel aus dem Schulbuch als Foto", vorschlag: "rot",
      warum: "Lade nur Material hoch, an dem du die Rechte hast. Am Schulbuch hast du sie meist nicht.",
      fassung: "Beschreib den Inhalt in eigenen Worten oder nimm deinen eigenen Text. Im Zweifel fragst du die Schulleitung." },
    { id: "h6", angabe: "Die Mail einer Kollegin, die du beantworten willst", vorschlag: "gelb",
      warum: "Auch Daten von Kolleg*innen gehören nicht hinein.",
      fassung: "Schreib die Frage in eigenen Worten auf, ohne Namen und ohne Persönliches." },
    { id: "h7", angabe: "»Jonas aus der 8c, Sohn der Elternbeiratsvorsitzenden, stört seit Wochen den Unterricht.«", vorschlag: "gelb",
      warum: "Name, Klasse und die Rolle der Mutter machen ihn erkennbar.",
      fassung: "»Ein Schüler, etwa 14, stört seit Wochen den Unterricht.«" },
    { id: "h8", angabe: "»Viele lesen langsam, einige haben Deutsch als Zweitsprache.«", vorschlag: "gruen",
      warum: "Das beschreibt die Lerngruppe, keine einzelne Person. Genau das braucht die KI, um nicht zu raten.", fassung: "" }
  ]
};
if (typeof module !== "undefined") module.exports = PRUEFLABOR;
