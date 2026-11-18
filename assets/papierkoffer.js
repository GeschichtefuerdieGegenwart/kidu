/* Kidu – Aufgabenkoffer auf Papier (ab Version 4.46, KI-Training · Phase »Analogen Unterricht mit KI vorbereiten«).
   Ab 4.49, Variante B (Auftrag Mario 17.11.2026): nach Anlass sortiert, im Raster des digitalen Koffers.
   Erste Ebene: vier Anlass-Karten (KOFFER.papierAnlaesse) in der gemeinsamen Komponente .koffer-raster / .koffer-karte –
   dieselbe Kartenform wie die Ideenkarten des Aufgabenkoffers, nur in Ocker. Zweite Ebene: ein Tippen öffnet darunter die
   Aufträge des Anlasses als kompakte Liste; nur ein Anlass ist zugleich offen. Jeder Auftrag: Titel, ein Satz (Feld »tun«),
   »Auftrag kopieren« (Rückfall: Text markieren), dahinter »Auftrag an die KI ansehen« und »Mehr zur Idee«.
   Adresse: #anlass=<id> (Zurück und Teilen funktionieren); #pk-<id> öffnet den Anlass eines Eintrags und zeigt ihn.
   Ohne JavaScript: tools/papierkoffer.py setzt beim Bauen PAPIERKOFFER.html() ein – alle Aufträge stehen unter vier Überschriften,
   die Karten sind Sprungmarken.
   Daten: AUFGABEN (aufgaben.js: tun, papier, regel, sinn, wenig, ort) · KOFFER (koffer-ideen.js: papierAnlaesse, Kniffe, Phasen) ·
          WERKSTATT.muster (werkstatt.js: Kniffe mit »Auf Papier« und KI-Auftrag) · TAXONOMIEN.phasen (Namen) · SCHNELL (schnell.js).
   anlaesse(q)              die vier Anlässe mit ihren Einträgen (Idee oder Kniff). Ein Kniff, der im selben Anlass schon als
                            eigener Eintrag oder bei einer früheren Idee steht, kommt in »Mehr zur Idee« nur mit Namen und Verweis
                            (Dopplungen D1–D4 in docs/koffer-zuordnung.md). Die Aufträge bleiben davon unberührt.
   auftrag(a, k, eingabe)   unverändert seit 4.46: Material auf Papier für eine Idee, mit den Kniffen dazu; fünf Teile wie die
                            Schnell-Anfrage (SCHNELL_ANFRAGE.baue). Fehlt Fach, Thema oder Lerngruppe, fragt die KI zuerst danach.
   kniffAuftrag(m, eingabe) unverändert: der Auftrag eines Kniffs aus WERKSTATT.muster.
   html(q)                  { karten, listen }: die Anlass-Karten und alle Listen als HTML, ohne Skript gültig (für den Bau).
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

  /* Die vier Anlässe der ersten Ebene (ab 4.49). Jeder Eintrag: { art: "idee"|"kniff", id, a|m, phasen, kniffe, digital }.
     kniffe je Idee: { m, schon } – schon ist null (ganz zeigen), { eintrag: true } (eigener Eintrag in diesem Anlass)
     oder { bei: a } (steht ausführlich bei der früheren Idee a im selben Anlass). */
  function anlaesse(q) {
    q = q || {};
    var d = daten(q.A, q.K, q.W, q.T, q.S);
    return d.K.papierAnlaesse.map(function (an) {
      var hier = {};
      an.eintraege.forEach(function (id) { if (!finde(d.A.aufgaben, id)) hier[id] = { eintrag: true }; });
      var eintraege = an.eintraege.map(function (id) {
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
      return { id: an.id, name: an.name, satz: an.satz, bild: an.bild, eintraege: eintraege };
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

  /* ---------- Bildzeichen der Anlässe (ab 4.49): selbst gezeichnet, zwei Druckfarben, 160 × 90 wie im Aufgabenkoffer ----------
     Ocker (o) für das, was die Lernenden auf dem Blatt tun; Druckschwarz für Linien und Platten; Fläche (f) für Papier. */
  var BILD = {
    erschliessen: '<rect class="f" x="18" y="9" width="64" height="72" rx="3"/><path class="lt" d="M18 9h64v72H18z"/>' +
      '<rect class="o" x="25" y="20" width="44" height="10"/><rect class="o" x="25" y="47" width="32" height="10"/>' +
      '<path class="lt" d="M28 25h46M28 38.5h46M28 52h46M28 65.5h30"/><path class="lt" d="M76 22v8M76 49v8"/>' +
      '<rect class="t" x="98" y="12" width="46" height="20" rx="3"/><rect class="f" x="98" y="58" width="46" height="20" rx="3"/>' +
      '<path class="lt" d="M98 58h46v20H98zM121 32v26"/><circle class="o" cx="121" cy="45" r="6"/><circle class="lt" cx="121" cy="45" r="6"/>',
    urteilen: '<path class="lt" d="M80 22v50"/><rect class="t" x="62" y="70" width="36" height="9" rx="2"/>' +
      '<path class="lt" d="M34 30L126 18"/><circle class="t" cx="80" cy="24" r="5"/>' +
      '<path class="lt" d="M34 30l-12 22M34 30l12 22"/><path class="o" d="M18 52h32a16 9 0 0 1-32 0z"/><path class="lt" d="M18 52h32a16 9 0 0 1-32 0z"/>' +
      '<path class="lt" d="M126 18l-12 22M126 18l12 22"/><path class="f" d="M110 40h32a16 9 0 0 1-32 0z"/><path class="lt" d="M110 40h32a16 9 0 0 1-32 0z"/>',
    festigen: '<rect class="f" x="40" y="12" width="40" height="44" rx="3"/><path class="lt" d="M40 12h40v44H40z"/><path class="lt" d="M48 24h24M48 34h16"/>' +
      '<g transform="rotate(6 96 34)"><rect class="o" x="74" y="16" width="44" height="40" rx="3"/><path class="lt" d="M74 16h44v40H74z"/><path class="lt" d="M82 28h28M82 38h18"/></g>' +
      '<rect class="k" x="104" y="26" width="30" height="30" rx="3"/><path class="lt" d="M104 26h30v30h-30z"/>' +
      '<rect class="t" x="28" y="50" width="112" height="30" rx="3"/><path class="lf" d="M65 56v18M103 56v18"/>',
    differenzieren: '<rect class="f" x="16" y="9" width="64" height="72" rx="3"/><path class="lt" d="M16 9h64v72H16z"/>' +
      '<rect class="o" x="24" y="19" width="12" height="12" rx="2"/><path class="lt" d="M24 19h12v12H24zM24 41h12v12H24zM24 63h12v12H24z"/>' +
      '<path class="lt" d="M43 25h28M43 47h28M43 69h18"/>' +
      '<g transform="rotate(-8 118 40)"><rect class="k" x="94" y="16" width="48" height="34" rx="3"/><path class="lt" d="M94 16h48v34H94z"/></g>' +
      '<g transform="rotate(5 120 56)"><rect class="o" x="96" y="38" width="48" height="34" rx="3"/><path class="lt" d="M96 38h48v34H96z"/><path class="lt" d="M104 50h30M104 60h20"/></g>'
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function bild(id) { return '<svg viewBox="0 0 160 90" aria-hidden="true" focusable="false">' + (BILD[id] || "") + "</svg>"; }
  function zahl(n) { return n + (n === 1 ? " Auftrag" : " Aufträge"); }
  function gross(t) { t = String(t || ""); return t.charAt(0).toUpperCase() + t.slice(1); }

  /* Eine Anlass-Karte. Ohne Skript ein Sprung zur Liste; assets/papierkoffer.js macht daraus eine Schaltfläche
     mit aria-expanded und aria-controls – Inhalt und Form bleiben gleich. */
  function karte(an, phase) {
    return '<li><a class="koffer-karte" href="#anlass-' + an.id + '" data-anlass="' + an.id + '">' +
      '<span class="koffer-bild">' + bild(an.bild) + "</span>" +
      '<span class="koffer-wort"><b class="koffer-titel">' + esc(an.name) + "</b>" +
      '<span class="koffer-kurz">' + esc(an.satz) + "</span>" +
      '<span class="koffer-zahl">' + zahl(an.eintraege.length) + "</span>" +
      (phase ? '<span class="kz ki koffer-bereich">' + esc(phase) + "</span>" : "") +
      "</span></a></li>";
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
    return '<section class="pk-anlass" id="anlass-' + an.id + '" aria-labelledby="pk-t-' + an.id + '">' +
      '<div class="pk-anlass-kopf"><h2 id="pk-t-' + an.id + '" tabindex="-1">' + esc(an.name) + "</h2>" +
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
    var d = daten(q.A, q.K, q.W, q.T, q.S), liste = anlaesse(q);
    return {
      karten: '<ul class="koffer-raster ist-vier" id="pk-anlaesse">' + liste.map(function (an) { return karte(an, q.phase); }).join("") + "</ul>",
      listen: liste.map(function (an) { return listeHtml(an, d, q); }).join("") + vertiefung()
    };
  }

  var api = { anlaesse: anlaesse, auftrag: auftrag, kniffAuftrag: kniffAuftrag, auftragVon: auftragVon, html: html, BILD: BILD, DATEN_HINWEIS: DATEN_HINWEIS, PRUEF: PRUEF };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.PAPIERKOFFER = api;

  /* ---------- Seite papierkoffer.html: aus Sprungmarken werden Schaltflächen, je ein Anlass offen ---------- */
  if (typeof document === "undefined") return;
  var raster = document.getElementById("pk-anlaesse"), huelle = document.getElementById("pk-offen");
  if (!raster || !huelle || typeof SA === "undefined") return;
  var LISTE = anlaesse(), IDS = LISTE.map(function (an) { return an.id; }), HEIM = {}, EINTRAG = {};
  LISTE.forEach(function (an) { an.eintraege.forEach(function (e) { HEIM["pk-" + e.id] = an.id; EINTRAG["pk-" + e.id] = e; }); });
  var form = document.getElementById("pk-form"), offen = null;
  function ruhig() { return window.matchMedia("(prefers-reduced-motion:reduce)").matches || document.documentElement.getAttribute("data-bewegung") === "weniger"; }
  function karteVon(id) { return raster.querySelector('[data-anlass="' + id + '"]'); }

  raster.querySelectorAll("a.koffer-karte").forEach(function (a) {
    var b = document.createElement("button");
    b.type = "button"; b.className = a.className; b.innerHTML = a.innerHTML;
    b.setAttribute("data-anlass", a.getAttribute("data-anlass"));
    b.setAttribute("aria-expanded", "false");
    b.setAttribute("aria-controls", "anlass-" + a.getAttribute("data-anlass"));
    a.parentNode.replaceChild(b, a);
  });
  huelle.querySelectorAll(".pk-kopieren, [data-schliessen]").forEach(function (x) { x.hidden = false; });
  if (form) form.hidden = false;
  huelle.classList.add("mit-skript");

  /* Zeigt einen Anlass (oder keinen). wie.bewegt: nur nach Maus oder Finger blendet der Inhalt ein und rückt 8 px – nicht per
     Tastatur, bei »weniger Bewegung« nur Überblendung. wie.fokus: Fokus auf die Überschrift der Liste. wie.adresse: neuer Eintrag
     im Verlauf (Zurück schließt wieder). */
  function zeige(id, wie) {
    wie = wie || {};
    offen = id && IDS.indexOf(id) > -1 ? id : null;
    raster.querySelectorAll("[data-anlass]").forEach(function (b) { b.setAttribute("aria-expanded", String(b.getAttribute("data-anlass") === offen)); });
    huelle.querySelectorAll(".pk-anlass").forEach(function (p) { p.hidden = p.id !== "anlass-" + offen; });
    huelle.hidden = !offen;
    huelle.classList.remove("pk-einblenden");
    if (wie.adresse) {
      try { history.pushState({ anlass: offen }, "", offen ? "#anlass=" + offen : location.pathname + location.search); } catch (x) { /* ohne Verlauf weiter */ }
    }
    if (!offen) return;
    var feld = document.getElementById("anlass-" + offen);
    if (form) feld.querySelector(".pk-anlass-kopf").insertAdjacentElement("afterend", form);
    if (wie.bewegt) { void huelle.offsetWidth; huelle.classList.add("pk-einblenden"); }
    var ziel = wie.eintrag ? document.getElementById(wie.eintrag) : null;
    if (wie.fokus) feld.querySelector("h2").focus({ preventScroll: true });
    (ziel || feld).scrollIntoView({ block: "start", behavior: wie.bewegt && !ruhig() ? "smooth" : "auto" });
  }

  function ausAdresse() {
    var h = "";
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (x) { h = location.hash.slice(1); }
    var m = /^anlass[=-]([a-z-]+)$/.exec(h);
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
    var k = e.target.closest && e.target.closest("[data-anlass]");
    if (k && raster.contains(k)) {
      var id = k.getAttribute("data-anlass");
      if (id === offen) zeige(null, { adresse: true });
      else zeige(id, { adresse: true, fokus: true, bewegt: e.detail > 0 });
      return;
    }
    var s = e.target.closest && e.target.closest("[data-schliessen]");
    if (s) { var war = offen; zeige(null, { adresse: true }); if (war) karteVon(war).focus(); return; }
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
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !offen || (e.target.closest && e.target.closest("textarea,input,select"))) return;
    var war = offen; zeige(null, { adresse: true }); karteVon(war).focus();
  });

  function wert(id) { var x = document.getElementById(id); return x ? x.value : ""; }
  function fuelle() {
    var eingabe = { fach: wert("pk-fach"), thema: wert("pk-thema"), gruppe: wert("pk-gruppe") };
    huelle.querySelectorAll("textarea[data-pk]").forEach(function (f) {
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
