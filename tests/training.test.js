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

test("Trainingsaufgaben: keine Sprachmodelle, keine Zeitangaben, keine Prozentwerte", () => {
  const text = JSON.stringify(T);
  assert.doesNotMatch(text, MODELLE);
  assert.doesNotMatch(text, /\b\d+\s?(Minuten|Min\.|Stunden)\b/);
  assert.doesNotMatch(text, /\d\s?%/);
  assert.equal(T.status, "Vorschlag, noch nicht erprobt");
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
  const ki = fs.readFileSync(path.join(__dirname, "..", "src", "ki.html"), "utf8");
  const ueber = fs.readFileSync(path.join(__dirname, "..", "src", "ueber.html"), "utf8");
  const gross = n.charAt(0).toUpperCase() + n.slice(1);
  assert.ok(seite.includes(gross + " Übungen"), "ki-aufgaben.html: »" + gross + " Übungen«");
  assert.ok(ki.includes(gross + " Übungen"), "ki.html: »" + gross + " Übungen«");
  assert.ok(ueber.includes(n + " <a href=\"ki-aufgaben.html\">Trainingsaufgaben</a>") || ueber.includes(n + " Trainingsaufgaben"), "ueber.html");
  assert.ok(seite.includes(ZAHLWORT[T.gruppen.length].charAt(0).toUpperCase() + ZAHLWORT[T.gruppen.length].slice(1) + " Fähigkeiten"), "Zahl der Fähigkeiten");
});
