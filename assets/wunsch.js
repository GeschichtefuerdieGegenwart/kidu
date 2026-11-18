/* Kidu – Die Wunsch-Methode (ab Version 4.52, wunsch-methode.html; KI-Training · Phase »Grundlagen«).
   Das Modell »Vier Sätze, drei Kreise« als Zeichnung zum Antippen. Daten: WUNSCH (assets/daten/wunsch.js) – die eine Quelle.

   Die Zeichnung (.wm-bild): ein Halbrund. Unten in der Mitte steht die Lampe. Vier Sätze sind vier Fächer von links nach
   rechts (Wissen · Sagen · Prüfen · Verantworten), drei Kreise sind drei Bögen von innen nach außen (Für mich · Für meine
   Lernenden · Für andere). Das ergibt zwölf Felder; jedes ist ein Sprung zu seiner Karte. Gefüllt in Ocker: die fünf Felder
   der Grundausstattung (steht auch als Wort darunter). Zwischen »Sagen« und »Prüfen« steigt der Rauch der Lampe auf:
   Dort endet das Märchen. Alle Wörter stehen als HTML über dem Bild (Text bleibt Text, nie unter 16 Pixel).
   Neben der Zeichnung steht in Ruhe die Geschichte von der Lampe (.wm-ruhe). Tippt man ein Feld an, steht an ihrer Stelle
   das Arbeitsfenster (.wm-wechsel) mit der Karte des Feldes – ab 1180 px links neben der Zeichnung, darunter unter ihr (Grow-in-Place: sie wächst aus der Richtung des Feldes, --dauer-mittel; per Tastatur und bei
   »weniger Bewegung« ohne Lageänderung). Das Feld bekommt seine versetzte Platte in Druckschwarz und aria-current.
   Noch einmal antippen, »Schließen« oder Escape schließt; der Fokus geht an das Feld zurück. Die Adresse merkt das Feld
   (#feld-…), »Zurück« im Browser funktioniert.
   »Wo stehst du?«: drei Bilder, eines je Kreis, mit je vier Aussagen (Verhalten in den letzten vier Wochen) und »Nichts davon«.
   Erst nach dem dritten Bild zeigt die Zeichnung an jedem Feld ein Zeichen (✓ / ○) und das Fenster die Karte in Worten:
   »Darauf achtest du schon« und »Das lohnt sich anzusehen« mit bis zu drei nächsten Schritten (naechste()).
   Kein Gesamtstand, keine Zahl, keine Stufe. Gespeichert werden nur die angetippten Aussagen, unter »hilde.wunsch«
   (die Fußzeile »Eingaben löschen« nimmt es mit).
   Schmal (Fenster unter 720 px) fällt die Zeichnung weg; dann ist die Liste der zwölf Felder die Bedienung.
   Ohne JavaScript: tools/wunsch.py setzt beim Bauen html() ein – Zeichnung und alle zwölf Felder untereinander;
   die Felder der Zeichnung sind Sprünge in die Liste.

   feld(id) · titel(feld)   ein Feld und sein Name (»Wissen · Für mich«)
   naechste(schon)          bis zu drei Felder als nächste Schritte: die ersten aus WUNSCH.reihenfolge, die nicht in »schon« stehen
   geometrie()              Maße und Pfade der Zeichnung (für Bau und Tests)
   html()                   { bild, liste, lampe } – für den Bau
   Keine KI-Anbindung, keine Anbieternamen. Tests: tests/wunsch.test.js */
