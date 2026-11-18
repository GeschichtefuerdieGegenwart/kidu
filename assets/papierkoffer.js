/* Kidu – Aufgabenkoffer auf Papier (ab Version 4.46, KI-Training · Phase »Analogen Unterricht mit KI vorbereiten«).
   Ab 4.49, Variante C (Auftrag Mario 17.11.2026): das Arbeitsblatt als Bild. In der Mitte steht ein gezeichnetes Blatt (SVG,
   dekorativ) mit sechs Stellen (KOFFER.papierStellen) von oben nach unten; jede Stelle hat am Blatt einen Stanzloch-Punkt in Ocker
   mit Nummer und daneben eine Beschriftung (Name, Zahl der Aufträge) – alles Text als HTML neben dem Bild. Ein Tippen auf eine Stelle
   hebt ihren Bereich hervor (Ocker-zart) und öffnet daneben (ab 1060 px) bzw. darunter das Feld mit ihren Aufträgen. Pfeiltasten
   wechseln die Stelle. Unter 768 px wird das Blatt kleiner und die Stellen stehen als nummerierte Liste darunter – dort die Bedienung.
   Jeder Auftrag: Titel, ein Satz (Feld »tun«), »Auftrag kopieren« (Rückfall: Text markieren), dahinter »Auftrag an die KI ansehen« und
   »Mehr zur Idee«. Adresse: #stelle=<id> (Zurück und Teilen); #pk-<id> öffnet die Stelle eines Eintrags und zeigt ihn.
   Beim ersten Besuch je Sitzung legt sich das Blatt einmal auf die Platte (--dauer-register, nie bei »weniger Bewegung«).
   Ohne JavaScript: tools/papierkoffer.py setzt beim Bauen PAPIERKOFFER.html() ein – alle Stellen mit ihren Aufträgen untereinander.
   Daten: AUFGABEN (aufgaben.js) · KOFFER (koffer-ideen.js: papierStellen, Kniffe, Phasen) · WERKSTATT.muster (werkstatt.js) ·
          TAXONOMIEN.phasen (Namen) · SCHNELL (schnell.js).
   stellen(q)               die sechs Stellen mit ihren Einträgen (Idee oder Kniff). Ein Kniff, der an derselben Stelle schon als
                            eigener Eintrag oder bei einer früheren Idee steht, kommt in »Mehr zur Idee« nur mit Namen und Verweis
                            (Dopplungen D1–D4 in docs/koffer-zuordnung.md). Die Aufträge bleiben davon unberührt.
   auftrag(a, k, eingabe)   unverändert seit 4.46: Material auf Papier für eine Idee, mit den Kniffen dazu; fünf Teile wie die
                            Schnell-Anfrage (SCHNELL_ANFRAGE.baue). Fehlt Fach, Thema oder Lerngruppe, fragt die KI zuerst danach.
   kniffAuftrag(m, eingabe) unverändert: der Auftrag eines Kniffs aus WERKSTATT.muster.
   html(q)                  { blatt, listen }: Blatt mit Stellen und alle Listen als HTML, ohne Skript gültig (für den Bau).
   Keine KI-Anbindung, keine Anbieternamen: Es entsteht nur Text zum Kopieren. Freitexte werden nicht gespeichert.
   Tests: tests/papierkoffer.test.js */
