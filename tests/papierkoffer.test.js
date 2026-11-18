/* Tests für den Aufgabenkoffer auf Papier (ab Version 4.46, KI-Training; ab 4.49 Variante C: das Arbeitsblatt mit sechs Stellen) und den Auftrag je Idee.
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

test("Stellen (4.49, Variante C): höchstens sechs, von oben nach unten, jeder der 21 Einträge genau einmal", () => {
  const L = PK.stellen();
  assert.ok(L.length <= 6 && L.length === K.papierStellen.length);
  assert.deepEqual(L.map((st) => st.nr), L.map((_, i) => i + 1), "Nummern 1 bis n");
  for (let i = 1; i < L.length; i++) {
    const a = L[i - 1], b = L[i];
    assert.ok(b.y > a.y || (b.y === a.y && a.seite === "links" && b.seite === "rechts"), b.id + ": von oben nach unten, bei gleicher Höhe links vor rechts");
  }
  const ids = L.flatMap((st) => st.eintraege.map((e) => e.id));
  assert.equal(ids.length, A.aufgaben.length + K.jedePhase.length);
  assert.equal(new Set(ids).size, ids.length, "keiner doppelt");
  for (const a of A.aufgaben) assert.ok(ids.includes(a.id), a.id);
  for (const st of L) {
    assert.ok(["links", "rechts"].includes(st.seite) && st.x > 0 && st.x < 1 && st.y > 0 && st.y < 1, st.id + ": Lage auf dem Blatt");
    assert.equal(st.satz.split(/[.!?](\s|$)/).filter((s) => s && s.trim()).length, 1, st.id + ": genau ein Satz");
  }
});

test("Stellen (4.49): ein Kniff, der an der Stelle schon steht, kommt bei der Idee nur mit Verweis – die Aufträge bleiben vollständig", () => {
  const finde = (id) => PK.stellen().flatMap((st) => st.eintraege).find((e) => e.id === id);
  assert.deepEqual(finde("stufen").kniffe.map((k) => [k.m.id, !!(k.schon && k.schon.eintrag)]), [["hilfekarten", true]], "D1");
  assert.equal(finde("reihe").kniffe[0].schon.bei.id, "zuordnen", "D4");
  assert.equal(finde("zuordnen").kniffe.find((k) => k.m.id === "beleg").schon, null, "D3 an zwei Stellen ausführlich");
  assert.equal(finde("markieren").kniffe[0].schon, null);
  const t = PK.auftragVon(finde("reihe"), {});
  assert.equal(t, PK.auftrag(A.aufgaben.find((a) => a.id === "reihe"), null, {}), "derselbe Auftrag wie bis 4.48");
});

test("html (4.49, Variante C): Blatt ohne Text im Bild, sechs Stellen als Sprungmarken, alle 21 Aufträge, Hinweis an jeder Eingabe", () => {
  const h = PK.html();
  const svg = /<svg[\s\S]*?<\/svg>/.exec(h.blatt)[0];
  assert.match(svg, /aria-hidden="true"/);
  assert.doesNotMatch(svg, /<text\b/, "kein Text im Bild");
  assert.equal((h.blatt.match(/class="pkc-knopf"/g) || []).length, 6);
  assert.equal((h.blatt.match(/href="#stelle-/g) || []).length, 6);
  assert.match(h.blatt, /4 Aufträge/);
  assert.doesNotMatch(h.blatt.replace(/<[^>]+>/g, " "), /Prompt/, "erste Ebene: »Auftrag an die KI«, nicht »Prompt«");
  assert.equal((h.listen.match(/<h2 /g) || []).length, 6, "sechs Überschriften");
  assert.equal((h.listen.match(/class="pk-eintrag"/g) || []).length, 21);
  const felder = (h.listen.match(/<textarea [^>]*>/g) || []);
  assert.equal(felder.length, 21);
  for (const f of felder) {
    const d = /aria-describedby="([^"]+)"/.exec(f)[1];
    assert.ok(h.listen.includes('id="' + d + '">' + PK.DATEN_HINWEIS), "Hinweis bei " + f.slice(0, 40));
  }
  assert.match(h.listen, /Frage mich zuerst nach: Fach, Thema, Lerngruppe/);
  assert.doesNotMatch(h.blatt + h.listen, ANBIETER);
  assert.equal((h.listen.match(/class="pk-kopieren" hidden/g) || []).length, 21, "Kopierknopf erst mit Skript");
});

test("Phasen: die zwei Aufgaben ohne Gerät haben ihre Phase in papierPhasen; jeder Eintrag nennt in »Mehr zur Idee« eine gültige Phase", () => {
  for (const id of K.ohneGeraet) {
    assert.ok(K.papierPhasen[id] && K.papierPhasen[id].length, id);
    for (const p of K.papierPhasen[id]) assert.ok(K.phasen.includes(p), id + ": " + p);
  }
  for (const e of PK.stellen().flatMap((st) => st.eintraege)) {
    assert.ok(e.phasen.length && e.phasen.every((p) => T.phasen.some((x) => x.id === p)), e.id);
  }
});

test("Kniffe für jede Phase: eigener Eintrag mit dem Auftrag aus der Werkstatt (unverändert)", () => {
  const kniffe = PK.stellen().flatMap((st) => st.eintraege).filter((e) => e.art === "kniff");
  assert.deepEqual(kniffe.map((e) => e.id).sort(), [...K.jedePhase].sort());
  for (const e of kniffe) {
    assert.deepEqual(e.phasen, ["uebergreifend"], e.id);
    assert.ok(PK.auftragVon(e, {}).startsWith("# Ziel\n" + e.m.ki.ziel), e.id);
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
