/* Tests für die Unterrichtsbeispiele nach Fächern (ab Version 4.57): Daten und Darstellung (assets/labore.js).
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const L = require("../assets/daten/labore.js");
const B = require("../assets/daten/beispiele.js");
const G = require("../assets/daten/galerie.js");
const P = require("../assets/daten/prinzipien.js");
const T = require("../assets/daten/taxonomien.js");
const S = require("../assets/labore.js");
const WURZEL = path.join(__dirname, "..");
const QUELLE = fs.readFileSync(path.join(WURZEL, "src", "sechs-hebel.html"), "utf8").replace(/\s+/g, " ");

test("Vier Fächer, gleichrangig: je zwei bis drei Beispiele, die es in Kidu gibt", () => {
  assert.deepEqual(L.map((l) => l.id), ["ggk-labor", "gk-labor", "psycho-labor", "demokratiebildung"]);
  for (const l of L) {
    assert.ok(l.beispiele.length >= 2 && l.beispiele.length <= 3, l.id);
    for (const x of l.beispiele) {
      const b = B.find((e) => e.id === x.beispiel);
      assert.ok(b, x.beispiel);
      assert.equal(b.bereich, "lernen", x.beispiel);
      assert.ok((G[b.id] || []).some((a) => a.bild === x.bild), "Bild ist eine Ansicht von " + b.id);
    }
    assert.equal(Object.keys(l).includes("rang") || Object.keys(l).includes("reihenfolge"), false, "keine Rangfolge");
  }
});

test("Jedes Beispiel nennt Umfang, Prinzipien und was das Gerät kann – aus dem Teil oder dem Eintrag", () => {
  const umf = new Set(T.umfang.map((u) => u.id).concat(["einheit"]));
  const prinz = new Set(P.map((p) => p.id));
  for (const k of S.karten()) {
    assert.ok(umf.has(k.umfang), k.anker + " Umfang " + k.umfang);
    assert.ok(k.prinzipien.length >= 1 && k.prinzipien.every((p) => prinz.has(p)), k.anker);
    assert.ok(k.geraet && k.was && k.warum, k.anker);
    assert.ok(k.ort, k.anker + " ohne Ort");
  }
});

test("Alle vier Umfänge kommen vor – und jedes der sechs Prinzipien hat mindestens ein Beispiel", () => {
  const karten = S.karten();
  for (const u of ["punktuell", "phasenweise", "durchgaengig", "einheit"]) {
    const imRahmen = u === "einheit";  // jede Werkstatt zeigt ihr Ganzes als Einheit
    assert.ok(imRahmen || karten.some((k) => k.umfang === u), u);
  }
  for (const p of P) assert.ok(karten.some((k) => k.prinzipien.includes(p.id)), p.id);
});

test("Die vier Wege stehen für alle Umfänge da, je ein kurzer Satz", () => {
  for (const l of L) {
    assert.deepEqual(Object.keys(l.wege).sort(), ["durchgaengig", "einheit", "phasenweise", "punktuell"], l.id);
    for (const [u, satz] of Object.entries(l.wege)) assert.ok(satz.length > 20 && satz.length < 220, l.id + " " + u);
  }
});

test("Wofür und Ohne Gerät stehen wörtlich auf der Seite »Wann funktioniert digitaler Unterricht?«", () => {
  for (const p of P) {
    assert.ok(QUELLE.includes("<b>Wofür:</b> " + p.wofuer), p.id + " wofuer");
    assert.ok(QUELLE.includes("<b>Ohne Gerät:</b> " + p.papier), p.id + " papier");
  }
});

test("Rahmenbilder: Datei vorhanden, Alternativtext, Maße stimmen mit der Datei", () => {
  for (const l of L) {
    const r = l.rahmen;
    assert.ok(fs.existsSync(path.join(WURZEL, r.bild)), r.bild);
    assert.ok(r.alt.length >= 40, l.id + " Alternativtext");
    // WebP: Breite und Höhe stehen im VP8-Kopf; hier reicht der Vergleich des Seitenverhältnisses über die Angaben
    assert.ok(r.breite === 1040 && r.hoehe > 100 && r.hoehe <= 650, l.id + " Maße");
    if (r.link) assert.ok(r.link.startsWith("https://geschichtefuerdiegegenwart.github.io/"), l.id);
  }
});

test("Gebaute Teile: keine Links nach außen, alle Fächer und Sprünge vorhanden", () => {
  const h = S.html();
  const alles = h.wahl + h.schluessel + h.labore + h.weitere;
  assert.doesNotMatch(alles, /https?:\/\//, "»Ausprobieren« setzt erst das Skript im Browser ein");
  for (const l of L) {
    assert.ok(h.wahl.includes('href="#' + l.id + '"'), l.id);
    assert.ok(h.labore.includes('id="' + l.id + '"'), l.id);
  }
  // jeder Sprung »Hier zu sehen« und jede Prinzip-Marke hat ihr Ziel
  for (const m of alles.matchAll(/href="#([^"]+)"/g)) assert.ok(alles.includes('id="' + m[1] + '"'), "Ziel fehlt: " + m[1]);
  // Status und Umfang immer als Wort
  assert.equal((h.labore.match(/class="ub-karte"/g) || []).length, S.karten().length);
  assert.equal((h.labore.match(/<span class="status">(Status|Status des ganzen Beispiels): <b>/g) || []).length, S.karten().length);
  // Ein Teil sagt, dass sein Status dem ganzen Beispiel gilt
  assert.equal((h.labore.match(/Status des ganzen Beispiels: <b>/g) || []).length, S.karten().filter((k) => k.teil).length);
  assert.equal((h.labore.match(/<p class="umfang-zeile">/g) || []).length, S.karten().length);
});

test("Ausprobieren: Ziele nur auf den freigegebenen Seiten, ohne Link kein Knopf", () => {
  const z = S.appZiele();
  for (const [ort, w] of Object.entries(z)) assert.ok(w.link.startsWith("https://geschichtefuerdiegegenwart.github.io/"), ort);
  const e3 = S.karten().find((k) => k.eintrag.id === "demokratie-e3");
  assert.equal(e3.link, null);
  assert.equal(z[e3.anker], undefined);
});

test("Weitere Beispiele: alle übrigen Einträge, keiner doppelt, keiner verloren", () => {
  const gezeigt = new Set();
  for (const l of L) { l.beispiele.forEach((x) => gezeigt.add(x.beispiel)); if (l.rahmen.einheit) gezeigt.add(l.rahmen.einheit); }
  const w = S.weitere();
  assert.equal(w.zahl, B.length - gezeigt.size);
  for (const b of B) {
    const drin = w.html.includes('href="beispiel.html#' + encodeURIComponent(b.slug) + '"');
    assert.equal(drin, !gezeigt.has(b.id), b.id);
  }
});

test("Ehrlich: Status kommt aus den Daten, »in Entwicklung« bleibt sichtbar, keine Wirkungswörter", () => {
  const h = S.html().labore;
  assert.match(h, /Status: <b>in Entwicklung<\/b>/);
  for (const l of L) {
    const text = JSON.stringify([l.quintessenz, l.beispiele.map((x) => [x.was, x.warum]), l.wege]);
    assert.doesNotMatch(text, /beweis|garantiert|steigert|verbessert nachweislich|Prozent|\d+ ?%(?!-Hürde)/i, l.id);
  }
});
