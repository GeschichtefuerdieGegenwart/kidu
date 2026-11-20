#!/usr/bin/env python3
"""Die Unterrichtsbeispiele nach Fächern (ab 4.57): setzt beim Bauen die Teile ein, die ohne Skript gelten müssen.

Zeichen in src/galerie.html: <!-- labore:wahl --> (die vier Kacheln »Fach wählen«), <!-- labore:schluessel --> (vier
Umfänge und sechs Prinzipien), <!-- labore:labore --> (die vier Fächer mit Quintessenz, dem Ganzen, den Beispielen und
den vier Wegen) und <!-- labore:weitere --> (alle übrigen Beispiele als Liste). Quelle ist LABORE_SEITE.html() in
assets/labore.js mit den Daten aus assets/daten/labore.js, beispiele.js, galerie.js, prinzipien.js und taxonomien.js –
dieselbe Funktion, die die Tests benutzen. Darum läuft sie hier mit Node (wie bei der Wunsch-Methode).
Die gebaute Seite enthält keine Links nach außen: »Ausprobieren« setzt das Skript erst im Browser ein.
Aufruf: aus tools/bauen.py (einsetzen); allein: python3 tools/labore.py zeigt, was eingesetzt würde.
"""
import json
import subprocess
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ZEICHEN = ("wahl", "schluessel", "labore", "weitere")
SKRIPT = "process.stdout.write(JSON.stringify(require('./assets/labore.js').html()));"
_teile = None


def teile():
    """Die Teile als Wörterbuch {wahl, schluessel, labore, weitere}; einmal je Bau berechnet."""
    global _teile
    if _teile is None:
        try:
            aus = subprocess.run(["node", "-e", SKRIPT], cwd=WURZEL, capture_output=True, text=True, check=True).stdout
        except FileNotFoundError:
            raise SystemExit("labore: Node fehlt – die Unterrichtsbeispiele werden beim Bauen mit Node erzeugt (node --version).")
        except subprocess.CalledProcessError as f:
            raise SystemExit("labore: LABORE_SEITE.html() schlug fehl:\n" + f.stderr)
        _teile = json.loads(aus)
        for z in ZEICHEN:
            if not _teile.get(z):
                raise SystemExit(f"labore: Teil »{z}« ist leer")
    return _teile


def einsetzen(inhalt, datei):
    """Ersetzt die Zeichen <!-- labore:… --> einer Seite. Seiten ohne Zeichen bleiben unverändert."""
    if "<!-- labore:" not in inhalt:
        return inhalt
    t = teile()
    for z in ZEICHEN:
        inhalt = inhalt.replace(f"<!-- labore:{z} -->", t[z])
    if "<!-- labore:" in inhalt:
        raise SystemExit(f"labore: unbekanntes Zeichen in {datei}")
    return inhalt


if __name__ == "__main__":
    for z, html in teile().items():
        print(f"{z}: {len(html)} Zeichen")
