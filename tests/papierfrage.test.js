/* Tests für die Papierfrage als eigene Seite (ab Version 4.46): der Prompt »Die ganze Stunde prüfen«.
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const PP = require("../assets/papierfrage-prompt.js");
const K = require("../assets/daten/kurzfassungen.js");
const P = require("../assets/daten/prinzipien.js");
const T = require("../assets/daten/taxonomien.js");

test("Ganze Stunde: alle Phasen, alle sechs Prinzipien mit ihrem Satz und die vier Einstufungen", () => {
  const t = PP.baue({});
  for (const id of ["einstieg", "erarbeitung", "sicherung", "abschluss"]) {
    assert.ok(t.includes(T.phasen.find((p) => p.id === id).name), id);
  }
  for (const p of P) assert.ok(t.includes(p.name + ": " + p.kann), p.id);
  for (const e of T.einstufungen) assert.ok(t.includes("»" + e.name + "«"), e.id);
  assert.match(t, /Passt keines, schreib »keines«/);
});

test("Ganze Stunde: die Regeln kommen aus der Kurzfassung des Skills (eine Quelle für alles)", () => {
  const regeln = K.skills["unterricht-digitalisieren"].papierfrage;
  assert.ok(regeln && regeln.length >= 6, "Liste »Papierfrage« im Skill");
  const t = PP.baue({});
  for (const r of regeln) assert.ok(t.includes("   - " + r), r.slice(0, 40));
  assert.match(t, /Erst festlegen, dann aufdecken/);
  assert.match(t, /Hybrid ist der Normalfall/);
  assert.match(t, /Kriterien und Beispielantworten sehen die Lernenden erst nach dem eigenen Text/);
});

test("Ganze Stunde: Angaben stehen im Kontext, fehlende heißen »noch offen« und die KI fragt nach", () => {
  const voll = PP.baue({ fach: " Pflege ", thema: "Sturzprophylaxe", gruppe: "2. Ausbildungsjahr" });
  assert.match(voll, /- Fach: Pflege\n/);
  assert.match(voll, /- Lerngruppe: 2\. Ausbildungsjahr/);
  assert.doesNotMatch(voll, /frag mich zuerst danach/);
  const leer = PP.baue({ fach: "Pflege" });
  assert.match(leer, /- Thema: noch offen/);
  assert.match(leer, /frag mich zuerst danach/);
});

test("Ganze Stunde: feste Gliederung, keine Noten oder Prozente, keine Anbieter", () => {
  const t = PP.baue({});
  for (const teil of ["# Rolle", "# Auftrag", "# Kontext", "# Vorgehen", "# Form deiner Antwort", "# Regeln", "# Material"]) {
    assert.ok(t.includes(teil), teil);
  }
  assert.match(t, /»Bleibt auf Papier« · »Am Gerät« · »Im Raum«/);
  assert.match(t, /Höchstens drei nächste Schritte/);
  assert.match(t, /Keine Noten, keine Punkte, keine Prozentwerte/);
  assert.doesNotMatch(t, /\d+ ?%/);
  assert.doesNotMatch(t, /ChatGPT|Claude|Gemini|OpenAI|Anthropic|Copilot|telli/i);
});
