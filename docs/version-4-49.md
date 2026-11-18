# Version 4.49 (Variante C) – Aufgabenkoffer auf Papier: das Arbeitsblatt als Bild

Stand: 18. November 2026 · Branch `koffer-variante-c` · zur Freigabe

Grundlage: Auftrag Mario (17.11.2026) »Aufgabenkoffer ›Analogen Unterricht mit KI vorbereiten‹ – zwei Designvarianten«. Diese Fassung ist Variante C (»das Arbeitsblatt als Bild«). Variante B (»nach Anlass sortiert, im Raster des digitalen Koffers«) steht auf dem Branch `koffer-variante-b`. Es soll nur eine der beiden zusammengeführt werden. Bestandsaufnahme und Zuordnung: [`docs/koffer-zuordnung.md`](koffer-zuordnung.md).

## Was du freigeben musst

1. Welche Variante (B oder C) zusammengeführt wird.
2. Die Zuordnung der 21 Einträge zu den sechs Stellen des Blatts – ein Vorschlag (Tabelle unten).
3. Die sechs Sätze der Stellen und die neue Ausnahme der Input-First Rule: Das Blatt legt sich beim ersten Besuch je Sitzung einmal auf die Platte (280 ms).

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Umbenennung | Phase 2 des KI-Trainings heißt »Analogen Unterricht mit KI vorbereiten« (vorher »Unterricht mit KI vorbereiten«) – im Fahrplan, in der Zeile oben und im Fahrplan unten jeder Werkzeugseite, auf »Über Kidu«, in README, PRODUCT, CLAUDE, im Plugin (`kidu-start` v3.4, Plugin 0.7.1) und in den Tests. Schlüssel `vorbereiten` und Sprungmarke `#phase-vorbereiten` bleiben; `tools/pruefen.py` meldet die alte Bezeichnung und »klassischer Unterricht«. Der Leitsatz »KI kann Unterricht vorbereiten …« bleibt. |
| Erste Ebene | Ein gezeichnetes Arbeitsblatt auf Karton, auf der versetzten Ocker-Platte. Sechs Stellen von oben nach unten, je mit einem Stanzloch-Punkt in Ocker mit Nummer am Blatt, einer Linie und der Beschriftung daneben: Name und »n Aufträge«. Alle Texte stehen als HTML neben dem Bild; das Bild ist dekorativ. |
| Zweite Ebene | Ein Tippen auf eine Stelle hebt ihren Bereich auf dem Blatt hervor (Ocker-zart) und öffnet das Feld mit ihren Aufträgen – ab 1060 px daneben, sonst darunter. Jeder Auftrag: Name, ein Satz, »Auftrag kopieren« (Rückfall: Text aufklappen und markieren), dahinter »Auftrag an die KI ansehen« und »Mehr zur Idee«. Im Feld die Angaben für alle Aufträge (Fach, Thema, Lerngruppe). |
| Bedienung | Nur eine Stelle zugleich offen. Pfeiltasten, Pos1 und Ende wechseln die Stelle; nur eine Stelle steht im Tab-Weg. Escape und »Schließen« schließen und setzen den Fokus auf die Stelle zurück. |
| Telefon | Unter 768 px wird das Blatt kleiner und zeigt die sechs Nummern; darunter stehen die Stellen als nummerierte Liste – dort die Bedienung. |
| Adresse | `#stelle=<id>` merkt die Stelle; »Zurück« im Browser und Teilen funktionieren (Pfeiltasten legen keinen neuen Eintrag an). `#pk-<id>` öffnet die Stelle eines Eintrags und zeigt ihn. |
| Ohne JavaScript | Die Beschriftungen sind Sprungmarken; alle sechs Stellen stehen mit ihren 21 Aufträgen untereinander, die Aufträge an die KI zum Markieren. Gebaut von `tools/papierkoffer.py` aus `PAPIERKOFFER.html()` – dieselbe Funktion wie im Browser, beim Bauen mit Node. |
| Vertiefung | »So prüfst du das Ergebnis – und was nicht hineingehört«: die drei Prüffragen, die schon in jedem Auftrag stehen, und der Datenschutz. |
| Daten | `KOFFER.papierStellen` in `assets/daten/koffer-ideen.js`: Nummer, Name, Satz, Lage der Markierung, Einträge. Die 18 Aufgabenformen, die drei Kniffe für jede Phase und alle Aufträge sind unverändert. Der Aufgabenkoffer des Digitalen Unterrichts bleibt unverändert. |
| Dopplungen | »Hilfe- und Expertenkarten« steht bei »Gestufte Zugänge und Hilfen« nur mit Namen und Verweis, ebenso »Sortieren mit Zwischenstand« bei »Eine Reihe legen«. Die Aufträge an die KI behalten alle Kniffe. |
| Wortwahl | Auf der ersten Ebene heißt es »Auftrag an die KI«, nicht »Prompt«. An jeder Eingabe steht »Keine Namen, Noten oder anderen personenbezogenen Daten eingeben.« (sichtbar und mit `aria-describedby`). |

