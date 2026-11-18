/* Kidu – Kurze Probe im Fortbildungsbogen (ab Version 4.48, Entscheidung Mario 17.11.2026: Aufgabenprobe statt nur Selbsteinschätzung).
   Ein ausgedachter Elternbrief. Er ist VON HAND GESCHRIEBEN, keine KI-Antwort (CLAUDE.md: keine simulierten KI-Antworten).
   Er enthält zwei Fehler, wie sie auch in KI-Entwürfen vorkommen – eine Zahl ohne Herkunft und eine erfundene Quelle
   (Fehlerarten wie im Prüf-Labor und im Skill »ki-faktencheck«) – und eine Datenschutzfalle: Name und Förderbedarf eines Kindes.
   Die Studie, ihre Autorin und das Kind sind erfunden; die Seite sagt das nach dem Auflösen.
   Ablauf: erst markieren, dann auflösen. Vor dem Auflösen zeigt die Seite weder die Zahl der Stellen noch ihre Art.
   Rückmeldung nur in Worten (»Darauf achtest du schon · Das lohnt sich anzusehen«), keine Punkte, keine Zählung.
   Auswertung: REGELN.probe (assets/regeln.js), Tests in tests/regeln.test.js. Status: Vorschlag, noch nicht erprobt. */
var PROBE = {
  titel: "Entwurf: Elternbrief zum Lerngang",
  fall: "Ausgedachter Fall. Von Hand geschrieben, keine KI-Antwort.",
  lage: "Du willst diesen Entwurf von einem KI-System kürzen lassen und danach an alle Eltern der Klasse schicken.",
  saetze: [
    { id: "p1", text: "Liebe Eltern, am kommenden Donnerstag gehen wir mit der Klasse in den Stadtwald.", art: "",
      warum: "Anlass, Tag und Ort – Angaben, die du selbst kennst." },
    { id: "p2", text: "Dort beobachten die Kinder, welche Tiere im Winter unterwegs sind.", art: "",
      warum: "Der Zweck des Lerngangs. Nichts zu beanstanden." },
    { id: "p3", text: "Kinder, die regelmäßig draußen lernen, behalten nachweislich 80 Prozent mehr.", art: "zahl",
      warum: "»Nachweislich« und »80 Prozent« klingen sicher. Woher die Zahl kommt, steht nirgends. Frag bei jeder Zahl: Wer hat das gezählt?" },
    { id: "p4", text: "Das zeigt die Studie »Lernen unter freiem Himmel« von Karin Brenner aus dem Jahr 2022.", art: "quelle",
      warum: "Diese Studie haben wir für die Übung erfunden. Sie klingt echt – so sehen erfundene Quellen oft aus. Such Titel und Autorin im Bibliothekskatalog." },
    { id: "p5", text: "Bitte geben Sie Ihrem Kind wetterfeste Kleidung und etwas zu trinken mit.", art: "",
      warum: "Eine klare Bitte an die Eltern." },
    { id: "p6", text: "Lena M. darf wegen ihrer Lese-Rechtschreib-Schwäche ihre Beobachtungen ins Tablet sprechen.", art: "daten",
      warum: "Name und Förderbedarf eines Kindes. Das gehört nicht in einen Brief an alle Eltern und nicht in ein KI-System. Lena ist erfunden." },
    { id: "p7", text: "Um 12.30 Uhr sind wir zurück an der Schule.", art: "",
      warum: "Eine Uhrzeit, die du selbst festlegst. Prüf nur, ob sie zum Plan passt." }
  ],
  arten: {
    zahl: { name: "Zahlen ohne Herkunft", kurz: "Zahl ohne Herkunft",
      schon: "Du hast die »80 Prozent« bemerkt. Bei jeder Zahl fragst du: Wer hat das gezählt?",
      ansehen: "Die »80 Prozent« klingen sicher, haben aber keine Herkunft. Zahlen und Fachangaben prüfst du an einer zweiten Stelle.",
      link: "pruef-labor.html#pl-fehler", linktext: "Fehler finden im Prüf-Labor" },
    quelle: { name: "Erfundene Quellen", kurz: "Erfundene Quelle",
      schon: "Du hast die Studie bemerkt, die es nicht gibt. Titel und Namen prüfst du im Katalog.",
      ansehen: "Die Studie gibt es nicht. KI-Systeme erfinden oft Quellen, die echt klingen. Jeden Titel prüfst du im Bibliothekskatalog.",
      link: "pruef-labor.html#pl-fehler", linktext: "Fehler finden im Prüf-Labor" },
    daten: { name: "Daten einer Person", kurz: "Datenschutz",
      schon: "Du hast den Satz über Lena bemerkt. Name und Förderbedarf gehören weder in den Brief noch in ein KI-System.",
      ansehen: "Der Satz über Lena nennt Name und Förderbedarf. Das gehört weder in einen Brief an alle noch in ein KI-System.",
      link: "pruef-labor.html#pl-hinein", linktext: "Was darf hinein? im Prüf-Labor" }
  },
  ok: "Stimmt",
  leer: "Du hast dir die Zeit für die Probe genommen. Ein Entwurf vor dem Abschicken noch einmal lesen – damit fängt Prüfen an.",
  alles: "Du hast alle Stellen gefunden. Mehr üben kannst du im Prüf-Labor, wenn du magst.",
  vorsicht: "Du hast auch Sätze markiert, die stimmen. Lieber einmal mehr hinsehen – die Auflösung zeigt, warum sie in Ordnung sind."
};
if (typeof module !== "undefined") module.exports = PROBE;
