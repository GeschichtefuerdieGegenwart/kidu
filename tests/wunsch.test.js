/* Tests für die Wunsch-Methode (ab Version 4.52): Daten, Regel für die nächsten Schritte, Zeichnung.
   Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const W = require("../assets/daten/wunsch.js");
const S = require("../assets/wunsch.js");
const T = require("../assets/daten/training.js");

const WURZEL = path.join(__dirname, "..");
const MODELLE = /chatgpt|gpt-|openai|claude|sonnet|anthropic|gemini|flash|copilot|mistral|llama|nano|fobizz|telli/i;
const alleTexte = (f) => [f.kann, f.beispiel, f.schritt.text, f.uebung.text, f.kniff, f.aussage];

test("Wunsch-Methode: vier Sätze, drei Kreise, zwölf Felder – jedes Paar genau einmal", () => {
  assert.equal(W.saetze.length, 4);
  assert.equal(W.kreise.length, 3);
  assert.equal(W.felder.length, 12);
  const ids = new Set(W.felder.map((f) => f.id));
  for (const s of W.saetze) for (const k of W.kreise) {
    const f = S.feld(s.id + "-" + k.id);
    assert.ok(f, s.id + "-" + k.id);
    assert.equal(f.satz, s.id); assert.equal(f.kreis, k.id);
    assert.equal(S.titel(f), s.wort + " · " + k.name);
  }
  assert.equal(ids.size, 12);
});

test("Wunsch-Methode: die vier Sätze gehören zu den ersten vier Fähigkeiten des Fahrplans", () => {
  const faehig = T.gruppen.map((g) => g.id);
  assert.deepEqual(W.saetze.map((s) => s.faehigkeit), faehig.slice(0, 4));
  assert.equal(faehig[4], "begleiten", "die fünfte Fähigkeit ist der zweite Kreis");
});

test("Wunsch-Methode: Grundausstattung = die vier Felder »Für mich« und »Wissen · Für meine Lernenden«", () => {
  const grund = W.felder.filter((f) => f.grund).map((f) => f.id).sort();
  assert.deepEqual(grund, ["pruefen-mich", "sagen-mich", "verantworten-mich", "wissen-lernende", "wissen-mich"]);
});

test("Wunsch-Methode: jedes Feld ist vollständig, der erste Schritt ist ein Satz zum Tun", () => {
  for (const f of W.felder) {
    for (const t of alleTexte(f)) assert.ok(t && t.length > 10, f.id);
    assert.equal(typeof f.schritt.ohneKi, "boolean", f.id);
    assert.ok(f.schritt.wo === null || (Array.isArray(f.schritt.wo) && f.schritt.wo.length === 2), f.id);
    assert.ok(W.zeiten[f.uebung.zeit], f.id + ": Zeit der Übung");
    assert.ok(Array.isArray(f.uebung.wo), f.id);
    assert.match(f.aussage, /^(Ich habe|Meine Lernenden haben) /, f.id + ": die Aussage nennt ein Tun, kein Gefühl");
    assert.ok(!/sicher|fühle|kann gut|kenne mich/i.test(f.aussage), f.id + ": keine Selbsteinschätzung");
  }
});

test("Wunsch-Methode: keine Anbieter, keine Minuten, keine Stufen oder Wertungen, keine Versprechen", () => {
  for (const f of W.felder) for (const t of alleTexte(f)) {
    assert.ok(!MODELLE.test(t), f.id + ": " + t);
    assert.ok(!/\d+\s*(Min|Minuten|Stunden|%)/.test(t), f.id + ": keine Minuten- oder Prozentangaben");
    assert.ok(!/Stufe|Niveau|Level|Punkte|Abzeichen|Fortgeschrittene Lehrkr|Anfänger/.test(t), f.id + ": " + t);
    assert.ok(!/spart|Zeitersparnis|schneller|wirkt nachweislich/.test(t), f.id + ": kein Versprechen");
  }
  for (const k of W.kreise) assert.ok(!/Stufe|Niveau|Level/.test(k.name + k.meint + k.folge));
});

test("Wunsch-Methode: Zeitwörter wie im Fahrplan KI-Training", () => {
  const fp = JSON.parse(fs.readFileSync(path.join(WURZEL, "src", "fahrplan-ki.json"), "utf8"));
  assert.deepEqual(W.zeiten, fp.zeiten);
});

test("Wunsch-Methode: jeder Weg führt zu einer Seite, die es gibt – Trainingsaufgaben mit ihrem Namen und ihrer Zeit", () => {
  const wege = [];
  for (const f of W.felder) {
    if (f.schritt.wo) wege.push([f, f.schritt.wo, null]);
    f.uebung.wo.forEach((w, i) => wege.push([f, w, i === 0 ? f.uebung.zeit : null]));
  }
  assert.ok(wege.length >= 12);
  for (const [f, [href, name], zeit] of wege) {
    const [datei, marke] = href.split("#");
    assert.ok(fs.existsSync(path.join(WURZEL, "src", datei)), f.id + ": " + datei);
    assert.ok(name && name.length > 3, f.id);
    if (datei === "ki-aufgaben.html" && marke) {
      const a = T.aufgaben.find((x) => "tr-" + x.id === marke);
      assert.ok(a, f.id + ": Trainingsaufgabe " + marke);
      assert.ok(name.includes("»" + a.name + "«"), f.id + ": »" + a.name + "« steht im Namen des Wegs");
      if (zeit) assert.equal(zeit, a.zeit, f.id + ": die Übung dauert so lang wie die Trainingsaufgabe");
    }
    if ((datei === "pruef-labor.html" || datei === "kollegium.html") && marke) {
      const quelle = fs.readFileSync(path.join(WURZEL, "src", datei), "utf8");
      assert.ok(quelle.includes('id="' + marke + '"'), f.id + ": Sprungmarke " + href);
    }
  }
  const ohne = W.felder.filter((f) => !f.uebung.wo.length).map((f) => f.id);
  assert.deepEqual(ohne, ["wissen-andere"], "nur ein Feld hat noch kein Werkzeug für die Übung – ehrlich als »noch kein Werkzeug« gezeigt");
});

test("Wunsch-Methode: nächste Schritte – erst die Grundausstattung mit dem Prüfen, dann von innen nach außen", () => {
  assert.equal(W.reihenfolge.length, 12);
  assert.deepEqual([...W.reihenfolge].sort(), W.felder.map((f) => f.id).sort());
  assert.deepEqual(W.reihenfolge.slice(0, 5).sort(), W.felder.filter((f) => f.grund).map((f) => f.id).sort());
  assert.equal(W.reihenfolge[0], "pruefen-mich");
  assert.deepEqual(S.naechste([]), ["pruefen-mich", "wissen-mich", "verantworten-mich"]);
  assert.deepEqual(S.naechste(["pruefen-mich"]), ["wissen-mich", "verantworten-mich", "sagen-mich"]);
  // wer außen schon etwas tut, bekommt trotzdem zuerst die offenen Felder der Grundausstattung
  assert.deepEqual(S.naechste(["sagen-andere", "pruefen-mich", "sagen-mich"]), ["wissen-mich", "verantworten-mich", "wissen-lernende"]);
  const grund = W.felder.filter((f) => f.grund).map((f) => f.id);
  assert.deepEqual(S.naechste(grund), ["pruefen-lernende", "verantworten-lernende", "sagen-lernende"]);
  assert.deepEqual(S.naechste(W.felder.map((f) => f.id)), [], "alles angetippt: kein nächster Schritt, kein Urteil");
  assert.equal(S.naechste(W.reihenfolge.slice(0, 10)).length, 2, "höchstens drei, am Ende weniger");
  assert.deepEqual(S.naechste(undefined), S.naechste([]));
});

test("Wunsch-Methode: die Zeichnung hat zwölf Felder im Bild, keinen Text im Bild, alle Wörter als HTML im Rahmen", () => {
  const { bild, liste, lampe } = S.html();
  assert.equal((bild.match(/<a class="wm-feld/g) || []).length, 12);
  assert.equal((bild.match(/class="wm-feld ist-grund"/g) || []).length, 5);
  assert.ok(!/<text\b/.test(bild), "kein <text> im SVG");
  assert.ok(!/https?:/.test(bild + liste + lampe), "keine Adressen im erzeugten HTML");
  for (const s of W.saetze) assert.ok(bild.includes('data-wort="' + s.id + '"') && bild.includes(">" + s.wort + "</span>"), s.wort);
  for (const k of W.kreise) assert.ok(bild.includes(">" + k.name + "</span>"), k.name);
  const g = S.geometrie();
  for (const m of bild.matchAll(/left:([\d.]+)%;top:([\d.]+)%/g)) {
    assert.ok(+m[1] > 0 && +m[1] < 100 && +m[2] > 0 && +m[2] < 100, "Beschriftung liegt im Rahmen: " + m[0]);
  }
  for (const [id, f] of Object.entries(g.felder)) {
    assert.match(f.pfad, /^M[\d. ]+L[\d. ]+A[\d. ]+L[\d. ]+A[\d. ]+Z$/, id);
    assert.ok(f.mitte[0] > 0 && f.mitte[0] < g.breite && f.mitte[1] > 0 && f.mitte[1] < g.mitte[1], id + ": Mitte über der Grundlinie");
  }
  // Fächer von links nach rechts in der Reihenfolge der Sätze, Kreise von innen nach außen
  const abstand = (id) => Math.hypot(g.felder[id].mitte[0] - g.mitte[0], g.felder[id].mitte[1] - g.mitte[1]);
  for (const s of W.saetze) assert.ok(abstand(s.id + "-mich") < abstand(s.id + "-lernende") && abstand(s.id + "-lernende") < abstand(s.id + "-andere"), s.id);
  for (const k of W.kreise) {
    const xs = W.saetze.map((s) => g.felder[s.id + "-" + k.id].mitte[0]);
    assert.deepEqual([...xs].sort((a, b) => a - b), xs, k.id);
  }
  // jedes Feld bleibt antippbar: In der kleinsten gezeigten Breite der Zeichnung (656 px, iPad quer) sind die Ringe mindestens 44 px dick
  for (let i = 0; i < 3; i++) assert.ok((g.radien[i + 1] - g.radien[i] - 5) * 656 / g.breite >= 44, "Ring " + i);
});

test("Wunsch-Methode: die Liste zeigt alle zwölf Felder mit Satz, erstem Schritt, Übung und Kniff", () => {
  const { liste, lampe } = S.html();
  assert.equal((liste.match(/<details class="wm-karte" id="feld-/g) || []).length, 12);
  assert.equal((liste.match(/Dein erster Schritt/g) || []).length, 12);
  assert.equal((liste.match(/Die Übung dazu/g) || []).length, 12);
  assert.equal((liste.match(/Der Kniff dazu:/g) || []).length, 12);
  assert.equal((liste.match(/noch kein eigenes Werkzeug/g) || []).length, 1);
  assert.equal((liste.match(/geht ohne KI/g) || []).length, W.felder.filter((f) => f.schritt.ohneKi).length);
  assert.equal((lampe.match(/<li>/g) || []).length, W.lampe.length);
});
