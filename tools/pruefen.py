#!/usr/bin/env python3
"""Prüft die gebauten Seiten und die Daten von Kidu auf die vereinbarten Regeln.

Aufruf:  python3 tools/pruefen.py      (nach tools/bauen.py)
Ergebnis: Liste der Verstöße; Rückgabewert 1, wenn etwas gefunden wurde.

Geprüft werden
- Kennzeichnung in der Fußzeile jeder Seite, Hauptnavigation mit genau drei Bereichen,
- alte Namen (»Showroom«, »Mehrwert-Check«, »Hilde-Digital«, »Hilde Digital«) nur noch auf der Weiterleitung
  (»Hilde Digital« und »Papierprobe« als frühere Namen auch auf »Über Kidu«),
- ab 4.49 der Aufgabenkoffer auf Papier: Teile aktuell aus PAPIERKOFFER.html(), höchstens sechs Stellen, alle 21 Einträge, an jeder Eingabe
  der Hinweis zu personenbezogenen Daten, auf der ersten Ebene kein »Prompt«,
- ab 4.49 die alte Bezeichnung der Phase 2 im KI-Training (»Unterricht mit KI vorbereiten« ohne »Analogen«, »klassischer Unterricht«)
  in den Seiten und in den Skripten und Daten – sie heißt jetzt »Analogen Unterricht mit KI vorbereiten«,
- verbotene Inhalte (Platzhalter, Logo, Kontaktadresse, »offizielles Digitalkonzept«),
- Fachbegriffe auf Start- und Bereichsseiten und in den Texten der geführten Wege,
  auf »Mehrwert« und »Über Kidu« nur in aufklappbaren Vertiefungen,
- externe Dateien und Links in den Seiten (nicht erlaubt),
- interne Links (Ziel muss existieren),
- Schriftgrößen unter 16 Pixel im Seitentext,
- die Beispieldaten: Pflichtfelder, erlaubte Werte, eindeutige IDs und Slugs,
  Links nur auf die freigegebenen Seiten, Konzeptbeispiele ohne Link, Vorschläge nur für vorhandene Felder,
  Qualitätscheck nur mit Datum, höchstens drei Stärken ohne Zahl, Sicherheit mindestens »mittel«,
  »Zum Anfangen« (Feld auswahl): genau sechs Einträge, zwei je Umfang, alle »im Unterricht erprobt«, mit Grund-Satz,
- die Galerie: jedes Bild vorhanden, eigener Alternativtext, Bildtext, Bilder nur für bekannte Beispiele,
  keine Galeriebilder für Konzeptbeispiele.
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
SEITEN = ["index.html", "ki.html", "unterricht.html", "digitalisieren.html", "tablets.html", "passt.html", "beobachtung.html", "tablet-phasen.html", "ist-stand.html", "fortbildungsbogen.html", "rueckmeldebogen.html", "fortbildung.html", "leitsaetze.html", "fuenf-saetze.html", "sechs-hebel.html", "sechs-hebel-film.html", "digital-check.html", "selbstcheck.html", "mehrwert.html",
          "muster.html", "aufgabenkoffer.html", "auftraege.html", "ki-fach.html", "sicher.html", "lernende-ki.html", "beratung.html", "galerie.html", "beispiel.html", "showroom.html", "ueber.html", "gestaltung.html", "werkzeugkiste.html",
          # ab 4.46: Papierfrage als Seite, Skillkoffer, Tipps und Tricks, geschützter Bereich
          "papierfrage.html", "skillkoffer.html", "tipps.html", "fortbildungsleitung.html", "ki-aufgaben.html", "papierkoffer.html",
          # ab 4.47: KI-Training als Fahrplan – drei Seiten aus der alten ki.html, Prüf-Labor, Mit dem Kollegium
          "erste-minuten.html", "schnell-anfrage.html", "prompten.html", "pruef-labor.html", "kollegium.html",
          "vier-wochen.html", "bewertung.html", "ablaeufe.html",  # ab 4.48
          "wunsch-methode.html"]  # ab 4.52
# Seiten, auf denen Fachbegriffe nur in aufklappbaren Vertiefungen (<details>) stehen dürfen
MIT_VERTIEFUNG = ["mehrwert.html", "selbstcheck.html", "digital-check.html", "ueber.html"]
EINSTIEG = ["index.html", "ki.html", "unterricht.html", "digitalisieren.html", "tablets.html", "passt.html", "beobachtung.html", "tablet-phasen.html", "ist-stand.html", "fortbildungsbogen.html", "rueckmeldebogen.html", "fortbildung.html", "leitsaetze.html", "fuenf-saetze.html", "sechs-hebel.html", "galerie.html", "muster.html", "aufgabenkoffer.html", "auftraege.html", "ki-fach.html", "sicher.html", "lernende-ki.html", "beratung.html", "papierfrage.html", "skillkoffer.html", "tipps.html", "fortbildungsleitung.html", "ki-aufgaben.html", "papierkoffer.html",
            "erste-minuten.html", "schnell-anfrage.html", "prompten.html", "pruef-labor.html", "kollegium.html",
            "vier-wochen.html", "bewertung.html", "ablaeufe.html",  # ab 4.48
            "wunsch-methode.html"]  # ab 4.52
# Skripte, deren Texte auf Einstiegs- und Bereichsseiten erscheinen
EINSTIEG_SKRIPTE = ["assets/start.js", "assets/check-weg.js", "assets/check-regeln.js", "assets/tablets-weg.js", "assets/einheit.js", "assets/regeln.js", "assets/daten/taxonomien.js",
                    "assets/ki-weg.js", "assets/ki-anfrage.js", "assets/daten/texte.js", "assets/passt.js", "assets/beobachtung.js", "assets/fortbildungsbogen.js", "assets/rueckmeldebogen.js",
                    "assets/probe.js", "assets/digital-check.js", "assets/ki-schnell.js", "assets/schnell-anfrage.js", "assets/daten/schnell.js", "assets/digitalisieren.js", "assets/daten/digitalisieren.js", "assets/galerie-buehne.js", "assets/daten/galerie.js", "assets/anfangen.js", "assets/werkstatt.js", "assets/werkstatt-anfrage.js", "assets/daten/werkstatt.js", "assets/sechs-hebel.js", "assets/sechs-hebel-proben.js", "assets/sechs-hebel-rad.js", "assets/phasen-bild.js",
                    "assets/film-buehne.js", "assets/film.js",  # ab 4.40: der Film auf der Startseite
                    "assets/fahrplan.js",  # ab 4.41: Fahrplan der Bereichsseite »Digitaler Unterricht«
                    "assets/papierfrage-prompt.js", "assets/daten/prinzipien.js", "assets/daten/skillkoffer.js", "assets/werkzeugkiste.js",
                    "assets/aufgabenkoffer.js", "assets/daten/koffer-ideen.js", "assets/schloss.js",
                    "assets/papierkoffer.js", "assets/training.js", "assets/daten/training.js",  # ab 4.46
                    "assets/pruef-labor.js", "assets/daten/pruef-labor.js",  # ab 4.47
                    "assets/ki-faehig.js", "assets/vier-wochen.js", "assets/daten/bewertung.js", "assets/bewertung.js", "assets/daten/probe.js",  # ab 4.48
                    "assets/wunsch.js", "assets/daten/wunsch.js"]  # ab 4.52
FACHBEGRIFFE = ["Adaptivität", "kognitive Aktivierung", "formative Diagnostik", "Multimodalität",
                "Gamification", "selbstreguliert", "responsive Lernumgebung", "digitale Transformation",
                "Anforderungsbereich", "Beutelsbacher", "Binnendifferenzierung",
                "Lehrfunktion", "Konsolidierung"]  # ab 4.19: nur in Vertiefungen (<details>); die letzten zwei ab 4.37
# Wörter, die auf Start- und Bereichsseiten und in den geführten Wegen nicht stehen sollen (Kritik vom 18.10.2026)
EINSTIEG_WOERTER = ["Digitalität", "Lernsetting", "HTML-Lernumgebung"]
VERBOTEN = ["ergänzen]", "Schullogo", "Kontaktadresse", "offizielles Digitalkonzept", "@"]
KENNZEICHNUNG = "Kidu · Künstliche Intelligenz und digitaler Unterricht · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept."
URHEBERZEILE = "© 2026 Mario Walter · entwickelt mit Unterstützung eines KI-Systems · Texte CC BY-NC-SA 4.0 · Code MIT"
LIZENZDATEIEN = ["LICENSE", "LICENSE-TEXTE.md", "ENTSTEHUNG.md"]
ALTE_NAMEN = ["Showroom", "Mehrwert-Check", "Hilde-Digital", "Hilde Digital", "Papierprobe", "Über das Modul", "KI für meine Arbeit",
              "mit KI entwickelt", "Mit KI entwickelt"]  # Kategorie gestrichen (Version 4.4)
ERLAUBTE_HOSTS = ("https://geschichtefuerdiegegenwart.github.io/",)
# ab 4.49 (Entscheidung Mario, 17.11.2026): Phase 2 des KI-Trainings heißt »Analogen Unterricht mit KI vorbereiten«.
ALTE_BEZEICHNUNG = re.compile(r"(?<!Analogen )Unterricht mit KI vorbereiten|klassische[nmrs]? Unterricht", re.IGNORECASE)
NEUE_BEZEICHNUNG = "Analogen Unterricht mit KI vorbereiten"

PFLICHT = ["id", "slug", "titel", "kurz", "status", "bereich", "fach"]


def text_ohne_tags(html):
    html = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html)
    return re.sub(r"<[^>]+>", " ", html)


def pruefe_seiten(fehler):
    for name in SEITEN:
        pfad = WURZEL / name
        if not pfad.exists():
            fehler.append(f"{name}: Seite fehlt – erst tools/bauen.py ausführen")
            continue
        html = pfad.read_text(encoding="utf-8")
        text = text_ohne_tags(html)
        if URHEBERZEILE not in text:
            fehler.append(f"{name}: Urheberzeile fehlt")
        if KENNZEICHNUNG not in text:
            fehler.append(f"{name}: Kennzeichnung fehlt")
        nav = re.search(r'<nav class="nav"[^>]*>([\s\S]*?)</nav>', html)
        # ab 4.36 »Unterrichtsbeispiele« statt »Galerie« (Entscheidung Mario, 13.11.2026); das weiche Trennzeichen zählt nicht mit
        if not nav or [x.replace("&shy;", "") for x in re.findall(r"<a [^>]*>([^<]+)</a>", nav.group(1))] != ["KI-Training", "Digitaler Unterricht", "Unterrichtsbeispiele"]:
            fehler.append(f"{name}: Hauptnavigation muss genau KI-Training · Digitaler Unterricht · Unterrichtsbeispiele zeigen")
        if name != "showroom.html":
            for alt in ALTE_NAMEN:
                if alt in ("Hilde Digital", "Papierprobe") and name == "ueber.html":
                    continue  # der frühere Name wird nur auf »Über Kidu« erklärt (01.11.2026)
                if alt in text:
                    fehler.append(f"{name}: alter Name »{alt}«")
        for wort in VERBOTEN:
            if wort in html:
                fehler.append(f"{name}: verbotener Inhalt »{wort}«")
        for m in ALTE_BEZEICHNUNG.finditer(re.sub(r"\s+", " ", text)):
            fehler.append(f"{name}: alte Bezeichnung »{m.group(0)}« – die Phase heißt »{NEUE_BEZEICHNUNG}«")
        if name in MIT_VERTIEFUNG:
            ohne_vertiefung = text_ohne_tags(re.sub(r"<details[\s\S]*?</details>", " ", html))
            for wort in FACHBEGRIFFE:
                if wort.lower() in ohne_vertiefung.lower():
                    fehler.append(f"{name}: Fachbegriff außerhalb einer Vertiefung »{wort}«")
        if name in EINSTIEG:
            for wort in EINSTIEG_WOERTER:
                if wort.lower() in text.lower():
                    fehler.append(f"{name}: schwieriges Wort auf Einstiegsseite »{wort}«")
            # ab 4.19 (Entscheidung Mario, 9.11.2026): Fachbegriffe sind auch auf Einstiegsseiten in aufklappbaren
            # Vertiefungen erlaubt – so wie CLAUDE.md es verlangt. Geprüft wird der Text ohne <details>.
            ohne_details = text_ohne_tags(re.sub(r"<details[\s\S]*?</details>", " ", html))
            for wort in FACHBEGRIFFE:
                if wort.lower() in ohne_details.lower():
                    fehler.append(f"{name}: Fachbegriff auf Einstiegsseite »{wort}«")
        for url in re.findall(r'(?:src|href)="(https?://[^"]+)"', html):
            fehler.append(f"{name}: externe Datei oder Link {url}")
        for ziel in re.findall(r'(?:src|href)="([^"#:]+)(?:#[^"]*)?"', html):
            ziel = ziel.split("?")[0]  # Prüfwert ?v=… aus tools/bauen.py
            if not (WURZEL / ziel).exists():
                fehler.append(f"{name}: interner Link ohne Ziel {ziel}")
        if re.search(r"font-size:\s*(0?\.[0-8]\d*rem|1[0-5]px)", html):
            fehler.append(f"{name}: Schrift kleiner als 16 Pixel im Seitentext")


def pruefe_css(fehler):
    css = (WURZEL / "assets" / "hilde.css").read_text(encoding="utf-8")
    for zahl, einheit in re.findall(r"font-size:\s*([0-9.]+)(rem|px)", css):
        if (einheit == "rem" and float(zahl) < 1) or (einheit == "px" and float(zahl) < 16):
            fehler.append(f"hilde.css: Schrift kleiner als 16 Pixel ({zahl}{einheit})")


def pruefe_skripte(fehler):
    for pfad in sorted((WURZEL / "assets").rglob("*.js")):
        rel = pfad.relative_to(WURZEL).as_posix()
        inhalt = pfad.read_text(encoding="utf-8")
        for wort in VERBOTEN:
            if wort in inhalt:
                fehler.append(f"{rel}: verbotener Inhalt »{wort}«")
        for m in ALTE_BEZEICHNUNG.finditer(inhalt):
            fehler.append(f"{rel}: alte Bezeichnung »{m.group(0)}« – die Phase heißt »{NEUE_BEZEICHNUNG}«")
        if rel in EINSTIEG_SKRIPTE:
            for wort in EINSTIEG_WOERTER:
                if wort.lower() in inhalt.lower():
                    fehler.append(f"{rel}: schwieriges Wort in einem geführten Weg »{wort}«")
            for wort in FACHBEGRIFFE:
                if wort.lower() in inhalt.lower():
                    fehler.append(f"{rel}: Fachbegriff in einem geführten Weg »{wort}«")
        for url in re.findall(r'"(https?://[^"]+)"', inhalt):
            if not url.startswith(ERLAUBTE_HOSTS):
                fehler.append(f"{rel}: Link außerhalb der freigegebenen Seiten {url}")


def lade_daten():
    node = shutil.which("node")
    if not node:
        return None, None
    skript = ("const t=require('./assets/daten/taxonomien.js');const b=require('./assets/daten/beispiele.js');"
              "const g=require('./assets/daten/galerie.js');process.stdout.write(JSON.stringify({t,b,g}))")
    aus = subprocess.run([node, "-e", skript], cwd=WURZEL, capture_output=True, text=True, check=True)
    d = json.loads(aus.stdout)
    return d["t"], d["b"], d["g"]


def pruefe_daten(fehler):
    try:
        tax, beispiele, galerie = lade_daten()
    except subprocess.CalledProcessError as e:
        fehler.append(f"Daten: lassen sich nicht laden ({e.stderr.strip()[:200]})")
        return
    if tax is None:
        print("! node fehlt – Datenprüfung übersprungen")
        return
    ids = lambda liste: {x["id"] for x in tax[liste]}
    erlaubt = {
        "phasen": ids("phasen"), "anliegen": ids("anliegen"), "rollen": ids("rollen"),
        "mehrwerte": ids("mehrwerte"),
    }
    umfaenge = ids("umfang") | {None}
    bereiche = ids("bereiche")
    ki = ids("kiEinsatz") | {None}
    gesehen_id, gesehen_slug = set(), set()
    for b in beispiele:
        wer = b.get("id", "?")
        for feld in PFLICHT:
            if not b.get(feld):
                fehler.append(f"Beispiel {wer}: Pflichtfeld »{feld}« fehlt")
        if b["id"] in gesehen_id:
            fehler.append(f"Beispiel {wer}: ID doppelt")
        if b["slug"] in gesehen_slug:
            fehler.append(f"Beispiel {wer}: Slug doppelt")
        gesehen_id.add(b["id"]); gesehen_slug.add(b["slug"])
        if not re.fullmatch(r"[a-z0-9-]+", b["slug"] or ""):
            fehler.append(f"Beispiel {wer}: Slug nur aus Kleinbuchstaben, Ziffern und Bindestrich")
        if b["status"] not in tax["status"]:
            fehler.append(f"Beispiel {wer}: Status »{b['status']}« nicht erlaubt")
        if b["bereich"] not in bereiche:
            fehler.append(f"Beispiel {wer}: Bereich »{b['bereich']}« nicht erlaubt")
        if b.get("umfang") not in umfaenge:
            fehler.append(f"Beispiel {wer}: Umfang »{b.get('umfang')}« nicht erlaubt")
        if b.get("kiEinsatz") not in ki:
            fehler.append(f"Beispiel {wer}: KI-Einsatz »{b.get('kiEinsatz')}« nicht erlaubt")
        for feld, werte in erlaubt.items():
            for w in b.get(feld, []):
                if w not in werte:
                    fehler.append(f"Beispiel {wer}: {feld} »{w}« nicht erlaubt")
        link = b.get("link")
        if link and not link.startswith(ERLAUBTE_HOSTS):
            fehler.append(f"Beispiel {wer}: Link außerhalb der freigegebenen Seiten")
        if b.get("vorschauArt") == "konzept" or b["status"] == "Idee":
            if link:
                fehler.append(f"Beispiel {wer}: Konzeptbeispiel darf keinen Link haben")
            if b.get("erfahrung"):
                fehler.append(f"Beispiel {wer}: Konzeptbeispiel darf keine Erfahrung haben")
        if b.get("bild") and not (WURZEL / b["bild"]).exists():
            fehler.append(f"Beispiel {wer}: Bild fehlt {b['bild']}")
        for teil in ("vorher", "nachher"):
            v = (b.get("vergleich") or {}).get(teil)
            if v and not (WURZEL / v["bild"]).exists():
                fehler.append(f"Beispiel {wer}: Vergleichsbild fehlt {v['bild']}")
        beo = b.get("beobachtung")
        if beo is not None:
            if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(beo)):
                fehler.append(f"Beispiel {wer}: Beobachtung braucht ein Datum JJJJ-MM-TT")
            if b.get("status") != "im Unterricht erprobt":
                fehler.append(f"Beispiel {wer}: Beobachtungsbogen nur bei »im Unterricht erprobt«")
        q = b.get("qualitaetscheck")
        if q:
            if not q.get("datum") or not q.get("staerken"):
                fehler.append(f"Beispiel {wer}: Qualitätscheck braucht Datum und Stärken")
            if len(q.get("staerken") or []) > 3:
                fehler.append(f"Beispiel {wer}: höchstens drei Stärken")
            if q.get("sicherheit") not in ("hoch", "mittel"):
                fehler.append(f"Beispiel {wer}: Stärken erst ab mittlerer Sicherheit")
            if any(ch.isdigit() for st in q.get("staerken") or [] for ch in st):
                fehler.append(f"Beispiel {wer}: Stärken ohne Zahl")
        for feld in (b.get("vorschlag") or {}):
            if feld not in b:
                fehler.append(f"Beispiel {wer}: Vorschlag für unbekanntes Feld »{feld}«")
    pruefe_einheiten(fehler, beispiele, tax)
    pruefe_auswahl(fehler, beispiele)
    pruefe_galerie(fehler, beispiele, galerie)
    print(f"Daten: {len(beispiele)} Beispiele geprüft")


def pruefe_einheiten(fehler, beispiele, tax):
    """ab 4.37 (Fassung B): Eine Einheit ist ein Rahmen über mehrere Stunden, keine vierte Stufe – also kein eigener Umfang.
    Sie nennt mindestens zwei Stunden, die es in Kidu gibt; jede Stunde gehört höchstens zu einer Einheit.
    Der Rahmen hat genau die fünf Merkmale aus taxonomien.js; leer heißt »noch offen«."""
    ids = {b["id"]: b for b in beispiele}
    merkmale = [m["id"] for m in tax["einheit"]["merkmale"]]
    gesehen = {}
    for e in (b for b in beispiele if b.get("art") == "einheit"):
        wer = e["id"]
        if e.get("umfang"):
            fehler.append(f"Einheit {wer}: keinen eigenen Umfang – der Umfang gilt je Stunde")
        if e.get("auswahl"):
            fehler.append(f"Einheit {wer}: gehört nicht zu den sechs Beispielen »Zum Anfangen«")
        if len(e.get("stunden") or []) < 2:
            fehler.append(f"Einheit {wer}: mindestens zwei Stunden")
        for s in e.get("stunden") or []:
            if s not in ids:
                fehler.append(f"Einheit {wer}: Stunde »{s}« gibt es nicht")
            elif ids[s].get("art") == "einheit":
                fehler.append(f"Einheit {wer}: »{s}« ist selbst eine Einheit")
            elif s in gesehen:
                fehler.append(f"Einheit {wer}: Stunde »{s}« gehört schon zu {gesehen[s]}")
            gesehen[s] = wer
        if sorted((e.get("rahmen") or {}).keys()) != sorted(merkmale):
            fehler.append(f"Einheit {wer}: Rahmen braucht genau die Merkmale {', '.join(merkmale)}")
    print(f"Einheiten: {sum(1 for b in beispiele if b.get('art') == 'einheit')} geprüft")


def pruefe_auswahl(fehler, beispiele):
    """»Zum Anfangen« in der Galerie: genau sechs Beispiele, zwei je Umfang, alle erprobt, jedes mit einem Grund-Satz.
    Keine Rangfolge – deshalb gibt es auch kein Feld für eine Reihenfolge."""
    auswahl = [b for b in beispiele if b.get("auswahl")]
    if len(auswahl) != 6:
        fehler.append(f"Auswahl »Zum Anfangen«: genau sechs Beispiele erwartet, {len(auswahl)} gefunden")
    je_umfang = {}
    for b in auswahl:
        wer = b["id"]
        je_umfang[b.get("umfang")] = je_umfang.get(b.get("umfang"), 0) + 1
        if b["status"] != "im Unterricht erprobt":
            fehler.append(f"Auswahl {wer}: nur erprobte Beispiele (Status »{b['status']}«)")
        if not (b["auswahl"].get("grund") or "").strip():
            fehler.append(f"Auswahl {wer}: Grund-Satz fehlt")
        if "reihenfolge" in b["auswahl"] or "rang" in b["auswahl"]:
            fehler.append(f"Auswahl {wer}: keine Rangfolge in der Auswahl")
    for umfang in ("punktuell", "phasenweise", "durchgaengig"):
        if je_umfang.get(umfang, 0) != 2:
            fehler.append(f"Auswahl »Zum Anfangen«: je Umfang genau zwei Beispiele, »{umfang}« hat {je_umfang.get(umfang, 0)}")
    print(f"Auswahl »Zum Anfangen«: {len(auswahl)} Beispiele geprüft")


def pruefe_galerie(fehler, beispiele, galerie):
    nach_id = {b["id"]: b for b in beispiele}
    alts = set()
    zahl = 0
    for pid, ansichten in galerie.items():
        b = nach_id.get(pid)
        if not b:
            fehler.append(f"Galerie {pid}: kein Beispiel mit dieser ID")
            continue
        if b.get("vorschauArt") == "konzept" or b["status"] == "Idee":
            fehler.append(f"Galerie {pid}: Konzeptbeispiel darf kein echtes Bild haben")
        for a in ansichten:
            zahl += 1
            if not (WURZEL / a.get("bild", "")).exists():
                fehler.append(f"Galerie {pid}: Bild fehlt {a.get('bild')}")
            elif not (WURZEL / a["bild"].replace("assets/galerie/", "assets/galerie/duplex/")).exists():
                fehler.append(f"Galerie {pid}: Duplex-Vorschau fehlt – python3 tools/duplex.py ausführen ({a['bild']})")
            if not a.get("alt") or len(a["alt"]) < 20:
                fehler.append(f"Galerie {pid}: Alternativtext fehlt oder ist zu kurz ({a.get('bild')})")
            elif a["alt"] in alts:
                fehler.append(f"Galerie {pid}: Alternativtext doppelt ({a.get('bild')})")
            alts.add(a.get("alt"))
            if not a.get("text"):
                fehler.append(f"Galerie {pid}: Bildtext fehlt ({a.get('bild')})")
    print(f"Galerie: {zahl} Ansichten aus {len(galerie)} Projekten geprüft")


def pruefe_werkzeugkiste(fehler):
    """ab Version 4.25: Kurzfassungen und Downloads müssen zur Quelle passen; im Plugin keine alten Namen außer in der Versionsgeschichte."""
    import importlib.util
    spec = importlib.util.spec_from_file_location("werkzeugkiste", WURZEL / "tools" / "werkzeugkiste.py")
    wk = importlib.util.module_from_spec(spec); spec.loader.exec_module(wk)
    fehler.extend(wk.veraltet())
    for pfad in sorted((WURZEL / "werkzeugkiste").rglob("*.md")) + sorted((WURZEL / "werkzeugkiste").rglob("*.json")):
        for nr, zeile in enumerate(pfad.read_text(encoding="utf-8").splitlines(), 1):
            if re.match(r"\s*- \*\*(v|0\.)", zeile) or zeile.startswith("Änderungen ("):
                continue  # Versionsgeschichte hält fest, wie es damals hieß
            for alt in ("Hilde Digital", "hilde-digital", "Hilde-Domin-Schule"):
                if alt in zeile:
                    fehler.append(f"{pfad.relative_to(WURZEL).as_posix()}:{nr}: alter Name »{alt}«")
    sk = wk.sammle()["skills"]
    for name in ("unterricht-digitalisieren", "digital-check", "lernseite-bauen"):
        if name not in sk or not sk[name]["anforderungen"]:
            fehler.append(f"Methodenkoffer: Kurzfassung »{name}« fehlt oder ist leer")
    for name, k in sk.items():
        for z in [k.get("ziel", ""), k.get("format", ""), k.get("kurz", "")] + k["anforderungen"] + k["pruef"]:
            if re.search(r"ChatGPT|OpenAI|Claude|Anthropic|Gemini|Copilot|Mistral|%|@", z or ""):
                fehler.append(f"Methodenkoffer: Kurzfassung »{name}« nennt einen Anbieter, ein Prozentzeichen oder ein @")
    # ab 4.51: Die Grundregeln stehen im Wortlaut nur in unterricht-digitalisieren. Jeder andere Skill trägt
    # dieselbe Kurzzeile mit einem Stichwort je Regel; ändert sich eine Regel, wird nur dort geändert.
    skills = WURZEL / "werkzeugkiste" / "kidu" / "skills"
    wort = (skills / "unterricht-digitalisieren" / "SKILL.md").read_text(encoding="utf-8")
    regeln = re.search(r"^## Grundregeln[^\n]*\n([\s\S]*?)(?=^## )", wort, re.M)
    zahl = len(re.findall(r"^\d+\. \*\*", regeln.group(1), re.M)) if regeln else 0
    if not zahl:
        fehler.append("unterricht-digitalisieren: Abschnitt »Grundregeln« mit nummerierten Regeln fehlt")
    kurz = {}
    for datei in sorted(skills.glob("*/SKILL.md")):
        if datei.parent.name == "unterricht-digitalisieren":
            continue
        m = re.search(r"^\*\*Grundregeln\*\* – Wortlaut in `unterricht-digitalisieren`: (.+?ehrlich berichten\.)",
                      datei.read_text(encoding="utf-8"), re.M)
        if not m:
            fehler.append(f"{datei.parent.name}: Kurzzeile »Grundregeln« fehlt (Wortlaut in unterricht-digitalisieren)")
            continue
        kurz[datei.parent.name] = m.group(1)
        if len(m.group(1).split(" · ")) != zahl:
            fehler.append(f"{datei.parent.name}: Kurzzeile nennt {len(m.group(1).split(' · '))} Grundregeln, unterricht-digitalisieren hat {zahl}")
    if len(set(kurz.values())) > 1:
        fehler.append("Grundregeln: Die Kurzzeilen lauten nicht gleich – " + ", ".join(sorted(kurz)))
    print(f"Grundregeln: Wortlaut in unterricht-digitalisieren ({zahl} Regeln), Kurzzeile in {len(kurz)} Skills geprüft")



def pruefe_film(fehler):
    """ab Version 4.40: assets/film-buehne.js muss zur Quelle in src/film/ passen; Bilder des Films müssen da sein."""
    import importlib.util
    spec = importlib.util.spec_from_file_location("film", WURZEL / "tools" / "film.py")
    fm = importlib.util.module_from_spec(spec); spec.loader.exec_module(fm)
    fehler.extend(fm.veraltet())
    d = fm.daten()
    if len(d["kapitel"]) != len(re.findall(r'<div class="s s\d', d["buehne"])):
        fehler.append("src/film: Zahl der Kapitel und der Szenen auf der Bühne passen nicht zusammen")
    for bild in sorted(set(re.findall(r'src="(assets/film/[^"]+)"', d["buehne"]))):
        if not (WURZEL / bild).exists():
            fehler.append(f"src/film/buehne.html: Bild {bild} fehlt")
    # ab 4.40: der Film als Text, Abschnitte und Standbilder liegen im Kapitel, Zeiten passen zum Kapitel
    kap = d["kapitel"]
    for i, k in enumerate(kap):
        bis = kap[i + 1]["start"] if i + 1 < len(kap) else d["dauer"] + 5
        if not (k.get("text") or "").strip():
            fehler.append(f"src/film/kapitel.json: Kapitel {i + 1} ohne Text (der Film als Text)")
        for t in k.get("bilder", [k["bild"]]):
            if not k["start"] <= t < bis:
                fehler.append(f"src/film/kapitel.json: Standbild {t} liegt nicht in Kapitel {i + 1}")
        for h in k.get("halte", []):
            if not k["start"] < h["start"] < min(bis, d["dauer"]):
                fehler.append(f"src/film/kapitel.json: Abschnitt »{h['name']}« liegt nicht in Kapitel {i + 1}")
    # ab 4.40: sichtbarer Text des Films ohne alte Namen (Namen seit 13.11.2026, CLAUDE.md)
    sichtbar = re.sub(r"<[^>]+>", " ", d["buehne"].replace("<br>", " "))
    sichtbar = " ".join([sichtbar] + [k["name"] + " " + k.get("text", "") for k in kap])
    for alt, muster in [("Galerie", r"Galerie"), ("Unterricht planen", r"Unterricht planen"),
                        ("Unterricht digitalisieren", r"(?<![Bb]isherigen )Unterricht digitalisieren"),
                        ("Mein Ist-Stand", r"Ist-Stand"), ("Werkzeugkiste", r"Werkzeugkiste"), ("Hebel", r"Hebel")]:
        if re.search(muster, sichtbar):
            fehler.append(f"Film: alter Name »{alt}« (src/film/)")
    # ab 4.45 (Rundgang): Der Film nennt die Phasen des Fahrplans; Zahl und Namen zählt das Prüfskript in src/fahrplan.json nach
    phasen = [p["name"] for p in json.loads((WURZEL / "src" / "fahrplan.json").read_text(encoding="utf-8"))["phasen"]]
    texte = " ".join(k.get("text", "") for k in kap)
    zahlwort = {3: "drei", 4: "vier", 5: "fünf"}.get(len(phasen), str(len(phasen)))
    if f"Der Fahrplan hat {zahlwort} Phasen" not in d["buehne"] or f"Der Fahrplan hat {zahlwort} Phasen" not in texte:
        fehler.append(f"Film: Zahl passt nicht zu den Daten – erwartet »Der Fahrplan hat {zahlwort} Phasen« (src/film/)")
    for name in phasen:
        if name not in texte:
            fehler.append(f"Film: Phase »{name}« aus src/fahrplan.json fehlt im Film als Text (src/film/)")
    # ab 4.48: Kapitel 2 und die Startkachel nennen die Phasen des KI-Trainings; die Zahl zählt das Prüfskript in src/fahrplan-ki.json nach
    ki = json.loads((WURZEL / "src" / "fahrplan-ki.json").read_text(encoding="utf-8"))["phasen"]
    kwort = {3: "drei", 4: "vier", 5: "fünf"}.get(len(ki), str(len(ki)))
    if f"KI-Training: in {kwort} Phasen" not in d["buehne"] or f"KI-Training: in {kwort} Phasen" not in texte:
        fehler.append(f"Film: Zahl passt nicht zu den Daten – erwartet »KI-Training: in {kwort} Phasen« (src/film/)")
    start = (WURZEL / "src" / "index.html").read_text(encoding="utf-8")
    for klasse, zahl in [("ki", kwort), ("lernen", zahlwort)]:
        m = re.search(r'<a class="wahlflaeche ' + klasse + r'"[\s\S]*?<p>([^<]*)</p>', start)
        if not m or not m.group(1).startswith(f"In {zahl} Phasen"):
            fehler.append(f"src/index.html: Startkachel »{klasse}« nennt nicht »In {zahl} Phasen« wie der Fahrplan")


# ab 4.42: Seiten, deren »Auf einen Blick« Wörter aus einem Skript zeigt (Schritte, Felder des Ergebnisses)
BLICK_AUS_SKRIPT = {"passt.html": "assets/passt.js", "fortbildungsbogen.html": "assets/fortbildungsbogen.js"}


def pruefe_ki_start(fehler, fp, daten, html):
    """Ab 4.50 (Auftrag Mario, 18.11.2026): die Startseite des KI-Trainings. Vier Karten (höchstens vier, Logik von Variante B),
    jede mit Name, Anliegen, Satz und Zahl wie in src/fahrplan-ki.json; darunter je Phase ein Abschnitt. Die Zahl auf der Karte
    passt zu den Hilfen und Werkzeugen der Phase; jedes Werkzeug steht genau einmal auf der Seite (in einer Hilfe oder unter
    »Außerdem in dieser Phase«; der eingebettete Aufgabenkoffer zählt nicht mit). Jede Hilfe hat einen Nutzen ohne Zahlen und
    mindestens einen Weg; Sprünge mit #anlass= und #ziel= nennen einen Anlass der Schnell-Anfrage bzw. ein Ziel von Prompten lernen."""
    bereich, quelle = daten["_bereich"], daten["_quelle"]
    ids = [q["id"] for q in daten["phasen"]]
    namen = [q["name"] for q in daten["phasen"]]
    anliegen = [q.get("anliegen") for q in daten["phasen"]]
    karten = re.findall(r'<a class="koffer-karte ki-karte" href="#phase-([a-z]+)" data-phase="([a-z]+)">', html)
    if [k for k, _ in karten] != ids or any(k != d for k, d in karten) or len(karten) > 4:
        fehler.append(f"{bereich}: die Karten führen nicht genau zu den Phasen aus {quelle} ({karten})")
    if re.findall(r'<b class="ki-karte-name">([^<]+)</b>', html) != namen:
        fehler.append(f"{bereich}: die Namen auf den Karten und {quelle} stimmen nicht überein")
    if re.findall(r'<span class="ki-karte-anliegen">»([^«]+)«</span>', html) != anliegen:
        fehler.append(f"{bereich}: die Anliegen auf den Karten und {quelle} stimmen nicht überein")
    if re.findall(r'id="phase-([a-z]+)"', html) != ids:
        fehler.append(f"{bereich}: die Phasen der Bereichsseite und von {quelle} stimmen nicht überein")
    if re.findall(r'<h3 class="fahrplan-name"[^>]*>([^<]+)</h3>', html) != namen:
        fehler.append(f"{bereich}: die Namen der Phasen und {quelle} stimmen nicht überein")
    if re.findall(r'<b class="fahrplan-anliegen">»([^«]+)«</b>', html) != anliegen:
        fehler.append(f"{bereich}: die Anliegen der Phasen und {quelle} stimmen nicht überein")
    if '<div class="ki-phasen" id="fahrplan"' not in html or '<p class="leise klein fahrplan-geschaetzt">' not in html:
        fehler.append(f"{bereich}: Abschnitte der Phasen nicht gefunden")
        return
    a, b = html.index('<div class="ki-phasen" id="fahrplan"'), html.index('<p class="leise klein fahrplan-geschaetzt">')
    ohne_koffer = re.sub(r'<section class="ki-koffer[\s\S]*?<!-- Ende des Aufgabenkoffers auf Papier -->', " ", html[a:b])
    starts = [m.start() for m in re.finditer(r'<section class="ki-phase"', ohne_koffer)] + [len(ohne_koffer)]
    abschnitte = [ohne_koffer[starts[i]:starts[i + 1]] for i in range(len(starts) - 1)]
    if len(abschnitte) != 4:
        fehler.append(f"{bereich}: vier Abschnitte für die Phasen gebraucht, gefunden {len(abschnitte)}")
    schnell = (WURZEL / "assets" / "daten" / "schnell.js").read_text(encoding="utf-8")
    texte = (WURZEL / "assets" / "daten" / "texte.js").read_text(encoding="utf-8")
    alle = []
    for q, ab in zip(daten["phasen"], abschnitte):
        ws = [w["href"] for w in daten["werkzeuge"] if w["phase"] == q["id"]]
        s = fp.start_von(daten, q["id"])
        if not s or not s.get("hilfen") or not s.get("karte") or not s.get("einleitung"):
            fehler.append(f"{quelle}: Phase »{q['id']}« ohne Karte, Einleitung oder Hilfen (»start«)")
            continue
        zahl = re.search(r'href="#phase-' + q["id"] + r'"[\s\S]*?class="koffer-zahl ki-karte-zahl">(\d+) Hilfen? · (\d+) Werkzeug', html)
        gefunden = [x for x in re.findall(r'<a (?:class="[^"]*" )?href="([^"]+)"', ab) if x in ws]
        if not zahl or (int(zahl.group(1)), int(zahl.group(2))) != (len(s["hilfen"]), len(ws)) or sorted(gefunden) != sorted(ws):
            fehler.append(f"{bereich}: Phase {q['nr']} – Karte {zahl.groups() if zahl else 'ohne Zahl'}, Daten {len(s['hilfen'])} Hilfen und {len(ws)} Werkzeuge, im Abschnitt {sorted(gefunden)}")
        alle += gefunden
        for h in s["hilfen"]:
            if not h.get("name") or not h.get("nutzen") or not h.get("wege"):
                fehler.append(f"{quelle}: Hilfe ohne Name, Nutzen oder Weg in Phase »{q['id']}«: {h}")
                continue
            if re.search(r"\d|spart|schneller|Zeitersparnis", h["nutzen"]):
                fehler.append(f"{quelle}: Nutzen mit Zahl oder Versprechen »{h['nutzen']}« – Nutzen heißt: was du bekommst")
            for weg in h["wege"]:
                href = weg["href"]
                frag = href.split("#", 1)[1] if "#" in href else ""
                if href not in ws and not weg.get("text"):
                    fehler.append(f"{quelle}: Sprung ohne Text bei »{h['name']}«: {href}")
                if frag.startswith("anlass=") and f'id: "{frag[7:]}"' not in schnell:
                    fehler.append(f"{quelle}: unbekannter Anlass der Schnell-Anfrage {href}")
                if frag.startswith("ziel=") and f'id: "{frag[5:]}"' not in texte:
                    fehler.append(f"{quelle}: unbekanntes Ziel von Prompten lernen {href}")
                if href.startswith("#") and f'id="{href[1:]}"' not in html:
                    fehler.append(f"{bereich}: Sprung ins Leere {href}")
        if re.search(r"\d", s["karte"]):
            fehler.append(f"{quelle}: Satz der Karte »{q['id']}« mit Zahl")
    doppelt = sorted({x for x in alle if alle.count(x) > 1})
    if doppelt:
        fehler.append(f"{bereich}: Werkzeug mehrfach in den Phasen {doppelt}")
    rest = html[:a] + html[b:]
    for ziel in sorted(set(alle)):
        if ziel == "wunsch-methode.html":  # ab 4.53 (Auftrag Mario, 18.11.2026): die Wunsch-Methode ist der Blickfang über den Phasen
            continue
        if f'href="{ziel}"' in rest:
            fehler.append(f"{bereich}: {ziel} steht außerhalb der Phasen noch einmal (eine Struktur)")


