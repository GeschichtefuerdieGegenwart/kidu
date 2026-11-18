/* Kidu – Vier Wochen KI-Training (ab Version 4.48, vier-wochen.html).
   Ohne Skript steht der ganze Plan da (»Diese Woche«, »Nächste Woche« …). Das Skript ergänzt zwei Dinge:
   1. Ein freiwilliges Startdatum: Dann steht an jeder Woche, ab wann sie gilt (»ab Montag, 23. November«).
   2. Haken »Erledigt« je Woche.
   Gespeichert werden nur Datum und Haken, unter »hilde.vierwochen« (die Fußzeile »Eingaben löschen« nimmt es mit).
   Was in den Feldern steht (»Mein Text« …), wird nie gespeichert – es steht nur auf dem Ausdruck. Keine Zählung, kein Balken. */
(function () {
  "use strict";
  var SCHLUESSEL = "hilde.vierwochen";
  var form = document.getElementById("vw-start"), feld = document.getElementById("vw-datum"), loeschen = document.getElementById("vw-loeschen");
  if (!form || !feld) return;
  var wann = [].slice.call(document.querySelectorAll(".vw-wann[data-woche]"));
  var linie = [].slice.call(document.querySelectorAll(".vw-linie-wann[data-woche]"));
  var ohne = wann.map(function (el) { return el.textContent; }), ohneLinie = linie.map(function (el) { return el.textContent; });
  var haken = [].slice.call(document.querySelectorAll("input[data-erledigt]"));

  function laden() { try { return JSON.parse(localStorage.getItem(SCHLUESSEL) || "{}") || {}; } catch (e) { return {}; } }
  function speichern(z) {
    try {
      if (!z.start && !Object.keys(z.erledigt || {}).length) localStorage.removeItem(SCHLUESSEL);
      else localStorage.setItem(SCHLUESSEL, JSON.stringify(z));
    } catch (e) { /* ohne Speicher geht es auch */ }
  }
  var z = laden();
  z.erledigt = z.erledigt || {};

  /* »2026-11-23« → Datum um 12 Uhr (keine Verschiebung durch die Zeitzone) */
  function datum(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null;
  }
  function text(d) { return d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" }); }

  function zeichne() {
    var start = datum(z.start);
    wann.forEach(function (el, i) {
      if (!start) { el.textContent = ohne[i]; return; }
      var d = new Date(start.getTime()); d.setDate(d.getDate() + 7 * (+el.getAttribute("data-woche")));
      el.textContent = "ab " + text(d);
    });
    linie.forEach(function (el, i) {
      if (!start) { el.textContent = ohneLinie[i]; return; }
      var d = new Date(start.getTime()); d.setDate(d.getDate() + 7 * (+el.getAttribute("data-woche")));
      el.textContent = "ab " + d.toLocaleDateString("de-DE", { day: "numeric", month: "long" });
    });
    haken.forEach(function (h) {
      h.checked = !!z.erledigt[h.getAttribute("data-erledigt")];
      h.closest(".vw-woche").classList.toggle("ist-erledigt", h.checked);
    });
    feld.value = z.start || "";
  }

  form.hidden = false;
  if (loeschen) loeschen.hidden = false;
  feld.addEventListener("change", function () {
    z.start = datum(feld.value) ? feld.value : "";
    speichern(z); zeichne();
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  haken.forEach(function (h) {
    h.addEventListener("change", function () {
      var id = h.getAttribute("data-erledigt");
      if (h.checked) z.erledigt[id] = true; else delete z.erledigt[id];
      speichern(z); zeichne();
    });
  });
  if (loeschen) loeschen.addEventListener("click", function () {
    z = { erledigt: {} };
    speichern(z);
    [].forEach.call(document.querySelectorAll(".vw-anlass"), function (f) { f.value = ""; });
    zeichne();
  });
  zeichne();
})();
