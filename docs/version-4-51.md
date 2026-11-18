# Version 4.51 – Skills ohne Dopplungen: eine Regel, ein Ort

Stand: 18. November 2026 · Branch `kidu-4-49-skills-ohne-dopplungen` (angelegt als 4.49; die Nummern 4.49 und 4.50 haben inzwischen PR 62 und PR 64)

Grundlage: Auftrag Mario (18.11.2026): die Skills auf Redundanzen prüfen, Dopplungen vermeiden, die Fassungen im Repository mit den älteren Einzelfassungen abgleichen und aus denselben Dateien das Plugin »kidu« für das Kollegium und das private Zusatz-Plugin »kidu-bau« bauen. Entscheidung Mario (18.11.2026): Die Anrede folgt `unterricht-digitalisieren` – die Lehrkraft wird mit »du« angesprochen, Material für Lernende übernimmt die Anrede der vorhandenen Materialien.

## Geändert

| Bereich | Was sich ändert |
| --- | --- |
| Grundregeln | Der Wortlaut steht nur noch in `unterricht-digitalisieren` (v4.7). Die anderen sieben Skills tragen dieselbe Kurzzeile mit einem Stichwort je Regel. Vorher standen die Regeln in mehreren Fassungen nebeneinander: als Block »Gemeinsame Grundregeln (wortgleich in allen Skills von Kidu)« in `ki-kompetenz-kollegium` – er war nicht wortgleich, Regel 7 nannte Branch und Pull Request –, als eigene Aufzählung in `kidu-start` und als einzelne Regeln in `ki-faktencheck`, `ki-grenzen-einer-aufgabe` und `praxisforschung-im-kollegium`. `tools/pruefen.py` prüft jetzt, dass die Kurzzeile überall gleich lautet und so viele Stichworte hat, wie es Regeln gibt. |
| Anrede | Regel 3 sagt jetzt beides: Lehrkraft »du«, Material für Lernende wie die vorhandenen Materialien (»Sie« in der Erzieher*innenausbildung), sonst »du«. `kidu-start` sagte bisher »Lernende mit ›du‹«, `ki-faktencheck` und `ki-grenzen-einer-aufgabe` schrieben »du« fest vor. Die Aufträge »Eine Übung: KI-Antworten prüfen« und »KI-Regeln für eine Aufgabe festlegen« nennen deshalb jetzt »du« oder »Sie«. |
| Qualitätsmodell | `digital-check/references/qualitaetsmodell.md` war eine Kopie von Hand aus Version 4.5 und ist auseinandergelaufen: Kernbereiche für Moodle-Kurs, Video und Lernangebot mit KI anders als auf der Website, die HTML-Lernumgebung fehlte, zwei Risiken waren kürzer, die Rahmenfragen fehlten ganz. Jetzt erzeugt `tools/werkzeugkiste.py` die Datei aus `assets/daten/qualitaet.js`; `tools/pruefen.py` meldet, wenn sie veraltet ist. `unterricht-digitalisieren` nennt die Kernbereiche nicht mehr selbst. |
| Eine Stelle je Regel | Ergebnisbündelung und Zeitdiagnose stehen in `unterricht-digitalisieren`, Schritt 5; `digital-check` verweist. Papierprobe: `unterricht-digitalisieren`, Schritt 2; `digital-check` und `lernmethode-einfuehren` verweisen. Grenzen für Lernende mit KI: `unterricht-digitalisieren`; `lernmethode-einfuehren` verweist. Fachregeln GGK: Fachbaustein; `ki-faktencheck` verweist. »Keine Noten, Punkte oder Prozentwerte« steht in `digital-check` bei den Regeln der Einschätzung. Übersicht im README des Plugins (»Eine Regel, ein Ort«). |
| Aus den Einzelfassungen übernommen | Vier Fallstricke: Herkunft jeder Aussage nennen und Datum eines Bildes an einer Fundstelle prüfen (`unterricht-digitalisieren`), Rahmenfragen durchsuchen, bevor eine Prüfung »steht nirgends« festhält (`digital-check`), Effektstärken aus zweiter Hand (`lernmethode-einfuehren`). Fachbaustein GGK: NS-Regel um Flaggen, Propaganda als Schmuck und Geräusche ergänzt und als die eine Stelle markiert; neuer Abschnitt »Fachgrenzen Politik (aus Erprobungen)« mit zwei Einträgen. Ergebnisbündelung mit den Grenzen »hängt am Scan« und »kleine Zahlen sind kein Befund«. |
| Namen und Verweise | »Unterrichtsbeispiele« statt »Galerie« (`praxisforschung-im-kollegium`), »Skillkoffer« statt »Methodenkoffer« (`kidu-start`), der Verweis auf den Abschnitt »Nur wenn Lernende mit KI arbeiten« richtiggestellt (`ki-kompetenz-kollegium`), dort auch die Werkzeuge der Bausteine auf dem Stand von 4.48 (Prüf-Labor, Sicher arbeiten in fünf Regeln). `kidu-start` und das README nennen alle sechs Bau-Skills. |
| Plugin und Website | »kidu« 0.8.1 – baut auf 0.7.1 aus PR 62 auf (`kidu-start` v3.4: Phase 2 des KI-Trainings heißt »Analogen Unterricht mit KI vorbereiten«); die Bereinigung von `kidu-start` ist v3.5. Die Kurzfassungen ändern sich nur in den zwei Zeilen zur Anrede; der Prüf-Auftrag Weg B ist unverändert. Auf der Website: neue Fassungsnummern an den Aufträgen, neue Downloads im Skillkoffer, ein Eintrag unter »Was ist neu?«. |

