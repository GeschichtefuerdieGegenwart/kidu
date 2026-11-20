# Version 4.57 – Unterrichtsbeispiele nach Fächern

Stand: 20. November 2026 · Branch `unterrichtsbeispiele-neu` (auf `kidu-4-54-moodle-paket`, Stand 4.54) · wartet auf Freigabe

Grundlage: Auftrag Mario (20.11.2026). Die Seite »Unterrichtsbeispiele« war ihm zu voll. Sie soll sich auf das Wesentliche beschränken: vier Bereiche aus dem eigenen Unterricht (GGK-Labor, GK-Labor mit dem Moodle-Kurs, Psycho-Labor, Demokratiebildung), je zwei bis drei der besten Beispiele mit kurzer Begründung, die Einteilung punktuell · phasenweise · durchgängig · ganze Einheit und die sechs Prinzipien, genau erklärt. Dazu Filme, die zeigen, warum die Beispiele gut sind – erst als Plan zur Freigabe.

## Warum 4.57

4.55 und 4.56 sind gebaut, aber noch nicht auf GitHub. Dieser Branch liegt deshalb auf 4.54. Beim Zusammenführen mit 4.55/4.56 sind Konflikte zu erwarten in `src/ueber.html` (Stand-Zeile, »Was ist neu?«), `CLAUDE.md`, `assets/hilde.css` (Ende der Datei), `tests/e2e.py`, `tools/pruefen.py`, `tools/bauen.py` und in allen gebauten Seiten (Prüfwert des Stils im Kopf). Die gebauten Seiten nach dem Zusammenführen einfach neu bauen.

## Was du prüfen solltest

1. **Die Auswahl und die zwölf Sätze »Warum das trägt«.** Das sind meine Begründungen aus dem Material, mit Beleg in `assets/daten/labore.js`. Es sind keine Stärken aus einem freigegebenen Digital-Check; die Detailseiten zeigen weiter »Qualitätscheck: noch offen«.
2. **Status.** »Kinder haben Rechte« (Demokratiebildung, Etappe 3) steht auf »in Entwicklung«: Das README nennt das Wahlfach einen Entwurf, noch nicht im Unterricht erprobt. Die Motivation im Psycho-Labor steht in der Leiste auf »läuft«. Die Blätter M1.2, M1.4 und M1.5 tragen den Status der ganzen Politik-Werkstatt (erprobt am 8.11.2026); die Karte sagt das jetzt: »Status des ganzen Beispiels«. Die Fassung 3 des Hefters (19.11.2026) ist noch nicht erprobt.
3. **Demokratiebildung hat keinen Link.** Eine öffentliche Adresse der Anwendung habe ich nicht gefunden. »Ausprobieren« fehlt dort, bis du sie nennst.
4. **Nur eigene Oberflächen als Bild.** Die Titelbilder der Hefter und die Bilder im Moodle-Paket des GGK-Labors sind nicht übernommen (Herkunft für eine öffentliche Seite ungeklärt). Siehe `docs/galerie-quellen.md`.
5. **Der Rundgang auf der Startseite ist veraltet.** Kapitel 7 zeigt noch die alte Seite und sagt »Wähl ein Prinzip«. Neu aufnehmen erst nach deiner Freigabe der Seite: Ein Film entsteht nach der Seite, nicht vorher.

## Die Auswahl

| Fach | Beispiel | Umfang | Prinzipien | Warum (kurz) |
| --- | --- | --- | --- | --- |
| GGK-Labor | M20 Drei Dilemmata | durchgängig | Verdecken, Bündeln | Urteil mit dem Wissen der Zeit, danach die Frage, ob man heute anders urteilen darf |
| GGK-Labor | M22 Wie war das möglich? | durchgängig | Stufen | Alle am selben Fall, jede in passender Tiefe; am Ende die erste Antwort wieder öffnen |
| GGK-Labor | M19 Appeasement | phasenweise | Verdecken, Bündeln | So sieht hybrid aus: Gerät trägt Material und Auflösung, abgestimmt wird im Raum |
| GK-Labor | M1.4 Wählen und auszählen | phasenweise | Bündeln, Variieren | Die Wirkung der Hürde an den eigenen Stimmen; gezählt werden nur Summen |
| GK-Labor | M1.2 Funktionen erkennen | phasenweise | Rückmelden | Rückmeldung mit Grund, während noch gedacht wird; Zwischenstand auf Wunsch der Lernenden |
| GK-Labor | M1.5 Warum wählen Menschen so? | phasenweise | Verdecken | Die eigene Schätzung neben der amtlichen Zahl; der Abstand ist der Gesprächsanlass |
| Psycho-Labor | DS 2 Siehst du, was sich verändert? | phasenweise | Messen, Verdecken | Befund am eigenen Erleben geprüft; Kursbild ohne Namen per QR-Code |
| Psycho-Labor | DS 5 Wie sehr beeinflussen mich andere? | durchgängig | Messen, Bündeln, Rückmelden | Einfluss der Gruppe an den eigenen Daten; Täuschung angekündigt und aufgelöst |
| Psycho-Labor | DS 6–11 Motivation | ganze Einheit | Rückmelden, Stufen | Ein Kreis verbindet die Stunden; Hilfe wählbar |
| Demokratiebildung | Etappe 3 Kinder haben Rechte | durchgängig | Verdecken, Rückmelden, Stufen | Rechte am Alltag geprüft; die erste Position zeigt, was sich verändert hat |
| Demokratiebildung | Gene ohne Reisepass | punktuell | Variieren | Jede Variante sofort; das Urteil fällt im Gespräch |
| Demokratiebildung | Nationalismus und Demokratie | phasenweise | Variieren | Kipp-Punkte zeigen das Gesamtbild; Maßstab bleibt das Grundgesetz |

