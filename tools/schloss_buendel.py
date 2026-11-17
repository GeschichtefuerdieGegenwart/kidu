#!/usr/bin/env python3
"""Kidu – Klartext des geschützten Bereichs als ein Bündel sichern und wieder auspacken (ab Version 4.46).

Der Klartext von »Für die Fortbildungsleitung« steht nicht im Repository (privat/ steht in .gitignore).
Er wird als ein Bündel im Claude-Projekt »Unterricht digital« gesichert – wie die Lehrkrafttexte im GGK-Labor.

Aufruf:  python3 tools/schloss_buendel.py packen           schreibt privat/kidu-geschuetzt-buendel.md aus privat/*.html
         python3 tools/schloss_buendel.py teilen <Datei>   legt aus einem Bündel wieder privat/*.html an

Danach (nach »teilen« oder einer Änderung):  KIDU_PASS='…' node tools/schloss.mjs && python3 tools/bauen.py
Das Bündel enthält kein Passwort. Format: je Datei eine Zeile »<!-- datei: name.html -->«, dann der Inhalt.
"""
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
PRIVAT = WURZEL / "privat"
BUENDEL = PRIVAT / "kidu-geschuetzt-buendel.md"
KOPF = ("# Kidu – Klartext des geschützten Bereichs »Für die Fortbildungsleitung«\n\n"
        "Nicht im Repository. Auspacken: `python3 tools/schloss_buendel.py teilen <diese Datei>`, dann "
        "`KIDU_PASS='…' node tools/schloss.mjs && python3 tools/bauen.py`. Kein Passwort in dieser Datei.\n\n")


def packen():
    dateien = sorted(PRIVAT.glob("*.html"))
    if not dateien:
        raise SystemExit("privat/ enthält keine HTML-Dateien.")
    teile = [KOPF] + [f"<!-- datei: {d.name} -->\n{d.read_text(encoding='utf-8').rstrip()}\n" for d in dateien]
    BUENDEL.write_text("\n".join(teile), encoding="utf-8")
    print(f"geschrieben: {BUENDEL.relative_to(WURZEL)} ({len(dateien)} Dateien)")


def teilen(quelle):
    text = Path(quelle).read_text(encoding="utf-8")
    stuecke = re.split(r"^<!-- datei: ([a-z0-9-]+\.html) -->\n", text, flags=re.M)
    if len(stuecke) < 3:
        raise SystemExit("Kein Bündel: Zeilen »<!-- datei: … -->« fehlen.")
    PRIVAT.mkdir(exist_ok=True)
    for name, inhalt in zip(stuecke[1::2], stuecke[2::2]):
        (PRIVAT / name).write_text(inhalt.rstrip() + "\n", encoding="utf-8")
        print("angelegt: privat/" + name)


if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "packen":
        packen()
    elif len(sys.argv) >= 3 and sys.argv[1] == "teilen":
        teilen(sys.argv[2])
    else:
        print(__doc__)
        sys.exit(1)
