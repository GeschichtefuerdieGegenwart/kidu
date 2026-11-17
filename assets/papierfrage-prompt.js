/* Kidu – Papierfrage, »Die ganze Stunde prüfen«: der Prompt zum Kopieren (ab Version 4.46).

   Kidu ist mit keiner KI verbunden. Diese Datei baut nur einen Text. Die Lehrkraft kopiert ihn und gibt ihn mit ihrem
   Verlaufsplan, Arbeitsblatt oder ihrer Präsentation in ein an ihrer Schule freigegebenes KI-System ein.

   Der Prompt geht die Stunde Phase für Phase durch – wie die Papierfrage für eine Stelle, nur für alle Phasen:
   - die Phasen und die vier Einstufungen aus assets/daten/taxonomien.js (dieselben Namen wie überall in Kidu),
   - die sechs Prinzipien mit ihrem Satz von der Seite »Wann funktioniert digitaler Unterricht?« (assets/daten/prinzipien.js),
   - die Regeln aus erprobtem Unterricht aus der Liste »Papierfrage« in der Kurzfassung des Skills unterricht-digitalisieren
     (über assets/daten/kurzfassungen.js – gepflegt wird nur im Skill, eine Quelle für alles),
   - eine feste Gliederung der Antwort: Tabelle je Phase, dann »Bleibt auf Papier · Am Gerät · Im Raum«, höchstens drei Schritte.
   Keine Noten, keine Punkte, keine Prozente, keine Namen von KI-Anbietern. Tests: tests/papierfrage.test.js */
(function (wurzel) {
  "use strict";

  function quelle(name, pfad) {
    if (wurzel[name]) return wurzel[name];
    return typeof require !== "undefined" ? require(pfad) : null;
  }
  function sauber(t) { return String(t == null ? "" : t).replace(/\s+/g, " ").trim(); }

  var PHASEN = ["einstieg", "erarbeitung", "sicherung", "abschluss"];

  function baue(eingabe, K, P, T) {
    K = K || quelle("KURZFASSUNGEN", "./daten/kurzfassungen.js");
    P = P || quelle("PRINZIPIEN", "./daten/prinzipien.js");
    T = T || quelle("TAXONOMIEN", "./daten/taxonomien.js");
    var ud = K && K.skills ? K.skills["unterricht-digitalisieren"] : null;
    var regeln = ud && ud.papierfrage ? ud.papierfrage : [];
    var e = eingabe || {};
    var fach = sauber(e.fach), thema = sauber(e.thema), gruppe = sauber(e.gruppe);
    var phasen = PHASEN.map(function (id) { return T.phasen.filter(function (p) { return p.id === id; })[0].name; });

    var z = [];
    z.push("# Rolle");
    z.push("Du bist eine erfahrene Fachdidaktikerin für digitales Lernen. Du berätst mich kollegial. Du entscheidest nicht für mich und vergibst keine Note.");
    z.push("");
    z.push("# Auftrag");
    z.push("Prüfe meine Stunde Phase für Phase mit der Papierfrage: Geht es auf Papier genauso gut – für alle und für dieses Ziel? Dann bleibt es Papier.");
    z.push("Das Material hänge ich an oder füge es unten ein: einen Verlaufsplan, ein Arbeitsblatt oder eine Präsentation.");
    z.push("");
    z.push("# Kontext");
    z.push("- Fach: " + (fach || "noch offen"));
    z.push("- Thema: " + (thema || "noch offen"));
    z.push("- Lerngruppe: " + (gruppe || "noch offen"));
    z.push("- Die Lernenden haben Tablets. Ob sie in einer Phase genutzt werden, ist offen. Auch keine Phase am Gerät ist ein gutes Ergebnis.");
    if (!fach || !thema || !gruppe) z.push("Steht bei einer Angabe »noch offen«, frag mich zuerst danach.");
    z.push("");
    z.push("# Vorgehen");
    z.push("1. Nenne zuerst in einem Satz, was die Lernenden in dieser Stunde selbst denken oder tun sollen. Steht das nicht im Material, frag mich, bevor du weitermachst.");
    z.push("2. Geh die Phasen der Reihe nach durch: " + phasen.join(" · ") + ". Prüf für jede Phase:");
    z.push("   a) Was tun die Lernenden?");
    z.push("   b) Tut das Gerät hier etwas, das Papier nicht oder nur mühsam kann? Nimm nur diese sechs Prinzipien:");
    P.forEach(function (p) { z.push("      - " + p.name + ": " + p.kann); });
    z.push("      Passt keines, schreib »keines«.");
    z.push("   c) Hilft das Gerät nur beim Verteilen, Einsammeln oder Ablegen? Dann ist das ein organisatorischer Nutzen, kein Lernmehrwert.");
    z.push("   d) Ordne ein: " + T.einstufungen.map(function (x) { return "»" + x.name + "«"; }).join(" · ") + ".");
    z.push("   e) Schreib den Satz zum Vorteil: »Das Gerät … hier …«. Oder: »Bleibt auf Papier, weil …«.");
    if (regeln.length) {
      z.push("3. Prüf danach die ganze Stunde mit diesen Regeln aus erprobtem Unterricht:");
      regeln.forEach(function (r) { z.push("   - " + r); });
      z.push("4. Schlag höchstens drei Änderungen vor. Zuerst die, bei denen etwas zurück auf Papier geht oder eine eigene Festlegung fehlt.");
    } else {
      z.push("3. Schlag höchstens drei Änderungen vor. Zuerst die, bei denen etwas zurück auf Papier geht oder eine eigene Festlegung fehlt.");
    }
    z.push("");
    z.push("# Form deiner Antwort");
    z.push("Schreib in einfacher Sprache, in kurzen Sätzen und sprich mich mit »du« an. Halte genau diese Gliederung ein:");
    z.push("1. Ein Satz zum Ziel der Stunde.");
    z.push("2. Eine Tabelle: Phase · Was die Lernenden tun · Prinzip des Geräts oder »keines« · Einschätzung · Satz zum Vorteil.");
    z.push("3. Drei kurze Listen: »Bleibt auf Papier« · »Am Gerät« · »Im Raum«.");
    z.push("4. Höchstens drei nächste Schritte.");
    z.push("5. Grenzen deiner Einschätzung – was du am Material nicht sehen kannst, zum Beispiel die Bedienung am echten Gerät oder die Lerngruppe.");
    z.push("");
    z.push("# Regeln");
    z.push("- Keine Noten, keine Punkte, keine Prozentwerte.");
    z.push("- Motivation allein ist kein Lernmehrwert.");
    z.push("- Mehr Gerät ist nicht besser. Eine Stunde ganz auf Papier ist ein vollwertiges Ergebnis.");
    z.push("- Erfinde nichts. Fehlt dir etwas, frag nach.");
    z.push("- Enthält das Material Namen, Noten oder andere personenbezogene Daten, weise darauf hin und geh nicht weiter darauf ein.");
    z.push("");
    z.push("# Material");
    z.push("(Verlaufsplan, Arbeitsblatt oder Präsentation anhängen oder hier einfügen – ohne Namen und Noten.)");
    return z.join("\n");
  }

  var api = { baue: baue };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.PAPIERPROMPT = api;
})(typeof window !== "undefined" ? window : globalThis);