def pruefe_fahrplan(fehler):
    """ab Version 4.41: Fahrplan der Bereichsseite »Digitaler Unterricht« – vier Phasen, jede ein <details>.
    Die Zahl im Kopf (»7 Werkzeuge«) muss zu den Links in der Phase passen, und jedes Werkzeug steht nur einmal
    auf der Seite (eine Struktur, keine doppelten Links; One-Order Rule).
    Ab 4.42 kommen die Werkzeuge aus src/fahrplan.json (tools/fahrplan.py): geprüft wird die Seite, wie sie gebaut wird,
    dazu, dass jede Werkzeugseite die Zeile oben und den Fahrplan unten trägt – und nur sie.
    Ab 4.47 dasselbe für den Fahrplan »KI-Training« (src/fahrplan-ki.json, ki.html, Zeichen <!-- kiplan:… -->). Dazu:
    Namen und Anliegen der Phasen auf der Bereichsseite wie in den Daten; ein Werkzeug mit »zuhause« steht im anderen
    Fahrplan; keine Seite gehört zu zwei Fahrplänen.
    Ab 4.50 hat ki.html Karten und Abschnitte statt <details> (pruefe_ki_start)."""
    import importlib.util
    spec = importlib.util.spec_from_file_location("fahrplan", WURZEL / "tools" / "fahrplan.py")
    fp = importlib.util.module_from_spec(spec); spec.loader.exec_module(fp)
    plaene = fp.alle_laden()
    seiten_je_plan = {}
    for art, daten in plaene.items():
        bereich, json_quelle = daten["_bereich"], daten["_quelle"]
        html = fp.einsetzen((WURZEL / "src" / bereich).read_text(encoding="utf-8"), bereich, plaene)
        if daten.get("start"):  # ab 4.50: die Startseite des KI-Trainings – Karten und Abschnitte statt <details>
            pruefe_ki_start(fehler, fp, daten, html)
        else:
            phasen = re.findall(r'<details class="fahrplan-platte">([\s\S]*?)</details>', html)
            if len(phasen) != 4:
                fehler.append(f"{bereich}: Fahrplan braucht vier Phasen, gefunden {len(phasen)}")
            if re.findall(r'id="phase-([a-z]+)"', html) != [q["id"] for q in daten["phasen"]]:
                fehler.append(f"{bereich}: die Phasen der Bereichsseite und von {json_quelle} stimmen nicht überein")
            if re.findall(r'<h3 class="fahrplan-name">([^<]+)</h3>', html) != [q["name"] for q in daten["phasen"]]:
                fehler.append(f"{bereich}: die Namen der Phasen und {json_quelle} stimmen nicht überein")
            if any("anliegen" in q for q in daten["phasen"]):  # ab 4.47: das Anliegen jeder Phase (KI-Training)
                if re.findall(r'<b class="fahrplan-anliegen">»([^«]+)«</b>', html) != [q.get("anliegen") for q in daten["phasen"]]:
                    fehler.append(f"{bereich}: die Anliegen der Phasen und {json_quelle} stimmen nicht überein")
            alle = []
            for nr, phase in enumerate(phasen, 1):
                zahl = re.search(r'class="fahrplan-zahl">(\d+) Werkzeug', phase)
                links = re.findall(r'<a href="([^"]+)"', phase)
                alle += links
                if not zahl or int(zahl.group(1)) != len(links):
                    fehler.append(f"{bereich}: Phase {nr} nennt {zahl.group(1) if zahl else 'keine'} Werkzeuge, verlinkt sind {len(links)}")
            doppelt = sorted({x for x in alle if alle.count(x) > 1})
            if doppelt:
                fehler.append(f"{bereich}: Werkzeug mehrfach im Fahrplan {doppelt}")
            # die Übersicht ohne den Fahrplan. Ab 4.46 steht die Papierfrage auf einer eigenen Seite, und Phase 2 enthält ein eigenes
            # <ol> (die Kette) – deshalb bis zum letzten </ol> vor der Ringzeile, nicht bis zum ersten.
            rest = re.sub(r'<ol class="fahrplan"[\s\S]*</ol>\s*<p class="fahrplan-ring">', " ", html)
            for ziel in alle:
                if ziel.startswith("#"):
                    continue
                if f'href="{ziel}"' in rest:
                    fehler.append(f"{bereich}: {ziel} steht außerhalb des Fahrplans noch einmal (eine Struktur)")
        # ab 4.42: Zeile und Fahrplan auf jeder Werkzeugseite (Weg B der Recherche »Werkzeugseiten: Wo bin ich?«)
        seiten = {fp.seite(w["href"]) for w in daten["werkzeuge"] if "#" not in w["href"] and not w.get("zuhause")}
        seiten |= {u for w in daten["werkzeuge"] for u in w.get("unterseiten", [])}
        for w in daten["werkzeuge"]:
            if not (WURZEL / "src" / fp.seite(w["href"])).exists():
                fehler.append(f"{json_quelle}: {w['href']} gibt es nicht")
            if w.get("zuhause"):  # ab 4.47: gehört zum anderen Fahrplan und steht dort
                anderer = plaene.get(w["zuhause"])
                if not anderer or not any(fp.seite(x["href"]) == fp.seite(w["href"]) for x in anderer["werkzeuge"]):
                    fehler.append(f"{json_quelle}: {w['href']} hat »zuhause: {w['zuhause']}«, steht dort aber nicht")
        seiten_je_plan[art] = seiten
        if "zeiten" in daten:  # ab 4.48: Zeit und Fähigkeiten je Werkzeug (Fahrplan KI-Training), aus denselben Wörtern wie die Trainingsaufgaben
            training = (WURZEL / "assets" / "daten" / "training.js").read_text(encoding="utf-8")
            block = training[training.index("zeiten: ["):training.index("]", training.index("zeiten: ["))]
            tr_zeiten = dict(re.findall(r'id: "([a-z]+)", name: "([^"]+)"', block))
            tr_faehig = re.findall(r'\{ id: "([a-z-]+)", name: "[^"]+", frage:', training)
            for k, v in tr_zeiten.items():
                if daten["zeiten"].get(k) != v:
                    fehler.append(f"{json_quelle}: Zeit »{k}« heißt dort »{daten['zeiten'].get(k)}«, in training.js »{v}«")
            for w in daten["werkzeuge"]:
                zeit = w.get("zeit")
                for z in ([zeit] if isinstance(zeit, str) else (zeit or [])):
                    if z not in daten["zeiten"]:
                        fehler.append(f"{json_quelle}: {w['href']} hat eine unbekannte Zeit »{z}«")
                if not zeit:
                    fehler.append(f"{json_quelle}: {w['href']} ohne Zeit")
                for f in w.get("faehigkeiten", []):
                    if f not in tr_faehig:
                        fehler.append(f"{json_quelle}: {w['href']} nennt eine unbekannte Fähigkeit »{f}«")
            for f in tr_faehig:
                if not any(f in w.get("faehigkeiten", []) for w in daten["werkzeuge"]):
                    fehler.append(f"{json_quelle}: kein Werkzeug übt die Fähigkeit »{f}« (der Filter auf {bereich} fände nichts)")
    for a, b in [("fahrplan", "kiplan")]:
        for datei in sorted(seiten_je_plan[a] & seiten_je_plan[b]):
            fehler.append(f"src/{datei}: gehört zu zwei Fahrplänen – eine Seite hat ein Zuhause (»zuhause« im anderen)")
    bereichsname = {"fahrplan": "Digitaler Unterricht", "kiplan": "KI-Training"}
    for datei in sorted(p.name for p in (WURZEL / "src").glob("*.html")):
        quelle = (WURZEL / "src" / datei).read_text(encoding="utf-8")
        for art, seiten in seiten_je_plan.items():
            zeilen = len(re.findall(rf"<!-- {art}:zeile( weit)? -->", quelle))
            fuesse = len(re.findall(rf"<!-- {art}:fuss( weit)? -->", quelle))
            if datei in seiten and (zeilen, fuesse) != (1, 1):
                fehler.append(f"src/{datei}: Werkzeugseite braucht genau eine Zeile oben und einen Fahrplan unten (gefunden {zeilen} und {fuesse})")
            if datei not in seiten and (zeilen or fuesse):
                fehler.append(f"src/{datei}: trägt Zeichen <!-- {art}: -->, steht aber nicht in {plaene[art]['_quelle']}")
            if datei in seiten and re.search(rf'class="marker">[^<]*Bereich: {bereichsname[art]}', quelle):
                fehler.append(f"src/{datei}: »Bereich: {bereichsname[art]}« steht schon in der Zeile oben")
        # ab 4.42: »Auf einen Blick« zeigt dieselben Werte wie die Seite
        if 'class="zeitleiste' in quelle:
            blick = [(int(a), int(b)) for a, b in re.findall(r"--von:(\d+);--bis:(\d+)", quelle)]
            minuten = [(int(a), int(b)) for a, b in re.findall(r'class="ablauf-zeit">(\d+)–(\d+) Min\.', quelle)]
            wochen = [(int(w) - 1, int(w)) for w in re.findall(r'class="ablauf-zeit">Woche (\d+)</span>', quelle)]
            if blick != (minuten or wochen):
                fehler.append(f"src/{datei}: Zeitleiste {blick} und Ablauf {minuten or wochen} nennen verschiedene Zeiten")
            namen = [re.sub(r"<[^>]+>", "", x) for x in re.findall(r'<span class="zeitleiste-platte">(.*?)</span></a>', quelle)]
            titel = [x.replace(": ", " · ") for x in re.findall(r'class="ablauf-zeit">[^<]+</span><div><h3>([^<]+)</h3>', quelle)]
            if namen != titel:
                fehler.append(f"src/{datei}: Zeitleiste {namen} und Ablauf {titel} heißen verschieden")
        if datei in BLICK_AUS_SKRIPT:  # Überblick über Schritte oder Ergebnis, die ein Skript zeichnet: dieselben Wörter
            skript = (WURZEL / BLICK_AUS_SKRIPT[datei]).read_text(encoding="utf-8")
            blick = quelle[quelle.index('<figure class="blick'):quelle.index("</figure>")]
            namen = re.findall(r'class="fahrplan-karte-feld">([^<]+)<', blick) + re.findall(r'<span class="sr-only">Schritt \d: </span>([^<]+)</span>', blick)
            fehlt = [n for n in namen if f'"{n}' not in skript and f">{n}<" not in skript]
            if not namen or fehlt:
                fehler.append(f"src/{datei}: »Auf einen Blick« nennt, was {BLICK_AUS_SKRIPT[datei]} nicht kennt: {fehlt or 'nichts gefunden'}")
        if 'class="bogen-blick"' in quelle:
            blick = re.findall(r'<span class="sr-only">Frage \d: </span>([^<:]+):?</span>', quelle)
            fragen = re.findall(r"Frage \d von \d · ([^<]+)</span>", quelle)
            if blick != fragen:
                fehler.append(f"src/{datei}: Überblick {blick} und Fragen {fragen} heißen verschieden")


