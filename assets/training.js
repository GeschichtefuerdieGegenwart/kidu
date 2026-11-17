/* Kidu – Seite »Trainingsaufgaben« (ki-aufgaben.html, ab Version 4.46).
   Zeigt TRAINING (assets/daten/training.js): die Funktionen des KI-Systems »Auf einen Blick«, die Aufgaben nach Fähigkeiten,
   je mit Schritten, »Geschafft, wenn …«, Werkzeugen in Kidu und – falls vorhanden – einem Auftrag zum Kopieren.
   Fach, Thema und Lerngruppe gelten für alle Aufträge der Seite und werden nicht gespeichert.
   Braucht: HILDE, TRAINING, SCHNELL, SCHNELL_ANFRAGE, WERKSTATT_ANFRAGE. */
(function () {
  "use strict";
  if (typeof TRAINING === "undefined" || typeof HILDE === "undefined") return;
  var T = TRAINING, esc = HILDE.esc;
  var FN = {}; T.funktionen.forEach(function (f) { FN[f.id] = f; });

  function wert(id) { var f = document.getElementById(id); return f ? f.value : ""; }
  function eingabe() { return { fach: wert("tr-fach"), thema: wert("tr-thema"), gruppe: wert("tr-gruppe") }; }

  var blick = document.getElementById("tr-funktionen");
  if (blick) {
    blick.innerHTML = T.funktionen.map(function (f) {
      return "<li><b>" + esc(f.name) + "</b> " + esc(f.text) + "</li>";
    }).join("");
  }

  var nav = document.getElementById("tr-gruppen-nav");
  if (nav) {
    nav.innerHTML = T.gruppen.map(function (g) {
      var n = T.aufgaben.filter(function (a) { return a.gruppe === g.id; }).length;
      return '<li><a href="#tr-' + g.id + '"><b>' + esc(g.name) + "</b><span>" + n + (n === 1 ? " Aufgabe" : " Aufgaben") + "</span></a></li>";
    }).join("");
  }

  var nr = 0;
  function karte(a) {
    nr += 1;
    var f = FN[a.funktion];
    return '<li class="tr-karte" id="tr-' + a.id + '">' +
      '<p class="tr-zeile"><span class="tr-nr" aria-hidden="true">' + nr + "</span>" +
      '<span class="tr-funktion">' + (f ? esc(f.name) : "ohne KI") + "</span></p>" +
      "<h3>" + esc(a.name) + "</h3>" +
      '<p class="tr-ziel">' + esc(a.ziel) + "</p>" +
      '<ol class="tr-schritte">' + a.schritte.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
      '<p class="tr-geschafft"><b>Geschafft, wenn</b> ' + esc(a.geschafft) + "</p>" +
      (a.ki ? '<details class="mehr werkstatt-auftrag tr-auftrag"><summary>Auftrag ansehen und kopieren</summary>' +
        '<label class="sr-only" for="a-tr-' + a.id + '">Auftrag – du kannst ihn ändern</label>' +
        '<textarea id="a-tr-' + a.id + '" rows="14" spellcheck="false" data-training="' + a.id + '"></textarea>' +
        '<div class="kopieren"><button type="button" class="knopf" data-kopieren="a-tr-' + a.id + '">Auftrag kopieren</button>' +
        '<span class="leise" aria-live="polite"></span></div></details>' : "") +
      (a.dazu && a.dazu.length ? '<p class="klein tr-dazu"><b>Dazu in Kidu:</b> ' + a.dazu.map(function (x) {
        return '<a class="textlink" href="' + esc(x[0]) + '">' + esc(x[1]) + "</a>";
      }).join(" · ") + "</p>" : "") +
      "</li>";
  }

  var ziel = document.getElementById("tr-liste");
  if (ziel) {
    ziel.innerHTML = T.gruppen.map(function (g) {
      var liste = T.aufgaben.filter(function (a) { return a.gruppe === g.id; });
      return '<section class="tr-gruppe" id="tr-' + g.id + '" aria-labelledby="tr-t-' + g.id + '" tabindex="-1">' +
        '<div class="tr-gruppe-kopf"><h2 id="tr-t-' + g.id + '">' + esc(g.name) + "</h2><p>" + esc(g.frage) + "</p></div>" +
        '<ol class="tr-karten">' + liste.map(karte).join("") + "</ol></section>";
    }).join("");
  }

  function fuelle() {
    var e = eingabe();
    document.querySelectorAll("textarea[data-training]").forEach(function (feld) {
      var a = T.aufgaben.filter(function (x) { return x.id === feld.getAttribute("data-training"); })[0];
      if (a && a.ki) feld.value = WERKSTATT_ANFRAGE.auftrag(Object.assign({ id: "tr-" + a.id }, a.ki), e);
    });
  }
  var form = document.getElementById("tr-form");
  if (form) {
    form.addEventListener("input", fuelle);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }
  fuelle();

  document.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("[data-kopieren]"); if (!k) return;
    var feld = document.getElementById(k.getAttribute("data-kopieren"));
    var status = k.parentNode.querySelector("[aria-live]");
    if (!feld || !status) return;
    function selbst() { feld.focus(); feld.select(); status.textContent = "Der Text ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C)."; }
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge ihn in dein KI-System ein."; }, selbst);
      else selbst();
    } catch (x) { selbst(); }
  });

  if (location.hash && document.getElementById(location.hash.slice(1))) document.getElementById(location.hash.slice(1)).scrollIntoView();
})();
