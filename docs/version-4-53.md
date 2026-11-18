# Version 4.53 – Das KI-Training beginnt mit der Wunsch-Methode

Stand: 18. November 2026 · Branch `ki-blickfang` (auf `main`, Stand 4.52 mit 4.51) · mit Freigabe zusammengeführt

Grundlage: Auftrag Mario (18.11.2026): »Die Methode macht wirklich etwas her. Sie muss prominent inszeniert werden. […] Ich will, dass die Wunsch-Methode der erste Blickfang wird. Erst danach kommt der Vierschritt. […] Verbessere die Visualisierung auch in den anderen Bereichen des KI-Trainings. Ich will, dass sich jedes Niveau dort schnell orientieren kann. Führe auch gleich alles zusammen und sichere danach.«

## Was du im Nachhinein prüfen solltest

1. **»Jedes Niveau« ohne Stufen.** Kidu kennt keine Entwicklungsstufen (Regel in `CLAUDE.md`). Darum gibt es drei Einstiege nach Anliegen, einen je Kreis: »Ich fange gerade erst an.« · »Meine Lernenden nutzen KI.« · »Ich baue etwas für andere.« Die drei Sätze sind neu und von mir formuliert.
2. **Die vier Karten stehen am Beamer nicht mehr im ersten Bildschirm.** Das folgt aus deinem Auftrag. Dort stehen jetzt die Zeichnung, »Wo stehst du?« und der Anfang von »Wo steigst du ein?«.
3. **Das Leitband »Wobei hilft dir KI?« ist weg.** Die Frage steht in der Zeile über den vier Karten; der Weg zu den Unterrichtsbeispielen steht als Satz unter den Karten.

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Blickfang | `ki.html` beginnt mit der Wunsch-Methode: Name, die zwei Merksätze, »Wo stehst du?« und rechts die Zeichnung. Jedes Feld führt zum selben Feld auf `wunsch-methode.html`. |
| »Wo stehst du?« | Der Knopf führt direkt zum ersten der drei Bilder (`wunsch-methode.html#wo-stehst-du`). |
| Drei Einstiege | »Wo steigst du ein?«: drei Karten, eine je Kreis, mit kleiner Karte, Anliegen und zwei Wegen (Deine ersten zehn Minuten, Prüf-Labor · Wenn deine Lernenden mit KI arbeiten, Auftrag »KI-Regeln für eine Aufgabe festlegen« · KI für dein Fach einrichten, Mit dem Kollegium). |
| Vier Phasen | Unverändert, jetzt an dritter Stelle, mit der Überschrift »Die vier Phasen rund um deine Stunde«. |
| Werkzeugseiten | Zehn Seiten des KI-Trainings zeigen oben rechts eine kleine Karte: welche Felder der Wunsch-Methode du dort übst, mit Sprung zum Feld. Die Zuordnung kommt aus den Wegen der zwölf Felder – eine Quelle. |
| Prüfung | `tools/pruefen.py`: Zeichnung vor den Phasen, drei Einstiege, kleine Karten aktuell. |

## Prüfungen

Gelaufen:
- `python3 tools/bauen.py && python3 tools/pruefen.py` – keine Verstöße
- `node --test` – 204 von 204
- `python3 tests/e2e.py` – 945 von 945; neu acht Prüfungen für 4.53, vier Beamer-Prüfungen an die neue Reihenfolge angepasst
- Bildschirmfotos angesehen: Beamer, 1440, iPad hochkant, Telefon, Prüf-Labor

Nicht gelaufen: axe-core, Impeccable und Taste Skill (fehlen in dieser Umgebung), echtes iPad mit Safari, VoiceOver.

Eigene Kritik: **80 von 100.** Stärken: Der erste Bildschirm zeigt jetzt das Modell; drei Anliegen führen mit einem Tippen zu einem Werkzeug; jede Werkzeugseite sagt, wo sie auf der Karte liegt. Schwächen: Die Einstiegskarten sind am Beamer hoch, weil lange Werkzeugnamen umbrechen. Am Telefon fehlt die Zeichnung. Die Startseite von Kidu nennt die Wunsch-Methode noch nicht. Die Seiten ohne Feld (zum Beispiel »Deine ersten zehn Minuten«) haben keine kleine Karte.

## Bewusst nicht übernommen / offen

- Startseite und Rundgang-Film nennen die Wunsch-Methode nicht – eigener Schritt.
- Die fünf Fähigkeiten bleiben als Filter unter den Phasen, wie entschieden.
- Kein bewegter Auftritt der Zeichnung (Input-First Rule).

## Nur du kannst das

- Die drei Anliegen lesen: Treffen sie dein Kollegium?
- Auf dem iPad und am Beamer ansehen; mit VoiceOver die Einstiege und die kleine Karte anhören.