def pruefe_schloss(fehler):
    """Ab 4.46: Der Bereich »Für die Fortbildungsleitung« steht nur verschlüsselt im Repository.
    Jede Seite mit data-schloss trägt ihre verschlüsselten Daten (AES-GCM, PBKDF2 mit mindestens 600 000 Runden),
    kein Zeichen <!-- schloss: --> bleibt stehen, und privat/ (der Klartext) ist in .gitignore."""
    import json
    seiten = 0
    for pfad in sorted(WURZEL.glob("*.html")):
        html = pfad.read_text(encoding="utf-8")
        m = re.search(r'data-schloss="([a-z0-9-]+)"', html)
        if "<!-- schloss:" in html:
            fehler.append(f"{pfad.name}: Zeichen <!-- schloss: --> nicht ersetzt")
        if not m:
            continue
        seiten += 1
        d = re.search(r'<script type="application/json" id="schloss-daten">([\s\S]*?)</script>', html)
        try:
            daten = json.loads(d.group(1)) if d else None
        except ValueError:
            daten = None
        if not daten or not all(daten.get(k) for k in ("salt", "iv", "ct")) or int(daten.get("iter", 0)) < 600000:
            fehler.append(f"{pfad.name}: verschlüsselte Daten fehlen oder sind zu schwach (Schloss)")
        if not (WURZEL / "schloss" / f"{m.group(1)}.enc.json").exists():
            fehler.append(f"{pfad.name}: schloss/{m.group(1)}.enc.json fehlt")
    if seiten and "privat/" not in (WURZEL / ".gitignore").read_text(encoding="utf-8"):
        fehler.append(".gitignore: privat/ (Klartext des geschützten Bereichs) fehlt")


