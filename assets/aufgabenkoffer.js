/* Kidu – Aufgabenkoffer nach Unterrichtsphasen (ab Version 4.44; löst Liste und Landkarte aus 4.32/4.42 ab).
   Stundenlinie → Ideenkarten → ein Arbeitsfenster je Idee: »So setzt du es digital um«, eine Probe zum Ausprobieren
   (ausgedachte Beispiele, nichts wird gespeichert oder gesendet) und der Auftrag für ein freigegebenes KI-System.
   Adressen: #einstieg · #erarbeitung · #sichern · #uebertragen · #alle und #k-<id> je Aufgabenform (wie bisher).
   Ab 4.46 (Entscheidung Mario, 17.11.2026): »Ideen und Kniffe« gehen im Koffer auf – ohne die Form zu ändern.
   - Ideen mit Kniff tragen auf der Karte »+ Kniff«; im Fenster der Idee steht »Der Kniff dazu« (was, warum, Link).
   - Jeder Kniff hat sein eigenes Fenster (#kn-<id>): warum es trägt, am Gerät mit Unterrichtsbeispielen, auf Papier,
     zu welchen Ideen er passt, Herkunft und der KI-Auftrag aus WERKSTATT.muster (eine Quelle, gebaut mit WERKSTATT_ANFRAGE).
   - Unter der Stundenlinie »In jeder Phase« (#jede-phase): die Kniffe, die die ganze Stunde tragen.
   - Alte Adressen von muster.html (#m-<id>) öffnen das Fenster des Kniffs.
   Braucht: AUFGABEN (aufgaben.js), KOFFER (koffer-ideen.js), TAXONOMIEN (taxonomien.js);
   für die Kniffe WERKSTATT (werkstatt.js), WERKSTATT_ANFRAGE, SCHNELL, BEISPIELE – fehlen sie, bleibt der Koffer wie vorher. */