## Zuordnung der Einträge

| Stelle | Satz im Feld | Einträge |
| --- | --- | --- |
| 1 Kopf und Einstieg | Was vor der Arbeit oben steht: eine Frage, eine Vermutung, eine Entscheidung. | Erst erinnern · Vorhersagen, versuchen, vergleichen · Stimmen der Klasse sammeln · Erst entscheiden, dann auflösen (4) |
| 2 Infotext und Material | Der Text oder das Material – und wie man es liest. | Lesen in drei Schritten · Markieren mit Grund · Einen Film selbst steuern · Regler und Modell (4) |
| 3 Aufgaben | Die Aufträge in der Mitte: sortieren, legen, einordnen, urteilen. | Zuordnen und Sortieren · Eine Reihe legen · Struktur legen · Einen Fall einordnen · Ein Urteil schreiben (5) |
| 4 Hilfe am Rand | Hilfen neben der Aufgabe: Tippkarten, Hilfe- und Expertenkarten, ein Hilfekasten. | Gestufte Zugänge und Hilfen · Hilfe- und Expertenkarten · Übersicht statt Klickstrecke (3) |
| 5 Lösung und Selbstkontrolle | Unten zum Umknicken: Lösungen mit Erklärungen und eine Liste »Ich kann …«. | Auswahlaufgabe mit Rückmeldung · Sich selbst einschätzen (2) |
| 6 Rückseite | Was dahinter liegt: Karteikarten, ein Ausgangsticket, ein Plan zum Erklären. | Karteikarten · Fehlvorstellungen dreimal nutzen · Ein Erklärvideo erstellen (3) |

Angepasst gegenüber dem Vorschlag im Auftrag: Für »Kopf und Ziel« (Stundenstruktur, Lernziel) gibt es im Koffer keinen Auftrag – dort stehen die vier Einstiegsformen. Erwartungshorizont und Bewertungsraster gehören im Bestand zu »Ein Urteil schreiben« und »Fehlvorstellungen dreimal nutzen« und stehen dort. Elterninformation und Organisation stehen in der Schnell-Anfrage, nicht im Koffer. Ausführlich in `docs/koffer-zuordnung.md`.

## Neue Grafiken

| Grafik | Beschreibung |
| --- | --- |
| Das Arbeitsblatt (`PAPIERKOFFER.BLATT` in `assets/papierkoffer.js`) | Selbst gezeichnet, SVG im Seitenverhältnis A4 (210 × 297): Papierfläche `--blatt` #FFFFFD mit Umriss in Druckschwarz (2 px), zwei Stanzlöcher, ein Titelbalken, Kästen für Vermutung und Bild, Rasterpunkte als Platzhalter für Text, drei Aufträge mit Nummernkästchen, zwei Tippkarten am Rand (eine in Ocker), eine gestrichelte Falz mit Kästchen zur Selbstkontrolle, rechts unten die umgeknickte Ecke in Karton. Sechs Bereiche liegen zart dahinter und werden bei Wahl Ocker-zart. Kein Text im Bild, für Hilfstechnik verborgen. |
| Stanzloch-Punkte mit Nummer | HTML und CSS (26 px, Ocker mit Kante Honig, Nummer als Text), mit Linie in Druckschwarz (2 px) zur Beschriftung. Gewählt: Punkt Druckschwarz, Linie 4 px. |

## Prüfungen

Gelaufen (Chromium, `file://`):

