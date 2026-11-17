/* Tests für die Trainingsaufgaben im KI-Training (ab Version 4.46).
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const T = require("../assets/daten/training.js");
const WA = require("../assets/werkstatt-anfrage.js");
const S = require("../assets/daten/schnell.js");

const MODELLE = /chatgpt|gpt-|openai|claude|sonnet|anthropic|gemini|flash|copilot|mistral|llama|nano/i;
const ZAHLWORT = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];

test("Trainingsaufgaben: jede gehört zu einer Fähigkeit und nutzt eine bekannte Funktion", () => {
  const gruppen = T.gruppen.map((g) => g.id);
  const funktionen = T.funktionen.map((f) => f.id).concat("ohne");
  const ids = new Set();
  for (const a of T.aufgaben) {
    assert.ok(gruppen.includes(a.gruppe), a.id);
    assert.ok(funktionen.includes(a.funktion), a.id);
    assert.equal(a.schritte.length, 3, a.id + ": drei Schritte");
    assert.ok(a.geschafft && a.ziel, a.id);
    assert.match(a.geschafft, /^[a-zäöü]/, a.id + ": »Geschafft, wenn …« geht klein weiter");
    assert.ok(!ids.has(a.id), a.id); ids.add(a.id);
  }
  for (const g of T.gruppen) assert.ok(T.aufgaben.some((a) => a.gruppe === g.id), g.id + " hat Aufgaben");
});

test("Trainingsaufgaben: keine Sprachmodelle, keine Minutenangaben, keine Prozentwerte", () => {
  const text = JSON.stringify(T);
  assert.doesNotMatch(text, MODELLE);
  assert.doesNotMatch(text, /\b\d+\s?(Minuten|Min\.|Stunden)\b/);
  assert.doesNotMatch(text, /\d\s?%/);
  assert.equal(T.status, "Vorschlag, noch nicht erprobt");
});

/* ab 4.47: grober Zeitbedarf je Aufgabe (Recherche 17.11.2026: Zeit und KI-Bedarf auf einen Blick) – nur aus der Liste, geschätzt.
   Feld »zeit«, nicht »umfang«: »Umfang« ist in taxonomien.js der Umfang des Gerätes im Unterricht (CLAUDE.md). */
test("Trainingsaufgaben: jede Aufgabe hat einen groben Zeitbedarf aus der Liste, ohne Zahlen", () => {
  const zeiten = T.zeiten.map((z) => z.id);
  assert.deepEqual(zeiten, ["kurz", "freistunde"]);
  for (const a of T.aufgaben) assert.ok(zeiten.includes(a.zeit), a.id + ": Zeit " + a.zeit);
  assert.ok(T.aufgaben.every((a) => !("umfang" in a)), "kein Feld »umfang« (Begriff aus taxonomien.js)");
  for (const z of T.zeiten) assert.doesNotMatch(z.name + z.text, /\d/, z.id + ": keine Zahl");
  const seite = fs.readFileSync(path.join(__dirname, "..", "src", "ki-aufgaben.html"), "utf8");
  assert.match(seite, /Das ist geschätzt\./, "die Seite sagt, dass der Umfang geschätzt ist");
});

test("Trainingsaufgaben: Aufträge haben die fünf Teile der Schnell-Anfrage und fragen nach fehlenden Angaben", () => {
  const mitAuftrag = T.aufgaben.filter((a) => a.ki);
  assert.ok(mitAuftrag.length >= 2);
  for (const a of mitAuftrag) {
    const t = WA.auftrag(Object.assign({ id: "tr-" + a.id }, a.ki), {}, S);
    for (const teil of ["# Ziel", "# Kontext", "# Anforderungen", "# Format", "# Prüfkriterien"]) assert.ok(t.includes(teil), a.id + teil);
    assert.match(t, /Frage mich zuerst nach/);
    assert.doesNotMatch(t, MODELLE);
    assert.equal(/# Material/.test(t), !!a.ki.material, a.id + ": Material-Teil nur, wenn Material angehängt wird");
  }
});

test("Trainingsaufgaben: die Zahlen auf den Seiten stimmen mit den Daten", () => {
  const n = ZAHLWORT[T.aufgaben.length];
  const seite = fs.readFileSync(path.join(__dirname, "..", "src", "ki-aufgaben.html"), "utf8");
  const ki = fs.readFileSync(path.join(__dirname, "..", "src", "fahrplan-ki.json"), "utf8");  // ab 4.47: die Liste steht im Fahrplan KI-Training
  const ueber = fs.readFileSync(path.join(__dirname, "..", "src", "ueber.html"), "utf8");
  const gross = n.charAt(0).toUpperCase() + n.slice(1);
  assert.ok(seite.includes(gross + " Übungen"), "ki-aufgaben.html: »" + gross + " Übungen«");
  assert.ok(ki.includes(gross + " Übungen"), "src/fahrplan-ki.json: »" + gross + " Übungen«");
  assert.ok(ueber.includes(n + " <a href=\"ki-aufgaben.html\">Trainingsaufgaben</a>") || ueber.includes(n + " Trainingsaufgaben"), "ueber.html");
  assert.ok(seite.includes(ZAHLWORT[T.gruppen.length].charAt(0).toUpperCase() + ZAHLWORT[T.gruppen.length].slice(1) + " Fähigkeiten"), "Zahl der Fähigkeiten");
});

/* ab 4.47: ki.html zeigt die Fähigkeiten als Band unter dem Fahrplan – dieselben Namen und Fragen wie in den Daten, ohne Links */
test("Trainingsaufgaben: das Band der Fähigkeiten auf ki.html stimmt mit den Daten", () => {
  const ki = fs.readFileSync(path.join(__dirname, "..", "src", "ki.html"), "utf8");
  const band = ki.slice(ki.indexOf('<ul class="ki-faehig-liste">'), ki.indexOf("</ul>", ki.indexOf('<ul class="ki-faehig-liste">')));
  const paare = [...band.matchAll(/<li><b>([^<]+)<\/b><span>([^<]+)<\/span><\/li>/g)].map((m) => [m[1], m[2]]);
  assert.deepEqual(paare, T.gruppen.map((g) => [g.name, g.frage]));
  assert.doesNotMatch(band, /<a /, "das Band verlinkt nicht – die Werkzeuge stehen nur im Fahrplan");
  const n = ZAHLWORT[T.gruppen.length];
  assert.ok(ki.includes(n.charAt(0).toUpperCase() + n.slice(1) + " Fähigkeiten"), "ki.html: Zahl der Fähigkeiten");
});
