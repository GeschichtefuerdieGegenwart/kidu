# Version 4.54 – Kidu als Moodle-Paket: bauen und prüfen

Stand: 19. November 2026 · Branch `kidu-4-54-moodle-paket` (auf `main`, Stand 4.53) · wartet auf Freigabe

Grundlage: Auftrag Mario (19.11.2026): Kidu soll künftig in einem Moodle-Kurs laufen. Das Repository bleibt Quelle und Versionsverwaltung, daraus entsteht ein Paket für Moodle. Vor jedem Umbau steht eine Probe mit dem heutigen Stand.

## Was du prüfen solltest

1. **Das Paket ist in Moodle noch nicht erprobt.** Geprüft ist, was sich ohne Moodle prüfen lässt: Das Paket ist vollständig und läuft unter einem Pfad, wie Moodle ihn vergibt. Ob Upload, Entpacken, »Hauptdatei setzen« und die Anzeige »Öffnen« bei euch so gehen, zeigt nur die Probe im Kurs. Bis dahin heißt es überall »Vorschlag«.
2. **Das Paket ist die Seite, wie sie heute ist.** Auch der Bereich »Für die Fortbildungsleitung« ist dabei, verschlüsselt wie auf der offenen Seite. Ob er in Moodle ein eigenes, verborgenes Paket wird, ist ein eigener Schritt.
3. **»Deine Daten« beschreibt die offene Seite.** In Moodle stimmt der Satz »Kidu braucht keine Anmeldung« nicht mehr, und Moodle hält Zugriffe fest. Eine Fassung für Moodle ist ein eigener Schritt und braucht deinen Wortlaut.
4. **30 Unterrichtsbeispiele führen mit »Ausprobieren« aus dem Paket hinaus.** Der Bericht zählt sie. Wohin sie in Moodle führen sollen, ist ein eigener Schritt.

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Werkzeug | `tools/moodle_paket.py` baut die Seiten frisch, prüft das Paket und schreibt `dist/kidu-<Version>-moodle.zip` und einen Bericht daneben. `--nur-pruefen` prüft ohne ZIP. `dist/` steht in `.gitignore`. |
| Inhalt des Pakets | Die 48 gebauten Seiten, `assets/` (Stil, 70 Skripte, 141 Bilder, vier Schriften, ein Film), `werkzeugkiste/download/`, `LICENSE`, `LICENSE-TEXTE.md`, `ENTSTEHUNG.md`, `CITATION.cff` und `LIESMICH-MOODLE.txt`. Nichts aus `src/`, `tools/`, `tests/`, `docs/`, `privat/`, `schloss/`. `index.html` liegt auf der obersten Ebene. |
| Prüfung vor dem Packen | Jeder Verweis in Seiten, Stil und Skripten zeigt auf eine Datei im Paket, in genau dieser Schreibweise. Kein Verweis beginnt mit »/« oder verlässt das Paket. Keine Datei kommt von einem fremden Server, kein Skript lädt nach. Dateinamen ohne Leerzeichen und Umlaute. Findet die Prüfung etwas, entsteht kein ZIP. |
| Bericht | Version, Stand, Zahl und Größe der Dateien, die größten Dateien, die Links, die das Paket verlassen, und der Prüfwert (SHA-256) des ZIP. |
| Gleiches ZIP | Namen sortiert, feste Zeit im ZIP: Dieselben Dateien ergeben denselben Prüfwert. So lässt sich sagen, welches Paket in einem Kurs liegt. |
| `LIESMICH-MOODLE.txt` | Fünf Schritte für Moodle (Datei, Entpacken, Hauptdatei setzen, Anzeige »Öffnen«, Speichern), der Weg zu einer neuen Version und vier Hinweise. Der Text steht nur im Werkzeug. |
| Projektprüfung | `tools/pruefen.py` ruft die Paketprüfung bei jedem Lauf mit auf. Ein Pfad mit »/« oder eine fehlende Datei fällt damit vor dem Commit auf. |
| Version | Die Zeile »Stand: … (Version x.y)« auf »Über Kidu« ist die eine Quelle für Version und Datum des Pakets. Sie steht jetzt auf 4.54. Unter »Was ist neu?« gibt es keinen Eintrag: Das Paket ist für die Person, die Kidu in Moodle einrichtet, nicht für die Leserin der Seite. |