(function () {
  "use strict";
  if (typeof AUFGABEN === "undefined" || typeof KOFFER === "undefined" || typeof TAXONOMIEN === "undefined" || !document.getElementById("stunde")) return;
  var A = {}; AUFGABEN.aufgaben.forEach(function (a) { A[a.id] = a; });
  var IDS = Object.keys(KOFFER.ideen);
  var PH = KOFFER.phasen.map(function (id) { return TAXONOMIEN.phasen.filter(function (p) { return p.id === id; })[0]; }), PHN = {}; PH.forEach(function (p) { PHN[p.id] = p; });
  var ADR = { einstieg: "einstieg", erarbeitung: "erarbeitung", sicherung: "sichern", abschluss: "uebertragen", alle: "alle", jede: "jede-phase" };
  var VON = {}; Object.keys(ADR).forEach(function (k) { VON[ADR[k]] = k; });
  var stand = { phase: "einstieg", idee: null, kniff: null, von: null };
  /* Kniffe (ab 4.46): eine Quelle in WERKSTATT.muster; hier nur nachgeschlagen */
  var KN = {}; if (typeof WERKSTATT !== "undefined") WERKSTATT.muster.forEach(function (m) { KN[m.id] = m; });
  var KNIFFE = KOFFER.kniffe || {}, JEDE = (KOFFER.jedePhase || []).filter(function (id) { return KN[id]; });
  var UEBER = TAXONOMIEN.phasen.filter(function (p) { return p.id === "uebergreifend"; })[0];
  function kniffeVon(id) { return (KNIFFE[id] || []).filter(function (k) { return KN[k]; }); }
  function ideenMit(kid) { return Object.keys(KNIFFE).filter(function (id) { return KNIFFE[id].indexOf(kid) > -1 && A[id]; }); }
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var ruhig = function () { return window.matchMedia("(prefers-reduced-motion:reduce)").matches || document.documentElement.getAttribute("data-bewegung") === "weniger"; };

  /* ---------- Bildzeichen: zwei Druckfarben, 160 × 90 ---------- */
  var svg = function (i) { return '<svg viewBox="0 0 160 90" aria-hidden="true" focusable="false">' + i + "</svg>"; };
  var BILD = {
    abruf: '<rect class="ak-f" x="30" y="12" width="64" height="66" rx="3"/><path class="lt" d="M40 26h44M40 38h44M40 50h30"/><rect class="ak-k" x="78" y="28" width="60" height="50" rx="3"/><rect class="t" x="72" y="22" width="60" height="50" rx="3"/><rect class="o" x="82" y="42" width="40" height="10"/>',
    klassenbild: (function () { var s = "", n = 0; [[30, 7], [44, 9], [58, 11]].forEach(function (r) { for (var i = 0; i < r[1]; i++) { var w = Math.PI * (i + .5) / r[1], x = 80 - Math.cos(w) * r[0] * 1.15, y = 76 - Math.sin(w) * r[0]; n++; s += '<circle class="' + (n % 7 === 3 ? "o" : n % 3 === 0 ? "ak-f" : "p") + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5"/>'; } }); return s + '<rect class="t" x="70" y="72" width="20" height="8" rx="2"/>'; })(),
    entscheiden: '<path class="lt" d="M22 45h40M62 45l28-22M62 45l28 22"/><circle class="o" cx="62" cy="45" r="8"/><rect class="t" x="96" y="12" width="46" height="22" rx="3"/><rect class="t" x="96" y="56" width="46" height="22" rx="3"/><path d="M104 23h30M104 67h30" stroke="#f8f5ee" stroke-width="3" stroke-dasharray="3 5"/>',
    versuch: '<circle class="ak-f" cx="80" cy="50" r="30"/><circle class="lt" cx="80" cy="50" r="30"/><rect class="t" x="74" y="8" width="12" height="10" rx="2"/><path class="lp" d="M80 50V28"/><path d="M80 50l16 10" stroke="#b68235" stroke-width="5" stroke-linecap="round"/><circle class="t" cx="80" cy="50" r="4"/>',
    regler: '<rect class="ak-k" x="26" y="52" width="16" height="22"/><rect class="p" x="50" y="40" width="16" height="34"/><rect class="p" x="74" y="26" width="16" height="48"/><rect class="ak-k" x="98" y="34" width="16" height="40"/><rect class="ak-k" x="122" y="46" width="16" height="28"/><path class="lt" d="M22 14h116"/><circle class="o" cx="82" cy="14" r="8"/><circle class="lt" cx="82" cy="14" r="8"/>',
    film: '<rect class="ak-f" x="20" y="14" width="34" height="40" rx="3"/><rect class="p" x="63" y="14" width="34" height="40" rx="3"/><rect class="ak-f" x="106" y="14" width="34" height="40" rx="3"/><path d="M74 26l14 8-14 8z" fill="#f8f5ee"/><path class="lt" d="M20 72h120"/><circle class="o" cx="80" cy="72" r="8"/><circle class="lt" cx="80" cy="72" r="8"/>',
    markieren: '<rect class="ak-f" x="24" y="10" width="112" height="70" rx="3"/><rect class="o" x="34" y="20" width="52" height="10"/><rect class="o" x="62" y="50" width="62" height="10"/><path class="lt" d="M36 25h88M36 40h88M36 55h88M36 70h56"/>',
    zuordnen: '<rect class="ak-f" x="18" y="46" width="56" height="34" rx="3"/><rect class="ak-f" x="86" y="46" width="56" height="34" rx="3"/><path class="lt" d="M18 46h56v34H18zM86 46h56v34H86z" stroke-dasharray="5 5"/><rect class="p" x="26" y="56" width="40" height="8"/><rect class="p" x="94" y="56" width="40" height="8"/><rect class="p" x="94" y="68" width="28" height="6"/><g transform="rotate(-8 80 22)"><rect class="t" x="58" y="10" width="44" height="24" rx="3"/><rect class="o" x="64" y="18" width="32" height="8"/></g>',
    stufen: '<rect class="ak-k" x="22" y="56" width="38" height="22"/><rect class="p" x="60" y="36" width="38" height="42"/><rect class="t" x="98" y="16" width="38" height="62"/><circle class="o" cx="41" cy="44" r="8"/><circle class="lt" cx="41" cy="44" r="8"/>',
    auswahl: '<rect class="ak-f" x="22" y="10" width="76" height="18" rx="3"/><rect class="p" x="22" y="36" width="76" height="18" rx="3"/><rect class="ak-f" x="22" y="62" width="76" height="18" rx="3"/><circle class="lt" cx="34" cy="19" r="5"/><circle cx="34" cy="45" r="5" fill="#f8f5ee"/><circle class="lt" cx="34" cy="71" r="5"/><path class="o" d="M108 30h34v30h-34z"/><path class="o" d="M108 40l-10 5 10 5z"/><path class="lt" d="M114 40h22M114 50h14"/>',
    kartei: '<rect class="ak-k" x="50" y="14" width="74" height="50" rx="3"/><rect class="p" x="42" y="22" width="74" height="50" rx="3"/><rect class="ak-f" x="34" y="30" width="74" height="50" rx="3"/><path class="lt" d="M34 30h74v50H34z"/><path class="lt" d="M48 48h46M48 60h28"/><path d="M122 70c12-4 16-16 10-28" fill="none" stroke="#b68235" stroke-width="5" stroke-linecap="round"/><path class="o" d="M124 40l10-4 4 12z"/>',
    reihe: '<rect class="p" x="14" y="32" width="28" height="26" rx="3"/><rect class="p" x="52" y="32" width="28" height="26" rx="3"/><rect class="o" x="90" y="32" width="28" height="26" rx="3"/><rect class="ak-f" x="128" y="32" width="22" height="26" rx="3"/><path class="lt" d="M128 32h22v26h-22z" stroke-dasharray="5 5"/><path class="lt" d="M42 45h10M80 45h10M118 45h10"/>',
    struktur: '<path class="lt" d="M42 26l38 20M118 24L80 46M80 46l-30 26M80 46l36 24"/><circle class="p" cx="40" cy="24" r="12"/><circle class="p" cx="120" cy="22" r="12"/><circle class="t" cx="80" cy="46" r="14"/><circle class="p" cx="48" cy="72" r="10"/><circle class="o" cx="118" cy="70" r="10"/>',
    einschaetzen: '<path class="lt" d="M22 24h116M22 46h116M22 68h116"/><circle class="ak-k" cx="50" cy="24" r="8"/><circle class="p" cx="88" cy="46" r="8"/><circle class="o" cx="120" cy="68" r="9"/><path class="lp" d="M50 24l38 22 32 22" stroke-dasharray="4 5"/>',
    einordnen: '<path class="lt" d="M20 50h120"/><rect class="t" x="16" y="40" width="8" height="20"/><rect class="t" x="136" y="40" width="8" height="20"/><path class="o" d="M58 22h20v20l-10 10-10-10z"/><path class="lp" d="M100 22h20v20l-10 10-10-10z" stroke-dasharray="4 4"/>',
    video: '<rect class="t" x="30" y="10" width="100" height="56" rx="4"/><rect class="p" x="36" y="16" width="88" height="44"/><path d="M72 28l20 10-20 10z" fill="#f8f5ee"/><circle class="o" cx="116" cy="24" r="5"/><rect class="ak-k" x="30" y="72" width="28" height="10"/><rect class="ak-k" x="66" y="72" width="28" height="10"/><rect class="ak-k" x="102" y="72" width="28" height="10"/>'
  };

  /* ---------- Listen ---------- */
  function inPhase(p) {
    if (p === "alle") return IDS.map(function (id) { return { id: id, auch: false }; });
    var erst = [], auch = [];
    IDS.forEach(function (id) { var i = KOFFER.ideen[id].phasen.indexOf(p); if (i === 0) erst.push({ id: id, auch: false }); else if (i > 0) auch.push({ id: id, auch: true }); });
    return erst.concat(auch);
  }
  function kann(a) { return a.hebel.length ? a.hebel.map(function (h) { return AUFGABEN.hebel[h]; }) : []; }

  function linie() {
    $("#stunde").innerHTML = PH.map(function (p) {
      var n = inPhase(p.id).length;
      return '<li><button type="button" class="phase" data-phase="' + p.id + '" aria-pressed="' + (stand.phase === p.id) + '"><b>' + esc(p.name) + '</b><span class="ak-hilfe">' + esc(p.hilfe) + '</span><span class="zahl">' + n + " Ideen</span></button></li>";
    }).join("");
    if (JEDE.length && UEBER) {
      $("#stunde").insertAdjacentHTML("beforeend", '<li class="ak-jede"><button type="button" class="phase" data-phase="jede" aria-pressed="' + (stand.phase === "jede") + '"><b>' + esc(UEBER.name) + '</b><span class="ak-hilfe">' + esc(UEBER.hilfe) + '</span><span class="zahl">' + JEDE.length + " Kniffe</span></button></li>");
    }
    var alle = $("#alle"); alle.setAttribute("aria-pressed", stand.phase === "alle");
  }
  function marke(id) {
    var ks = kniffeVon(id);
    if (!ks.length) return "";
    return '<span class="ak-kniff-marke">+ ' + (ks.length === 1 ? "Kniff: " + esc(KN[ks[0]].name) : ks.length + " Kniffe aus der Praxis") + "</span>";
  }
  function kniffKarte(kid) {
    var m = KN[kid];
    return '<li><button type="button" class="ak-karte ak-kniff-karte" data-kniff="' + kid + '"><span class="ak-bild">' + svg(KNIFF) + '</span><span class="wort"><b>' + esc(m.name) + '</b><span class="kurz">' + esc(m.tun) + '</span><span class="kann">Kniff aus der Praxis</span></span></button></li>';
  }
  function karten() {
    if (stand.phase === "jede") {
      $("#ideen-titel").textContent = "Kniffe für: " + UEBER.name;
      $("#ideen-satz").textContent = "Diese Kniffe tragen die ganze Stunde. Tipp einen an. Dann siehst du, wie er am Gerät und auf Papier geht – mit einem Auftrag für ein KI-System.";
      $("#ideen").innerHTML = JEDE.map(kniffKarte).join("");
      return;
    }
    var l = inPhase(stand.phase), p = PHN[stand.phase];
    $("#ideen-titel").textContent = p ? "Ideen für: " + p.name : "Alle " + IDS.length + " Ideen";
    $("#ideen-satz").textContent = "Tipp eine Idee an. Dann siehst du, wie sie am Gerät geht – mit einem Beispiel zum Ausprobieren und dem Kniff aus der Praxis, wo es einen gibt.";
    $("#ideen").innerHTML = l.map(function (e) {
      var a = A[e.id], k = KOFFER.ideen[e.id], kn = kann(a);
      return '<li><button type="button" class="ak-karte' + (e.auch ? " auch" : "") + '" data-idee="' + e.id + '"><span class="ak-bild">' + svg(BILD[e.id]) + '</span><span class="wort"><b>' + esc(a.name) + '</b><span class="kurz">' + esc(k.kurz) + "</span>" +
        (kn.length ? '<span class="kann">Das Gerät kann hier: ' + esc(kn.join(" · ").toLowerCase()) + "</span>" : "") +
        marke(e.id) +
        (e.auch ? '<span class="auchhier">Passt auch hier. Zuerst gedacht für: ' + esc(PHN[k.phasen[0]].name) + "</span>" : "") + "</span></button></li>";
    }).join("");
  }

  var EINSATZ = { eingesetzt: "Im eigenen Unterricht eingesetzt", geplant: "Ausgearbeitet, noch nicht ausgewertet", offen: "Noch nicht erprobt" };
  /* Der Auftrag in den fünf Teilen (wie »Prompten lernen«), anbieterneutral, aus den Feldern der Aufgabe gebaut.
     Mit Schritten (k): Fassung am Gerät als eine HTML-Datei. Ohne (die zwei Aufgaben ohne Gerät): Fassung auf Papier. */
  function prompt(a, k) {
    var z = ["# Ziel", "Erstelle für meinen Unterricht eine Aufgabe der Form »" + a.name + "«. " + a.tun, "Sie soll fördern: " + a.foerdert, "", "# Kontext"];
    if (k) z.push("Phase der Stunde: " + k.phasen.map(function (p) { return PHN[p].name; }).join(" oder ") + ".");
    z.push("Frage mich zuerst nach: Fach, Thema, Lerngruppe und meinem Material. Beginne erst danach.", "", "# Anforderungen");
    if (k) { z.push("So läuft die Aufgabe ab:"); k.schritte.forEach(function (s, i) { z.push((i + 1) + ". " + s); }); }
    z.push("- Faustregel: " + a.regel, "- Vermeide: " + a.wenig.join("; ") + ".", "- Vor jeder Auflösung steht eine eigene Antwort der Lernenden.", "- Die Rückmeldung ist ein erklärender Text. Keine Punkte, keine Ranglisten, keine Belohnungen.", "- Kurze Sätze, eine Aussage pro Satz, Anrede »du«.", "- Gib keine erfundenen Quellen, Zahlen oder Zitate an. Wenn du etwas nicht sicher weißt, kennzeichne es.", "- Verwende keine personenbezogenen Daten.", "", "# Format");
    if (k) z.push("Eine einzige HTML-Datei für das iPad im Querformat. Sie läuft ohne Internet, lädt keine fremden Schriften oder Skripte und sendet nichts an einen Server.", "Zeig mir vor dem Bauen in fünf Zeilen, was du planst. Dazu ein Erwartungshorizont für mich.");
    else z.push("Die Fassung auf Papier. " + a.papier, "Dazu ein Erwartungshorizont für mich.");
    z.push("", "# Prüfkriterien", "Prüfe am Ende: Müssen die Lernenden selbst denken, bevor eine Lösung erscheint? Passt die Aufgabe zum Ziel? Geht es auf Papier genauso gut? Dann sag es.", "Markiere, was ich fachlich nachprüfen sollte.");
    return z.join("\n");
  }
  function auftrag(a, k) {
    return '<section class="ki-box"><h4 style="color:var(--text)">Mit KI bauen lassen</h4><p>Kopier den Auftrag in ein an deiner Schule freigegebenes KI-System. Gib keine Namen, Noten oder anderen personenbezogenen Daten ein.</p><label class="sr-only" for="auftrag">Auftrag – du kannst ihn ändern</label><textarea id="auftrag" spellcheck="false">' + esc(prompt(a, k)) + '</textarea><div class="ak-zeile"><button type="button" class="knopf" data-kopieren>Auftrag kopieren</button><span class="leise" id="kopiert" aria-live="polite"></span></div></section>';
  }
  function erfahrung(a) {
    return '<section class="teil"><h4>Aus dem Unterricht</h4><p class="mass">' + esc(a.erfahrung) + (a.beispiel ? ' <a class="textlink" href="beispiel.html#' + esc(a.beispiel) + '">Beispiel ansehen <span aria-hidden="true">→</span></a>' : "") + '</p><p class="leise">' + esc(EINSATZ[a.einsatz]) + ". Eine persönliche Beobachtung, kein Nachweis der Wirkung.</p></section>";
  }
  function klappen(a, mitPapier) {
    return '<details class="mehr"><summary>Wann sie besonders passt</summary><div><ul>' + a.sinn.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul></div></details>" +
      (mitPapier ? '<details class="mehr"><summary>Und ohne Gerät?</summary><div><p>' + esc(a.papier) + "</p></div></details>" : "") +
      '<details class="mehr"><summary>Zum Nachlesen: Belegstand</summary><div><p><b>' + esc(a.stand.charAt(0).toUpperCase() + a.stand.slice(1)) + ".</b> " + esc(a.beleg) + "</p></div></details>";
  }
  var PAPIER = '<rect class="ak-f" x="42" y="8" width="76" height="74" rx="3"/><path class="lt" d="M42 8h76v74H42z"/><path class="lt" d="M54 26h52M54 40h52M54 54h36"/><path class="o" d="M96 60l22-22 8 8-22 22-10 2z"/>';
  /* ab 4.46: Kniff – eine Karte mit umgeknickter Ecke: der Handgriff, der die Aufgabe trägt */
  var KNIFF = '<rect class="ak-f" x="34" y="10" width="92" height="70" rx="3"/><path class="lt" d="M34 10h66l26 26v44H34z"/><path class="o" d="M100 10v26h26z"/><path class="lt" d="M46 40h44M46 52h56M46 64h36"/><circle class="p" cx="58" cy="24" r="6"/>';

  /* ab 4.46: »Der Kniff dazu« im Fenster einer Idee – kurz, mit dem Weg ins ganze Fenster des Kniffs */
  var EINSATZ_KNIFF = { eingesetzt: "Im eigenen Unterricht eingesetzt", geplant: "Ausgearbeitet, noch nicht im Unterricht eingesetzt", offen: "Einsatz im Unterricht: noch offen" };
  function kniffDazu(id) {
    var ks = kniffeVon(id);
    if (!ks.length) return "";
    return '<section class="ak-kniff"><h4>' + (ks.length === 1 ? "Der Kniff dazu" : "Die Kniffe dazu") + "</h4>" + ks.map(function (kid) {
      var m = KN[kid];
      return '<div class="ak-kniff-eintrag"><p class="ak-kniff-name"><b>' + esc(m.name) + "</b></p><p>" + esc(m.tun) + "</p><p><b>Warum es trägt:</b> " + esc(m.warum) + "</p>" +
        '<p><button type="button" class="textknopf" data-kniff="' + kid + '">Ganzen Kniff öffnen: am Gerät, auf Papier, mit KI-Auftrag <span aria-hidden="true">→</span></button></p></div>';
    }).join("") + "</section>";
  }
  function beispielLinks(m) {
    var B = typeof BEISPIELE !== "undefined" ? BEISPIELE : [];
    var bsp = (m.tablet.beispiele || []).map(function (id) { return B.filter(function (b) { return b.id === id; })[0]; }).filter(Boolean);
    return bsp.length ? '<p><b>Unterrichtsbeispiele:</b></p><ul class="ak-kniff-bsp">' + bsp.map(function (b) { return '<li><a class="textlink" href="beispiel.html#' + esc(b.slug) + '">' + esc(b.titel) + "</a></li>"; }).join("") + "</ul>" : "";
  }
  function kniffAuftrag(m) {
    var text = typeof WERKSTATT_ANFRAGE !== "undefined" ? WERKSTATT_ANFRAGE.auftrag(Object.assign({ id: m.id }, m.ki), {}) : "";
    if (!text) return "";
    return '<section class="ki-box"><h4 style="color:var(--text)">Mit KI vorbereiten</h4><p>Ein fertiger Auftrag für ein an deiner Schule freigegebenes KI-System. Das Ergebnis darf auf Papier bleiben. Gib keine Namen, Noten oder anderen personenbezogenen Daten ein.</p><label class="sr-only" for="auftrag">Auftrag – du kannst ihn ändern</label><textarea id="auftrag" spellcheck="false">' + esc(text) + '</textarea><div class="ak-zeile"><button type="button" class="knopf" data-kopieren>Auftrag kopieren</button><span class="leise" id="kopiert" aria-live="polite"></span></div></section>';
  }
  function kniffFenster(f) {
    var m = KN[stand.kniff], von = stand.von && A[stand.von] ? A[stand.von] : null, p = PHN[stand.phase] || (stand.phase === "jede" ? UEBER : null);
    var zurueck = von ? "Zurück zu: " + esc(von.name) : (p ? (stand.phase === "jede" ? "Alle Kniffe für: " : "Alle Ideen für: ") + esc(p.name) : "Alle Ideen");
    var nb = stand.phase === "jede" && !von ? JEDE : [];
    var kopf = '<div class="zurueck"><button type="button" class="knopf still ak-klein" data-zurueck>‹ ' + zurueck + "</button>" +
      (nb.length ? '<ul class="nachbarn" aria-label="Weitere Kniffe für jede Phase">' + nb.map(function (kid) { return '<li><button type="button" data-kniff="' + kid + '"' + (kid === m.id ? ' aria-current="true"' : "") + ">" + esc(KN[kid].name) + "</button></li>"; }).join("") + "</ul>" : "") + "</div>";
    var ideen = ideenMit(m.id);
    var passt = (ideen.length ? '<ul class="nachbarn">' + ideen.map(function (id) { return '<li><button type="button" data-idee="' + id + '">' + esc(A[id].name) + "</button></li>"; }).join("") + "</ul>" : "") +
      (JEDE.indexOf(m.id) > -1 ? '<p>Und in jeder Phase der Stunde.</p>' : "");
    var titel = '<header class="blatt-kopf"><span class="ak-bild" style="view-transition-name:ak-bild">' + svg(KNIFF) + '</span><div><h2 id="idee-titel" tabindex="-1">' + esc(m.name) + '</h2><p class="auch">Kniff aus der Praxis · ' + esc(TAXONOMIEN.name("phasen", m.phase)) + '</p></div><p class="tun">' + esc(m.tun) + "</p></header>";
    f.innerHTML = kopf + '<article class="blatt ak-kniff-blatt" aria-labelledby="idee-titel">' + titel +
      '<div class="spalte">' +
      '<section class="teil"><h3>Warum es trägt</h3><p class="mass">' + esc(m.warum) + "</p></section>" +
      '<section class="kann-box"><h4>Am Gerät</h4><p>' + esc(m.tablet.text) + "</p>" + beispielLinks(m) + "</section>" +
      '<section class="teil"><h4>Auf Papier</h4><p class="mass">' + esc(m.papier) + "</p></section>" +
      (passt ? '<section class="teil"><h4>Passt zu diesen Ideen</h4>' + passt + "</section>" : "") +
      '<p class="leise">' + esc(EINSATZ_KNIFF[m.einsatz] || "") + " · " + esc(m.herkunft) + ". Eine persönliche Angabe, kein Nachweis der Wirkung.</p>" +
      "</div>" +
      '<div class="spalte">' + kniffAuftrag(m) +
      (m.lernende ? '<section class="teil"><h4>Wenn deine Lernenden mit KI arbeiten</h4><p class="mass">' + esc(m.lernende) + ' <a class="textlink" href="lernende-ki.html">Drei Regeln dazu <span aria-hidden="true">→</span></a></p></section>' : "") +
      "</div></article>";
  }

  function detail() {
    var f = $("#fenster"), u = $("#uebersicht");
    if (stand.kniff && KN[stand.kniff]) { u.hidden = true; f.hidden = false; kniffFenster(f); return; }
    if (!stand.idee) { f.hidden = true; u.hidden = false; f.innerHTML = ""; return; }
    var a = A[stand.idee], k = KOFFER.ideen[stand.idee], kn = k ? kann(a) : [], p = PHN[stand.phase];
    var nb = k ? inPhase(stand.phase) : [];
    u.hidden = true; f.hidden = false;
    var kopf = '<div class="zurueck"><button type="button" class="knopf still ak-klein" data-zurueck>‹ ' + (p ? "Alle Ideen für: " + esc(p.name) : "Alle Ideen") + "</button>" +
      (nb.length ? '<ul class="nachbarn" aria-label="Weitere Ideen dieser Phase">' + nb.map(function (e) { return '<li><button type="button" data-idee="' + e.id + '"' + (e.id === a.id ? ' aria-current="true"' : "") + ">" + esc(A[e.id].name) + "</button></li>"; }).join("") + "</ul>" : "") + "</div>";
    var titel = '<header class="blatt-kopf"><span class="ak-bild" style="view-transition-name:ak-bild">' + svg(k ? BILD[a.id] : PAPIER) + '</span><div><h2 id="idee-titel" tabindex="-1">' + esc(a.name) + '</h2><p class="auch">Auch bekannt als: ' + esc(a.auch) + (k ? " · Phase: " + k.phasen.map(function (x) { return esc(PHN[x].name); }).join(", ") : " · geht ohne Gerät besser") + '</p></div><p class="tun">' + esc(a.tun) + "</p></header>";
    var achtung = '<section class="achtung"><h4>Darauf achten</h4><p><b>' + esc(a.regel) + "</b></p><p>Wenig sinnvoll ist die Idee:</p><ul>" + a.wenig.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul></section>";
    if (!k) {
      f.innerHTML = kopf + '<article class="blatt" aria-labelledby="idee-titel">' + titel +
        '<div class="spalte"><section class="teil"><h3>So geht es auf Papier</h3><p class="mass">' + esc(a.papier) + '</p></section><section class="kann-box"><h4>Und das Gerät?</h4><p>' + esc(a.geraet) + '</p><ul class="chips" aria-label="Prinzipien"><li class="kein">keines der sechs Prinzipien</li></ul></section>' + kniffDazu(a.id) + achtung + "</div>" +
        '<div class="spalte">' + erfahrung(a) + klappen(a, false) + auftrag(a, null) + "</div></article>";
      return;
    }
    f.innerHTML = kopf + '<article class="blatt" aria-labelledby="idee-titel">' + titel +
      '<div class="spalte">' +
      '<section class="teil"><h3>So setzt du es digital um</h3><ol class="ak-schritte">' + k.schritte.map(function (s) { return "<li><span>" + esc(s) + "</span></li>"; }).join("") + "</ol></section>" +
      '<section class="kann-box"><h4>Das trägt das Gerät bei</h4><p>' + esc(a.geraet) + '</p><ul class="chips" aria-label="Prinzipien">' + (kn.length ? a.hebel.map(function (h) { return '<li><a href="sechs-hebel.html#sh-' + h + '">' + esc(AUFGABEN.hebel[h]) + "</a></li>"; }).join("") : '<li class="kein">keines der sechs Prinzipien</li>') + "</ul></section>" +
      kniffDazu(a.id) +
      achtung +
      '<section class="teil"><h4>In anderen Fächern</h4><ul class="faecher">' + k.faecher.map(function (x) { return "<li><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></li>"; }).join("") + '</ul><p class="leise">Ausgedachte Beispiele zur Anregung – nicht erprobt.</p></section>' +
      erfahrung(a) + klappen(a, true) +
      "</div>" +
      '<div class="spalte"><div class="ak-probe"><div class="ak-probe-kopf"><h3>Probier es aus</h3><p>So fühlt es sich für Lernende an. Beispiel: ' + esc(k.demoFach) + ' · ausgedacht, nicht erprobt</p></div><div class="ak-geraet" id="demo"></div>' + auftrag(a, k) +
      "</div></div></article>";
    DEMO[a.id]($("#demo"));
  }

  function zeig(aendern, fokus) {
    var tun = function () { aendern(); linie(); karten(); detail(); };
    if (document.startViewTransition && !ruhig()) document.startViewTransition(tun).updateCallbackDone.then(nach, nach); else { tun(); nach(); }
    function nach() {
      var ziel = stand.kniff ? "kn-" + stand.kniff : stand.idee ? "k-" + stand.idee : ADR[stand.phase];
      if (location.hash.slice(1) !== ziel) { try { history.replaceState(null, "", "#" + ziel); } catch (e) { } }
      if (fokus === "idee") { var t = $("#idee-titel"); if (t) { t.focus({ preventScroll: true }); $("#fenster").scrollIntoView({ block: "start", behavior: ruhig() ? "auto" : "smooth" }); } }
      if (fokus === "karte") { var b = $('#ideen [data-idee="' + fokus2 + '"]') || $('#ideen [data-kniff="' + fokus2 + '"]'); if (b) b.focus({ preventScroll: true }); }
    }
  }
  var fokus2 = null;

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-phase]");
    if (b) { zeig(function () { stand.phase = b.getAttribute("data-phase"); stand.idee = null; stand.kniff = null; stand.von = null; }); return; }
    b = e.target.closest("[data-idee]");
    if (b) {
      var id = b.getAttribute("data-idee"), bild = b.querySelector(".ak-bild");
      if (bild) bild.style.viewTransitionName = "ak-bild";
      zeig(function () {
        stand.idee = id; stand.kniff = null; stand.von = null;
        var ki = KOFFER.ideen[id]; if (ki && stand.phase !== "alle" && ki.phasen.indexOf(stand.phase) < 0) stand.phase = ki.phasen[0];
      }, "idee"); return;
    }
    b = e.target.closest("[data-kniff]");
    if (b) {
      var kid = b.getAttribute("data-kniff"), bildK = b.querySelector(".ak-bild");
      if (bildK) bildK.style.viewTransitionName = "ak-bild";
      zeig(function () { stand.von = stand.idee || stand.von; stand.kniff = kid; stand.idee = null; }, "idee"); return;
    }
    b = e.target.closest("[data-zurueck]");
    if (b) { zurueck(); return; }
    b = e.target.closest("[data-kopieren]");
    if (b) {
      var feld = $("#auftrag"), st = $("#kopiert");
      var selbst = function () { feld.focus(); feld.select(); st.textContent = "Der Text ist markiert. Kopier ihn mit Strg + C (Mac: Cmd + C)."; };
      try { navigator.clipboard.writeText(feld.value).then(function () { st.textContent = "Kopiert. Füg ihn in dein KI-System ein."; }, selbst); } catch (x) { selbst(); }
    }
  });
  /* Zurück: aus einem Kniff, der aus einer Idee geöffnet wurde, zur Idee; sonst zu den Karten */
  function zurueck() {
    if (stand.kniff && stand.von) { var v = stand.von; zeig(function () { stand.idee = v; stand.kniff = null; stand.von = null; }, "idee"); return; }
    fokus2 = stand.kniff || stand.idee; zeig(function () { stand.idee = null; stand.kniff = null; stand.von = null; }, "karte");
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && (stand.idee || stand.kniff) && !e.target.closest("textarea,input,select")) zurueck(); });

  function ausAdresse() {
    var h = location.hash.slice(1);
    var kid = h.indexOf("kn-") === 0 ? h.slice(3) : (h.indexOf("m-") === 0 ? h.slice(2) : ""); // #m-… von muster.html (bis 4.45)
    if (kid && KN[kid]) {
      stand.kniff = kid; stand.idee = null; stand.von = null;
      if (JEDE.indexOf(kid) > -1) stand.phase = "jede";
      else { var heim = ideenMit(kid)[0], kh = heim && KOFFER.ideen[heim]; stand.phase = kh ? kh.phasen[0] : "alle"; }
      if (h.indexOf("m-") === 0) { try { history.replaceState(null, "", "#kn-" + kid); } catch (e) { } }
    }
    else if (h.indexOf("k-") === 0 && A[h.slice(2)]) { stand.idee = h.slice(2); stand.kniff = null; var ki = KOFFER.ideen[stand.idee]; if (ki && stand.phase !== "alle" && ki.phasen.indexOf(stand.phase) < 0) stand.phase = ki.phasen[0]; }
    else if (VON[h] && (h !== "jede-phase" || JEDE.length)) { stand.phase = VON[h]; stand.idee = null; stand.kniff = null; }
  }
  window.addEventListener("hashchange", function () { ausAdresse(); linie(); karten(); detail(); });

  /* ---------- Proben: kleine Beispiele zum Ausprobieren ---------- */
  var DEMO = {};
  function neu() { return '<button type="button" class="d-neu" data-neu>Noch einmal von vorn</button>'; }
  function bau(id, html, an) {
    DEMO[id] = function (r) {
      r.innerHTML = html + neu();
      r.onclick = null; r.oninput = null;
      an(r, function (s) { return r.querySelector(s); }, function (s) { return Array.prototype.slice.call(r.querySelectorAll(s)); });
      r.querySelector("[data-neu]").onclick = function () { DEMO[id](r); };
    };
  }
  function wahl(optionen, attr) { return optionen.map(function (o, i) { return '<button type="button" class="d-opt" ' + (attr || "data-o") + '="' + i + '" aria-pressed="false">' + esc(o) + "</button>"; }).join(""); }
  function druck(liste, b) { liste.forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); }

  bau("abruf",
    '<p class="d-frage">Letzte Stunde ging es um Vitalzeichen. Schreib ohne Hilfe auf: Welche vier misst du?</p><textarea rows="3" aria-label="Deine Antwort"></textarea><div class="d-zeile"><button type="button" class="knopf" data-a disabled>Merkzettel aufdecken</button><span class="d-hinweis" data-h>Erst schreiben, dann aufdecken.</span></div><div class="d-zu ak-zu" data-z aria-live="polite"><p><b>Merkzettel:</b> Puls · Blutdruck · Atmung · Körpertemperatur</p><p>Vergleich: Was hattest du? Was fehlt? Ergänz es in einer anderen Farbe.</p></div>',
    function (r, q) {
      q("textarea").oninput = function () { var ok = this.value.trim().length > 2; q("[data-a]").disabled = !ok; q("[data-h]").textContent = ok ? "Jetzt kannst du vergleichen." : "Erst schreiben, dann aufdecken."; };
      q("[data-a]").onclick = function () { q("[data-z]").classList.remove("ak-zu"); q("[data-h]").textContent = ""; this.disabled = true; };
    });

  bau("klassenbild",
    '<p class="d-frage">Bevor wir anfangen: Wie sicher bist du beim Prozentrechnen?</p><div class="d-wahl quer" data-w>' + wahl(["sicher", "geht so", "unsicher"]) + '</div><div data-b hidden></div>',
    function (r, q, qa) {
      qa("[data-o]").forEach(function (b) {
        b.onclick = function () {
          var ich = +b.getAttribute("data-o"), z = [9, 10, 5]; druck(qa("[data-o]"), b); qa("[data-o]").forEach(function (x) { x.disabled = true; });
          var farben = ["var(--lernen)", "var(--ki-platte)", "var(--flaeche)"], pk = [], s = "", n = 0;
          z.forEach(function (c, g) { for (var i = 0; i < c; i++) pk.push(g); }); pk.splice([0, 9, 19][ich], 0, "ich" + ich);
          [[52, 6], [76, 8], [100, 11]].forEach(function (rr) { for (var i = 0; i < rr[1]; i++) { var w = Math.PI * (i + .5) / rr[1], x = 150 - Math.cos(w) * rr[0] * 1.3, y = 122 - Math.sin(w) * rr[0], g = pk[n++], m = String(g).indexOf("ich") === 0; if (m) g = +String(g).slice(3); s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (m ? 11 : 8) + '" fill="' + farben[g] + '" stroke="#201f1d" stroke-width="' + (m ? 4 : 2) + '"/>'; } });
          var bx = q("[data-b]"); bx.hidden = false;
          bx.innerHTML = '<div class="d-rueck"><svg viewBox="0 0 300 132" role="img" aria-label="Bild der Klasse: 25 Stimmen im Halbrund" style="width:100%;max-width:26rem;justify-self:center">' + s + '</svg><ul class="legende"><li><i style="background:var(--lernen)"></i>sicher: ' + (9 + (ich === 0)) + '</li><li><i style="background:var(--ki-platte)"></i>geht so: ' + (10 + (ich === 1)) + '</li><li><i style="background:var(--flaeche)"></i>unsicher: ' + (5 + (ich === 2)) + '</li></ul><p>Der große Punkt bist du. Die anderen 24 Stimmen sind ausgedacht. Namen stehen nirgends.</p><p><b>Jetzt im Raum:</b> Was genau macht es schwer? Daraus wird der Plan für die Stunde.</p></div>';
        };
      });
    });

  bau("entscheiden",
    '<p class="d-frage">Bauecke in der Kita: Zwei Kinder ziehen an derselben Schaufel. Es wird laut, aber niemand wird verletzt. Was tust du?</p><div class="d-wahl quer" data-w1>' + wahl(["Ich greife sofort ein.", "Ich bleibe in der Nähe und warte kurz."]) + '</div><div data-s hidden><p>Wie sicher bist du?</p><div class="d-wahl quer">' + wahl(["sehr sicher", "eher sicher", "unsicher"], "data-si") + '</div></div><div class="d-zu ak-zu" data-z aria-live="polite"><p><b>So ging es in diesem Fall weiter:</b> Die Fachkraft kniet sich daneben und wartet. Nach kurzer Zeit holt ein Kind eine zweite Schaufel.</p><p><b>Jetzt im Raum:</b> Wer hat anders entschieden – und mit welchem Grund? Woran hättest du gemerkt, dass du doch eingreifen musst?</p></div>',
    function (r, q, qa) {
      qa("[data-o]").forEach(function (b) { b.onclick = function () { druck(qa("[data-o]"), b); q("[data-s]").hidden = false; }; });
      qa("[data-si]").forEach(function (b) { b.onclick = function () { druck(qa("[data-si]"), b); qa(".d-opt").forEach(function (x) { x.disabled = true; }); q("[data-z]").classList.remove("ak-zu"); }; });
    });

  bau("versuch",
    '<p class="d-frage">Wie schnell reagierst du auf ein Signal? Leg dich zuerst fest.</p><div class="d-wahl quer" data-w>' + wahl(["unter 0,3 Sekunden", "0,3 bis 0,5 Sekunden", "über 0,5 Sekunden"]) + '</div><button type="button" class="reiz" data-r hidden>Tipp hier, um zu starten</button><div data-e aria-live="polite"></div>',
    function (r, q, qa) {
      var tipp = -1, zeiten = [], t0 = 0, zu = 0, lage = "aus", feld = q("[data-r]");
      qa("[data-o]").forEach(function (b) { b.onclick = function () { tipp = +b.getAttribute("data-o"); druck(qa("[data-o]"), b); qa("[data-o]").forEach(function (x) { x.disabled = true; }); feld.hidden = false; }; });
      function warte() { lage = "warten"; feld.classList.remove("ak-jetzt"); feld.textContent = "Warte auf Petrol …"; zu = setTimeout(function () { lage = "jetzt"; t0 = performance.now(); feld.classList.add("ak-jetzt"); feld.textContent = "Jetzt tippen!"; }, 1200 + Math.random() * 1800); }
      feld.onpointerdown = function (e) {
        e.preventDefault();
        if (lage === "aus" || lage === "pause") return warte();
        if (lage === "warten") { clearTimeout(zu); lage = "pause"; feld.textContent = "Zu früh. Tipp, um es noch einmal zu versuchen."; return; }
        if (lage === "jetzt") {
          zeiten.push(performance.now() - t0); feld.classList.remove("ak-jetzt");
          if (zeiten.length < 3) { lage = "pause"; feld.textContent = "Messung " + zeiten.length + " von 3. Tipp für die nächste."; return; }
          lage = "ende"; feld.hidden = true;
          var m = zeiten.reduce(function (a, b) { return a + b; }, 0) / 3 / 1000, kl = m < .3 ? 0 : m <= .5 ? 1 : 2;
          q("[data-e]").innerHTML = '<div class="d-rueck"><p class="ak-gross">' + m.toFixed(2).replace(".", ",") + ' Sekunden</p><p>Das ist dein Mittel aus drei Messungen. ' + (kl === tipp ? "Deine Vermutung passt dazu." : "Vermutet hattest du etwas anderes.") + '</p><p><b>Zum Vergleich:</b> Im Labor liegen einfache Reaktionen auf ein Sehsignal meist bei rund einer Viertelsekunde. Am Tablet kommt die Verzögerung des Geräts dazu.</p><p><b>Jetzt im Raum:</b> Was zeigen drei Messungen – und was nicht?</p></div>';
        }
      };
      feld.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") feld.onpointerdown(e); };
    });

  bau("regler",
    '<p class="d-frage">1 000 Euro liegen 20 Jahre auf einem Konto mit 7 Prozent Zinsen im Jahr. Die Zinsen bleiben auf dem Konto. Wie viel ist es am Ende etwa?</p><div class="d-wahl quer" data-w>' + wahl(["etwa 2 400 Euro", "etwa 3 900 Euro", "etwa 7 000 Euro"]) + '</div><label for="zins"><b>Zinssatz: <span data-zs>7</span> Prozent</b> <span class="d-hinweis" data-h>Erst vermuten – dann gibt der Regler frei.</span></label><input id="zins" type="range" min="0" max="10" step="1" value="7" disabled><div data-e hidden><p class="ak-gross" data-g></p><div class="balken" role="img" aria-label="Anteil von Einzahlung und Zinsen"><i class="b1" data-b1></i><i class="b2" data-b2></i></div><ul class="legende" style="margin-top:.5rem"><li><i style="background:var(--karton)"></i>Einzahlung 1 000 Euro</li><li><i style="background:var(--lernen)"></i><span data-zt></span></li></ul><p data-t style="margin-top:.5rem"></p><p><b>Frage zum Schluss:</b> Was lässt dieses Modell weg? Zum Beispiel steigende Preise, Steuern und Zinsen, die sich ändern.</p></div>',
    function (r, q, qa) {
      var tipp = -1, rg = q("#zins");
      function rech() {
        var z = +rg.value, end = 1000 * Math.pow(1 + z / 100, 20), zi = end - 1000, f = function (n) { return Math.round(n).toLocaleString("de-DE").replace(/\./g, " "); };
        q("[data-zs]").textContent = z; q("[data-g]").textContent = f(end) + " Euro nach 20 Jahren";
        q("[data-b1]").style.width = (100000 / end) + "%"; q("[data-b2]").style.width = (100 - 100000 / end) + "%";
        q("[data-zt]").textContent = "Zinsen " + f(zi) + " Euro";
        q("[data-t]").textContent = z === 7 ? (tipp === 1 ? "Deine Vermutung passt: Zinsen auf Zinsen lassen den Betrag immer schneller wachsen." : tipp === 0 ? "2 400 Euro wären es ohne Zinsen auf Zinsen: 20 mal 70 Euro. Mit Zinseszins ist es deutlich mehr." : "So viel ist es nicht – aber mehr, als 20 mal 70 Euro ergeben würden.") : "Zieh weiter: Was ändert sich bei jedem Prozent – und wird der Abstand größer oder bleibt er gleich?";
      }
      qa("[data-o]").forEach(function (b) { b.onclick = function () { tipp = +b.getAttribute("data-o"); druck(qa("[data-o]"), b); qa("[data-o]").forEach(function (x) { x.disabled = true; }); rg.disabled = false; q("[data-h]").textContent = "Zieh am Regler."; q("[data-e]").hidden = false; rech(); }; });
      rg.oninput = rech;
    });

  bau("film",
    '<p class="d-frage">Der Viertaktmotor. Vermute zuerst: In wie vielen der vier Takte sind beide Ventile geschlossen?</p><div class="d-wahl quer" data-w>' + wahl(["in einem", "in zwei", "in drei"]) + '</div><p class="d-hinweis" data-h>So geht es gleich: Du ziehst selbst durch den Ablauf. Du kannst jederzeit anhalten und zurückgehen.</p><div class="motor"><svg viewBox="0 0 120 170" role="img" aria-label="Zylinder mit Kolben und zwei Ventilen"><rect x="25" y="30" width="70" height="120" fill="#f8f5ee" stroke="#201f1d" stroke-width="4"/><rect data-ein x="32" y="20" width="24" height="8" fill="#2f5d62"/><rect data-aus x="64" y="20" width="24" height="8" fill="#201f1d"/><path data-fu d="M60 4l-5 8h10l-5 9" fill="none" stroke="#b68235" stroke-width="4" opacity="0"/><g data-ko transform="translate(0,34)"><rect x="29" y="0" width="62" height="26" fill="#2f5d62"/><rect x="56" y="26" width="8" height="40" fill="#201f1d"/></g></svg><div><p class="ak-gross" data-n>Bereit</p><p data-s>Leg dich fest. Dann gibt der Regler frei.</p></div></div><label class="sr-only" for="takt">Durch den Ablauf ziehen</label><input id="takt" type="range" min="0" max="720" step="5" value="0" disabled><div data-e aria-live="polite"></div>',
    function (r, q, qa) {
      var rg = q("#takt"), tipp = -1, fertig = false;
      var T = [["1 · Ansaugen", "Der Kolben geht nach unten. Das Einlassventil ist offen: Luft und Kraftstoff strömen ein."], ["2 · Verdichten", "Der Kolben geht nach oben. Beide Ventile sind zu. Das Gemisch wird zusammengedrückt."], ["3 · Arbeiten", "Der Funke zündet. Der Druck schiebt den Kolben nach unten. Beide Ventile sind zu."], ["4 · Ausstoßen", "Der Kolben geht nach oben. Das Auslassventil ist offen: Das Abgas wird hinausgeschoben."]];
      function mal() {
        var w = +rg.value, t = Math.min(3, Math.floor(w / 180)), y = 34 + 60 * (1 - Math.cos(w * Math.PI / 180)) / 2;
        q("[data-ko]").setAttribute("transform", "translate(0," + y.toFixed(1) + ")");
        q("[data-ein]").setAttribute("y", t === 0 ? 8 : 20); q("[data-aus]").setAttribute("y", t === 3 ? 8 : 20);
        q("[data-fu]").setAttribute("opacity", w >= 355 && w <= 400 ? 1 : 0);
        q("[data-n]").textContent = T[t][0]; q("[data-s]").textContent = T[t][1];
        if (w >= 715 && !fertig) { fertig = true; q("[data-e]").innerHTML = '<div class="d-rueck"><p><b>In zwei Takten:</b> beim Verdichten und beim Arbeiten. ' + (tipp === 1 ? "Das hattest du vermutet." : "Zieh noch einmal zurück und achte nur auf die Ventile.") + "</p></div>"; }
      }
      qa("[data-o]").forEach(function (b) { b.onclick = function () { tipp = +b.getAttribute("data-o"); druck(qa("[data-o]"), b); qa("[data-o]").forEach(function (x) { x.disabled = true; }); rg.disabled = false; mal(); }; });
      rg.oninput = mal;
    });

  (function () {
    var S = ["Wer viel auf einmal lernt, vergisst schnell wieder.", "Besser ist es, den Stoff auf mehrere Tage zu verteilen.", "Zwischen den Lerntagen darf man ruhig etwas vergessen.", "Gerade das Wieder-Erinnern macht Wissen fest.", "Deshalb hilft es, sich selbst abzufragen, statt nur noch einmal zu lesen.", "Ein Plan mit kurzen festen Terminen macht das leichter."], LK = [1, 3, 4];
    bau("markieren",
      '<p class="d-frage">Suchauftrag: Was macht Lernen wirksam? Markier höchstens drei Stellen.</p><p class="d-text">' + S.map(function (s, i) { return '<button type="button" class="mark" data-m="' + i + '" aria-pressed="false">' + esc(s) + "</button> "; }).join("") + '</p><div class="d-zeile"><button type="button" class="knopf" data-v disabled>Mit der Lehrkraft vergleichen</button><span class="d-hinweis" data-h aria-live="polite">0 von 3 markiert</span></div><div data-e aria-live="polite"></div>',
      function (r, q, qa) {
        var zu = false;
        qa("[data-m]").forEach(function (b) {
          b.onclick = function () {
            if (zu) return; var an = b.getAttribute("aria-pressed") === "true", n = qa('[data-m][aria-pressed="true"]').length;
            if (!an && n >= 3) { q("[data-h]").textContent = "Drei sind genug. Tipp eine Markierung an, um sie zu lösen."; return; }
            b.setAttribute("aria-pressed", !an); n += an ? -1 : 1; q("[data-h]").textContent = n + " von 3 markiert"; q("[data-v]").disabled = n === 0;
          };
        });
        q("[data-v]").onclick = function () {
          zu = true; this.disabled = true; var gleich = 0;
          qa("[data-m]").forEach(function (b, i) { if (LK.indexOf(i) >= 0) { b.classList.add("lk"); if (b.getAttribute("aria-pressed") === "true") gleich++; } });
          q("[data-e]").innerHTML = '<div class="d-rueck"><ul class="legende"><li><i style="background:var(--ki-platte);border-radius:2px"></i>deine Markierung</li><li><i style="background:var(--lernen);border-radius:2px;height:.3rem;border:0;vertical-align:3px"></i>Markierung der Lehrkraft</li></ul><p>' + (gleich === 3 ? "Ihr habt dieselben drei Stellen gewählt." : "An " + gleich + " von 3 Stellen stimmt ihr überein.") + ' Das ist keine Bewertung.</p><p><b>Nächster Schritt:</b> Schreib zu einer Stelle, bei der ihr abweicht, eine Frage an den Rand.</p></div>';
        };
      });
  })();

  (function () {
    var K = [["Mia wirft den Baustein auf den Boden.", 0, "Das kann man sehen."], ["Mia ist wütend.", 1, "Wut sieht man nicht direkt. Man schließt sie aus dem, was Mia tut."], ["Jonas schaut zehn Sekunden zum Fenster.", 0, "Das kann man sehen und sogar messen."], ["Jonas langweilt sich.", 1, "Vielleicht denkt er nach. Der Grund ist eine Deutung."], ["Lea sagt: »Geh weg!«", 0, "Das kann man hören und wörtlich aufschreiben."], ["Lea mag Tom nicht.", 1, "Das ist ein Schluss aus einem Satz – eine Deutung."]];
    bau("zuordnen",
      '<p class="d-frage">Beobachtung oder Deutung? Tipp eine Karte an, dann das Feld.</p><div class="d-karten" data-st></div><div class="d-felder"><button type="button" class="d-feld" data-f="0"><b>Beobachtung</b></button><button type="button" class="d-feld" data-f="1"><b>Deutung</b></button></div><div class="d-zeile"><button type="button" class="knopf" data-p disabled>Zwischenstand prüfen</button><span class="d-hinweis" data-h aria-live="polite">Ab drei Karten kannst du prüfen.</span></div><div data-e aria-live="polite"></div>',
      function (r, q, qa) {
        var ort = K.map(function () { return -1; }), fest = K.map(function () { return false; }), gew = -1;
        function mal() {
          q("[data-st]").innerHTML = K.map(function (k, i) { return ort[i] < 0 ? '<button type="button" class="d-karte" data-k="' + i + '" aria-pressed="' + (gew === i) + '">' + esc(k[0]) + "</button>" : ""; }).join("") || '<span class="d-hinweis">Alle Karten liegen.</span>';
          [0, 1].forEach(function (f) { q('[data-f="' + f + '"]').innerHTML = "<b>" + (f ? "Deutung" : "Beobachtung") + "</b>" + K.map(function (k, i) { return ort[i] === f ? '<span class="lag' + (fest[i] ? " ok" : "") + '">' + esc(k[0]) + (fest[i] ? " – passt" : "") + "</span>" : ""; }).join(""); });
          var offen = ort.filter(function (o, i) { return o >= 0 && !fest[i]; }).length, liegt = ort.filter(function (o) { return o >= 0; }).length;
          q("[data-p]").disabled = !(liegt >= 3 && offen > 0);
        }
        r.onclick = function (e) {
          var k = e.target.closest("[data-k]"), f = e.target.closest("[data-f]");
          if (k) { gew = +k.getAttribute("data-k"); mal(); q("[data-h]").textContent = "Jetzt das Feld antippen."; }
          else if (f && gew >= 0) { ort[gew] = +f.getAttribute("data-f"); gew = -1; mal(); q("[data-h]").textContent = "Dein Stand ist gespeichert."; }
          else if (f) q("[data-h]").textContent = "Tipp zuerst eine Karte an.";
        };
        q("[data-p]").onclick = function (e) {
          e.stopPropagation(); var txt = [];
          ort.forEach(function (o, i) { if (o < 0 || fest[i]) return; if (o === K[i][1]) { fest[i] = true; } else { txt.push("<li><b>" + esc(K[i][0]) + "</b> liegt wieder im Stapel. " + esc(K[i][2]) + "</li>"); ort[i] = -1; } });
          mal(); var alle = fest.every(Boolean);
          q("[data-e]").innerHTML = '<div class="d-rueck' + (txt.length ? " warn" : " gut") + '">' + (txt.length ? "<p>Nur diese Karten gehen zurück – der Rest bleibt liegen:</p><ul style=\"margin:0;padding-left:1.2rem\">" + txt.join("") + "</ul>" : "<p>Alle geprüften Karten passen.</p>") + (alle ? "<p><b>Jetzt im Raum:</b> Bei welcher Karte warst du unsicher? Woran erkennt man eine Deutung?</p>" : "") + "</div>";
        };
        mal();
      });
  })();

  (function () {
    var T = [["Einstieg", "Inflation heißt: Die Preise steigen auf breiter Front. Für denselben Geldschein bekommst du weniger als vorher."], ["Vertiefung", "Inflation ist ein anhaltender Anstieg des allgemeinen Preisniveaus. Das Geld verliert an Kaufkraft. Gemessen wird sie an einem Warenkorb. Die Europäische Zentralbank strebt mittelfristig zwei Prozent an."], ["Kontroverse", "Ist ein wenig Inflation gut? Eine Sicht: Leicht steigende Preise halten die Wirtschaft in Gang, weil niemand Käufe aufschiebt. Die andere Sicht: Wer spart oder ein festes Einkommen hat, verliert Jahr für Jahr. Welche Sicht überzeugt dich – und für wen gilt sie?"]];
    bau("stufen",
      '<p class="d-frage">Was ist Inflation? Wähl deinen Zugang. Niemand sieht, welchen du nimmst.</p><div class="d-wahl quer" role="group" aria-label="Zugang">' + wahl(T.map(function (t) { return t[0]; })) + '</div><div class="d-rueck" data-t aria-live="polite"><p class="leise">Wähl einen Zugang.</p></div><details class="mehr"><summary>Hilfe: Was ist ein Warenkorb?</summary><div><p>Eine feste Liste von Dingen, die viele Haushalte kaufen – etwa Lebensmittel, Miete und Strom. Man vergleicht, was die Liste heute kostet und was sie früher gekostet hat.</p></div></details><p><b>Aufgabe für alle:</b> Erklär in zwei Sätzen, warum 100 Euro in zehn Jahren weniger wert sein können.</p>',
      function (r, q, qa) { qa("[data-o]").forEach(function (b) { b.onclick = function () { druck(qa("[data-o]"), b); q("[data-t]").innerHTML = "<p>" + esc(T[+b.getAttribute("data-o")][1]) + "</p>"; }; }); });
  })();

  (function () {
    var O = [["10", true, "Richtig. 20 Prozent sind ein Fünftel – und ein Fünftel von 50 ist 10."], ["2,5", false, "Du hast 50 durch 20 geteilt. Gesucht ist aber der Anteil: 20 von 100 – also ein Fünftel von 50."], ["30", false, "Du hast 20 von 50 abgezogen. Prozent heißt aber »von hundert«: 20 Prozent sind ein Anteil, kein fester Betrag."], ["1 000", false, "Du hast 20 mal 50 gerechnet. Es fehlt noch der Schritt »geteilt durch 100«."]];
    bau("auswahl",
      '<p class="d-frage">Wie viel sind 20 Prozent von 50?</p><div class="d-wahl">' + wahl(O.map(function (o) { return o[0]; })) + '</div><div data-e aria-live="polite"></div>',
      function (r, q, qa) {
        qa("[data-o]").forEach(function (b) {
          b.onclick = function () {
            var o = O[+b.getAttribute("data-o")]; druck(qa("[data-o]"), b);
            q("[data-e]").innerHTML = '<div class="d-rueck ' + (o[1] ? "gut" : "warn") + '"><p>' + esc(o[2]) + "</p>" + (o[1] ? "<p>Tipp trotzdem eine andere Antwort an: Zu jeder gibt es eine Erklärung.</p>" : "<p><b>Zweiter Versuch:</b> Wähl noch einmal.</p>") + "</div>";
          };
        });
      });
  })();

  (function () {
    var K = [["Was ist eine Hypothese?", "Eine begründete Vermutung, die man überprüfen kann."], ["Was sagt ein Operator in einer Aufgabe?", "Er sagt, was zu tun ist – zum Beispiel nennen, erklären oder beurteilen."], ["Was ist eine Primärquelle?", "Eine Quelle, die aus der untersuchten Zeit selbst stammt – etwa ein Brief oder ein Foto."]];
    bau("kartei",
      '<p class="d-frage" data-n></p><div class="flip" data-fl><div class="flip-in"><div class="flip-s" data-v></div><div class="flip-s hinten" data-hi></div></div></div><div class="d-zeile" data-z1><button type="button" class="knopf" data-um>Ich habe geantwortet – umdrehen</button><span class="d-hinweis">Sag die Antwort erst laut oder schreib sie auf.</span></div><div class="d-wahl quer" data-z2 hidden>' + wahl(["wusste ich", "teilweise", "noch nicht"]) + '</div><div data-e aria-live="polite"></div>',
      function (r, q, qa) {
        var i = 0, st = [[], [], []];
        function mal() { q("[data-fl]").classList.remove("um"); q("[data-n]").textContent = "Karte " + (i + 1) + " von " + K.length; q("[data-v]").textContent = K[i][0]; q("[data-hi]").textContent = ""; q("[data-z1]").hidden = false; q("[data-z2]").hidden = true; }
        q("[data-um]").onclick = function () { q("[data-hi]").textContent = K[i][1]; q("[data-fl]").classList.add("um"); q("[data-z1]").hidden = true; q("[data-z2]").hidden = false; };
        qa("[data-o]").forEach(function (b) {
          b.onclick = function () {
            st[+b.getAttribute("data-o")].push(K[i][0]); i++;
            if (i < K.length) return mal();
            q("[data-fl]").hidden = true; q("[data-z2]").hidden = true; q("[data-n]").textContent = "Dein Stapel ist sortiert.";
            var w = st[1].concat(st[2]);
            q("[data-e]").innerHTML = '<div class="d-rueck"><p>' + (w.length ? "<b>Diese Karten kommen morgen wieder:</b> " + w.map(esc).join(" · ") : "Alle drei Karten wandern ein Fach weiter. Sie kommen in ein paar Tagen wieder.") + "</p><p>Gezählt und verglichen wird nichts. Der Kasten zeigt nur dir, was du als Nächstes übst.</p></div>";
          };
        });
        mal();
      });
  })();

  (function () {
    var R = ["Ein Entwurf wird in den Bundestag eingebracht.", "Der Bundestag berät und stimmt ab.", "Der Bundesrat wird beteiligt.", "Der Bundespräsident unterschreibt.", "Das Gesetz wird im Bundesgesetzblatt verkündet."], MISCH = [3, 0, 4, 2, 1];
    bau("reihe",
      '<p class="d-frage">Wie entsteht ein Bundesgesetz? Tipp die Karten in der richtigen Folge an.</p><div class="d-karten" data-st></div><p><b>Dein Weg:</b> <span class="d-hinweis">Eine gelegte Karte antippen legt sie zurück.</span></p><div class="d-reihe" data-w></div><div class="d-zeile"><button type="button" class="knopf" data-p disabled>Zwischenstand prüfen</button></div><div data-e aria-live="polite"></div>',
      function (r, q) {
        var weg = [];
        function mal() {
          q("[data-st]").innerHTML = MISCH.map(function (i) { return weg.indexOf(i) < 0 ? '<button type="button" class="d-karte" data-k="' + i + '">' + esc(R[i]) + "</button>" : ""; }).join("") || '<span class="d-hinweis">Alle Karten liegen.</span>';
          q("[data-w]").innerHTML = weg.map(function (i, n) { return (n ? '<span class="pf" aria-hidden="true">dann</span>' : "") + '<button type="button" class="d-karte" data-z="' + n + '">' + esc(R[i]) + "</button>"; }).join("") || '<span class="d-hinweis">Noch leer.</span>';
          q("[data-p]").disabled = weg.length < 3;
        }
        r.onclick = function (e) {
          var k = e.target.closest("[data-k]"), z = e.target.closest("[data-z]");
          if (k) { weg.push(+k.getAttribute("data-k")); mal(); } else if (z) { weg.splice(+z.getAttribute("data-z"), 1); mal(); }
        };
        q("[data-p]").onclick = function (e) {
          e.stopPropagation(); var raus = weg.filter(function (i, n) { return i !== n; }), gut = weg.filter(function (i, n) { return i === n; });
          if (!raus.length && weg.length === R.length) { q("[data-e]").innerHTML = '<div class="d-rueck gut"><p>Der Weg stimmt.</p><p><b>Jetzt im Raum:</b> Sag zwischen zwei Karten, warum die eine vor der anderen kommt. Vereinfacht ist das Bild auch: Der Vermittlungsausschuss fehlt.</p></div>'; return; }
          weg = []; for (var n = 0; n < gut.length && gut[n] === n; n++) weg.push(n); mal();
          q("[data-e]").innerHTML = '<div class="d-rueck' + (raus.length ? " warn" : "") + '"><p>' + (raus.length ? "Liegen bleibt, was vom Anfang an stimmt: " + weg.length + (weg.length === 1 ? " Karte" : " Karten") + ". Der Rest liegt wieder im Stapel. Frag dich: Wer muss zustimmen, bevor unterschrieben wird?" : "Bis hierher stimmt die Folge. Leg weiter.") + "</p></div>";
        };
        mal();
      });
  })();

  (function () {
    var V = ["braucht", "erzeugt", "ist ein Teil von"], L = [["Fotosynthese", "Licht", 0], ["Fotosynthese", "Zucker", 1], ["Fotosynthese", "Sauerstoff", 1], ["Chlorophyll", "Blatt", 2]];
    bau("struktur",
      '<p class="d-frage">Leg die Begriffe zu einem Bild: Welches Wort gehört an jede Verbindung?</p><div class="netz" style="display:grid;gap:.625rem">' + L.map(function (l, i) { return '<div class="satz"><span class="beg">' + l[0] + '</span><label class="sr-only" for="v' + i + '">Verbindung ' + (i + 1) + '</label><select id="v' + i + '" data-v="' + i + '"><option value="">– wählen –</option>' + V.map(function (v, n) { return '<option value="' + n + '">' + v + "</option>"; }).join("") + '</select><span class="beg">' + l[1] + "</span></div>"; }).join("") + '</div><div class="d-zeile"><button type="button" class="knopf" data-p disabled>Mit dem Vorschlag vergleichen</button><span class="d-hinweis">Erst selbst legen. Der Vorschlag kommt danach.</span></div><div data-e aria-live="polite"></div>',
      function (r, q, qa) {
        r.oninput = function () { q("[data-p]").disabled = qa("[data-v]").some(function (s) { return s.value === ""; }); };
        q("[data-p]").onclick = function () {
          var ab = []; qa("[data-v]").forEach(function (s, i) { if (+s.value !== L[i][2]) ab.push("<li>Vorschlag: <b>" + L[i][0] + " " + V[L[i][2]] + " " + L[i][1] + ".</b> Du: »" + V[+s.value] + "«. Womit begründest du deine Wahl?</li>"); });
          q("[data-e]").innerHTML = '<div class="d-rueck">' + (ab.length ? "<p>Hier weicht der Vorschlag von deinem Bild ab:</p><ul style=\"margin:0;padding-left:1.2rem\">" + ab.join("") + "</ul>" : "<p>Dein Bild und der Vorschlag stimmen überein.</p>") + "<p>Der Vorschlag ist ein Vorschlag. <b>Jetzt im Raum:</b> Eine Struktur kommt nach vorne und wird Verbindung für Verbindung begründet.</p></div>";
        };
      });
  })();

  (function () {
    var S = ["Ich kann den Fachbegriff in eigenen Worten erklären.", "Ich kann ein eigenes Beispiel nennen.", "Ich kann den Begriff auf einen neuen Fall anwenden."], ST = ["noch nicht", "mit Hilfe", "allein", "kann ich erklären"],
      UE = ["Lies die Merkseite und schreib den Begriff in einem Satz auf – ohne abzuschreiben.", "Such zu zweit ein Beispiel aus eurem Alltag und prüft es an den Merkmalen.", "Nimm den neuen Fall von Station 3 und ordne ihn mit dem Begriff ein."];
    bau("einschaetzen",
      '<p class="d-frage">Mein Stand heute – nur für dich.</p>' + S.map(function (s, i) { return '<div class="ak-skala"><p>' + s + '</p><div class="d-wahl" role="group" aria-label="' + s + '">' + ST.map(function (t, n) { return '<button type="button" class="d-opt" data-s="' + i + '" data-n="' + n + '" aria-pressed="false">' + t + "</button>"; }).join("") + "</div></div>"; }).join("") + '<div data-e aria-live="polite"></div>',
      function (r, q, qa) {
        var w = [-1, -1, -1];
        qa("[data-s]").forEach(function (b) {
          b.onclick = function () {
            var i = +b.getAttribute("data-s"); w[i] = +b.getAttribute("data-n"); druck(qa('[data-s="' + i + '"]'), b);
            if (w.indexOf(-1) >= 0) return; var m = w.indexOf(Math.min.apply(null, w));
            q("[data-e]").innerHTML = '<div class="d-rueck"><p><b>Vorschlag für die nächsten zehn Minuten:</b> ' + (w[m] === 3 ? "Du fühlst dich überall sicher. Erklär den Begriff einer Person, die noch übt." : UE[m]) + "</p><p>Das ist eine Lernhilfe, keine Note. In zwei Wochen schätzt du dich noch einmal ein und siehst deinen Weg.</p></div>";
          };
        });
      });
  })();

  bau("einordnen",
    '<p class="d-frage">Neuer Fall: In der Bauecke legt die Erzieherin neue Bausteine dazu und schaut dann zu. Wer bestimmt hier das Spiel?</p><div class="pole"><span>das Kind</span><span>die Erwachsene</span></div><label class="sr-only" for="pol">Deine Einordnung zwischen »das Kind« und »die Erwachsene«</label><input id="pol" type="range" min="0" max="100" value="50"><div class="spur" data-sp hidden><i style="left:25%"></i><span style="left:25%">Vorschlag</span></div><div class="d-zeile" style="margin-top:.75rem"><button type="button" class="knopf" data-p>Festlegen und vergleichen</button></div><div data-e aria-live="polite"></div>',
    function (r, q) {
      q("[data-p]").onclick = function () {
        var v = +q("#pol").value, d = Math.abs(v - 25); q("#pol").disabled = true; this.disabled = true; q("[data-sp]").hidden = false;
        q("[data-e]").innerHTML = '<div class="d-rueck" style="margin-top:1.25rem"><p><b>Der Vorschlag liegt nah beim Kind.</b> Begründung: Die Bausteine sind ein Angebot. Was daraus wird, entscheiden die Kinder.</p><p>' + (d <= 12 ? "Du liegst nah am Vorschlag." : v > 25 ? "Du siehst mehr Einfluss bei der Erwachsenen. An welchem Merkmal machst du das fest?" : "Du siehst noch mehr beim Kind. An welchem Merkmal machst du das fest?") + " Der Vorschlag ist ein Vorschlag.</p></div>";
      };
    });

  bau("video",
    '<p class="d-frage">Dein Plan für zwei Minuten: Erklär einen Begriff für jemanden, der gefehlt hat.</p><label for="p1">1 · Der eine Satz, der hängen bleiben soll</label><input id="p1" type="text" data-i><label for="p2">2 · Mein Beispiel</label><input id="p2" type="text" data-i><label for="p3">3 · Das zeige ich im Bild</label><input id="p3" type="text" data-i><div class="d-rueck" data-e aria-live="polite"><p class="leise">Füll die drei Felder aus. Erst dann wird aufgenommen.</p></div>',
    function (r, q, qa) {
      r.oninput = function () {
        var f = qa("[data-i]"), voll = f.every(function (x) { return x.value.trim().length > 2; }), n = f.map(function (x) { return x.value.trim(); }).join(" ").split(/\s+/).filter(Boolean).length;
        q("[data-e]").innerHTML = voll ? "<p><b>Dein Plan steht.</b> Bisher " + n + " Wörter. Bei ruhigem Sprechen sind zwei Minuten etwa 250 Wörter – du hast also Platz für dein Beispiel, aber nicht für alles.</p><p>Jetzt aufnehmen: höchstens zwei Minuten, Wiederholen ist erlaubt. Die Aufnahme ist der kleinste Teil.</p>" : '<p class="leise">Füll die drei Felder aus. Erst dann wird aufgenommen.</p>';
      };
    });

  /* ---------- Start ---------- */
  $("#ohne-liste").innerHTML = KOFFER.ohneGeraet.map(function (id) { var a = A[id]; return '<li><button type="button" class="textknopf" data-idee="' + id + '">' + esc(a.name) + "</button> " + esc(a.geraet) + "</li>"; }).join("");
  var kl = $("#kniffe-liste");
  if (kl) {
    var alleK = Object.keys(KN);
    kl.innerHTML = alleK.map(function (kid) { return '<li><button type="button" class="textknopf" data-kniff="' + kid + '">' + esc(KN[kid].name) + "</button></li>"; }).join("");
    var kb = $("#kniffe-block"); if (kb) kb.hidden = !alleK.length;
  }
  var quellen = $("#koffer-quellen");
  if (quellen) quellen.innerHTML = AUFGABEN.quellen.map(function (q) { return "<li>" + esc(q.text) + (q.ort ? ' <span class="leise">' + esc(q.ort) + "</span>" : "") + "</li>"; }).join("");
  ausAdresse(); linie(); karten(); detail();
})();
