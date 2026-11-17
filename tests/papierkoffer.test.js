/* Tests für den Aufgabenkoffer auf Papier (ab Version 4.46, KI-Training): Ordnung der Stunde und KI-Auftrag je Idee.
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const PK = require("../assets/papierkoffer.js");
const A = require("../assets/daten/aufgaben.js");
const K = require("../assets/daten/koffer-ideen.js");
const W = require("../assets/daten/werkstatt.js");
const T = require("../assets/daten/taxonomien.js");

const ANBIETER = /chatgpt|openai|claude|anthropic|gemini|copilot|mistral|llama|telli|fobizz|f13|ais\.chat/i;

test("Stunde: dieselben vier Phasen wie der Aufgabenkoffer, jede Aufgabenform genau einmal", () => {
  const s = PK.ordne();
  assert.deepEqual(s.phasen.map((p) => p.id), K.phasen);
  for (const p of s.phasen) assert.equal(p.name, T.phasen.find((x) => x.id === p.id).name);
  const ids = s.phasen.flatMap((p) => p.ideen.map((x) => x.a.id));
  assert.equal(ids.length, A.aufgaben.length, "alle Aufgabenformen, auch die zwei ohne Gerät");
  assert.equal(new Set(ids).size, ids.length, "keine doppelt");
  for (const p of s.phasen) for (const x of p.ideen) assert.equal(x.phasen[0], p.id, x.a.id + " steht in seiner ersten Phase");
});

test("Stunde: Papier zuerst, dann Papier und Gerät, dann Gerät – innerhalb jeder Phase", () => {
  const ORT = ["papier", "hybrid", "geraet"];
  for (const p of PK.ordne().phasen) {
    const orte = p.ideen.map((x) => ORT.indexOf(x.a.ort));
    assert.deepEqual(orte, [...orte].sort((a, b) => a - b), p.id);
  }
});

test("Stunde: die Phasen der zwei Aufgaben ohne Gerät stehen in papierPhasen und sind gültig", () => {
  for (const id of K.ohneGeraet) {
    assert.ok(K.papierPhasen[id] && K.papierPhasen[id].length, id);
    for (const p of K.papierPhasen[id]) assert.ok(K.phasen.includes(p), id + ": " + p);
  }
});

test("In jeder Phase: die Kniffe aus KOFFER.jedePhase, mit Auftrag aus der Werkstatt", () => {
  const s = PK.ordne();
  assert.deepEqual(s.jede.kniffe.map((m) => m.id), K.jedePhase);
  assert.equal(s.jede.name, "In jeder Phase");
  for (const m of s.jede.kniffe) {
    const t = PK.kniffAuftrag(m, {});
    assert.ok(t.startsWith("# Ziel\n" + m.ki.ziel), m.id);
  }
});

test("Auftrag: fünf Teile, Papier, Faustregel und die Kniffe der Idee", () => {
  const a = A.aufgaben.find((x) => x.id === "entscheiden");
  const t = PK.auftrag(a, null, { fach: "Pflege", thema: "Sturz", gruppe: "2. Jahr" });
  for (const teil of ["# Ziel", "# Kontext", "# Anforderungen", "# Format", "# Prüfkriterien"]) assert.ok(t.includes(teil), teil);
  assert.ok(t.includes("»" + a.name + "«"));
  assert.ok(t.includes("So geht es auf Papier: " + a.papier));
  assert.ok(t.includes("Faustregel: " + a.regel));
  for (const kid of K.kniffe.entscheiden) {
    const m = W.muster.find((x) => x.id === kid);
    assert.ok(t.includes("Nutze den Kniff »" + m.name + "«"), kid);
  }
  assert.match(t, /Fach: Pflege/);
  assert.doesNotMatch(t, /Frage mich zuerst/);
  assert.match(t, /ohne Gerät/);
});

test("Auftrag: fehlen Angaben, fragt die KI zuerst; keine Anbieternamen, keine Prozentwerte", () => {
  for (const a of A.aufgaben) {
    const t = PK.auftrag(a, null, {});
    assert.match(t, /Frage mich zuerst nach: Fach, Thema, Lerngruppe/, a.id);
    assert.doesNotMatch(t, ANBIETER, a.id);
    assert.doesNotMatch(t, /\d\s?%/, a.id);
  }
});