## Gemessen (19.11.2026)

- Paket: 283 Dateien, entpackt 16,4 MB, als ZIP 14,9 MB. Größte Datei: der Film mit 8,7 MB.
- `python3 tools/bauen.py && python3 tools/pruefen.py` – keine Verstöße; neu: »Moodle-Paket: 282 Dateien geprüft, 30 Links ›Ausprobieren‹ führen hinaus«.
- `node --test` – 204 von 204.
- `python3 tests/e2e.py` – 955 von 955; neu zehn Prüfungen:
  - Bau schreibt ZIP und Bericht; zweimal gebaut ergibt denselben Prüfwert.
  - `index.html` oben; Stil, vier Schriften, Film und Lizenzen dabei; nichts aus den inneren Ordnern.
  - Name und LIESMICH tragen die Version von »Über Kidu«.
  - Alle 48 Seiten laden über einen Server auf dem Prüfrechner unter `…/pluginfile.php/4711/mod_resource/content/7/` – keine fehlende Datei, kein Konsolenfehler, keine Anfrage nach außen, keine Weiterleitung aus dem Paket.
  - Die Schriften kommen aus dem Paket und sind geladen.
  - Klicks bleiben im Paket: Start → KI-Training → ein Feld der Wunsch-Methode.
  - Eine gemerkte Wahl (Beamer-Ansicht) bleibt nach dem Neuladen.
  - Die Prüfung findet fünf gebaute Fehler: falsche Schreibweise, Pfad mit »/«, fremder Server, fehlende Seite, fehlendes Bild im Stil.
  - Ein sauberes Paket bleibt ohne Befund.
- Bildschirmfoto der Startseite unter dem Moodle-Pfad angesehen (1280 × 720): Schriften, Wortmarke, beide Flächen und die Leiste der Unterrichtsbeispiele stehen wie auf der offenen Seite.

Nicht gelaufen: ein echtes Moodle (Upload, Entpacken, Anzeige »Öffnen«, Moodle-App, Abmeldung nach Wartezeit), echtes iPad mit Safari, VoiceOver, axe-core, Impeccable und Taste Skill (fehlen in dieser Umgebung). Ohne `KIDU_PASS` liefen die Browser-Tests für die Inhalte hinter dem Schloss nicht; an diesen Inhalten ändert sich nichts.

## Bewusst nicht übernommen / offen

- Kein eigenes Paket für die Fortbildungsleitung und keine Fassung ohne Schloss – eigener Schritt.
- Keine Fassung von »Deine Daten« für Moodle – eigener Schritt, braucht den Wortlaut von Mario.
- Die Links »Ausprobieren« bleiben, wie sie sind (Regel »Wahrheit der Daten«: Links nicht verändern).
- Kein Download des Pakets auf der Seite und kein automatischer Bau bei GitHub: Das ZIP entsteht auf dem Rechner, der den Befehl ausführt.
- Die Prüfung erkennt zusammengesetzte Pfade in Skripten nicht (»ordner/« + Name). Darum nimmt das Paket `assets/` und `werkzeugkiste/download/` ganz mit, und der Browser-Test lädt jede Seite einmal.

## Nur du kannst das

- Die Probe in einem leeren Testkurs: ZIP hochladen, entpacken, `index.html` als Hauptdatei setzen, Anzeige »Öffnen«. Dann am Laptop, am iPad quer und am Beamer durchklicken.
- In Moodle nachsehen: Welche Anzeigearten gibt es? Bleibt ein gemerkter Stand nach dem Neuladen? Was zeigt die Moodle-App?
- Entscheiden, wann der Kurs für das Kollegium öffnet – erst nach der Fassung von »Deine Daten« für Moodle.
