/* Kidu – Unterrichtsbeispiele nach Fächern (ab Version 4.57, galerie.html).
   Vier Fächer, je eine Lernumgebung aus dem Unterricht: GGK-Labor, GK-Labor, Psycho-Labor, Demokratiebildung.
   Daten: LABORE (assets/daten/labore.js) – Quintessenz, das Ganze, zwei bis drei Beispiele, die vier Wege.
   Titel, Fach, Status, Kurzbeschreibung und Links kommen aus BEISPIELE (assets/daten/beispiele.js),
   Bilder, Alternativtexte und Bildtexte aus GALERIE (assets/daten/galerie.js), die sechs Prinzipien aus PRINZIPIEN,
   Umfang und »Ganze Einheit« aus TAXONOMIEN. Hier steht kein Inhalt, nur die Darstellung.

   html() → { wahl, schluessel, labore, weitere }: tools/labore.py setzt die vier Teile beim Bauen an den Zeichen
   <!-- labore:… --> in src/galerie.html ein. Ohne JavaScript steht damit alles da: vier Fächer untereinander.
   Im Browser (unten): Die Kacheln oben wählen ein Fach (eines sichtbar, Adresse #<id>, »Zurück« geht); »Alle vier
   untereinander« zeigt alle (Static Grid Rule). Ein Verweis auf ein Beispiel (#b-…) öffnet sein Fach. Bilder öffnen die
   Bildansicht (HILDE.lichtbild). Beim Laden bewegt sich nichts (Input-First Rule). Gemerkt wird nur das gewählte Fach
   (hilde.fach), nur in diesem Browser; »Eingaben löschen« in der Fußzeile nimmt es mit.

   Regeln: keine Rangfolge (die vier Fächer und die vier Umfänge stehen gleichrangig), Umfang immer als Wort neben der
   Linie, Status immer als Wort, Prinzipien als Wort mit Sprung zur Seite der Prinzipien. Tests: tests/labore.test.js */