- Projektprüfung `tools/pruefen.py`: keine Verstöße – neu `pruefe_papierkoffer` (Teile aktuell, höchstens sechs Stellen, kein Text im Bild, 21 Einträge, Hinweis an jeder Eingabe, kein »Prompt« auf der ersten Ebene) und die alte Bezeichnung der Phase.
- Unit-Tests `node --test`: 194 von 194 (Papier-Koffer: sieben Tests, davon fünf neu für Stellen, Dopplungen, Fassung ohne Skript, Phasen und Kniffe).
- Browser-Tests `tests/e2e.py`: alle bestanden, darunter 29 neue zum Papier-Koffer – Öffnen und Schließen per Maus, Finger und Tastatur (Enter, Pfeiltasten, Pos1, Ende, Escape, »Schließen«), Fokus, nur eine Stelle offen und nur eine im Tab-Weg, Hervorhebung, Feld daneben (iPad quer, Beamer) und darunter (iPad hoch), Telefon mit Liste, Adresse, Zurück, Teilen, `#pk-<id>`, Kopieren mit Zwischenablage und Rückfall, Freitext nicht gespeichert, das Blatt legt sich nur beim ersten Besuch (280 ms), bei »weniger Bewegung« nicht, ohne JavaScript alles sichtbar, Beamer, Beschriftungen neben dem Blatt mit 2-px-Linien, keine Konsolenfehler, nichts aus dem Netz.
- Mindestprüfung 5a (`pruef_seiten.py` aus dem Website-Design-Workflow): 1440 · 1280 · 768 · 390 · 375 px, mit und ohne »weniger Bewegung« – 0 Probleme.
- Gezielte Barrierefreiheit statt axe-core (1280 und 390 px, zu und offen mit allen Vertiefungen): keine doppelten IDs, alle Bezüge vorhanden, jedes Bedienelement mit Namen (»Stelle 4: Hilfe am Rand 3 Aufträge«), keine Sprünge in den Überschriften, kleinster Textkontrast 4,89 : 1 (Druckschwarz auf Ocker), keine Zielfläche unter 24 px (kleinste 44 px), keine Schrift unter 16 px.

Gemessen (18.11.2026):

| Größe | Feld | Unterkante von Blatt und Beschriftungen | Waagerechtes Scrollen |
| --- | --- | --- | --- |
| Beamer 1280 × 720 | daneben | 673 px – Überschrift, ein Satz und das ganze Blatt mit allen Beschriftungen im ersten Bildschirm; der erste Auftrag einer Stelle beginnt bei 666 px | nein |
| iPad quer 1180 × 820 | daneben | 660 px | nein |
| iPad quer 1080 × 810 | daneben | 570 px | nein |
| 1024 × 768 | darunter | 717 px | nein |
| iPad hoch 768 × 1024 und 820 × 1180 | darunter | 808 bzw. 817 px | nein |
| Telefon 390 × 844 | darunter, Stellen als Liste | – | nein |
| 1440 × 900 und 1920 × 1080 | daneben | 808 px | nein |

Beschriftungen stehen in jeder Breite mindestens 20 px neben dem Blatt; keine überdeckt eine andere. Nach dem ersten Besuch läuft keine Animation. Zwei Tipps bis zum Auftrag (Three-Tap Rule).

Kritik nach Bildschirmfotos, drei Runden: (1) das Formular schob die Aufträge unter den Beamer-Rand, die Stanzlöcher wirkten wie Flecken, der Satz brach auf drei Zeilen; (2) bei 1440 px liefen zwei Beschriftungen über den Blattrand, »KI-/System« wurde getrennt; (3) die Sätze der Stellen waren für das Feld zu lang. Punktwert nach `critique.md`, ehrlich: Gestaltung 35/40, Bedienung 25/30, Eigenständigkeit 17/20, Inhalt 9/10 – 86/100.

Nicht gelaufen: axe-core (`tests/vendor/axe.min.js` fehlt, Installationen sind in dieser Umgebung gesperrt) · Taste `lint.mjs` und `inspect.mjs`, Impeccable `critique`, `audit`, `polish` (Plugins fehlen; dafür 5a und die gezielte Prüfung oben) · iPad mit Safari, VoiceOver, Moodle.

## Bewusste Ausnahmen

- **Honigplatte:** Der Auftrag nennt #F2B233. Es gilt das Ocker des Logos #B68235 (`--ki-platte`, seit 4.26), mit 2-px-Kante in Honig #7D5A1C.
- **Stellen:** angepasst an den Bestand (siehe oben).
- **Neue Farbe `--blatt` #FFFFFD:** nur für die Papierfläche des Blatts, wie im Auftrag; eine Spur heller als `--flaeche`.
- **Ein Satz je Auftrag:** Es ist das vorhandene Feld »tun«. Bei 14 der 21 Einträge sind das zwei oder drei kurze Sätze; gekürzt wird nur, was sich wiederholt.
- **Feld neben dem Blatt ab 1060 px:** Darunter (1024 × 768, iPad hoch, Telefon) steht es unter dem Blatt; am iPad quer mit 1080 px und mehr steht es daneben.
- **Bauen mit Node:** `tools/bauen.py` braucht für diese Seite Node (wie die Unit-Tests).

## Offen

- Ob Lehrkräfte ohne Technikerfahrung die Beschriftungen als Schaltflächen erkennen: noch offen, nicht erprobt. Der Satz im Feld (»Tipp eine Stelle auf dem Blatt an …«) und die Unterstreichung beim Überfahren sollen helfen.
- iPad mit Safari, VoiceOver und Moodle: nicht geprüft.