def pruefe_papierkoffer(fehler):
    """Ab 4.49 (Variante C): Der Aufgabenkoffer auf Papier trägt genau die Teile aus PAPIERKOFFER.html() – sonst ist die Seite
    veraltet (python3 tools/bauen.py). Höchstens sechs Stellen auf dem Blatt, alle 21 Einträge, an jeder Eingabe der Hinweis zu
    personenbezogenen Daten, auf der ersten Ebene »Auftrag an die KI« statt »Prompt«, kein Text im Bild des Blatts."""
    import importlib.util
    spec = importlib.util.spec_from_file_location("papierkoffer", WURZEL / "tools" / "papierkoffer.py")
    pk = importlib.util.module_from_spec(spec); spec.loader.exec_module(pk)
    try:
        teile = pk.teile()
    except SystemExit as f:
        fehler.append(f"papierkoffer.html: {f}")
        return
    html = (WURZEL / "papierkoffer.html").read_text(encoding="utf-8")
    for name, inhalt in teile.items():
        if inhalt not in html:
            fehler.append(f"papierkoffer.html: Teil »{name}« ist veraltet – python3 tools/bauen.py")
    for datei in pk.SEITEN:  # ab 4.50: derselbe Koffer eingebettet (ki.html, Phase 2) – aus derselben Quelle, nur tiefer gegliedert
        anders = (WURZEL / datei).read_text(encoding="utf-8")
        for name, inhalt in pk.teile(datei).items():
            if inhalt not in anders:
                fehler.append(f"{datei}: Teil »{name}« des Aufgabenkoffers auf Papier ist veraltet – python3 tools/bauen.py")
    if "<!-- papierkoffer:" in html:
        fehler.append("papierkoffer.html: Zeichen <!-- papierkoffer:… --> nicht ersetzt")
    blatt = teile.get("blatt", "")
    n = blatt.count('class="pkc-knopf"')
    if not 1 <= n <= 6:
        fehler.append(f"papierkoffer.html: {n} Stellen auf dem Blatt – höchstens sechs")
    svg = re.search(r"<svg[\s\S]*?</svg>", blatt)
    if svg and re.search(r"<text\b", svg.group(0)):
        fehler.append("papierkoffer.html: Text im Bild des Blatts – Texte stehen als HTML daneben")
    if "Prompt" in text_ohne_tags(blatt):
        fehler.append("papierkoffer.html: »Prompt« auf der ersten Ebene – dort heißt es »Auftrag an die KI«")
    listen = teile.get("listen", "")
    eintraege = listen.count('class="pk-eintrag"')
    if eintraege != 21:
        fehler.append(f"papierkoffer.html: {eintraege} statt 21 Einträge")
    hinweis = "Keine Namen, Noten oder anderen personenbezogenen Daten eingeben."
    for m in re.finditer(r'<(?:textarea|input)\b[^>]*>', html):
        d = re.search(r'aria-describedby="([^"]+)"', m.group(0))
        if not d or not re.search(r'id="' + re.escape(d.group(1)) + r'">' + re.escape(hinweis), html):
            fehler.append(f"papierkoffer.html: Eingabe ohne Hinweis zu personenbezogenen Daten: {m.group(0)[:60]}")


