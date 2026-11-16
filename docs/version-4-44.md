# Version 4.44 – Rundgang auf der Startseite

Stand: 16. November 2026 · Branch `rundgang`

Grundlage: Auftrag Mario (16.11.2026): eine lange Fassung, mit der sich Kolleg*innen schnell auf der Seite zurechtfinden und ins Arbeiten kommen. Drehbuch von Mario freigegeben. Der Rundgang ersetzt den Film von 2:50 auf der Startseite; der Knopf heißt »Rundgang ansehen · gut 2 Minuten«.

## Neu

- **Der Film auf der Startseite ist der Rundgang:** neun Kapitel, 124 Sekunden, stumm. Frage · Startseite mit drei Wegen · Fahrplan mit vier Phasen · Phase 2 mit zwei Türen · »Bisherigen Unterricht digitalisieren« · KI-Training · Unterrichtsbeispiele · Nach der Stunde · »Fang hier an«.
- Alle Ansichten sind Bildschirmfotos von Kidu (Stand 4.43, aufgenommen am 16.11.2026): `assets/film/rg-*.webp`, zusammen rund 0,9 MB.
- Auf »Bisherigen Unterricht digitalisieren« steht, was die Seite beim Öffnen zeigt. Es ist keine Stunde erfunden.
- Am Ende des Films stehen die drei Wege als Links.
- Bedienung wie bisher: Start nur auf Knopfdruck, Kapitelleiste, »Als Text«, Standbilder bei »Weniger Bewegung«.

## Geändert

- `tools/pruefen.py`: Die Zahlenprobe des alten Films (29 Beispiele, 14 Bereiche, 18 Aufgabenformen) entfällt. Neu: Zahl und Namen der Phasen im Film müssen zu `src/fahrplan.json` passen.
- `tests/e2e.py`: Film-Tests auf die neuen Kapitel und Zeiten umgestellt.
- Die Bilder des alten Films sind aus `assets/film/` entfernt (auch das Foto des Mahnmals).

## Abweichungen vom Drehbuch

- Länge 124 statt 142 Sekunden. Die Zeiten rechnet die Leseregel; mehr Zeit brauchte kein Satz.
- Drei Sätze zu den Wegen nehmen die Worte der Startseite: »KI-Training: KI ausprobieren, gute Anfragen bauen, Ergebnisse prüfen.« · »Digitaler Unterricht: ein Weg in vier Phasen.« · »Unterrichtsbeispiele: analog und digital.«
- Das angetippte Beispiel ist »Siehst du, was sich verändert?«.

## Gemessen

- Lesezeit: Jeder Satz steht mindestens 1 Sekunde plus 0,3 Sekunden je Wort (das Skript rechnet die Zeiten so).
- Prüfbefehl bestanden.

## Offen

- Der Erzeuger des Rundgangs liegt nicht im Repository; die Quelle ist `src/film/`.
- Nicht geprüft: iPad und Safari, flüssiger Lauf auf einem echten Gerät.
- Ändert sich eine Seite sichtbar, müssen ihre Bilder neu aufgenommen werden.
