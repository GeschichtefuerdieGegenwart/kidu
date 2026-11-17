// Kidu – verschlüsselt den Bereich »Für die Fortbildungsleitung« (ab Version 4.46, Entscheidung Mario 17.11.2026).
// Vorbild: das Lehrkraft-Schloss im GGK-Labor (src/lk-schloss.js, tools/lk-bauen.mjs, 13.11.2026).
//
//   privat/<seite>.html        Klartext – steht NICHT im Repository (.gitignore); Sicherung als Bündel im Claude-Projekt
//   schloss/<seite>.enc.json   verschlüsselt – steht im Repository; tools/bauen.py bettet es in die Seite ein
//
// Aufruf:  KIDU_PASS='das Passwort' node tools/schloss.mjs            (verschlüsselt, was sich geändert hat)
//          KIDU_PASS='das Passwort' node tools/schloss.mjs --pruefen  (öffnet alle Dateien probeweise, schreibt nichts)
//          KIDU_PASS='neues Passwort' node tools/schloss.mjs --neu    (neues Salz, alles neu – nach einem Passwortwechsel)
//          KIDU_PASS='das Passwort' node tools/schloss.mjs --auspacken (schreibt den Klartext nach privat/, wo er fehlt –
//                                                                       so reichen Repository und Passwort, um weiterzuarbeiten)
// Danach: python3 tools/bauen.py
//
// AES-GCM 256, Schlüssel per PBKDF2-SHA-256 mit 600 000 Runden aus dem Passwort. Ein gemeinsames Salz für alle Dateien,
// damit ein einmal eingegebenes Passwort in derselben Browser-Sitzung alle Seiten öffnet; je Datei ein eigener Zufallswert (IV).
// Das Passwort steht nur in der Umgebungsvariablen – nie im Repository, nie im Tresor, nie in den Projektdokumenten.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const QUELLE = join(WURZEL, "privat"), ZIEL = join(WURZEL, "schloss");
const KERN = createRequire(import.meta.url)(join(WURZEL, "assets", "schloss-kern.js"));
const args = process.argv.slice(2), PRUEFEN = args.includes("--pruefen"), NEU = args.includes("--neu"), AUSPACKEN = args.includes("--auspacken");
const pass = KERN.passwortForm(process.env.KIDU_PASS || "");
if (pass.length < 12) { console.error("KIDU_PASS fehlt oder ist kürzer als 12 Zeichen."); process.exit(1); }

if (!existsSync(ZIEL)) mkdirSync(ZIEL);
const vorhanden = readdirSync(ZIEL).filter((f) => f.endsWith(".enc.json"));
const lies = (f) => JSON.parse(readFileSync(join(ZIEL, f), "utf8"));
const salz = !NEU && vorhanden.length ? lies(vorhanden[0]).salt : null;
const schluessel = await KERN.schluesselAusPasswort(pass, salz);

if (AUSPACKEN) {
  if (!existsSync(QUELLE)) mkdirSync(QUELLE);
  let neu = 0, da = 0;
  for (const f of vorhanden) {
    const name = f.replace(".enc.json", ""), q = join(QUELLE, name + ".html");
    if (existsSync(q)) { da++; console.log(`${name}: privat/${name}.html gibt es schon – bleibt unverändert`); continue; }
    try { writeFileSync(q, await KERN.oeffne(lies(f), schluessel.roh)); neu++; console.log("ausgepackt:", "privat/" + name + ".html"); }
    catch (e) { console.error(`${name}: ÖFFNET NICHT mit diesem Passwort`); process.exit(1); }
  }
  console.log(`${neu} ausgepackt, ${da} schon vorhanden.`);
  process.exit(0);
}

if (PRUEFEN) {
  let fehler = 0;
  for (const f of vorhanden) {
    const name = f.replace(".enc.json", "");
    try {
      const klar = await KERN.oeffne(lies(f), schluessel.roh);
      const q = join(QUELLE, name + ".html");
      const vergleich = existsSync(q) ? (readFileSync(q, "utf8") === klar ? "gleich wie privat/" : "WEICHT AB von privat/") : "kein Klartext vorhanden";
      if (vergleich.startsWith("WEICHT")) fehler++;
      console.log(`${name}: öffnet · ${klar.length} Zeichen · ${vergleich}`);
    } catch (e) { fehler++; console.log(`${name}: ÖFFNET NICHT mit diesem Passwort`); }
  }
  console.log(fehler ? `${fehler} Datei(en) mit Fehler.` : `Alle ${vorhanden.length} Dateien öffnen.`);
  process.exit(fehler ? 1 : 0);
}

if (!existsSync(QUELLE)) { console.error("privat/ fehlt. Klartext aus dem Claude-Projekt holen: python3 tools/schloss_buendel.py teilen <Datei>"); process.exit(1); }
let neu = 0, gleich = 0;
for (const f of readdirSync(QUELLE).filter((x) => x.endsWith(".html")).sort()) {
  const name = f.replace(".html", ""), ziel = join(ZIEL, name + ".enc.json"), klar = readFileSync(join(QUELLE, f), "utf8");
  if (!NEU && existsSync(ziel)) {
    try { if (await KERN.oeffne(JSON.parse(readFileSync(ziel, "utf8")), schluessel.roh) === klar) { gleich++; continue; } } catch (e) { /* neu verschlüsseln */ }
  }
  writeFileSync(ziel, JSON.stringify(await KERN.verschliesse(klar, schluessel)) + "\n");
  neu++; console.log("geschrieben:", "schloss/" + name + ".enc.json");
}
console.log(`${neu} neu verschlüsselt, ${gleich} unverändert.`);