(function (wurzel) {
  "use strict";
  var imKnoten = typeof module !== "undefined" && typeof require !== "undefined";
  var W = imKnoten ? require("./daten/wunsch.js") : wurzel.WUNSCH;
  if (!W) return;

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function nach(liste, id) { for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i]; return null; }
  function satz(id) { return nach(W.saetze, id); }
  function kreis(id) { return nach(W.kreise, id); }
  function feld(id) { return nach(W.felder, id); }
  function titel(f) { return satz(f.satz).wort + " · " + kreis(f.kreis).name; }
  /* Als Überschrift: Der Punkt bleibt beim Wort des Satzes, der Name des Kreises bricht nicht – so beginnt keine Zeile mit »·«. */
  function titelHtml(f) { return '<span class="wm-nb">' + esc(satz(f.satz).wort) + " ·</span> " + '<span class="wm-nb">' + esc(kreis(f.kreis).name) + "</span>"; }

  /* Nächste Schritte: die ersten drei Felder der Reihenfolge, die noch nicht angetippt sind. */
  function naechste(schon) {
    var hat = {};
    (schon || []).forEach(function (id) { hat[id] = true; });
    return W.reihenfolge.filter(function (id) { return !hat[id]; }).slice(0, 3);
  }

  /* ---------- Zeichnung: Maße ---------- */
  var G = { B: 880, H: 448, cx: 440, cy: 338, R: [85, 150, 215, 280], spalt: 5, kanal: 9, winkel: [180, 135, 90, 45, 0] };
  function z(n) { return Math.round(n * 10) / 10; }
  function punkt(r, a) { var t = a * Math.PI / 180; return [G.cx + r * Math.cos(t), G.cy - r * Math.sin(t)]; }
  function xy(p) { return z(p[0]) + " " + z(p[1]); }
  function drehung(d, r) { return Math.asin(d / r) * 180 / Math.PI; }
  /* Ein Feld: Fach s (0 = Wissen … 3 = Verantworten) im Ring k (0 = Für mich … 2 = Für andere).
     Zwischen den Feldern bleibt ein Spalt; in der Mitte, wo der Rauch aufsteigt, ein breiterer Kanal. */
  function feldPfad(s, k) {
    var aL = G.winkel[s], aR = G.winkel[s + 1];
    var dL = s === 0 ? 0 : (aL === 90 ? G.kanal : G.spalt / 2);
    var dR = s === 3 ? 0 : (aR === 90 ? G.kanal : G.spalt / 2);
    var ri = G.R[k] + G.spalt / 2, ra = G.R[k + 1] - G.spalt / 2;
    var p1 = punkt(ri, aL - drehung(dL, ri)), p2 = punkt(ra, aL - drehung(dL, ra));
    var p3 = punkt(ra, aR + drehung(dR, ra)), p4 = punkt(ri, aR + drehung(dR, ri));
    return "M" + xy(p1) + "L" + xy(p2) + "A" + ra + " " + ra + " 0 0 1 " + xy(p3) + "L" + xy(p4) + "A" + ri + " " + ri + " 0 0 0 " + xy(p1) + "Z";
  }
  function feldMitte(s, k) { return punkt((G.R[k] + G.R[k + 1]) / 2, (G.winkel[s] + G.winkel[s + 1]) / 2); }
  function proz(p) { return "left:" + z(p[0] / G.B * 100) + "%;top:" + z(p[1] / G.H * 100) + "%"; }

  function geometrie() {
    var felder = {};
    W.saetze.forEach(function (s, si) {
      W.kreise.forEach(function (k, ki) {
        felder[s.id + "-" + k.id] = { pfad: feldPfad(si, ki), mitte: feldMitte(si, ki) };
      });
    });
    return { breite: G.B, hoehe: G.H, mitte: [G.cx, G.cy], radien: G.R.slice(), felder: felder };
  }

  /* Die Lampe: eine Öllampe, selbst gezeichnet. Darunter dieselbe Form als versetzte Ocker-Platte (Überdruck). */
  var LAMPE = '<path d="M-13 -5H13L8 -12H-8Z"/>' +
    '<path d="M-34 -29C-30 -16 -13 -12 0 -12C15 -12 30 -17 34 -29C23 -35 -23 -35 -34 -29Z"/>' +
    '<path d="M-31 -26C-42 -25 -47 -31 -54 -42L-49 -45C-44 -37 -39 -34 -31 -33Z"/>' +
    '<path d="M-12 -33C-8 -42 8 -42 12 -33Z"/><circle cx="0" cy="-45" r="3"/>';
  var HENKEL = "M33 -29C47 -34 49 -17 36 -18";
  /* Der Rauch: steigt aus der Tülle, dreht in die Mitte und zieht zwischen »Sagen« und »Prüfen« nach oben. */
  var RAUCH = "M-62 -54C-62 -62 -56 -67 -47 -67C-35 -67 -28 -72 -18 -75C-10 -78 -5 -86 -3 -96C0 -108 -6 -118 -2 -132" +
    "C2 -146 5 -158 0 -172C-5 -188 -6 -202 0 -216C6 -230 5 -244 0 -256C-4 -266 -4 -276 1 -285C5 -294 14 -295 15 -287C16 -280 8 -278 7 -284";

  function bild() {
    var g = geometrie();
    var platten = "", felder = "", zeichen = "";
    W.saetze.forEach(function (s) {
      W.kreise.forEach(function (k) {
        var f = feld(s.id + "-" + k.id), geo = g.felder[f.id];
        platten += '<path class="wm-platte" data-platte="' + f.id + '" d="' + geo.pfad + '" transform="translate(6 6)"/>';
        felder += '<a class="wm-feld' + (f.grund ? " ist-grund" : "") + '" href="#feld-' + f.id + '" data-feld="' + f.id + '" data-kreis="' + k.id +
          '" aria-label="' + esc(titel(f) + (f.grund ? " – gehört zur Grundausstattung" : "")) + '">' +
          '<path class="wm-feld-form" d="' + geo.pfad + '"/><path class="wm-feld-ring" d="' + geo.pfad + '"/></a>';
        zeichen += '<span class="wm-zeichen" data-zeichen="' + f.id + '" style="' + proz(geo.mitte) + '" aria-hidden="true" hidden></span>';
      });
    });
    var rA = G.R[3];
    var worte = [["wissen", 157.5, "rechts", 14], ["sagen", 120, "unten", 16], ["pruefen", 60, "unten", 16], ["verantworten", 22.5, "links", 14]].map(function (x) {
      return '<span class="wm-wort wm-anker-' + x[2] + '" data-wort="' + x[0] + '" style="' + proz(punkt(rA + x[3], x[1])) + '" aria-hidden="true">' + esc(satz(x[0]).wort) + "</span>";
    }).join("");
    /* Namen der Kreise: unter der Grundlinie rechts, als Treppe von innen nach außen – je ein Strich von der Mitte des Bogens
       hinunter zu seinem Namen. Die Namen stehen links von ihrem Strich: So kreuzt kein Strich einen Namen (Line-to-Target). */
    var mitten = [0, 1, 2].map(function (k) { return G.cx + (G.R[k] + G.R[k + 1]) / 2; });
    var reihe = [G.cy + 30, G.cy + 60, G.cy + 90];
    var striche = "", namen = "";
    W.kreise.forEach(function (k, i) {
      striche += '<path d="M' + z(mitten[i]) + " " + (G.cy + 4) + "V" + reihe[i] + "h-8" + '"/>';
      namen += '<span class="wm-kreisname wm-anker-rechts" data-kreisname="' + k.id + '" style="' + proz([mitten[i] - 14, reihe[i]]) + '" aria-hidden="true">' + esc(k.name) + "</span>";
    });
    return '<div class="wm-bild" id="wm-bild">' +
      '<svg class="wm-bild-svg" viewBox="0 0 ' + G.B + " " + G.H + '" role="group" aria-label="Die zwölf Felder – tipp eines an" focusable="false">' +
      '<g class="wm-platten" aria-hidden="true">' + platten + "</g>" + felder +
      '<g class="wm-striche" aria-hidden="true">' + striche + "</g>" +
      '<g class="wm-lampe" aria-hidden="true" transform="translate(' + G.cx + " " + G.cy + ')">' +
      '<path class="wm-rauch-platte" d="' + RAUCH + '" transform="translate(3 3)"/><path class="wm-rauch" d="' + RAUCH + '"/>' +
      '<g transform="scale(1.2)"><g class="wm-lampe-platte" transform="translate(2.5 2.5)">' + LAMPE + "</g>" +
      '<g class="wm-lampe-linie">' + LAMPE + '<path class="wm-henkel" d="' + HENKEL + '"/></g></g></g>' +
      "</svg>" + worte + namen +
      '<span class="wm-maerchen wm-anker-unten" style="' + proz([G.cx, G.cy - rA - 24]) + '" aria-hidden="true">Hier endet das Märchen</span>' +
      '<span class="wm-legende wm-anker-rechts" style="' + proz([G.cx - G.R[0], reihe[0]]) + '" aria-hidden="true"><i></i>Grundausstattung</span>' +
      zeichen + "</div>";
  }

  /* ---------- Karte eines Feldes (in der Liste und im Arbeitsfenster) ---------- */
  function wege(liste) {
    return liste.map(function (w) { return '<a class="textlink" href="' + esc(w[0]) + '">' + esc(w[1]) + ' <span aria-hidden="true">→</span></a>'; }).join(" ");
  }
  /* marken: im Arbeitsfenster stehen »Grundausstattung« und der Stand in der Zeile des Satzes (spart am Beamer eine Zeile). */
  function karteInnen(f, marken) {
    var s = satz(f.satz);
    var zeitSchritt = W.zeiten.kurz + (f.schritt.ohneKi ? " · geht ohne KI" : "");
    return '<p class="wm-unterzeile"><b class="wm-karte-satz">' + esc(s.satz) + "</b>" + (marken || "") + "</p>" +
      '<p class="wm-kann">' + esc(f.kann) + "</p>" +
      '<div class="wm-teil wm-schritt"><p class="wm-teil-titel"><b>Dein erster Schritt</b> <span class="wm-zeit"><span class="sr-only">Zeitbedarf, geschätzt: </span>' + esc(zeitSchritt) + "</span></p>" +
      "<p>" + esc(f.schritt.text) + "</p>" + (f.schritt.wo ? '<p class="wm-wege">' + wege([f.schritt.wo]) + "</p>" : "") + "</div>" +
      '<p class="wm-beispiel"><b>Zum Beispiel:</b> ' + esc(f.beispiel) + "</p>" +
      '<div class="wm-teil wm-uebung"><p class="wm-teil-titel"><b>Die Übung dazu</b> <span class="wm-zeit"><span class="sr-only">Zeitbedarf, geschätzt: </span>' + esc(W.zeiten[f.uebung.zeit]) + "</span></p>" +
      "<p>" + esc(f.uebung.text) + "</p>" +
      (f.uebung.wo.length ? '<p class="wm-wege">' + wege(f.uebung.wo) + "</p>" : '<p class="wm-fehlt">Dafür gibt es in Kidu noch kein eigenes Werkzeug.</p>') + "</div>" +
      '<p class="wm-kniff"><b>Der Kniff dazu:</b> ' + esc(f.kniff) + "</p>";
  }
  function liste() {
    return W.kreise.map(function (k) {
      return '<section class="wm-kreis" id="kreis-' + k.id + '" aria-labelledby="t-kreis-' + k.id + '">' +
        '<h3 id="t-kreis-' + k.id + '">' + esc(k.name) + "</h3>" +
        '<p class="wm-kreis-satz">' + esc(k.meint) + " " + esc(k.folge) + "</p>" +
        '<div class="wm-karten">' + W.felder.filter(function (f) { return f.kreis === k.id; }).map(function (f) {
          return '<details class="wm-karte" id="feld-' + f.id + '" data-karte="' + f.id + '">' +
            '<summary><span class="wm-karte-name">' + titelHtml(f) + "</span>" +
            (f.grund ? '<span class="wm-marke">Grundausstattung</span>' : "") +
            '<span class="wm-stand" data-stand="' + f.id + '"></span></summary>' +
            '<div class="wm-karte-innen">' + karteInnen(f) + "</div></details>";
        }).join("") + "</div></section>";
    }).join("");
  }
  function lampe() { return '<ol class="wm-lampe-liste">' + W.lampe.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>"; }
  /* ---------- Ab 4.53: die Zeichnung als Blickfang des KI-Trainings und als kleine Karte auf den Werkzeugseiten ---------- */
  /* Dieselbe Zeichnung, aber jedes Feld führt auf die Seite der Wunsch-Methode. */
  function start() {
    return bild().replace(/href="#feld-/g, 'href="wunsch-methode.html#feld-').replace('id="wm-bild"', 'id="ki-wm-bild"')
      .replace("Die zwölf Felder – tipp eines an", "Die zwölf Felder der Wunsch-Methode – tipp eines an");
  }
  /* Kleine Karte ohne Wörter: alle zwölf Felder, die genannten hervorgehoben. Nur Bild; der Text steht daneben. */
  function mini(an) {
    var g = geometrie(), hat = {};
    an.forEach(function (id) { hat[id] = true; });
    var p = W.felder.map(function (f) { return '<path' + (hat[f.id] ? ' class="ist-an"' : "") + ' d="' + g.felder[f.id].pfad + '"/>'; }).join("");
    return '<svg class="wm-mini" viewBox="154 52 572 292" aria-hidden="true" focusable="false">' + p + "</svg>";
  }
  /* Drei Einstiege, einer je Kreis: wer anfängt, wer Lernende mit KI hat, wer für andere baut. Keine Stufen – drei Anliegen. */
  function einstiege() {
    return '<ul class="ki-einstiege">' + W.kreise.map(function (k) {
      var ids = W.felder.filter(function (f) { return f.kreis === k.id; }).map(function (f) { return f.id; });
      return '<li class="ki-einstieg" data-einstieg="' + k.id + '">' + mini(ids) +
        '<div class="ki-einstieg-text"><b class="ki-einstieg-ich">' + esc(k.einstieg.ich) + "</b>" +
        '<span class="ki-einstieg-kreis">Kreis »' + esc(k.name) + "«</span>" +
        '<span class="ki-einstieg-wege">' + wege(k.einstieg.wege) + "</span></div></li>";
    }).join("") + "</ul>";
  }
  /* Je Werkzeugseite: welche Felder sie übt (aus den Wegen der Felder). Datei → kleine Karte mit Link. */
  function orte() {
    var nach = {};
    W.felder.forEach(function (f) {
      var ziele = (f.schritt.wo ? [f.schritt.wo] : []).concat(f.uebung.wo || []);
      ziele.forEach(function (w) {
        var datei = w[0].split("#")[0];
        if (!nach[datei]) nach[datei] = [];
        if (nach[datei].indexOf(f.id) < 0) nach[datei].push(f.id);
      });
    });
    var aus = {};
    Object.keys(nach).forEach(function (datei) {
      var ids = nach[datei];
      var ziel = ids.length === 1 ? "wunsch-methode.html#feld-" + ids[0] : "wunsch-methode.html";
      var wort = ids.length <= 2 ? ids.map(function (id) { return titel(feld(id)); }).join(" und ") : ids.length + " Felder der Wunsch-Methode";
      aus[datei] = '<a class="ort-karte" href="' + ziel + '">' + mini(ids) + '<span>Auf der Karte: <b>' + esc(wort) + "</b></span></a>";
    });
    return aus;
  }
  function html() { return { bild: bild(), liste: liste(), lampe: lampe(), start: start(), einstiege: einstiege(), orte: orte() }; }

  var api = { feld: feld, titel: titel, naechste: naechste, geometrie: geometrie, karteInnen: karteInnen, html: html, orte: orte };
  if (imKnoten) module.exports = api; else wurzel.WUNSCH_SEITE = api;
  if (typeof document === "undefined") return;

  /* ====================== Verhalten im Browser ====================== */
  var doc = document, root = doc.documentElement;
  var seite = doc.getElementById("wm-seite"), buehne = doc.getElementById("wm-buehne"), bildEl = doc.getElementById("wm-bild");
  var ruhe = doc.getElementById("wm-ruhe"), wechsel = doc.getElementById("wm-wechsel"), listeEl = doc.getElementById("wm-liste");
  if (!seite || !buehne || !bildEl || !ruhe || !wechsel || !listeEl) return;
  var SCHLUESSEL = "hilde.wunsch";
  var FELDER = [].slice.call(bildEl.querySelectorAll(".wm-feld"));
  var start = doc.getElementById("wm-start"), wieder = doc.getElementById("wm-wieder"), alle = doc.getElementById("wm-alle");
  var offen = null;      /* ID des offenen Feldes */
  var modus = "ruhe";    /* ruhe · feld · frage · ergebnis */
  var bildNr = 0;        /* 0–2: welches Bild von »Wo stehst du?« */
  var wahl = {};         /* während der drei Bilder: Kreis → Liste der angetippten Felder */
  var anlass = null;     /* letzte Handlung: { el, tastatur } – für Fokus und Bewegung */

  function ruhig() {
    return root.getAttribute("data-bewegung") === "weniger" ||
      !!(wurzel.matchMedia && wurzel.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function mitBild() { return bildEl.offsetWidth > 0; }
  /* Ab 1180 px steht das Fenster links neben der Zeichnung; darunter steht es unter ihr. */
  function nebeneinander() { return mitBild() && !wechsel.hidden && wechsel.getBoundingClientRect().right <= bildEl.getBoundingClientRect().left + 2; }
  function laden() {
    try { var t = JSON.parse(localStorage.getItem(SCHLUESSEL) || "null"); return t && Array.isArray(t.schon) ? t.schon.filter(function (id) { return !!feld(id); }) : null; }
    catch (e) { return null; }
  }
  function speichern(schon) {
    try { if (schon) localStorage.setItem(SCHLUESSEL, JSON.stringify({ schon: schon })); else localStorage.removeItem(SCHLUESSEL); }
    catch (e) { /* ohne Speicher geht es auch */ }
  }
  var schon = laden();   /* null = »Wo stehst du?« noch nicht beantwortet */

  /* Zeichen an den Feldern: erst nach dem dritten Bild (erst festlegen, dann zeigen). Immer als Zeichen und als Wort. */
  function standWort(id) { return schon.indexOf(id) >= 0 ? "mache ich schon" : "noch nicht"; }
  function zeichneStand() {
    var da = !!schon;
    seite.classList.toggle("wm-mit-stand", da);
    [].forEach.call(bildEl.querySelectorAll("[data-zeichen]"), function (el) {
      var id = el.getAttribute("data-zeichen");
      el.hidden = !da;
      el.textContent = da ? (schon.indexOf(id) >= 0 ? "✓" : "○") : "";
      el.classList.toggle("ist-schon", da && schon.indexOf(id) >= 0);
    });
    FELDER.forEach(function (a) {
      var f = feld(a.getAttribute("data-feld"));
      a.setAttribute("aria-label", titel(f) + (f.grund ? " – gehört zur Grundausstattung" : "") + (da ? " – " + standWort(f.id) : ""));
    });
    [].forEach.call(listeEl.querySelectorAll("[data-stand]"), function (el) {
      var id = el.getAttribute("data-stand");
      el.textContent = da ? (schon.indexOf(id) >= 0 ? "✓ mache ich schon" : "○ noch nicht") : "";
    });
    var legende = doc.getElementById("wm-stand-legende");
    if (legende) legende.hidden = !da;
    if (wieder) wieder.hidden = !da;
    if (start) start.textContent = da ? "Noch einmal: Wo stehst du?" : "Wo stehst du?";
  }

  function markiere() {
    FELDER.forEach(function (a) {
      var an = a.getAttribute("data-feld") === offen;
      if (an) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    [].forEach.call(bildEl.querySelectorAll("[data-platte]"), function (p) { p.classList.toggle("ist-gewaehlt", p.getAttribute("data-platte") === offen); });
    bildEl.removeAttribute("data-zeigt");
    if (modus === "frage") bildEl.setAttribute("data-zeigt", W.kreise[bildNr].id);
    /* Wie Zeile und Spalte einer Tabelle: Das Wort des Satzes und der Name des Kreises sind unterstrichen, solange ein Feld offen ist
       (bei »Wo stehst du?« der Kreis, um den es gerade geht). */
    var f = offen ? feld(offen) : null, k = modus === "frage" ? W.kreise[bildNr].id : (f ? f.kreis : "");
    [].forEach.call(bildEl.querySelectorAll("[data-wort]"), function (el) { el.classList.toggle("ist-an", !!f && el.getAttribute("data-wort") === f.satz); });
    [].forEach.call(bildEl.querySelectorAll("[data-kreisname]"), function (el) { el.classList.toggle("ist-an", el.getAttribute("data-kreisname") === k); });
  }

  /* Inhalt des Fensters wechseln. Bewegung nur nach Maus oder Finger; bei Tastatur und »weniger Bewegung« steht er sofort da. */
  function zeige(htmlText, von) {
    /* Die Geschichte von der Lampe bleibt im Dokument. Nebeneinander tritt das Fenster an ihre Stelle (CSS, .hat-wechsel);
       untereinander bleibt sie über der Zeichnung stehen, damit beim Antippen nichts springt. */
    buehne.classList.toggle("hat-wechsel", modus !== "ruhe");
    wechsel.hidden = modus === "ruhe";
    wechsel.innerHTML = modus === "ruhe" ? "" : htmlText;
    wechsel.classList.remove("wm-wachsen", "wm-blenden");
    if (modus !== "ruhe" && anlass && !anlass.tastatur) {
      if (ruhig()) wechsel.classList.add("wm-blenden");
      else {
        var ziel = wechsel.getBoundingClientRect(), ox = "50%", oy = "0%";
        if (von && von.getBoundingClientRect && ziel.width) {
          var q = von.getBoundingClientRect();
          ox = Math.round((q.left + q.width / 2 - ziel.left) / ziel.width * 100) + "%";
          oy = Math.round((q.top + q.height / 2 - ziel.top) / Math.max(ziel.height, 1) * 100) + "%";
        }
        wechsel.style.transformOrigin = ox + " " + oy;
        void wechsel.offsetWidth; /* Neustart der Bewegung */
        wechsel.classList.add("wm-wachsen");
      }
    }
    markiere();
    var kopf = modus === "ruhe" ? null : wechsel.querySelector(".wm-fenster-titel");
    if (kopf) {
      kopf.focus({ preventScroll: true });
      /* Der Anfang des Fensters ist zu sehen: nebeneinander zusammen mit der Zeichnung, untereinander das Fenster selbst. */
      var wie = ruhig() || (anlass && anlass.tastatur) ? "auto" : "smooth";
      var ziel2 = nebeneinander() ? buehne : wechsel, oben = ziel2.getBoundingClientRect().top;
      if (oben < 0) ziel2.scrollIntoView({ block: "start", behavior: wie });
      else if (ziel2 === wechsel) wechsel.scrollIntoView({ block: "nearest", behavior: wie });
    }
  }

  /* ---------- Feld öffnen und schließen ---------- */
  function nachbar(f) {
    var i = W.kreise.map(function (k) { return k.id; }).indexOf(f.kreis);
    return i < W.kreise.length - 1 ? feld(f.satz + "-" + W.kreise[i + 1].id) : null;
  }
  function feldHtml(f) {
    var n = nachbar(f);
    var marken = (f.grund ? ['<span class="wm-marke">Grundausstattung</span>'] : []).concat(schon ? ['<span class="wm-stand">' + (schon.indexOf(f.id) >= 0 ? "✓ mache ich schon" : "○ noch nicht") + "</span>"] : []);
    return '<div class="wm-offen" data-offen="' + f.id + '">' +
      '<div class="wm-offen-kopf"><h2 class="wm-fenster-titel" tabindex="-1">' + titelHtml(f) + "</h2>" +
      '<button type="button" class="knopf still wm-zu" data-wm="zu">Schließen</button></div>' +
      karteInnen(f, marken.join("")) +
      (n ? '<p class="wm-weiter">Derselbe Satz, ein Kreis weiter: <a class="textlink" href="#feld-' + n.id + '" data-feld-link="' + n.id + '">' + esc(titel(n)) + ' <span aria-hidden="true">→</span></a></p>' : "") +
      "</div>";
  }
  var vorher = "ruhe";   /* wohin »Schließen« zurückführt: ruhe oder ergebnis */
  function oeffne(id) {
    var f = feld(id);
    if (!f) return;
    if (!mitBild()) {   /* schmal: die Liste ist die Bedienung */
      var d = doc.getElementById("feld-" + id);
      if (d) { d.open = true; d.scrollIntoView({ block: "start" }); var s = d.querySelector("summary"); if (s) s.focus({ preventScroll: true }); }
      return;
    }
    if (modus === "ruhe" || modus === "ergebnis") vorher = modus;
    offen = id; modus = "feld";
    var von = anlass && anlass.el && anlass.el.classList && anlass.el.classList.contains("wm-feld") ? anlass.el : bildEl.querySelector('.wm-feld[data-feld="' + id + '"]');
    zeige(feldHtml(f), von);
  }
  function schliesse(fokus) {
    var war = offen;
    offen = null;
    if (vorher === "ergebnis" && schon) { modus = "ergebnis"; anlass = { tastatur: true }; zeige(ergebnisHtml()); }
    else { modus = "ruhe"; zeige(""); }
    if (fokus && war) { var a = bildEl.querySelector('.wm-feld[data-feld="' + war + '"]'); if (a && mitBild()) a.focus({ preventScroll: true }); }
  }
  function ohneMarke() { try { history.pushState(null, "", location.pathname + location.search); } catch (e) { location.hash = ""; } }
  function ausAdresse() {
    if (location.hash === "#wo-stehst-du") { if (modus !== "frage") frageStart(); return; } /* ab 4.53: Sprung vom KI-Training */
    var m = /^#feld-([a-z-]+)$/.exec(location.hash || "");
    if (m && feld(m[1])) { if (m[1] !== offen || !mitBild()) oeffne(m[1]); }
    else if (offen) schliesse(false);
  }

  /* ---------- »Wo stehst du?« ---------- */
  function frageHtml() {
    var k = W.kreise[bildNr], gewaehlt = wahl[k.id] || [];
    var optionen = W.felder.filter(function (f) { return f.kreis === k.id; }).map(function (f) {
      return '<label class="option"><input type="checkbox" name="wm-aussage" value="' + f.id + '"' + (gewaehlt.indexOf(f.id) >= 0 ? " checked" : "") + '><span class="option-text">' + esc(f.aussage) + "</span></label>";
    }).join("") +
      '<label class="option"><input type="checkbox" name="wm-aussage" value="nichts"' + (wahl[k.id] && !gewaehlt.length ? " checked" : "") + '><span class="option-text">Nichts davon</span></label>';
    return '<form class="wm-frage" id="wm-frage" novalidate>' +
      '<p class="wm-bildstand">Bild ' + (bildNr + 1) + " von " + W.kreise.length + " · " + esc(k.name) + "</p>" +
      '<h2 class="wm-fenster-titel" tabindex="-1">Was davon hast du in den letzten vier Wochen getan?</h2>' +
      '<p class="hilfe">' + esc(k.meint) + " Mehrere Antworten sind möglich.</p>" +
      '<div class="optionen wm-optionen">' + optionen + "</div>" +
      '<p class="wm-hinweis" id="wm-hinweis" role="status"></p>' +
      '<p class="wm-knoepfe"><button type="submit" class="knopf">' + (bildNr === W.kreise.length - 1 ? "Meine Karte zeigen" : "Weiter") + "</button> " +
      (bildNr > 0 ? '<button type="button" class="linkknopf" data-wm="bild-zurueck">Zurück</button> ' : "") +
      '<button type="button" class="linkknopf" data-wm="abbrechen">Abbrechen</button></p></form>';
  }
  function ergebnisHtml() {
    var nah = naechste(schon);
    var da = W.reihenfolge.filter(function (id) { return schon.indexOf(id) >= 0; });
    function link(id) { return '<a class="textlink" href="#feld-' + id + '" data-feld-link="' + id + '">' + esc(titel(feld(id))) + "</a>"; }
    return '<div class="wm-ergebnis">' +
      '<h2 class="wm-fenster-titel" tabindex="-1">Deine Karte</h2>' +
      '<p>An jedem Feld steht jetzt ein Zeichen: ✓ heißt »mache ich schon«, ○ heißt »noch nicht«.</p>' +
      '<div class="wm-schon"><h3>Darauf achtest du schon</h3>' +
      (da.length ? "<ul>" + da.map(function (id) { return "<li>" + link(id) + "</li>"; }).join("") + "</ul>" : "<p>Du hast noch nichts angetippt. Dann ist jeder Schritt ein erster Schritt.</p>") + "</div>" +
      '<div class="wm-lohnt"><h3>Das lohnt sich anzusehen</h3>' +
      (nah.length ? "<ul>" + nah.map(function (id) { return "<li>" + link(id) + '<span class="wm-lohnt-schritt">' + esc(feld(id).schritt.text) + "</span></li>"; }).join("") + "</ul>"
        : "<p>Du tust schon in jedem Feld etwas. Such dir ein Feld aus, in dem du sicherer werden willst.</p>") + "</div>" +
      '<p class="leise klein">»Noch nicht« ist kein Mangel. Es zeigt nur, wo du anfangen könntest. Gespeichert sind nur deine angetippten Aussagen, in diesem Browser.</p>' +
      '<p class="wm-knoepfe"><button type="button" class="knopf still" data-wm="zu-ruhe">Zurück zur Lampe</button> <button type="button" class="linkknopf" data-wm="loeschen">Eingaben löschen</button></p></div>';
  }
  function frageLesen() {
    var form = doc.getElementById("wm-frage");
    if (!form) return null;
    var an = [].slice.call(form.querySelectorAll('input[name="wm-aussage"]:checked')).map(function (i) { return i.value; });
    if (!an.length) return null;
    return an.filter(function (v) { return v !== "nichts"; });
  }
  function frageStart() {
    if (offen) { offen = null; if (location.hash) ohneMarke(); }
    modus = "frage"; bildNr = 0; wahl = {};
    zeige(frageHtml(), anlass && anlass.el);
  }

  /* ---------- Ereignisse ---------- */
  bildEl.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest(".wm-feld") : null;
    if (!a) return;
    e.preventDefault();
    var id = a.getAttribute("data-feld");
    anlass = { el: a, tastatur: e.detail === 0 };
    if (id === offen) { ohneMarke(); schliesse(true); anlass = null; return; }
    if (location.hash === "#feld-" + id) { oeffne(id); anlass = null; }
    else location.hash = "feld-" + id; /* der Hörer auf die Adresse öffnet das Feld und nimmt den Anlass zurück */
  });
  doc.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-feld-link]") : null;
    if (t) {
      anlass = { el: t, tastatur: e.detail === 0 };
      if (location.hash === t.getAttribute("href")) { e.preventDefault(); oeffne(t.getAttribute("data-feld-link")); anlass = null; }
      return;
    }
    var k = e.target.closest ? e.target.closest("[data-wm]") : null;
    if (!k) return;
    var was = k.getAttribute("data-wm");
    anlass = { el: k, tastatur: e.detail === 0 };
    if (was === "zu") { ohneMarke(); schliesse(true); }
    else if (was === "start") frageStart();
    else if (was === "wieder" && schon) { if (offen) { offen = null; if (location.hash) ohneMarke(); } modus = "ergebnis"; zeige(ergebnisHtml(), k); }
    else if (was === "bild-zurueck") { var w = frageLesen(); if (w) wahl[W.kreise[bildNr].id] = w; bildNr = Math.max(0, bildNr - 1); zeige(frageHtml(), null); }
    else if (was === "abbrechen" || was === "zu-ruhe") { modus = "ruhe"; vorher = "ruhe"; zeige(""); if (start) start.focus({ preventScroll: true }); }
    else if (was === "loeschen") { schon = null; speichern(null); zeichneStand(); modus = "ruhe"; vorher = "ruhe"; zeige(""); if (start) start.focus({ preventScroll: true }); }
    else if (was === "alle") {
      var auf = !listeEl.classList.contains("ist-offen");
      listeEl.classList.toggle("ist-offen", auf);
      k.setAttribute("aria-expanded", String(auf));
      k.textContent = auf ? "Liste wieder schließen" : "Alle zwölf Felder als Liste zeigen";
      if (auf) { var h = listeEl.querySelector("h2"); if (h) { h.focus({ preventScroll: true }); listeEl.scrollIntoView({ block: "start", behavior: ruhig() || anlass.tastatur ? "auto" : "smooth" }); } }
    }
    anlass = null; /* ein alter Anlass darf keine spätere Adressänderung (»Zurück«, geteilte Adresse) bewegen */
  });
  wechsel.addEventListener("change", function (e) {
    var i = e.target;
    if (!i || i.name !== "wm-aussage") return;
    var form = doc.getElementById("wm-frage");
    if (i.value === "nichts" && i.checked) [].forEach.call(form.querySelectorAll('input[name="wm-aussage"]'), function (x) { if (x !== i) x.checked = false; });
    else if (i.checked) { var n = form.querySelector('input[value="nichts"]'); if (n) n.checked = false; }
    var hin = doc.getElementById("wm-hinweis"); if (hin) hin.textContent = "";
  });
  wechsel.addEventListener("submit", function (e) {
    e.preventDefault();
    var w = frageLesen(), hin = doc.getElementById("wm-hinweis");
    if (!w) { if (hin) hin.textContent = "Wähl mindestens eine Antwort – auch »Nichts davon« zählt."; return; }
    var sub = e.submitter || null;
    anlass = { el: sub, tastatur: !!(sub && doc.activeElement === sub && sub.matches && sub.matches(":focus-visible")) };
    wahl[W.kreise[bildNr].id] = w;
    if (bildNr < W.kreise.length - 1) { bildNr += 1; zeige(frageHtml(), null); anlass = null; return; }
    schon = [];
    W.kreise.forEach(function (k) { schon = schon.concat(wahl[k.id] || []); });
    speichern(schon);
    modus = "ergebnis"; vorher = "ergebnis";
    zeichneStand();
    zeige(ergebnisHtml(), null);
    anlass = null;
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !offen || modus !== "feld") return;
    anlass = { tastatur: true };
    ohneMarke(); schliesse(true);
    anlass = null;
  });
  /* Ein Hörer für die Adresse: Er gilt für das Antippen (setzt die Marke), für »Zurück« und »Vor« und für geteilte Adressen.
     Kein zweiter Hörer auf popstate – der Browser meldet eine neue Marke auf beiden Wegen, und der erste nähme die Bewegung weg. */
  wurzel.addEventListener("hashchange", function () { if (!anlass) anlass = { tastatur: true }; ausAdresse(); anlass = null; });
  /* Zum Drucken stehen alle zwölf Felder und der Hintergrund offen da; danach wie vorher. */
  var warOffen = null;
  function klappen() { return [].slice.call(seite.querySelectorAll("details")); }
  wurzel.addEventListener("beforeprint", function () {
    warOffen = klappen().map(function (d) { return d.open; });
    klappen().forEach(function (d) { d.open = true; });
  });
  wurzel.addEventListener("afterprint", function () {
    if (!warOffen) return;
    klappen().forEach(function (d, i) { d.open = !!warOffen[i]; });
    warOffen = null;
  });

  seite.classList.add("wm-js");
  if (start) start.hidden = false;
  if (alle) alle.hidden = false;
  zeichneStand();
  anlass = { tastatur: true };
  ausAdresse();
  anlass = null;
})(typeof window !== "undefined" ? window : globalThis);
