#!/usr/bin/env python3
"""Packt Kidu als ZIP für einen Moodle-Kurs und prüft das Paket vorher (ab 4.54).

Aufruf:  python3 tools/moodle_paket.py [--ziel ORDNER] [--nur-pruefen]
Ergebnis: dist/kidu-<Version>-moodle.zip und dist/kidu-<Version>-moodle-bericht.txt (dist/ steht in .gitignore).
          Rückgabewert 1, wenn die Prüfung etwas findet – dann entsteht kein ZIP.

So kommt das Paket nach Moodle (Vorschlag, in Moodle noch nicht erprobt): Aktivität »Datei« anlegen, das ZIP hochladen
und entpacken, index.html als Hauptdatei setzen, Anzeige »Öffnen«. Die Schritte stehen in LIESMICH-MOODLE.txt im Paket
(Text nur hier, in LIESMICH).

Im Paket: die gebauten Seiten (SEITEN aus tools/bauen.py), assets/, werkzeugkiste/download/, die Lizenzdateien und
LIESMICH-MOODLE.txt. Nicht im Paket: src/, tools/, tests/, docs/, privat/, schloss/ (die verschlüsselten Inhalte sind
beim Bauen in die Seiten eingebettet) und alles, was mit einem Punkt beginnt.

Geprüft wird vor dem Packen (Lehre aus dem GGK-Labor, 08.11.2026: ein Paket ging ohne Schriften hinaus):
- index.html liegt oben,
- jeder Verweis in Seiten, Stil und Skripten zeigt auf eine Datei im Paket – in genau dieser Schreibweise,
  denn Moodle unterscheidet Groß- und Kleinschreibung,
- kein Verweis beginnt mit »/« oder verlässt das Paket mit »../«,
- keine Datei wird von einem fremden Server geladen, kein Skript lädt Daten nach,
- Dateinamen bestehen nur aus Buchstaben, Ziffern, Punkt, Strich und Unterstrich.
Der Bericht nennt Version, Zahl und Größe der Dateien und zählt die Links, die das Paket verlassen
(das sind die »Ausprobieren«-Links der Unterrichtsbeispiele).

tools/pruefen.py ruft pruefe() bei jedem Lauf mit auf: Was das Paket bricht, fällt vor dem Commit auf.
"""
import argparse
import contextlib
import hashlib
import importlib.util
import io
import posixpath
import re
import sys
import zipfile
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ORDNER = ("assets", "werkzeugkiste/download")
EINZELN = ("LICENSE", "LICENSE-TEXTE.md", "ENTSTEHUNG.md", "CITATION.cff")
LIESMICH_NAME = "LIESMICH-MOODLE.txt"
ZEIT = (2026, 1, 1, 0, 0, 0)  # feste Zeit im ZIP: dieselben Dateien ergeben denselben Prüfwert
SCHON_GEPACKT = (".mp4", ".webp", ".jpg", ".jpeg", ".png", ".woff2", ".zip")  # werden im ZIP nur abgelegt, nicht noch einmal gepresst
NAME_ERLAUBT = re.compile(r"^[A-Za-z0-9._/-]+$")
OHNE_ZIEL = ("#", "data:", "mailto:", "tel:", "javascript:", "blob:", "about:")
LADEND = {"script": ("src",), "img": ("src", "srcset"), "source": ("src", "srcset"), "video": ("src", "poster"),
          "audio": ("src",), "iframe": ("src",), "embed": ("src",), "object": ("data",), "track": ("src",),
          "link": ("href",), "input": ("src",), "image": ("href", "xlink:href"), "use": ("href", "xlink:href")}
NACHLADEN = ("fetch(", "XMLHttpRequest", "sendBeacon(", "new WebSocket(", "new EventSource(", "importScripts(")

