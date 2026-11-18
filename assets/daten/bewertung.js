/* Kidu – Werkstatt Bewertungskultur (ab Version 4.48, Seite bewertung.html, Phase 4 »Im Kollegium«).
   Entscheidung Mario, 17.11.2026: nach der Recherche »KI-Training für heterogene Kollegien« aufgenommen – als Werkstatt, nicht als
   Vorlagen (Vorlagen zur Prüfungskultur hatte er am 31.10.2026 zurückgestellt). Grundlage: Handlungsempfehlung der KMK (2024):
   Bewertung stärker am Arbeitsweg, kein allgemeines Verbot von KI bei Hausaufgaben, die Bewertung bleibt bei der Lehrkraft.
   Die Werkstatt trennt pädagogische Gestaltung von verbindlichen Vorgaben (Prüfungsordnung, Land, Schule) und gibt keine Rechtsauskunft.
   Die vier Umbauten stehen in src/bewertung.html.
   auftraege: zwei Aufträge zum Kopieren, gleiche fünf Teile wie die Schnell-Anfrage (gebaut mit WERKSTATT_ANFRAGE.auftrag),
   ohne Namen von KI-Anbietern. Status: Vorschlag, noch nicht erprobt. Tests: tests/bewertung.test.js */
var BEWERTUNG = {
  stand: "November 2026",
  status: "Vorschlag, noch nicht erprobt",

  auftraege: [
    {
      id: "bw-loesen", name: "Die KI die Aufgabe lösen lassen",
      ziel: "Löse die Aufgabe unten so, wie es eine Schülerin oder ein Schüler mit KI-Hilfe tun könnte. Sag mir danach offen, was dir leichtfiel.",
      anforderungen: [
        "Löse die Aufgabe vollständig und in der Länge, die sie verlangt.",
        "Nenne danach die Teile, die du ganz ohne das Wissen der Lernenden lösen konntest.",
        "Nenne die Stellen, an denen deine Lösung einer Lehrkraft auffallen würde – und die, an denen sie nicht auffallen würde."
      ],
      format: "Erst die Lösung. Darunter zwei kurze Listen: »Leicht für eine KI« · »Schwer für eine KI«.",
      pruef: ["Hast du etwas ergänzt, das in der Aufgabe nicht verlangt ist?", "Ist die Lösung so lang, wie die Aufgabe es verlangt?"],
      material: true
    },
    {
      id: "bw-umbauen", name: "Die Aufgabe umbauen",
      ziel: "Hilf mir, die Aufgabe unten so umzubauen, dass der Arbeitsweg der Lernenden sichtbar wird und zählt.",
      anforderungen: [
        "Schlag drei Umbauten vor, je mit einem Satz Begründung: Arbeitsweg zeigen · kurz mündlich erklären · KI-Hilfe offenlegen.",
        "Formuliere für jeden Umbau den neuen Arbeitsauftrag in einfacher Sprache.",
        "Schlag eine Absprache vor: Welche Teile sind mit KI erlaubt, welche machen die Lernenden selbst?",
        "Bewerte nichts und vergib keine Noten. Die Bewertung bleibt bei mir.",
        "Wo du die Regeln meiner Schule oder die Prüfungsordnung nicht kennst, schreib »mit der Schulleitung klären«."
      ],
      format: "Eine Tabelle: Umbau · neuer Arbeitsauftrag · was ich als Lehrkraft dafür brauche. Darunter die Absprache in drei Sätzen.",
      pruef: ["Ist jeder neue Arbeitsauftrag in der vorgesehenen Zeit machbar?", "Verlangt ein Umbau etwas, das in Prüfungen nicht erlaubt sein könnte? Dann markiere es."],
      material: true
    }
  ]
};
if (typeof module !== "undefined") module.exports = BEWERTUNG;
