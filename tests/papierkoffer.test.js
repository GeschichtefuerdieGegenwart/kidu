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

test("Anlässe (4.49): höchstens vier, jeder der 21 Einträge genau einmal – 18 Aufgabenformen und die drei Kniffe für jede Phase", () => {
  const L = PK.anlaesse();
  assert.ok(L.length <= 4 && L.length === K.papierAnlaesse.length);
  const ids = L.flatMap((an) => an.eintraege.map((e) => e.id));
  assert.equal(ids.length, A.aufgaben.length + K.jedePhase.length);
  assert.equal(new Set(ids).size, ids.length, "keiner doppelt");
  for (const a of A.aufgaben) assert.ok(ids.includes(a.id), a.id);
  for (const kid of K.jedePhase) assert.ok(ids.includes(kid), kid);
  for (const an of L) {
    assert.ok(an.name && an.satz && /[.]$/.test(an.satz), an.id + ": Name und ein Satz");
    assert.equal(an.satz.split(/[.!?](\s|$)/).filter((s) => s && s.trim()).length, 1, an.id + ": genau ein Satz");
    assert.ok(PK.BILD[an.bild], an.id + ": eigenes Bildzeichen");
  }
});

test("Anlässe (4.49): ein Kniff, der im Anlass schon steht, kommt bei der Idee nur mit Verweis – die Aufträge bleiben vollständig", () => {
  const L = PK.anlaesse();
  const finde = (id) => L.flatMap((an) => an.eintraege).find((e) => e.id === id);
  const stufen = finde("stufen");
  assert.deepEqual(stufen.kniffe.map((k) => [k.m.id, !!(k.schon && k.schon.eintrag)]), [["hilfekarten", true]], "D1");
  assert.equal(finde("markieren").kniffe[0].schon, null, "D3 ausführlich beim ersten");
  assert.equal(finde("zuordnen").kniffe.find((k) => k.m.id === "beleg").schon.bei.id, "markieren", "D3 danach mit Verweis");
  assert.equal(finde("reihe").kniffe[0].schon.bei.id, "zuordnen", "D4");
  const t = PK.auftragVon(finde("zuordnen"), {});
  for (const kid of K.kniffe.zuordnen) assert.ok(t.includes("»" + W.muster.find((m) => m.id === kid).name + "«"), "Auftrag nennt " + kid);
  assert.equal(t, PK.auftrag(A.aufgaben.find((a) => a.id === "zuordnen"), null, {}), "derselbe Auftrag wie bis 4.48");
});

test("html (4.49): vier Karten als Sprungmarken, alle 21 Aufträge unter vier Überschriften, Hinweis an jeder Eingabe", () => {
  const h = PK.html({ phase: "Analogen Unterricht mit KI vorbereiten" });
  assert.equal((h.karten.match(/class="koffer-karte"/g) || []).length, 4);
  assert.equal((h.karten.match(/href="#anlass-/g) || []).length, 4);
  assert.equal((h.karten.match(/Analogen Unterricht mit KI vorbereiten/g) || []).length, 4, "Bereichsetikett auf jeder Karte");
  assert.match(h.karten, /6 Aufträge/);
  assert.doesNotMatch(h.karten, /Prompt/, "erste Ebene: »Auftrag an die KI«, nicht »Prompt«");
  assert.equal((h.listen.match(/<h2 /g) || []).length, 4, "vier Überschriften");
  assert.equal((h.listen.match(/class="pk-eintrag"/g) || []).length, 21);
  const felder = (h.listen.match(/<textarea [^>]*>/g) || []);
  assert.equal(felder.length, 21);
  for (const f of felder) {
    const d = /aria-describedby="([^"]+)"/.exec(f)[1];
    assert.ok(h.listen.includes('id="' + d + '">' + PK.DATEN_HINWEIS), "Hinweis bei " + f.slice(0, 40));
  }
  assert.match(h.listen, /Frage mich zuerst nach: Fach, Thema, Lerngruppe/, "ohne Angaben fragt die KI zuerst");
  assert.doesNotMatch(h.karten + h.listen, ANBIETER);
  assert.equal((h.listen.match(/class="pk-kopieren" hidden/g) || []).length, 21, "Kopierknopf erst mit Skript");
});

test("Phasen: die zwei Aufgaben ohne Gerät haben ihre Phase in papierPhasen; jeder Eintrag nennt in »Mehr zur Idee« eine gültige Phase", () => {
  for (const id of K.ohneGeraet) {
    assert.ok(K.papierPhasen[id] && K.papierPhasen[id].length, id);
    for (const p of K.papierPhasen[id]) assert.ok(K.phasen.includes(p), id + ": " + p);
  }
  for (const e of PK.anlaesse().flatMap((an) => an.eintraege)) {
    assert.ok(e.phasen.length && e.phasen.every((p) => T.phasen.some((x) => x.id === p)), e.id);
  }
});

test("Kniffe für jede Phase: eigener Eintrag mit dem Auftrag aus der Werkstatt (unverändert)", () => {
  const kniffe = PK.anlaesse().flatMap((an) => an.eintraege).filter((e) => e.art === "kniff");
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