(function (wurzel) {
  "use strict";
  var imKnoten = typeof module !== "undefined" && typeof require !== "undefined";
  var SA = imKnoten ? require("./schnell-anfrage.js") : wurzel.SCHNELL_ANFRAGE;
  var DATEN_HINWEIS = "Keine Namen, Noten oder anderen personenbezogenen Daten eingeben.";
  var PRUEF = [
    "Tun die Lernenden selbst, was die Aufgabenform verlangt – oder schreiben sie nur ab?",
    "Ist jeder Auftrag ohne Rückfrage verständlich?",
    "Stimmen die Fachinhalte? Kennzeichne, was ich nachprüfen sollte."
  ];

  function daten(A, K, W, T, S) {
    return {
      A: A || wurzel.AUFGABEN || (imKnoten && require("./daten/aufgaben.js")),
      K: K || wurzel.KOFFER || (imKnoten && require("./daten/koffer-ideen.js")),
      W: W || wurzel.WERKSTATT || (imKnoten && require("./daten/werkstatt.js")),
      T: T || wurzel.TAXONOMIEN || (imKnoten && require("./daten/taxonomien.js")),
      S: S || wurzel.SCHNELL || (imKnoten && require("./daten/schnell.js"))
    };
  }
  function finde(liste, id) { return liste.filter(function (x) { return x.id === id; })[0]; }
  function phasenVon(id, K) {
    return (K.ideen[id] && K.ideen[id].phasen) || (K.papierPhasen && K.papierPhasen[id]) || [];
  }
  function kniffeVon(id, K, W) {
    return (K.kniffe[id] || []).map(function (kid) { return finde(W.muster, kid); }).filter(Boolean);
  }

  /* Die sechs Stellen auf dem Blatt (ab 4.49, Variante C). Jeder Eintrag: { art: "idee"|"kniff", id, a|m, phasen, kniffe, digital }.
     kniffe je Idee: { m, schon } – schon ist null (ganz zeigen), { eintrag: true } (eigener Eintrag an dieser Stelle)
     oder { bei: a } (steht ausführlich bei der früheren Idee a an derselben Stelle). */
  function stellen(q) {
    q = q || {};
    var d = daten(q.A, q.K, q.W, q.T, q.S);
    return d.K.papierStellen.map(function (st) {
      var hier = {};
      st.eintraege.forEach(function (id) { if (!finde(d.A.aufgaben, id)) hier[id] = { eintrag: true }; });
      var eintraege = st.eintraege.map(function (id) {
        var a = finde(d.A.aufgaben, id);
        if (a) {
          var kn = kniffeVon(id, d.K, d.W).map(function (m) {
            var schon = hier[m.id] || null;
            if (!schon) hier[m.id] = { bei: a };
            return { m: m, schon: schon };
          });
          return { art: "idee", id: id, a: a, phasen: phasenVon(id, d.K), kniffe: kn, digital: !!d.K.ideen[id] };
        }
        var m = finde(d.W.muster, id);
        return { art: "kniff", id: id, m: m, phasen: d.K.jedePhase.indexOf(id) > -1 ? ["uebergreifend"] : [m.phase] };
      });
      return { id: st.id, nr: st.nr, name: st.name, satz: st.satz, seite: st.seite, x: st.x, y: st.y, eintraege: eintraege };
    });
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
      pruef: PRUEF.slice(),
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

  /* Auftrag eines Eintrags – für die Idee mit allen ihren Kniffen (unverändert), für den Kniff sein eigener. */
  function auftragVon(e, eingabe, q) {
    if (e.art === "kniff") return kniffAuftrag(e.m, eingabe, q && q.S);
    return auftrag(e.a, { kniffe: e.kniffe.map(function (k) { return k.m; }), phasen: e.phasen }, eingabe, q);
  }

  /* ---------- Das Blatt (ab 4.49, Variante C): A4 hochkant, selbst gezeichnet, dekorativ (aria-hidden) ----------
     Papierfläche (--blatt) mit Stanzlöchern, Rasterpunkte als Platzhalter für Text, unten die Falz zum Umknicken und rechts unten die
     umgeknickte Ecke (Rückseite, Karton). Die Bereiche .pkc-r-<id> liegen zart hinter dem Inhalt; die gewählte Stelle hebt CSS hervor.
     Kein Text im Bild – Nummern und Namen stehen als HTML daneben. */
  var BLATT = '<svg class="pkc-svg" viewBox="0 0 210 297" aria-hidden="true" focusable="false">' +
    '<path class="pkc-papier" d="M1 1H209V266L177 296H1Z"/>' +
    '<rect class="pkc-r pkc-r-kopf" x="16" y="9" width="187" height="45" rx="2"/>' +
    '<rect class="pkc-r pkc-r-infotext" x="16" y="60" width="187" height="64" rx="2"/>' +
    '<rect class="pkc-r pkc-r-aufgaben" x="16" y="130" width="136" height="88" rx="2"/>' +
    '<rect class="pkc-r pkc-r-hilfe" x="156" y="130" width="47" height="88" rx="2"/>' +
    '<rect class="pkc-r pkc-r-loesung" x="16" y="228" width="155" height="33" rx="2"/>' +
    '<path class="pkc-r pkc-r-rueckseite" d="M177 266H209L177 296Z"/>' +
    '<circle class="pkc-loch" cx="8.5" cy="108" r="4.2"/><circle class="pkc-loch" cx="8.5" cy="189" r="4.2"/>' +
    '<rect class="pkc-t" x="26" y="16" width="90" height="9" rx="2"/><path class="pkc-pt" d="M26 37H118M26 46H98"/>' +
    '<rect class="pkc-kasten" x="140" y="15" width="56" height="33" rx="2"/><path class="pkc-pt" d="M148 37H188"/>' +
    '<path class="pkc-pt" d="M26 70H136M26 80H136M26 90H136M26 100H136M26 110H110"/>' +
    '<rect class="pkc-bild" x="146" y="67" width="50" height="45" rx="2"/><path class="pkc-pt" d="M153 89H189"/>' +
    '<rect class="pkc-t" x="26" y="138" width="8" height="8" rx="1"/><path class="pkc-pt" d="M41 142H144M41 152H122"/>' +
    '<rect class="pkc-t" x="26" y="166" width="8" height="8" rx="1"/><path class="pkc-pt" d="M41 170H144M41 180H116"/>' +
    '<rect class="pkc-t" x="26" y="194" width="8" height="8" rx="1"/><path class="pkc-pt" d="M41 198H144M41 208H128"/>' +
    '<rect class="pkc-karte" x="161" y="136" width="37" height="34" rx="2"/><path class="pkc-pt" d="M167 148H192M167 158H186"/>' +
    '<rect class="pkc-karte-o" x="161" y="178" width="37" height="34" rx="2"/><path class="pkc-pt" d="M167 190H192M167 200H184"/>' +
    '<path class="pkc-falz" d="M16 224H203"/>' +
    '<rect class="pkc-kasten" x="26" y="234" width="8" height="8" rx="1"/><path class="pkc-pt" d="M41 238H118"/>' +
    '<rect class="pkc-kasten" x="26" y="248" width="8" height="8" rx="1"/><path class="pkc-pt" d="M41 252H106"/>' +
    '<rect class="pkc-o" x="132" y="233" width="34" height="23" rx="2"/>' +
    '<path class="pkc-ecke" d="M177 266H209L177 296Z"/><path class="pkc-pt" d="M182 274H196"/>' +
    '<path class="pkc-umriss" d="M1 1H209V266L177 296H1Z"/>' +
    "</svg>";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function zahl(n) { return n + (n === 1 ? " Auftrag" : " Aufträge"); }
  function gross(t) { t = String(t || ""); return t.charAt(0).toUpperCase() + t.slice(1); }

  /* Das Blatt mit den sechs Stellen. Ohne Skript sind die Beschriftungen Sprünge zur Liste; assets/papierkoffer.js macht daraus
     Schaltflächen mit aria-expanded und aria-controls. Lage der Markierung als --x und --y (Anteil von Breite und Höhe des Blatts). */
  function blattHtml(liste) {
    var lage = function (st) { return ' style="--x:' + st.x + ";--y:" + st.y + '"'; };
    return '<div class="pkc-buehne" id="pkc-buehne" data-stelle="">' +
      '<div class="pkc-blatt">' + BLATT + '<span class="pkc-punkte" aria-hidden="true">' +
      liste.map(function (st) { return '<span class="pkc-punkt pkc-punkt-' + st.id + '"' + lage(st) + ">" + st.nr + "</span>"; }).join("") + "</span></div>" +
      '<ol class="pkc-stellen" aria-label="Stellen auf dem Arbeitsblatt">' + liste.map(function (st) {
        return '<li class="pkc-stelle pkc-' + st.seite + '"' + lage(st) + '><a class="pkc-knopf" href="#stelle-' + st.id + '" data-stelle="' + st.id + '">' +
          '<span class="pkc-nr" aria-hidden="true">' + st.nr + '</span><span class="pkc-linie" aria-hidden="true"></span>' +
          '<span class="pkc-text"><span class="sr-only">Stelle ' + st.nr + ": </span><b>" + esc(st.name) + '</b> <span class="pkc-zahl">' + zahl(st.eintraege.length) + "</span></span></a></li>";
      }).join("") + "</ol></div>";
  }

  function mehrIdee(e, d) {
    var a = e.a, phasen = e.phasen.map(function (p) { return d.T.name("phasen", p); }).join(", ");
    return '<p><b>Auf Papier:</b> ' + esc(a.papier) + "</p>" +
      '<p><b>Faustregel:</b> ' + esc(a.regel) + "</p>" +
      e.kniffe.map(function (k) {
        if (k.schon && k.schon.eintrag) return '<p><b>Kniff dazu: ' + esc(k.m.name) + '.</b> Er steht in diesem Anlass als eigener Auftrag: <a class="textlink" href="#pk-' + esc(k.m.id) + '">' + esc(k.m.name) + "</a></p>";
        if (k.schon && k.schon.bei) return '<p><b>Kniff dazu: ' + esc(k.m.name) + '.</b> Er steht ausführlich bei <a class="textlink" href="#pk-' + esc(k.schon.bei.id) + '">' + esc(k.schon.bei.name) + "</a></p>";
        return '<p class="pk-kniff"><b>Kniff dazu: ' + esc(k.m.name) + ".</b> " + esc(k.m.papier) + "</p>";
      }).join("") +
      (phasen ? '<p><b>Phase der Stunde:</b> ' + esc(phasen) + "</p>" : "") +
      '<p><b>Papier oder Gerät?</b> ' + esc(gross(d.A.orte[a.ort])) + ". " + (e.digital
        ? '<a class="textlink" href="aufgabenkoffer.html#k-' + esc(a.id) + '">Dieselbe Idee am Gerät <span aria-hidden="true">→</span></a>'
        : "Das Gerät trägt hier kaum etwas bei.") + "</p>";
  }
  function mehrKniff(e, d) {
    var m = e.m;
    return '<p><b>Auf Papier:</b> ' + esc(m.papier) + "</p>" +
      '<p><b>Warum es trägt:</b> ' + esc(m.warum) + "</p>" +
      '<p><b>Phase der Stunde:</b> ' + esc(d.T.name("phasen", e.phasen[0])) + "</p>" +
      '<p><a class="textlink" href="aufgabenkoffer.html#kn-' + esc(m.id) + '">Derselbe Kniff am Gerät <span aria-hidden="true">→</span></a></p>';
  }

  /* Ein Auftrag in der Liste: Titel, ein Satz, Knopf; Ausführliches in zwei Vertiefungen. Der Knopf steht erst mit Skript da. */
  function eintragHtml(e, d, q) {
    var id = "pk-" + e.id, t = e.art === "idee" ? e.a : e.m;
    return '<li class="pk-eintrag" id="' + id + '">' +
      '<h3 class="pk-eintrag-titel">' + esc(t.name) + "</h3>" +
      '<p class="pk-eintrag-satz">' + esc(t.tun) + "</p>" +
      '<p class="pk-kopieren" hidden><button type="button" class="knopf" data-kopieren="a-' + id + '">Auftrag kopieren</button>' +
      '<span class="pk-status" aria-live="polite"></span></p>' +
      '<details class="mehr pk-auftrag"><summary>Auftrag an die KI ansehen</summary>' +
      '<label class="pk-label" for="a-' + id + '">Auftrag an die KI – du kannst ihn ändern</label>' +
      '<textarea id="a-' + id + '" rows="12" spellcheck="false" data-pk="' + id + '" aria-describedby="d-' + id + '">' + esc(auftragVon(e, {}, q)) + "</textarea>" +
      '<p class="pk-daten" id="d-' + id + '">' + DATEN_HINWEIS + "</p></details>" +
      '<details class="mehr pk-mehr"><summary>' + (e.art === "idee" ? "Mehr zur Idee" : "Mehr zum Kniff") + '</summary><div class="pk-mehr-text">' +
      (e.art === "idee" ? mehrIdee(e, d) : mehrKniff(e, d)) + "</div></details>" +
      "</li>";
  }

  function listeHtml(an, d, q) {
    return '<section class="pk-anlass" id="stelle-' + an.id + '" aria-labelledby="pk-t-' + an.id + '">' +
      '<div class="pk-anlass-kopf"><h2 id="pk-t-' + an.id + '" tabindex="-1"><span class="pkc-nr" aria-hidden="true">' + an.nr + '</span><span class="sr-only">Stelle ' + an.nr + ": </span>" + esc(an.name) + "</h2>" +
      '<p class="pk-anlass-satz">' + esc(an.satz) + ' <b class="pk-anlass-zahl">' + zahl(an.eintraege.length) + "</b></p>" +
      '<button type="button" class="knopf still pk-schliessen" data-schliessen hidden>Schließen</button></div>' +
      '<ul class="pk-eintraege">' + an.eintraege.map(function (e) { return eintragHtml(e, d, q); }).join("") + "</ul></section>";
  }

  /* Die Vertiefung unter den Listen: Prüfliste und Datenschutz (aus den Aufträgen und dem Formular, nichts Neues). */
  function vertiefung() {
    return '<details class="mehr pk-vertiefung" id="pk-pruefen"><summary>So prüfst du das Ergebnis – und was nicht hineingehört</summary>' +
      '<div class="pk-mehr-text"><p>Jeder Auftrag bittet die KI, ihr Ergebnis an diesen Fragen zu prüfen. Prüf sie selbst noch einmal, bevor du kopierst:</p>' +
      '<ul class="pk-pruefliste">' + PRUEF.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
      "<p><b>" + DATEN_HINWEIS + "</b> Deine Angaben werden nicht gespeichert und nirgends hingeschickt: Kidu baut nur den Text, den du kopierst.</p>" +
      '<p>Mehr dazu: <a class="textlink" href="sicher.html">Sicher arbeiten in fünf Regeln <span aria-hidden="true">→</span></a></p></div></details>';
  }

  function html(q) {
    q = q || {};
    var d = daten(q.A, q.K, q.W, q.T, q.S), liste = stellen(q);
    return {
      blatt: blattHtml(liste),
      listen: liste.map(function (st) { return listeHtml(st, d, q); }).join("") + vertiefung()
    };
  }

  var api = { stellen: stellen, auftrag: auftrag, kniffAuftrag: kniffAuftrag, auftragVon: auftragVon, html: html, BLATT: BLATT, DATEN_HINWEIS: DATEN_HINWEIS, PRUEF: PRUEF };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.PAPIERKOFFER = api;

  /* ---------- Seite papierkoffer.html: das Blatt bedienen ---------- */
  if (typeof document === "undefined") return;
  var buehne = document.getElementById("pkc-buehne"), feld = document.getElementById("pk-feld");
  if (!buehne || !feld || typeof SA === "undefined") return;
  var LISTE = stellen(), IDS = LISTE.map(function (st) { return st.id; }), HEIM = {}, EINTRAG = {};
  LISTE.forEach(function (st) { st.eintraege.forEach(function (e) { HEIM["pk-" + e.id] = st.id; EINTRAG["pk-" + e.id] = e; }); });
  var form = document.getElementById("pk-form"), anfang = document.getElementById("pkc-anfang"), offen = null;
  function ruhig() { return window.matchMedia("(prefers-reduced-motion:reduce)").matches || document.documentElement.getAttribute("data-bewegung") === "weniger"; }
  function nebeneinander() { return window.matchMedia("(min-width:1060px)").matches; }

  buehne.querySelectorAll("a.pkc-knopf").forEach(function (a) {
    var b = document.createElement("button"), id = a.getAttribute("data-stelle");
    b.type = "button"; b.className = a.className; b.innerHTML = a.innerHTML;
    b.setAttribute("data-stelle", id); b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "stelle-" + id);
    a.parentNode.replaceChild(b, a);
  });
  var KNOEPFE = Array.prototype.slice.call(buehne.querySelectorAll("button[data-stelle]"));
  function knopfVon(id) { return buehne.querySelector('button[data-stelle="' + id + '"]'); }
  feld.querySelectorAll(".pk-kopieren, [data-schliessen]").forEach(function (x) { x.hidden = false; });
  if (form) form.hidden = false;
  if (anfang) anfang.hidden = false;
  feld.classList.add("mit-skript");

  /* Beim ersten Besuch je Sitzung legt sich das Blatt einmal auf die Platte (Ausnahme 2 der Input-First Rule). */
  try {
    if (!sessionStorage.getItem("hilde.blatt") && !ruhig()) buehne.classList.add("pkc-legen");
    sessionStorage.setItem("hilde.blatt", "1");
  } catch (x) { /* ohne Speicher: keine Bewegung */ }

  /* Zeigt eine Stelle (oder keine). wie.bewegt: nur nach Maus oder Finger öffnet das Feld mit Bewegung – nicht per Tastatur,
     bei »weniger Bewegung« nur Überblendung. wie.fokus: Fokus auf die Überschrift der Liste. wie.adresse: Eintrag im Verlauf
     (wie.ersetzen: ohne neuen Eintrag, für die Pfeiltasten). wie.zeigen: das Feld in den Blick holen, wenn es unter dem Blatt steht. */
  function zeige(id, wie) {
    wie = wie || {};
    offen = id && IDS.indexOf(id) > -1 ? id : null;
    KNOEPFE.forEach(function (b, i) {
      var an = b.getAttribute("data-stelle") === offen;
      b.setAttribute("aria-expanded", String(an));
      b.tabIndex = an || (!offen && i === 0) ? 0 : -1;
    });
    buehne.setAttribute("data-stelle", offen || "");
    feld.querySelectorAll(".pk-anlass").forEach(function (p) { p.hidden = p.id !== "stelle-" + offen; });
    if (anfang) anfang.hidden = !!offen;
    feld.classList.remove("pk-einblenden");
    if (wie.adresse) {
      try { history[wie.ersetzen ? "replaceState" : "pushState"]({ stelle: offen }, "", offen ? "#stelle=" + offen : location.pathname + location.search); } catch (x) { /* ohne Verlauf weiter */ }
    }
    if (!offen) { if (form && anfang) anfang.insertAdjacentElement("afterend", form); return; }
    var liste = document.getElementById("stelle-" + offen);
    if (form) liste.querySelector(".pk-anlass-kopf").insertAdjacentElement("afterend", form);
    if (wie.bewegt) { void feld.offsetWidth; feld.classList.add("pk-einblenden"); }
    var ziel = wie.eintrag ? document.getElementById(wie.eintrag) : null;
    if (wie.fokus) liste.querySelector("h2").focus({ preventScroll: true });
    if (ziel || (wie.zeigen && !nebeneinander())) (ziel || liste).scrollIntoView({ block: "start", behavior: wie.bewegt && !ruhig() ? "smooth" : "auto" });
  }

  function ausAdresse() {
    var h = "";
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (x) { h = location.hash.slice(1); }
    var m = /^stelle[=-]([a-z-]+)$/.exec(h);
    if (m && IDS.indexOf(m[1]) > -1) return { id: m[1] };
    if (HEIM[h]) return { id: HEIM[h], eintrag: h };
    return { id: null };
  }
  function folgeAdresse() {
    var s = ausAdresse();
    if (s.id === offen && !s.eintrag) return;
    zeige(s.id, { eintrag: s.eintrag });
  }
  window.addEventListener("popstate", folgeAdresse);
  window.addEventListener("hashchange", folgeAdresse);

  document.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("button[data-stelle]");
    if (k && buehne.contains(k)) {
      var id = k.getAttribute("data-stelle");
      if (id === offen) zeige(null, { adresse: true });
      else zeige(id, { adresse: true, fokus: true, bewegt: e.detail > 0, zeigen: true });
      return;
    }
    var s = e.target.closest && e.target.closest("[data-schliessen]");
    if (s) { var war = offen; zeige(null, { adresse: true }); if (war) knopfVon(war).focus(); return; }
    var c = e.target.closest && e.target.closest("[data-kopieren]");
    if (!c) return;
    var f = document.getElementById(c.getAttribute("data-kopieren")), status = c.parentNode.querySelector("[aria-live]");
    if (!f || !status) return;
    function selbst() {
      var dt = f.closest("details"); if (dt) dt.open = true;
      f.focus(); f.select();
      status.textContent = "Der Text ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C).";
    }
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(f.value).then(function () { status.textContent = "Kopiert. Füge ihn in dein KI-System ein."; }, selbst);
      else selbst();
    } catch (x) { selbst(); }
  });
  /* Pfeiltasten wechseln die Stelle (von oben nach unten), Pos1 und Ende springen zur ersten und letzten; Escape schließt. */
  document.addEventListener("keydown", function (e) {
    var b = e.target.closest && e.target.closest("button[data-stelle]");
    if (b && buehne.contains(b)) {
      var i = KNOEPFE.indexOf(b), n = KNOEPFE.length, j = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % n;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + n) % n;
      else if (e.key === "Home") j = 0;
      else if (e.key === "End") j = n - 1;
      if (j !== null) {
        e.preventDefault();
        zeige(KNOEPFE[j].getAttribute("data-stelle"), { adresse: true, ersetzen: true });
        KNOEPFE[j].focus();
        return;
      }
    }
    if (e.key !== "Escape" || !offen || (e.target.closest && e.target.closest("textarea,input,select"))) return;
    var war = offen; zeige(null, { adresse: true }); knopfVon(war).focus();
  });

  function wert(id) { var x = document.getElementById(id); return x ? x.value : ""; }
  function fuelle() {
    var eingabe = { fach: wert("pk-fach"), thema: wert("pk-thema"), gruppe: wert("pk-gruppe") };
    feld.querySelectorAll("textarea[data-pk]").forEach(function (f) {
      var e = EINTRAG[f.getAttribute("data-pk")];
      if (e) f.value = auftragVon(e, eingabe);
    });
  }
  if (form) {
    form.addEventListener("input", fuelle);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }
  fuelle();
  var start = ausAdresse();
  zeige(start.id, { eintrag: start.eintrag });
})(typeof window !== "undefined" ? window : globalThis);
