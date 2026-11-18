#!/usr/bin/env python3
"""Aufgabenkoffer auf Papier (ab 4.49): setzt beim Bauen die Teile ein, die ohne Skript gelten müssen.

Zeichen in src/papierkoffer.html: <!-- papierkoffer:blatt --> (das Arbeitsblatt mit den sechs Stellen) und <!-- papierkoffer:listen -->
(alle Aufträge unter ihren Überschriften, mit den Aufträgen an die KI in ihrer leeren Fassung). Quelle ist PAPIERKOFFER.html()
in assets/papierkoffer.js mit den Daten aus assets/daten/ – dieselbe Funktion, die die Seite im Browser benutzt. Darum läuft
sie hier mit Node (wie die Unit-Tests).
Aufruf: aus tools/bauen.py (einsetzen); allein: python3 tools/papierkoffer.py zeigt, was eingesetzt würde.
"""
import json
import subprocess
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ZEICHEN = ("blatt", "form", "listen")
# ab 4.50: der Koffer steht auch in Phase 2 von ki.html – dort tiefer gegliedert, und beim Schließen bleibt die Phase in der Adresse
SEITEN = {"ki.html": {"ebene": 5, "zurueck": "#phase-vorbereiten"}}
SKRIPT = "process.stdout.write(JSON.stringify(require('./assets/papierkoffer.js').html(%s)));"
_teile = {}


def teile(datei="papierkoffer.html"):
    """Die Teile als Wörterbuch {blatt, form, listen} für eine Seite; einmal je Bau und Seite berechnet."""
    wahl = SEITEN.get(datei, {})
    schluessel = json.dumps(wahl, sort_keys=True)
    if schluessel not in _teile:
        try:
            aus = subprocess.run(["node", "-e", SKRIPT % schluessel], cwd=WURZEL, capture_output=True, text=True, check=True).stdout
        except FileNotFoundError:
            raise SystemExit("papierkoffer: Node fehlt – der Aufgabenkoffer auf Papier wird beim Bauen mit Node erzeugt (node --version).")
        except subprocess.CalledProcessError as f:
            raise SystemExit("papierkoffer: PAPIERKOFFER.html() schlug fehl:\n" + f.stderr)
        _teile[schluessel] = json.loads(aus)
        for z in ZEICHEN:
            if not _teile[schluessel].get(z):
                raise SystemExit(f"papierkoffer: Teil »{z}« ist leer")
    return _teile[schluessel]


def einsetzen(inhalt, datei):
    """Ersetzt die Zeichen <!-- papierkoffer:… --> einer Seite. Seiten ohne Zeichen bleiben unverändert."""
    if "<!-- papierkoffer:" not in inhalt:
        return inhalt
    t = teile(datei)
    for z in ZEICHEN:
        inhalt = inhalt.replace(f"<!-- papierkoffer:{z} -->", t[z])
    if "<!-- papierkoffer:" in inhalt:
        raise SystemExit(f"papierkoffer: unbekanntes Zeichen in {datei}")
    return inhalt


if __name__ == "__main__":
    for z, html in teile().items():
        print(f"{z}: {len(html)} Zeichen")
