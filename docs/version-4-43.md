# Version 4.43 – Kidu in 100 Sekunden

Stand: 16. November 2026 · Branch `pitch-ueber`

Grundlage: Auftrag Mario (16.11.2026): den Pitch-Film mit dem Skill `film-regie` neu schneiden; als MP4 für die Mail und auf der Seite »Über Kidu«, ohne Kontakt, Start auf Knopfdruck. Drehbuch von Mario freigegeben (Stil »Reise«, nur Geräusche, ein Beispiel).

## Neu

- **Abschnitt »Kidu in 100 Sekunden« auf `ueber.html`** (`#kurzfilm`): der neu geschnittene Pitch-Film, 102 Sekunden, als Video (`assets/film/kidu-pitch.mp4`, 1280 × 720, rund 8,7 MB) mit Standbild (`kidu-pitch-poster.webp`).
- Das Video lädt erst beim Abspielen (`preload="none"`), startet nie von selbst und hat die Bedienung des Browsers: anhalten, spulen, Ton aus, Vollbild.
- »Der Film als Text« steht direkt darunter.
- Das Schlussbild auf der Seite trägt keine Kontaktadresse.

## Inhalt des Films

Problem (Tablets, Arbeitsblatt, Schnellhefter) · Frage · Politik-Werkstatt: Stimmzettel, Schalter der Hürde, neue Sitzverteilung, Rückmeldung zur Kontrollfrage · »Das kann Papier nicht.« · sechs Prinzipien · zwei Säulen und die Unterrichtsbeispiele · 29 Beispiele · Einladung.

## Herkunft

- Bilder: Bildschirmfotos der Politik-Werkstatt vom 12.11.2026 (schon in `assets/film/`), Vorschaubilder der Unterrichtsbeispiele.
- »29 Beispiele, im eigenen Unterricht erprobt«: Stand der Daten am 16.11.2026.
- Im Stimmzettel wird kein Kreuz gesetzt.
- Geräusche: im Code erzeugt (eigene Synthese), keine fremden Aufnahmen, keine Musik.
- Der Film ist außerhalb des Repositorys erzeugt (Bühne als HTML, Bild für Bild aufgenommen, mit ffmpeg zum MP4 gefügt). Die Quelle liegt nicht im Repository.

## Gemessen

- Lesezeit: alle 21 Sätze stehen mindestens 1 Sekunde plus 0,3 Sekunden je Wort.

## Offen

- Der Film ist ein Video und keine Bühne aus der Quelldatei. Ändern sich Namen oder Zahlen, muss er neu erzeugt werden; `tools/pruefen.py` zählt in diesem Film nicht nach.
- Nicht aus der Cloud prüfbar: Ton, flüssiger Lauf, iPad und Safari.
- Der Film auf der Startseite ist unverändert (2:50). Er wird als Rundgang neu geplant.

## Geprüft

Siehe Pull Request.
