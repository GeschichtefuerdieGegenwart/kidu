// Aufgabenkoffer (ab 4.32): Die Daten sind vollständig und erfinden nichts.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const A = require("../assets/daten/aufgaben.js");
const beispiele = fs.readFileSync(__dirname + "/../assets/daten/beispiele.js", "utf8");

test("jede Aufgabe hat alle Felder, gültigen Zweck, Ort und Prinzip", () => {
  const zwecke = A.zwecke.map((z) => z.id);
  const ids = new Set();
  for (const a of A.aufgaben) {
    assert.ok(!ids.has(a.id), "doppelte id " + a.id); ids.add(a.id);
    for (const f of ["name", "auch", "tun", "foerdert", "papier", "geraet", "regel", "erfahrung", "beleg", "stand"]) assert.ok(a[f] && a[f].length > 8 || f === "stand" && a[f], a.id + ": " + f);
    assert.ok(zwecke.includes(a.zweck), a.id + ": Zweck");
    assert.ok(A.orte[a.ort], a.id + ": Ort");
    assert.ok(a.sinn.length === 3 && a.wenig.length === 3, a.id + ": je drei Punkte");
    for (const h of a.hebel) assert.ok(A.hebel[h], a.id + ": Prinzip " + h);
    assert.ok(["belegt", "teilweise belegt", "wenig erforscht", "noch offen"].includes(a.stand), a.id + ": Belegstand");
    assert.ok(["eingesetzt", "geplant", "offen"].includes(a.einsatz), a.id + ": Einsatz");
  }
  assert.strictEqual(A.aufgaben.length, 18);
});

test("jeder Zweck hat mindestens zwei Aufgaben", () => {
  for (const z of A.zwecke) assert.ok(A.aufgaben.filter((a) => a.zweck === z.id).length >= 2, z.id);
});

test("Beispiele gibt es in der Galerie; ohne Erprobung kein Beispiel und »noch nicht erprobt«", () => {
  for (const a of A.aufgaben) {
    if (a.beispiel) assert.ok(beispiele.includes('id: "' + a.beispiel + '"'), a.id + ": Beispiel " + a.beispiel);
    if (a.einsatz === "offen") { assert.strictEqual(a.beispiel, null, a.id); assert.ok(/Noch nicht erprobt/.test(a.erfahrung), a.id); }
  }
});

test("wer einen Beleg »belegt« nennt, nennt eine Quelle aus der Liste", () => {
  const kurz = A.quellen.map((q) => q.kurz);
  for (const a of A.aufgaben) if (a.stand !== "noch offen") assert.ok(kurz.some((k) => a.beleg.includes(k)), a.id + ": Quelle fehlt");
});

test("keine Punkte, Ranglisten oder Belohnungen als Empfehlung", () => {
  for (const a of A.aufgaben) for (const s of a.sinn) assert.ok(!/Punkte|Rangliste|Belohnung/.test(s), a.id);
});

test("Prinzipien heißen in Taxonomie und Aufgabenkoffer gleich; Verbindungen der Galerie zeigen auf vorhandene Aufgaben", () => {
  const vm = require("vm"); const c = {}; vm.createContext(c);
  vm.runInContext(fs.readFileSync(__dirname + "/../assets/daten/taxonomien.js", "utf8") + ";" + beispiele + ";this.T=TAXONOMIEN;this.B=BEISPIELE;", c);
  for (const p of c.T.prinzipien) assert.strictEqual(A.hebel[p.id], p.name, p.id);
  assert.strictEqual(c.T.prinzipien.length, Object.keys(A.hebel).length);
  const ids = A.aufgaben.map((a) => a.id);
  for (const b of c.B) {
    for (const p of b.prinzipien || []) assert.ok(A.hebel[p], b.id + ": Prinzip " + p);
    for (const a of b.aufgaben || []) assert.ok(ids.includes(a), b.id + ": Aufgabe " + a);
    if (b.geraet) assert.ok(/^Das Gerät /.test(b.geraet) && b.prinzipien && b.prinzipien.length, b.id + ": Geräte-Satz nur mit Prinzip");
    if (b.prinzipien && b.prinzipien.length) assert.ok(b.vorschlag && b.vorschlag.prinzipien, b.id + ": Prinzip ist als Vorschlag gekennzeichnet");
  }
  for (const p of c.T.prinzipien) assert.ok(c.B.some((b) => b.geraet && b.prinzipien.includes(p.id)), "Beispiel mit Satz für " + p.id);
});

// Aufgabenkoffer nach Phasen (ab 4.44): Die Ergänzung passt zu den Daten und zur Taxonomie.
test("Koffer nach Phasen: jede Aufgabenform ist eine Idee oder steht bei »ohne Gerät«; Phasen aus der Taxonomie", () => {
  const K = require("../assets/daten/koffer-ideen.js");
  const T = require("../assets/daten/taxonomien.js");
  const ids = A.aufgaben.map((a) => a.id), ideen = Object.keys(K.ideen);
  assert.deepStrictEqual([...ideen, ...K.ohneGeraet].sort(), [...ids].sort());
  assert.strictEqual(ideen.length, 16);
  for (const p of K.phasen) assert.ok(T.phasen.some((x) => x.id === p), "Phase " + p);
  for (const id of ideen) {
    const k = K.ideen[id];
    assert.ok(k.phasen.length >= 1 && k.phasen.every((p) => K.phasen.includes(p)) && new Set(k.phasen).size === k.phasen.length, id + ": Phasen");
    assert.strictEqual(k.schritte.length, 4, id + ": vier Schritte");
    assert.strictEqual(k.faecher.length, 3, id + ": drei Fächer");
    assert.ok(k.kurz.length > 20 && k.kurz.length < 110 && k.demoFach, id + ": Kurztext und Fach der Probe");
    for (const s of [k.kurz, ...k.schritte, ...k.faecher.map((f) => f[1])]) assert.ok(!/Punkte sammeln|Rangliste als|Belohnung für/.test(s), id);
  }
  for (const p of K.phasen) assert.ok(ideen.filter((id) => K.ideen[id].phasen[0] === p).length >= 2, "Phase " + p + " hat mindestens zwei eigene Ideen");
  for (const id of K.ohneGeraet) assert.strictEqual(A.aufgaben.find((a) => a.id === id).hebel.length, 0, id + ": ohne Prinzip");
});

test("Koffer nach Phasen: zu jeder Idee gibt es ein Bildzeichen und eine Probe im Skript", () => {
  const K = require("../assets/daten/koffer-ideen.js");
  const js = fs.readFileSync(__dirname + "/../assets/aufgabenkoffer.js", "utf8");
  for (const id of Object.keys(K.ideen)) {
    assert.ok(new RegExp("bau\\(\"" + id + "\"").test(js), id + ": Probe");
    assert.ok(new RegExp("\\n    " + id + ": ").test(js), id + ": Bildzeichen");
  }
  assert.ok(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(js), "speichert und sendet nichts");
});