Jeder Umfang und jedes Prinzip kommt mindestens einmal vor (Test in `tests/labore.test.js`).

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Kopf | Überschrift wie bisher, ein Satz zur Wahl, die ehrliche Herkunft (»aus dem Unterricht des Urhebers«), vier Kacheln, eine je Fach. Bei 1280 × 720 stehen alle vier im ersten Bildschirm. |
| So liest du die Beispiele | Die vier Formen des Umfangs gleich breit nebeneinander, mit Stundenlinie, und der Satz »Keine Stufen …«. Die sechs Prinzipien mit »Wofür« und »Ohne Gerät« im Wortlaut der Seite »Wann funktioniert digitaler Unterricht?« und mit »Hier zu sehen« (Sprung zur Karte). Die Forschung steht in einer Vertiefung zum Aufklappen. |
| Ein Fach | Frage, Quintessenz in drei Sätzen, »Regel des Fachs«, das Ganze als Karte (Bild, Leiste, drei Sätze, Status), drei Beispiele mit »Was Lernende tun · Was das Gerät kann · Warum das trägt«, »So nutzt du die Idee in deinem Fach« mit vier Wegen, einer je Umfang. |
| Bedienung | Mit Skript steht ein Fach da, die Wahl bleibt gemerkt (`hilde.fach`). »Alle vier untereinander« zeigt alles; ohne Skript stehen ohnehin alle vier da. Sprünge auf ein Beispiel öffnen sein Fach. Nichts bewegt sich beim Wählen. |
| Weitere Beispiele | Die übrigen 30 Einträge als schlichte Liste, getrennt nach »Unterricht« und »Außerhalb des Unterrichts«, je mit Fach, Status und Detailseite. |
| Keine Links nach außen | Die gebaute Seite enthält keinen Link aus Kidu hinaus. »Ausprobieren« setzt erst das Skript ein. Geht ein Repository offline, bleibt die Seite vollständig. |
| Daten | Neu `assets/daten/labore.js` (vier Fächer), `assets/labore.js` (Bau und Bedienung), `tools/labore.py` (Zeichen `<!-- labore:… -->`). `prinzipien.js` mit `wofuer` und `papier`. Neues Beispiel »Kinder haben Rechte« (`demokratie-e3`). »Nationalismus und Demokratie« mit Prinzip Variieren und Geräte-Satz (als Vorschlag). Acht neue Bilder. |
| Prüfung | `tools/pruefen.py` prüft die Fächer statt »Zum Anfangen«. Zehn neue Unit-Tests (`tests/labore.test.js`). Die Browser-Tests der alten Seite sind durch neue ersetzt. |
| Gestrichen | Suche, Filter, Bühne, »Zum Anfangen«, »Was das Gerät hier kann«, Einblicke. Skripte `anfangen.js`, `galerie-buehne.js`, `galerie-prinzipien.js`, `showroom.js`. `suche.js` bleibt für die Tests der Empfehlungsregeln. |

## Gemessen (20.11.2026)

- `python3 tools/bauen.py && python3 tools/pruefen.py` – keine Verstöße; neu: »Unterrichtsbeispiele nach Fächern: 4 Fächer, 12 Beispiele geprüft«; »Moodle-Paket: 296 Dateien geprüft, 30 Links ›Ausprobieren‹ führen hinaus« (alle aus den Detailseiten, keiner aus der neuen Seite).
- `node --test` – 214 von 214.
- `python3 tests/e2e.py` – 901 von 901. Weniger als in 4.54 (955), weil die Prüfungen von Suche, Filter und Bühne entfallen.
- Bildschirmfotos angesehen: 1280 × 720 (Kopf mit allen vier Kacheln), ein Fach bei 1280 × 720, 820 × 1180 (Schlüssel), 390 × 844 (Telefon, kein seitliches Scrollen). Seitenhöhe bei 1280 px: rund 6300 px statt 13 400 px.

Nicht gelaufen: echtes iPad mit Safari, Beamer im Raum, VoiceOver, axe-core, Moodle, Impeccable und Taste Skill (fehlen in dieser Umgebung).

## Offen

- Adresse der Anwendung Demokratiebildung (noch offen).
- Rundgang auf der Startseite, Kapitel 7: neues Bild und neuer Satz nach der Freigabe.
- Die Filme zu den vier Fächern: Plan zur Freigabe im Chat, gebaut wird erst nach dem Ja.
- Die sechs Felder `auswahl` (»Zum Anfangen«, 26.10.2026) bleiben in den Daten, die Seite zeigt sie nicht mehr.