LIESMICH = """Kidu · Künstliche Intelligenz und digitaler Unterricht
Paket für Moodle · Version {version} · Stand der Seiten: {stand}

So kommt Kidu in einen Moodle-Kurs
(Vorschlag – in Moodle noch nicht erprobt)

1. Im Kurs »Aktivität oder Material anlegen« wählen, dann »Datei«.
2. Diese ZIP-Datei hochladen. Im Dateifeld die ZIP-Datei anklicken und »Entpacken« wählen.
   Danach die ZIP-Datei dort löschen.
3. index.html anklicken und »Hauptdatei setzen« wählen.
4. Unter »Darstellung« bei »Anzeigen« die Art »Öffnen« wählen. Nicht »Automatisch« und nicht »Einbetten«:
   Kidu braucht das ganze Fenster.
5. Speichern. Kidu öffnet sich als eigene Seite.

Neue Version
Die Dateien in derselben Aktivität ersetzen. Die Aktivität nicht löschen und neu anlegen – sonst ändern sich alle Adressen.

Gut zu wissen
- Kidu lädt nichts von fremden Servern. Eingaben bleiben im Browser der Person.
- Moodle selbst hält fest, wer den Kurs und die Aktivität öffnet. Das gehört in die Information für die Teilnehmenden.
- Wie die Moodle-App das Paket zeigt, ist noch offen. Gedacht ist der Weg über den Browser.
- {ausprobieren}

Inhalt
{dateien} Dateien, entpackt {groesse}. Geprüft mit tools/moodle_paket.py: jeder Verweis zeigt auf eine Datei im Paket.

Urheber und Lizenz
© 2026 Mario Walter · entwickelt mit Unterstützung eines KI-Systems
Texte und Daten: CC BY-NC-SA 4.0 (LICENSE-TEXTE.md) · Code: MIT (LICENSE) · Bilder: alle Rechte vorbehalten
Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.
"""


def modul(name):
    spec = importlib.util.spec_from_file_location(name, WURZEL / "tools" / f"{name}.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def stand(wurzel=WURZEL):
    """Version und Datum stehen an einer Stelle: unter »Was ist neu?« auf ueber.html."""
    m = re.search(r"Stand: ([^<(]+?)\s*\(Version (\d+\.\d+)\)", (wurzel / "src" / "ueber.html").read_text(encoding="utf-8"))
    if not m:
        raise SystemExit("moodle_paket: In src/ueber.html fehlt die Zeile »Stand: … (Version x.y)«.")
    return m.group(2), m.group(1).strip()


def sammle(wurzel=WURZEL, seiten=None):
    """Alle Dateien des Pakets: Name im Paket → Pfad. Ohne LIESMICH, die entsteht beim Packen."""
    if seiten is None:
        seiten = [s[0] for s in modul("bauen").SEITEN]
    dateien = {}
    for name in seiten:
        dateien[name] = wurzel / name
    for ordner in ORDNER:
        for pfad in sorted((wurzel / ordner).rglob("*")):
            if pfad.is_file() and not any(teil.startswith(".") for teil in pfad.relative_to(wurzel).parts):
                dateien[pfad.relative_to(wurzel).as_posix()] = pfad
    for name in EINZELN:
        if (wurzel / name).exists():
            dateien[name] = wurzel / name
    return dateien


def verweise_html(text):
    """(Verweis, lädt er eine Datei?) für jedes Tag einer Seite; dazu die Weiterleitung im Kopf."""
    gefunden = []
    for tag, attribute in re.findall(r"<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>", text):
        tag = tag.lower()
        for name, _, wert in re.findall(r"""([a-zA-Z:-]+)\s*=\s*(["'])(.*?)\2""", attribute, flags=re.S):
            name = name.lower()
            laedt = name in LADEND.get(tag, ())
            if name == "srcset":
                gefunden += [(teil.strip().split(" ")[0], True) for teil in wert.split(",") if teil.strip()]
            elif name in ("href", "src", "poster", "data", "xlink:href", "action"):
                gefunden.append((wert, laedt))
            elif tag == "meta" and name == "content" and "url=" in wert.lower():
                gefunden.append((wert.split("=", 1)[1].strip(), False))
    return gefunden


def verweise_css(text):
    """Dateien, die der Stil lädt. Eingebettete Bilder (data:…) zählen nicht – auch nicht die Verweise in ihnen."""
    text = re.sub(r"""url\(\s*(["'])data:.*?\1\s*\)""", "", text, flags=re.S)
    text = re.sub(r"url\(\s*data:[^)]*\)", "", text)
    return [(v.strip(), True) for v in re.findall(r"""url\(\s*["']?([^"')]+)["']?\s*\)""", text)]


def verweise_js(text):
    """Zeichenketten in Skripten, die wie ein Pfad im Paket aussehen. Zusammengesetzte Pfade (»ordner/« + name) erkennt
    das nicht; dafür nimmt das Paket die Ordner assets/ und werkzeugkiste/download/ ganz mit."""
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)       # Kommentare nennen Beispiele, keine Dateien
    text = re.sub(r"(?m)^\s*//.*$", "", text)
    pfade = re.findall(r"""(["'`])((?:assets|werkzeugkiste)/[A-Za-z0-9._/-]+\.[A-Za-z0-9]{2,5})(?:[?#][^"'`]*)?\1""", text)
    seiten = re.findall(r"""(["'`])([a-z0-9-]+\.html)(?:[?#][^"'`]*)?\1""", text)
    return [(p, False) for _, p in pfade + seiten]


