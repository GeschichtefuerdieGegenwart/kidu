/* Tests für das Prüf-Labor im KI-Training (ab Version 4.47, Seite pruef-labor.html).
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const P = require("../assets/daten/pruef-labor.js");

const MODELLE = /chatgpt|gpt-|openai|claude|sonnet|anthropic|gemini|copilot|mistral|llama/i;
const seite = fs.readFileSync(path.join(__dirname, "..", "src", "pruef-labor.html"), "utf8");

test("Prüf-Labor: Der Übungstext ist als von Hand geschrieben gekennzeichnet, nicht als KI-Antwort", () => {
  // CLAUDE.md: keine simulierten KI-Antworten – der Text sagt selbst, woher er kommt
  assert.match(P.fehler.hinweis, /Von Hand geschrieben, nicht von einer KI/);
  assert.ok(seite.includes(P.fehler.hinweis), "derselbe Hinweis steht auf der Seite");
  assert.doesNotMatch(seite + JSON.stringify(P), /KI-Antwort:|Antwort der KI/);
});

test("Prüf-Labor: Fehler und richtige Sätze gemischt, jede Fehlerart aus der Liste, jede Auflösung begründet", () => {
  const s = P.fehler.saetze;
  const fehler = s.filter((x) => x.fehler);
  assert.ok(fehler.length >= 3 && s.length - fehler.length >= 2, "mindestens drei Fehler und zwei richtige Sätze");
  for (const x of fehler) assert.ok(P.fehler.arten.includes(x.fehler), x.id + ": Fehlerart " + x.fehler);
  for (const art of P.fehler.arten) assert.ok(fehler.some((x) => x.fehler === art), art + " kommt vor");
  const ids = new Set();
  for (const x of s) {
    assert.ok(x.warum.length > 20, x.id + ": Auflösung in Worten");
    assert.ok(!ids.has(x.id), x.id); ids.add(x.id);
  }
  // Erfundenes ist als erfunden benannt
  for (const x of s.filter((y) => y.fehler === "erfundene Quelle" || y.fehler === "falsches Zitat")) assert.match(x.warum, /erfunden/, x.id);
});

test("Prüf-Labor: Abgeben und Ampel – jeder Vorschlag ist eine der Wahlen und begründet", () => {
  const wege = P.wege.map((w) => w.id);
  const ampel = P.ampel.map((w) => w.id);
  assert.deepEqual(wege, ["selbst", "gemeinsam", "abgeben"]);
  assert.deepEqual(ampel, ["gruen", "gelb", "rot"]);
  for (const x of P.abgeben) { assert.ok(wege.includes(x.vorschlag), x.id); assert.ok(x.warum.length > 20, x.id); }
  for (const x of P.hinein) {
    assert.ok(ampel.includes(x.vorschlag), x.id);
    assert.ok(x.warum.length > 15, x.id);
    assert.equal(!!x.fassung, x.vorschlag !== "gruen", x.id + ": wer nicht hinein darf, bekommt eine datensparsame Fassung");
  }
  // alle drei Wahlen kommen vor – es gibt keine immer passende Antwort
  for (const w of wege) assert.ok(P.abgeben.some((x) => x.vorschlag === w), w);
  for (const w of ampel) assert.ok(P.hinein.some((x) => x.vorschlag === w), w);
  // Bewertung bleibt bei der Lehrkraft
  assert.equal(P.abgeben.find((x) => /Noten/.test(x.aufgabe)).vorschlag, "selbst");
});

test("Prüf-Labor: keine Punkte, keine Minutenangaben, keine Anbieter, Zahlen auf der Seite stimmen", () => {
  const text = JSON.stringify(P);
  assert.doesNotMatch(text, MODELLE);
  assert.doesNotMatch(text, /\bPunkte?\b|richtig beantwortet|\d+ von \d+/);
  assert.doesNotMatch(text, /\b\d+\s?(Minuten|Min\.)\b/);
  assert.equal(P.status, "Vorschlag, noch nicht erprobt");
  const zahl = { 8: "acht" };
  assert.match(seite, new RegExp("Ein Text mit " + zahl[P.fehler.saetze.length] + " Sätzen"));
  assert.match(seite, new RegExp(zahl[P.abgeben.length].replace(/^./, (c) => c.toUpperCase()) + " Aufgaben aus dem Schulalltag"));
  assert.match(seite, new RegExp(zahl[P.hinein.length].replace(/^./, (c) => c.toUpperCase()) + " Angaben für das KI-System"));
});