(function (wurzel) {
  "use strict";
  var imKnoten = typeof module !== "undefined" && typeof require !== "undefined";
  var T = imKnoten ? require("./daten/taxonomien.js") : wurzel.TAXONOMIEN;
  var B = imKnoten ? require("./daten/beispiele.js") : wurzel.BEISPIELE;
  var G = imKnoten ? require("./daten/galerie.js") : wurzel.GALERIE;
  var P = imKnoten ? require("./daten/prinzipien.js") : wurzel.PRINZIPIEN;
  var L = imKnoten ? require("./daten/labore.js") : wurzel.LABORE;
  if (!T || !B || !G || !P || !L) return;

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function nach(liste, id) { for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i]; return null; }
  function beispiel(id) { return nach(B, id); }
  function prinzip(id) { return nach(P, id); }
  function umfangName(id) { return id === "einheit" ? T.einheit.name : (nach(T.umfang, id) || {}).name || "noch offen"; }
  function slug(b) { return encodeURIComponent(b.slug || b.id); }

  /* Ein Beispiel auf der Seite: Eintrag in BEISPIELE plus Angaben aus LABORE (teil, ort, bild, was, warum). */
  function karteDaten(l, x, n) {
    var b = beispiel(x.beispiel), t = x.teil || null;
    var ansichten = G[x.beispiel] || [];
    var start = 0;
    for (var i = 0; i < ansichten.length; i++) if (ansichten[i].bild === x.bild) start = i;
    return {
      anker: "b-" + l.id + "-" + (n + 1), labor: l, eintrag: b, teil: t,
      ort: t ? t.ort : (x.ort || ""), kurz: x.kurz || "",
      titel: t ? t.titel : b.titel,
      umfang: t ? t.umfang : b.umfang,
      prinzipien: (t ? t.prinzipien : b.prinzipien) || [],
      geraet: t ? t.geraet : b.geraet,
      link: t ? t.link : b.link,
      was: x.was, warum: x.warum, stimme: x.stimme ? b.stimme : null,
      ansichten: ansichten, start: start, ansicht: ansichten[start] || null
    };
  }
  function alleKarten() {
    var k = [];
    L.forEach(function (l) { l.beispiele.forEach(function (x, n) { k.push(karteDaten(l, x, n)); }); });
    return k;
  }

  /* Stundenlinie wie HILDE.stundenlinie(umfang, "zeile") – dieselben Klassen, damit dieselbe Gestaltung gilt.
     »einheit« = mehrere kleine Linien nebeneinander (wie die Zeile einer ganzen Einheit), ohne eigene Zahl. */
  function linie(umfang, variante) {
    var v = variante ? " " + variante : " zeile";
    return '<span class="stundenlinie' + v + '" data-umfang="' + esc(umfang || "") + '" aria-hidden="true">' +
      '<span class="sl-spur"><i></i><i></i><i></i><i></i><i></i></span><span class="sl-balken"></span></span>';
  }
  function einheitLinien() {
    return '<span class="einheit-linien ub-einheit-linien" aria-hidden="true">' +
      ["punktuell", "", "durchgaengig", "phasenweise"].map(function (u) { return linie(u); }).join("") + "</span>";
  }
  function umfangZeile(umfang) {
    var bild = umfang === "einheit" ? einheitLinien() : linie(umfang);
    return '<p class="umfang-zeile">' + bild + "<span>Umfang: <b>" + esc(umfangName(umfang)) + "</b></span></p>";
  }
  function marken(ids) {
    if (!ids || !ids.length) return "";
    return '<p class="prinzip-marken"><span class="sr-only">Prinzip: </span>' + ids.map(function (id) {
      return '<a class="prinzip-marke" href="#ub-p-' + esc(id) + '">' + esc((prinzip(id) || {}).name || id) + "</a>";
    }).join("") + "</p>";
  }
  /* »Ausprobieren« führt aus Kidu hinaus (GitHub Pages). Die gebaute Seite enthält keine Links nach außen
     (tools/pruefen.py, Moodle-Paket): Beim Bauen steht nur ein leerer Ort, das Skript setzt den Link im Browser ein.
     So bleibt die Seite vollständig, wenn die Lernumgebungen einmal nicht mehr öffentlich sind. */
  function appLink(link, text) {
    if (!link) return "";
    return '<a class="knopf still" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(text || "Ausprobieren") +
      ' <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>';
  }
  function ausprobieren(link, fuer) {
    if (!link) return "";
    return '<span class="ub-app" data-app-fuer="' + esc(fuer) + '"></span>';
  }

  /* ---------- Die vier Kacheln oben: ein Fach wählen ---------- */
  function wahl() {
    return '<ul class="ub-wahl-liste">' + L.map(function (l) {
      var k = karteDaten(l, l.beispiele[0], 0);
      var bild = l.rahmen.kachel ? l.rahmen.bild : (k.ansicht ? k.ansicht.bild : "");
      var duplex = bild.replace("assets/galerie/", "assets/galerie/duplex/");
      return '<li><a class="ub-kachel" href="#' + esc(l.id) + '" data-fach="' + esc(l.id) + '">' +
        '<span class="ub-kachel-bild" aria-hidden="true"><img src="' + esc(duplex) + '" alt="" width="640" height="400" loading="eager"></span>' +
        '<span class="ub-kachel-text"><span class="ub-kachel-fach">' + esc(l.fach) + '</span>' +
        '<span class="ub-kachel-name">' + esc(l.name) + "</span>" +
        '<span class="ub-kachel-satz">' + esc(l.satz) + "</span>" +
        '<span class="ub-kachel-zahl">' + l.beispiele.length + " Beispiele und das Ganze <span aria-hidden=\"true\">→</span></span></span></a></li>";
    }).join("") + "</ul>";
  }

  /* ---------- So liest du die Beispiele: vier Umfänge, sechs Prinzipien ---------- */
  function schluessel() {
    var karten = alleKarten();
    var umf = T.umfang.map(function (u) {
      return '<li class="ub-umfang" data-umfang="' + esc(u.id) + '">' + linie(u.id, "klein") +
        '<p class="ub-umfang-name">' + esc(u.name) + "</p><p>" + esc(u.hilfe) + ".</p></li>";
    }).join("") +
      '<li class="ub-umfang ub-umfang-einheit" data-umfang="einheit"><span class="ub-einheit-gross" aria-hidden="true">' +
      ["punktuell", "", "durchgaengig", "phasenweise"].map(function (u) { return linie(u); }).join("") + "</span>" +
      '<p class="ub-umfang-name">' + esc(T.einheit.name) + "</p><p>" + esc(T.einheit.satz.split(". ")[0]) + ".</p></li>";
    var prz = P.map(function (p) {
      var hier = karten.filter(function (k) { return k.prinzipien.indexOf(p.id) > -1; });
      return '<li class="ub-prinzip" id="ub-p-' + esc(p.id) + '"><h4 class="ub-prinzip-name">' + esc(p.name) + "</h4>" +
        '<p class="ub-kann">' + esc(p.kann) + "</p>" +
        '<p class="ub-wofuer"><b>Wofür:</b> ' + esc(p.wofuer) + "</p>" +
        '<p class="ub-papier"><b>Ohne Gerät:</b> ' + esc(p.papier) + "</p>" +
        (hier.length ? '<p class="ub-hier"><b>Hier zu sehen:</b> ' + hier.map(function (k) {
          return '<a href="#' + esc(k.anker) + '">' + esc(k.labor.name + " " + (k.kurz || k.ort)) + "</a>";
        }).join(" · ") + "</p>" : "") + "</li>";
    }).join("");
    return '<div class="ub-schluessel-teil"><h3 id="t-umfang">Wie viel Gerät? Vier Formen</h3>' +
      '<ol class="ub-umfang-liste">' + umf + "</ol>" +
      '<p class="ub-merksatz">Keine Stufen: Punktuell ist nicht weniger als durchgängig. In einer ganzen Einheit entscheidest du je Stunde neu, wie viel Gerät sie braucht – auch keins.</p></div>' +
      '<div class="ub-schluessel-teil"><h3 id="t-prinzipien">Was kann das Gerät? Sechs Prinzipien</h3>' +
      '<p class="mass">Jedes Prinzip ist etwas, das Papier nicht oder nur mühsam kann. Eine Stunde braucht meist eines, selten alle. ' +
      'Gedeutet, gestritten und geurteilt wird im Raum – ohne Gerät.</p>' +
      '<ul class="ub-prinzip-liste">' + prz + "</ul></div>";
  }

  /* ---------- Ein Fach ---------- */
  function rahmenHtml(l) {
    var r = l.rahmen, e = r.einheit ? beispiel(r.einheit) : null;
    var status = r.status || (e ? e.status : "");
    return '<figure class="ub-rahmen" aria-labelledby="t-rahmen-' + esc(l.id) + '">' +
      '<p class="ub-rahmen-kopf">' + einheitLinien() + "<span>Umfang: <b>" + esc(T.einheit.name) + "</b></span></p>" +
      '<h3 id="t-rahmen-' + esc(l.id) + '" class="ub-rahmen-titel">Das Ganze: ' + esc(r.titel) + "</h3>" +
      '<button type="button" class="ub-bildknopf" data-lichtbild-rahmen="' + esc(l.id) + '">' +
      '<img src="' + esc(r.bild) + '" alt="' + esc(r.alt) + '" width="' + r.breite + '" height="' + r.hoehe + '" loading="lazy">' +
      '<span class="sr-only">Bild groß zeigen</span></button>' +
      '<ol class="ub-leiste">' + r.leiste.map(function (s) {
        return '<li' + (s.geplant ? ' class="geplant"' : "") + '><b>' + esc(s.kurz) + "</b><span>" + esc(s.name) + "</span>" +
          (s.notiz ? "<i>" + esc(s.notiz) + "</i>" : "") + "</li>";
      }).join("") + "</ol>" +
      '<figcaption><ul class="ub-rahmen-saetze">' + r.saetze.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
      (status ? '<p class="status">Status ' + (e ? "der Einheit" : "des Ganzen") + ': <b>' + esc(status) + "</b></p>" : "") +
      '<p class="ub-rahmen-wege">' + (e ? '<a class="knopf still" href="beispiel.html#' + slug(e) + '">Mehr zur Einheit<span class="sr-only">: ' + esc(e.titel) + "</span></a>" : "") +
      ausprobieren(r.link, "rahmen-" + l.id) + "</p></figcaption></figure>";
  }
  function karteHtml(k) {
    var b = k.eintrag, a = k.ansicht;
    return '<article class="ub-karte" id="' + esc(k.anker) + '" data-wechsel="' + esc(b.id) + '" tabindex="-1">' +
      (a ? '<button type="button" class="ub-bildknopf ub-karte-bild" data-lichtbild="' + esc(b.id) + '" data-ansicht="' + k.start + '">' +
        '<img src="' + esc(a.bild) + '" alt="' + esc(a.alt) + '" width="1040" height="650" loading="lazy" data-wechsel-bild>' +
        '<span class="sr-only">Bild groß zeigen</span></button>' : "") +
      '<div class="ub-karte-koerper">' + umfangZeile(k.umfang) + marken(k.prinzipien) +
      '<p class="ub-ort">' + esc(k.labor.name) + (k.ort ? " · " + esc(k.ort) : "") + "</p>" +
      '<h4 class="ub-karte-titel" data-wechsel-titel>' + esc(k.titel) + "</h4>" +
      (k.teil ? '<p class="ub-aus">aus: ' + esc(b.titel) + "</p>" : "") +
      '<dl class="ub-drei"><div><dt>Was Lernende tun</dt><dd>' + esc(k.was) + "</dd></div>" +
      "<div><dt>Was das Gerät kann</dt><dd>" + esc(k.geraet) + "</dd></div>" +
      "<div><dt>Warum das trägt</dt><dd>" + esc(k.warum) + "</dd></div></dl>" +
      (k.stimme ? '<p class="ub-stimme"><b>Lernende, zusammengefasst:</b> ' + esc(k.stimme) + "</p>" : "") +
      "</div>" +
      /* Ein Teil (ein Blatt, eine Stunde) trägt den Status des ganzen Beispiels, aus dem er stammt – das sagt die Zeile. */
      '<div class="fussleiste"><span class="status">' + (k.teil ? "Status des ganzen Beispiels" : "Status") + ": <b>" + esc(b.status) + "</b></span>" +
      '<span class="fuss-knoepfe"><a class="knopf" href="beispiel.html#' + slug(b) + '">Mehr dazu<span class="sr-only">: ' + esc(b.titel) + "</span></a>" +
      ausprobieren(k.link, k.anker) +
      '<button type="button" class="knopf still merken" data-merken="' + esc(b.id) + '" aria-pressed="false"><span class="merken-text">Merken</span><span class="sr-only">: ' + esc(b.titel) + "</span></button>" +
      "</span></div></article>";
  }
  function wegeHtml(l) {
    var reihe = T.umfang.map(function (u) { return { id: u.id, name: u.name }; }).concat([{ id: "einheit", name: T.einheit.name }]);
    return '<section class="ub-wege" aria-labelledby="t-wege-' + esc(l.id) + '"><h3 id="t-wege-' + esc(l.id) + '">So nutzt du die Idee in deinem Fach</h3>' +
      '<ol class="ub-wege-liste">' + reihe.map(function (u) {
        var bild = u.id === "einheit" ? '<span class="einheit-linien ub-einheit-linien" aria-hidden="true">' +
          ["punktuell", "", "durchgaengig", "phasenweise"].map(function (x) { return linie(x); }).join("") + "</span>" : linie(u.id);
        return '<li data-umfang="' + esc(u.id) + '"><p class="ub-weg-kopf">' + bild + "<b>" + esc(u.name) + "</b></p><p>" + esc(l.wege[u.id]) + "</p></li>";
      }).join("") + "</ol></section>";
  }
  function laborHtml(l, i) {
    var karten = l.beispiele.map(function (x, n) { return karteDaten(l, x, n); });
    var profil = [];
    karten.forEach(function (k) { k.prinzipien.forEach(function (p) { if (profil.indexOf(p) < 0) profil.push(p); }); });
    return '<section class="ub-labor' + (i % 2 ? " ub-labor-flaeche" : "") + '" id="' + esc(l.id) + '" data-fach="' + esc(l.id) + '" aria-labelledby="t-' + esc(l.id) + '">' +
      '<div class="huelle huelle-weit"><div class="ub-labor-kopf"><div class="ub-labor-text">' +
      '<p class="ub-kicker">' + esc(l.fach) + " · " + esc(l.gruppe) + "</p>" +
      '<h2 id="t-' + esc(l.id) + '" tabindex="-1">' + esc(l.name) + "</h2>" +
      '<p class="ub-frage">' + esc(l.frage) + "</p>" +
      '<div class="ub-quintessenz">' + l.quintessenz.map(function (s) { return "<p>" + esc(s) + "</p>"; }).join("") + "</div>" +
      '<p class="ub-fachregel"><b>Regel des Fachs:</b> ' + esc(l.fachregel) + "</p>" +
      '<div class="ub-profil"><p>Was das Gerät hier tut:</p>' + marken(profil) + "</div>" +
      "</div>" + rahmenHtml(l) + "</div>" +
      '<h3 class="ub-zwischen">' + (karten.length === 2 ? "Zwei" : "Drei") + " Beispiele</h3>" +
      '<div class="ub-beispiele">' + karten.map(karteHtml).join("") + "</div>" +
      wegeHtml(l) + "</div></section>";
  }
  function labore() { return L.map(laborHtml).join(""); }

  /* ---------- Weitere Beispiele: alles Übrige als schlichte Liste (Detailseiten bleiben) ---------- */
  function weitere() {
    var gezeigt = {};
    L.forEach(function (l) { l.beispiele.forEach(function (x) { gezeigt[x.beispiel] = true; }); if (l.rahmen.einheit) gezeigt[l.rahmen.einheit] = true; });
    var rest = B.filter(function (b) { return !gezeigt[b.id]; });
    var gruppen = T.bereiche.slice().reverse().map(function (br) {   // erst »Unterricht«, dann »Außerhalb des Unterrichts«
      var liste = rest.filter(function (b) { return b.bereich === br.id; });
      if (!liste.length) return "";
      return '<section class="ub-weitere-gruppe" aria-labelledby="t-weitere-' + esc(br.id) + '"><h3 id="t-weitere-' + esc(br.id) + '">' + esc(br.name) + "</h3>" +
        '<ul class="ub-weitere-liste">' + liste.map(function (b) {
          return '<li><a href="beispiel.html#' + slug(b) + '">' + esc(b.titel) + "</a>" +
            '<span class="ub-weitere-meta">' + esc(b.fach) + " · Status: " + esc(b.status) + "</span></li>";
        }).join("") + "</ul></section>";
    }).join("");
    return { zahl: rest.length, html: gruppen };
  }

  function html() {
    var w = weitere();
    return { wahl: wahl(), schluessel: schluessel(), labore: labore(),
             weitere: '<details class="mehr ub-weitere" id="weitere"><summary>Weitere Beispiele aus dem Unterricht und außerhalb (' + w.zahl + ")</summary>" +
               '<p class="klein leise">Ältere und kleinere Lernseiten, Werkzeuge für die Praxis und Konzeptideen. Jede hat ihre Beschreibung.</p>' + w.html + "</details>" };
  }

  /* Wohin »Ausprobieren« führt – je Karte (Anker) und je Rahmen (rahmen-<id>); für das Skript im Browser und die Tests. */
  function appZiele() {
    var z = {};
    alleKarten().forEach(function (k) { if (k.link) z[k.anker] = { link: k.link, text: "Ausprobieren" }; });
    L.forEach(function (l) { if (l.rahmen.link) z["rahmen-" + l.id] = { link: l.rahmen.link, text: l.name + " öffnen" }; });
    return z;
  }

  var api = { html: html, karten: alleKarten, karteDaten: karteDaten, weitere: weitere, appZiele: appZiele };
  if (imKnoten) module.exports = api; else wurzel.LABORE_SEITE = api;
  if (typeof document === "undefined") return;

  /* ================= Im Browser ================= */
  var doc = document, MERK = "hilde.fach";
  var ort = doc.getElementById("ub-faecher");
  if (!ort) return;
  var sektionen = [].slice.call(ort.querySelectorAll(".ub-labor"));
  var kacheln = [].slice.call(doc.querySelectorAll(".ub-kachel"));
  var alleKnopf = doc.getElementById("ub-alle");
  function ruhig() { return wurzel.HILDE ? wurzel.HILDE.ruhig() : false; }
  function lies() { try { return localStorage.getItem(MERK); } catch (e) { return null; } }
  function schreib(v) { try { if (v) localStorage.setItem(MERK, v); else localStorage.removeItem(MERK); } catch (e) { /* ohne Speicher weiter */ } }
  function fachVon(hash) {
    var id = (hash || "").replace(/^#/, "");
    if (!id) return null;
    for (var i = 0; i < sektionen.length; i++) if (sektionen[i].id === id) return id;
    var el = doc.getElementById(id);
    var sek = el && el.closest ? el.closest(".ub-labor") : null;
    return sek ? sek.id : null;
  }

  /* Ein Fach zeigen (oder alle). Nichts bewegt sich: Die Sektion steht sofort da. */
  function zeige(id, alle) {
    ort.classList.toggle("ub-ein-fach", !alle);
    sektionen.forEach(function (s) { s.hidden = !alle && s.id !== id; });
    kacheln.forEach(function (k) {
      var an = !alle && k.getAttribute("data-fach") === id;
      if (an) k.setAttribute("aria-current", "true"); else k.removeAttribute("aria-current");
    });
    if (alleKnopf) {
      alleKnopf.setAttribute("aria-pressed", alle ? "true" : "false");
      alleKnopf.textContent = alle ? "Ein Fach nach dem anderen" : "Alle vier untereinander";
    }
    if (!alle) schreib(id);
  }
  function springe(ziel) {
    if (!ziel) return;
    ziel.scrollIntoView({ behavior: ruhig() ? "auto" : "smooth", block: "start" });
    if (ziel.focus) ziel.focus({ preventScroll: true });
  }

  /* »Ausprobieren« einsetzen (siehe appLink oben). */
  var ziele = appZiele();
  [].slice.call(doc.querySelectorAll(".ub-app[data-app-fuer]")).forEach(function (o) {
    var z = ziele[o.getAttribute("data-app-fuer")];
    if (z) o.outerHTML = appLink(z.link, z.text);
  });

  /* Ohne Skript stehen alle vier Fächer untereinander; der Umschalter erscheint erst mit Skript. */
  if (alleKnopf) alleKnopf.hidden = false;
  var start = fachVon(location.hash) || lies() || sektionen[0].id;
  if (!doc.getElementById(start)) start = sektionen[0].id;
  zeige(start, false);

  kacheln.forEach(function (k) {
    k.addEventListener("click", function (e) {
      e.preventDefault();
      var id = k.getAttribute("data-fach");
      zeige(id, false);
      if (history.pushState) history.pushState(null, "", "#" + id);
      springe(doc.getElementById("t-" + id));
    });
  });
  if (alleKnopf) alleKnopf.addEventListener("click", function () {
    var alle = alleKnopf.getAttribute("aria-pressed") !== "true";
    var aktiv = (kacheln.filter(function (k) { return k.hasAttribute("aria-current"); })[0] || kacheln[0]).getAttribute("data-fach");
    zeige(aktiv, alle);
  });
  /* Verweise innerhalb der Seite (»Hier zu sehen«, Prinzip-Marken): erst das Fach öffnen, dann hinspringen. */
  doc.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains("ub-kachel")) return;
    var id = a.getAttribute("href").slice(1);
    var fach = fachVon("#" + id);
    if (!fach) return;
    e.preventDefault();
    var alle = alleKnopf && alleKnopf.getAttribute("aria-pressed") === "true";
    zeige(fach, alle);
    if (history.pushState) history.pushState(null, "", "#" + id);
    springe(doc.getElementById(id));
  });
  wurzel.addEventListener("popstate", function () {
    var fach = fachVon(location.hash);
    if (fach) zeige(fach, false);
  });

  /* Bildansicht: alle Ansichten des Beispiels, beginnend bei der gezeigten; das Rahmenbild allein. */
  doc.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("[data-lichtbild], [data-lichtbild-rahmen]");
    if (!k || !wurzel.HILDE) return;
    if (k.hasAttribute("data-lichtbild-rahmen")) {
      var l = nach(L, k.getAttribute("data-lichtbild-rahmen"));
      wurzel.HILDE.lichtbild([{ bild: l.rahmen.bild, alt: l.rahmen.alt, text: l.rahmen.titel }], 0, l.name, k, null);
      return;
    }
    var b = beispiel(k.getAttribute("data-lichtbild"));
    if (b) wurzel.HILDE.lichtbild(G[b.id] || [], parseInt(k.getAttribute("data-ansicht"), 10) || 0, b.titel, k,
      { detail: "beispiel.html#" + slug(b), app: b.link || "" });
  });
})(typeof window !== "undefined" ? window : globalThis);