## Gemessen (18.11.2026)

- `python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py`: alles bestanden (193 Unit-Tests, alle Browser-Tests).
- Ohne `KIDU_PASS` liefen die Browser-Tests für die Inhalte hinter dem Schloss nicht; an diesen Inhalten ändert sich nichts.

## Bewusst nicht umgesetzt / offen

- In `digital-check` stehen die Prüffragen zur Gestaltung zweimal: als Block 2 für den Skill und als Liste »Gestaltung« in der Kurzfassung für die Website; ebenso die typischen Schwächen und die »Anforderungen«. Beide Fassungen sind verschieden formuliert. Sie zusammenzulegen hieße, die Kurzfassung zur einzigen Quelle des Skills zu machen – das entscheidet Mario.
- `assets/papierkoffer.js` schreibt »Anrede ›du‹« fest in die Aufträge des Aufgabenkoffers auf Papier. Nicht geändert, weil es kein Skill ist.
- Das Bau-Plugin »kidu-bau« liegt weiter nicht im Repository. Es wird aus denselben Regeln gebaut und verweist auf die Besitzer in »kidu«; »kidu« hängt nie an etwas, das nur in »kidu-bau« steht.

## Nur du kannst das

- Regel 3 zur Anrede lesen: Passt sie zu deinen Bildungsgängen?
- Die zwei geänderten Aufträge auf der Seite »Aufträge zum Kopieren« einmal mit deinem KI-System ausprobieren.
- Das Plugin 0.8.1 installieren; es ersetzt die bisherige Fassung.

## Fallstricke (Vorschläge für die Skills)

- `website-design-workflow`: Eine Kopie von Hand aus einer Datendatei läuft auseinander, auch wenn sie ihre Quelle nennt (Kidu 4.51: Qualitätsmodell im Skill aus 4.5 – drei Kernbereiche anders, ein Materialtyp und die Rahmenfragen fehlten) → solche Kopien erzeugen lassen und im Prüfskript auf Aktualität prüfen.
- `website-design-workflow`: Ein Block, der »wortgleich in allen Skills« sein soll, war es nicht (Kidu 4.51: Regel 7 in `ki-kompetenz-kollegium`) → Gleichheit vom Prüfskript prüfen lassen, nicht nur behaupten.