def pruefe_wunsch(fehler):
    """Ab 4.52: Die Wunsch-Methode trägt genau die Teile aus WUNSCH_SEITE.html() – sonst ist die Seite veraltet
    (python3 tools/bauen.py). Zwölf Felder in der Zeichnung und zwölf in der Liste, fünf davon Grundausstattung. Kein Text im
    Bild: Alle Wörter stehen als HTML darüber (nie unter 16 Pixel). Keine Stufen, Punkte, Prozente oder Abzeichen
    (Entscheidung Mario, 18.11.2026): Die Kreise ordnen keine Menschen. Die Zeitwörter sind die des Fahrplans."""
    import importlib.util, json
    spec = importlib.util.spec_from_file_location("wunsch", WURZEL / "tools" / "wunsch.py")
    wm = importlib.util.module_from_spec(spec); spec.loader.exec_module(wm)
    name = "wunsch-methode.html"
    try:
        teile = wm.teile()
    except SystemExit as f:
        fehler.append(f"{name}: {f}")
        return
    html = (WURZEL / name).read_text(encoding="utf-8")
    for teil in ("bild", "liste", "lampe"):
        if teile[teil] not in html:
            fehler.append(f"{name}: Teil »{teil}« ist veraltet – python3 tools/bauen.py")
    # ab 4.53: der Blickfang und die drei Einstiege auf ki.html, die kleine Karte auf den Werkzeugseiten des KI-Trainings
    ki = (WURZEL / "ki.html").read_text(encoding="utf-8")
    for teil in ("start", "einstiege"):
        if teile[teil] not in ki:
            fehler.append(f"ki.html: Teil »{teil}« der Wunsch-Methode ist veraltet – python3 tools/bauen.py")
    if ki.find('id="ki-wm-bild"') < 0 or ki.find('id="ki-wm-bild"') > ki.find('id="ki-wahl"'):
        fehler.append("ki.html: die Zeichnung der Wunsch-Methode steht vor den vier Phasen (Auftrag Mario, 18.11.2026)")
    if len(re.findall(r'class="ki-einstieg"', teile["einstiege"])) != 3:
        fehler.append("ki.html: drei Einstiege, einer je Kreis")
    for datei, karte in teile.get("orte", {}).items():
        seite = (WURZEL / datei).read_text(encoding="utf-8")
        if 'href="ki.html#fahrplan">Fahrplan KI-Training' in seite.split("<main", 1)[-1][:3000] and karte not in seite:
            fehler.append(f"{datei}: die kleine Karte der Wunsch-Methode fehlt oder ist veraltet – python3 tools/bauen.py")
    if "<!-- wunsch:" in html:
        fehler.append(f"{name}: Zeichen <!-- wunsch:… --> nicht ersetzt")
    bild, liste = teile.get("bild", ""), teile.get("liste", "")
    felder = re.findall(r'<a class="wm-feld( ist-grund)?" href="#feld-([a-z-]+)"', bild)
    karten = re.findall(r'<details class="wm-karte" id="feld-([a-z-]+)"', liste)
    if len(felder) != 12 or sorted(f for _, f in felder) != sorted(karten):
        fehler.append(f"{name}: die Zeichnung hat {len(felder)} Felder, die Liste {len(karten)} – gebraucht sind dieselben zwölf")
    if sum(1 for g, _ in felder if g) != 5:
        fehler.append(f"{name}: die Grundausstattung hat fünf Felder, gefüllt sind {sum(1 for g, _ in felder if g)}")
    if re.search(r"<text\b", bild):
        fehler.append(f"{name}: Text im Bild – die Wörter stehen als HTML über der Zeichnung")
    text = text_ohne_tags(html)
    for wort in ("Stufe", "Niveau", "Level", "Punkte", "Prozent", "Abzeichen", "Kompetenzmodell", "Curriculum", "Framework"):
        if re.search(r"\b" + wort, text):
            fehler.append(f"{name}: »{wort}« – das Modell kennt keine Stufen und keine Wertung, und die Seite nennt sich nicht so")
    daten = (WURZEL / "assets" / "daten" / "wunsch.js").read_text(encoding="utf-8")
    zeiten = json.loads((WURZEL / "src" / "fahrplan-ki.json").read_text(encoding="utf-8"))["zeiten"]
    for k, v in zeiten.items():
        if f'{k}: "{v}"' not in daten:
            fehler.append(f"assets/daten/wunsch.js: Zeit »{k}« heißt im Fahrplan »{v}«")
    for ziel in sorted(set(re.findall(r'\["([a-z-]+\.html)(?:#[a-z0-9=-]+)?", "', daten))):
        if not (WURZEL / "src" / ziel).exists():
            fehler.append(f"assets/daten/wunsch.js: {ziel} gibt es nicht")


def main():
    fehler = []
    pruefe_wunsch(fehler)  # ab 4.52
    pruefe_papierkoffer(fehler)  # ab 4.49
    pruefe_werkzeugkiste(fehler)
    pruefe_film(fehler)
    pruefe_fahrplan(fehler)
    pruefe_schloss(fehler)  # ab 4.46
    pruefe_seiten(fehler)
    pruefe_skripte(fehler)
    pruefe_css(fehler)
    pruefe_daten(fehler)
    for datei in LIZENZDATEIEN:
        if not (WURZEL / datei).exists():
            fehler.append(f"{datei}: Lizenz- oder Entstehungsdatei fehlt")
    for zeile in fehler:
        print("✗", zeile)
    print("Geprüft:", ", ".join(SEITEN), "–", "keine Verstöße" if not fehler else f"{len(fehler)} Verstöße")
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
