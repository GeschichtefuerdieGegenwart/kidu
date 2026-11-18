#!/usr/bin/env python3
"""Die Wunsch-Methode (ab 4.52): setzt beim Bauen die Teile ein, die ohne Skript gelten müssen.

Zeichen in src/wunsch-methode.html: <!-- wunsch:bild --> (die Zeichnung »Vier Sätze, drei Kreise« mit ihren zwölf Feldern) und
<!-- wunsch:liste --> (alle zwölf Felder als Liste, nach Kreisen) und <!-- wunsch:lampe --> (»Was in der Lampe wirklich steckt«). Quelle ist WUNSCH_SEITE.html() in assets/wunsch.js mit den
Daten aus assets/daten/wunsch.js – dieselbe Funktion, die die Seite im Browser benutzt. Darum läuft sie hier mit Node
(wie beim Aufgabenkoffer auf Papier und wie die Unit-Tests).
Aufruf: aus tools/bauen.py (einsetzen); allein: python3 tools/wunsch.py zeigt, was eingesetzt würde.
"""
import json
import subprocess
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ZEICHEN = ("bild", "liste", "lampe")
SKRIPT = "process.stdout.write(JSON.stringify(require('./assets/wunsch.js').html()));"
_teile = None


def teile():
    """Die Teile als Wörterbuch {bild, liste, lampe}; einmal je Bau berechnet."""
    global _teile
    if _teile is None:
        try:
            aus = subprocess.run(["node", "-e", SKRIPT], cwd=WURZEL, capture_output=True, text=True, check=True).stdout
        except FileNotFoundError:
            raise SystemExit("wunsch: Node fehlt – die Zeichnung der Wunsch-Methode wird beim Bauen mit Node erzeugt (node --version).")
        except subprocess.CalledProcessError as f:
            raise SystemExit("wunsch: WUNSCH_SEITE.html() schlug fehl:\n" + f.stderr)
        _teile = json.loads(aus)
        for z in ZEICHEN:
            if not _teile.get(z):
                raise SystemExit(f"wunsch: Teil »{z}« ist leer")
    return _teile


def einsetzen(inhalt, datei):
    """Ersetzt die Zeichen <!-- wunsch:… --> einer Seite. Seiten ohne Zeichen bleiben unverändert."""
    if "<!-- wunsch:" not in inhalt:
        return inhalt
    t = teile()
    for z in ZEICHEN:
        inhalt = inhalt.replace(f"<!-- wunsch:{z} -->", t[z])
    if "<!-- wunsch:" in inhalt:
        raise SystemExit(f"wunsch: unbekanntes Zeichen in {datei}")
    return inhalt


if __name__ == "__main__":
    for z, html in teile().items():
        print(f"{z}: {len(html)} Zeichen")
