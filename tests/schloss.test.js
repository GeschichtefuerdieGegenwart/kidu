/* Tests für das Schloss des Bereichs »Für die Fortbildungsleitung« (ab Version 4.46).
   Mit einem Test-Passwort und wenigen Runden, damit der Test schnell läuft. Das echte Passwort steht nirgends im Repository.
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const K = require("../assets/schloss-kern.js");

const WURZEL = path.join(__dirname, "..");

test("Schloss: verschlüsseln und mit demselben Passwort wieder öffnen", async () => {
  const s = await K.schluesselAusPasswort("Probe Wort 12", null, 1000);
  const d = await K.verschliesse("<h1>Geheim</h1>", s);
  assert.equal(d.iter, 1000);
  assert.ok(d.salt && d.iv && d.ct);
  assert.ok(!d.ct.includes("Geheim"));
  const wieder = await K.schluesselAusPasswort("Probe Wort 12", d.salt, d.iter);
  assert.equal(await K.oeffne(d, wieder.roh), "<h1>Geheim</h1>");
});

test("Schloss: ein falsches Passwort öffnet nichts; Großschreibung zählt, Leerzeichen am Rand nicht", async () => {
  const s = await K.schluesselAusPasswort("Probe Wort 12", null, 1000);
  const d = await K.verschliesse("Inhalt", s);
  const falsch = await K.schluesselAusPasswort("probe wort 12", d.salt, d.iter);
  await assert.rejects(K.oeffne(d, falsch.roh));
  const rand = await K.schluesselAusPasswort("  Probe  Wort 12 ", d.salt, d.iter);
  assert.equal(await K.oeffne(d, rand.roh), "Inhalt");
});

test("Schloss: jede Verschlüsselung bekommt einen eigenen Startwert", async () => {
  const s = await K.schluesselAusPasswort("Probe Wort 12", null, 1000);
  const a = await K.verschliesse("gleich", s), b = await K.verschliesse("gleich", s);
  assert.notEqual(a.iv, b.iv);
  assert.notEqual(a.ct, b.ct);
});

test("Schloss: die Dateien im Repository sind verschlüsselt, mit 600 000 Runden und gemeinsamem Salz", () => {
  const dateien = fs.readdirSync(path.join(WURZEL, "schloss")).filter((f) => f.endsWith(".enc.json"));
  // ab 4.48: der Ablauf-Koffer für das KI-Training liegt ebenfalls nur verschlüsselt im Repository
  assert.deepEqual(dateien.sort(), ["ablaeufe.enc.json", "beratung.enc.json", "fortbildung.enc.json", "fortbildungsleitung.enc.json", "leitsaetze.enc.json"]);
  const salze = new Set();
  for (const f of dateien) {
    const d = JSON.parse(fs.readFileSync(path.join(WURZEL, "schloss", f), "utf8"));
    assert.equal(d.iter, K.ITER, f);
    assert.equal(d.alg, "AES-GCM-256/PBKDF2-SHA256", f);
    assert.ok(!/<h1|<section|Fortbildung|Folgetermin/.test(d.ct), f + ": kein Klartext");
    salze.add(d.salt);
  }
  assert.equal(salze.size, 1, "ein Salz für alle, damit ein Passwort den ganzen Bereich öffnet");
});

test("Schloss: der Klartext liegt nicht im Repository", () => {
  assert.match(fs.readFileSync(path.join(WURZEL, ".gitignore"), "utf8"), /^privat\/$/m);
  for (const f of ["fortbildung.html", "beratung.html", "leitsaetze.html", "fortbildungsleitung.html", "ablaeufe.html"]) {
    const src = fs.readFileSync(path.join(WURZEL, "src", f), "utf8");
    assert.match(src, /<!-- schloss:[a-z]+ -->/, f);
    assert.doesNotMatch(src, /Noch nicht erprobt|kein Beschluss|Warum acht Wochen|Folgetermin/, f);
  }
  // ab 4.48: auch die gebaute Seite des Ablauf-Koffers trägt keinen Klartext – nur die verschlüsselten Daten.
  // Geprüft wird an den Ankern der Abschnitte, damit kein Text des Koffers im öffentlichen Test steht.
  const gebaut = fs.readFileSync(path.join(WURZEL, "ablaeufe.html"), "utf8");
  assert.match(gebaut, /data-schloss="ablaeufe"/);
  assert.doesNotMatch(gebaut, /id="ak-(45|90|tag)"|class="ablauf-zeit"|Folgetermin/);
});
