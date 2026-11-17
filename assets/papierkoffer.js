/* Kidu – Aufgabenkoffer auf Papier (ab Version 4.46, KI-Training).
   Dieselben Ideen, Kniffe und Phasen wie der Aufgabenkoffer im Digitalen Unterricht – hier für Papier, Tafel und Raum.
   Daten: AUFGABEN (aufgaben.js: tun, papier, regel, sinn, wenig, ort) · KOFFER (koffer-ideen.js: Phasen, Kniffe, papierPhasen) ·
          WERKSTATT.muster (werkstatt.js: Kniffe mit »Auf Papier« und KI-Auftrag) · TAXONOMIEN.phasen (Namen und Hilfetexte).
   ordne(A, K, W, T)        die Stunde: vier Phasen mit Ideen (jede Idee steht einmal, in ihrer ersten Phase) und »In jeder Phase«.
   auftrag(a, k, eingabe)   ein kopierbarer Auftrag: Material auf Papier für eine Idee, mit den Kniffen dazu.
                            Gleiche fünf Teile wie die Schnell-Anfrage (SCHNELL_ANFRAGE.baue). Fehlt Fach, Thema oder Lerngruppe,
                            fragt die KI zuerst danach.
   kniffAuftrag(m, eingabe) der Auftrag eines Kniffs aus WERKSTATT.muster, unverändert.
   Keine KI-Anbindung, keine Anbieternamen: Es entsteht nur Text zum Kopieren. Freitexte werden nicht gespeichert.
   Tests: tests/papierkoffer.test.js */
