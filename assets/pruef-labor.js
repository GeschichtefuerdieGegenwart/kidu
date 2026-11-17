/* Kidu – Prüf-Labor (ab Version 4.47, Seite pruef-labor.html; Daten: assets/daten/pruef-labor.js).
   Drei Übungen ohne KI-System. Erst legst du dich fest, dann kommt die Auflösung (»Erst denken, dann zeigen«).
   Die Rückmeldung steht in Worten bei jedem Satz und jeder Aufgabe – keine Punkte, keine Zählung, kein Lob.
   Gespeichert wird nur, was du antippst (Markierungen, gewählte Wege), unter »hilde.prueflabor« (die Fußzeile »Eingaben löschen« nimmt es mit); nie ein Freitext.
   »Eingaben löschen« setzt alles zurück. Nichts bewegt sich von selbst. Braucht: PRUEFLABOR. */
(function () {
  "use strict";
  var P = window.PRUEFLABOR;
  if (!P || !document.getElementById("pl-saetze")) return;
  var SCHLUESSEL = "hilde.prueflabor";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function laden() {
    try { return JSON.parse(localStorage.getItem(SCHLUESSEL) || "{}") || {}; } catch (e) { return {}; }
  }
  var stand = laden();
  function auffuellen() {
    stand.markiert = stand.markiert || {};
    stand.wahl = stand.wahl || {};
    stand.aufgeloest = !!stand.aufgeloest;
  }
  auffuellen();
  function speichern() {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(stand)); } catch (e) { /* ohne Speicher geht es auch */ }
  }
  var ansage = document.getElementById("pl-ansage");
  function sage(text) { if (ansage) ansage.textContent = text; }

  // ---------------------------------------------------------------- Übung 1: Fehler finden
  var liste = document.getElementById("pl-saetze");
  var knopfAuf = document.getElementById("pl-aufloesen");
  var knopfNeu = document.getElementById("pl-neu");
  var schritte = document.getElementById("pl-schritte");

  function urteil(s) {
    var an = !!stand.markiert[s.id];
    var kopf = s.fehler ? "Fehler: " + s.fehler : "Stimmt";
    var du = an ? (s.fehler ? "Du hast den Satz markiert." : "Du hast den Satz markiert – er stimmt aber.")
      : "Du hast den Satz nicht markiert.";
    return '<p class="pl-urteil ' + (s.fehler ? "ist-fehler" : "ist-ok") + '"><b>' + esc(kopf) + ".</b> " +
      '<span class="pl-du">' + esc(du) + "</span> " + esc(s.warum) + "</p>";
  }
  function zeichneSaetze() {
    var auf = stand.aufgeloest;
    liste.innerHTML = P.fehler.saetze.map(function (s) {
      var an = !!stand.markiert[s.id];
      var satz = auf
        ? '<p class="pl-satz-text">' + esc(s.text) + "</p>" + urteil(s)
        : '<button type="button" class="pl-satz-knopf" data-satz="' + s.id + '" aria-pressed="' + (an ? "true" : "false") + '">' +
          '<span class="pl-satz-zeichen" aria-hidden="true"></span><span>' + esc(s.text) + "</span></button>";
      return '<li class="pl-satz' + (an ? " ist-markiert" : "") + (auf ? " ist-aufgeloest" : "") + '">' + satz + "</li>";
    }).join("");
    knopfAuf.hidden = auf;
    knopfNeu.hidden = !auf;
    schritte.hidden = !auf;
  }
  liste.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("[data-satz]");
    if (!k || stand.aufgeloest) return;
    var id = k.getAttribute("data-satz");
    stand.markiert[id] = !stand.markiert[id];
    if (!stand.markiert[id]) delete stand.markiert[id];
    speichern();
    var an = !!stand.markiert[id];
    k.setAttribute("aria-pressed", an ? "true" : "false");
    k.parentNode.classList.toggle("ist-markiert", an);
  });
  knopfAuf.addEventListener("click", function () {
    stand.aufgeloest = true;
    speichern();
    zeichneSaetze();
    sage("Aufgelöst. Bei jedem Satz steht jetzt, ob er stimmt und warum.");
    var erster = liste.querySelector(".pl-urteil");
    if (erster) erster.scrollIntoView({ block: "nearest" });
  });
  knopfNeu.addEventListener("click", function () {
    stand.aufgeloest = false;
    stand.markiert = {};
    speichern();
    zeichneSaetze();
    sage("Neu angefangen. Alle Markierungen sind weg.");
    var k = liste.querySelector("[data-satz]");
    if (k) k.focus();
  });
  if (schritte) {
    schritte.querySelector("ol").innerHTML = P.fehler.pruefschritte.map(function (x) {
      return "<li><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></li>";
    }).join("");
  }

  // ---------------------------------------------------------------- Übungen 2 und 3: wählen, dann der Vorschlag
  function name(wahlen, id) {
    var w = wahlen.filter(function (x) { return x.id === id; })[0];
    return w ? w.name : "";
  }
  function vorschlag(art, eintrag) {
    var wahlen = art === "abgeben" ? P.wege : P.ampel;
    var gewaehlt = stand.wahl[eintrag.id];
    if (!gewaehlt) return "";
    return '<div class="pl-vorschlag pl-' + eintrag.vorschlag + '"><p><span class="pl-du">Du: ' + esc(name(wahlen, gewaehlt)) + ".</span> " +
      "<b>Vorschlag von Kidu: " + esc(name(wahlen, eintrag.vorschlag)) + ".</b> " + esc(eintrag.warum) + "</p>" +
      (eintrag.fassung ? '<p class="pl-fassung"><b>So geht es datensparsam:</b> ' + esc(eintrag.fassung) + "</p>" : "") + "</div>";
  }
  function zeichneWahl(art) {
    var ziel = document.getElementById("pl-" + art + "-liste");
    if (!ziel) return;
    var wahlen = art === "abgeben" ? P.wege : P.ampel;
    var eintraege = P[art];
    ziel.innerHTML = eintraege.map(function (x, i) {
      var text = art === "abgeben" ? x.aufgabe : x.angabe;
      return '<li class="pl-wahl" id="pl-' + x.id + '"><fieldset><legend><span class="pl-wahl-nr" aria-hidden="true">' + (i + 1) + "</span>" + esc(text) + "</legend>" +
        '<div class="pl-optionen">' + wahlen.map(function (w) {
          var an = stand.wahl[x.id] === w.id;
          return '<label class="pl-option pl-' + w.id + '"><input type="radio" name="pl-' + x.id + '" value="' + w.id + '"' + (an ? " checked" : "") + ">" +
            "<span>" + esc(w.name) + "</span></label>";
        }).join("") + "</div>" +
        '<div class="pl-antwort" aria-live="polite">' + vorschlag(art, x) + "</div></fieldset></li>";
    }).join("");
  }
  function verbinde(art) {
    var ziel = document.getElementById("pl-" + art + "-liste");
    if (!ziel) return;
    ziel.addEventListener("change", function (e) {
      var r = e.target;
      if (!r || r.type !== "radio") return;
      var id = r.name.slice(3);
      stand.wahl[id] = r.value;
      speichern();
      var eintrag = P[art].filter(function (x) { return x.id === id; })[0];
      var feld = document.getElementById("pl-" + id).querySelector(".pl-antwort");
      if (eintrag && feld) feld.innerHTML = vorschlag(art, eintrag);
    });
  }

  // ---------------------------------------------------------------- Druck: die Lösungen als eigene Seite
  function loesungen() {
    var ziel = document.getElementById("pl-loesungen");
    if (!ziel) return;
    ziel.innerHTML = '<h2>Auflösung</h2><h3>Übung 1: Fehler finden</h3><ol>' + P.fehler.saetze.map(function (s) {
      return "<li><b>" + (s.fehler ? "Fehler: " + esc(s.fehler) : "Stimmt") + ".</b> " + esc(s.warum) + "</li>";
    }).join("") + "</ol><h3>Übung 2: Abgeben oder selbst machen</h3><ol>" + P.abgeben.map(function (x) {
      return "<li><b>" + esc(name(P.wege, x.vorschlag)) + ".</b> " + esc(x.warum) + "</li>";
    }).join("") + "</ol><h3>Übung 3: Was darf hinein?</h3><ol>" + P.hinein.map(function (x) {
      return "<li><b>" + esc(name(P.ampel, x.vorschlag)) + ".</b> " + esc(x.warum) + (x.fassung ? " " + esc(x.fassung) : "") + "</li>";
    }).join("") + "</ol>";
  }

  var loeschen = document.getElementById("pl-loeschen");
  if (loeschen) loeschen.addEventListener("click", function () {
    try { localStorage.removeItem(SCHLUESSEL); } catch (e) { /* ohne Speicher */ }
    stand = {};
    auffuellen();
    zeichneSaetze(); zeichneWahl("abgeben"); zeichneWahl("hinein");
    sage("Eingaben gelöscht.");
  });

  zeichneSaetze();
  zeichneWahl("abgeben");
  zeichneWahl("hinein");
  verbinde("abgeben");
  verbinde("hinein");
  loesungen();
})();
