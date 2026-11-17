/* Kidu – Papierfrage »Geht es auf Papier genauso gut?« (ab 4.46 eigene Seite papierfrage.html, vorher auf der Bereichsseite).
   1. Eine Stelle prüfen: Regeln und Tests in assets/regeln.js (REGELN.papierprobe). Nichts wird gespeichert.
      Ab 4.46: Wer »Ja« sagt, wählt das Prinzip (assets/daten/prinzipien.js); das Ergebnis schreibt den Satz zum Vorteil
      und zeigt »So trägt es« – höchstens drei Hinweise aus erprobtem Unterricht.
   2. Die ganze Stunde prüfen: der Auftrag zum Kopieren aus assets/papierfrage-prompt.js (PAPIERPROMPT). Freitexte werden nie gespeichert.
   Braucht: TAXONOMIEN, PRINZIPIEN, REGELN, HILDE; für 2. KURZFASSUNGEN und PAPIERPROMPT. */
(function () {
  "use strict";
  var esc = HILDE.esc;
  var namen = {};
  TAXONOMIEN.einstufungen.forEach(function (e) { namen[e.id] = e.name; });

  /* »Auf einen Blick«: die Namen der vier Einstufungen aus taxonomien.js (eine Quelle) */
  Array.prototype.forEach.call(document.querySelectorAll("[data-einstufung]"), function (el) {
    var n = namen[el.getAttribute("data-einstufung")]; if (n) el.textContent = n;
  });

  /* 1. Eine Stelle prüfen */
  var form = document.getElementById("probe"), aus = document.getElementById("probe-ergebnis");
  if (form && aus && typeof REGELN !== "undefined") {
    var P = typeof PRINZIPIEN !== "undefined" ? PRINZIPIEN : [];
    var kannSatz = {}; P.forEach(function (p) { kannSatz[p.id] = p.kann; });
    var satzZiel = document.getElementById("pf-prinzip-satz"), satzStart = satzZiel ? satzZiel.innerHTML : "";
    var FOLGE = { ablage: "Beantworte noch die zweite Frage.", prinzip: "Wähl noch, was das Gerät dabei tut.",
      ziel: "Beantworte noch die dritte Frage.", neu: "Beantworte die erste Frage.",
      klaeren: "Klär zuerst in einem Satz, was die Lernenden dabei selbst denken oder tun sollen. Dann hilft dir der Planungsweg weiter. Unsicher sein heißt nicht: Papier." };
    var wert = function (n) { var e = form.querySelector('input[name="' + n + '"]:checked'); return e ? e.value : ""; };
    var zeigen = function () {
      var a = { neu: wert("neu"), ablage: wert("ablage"), prinzip: wert("prinzip"), ziel: wert("ziel"), lesen: wert("lesen"), teilhabe: wert("teilhabe") };
      form.querySelector('[data-frage="ablage"]').hidden = a.neu !== "nein";
      form.querySelector('[data-frage="prinzip"]').hidden = a.neu !== "ja";
      form.querySelector('[data-frage="ziel"]').hidden = a.neu !== "ja" || !a.prinzip;
      if (a.neu !== "nein") a.ablage = "";
      if (a.neu !== "ja") { a.prinzip = ""; a.ziel = ""; }
      if (!a.prinzip) a.ziel = "";
      if (satzZiel) satzZiel.innerHTML = kannSatz[a.prinzip] ? "<b>" + esc(kannSatz[a.prinzip]) + "</b>" : satzStart;
      var e = REGELN.papierprobe(a, P);
      aus.className = "probe-ergebnis" + (e.id ? " stufe-" + e.id : "");
      if (!e.id) { aus.innerHTML = '<p class="probe-name">Noch offen</p><p>' + esc(FOLGE[e.frage]) + "</p>"; return; }
      var teile = ['<p class="probe-name">' + esc(namen[e.id]) + "</p>", "<p>" + esc(e.grund) + "</p>"];
      if (e.satz) teile.push('<p class="pf-satz"><b>Dein Satz zum Vorteil:</b> »' + esc(e.satz) + "«</p>");
      if (e.eigenerSatz) teile.push('<p class="pf-satz">' + esc(e.eigenerSatz) + "</p>");
      if (e.hinweise && e.hinweise.length) {
        teile.push('<div class="pf-traegt"><p><b>So trägt es</b></p><ul>' + e.hinweise.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></div>");
      }
      if (e.teilhabe) teile.push('<p class="probe-zusatz probe-teilhabe"><b>Für alle?</b> ' + esc(e.teilhabe) + "</p>");
      if (e.lesen) teile.push('<p class="probe-zusatz probe-lesen"><b>Zum Lesen:</b> ' + esc(e.lesen) + "</p>");
      if (e.id === "klar" || e.id === "anpassung") {
        teile.push('<p class="probe-zusatz probe-weiter"><b>Weiter:</b> <a class="textlink" href="tablets.html">Unterricht neu planen</a> oder <a class="textlink" href="digitalisieren.html">Bisherigen Unterricht digitalisieren</a></p>');
      }
      aus.innerHTML = teile.join("");
    };
    form.addEventListener("change", zeigen);
    form.addEventListener("reset", function () { setTimeout(zeigen, 0); });
    zeigen();
  }

  /* 2. Die ganze Stunde prüfen – Auftrag zum Kopieren */
  var feld = document.getElementById("pf-prompt"), felder = document.getElementById("pf-felder");
  if (feld && typeof PAPIERPROMPT !== "undefined") {
    var w = function (id) { var f = document.getElementById(id); return f ? f.value : ""; };
    var fuelle = function () { feld.value = PAPIERPROMPT.baue({ fach: w("pf-fach"), thema: w("pf-thema"), gruppe: w("pf-gruppe") }); };
    if (felder) {
      felder.addEventListener("input", fuelle);
      felder.addEventListener("submit", function (e) { e.preventDefault(); });
    }
    fuelle();
    document.addEventListener("click", function (e) {
      var k = e.target.closest && e.target.closest('[data-kopieren="pf-prompt"]'); if (!k) return;
      var status = k.parentNode.querySelector("[aria-live]");
      function selbst() { feld.focus(); feld.select(); status.textContent = "Der Text ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C)."; }
      try {
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge ihn in dein KI-System ein."; }, selbst);
        else selbst();
      } catch (err) { selbst(); }
    });
  }
})();