def adressen_js(text):
    """Vollständige Adressen in Skripten und Daten (für den Bericht)."""
    return re.findall(r"""["'`](https?://[^"'`\s]+)["'`]""", text)


def pruefe(wurzel=WURZEL, dateien=None):
    """Prüft das Paket, ohne es zu schreiben. Gibt (fehler, bericht) zurück. Im Bericht: die Orte außerhalb des Pakets,
    zu denen Links oder Daten führen (hinaus), und die Zahl der Unterrichtsbeispiele mit »Ausprobieren«."""
    dateien = sammle(wurzel) if dateien is None else dateien
    fehler, hinaus, namen = [], set(), set(dateien)
    klein = {n.lower(): n for n in namen}
    if "index.html" not in namen:
        fehler.append("index.html fehlt – Moodle braucht sie als Hauptdatei auf der obersten Ebene")
    for name in sorted(namen):
        if not NAME_ERLAUBT.match(name):
            fehler.append(f"{name}: Dateiname mit Leerzeichen, Umlaut oder Sonderzeichen – nur Buchstaben, Ziffern, Punkt, Strich, Unterstrich")
        if not dateien[name].exists():
            fehler.append(f"{name}: fehlt – erst python3 tools/bauen.py")

    def ziel(quelle, verweis, laedt):
        v = verweis.strip()
        if not v or v.startswith(OHNE_ZIEL):
            return
        if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", v) or v.startswith("//"):
            host = re.sub(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", "", v).lstrip("/").split("/")[0] or v
            if laedt:
                fehler.append(f"{quelle}: lädt {v} von einem fremden Server")
            else:
                hinaus.add(host)
            return
        if v.startswith("/"):
            fehler.append(f"{quelle}: »{v}« beginnt mit »/« – in Moodle liegt das Paket in einem Unterordner")
            return
        pfad = posixpath.normpath(posixpath.join(posixpath.dirname(quelle), re.split(r"[?#]", v, maxsplit=1)[0]))
        if pfad == "." or pfad == posixpath.dirname(quelle):
            return
        if pfad.startswith(".."):
            fehler.append(f"{quelle}: »{v}« verlässt das Paket")
        elif pfad not in namen:
            if pfad.lower() in klein:
                fehler.append(f"{quelle}: »{v}« – im Paket heißt die Datei {klein[pfad.lower()]} (Groß- und Kleinschreibung)")
            else:
                fehler.append(f"{quelle}: »{v}« zeigt auf {pfad} – die Datei ist nicht im Paket")

    for name in sorted(namen):
        if not dateien[name].exists():
            continue
        if name.endswith(".html"):
            text = dateien[name].read_text(encoding="utf-8")
            for verweis, laedt in verweise_html(text):
                ziel(name, verweis, laedt)
            for skript in re.findall(r"<script\b(?![^>]*\bsrc=)(?![^>]*application/json)[^>]*>(.*?)</script>", text, flags=re.S):
                for verweis, laedt in verweise_js(skript):
                    ziel(name, verweis, laedt)
        elif name.endswith(".css"):
            text = dateien[name].read_text(encoding="utf-8")
            for verweis, laedt in verweise_css(text):
                ziel(name, verweis, laedt)
            if "@import" in text:
                fehler.append(f"{name}: »@import« – Stile stehen in einer Datei")
        elif name.endswith(".js"):
            text = dateien[name].read_text(encoding="utf-8")
            for verweis, laedt in verweise_js(text):
                ziel("index.html", verweis, laedt)  # Pfade in Skripten gelten ab der Seite, und alle Seiten liegen oben
            for adresse in adressen_js(text):
                hinaus.add(adresse.split("//", 1)[1].split("/")[0])
            for wort in NACHLADEN:
                if wort in text:
                    fehler.append(f"{name}: »{wort}« – Kidu lädt nichts nach; Daten stehen als JS-Dateien im Paket")
    # »Ausprobieren«: Die Unterrichtsbeispiele führen zu Lernanwendungen außerhalb des Pakets (Feld link in beispiele.js).
    beispiele = wurzel / "assets" / "daten" / "beispiele.js"
    ausprobieren = len(re.findall(r"\blink:\s*GH\s*\+", beispiele.read_text(encoding="utf-8"))) if beispiele.exists() else 0
    return fehler, {"hinaus": sorted(hinaus), "ausprobieren": ausprobieren}


def gross(zahl):
    return f"{zahl / 1_000_000:.1f}".replace(".", ",") + " MB" if zahl >= 1_000_000 else f"{round(zahl / 1000)} kB"


def liesmich(version, datum, zahl, groesse, ausprobieren):
    satz = (f"{ausprobieren} Unterrichtsbeispiele haben einen Knopf »Ausprobieren«. Er führt zu einer Seite außerhalb des Pakets."
            if ausprobieren else "Kein Link führt aus dem Paket hinaus.")
    return LIESMICH.format(version=version, stand=datum, dateien=zahl, groesse=gross(groesse), ausprobieren=satz)


def packe(ziel, dateien, zusatz):
    """Schreibt das ZIP: Namen sortiert, feste Zeit, index.html auf der obersten Ebene."""
    inhalt = {name: pfad.read_bytes() for name, pfad in dateien.items()}
    inhalt.update(zusatz)
    with zipfile.ZipFile(ziel, "w") as z:
        for name in sorted(inhalt):
            info = zipfile.ZipInfo(name, date_time=ZEIT)
            info.external_attr = 0o644 << 16
            info.compress_type = zipfile.ZIP_STORED if name.lower().endswith(SCHON_GEPACKT) else zipfile.ZIP_DEFLATED
            z.writestr(info, inhalt[name], compresslevel=9)
    return sum(len(b) for b in inhalt.values()), len(inhalt)


def main(argumente=None):
    p = argparse.ArgumentParser(description="Packt Kidu als ZIP für einen Moodle-Kurs und prüft das Paket vorher.")
    p.add_argument("--ziel", default=str(WURZEL / "dist"), help="Ordner für ZIP und Bericht (Vorgabe: dist/)")
    p.add_argument("--nur-pruefen", action="store_true", help="nur prüfen, kein ZIP schreiben")
    a = p.parse_args(argumente)
    with contextlib.redirect_stdout(io.StringIO()):
        modul("bauen").main()  # das Paket nimmt frisch gebaute Seiten
    version, datum = stand()
    dateien = sammle()
    fehler, bericht = pruefe(dateien=dateien)
    for zeile in fehler:
        print("✗", zeile)
    if fehler:
        print(f"Moodle-Paket {version}: {len(fehler)} Verstöße – kein ZIP geschrieben")
        return 1
    groesse = sum(pf.stat().st_size for pf in dateien.values())
    zeilen = [f"Kidu {version} als Moodle-Paket · Stand der Seiten: {datum}",
              f"Dateien: {len(dateien) + 1} · entpackt {gross(groesse)}",
              "Seiten: " + str(sum(1 for n in dateien if n.endswith('.html'))) + " · Skripte: " + str(sum(1 for n in dateien if n.endswith('.js')))
              + " · Bilder: " + str(sum(1 for n in dateien if n.lower().endswith(('.webp', '.jpg', '.jpeg', '.png', '.svg'))))
              + " · Schriften: " + str(sum(1 for n in dateien if n.endswith('.woff2'))) + " · Filme: " + str(sum(1 for n in dateien if n.endswith('.mp4'))),
              "Größte Dateien: " + ", ".join(f"{n} ({gross(pf.stat().st_size)})" for n, pf in sorted(dateien.items(), key=lambda e: -e[1].stat().st_size)[:3]),
              "Geprüft: jeder Verweis zeigt auf eine Datei im Paket, keiner beginnt mit »/«, nichts wird von fremden Servern geladen, kein Skript lädt nach.",
              (f"Das Paket verlassen: {bericht['ausprobieren']} Links »Ausprobieren« der Unterrichtsbeispiele (" + ", ".join(bericht["hinaus"]) + ")."
               if bericht["hinaus"] else "Kein Link verlässt das Paket.")]
    if a.nur_pruefen:
        print("\n".join(zeilen))
        print(f"Moodle-Paket {version}: keine Verstöße (nur geprüft, kein ZIP)")
        return 0
    ziel = Path(a.ziel)
    ziel.mkdir(parents=True, exist_ok=True)
    datei = ziel / f"kidu-{version}-moodle.zip"
    text = liesmich(version, datum, len(dateien) + 1, groesse, bericht["ausprobieren"])
    packe(datei, dateien, {LIESMICH_NAME: text.encode("utf-8")})
    zeilen += [f"ZIP: {datei.name} · {gross(datei.stat().st_size)} · SHA-256 {hashlib.sha256(datei.read_bytes()).hexdigest()}",
               "In Moodle noch nicht erprobt. Die Schritte stehen in LIESMICH-MOODLE.txt im Paket."]
    (ziel / f"kidu-{version}-moodle-bericht.txt").write_text("\n".join(zeilen) + "\n", encoding="utf-8")
    print("\n".join(zeilen))
    print(f"Moodle-Paket {version}: keine Verstöße")
    return 0


if __name__ == "__main__":
    sys.exit(main())
