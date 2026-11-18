/* Kidu – Werkstatt Bewertungskultur (ab Version 4.48, bewertung.html; Daten: assets/daten/bewertung.js).
   Zwei Aufträge zum Kopieren, gebaut mit WERKSTATT_ANFRAGE.auftrag – gleiche fünf Teile wie die Schnell-Anfrage.
   Fach, Thema und Lerngruppe kommen aus dem Formular; fehlt etwas, fragt die KI zuerst danach. Nichts wird gespeichert.
   Braucht: BEWERTUNG, WERKSTATT_ANFRAGE, SCHNELL. */
(function () {
  "use strict";
  var B = window.BEWERTUNG, WA = window.WERKSTATT_ANFRAGE;
  var ziel = document.getElementById("bw-auftrag-liste");
  if (!B || !WA || !ziel) return;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function wert(id) { var f = document.getElementById(id); return f ? f.value : ""; }

  ziel.innerHTML = B.auftraege.map(function (a) {
    return '<div class="bw-auftrag"><h3>' + esc(a.name) + "</h3>" +
      '<label class="sr-only" for="a-' + a.id + '">' + esc(a.name) + " – du kannst den Auftrag ändern</label>" +
      '<textarea id="a-' + a.id + '" rows="12" spellcheck="false" data-bewertung="' + a.id + '"></textarea>' +
      '<div class="kopieren"><button type="button" class="knopf" data-kopieren="a-' + a.id + '">Auftrag kopieren</button>' +
      '<span class="leise" aria-live="polite"></span></div></div>';
  }).join("");

  function fuelle() {
    var e = { fach: wert("bw-fach"), thema: wert("bw-thema"), gruppe: wert("bw-gruppe") };
    B.auftraege.forEach(function (a) {
      var feld = document.getElementById("a-" + a.id);
      if (feld) feld.value = WA.auftrag(a, e);
    });
  }
  var form = document.getElementById("bw-form");
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
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge ihn in das KI-System deiner Schule ein."; }, selbst);
      else selbst();
    } catch (x) { selbst(); }
  });
})();
