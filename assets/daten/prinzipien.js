/* Kidu – die sechs Prinzipien als Daten (ab Version 4.46).
   Was das Gerät besser kann als Papier: verdecken · rückmelden · messen · variieren · stufen · bündeln.
   kann  – der Satz von der Seite »Wann funktioniert digitaler Unterricht?« (sechs-hebel.html), wörtlich.
           Ein Test (tests/papierfrage.test.js) prüft, dass er dort so steht – die Seite bleibt die Quelle für Beispiele.
   satz  – der Satz zum Vorteil für die Papierfrage: »Das Gerät … hier …«.
   Genutzt von: assets/regeln.js (REGELN.papierprobe), assets/probe.js, assets/papierfrage-prompt.js.
   Die Namen stehen auch in assets/daten/aufgaben.js (AUFGABEN.hebel); ein Test hält beide gleich. */
var PRINZIPIEN = [
  { id: "verdecken", name: "Verdecken", kann: "Das Gerät hält die Auflösung zurück, bis du dich festgelegt hast.",
    satz: "Das Gerät hält hier die Auflösung zurück, bis sich alle festgelegt haben." },
  { id: "rueckmelden", name: "Rückmelden", kann: "Das Gerät antwortet sofort und erklärt jede Antwort.",
    satz: "Das Gerät erklärt hier jede Antwort sofort – für alle zugleich." },
  { id: "messen", name: "Messen", kann: "Das Gerät misst Zeit und Treffer, teilt zufällig zu und rechnet aus.",
    satz: "Das Gerät misst hier und rechnet aus. Die Zeit geht ins Deuten, nicht ins Auszählen." },
  { id: "variieren", name: "Variieren", kann: "Das Gerät lässt einen Wert verschieben und zeigt, was sich ändert – und was nicht.",
    satz: "Das Gerät lässt hier einen Wert verschieben und zeigt, was sich ändert – und was nicht." },
  { id: "stufen", name: "Stufen", kann: "Das Gerät bietet denselben Inhalt in mehreren Zugängen an.",
    satz: "Das Gerät bietet hier denselben Inhalt in mehreren Zugängen an. Niemand sieht, wer welchen wählt." },
  { id: "buendeln", name: "Bündeln", kann: "Das Gerät sammelt die Antworten der Klasse ohne Namen und zeigt sie auf einen Blick.",
    satz: "Das Gerät sammelt hier die Antworten der Klasse ohne Namen und zeigt sie auf einen Blick." }
];
if (typeof module !== "undefined") module.exports = PRINZIPIEN;