(function (wurzel) {
  "use strict";
  var imKnoten = typeof module !== "undefined" && typeof require !== "undefined";
  var SA = imKnoten ? require("./schnell-anfrage.js") : wurzel.SCHNELL_ANFRAGE;
  var ORT = ["papier", "hybrid", "geraet"];

  function daten(A, K, W, T, S) {
    return {
      A: A || wurzel.AUFGABEN || (imKnoten && require("./daten/aufgaben.js")),
      K: K || wurzel.KOFFER || (imKnoten && require("./daten/koffer-ideen.js")),
      W: W || wurzel.WERKSTATT || (imKnoten && require("./daten/werkstatt.js")),
      T: T || wurzel.TAXONOMIEN || (imKnoten && require("./daten/taxonomien.js")),
      S: S || wurzel.SCHNELL || (imKnoten && require("./daten/schnell.js"))
    };
  }

  function phasenVon(id, K) {
    return (K.ideen[id] && K.ideen[id].phasen) || (K.papierPhasen && K.papierPhasen[id]) || [];
  }

  function kniffeVon(id, K, W) {
    return (K.kniffe[id] || []).map(function (kid) { return W.muster.filter(function (m) { return m.id === kid; })[0]; }).filter(Boolean);
  }

  function ordne(A, K, W, T) {
    var d = daten(A, K, W, T);
    var phasen = K ? K.phasen : d.K.phasen;
    var stunde = phasen.map(function (pid) {
      var p = d.T.phasen.filter(function (x) { return x.id === pid; })[0];
      var ideen = d.A.aufgaben.filter(function (a) { return phasenVon(a.id, d.K)[0] === pid; })
        .map(function (a, i) { return { a: a, i: i }; })
        .sort(function (x, y) { return ORT.indexOf(x.a.ort) - ORT.indexOf(y.a.ort) || x.i - y.i; })
        .map(function (x) {
          return { a: x.a, phasen: phasenVon(x.a.id, d.K), kniffe: kniffeVon(x.a.id, d.K, d.W), digital: !!d.K.ideen[x.a.id] };
        });
      return { id: pid, name: p.name, hilfe: p.hilfe, ideen: ideen };
    });
    var u = d.T.phasen.filter(function (x) { return x.id === "uebergreifend"; })[0];
    var jede = d.K.jedePhase.map(function (kid) { return d.W.muster.filter(function (m) { return m.id === kid; })[0]; }).filter(Boolean);
    return { phasen: stunde, jede: { id: "jede", name: u.name, hilfe: u.hilfe, kniffe: jede } };
  }

  function satz(t) { t = String(t || "").trim(); return /[.!?«]$/.test(t) ? t : t + "."; }

  function auftrag(a, k, eingabe, quellen) {
    if (!a) return "";
    var d = daten(quellen && quellen.A, quellen && quellen.K, quellen && quellen.W, quellen && quellen.T, quellen && quellen.S);
    k = k || { kniffe: kniffeVon(a.id, d.K, d.W), phasen: phasenVon(a.id, d.K) };
    eingabe = eingabe || {};
    var phase = k.phasen && k.phasen[0] ? d.T.phasen.filter(function (p) { return p.id === k.phasen[0]; })[0] : null;
    var anforderungen = [
      "So geht es auf Papier: " + satz(a.papier),
      "Faustregel: " + satz(a.regel)
    ];
    (k.kniffe || []).forEach(function (m) { anforderungen.push("Nutze den Kniff »" + m.name + "«: " + satz(m.papier)); });
    anforderungen.push("Gut geeignet: " + a.sinn.join("; ") + ".");
    anforderungen.push("Wenig sinnvoll: " + a.wenig.join("; ") + ". Richte das Material danach aus.");
    anforderungen.push("Die Lernenden arbeiten zuerst allein und ohne Gerät. Sie schreiben von Hand.");
    anforderungen.push("Kurze Sätze, Arbeitsaufträge mit einem klaren Verb, Anrede »du«.");
    anforderungen.push("Das Material passt auf höchstens zwei Seiten A4 und lässt Platz zum Schreiben.");
    var def = {
      id: "pk-" + a.id,
      ziel: "Bereite Material auf Papier für die Aufgabenform »" + a.name + "« vor" +
        (phase ? ", für die Phase »" + phase.name + "«" : "") + ". " + satz(a.tun),
      anforderungen: anforderungen,
      format: "Zuerst das Material zum Ausdrucken, mit allen Arbeitsaufträgen im Wortlaut. Darunter für mich: der Ablauf in drei bis fünf Schritten mit Minuten, eine Frage für das Gespräch im Raum und eine Lösung oder ein Erwartungshorizont.",
      pruef: [
        "Tun die Lernenden selbst, was die Aufgabenform verlangt – oder schreiben sie nur ab?",
        "Ist jeder Auftrag ohne Rückfrage verständlich?",
        "Stimmen die Fachinhalte? Kennzeichne, was ich nachprüfen sollte."
      ],
      material: false
    };
    return SA.baue({ anlass: def.id, fach: eingabe.fach, thema: eingabe.thema, gruppe: eingabe.gruppe },
      { anlaesse: [def], immer: (d.S && d.S.immer) || [] });
  }

  function kniffAuftrag(m, eingabe, S) {
    if (!m || !m.ki) return "";
    var d = daten(null, null, null, null, S);
    eingabe = eingabe || {};
    var def = Object.assign({ id: m.id }, m.ki);
    return SA.baue({ anlass: m.id, fach: eingabe.fach, thema: eingabe.thema, gruppe: eingabe.gruppe },
      { anlaesse: [def], immer: (d.S && d.S.immer) || [] });
  }

  var api = { ordne: ordne, auftrag: auftrag, kniffAuftrag: kniffAuftrag };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.PAPIERKOFFER = api;

  /* ---------- Seite papierkoffer.html ---------- */
  if (typeof document === "undefined") return;
  var ziel = document.getElementById("pk-phasen");
  if (!ziel || typeof HILDE === "undefined") return;
  var esc = HILDE.esc;
  var stunde = ordne();
  var d = daten();
  var ORTNAME = d.A.orte;

  function wert(id) { var f = document.getElementById(id); return f ? f.value : ""; }
  function eingabe() { return { fach: wert("pk-fach"), thema: wert("pk-thema"), gruppe: wert("pk-gruppe") }; }
  function feld(id, titel) {
    return '<details class="mehr werkstatt-auftrag pk-auftrag"><summary>' + esc(titel) + "</summary>" +
      '<label class="sr-only" for="a-' + id + '">Auftrag – du kannst ihn ändern</label>' +
      '<textarea id="a-' + id + '" rows="14" spellcheck="false" data-pk="' + id + '"></textarea>' +
      '<div class="kopieren"><button type="button" class="knopf" data-kopieren="a-' + id + '">Auftrag kopieren</button>' +
      '<span class="leise" aria-live="polite"></span></div></details>';
  }
  function phasenName(id) { return stunde.phasen.filter(function (p) { return p.id === id; })[0].name; }

  function karte(x) {
    var a = x.a;
    var weitere = x.phasen.slice(1).map(phasenName);
    return '<li class="pk-karte" id="pk-' + a.id + '">' +
      '<p class="pk-ort" data-ort="' + a.ort + '">' + esc(ORTNAME[a.ort]) + "</p>" +
      "<h3>" + esc(a.name) + "</h3>" +
      '<p class="pk-tun">' + esc(a.tun) + "</p>" +
      '<p class="pk-papier"><b>Auf Papier:</b> ' + esc(a.papier) + "</p>" +
      '<p class="pk-regel"><b>Faustregel:</b> ' + esc(a.regel) + "</p>" +
      x.kniffe.map(function (m) {
        return '<p class="pk-kniff"><b>Kniff dazu: ' + esc(m.name) + ".</b> " + esc(m.papier) + "</p>";
      }).join("") +
      (weitere.length ? '<p class="leise klein">Passt auch: ' + esc(weitere.join(", ")) + "</p>" : "") +
      feld("pk-" + a.id, "KI-Auftrag für das Material") +
      '<p class="klein pk-geraet">' + (x.digital
        ? '<a class="textlink" href="aufgabenkoffer.html#k-' + esc(a.id) + '">Dieselbe Idee am Gerät <span aria-hidden="true">→</span></a>'
        : "Das Gerät trägt hier kaum etwas bei.") + "</p>" +
      "</li>";
  }

  function kniffKarte(m) {
    return '<li class="pk-karte pk-kniffkarte" id="pk-' + m.id + '">' +
      '<p class="pk-ort">Kniff aus der Praxis</p>' +
      "<h3>" + esc(m.name) + "</h3>" +
      '<p class="pk-tun">' + esc(m.tun) + "</p>" +
      '<p class="pk-papier"><b>Auf Papier:</b> ' + esc(m.papier) + "</p>" +
      '<p class="pk-regel"><b>Warum es trägt:</b> ' + esc(m.warum) + "</p>" +
      feld("pk-" + m.id, "KI-Auftrag für das Material") +
      '<p class="klein pk-geraet"><a class="textlink" href="aufgabenkoffer.html#kn-' + esc(m.id) + '">Derselbe Kniff am Gerät <span aria-hidden="true">→</span></a></p>' +
      "</li>";
  }

  var linie = document.getElementById("pk-linie");
  if (linie) {
    linie.innerHTML = stunde.phasen.map(function (p) {
      return '<li><a href="#pk-' + p.id + '"><b>' + esc(p.name) + "</b><span>" + p.ideen.length + (p.ideen.length === 1 ? " Idee" : " Ideen") + "</span></a></li>";
    }).join("") +
      '<li class="pk-jede"><a href="#pk-jede"><b>' + esc(stunde.jede.name) + "</b><span>" + stunde.jede.kniffe.length + " Kniffe</span></a></li>";
  }

  ziel.innerHTML = stunde.phasen.map(function (p) {
    return '<section class="pk-phase" id="pk-' + p.id + '" aria-labelledby="pk-t-' + p.id + '" tabindex="-1">' +
      '<div class="pk-phase-kopf"><h2 id="pk-t-' + p.id + '">' + esc(p.name) + "</h2><p>" + esc(p.hilfe) + "</p></div>" +
      '<ul class="pk-karten">' + p.ideen.map(karte).join("") + "</ul></section>";
  }).join("") +
    '<section class="pk-phase pk-phase-jede" id="pk-jede" aria-labelledby="pk-t-jede" tabindex="-1">' +
    '<div class="pk-phase-kopf"><h2 id="pk-t-jede">' + esc(stunde.jede.name) + "</h2><p>" + esc(stunde.jede.hilfe) + "</p></div>" +
    '<ul class="pk-karten">' + stunde.jede.kniffe.map(kniffKarte).join("") + "</ul></section>";

  var alle = {};
  stunde.phasen.forEach(function (p) { p.ideen.forEach(function (x) { alle["pk-" + x.a.id] = function (e) { return auftrag(x.a, x, e); }; }); });
  stunde.jede.kniffe.forEach(function (m) { alle["pk-" + m.id] = function (e) { return kniffAuftrag(m, e); }; });

  function fuelle() {
    var e = eingabe();
    ziel.querySelectorAll("textarea[data-pk]").forEach(function (f) {
      var bau = alle[f.getAttribute("data-pk")];
      if (bau) f.value = bau(e);
    });
  }
  var form = document.getElementById("pk-form");
  if (form) {
    form.addEventListener("input", fuelle);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }
  fuelle();

  document.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("[data-kopieren]"); if (!k) return;
    var f = document.getElementById(k.getAttribute("data-kopieren"));
    var status = k.parentNode.querySelector("[aria-live]");
    if (!f || !status) return;
    function selbst() { f.focus(); f.select(); status.textContent = "Der Text ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C)."; }
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(f.value).then(function () { status.textContent = "Kopiert. Füge ihn in dein KI-System ein."; }, selbst);
      else selbst();
    } catch (x) { selbst(); }
  });

  /* Ein Sprung zu einer Idee (#pk-<id>) öffnet ihren Auftrag nicht – er zeigt nur die Karte. */
  if (location.hash && document.getElementById(location.hash.slice(1))) {
    document.getElementById(location.hash.slice(1)).scrollIntoView();
  }
})(typeof window !== "undefined" ? window : globalThis);
