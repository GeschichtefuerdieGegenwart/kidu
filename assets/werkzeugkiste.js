/* Kidu – Skillkoffer und Fassungsangaben (ab Version 4.25; Dateiname aus der Zeit der »Werkzeugkiste« – die Adresse bleibt).
   1. Jedes Element mit data-kurzfassung="skill-a skill-b" bekommt einen Satz, aus welcher Fassung der Auftrag stammt.
   2. Auf skillkoffer.html (ab 4.46, vorher werkzeugkiste.html »Methodenkoffer«): die Karten je Skill mit »So sieht es am Ende aus«
      und Download, die Bau-Skills mit ihren Beispielen (ohne Download) und die Liste »Welcher Skill in welchem Werkzeug steckt«.
   Daten: KURZFASSUNGEN (assets/daten/kurzfassungen.js, erzeugt von tools/werkzeugkiste.py), SKILLKOFFER (assets/daten/skillkoffer.js),
   WERKSTATT für die Aufträge. Keine KI-Anbindung, nichts wird gespeichert. */
(function () {
  "use strict";
  var K = typeof KURZFASSUNGEN !== "undefined" ? KURZFASSUNGEN : null;
  if (!K) return;
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fassung(id) { var k = K.skills[id]; return k ? "»" + id + "« (Fassung " + k.fassung + ", " + k.datum + ")" : ""; }

  /* 1. Fassungsangaben an den Werkzeugen */
  Array.prototype.forEach.call(document.querySelectorAll("[data-kurzfassung]"), function (el) {
    var teile = el.getAttribute("data-kurzfassung").split(/\s+/).filter(function (id) { return K.skills[id]; }).map(fassung);
    if (!teile.length) return;
    el.innerHTML = "Dieser Auftrag enthält die Kurzfassung des Skills " + esc(teile.join(" und ")) +
      '. Den ganzen Skill gibt es im <a href="skillkoffer.html">Skillkoffer</a>.';
  });

  /* 2a. Skillkoffer: Karten der öffentlichen Skills */
  var S = typeof SKILLKOFFER !== "undefined" ? SKILLKOFFER : null;
  var wo = function (liste) {
    return liste && liste.length ? '<div class="sk-wo"><p><b>In Aktion auf Kidu</b></p><ul>' + liste.map(function (w) {
      return '<li><a class="textlink" href="' + esc(w[0]) + '">' + esc(w[1]) + ' <span aria-hidden="true">→</span></a></li>';
    }).join("") + "</ul></div>" : "";
  };
  var karten = document.getElementById("sk-karten");
  if (karten && S) {
    var html = S.oeffentlich.map(function (s) {
      var k = K.skills[s.id] || {};
      var name = s.name || k.name || s.id, kurz = s.kurz || k.kurz || "";
      var stand = k.fassung ? "Fassung " + k.fassung + " vom " + k.datum : "";
      return '<li class="sk-karte" id="sk-' + esc(s.id) + '"><h3>' + esc(name) + "</h3>" +
        '<p class="sk-kurz">' + esc(kurz) + "</p>" +
        '<div class="sk-ende"><p class="sk-ende-titel">So sieht es am Ende aus</p><p>' + esc(s.ergebnis) + "</p>" +
        (s.belegt ? '<p class="leise">' + esc(s.belegt) + " Eine persönliche Beobachtung, kein Nachweis der Wirkung.</p>" : "") + "</div>" +
        wo(s.wo) +
        '<p class="sk-laden"><a class="knopf still" href="werkzeugkiste/download/skills/' + esc(s.id) + '.zip" download>Skill herunterladen</a>' +
        '<span class="leise klein">' + esc(s.id) + (stand ? " · " + esc(stand) : "") + (k.lizenz ? " · CC BY-SA 4.0" : "") + "</span></p></li>";
    });
    var g = S.gestaltung;
    if (g) {
      html.push('<li class="sk-karte sk-gestaltung" id="sk-gestaltung"><h3>' + esc(g.name) + '</h3><p class="sk-kurz">' + esc(g.kurz) + "</p>" +
        '<div class="sk-ende"><p class="sk-ende-titel">So sieht es am Ende aus</p><p>' + esc(g.ergebnis) + "</p></div>" + wo(g.wo) +
        '<p class="sk-laden"><a class="knopf still" href="werkzeugkiste/download/kidu-gestaltung.zip" download>Gestaltungsregeln herunterladen</a>' +
        '<span class="leise klein">DESIGN.md · CC BY-NC-SA 4.0</span></p></li>');
    }
    karten.innerHTML = html.join("");
    var alles = document.querySelector("#laden-alles .knopf");
    if (alles) alles.textContent = "Das ganze Plugin »" + K.plugin.name + "« " + K.plugin.version;
  }

  /* 2b. Skillkoffer: was mit den Bau-Skills entsteht – ohne Download */
  var bau = document.getElementById("sk-bau");
  if (bau && S) {
    bau.innerHTML = S.bau.map(function (b) {
      return '<li class="sk-karte sk-bau-karte" id="sk-' + esc(b.id) + '">' +
        (b.bild ? '<img class="sk-bild" src="' + esc(b.bild) + '" alt="' + esc(b.alt) + '" loading="lazy" width="1920" height="1080">' : "") +
        "<h3>" + esc(b.name) + '</h3><p class="sk-kurz">' + esc(b.tut) + "</p>" +
        '<div class="sk-ende"><p class="sk-ende-titel">' + (b.art === "gebaut" ? "Damit gebaut" : "So sieht so etwas aus") + "</p><p>" + esc(b.text) +
        ' <a class="textlink" href="' + esc(b.href) + '">' + esc(b.linktext) + ' <span aria-hidden="true">→</span></a></p></div>' +
        (b.kurzfassung ? '<p class="leise">' + esc(b.kurzfassung) + "</p>" : "") +
        '<p class="sk-privat leise klein">Bleibt beim Urheber · nicht zum Herunterladen</p></li>';
    }).join("");
  }

  /* 2c. Welcher Skill in welchem Werkzeug steckt (früher »Drei Werkzeuge, acht Anleitungen«) */
  var liste = document.getElementById("kf-liste");
  if (liste) {
    var W = typeof WERKSTATT !== "undefined" ? WERKSTATT : { auftraege: [] };
    var standVon = function (id) { var k = K.skills[id]; return k ? "Fassung " + k.fassung + " vom " + k.datum : ""; };
    var teil = function (href, name, wozu, id) {
      return K.skills[id] ? '<li><a class="textlink" href="' + href + '">' + esc(name) + "</a>" + (wozu ? " – " + esc(wozu) : "") +
        ' <span class="leise klein">· ' + esc(standVon(id)) + "</span></li>" : "";
    };
    var gruppen = [
      { href: "digitalisieren.html", name: "Bisherigen Unterricht digitalisieren", satz: "Der Prompt folgt zwei Skills.",
        teile: teil("digitalisieren.html", "Unterricht digitalisieren", "so geht das KI-System vor", "unterricht-digitalisieren") +
               teil("digitalisieren.html", "Lernseite bauen", "nur wenn du als Ausgabe eine Lernseite wählst", "lernseite-bauen") },
      { href: "papierfrage.html#ganze-stunde", name: "Papierfrage: Die ganze Stunde prüfen", satz: "Der Auftrag folgt den Regeln aus einem Skill.",
        teile: teil("papierfrage.html#ganze-stunde", "Unterricht digitalisieren", "Liste »Papierfrage«", "unterricht-digitalisieren") },
      { href: "digital-check.html#mit-ki", name: "Digital-Check: Mit KI prüfen", satz: "Der Prüf-Auftrag folgt einem Skill.",
        teile: teil("digital-check.html#mit-ki", "Digital-Check", "die typischen Schwächen und die Gestaltung", "digital-check") },
      { href: "auftraege.html", name: "Aufträge zum Kopieren", satz: "Jeder Auftrag folgt einem eigenen Skill.",
        teile: W.auftraege.map(function (a) { return teil("auftraege.html#" + a.id, a.name, "", a.quelle); }).join("") }
    ];
    liste.innerHTML = gruppen.filter(function (g) { return g.teile; }).map(function (g) {
      return '<li class="kf-werkzeug"><h3><a href="' + g.href + '">' + esc(g.name) + ' <span aria-hidden="true">→</span></a></h3>' +
        "<p>" + esc(g.satz) + '</p><ul class="kf-teile">' + g.teile + "</ul></li>";
    }).join("");
  }
})();
