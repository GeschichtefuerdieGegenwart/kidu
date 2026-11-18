# Version 4.49 (Variante B) – Aufgabenkoffer auf Papier nach Anlass, im Raster des digitalen Koffers

Stand: 18. November 2026 · Branch `koffer-variante-b` · zur Freigabe

Grundlage: Auftrag Mario (17.11.2026) »Aufgabenkoffer ›Analogen Unterricht mit KI vorbereiten‹ – zwei Designvarianten«. Diese Fassung ist Variante B (»nach Anlass sortiert, im Raster des digitalen Koffers«). Variante C (»das Arbeitsblatt als Bild«) steht auf dem Branch `koffer-variante-c`. Es soll nur eine der beiden zusammengeführt werden. Bestandsaufnahme und Zuordnung: [`docs/koffer-zuordnung.md`](koffer-zuordnung.md).

## Was du freigeben musst

1. Welche Variante (B oder C) zusammengeführt wird.
2. Die Zuordnung der 21 Einträge zu den vier Anlässen – ein Vorschlag aus den sieben Zwecken in `AUFGABEN.zwecke` (Tabelle unten).
3. Die vier Sätze der Anlässe. Sie stammen aus den Feldern »papier« der Einträge, sind aber neu formuliert.

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Umbenennung | Phase 2 des KI-Trainings heißt »Analogen Unterricht mit KI vorbereiten« (vorher »Unterricht mit KI vorbereiten«) – im Fahrplan, in der Zeile oben und im Fahrplan unten jeder Werkzeugseite, auf »Über Kidu«, in README, PRODUCT, CLAUDE, im Plugin (`kidu-start` v3.4, Plugin 0.7.1) und in den Tests. Schlüssel `vorbereiten` und Sprungmarke `#phase-vorbereiten` bleiben; `tools/pruefen.py` meldet die alte Bezeichnung und »klassischer Unterricht«. Der Leitsatz »KI kann Unterricht vorbereiten …« bleibt. |
| Gemeinsame Koffer-Komponente | `.koffer-raster` und `.koffer-karte` in `assets/hilde.css`: Raster, Kartenform, Abstände und Zustände des Aufgabenkoffers, jetzt für beide Koffer. Die Bereichsfarbe kommt aus `.bereich-lernen` (Petrol) oder `.bereich-ki` (Ocker). Der Aufgabenkoffer nutzt sie für seine Ideenkarten – Inhalt und Bedienung unverändert, gemessen gleich. |
| Erste Ebene | Vier Anlass-Karten statt 21 gleichrangiger Karten: eigenes Bildzeichen, Name, ein Satz, »n Aufträge« und das Bereichsetikett »Analogen Unterricht mit KI vorbereiten« auf der Honigplatte. Das Formular steht nicht mehr im Kopf. |
| Zweite Ebene | Ein Tippen öffnet darunter, über die ganze Breite, die Aufträge des Anlasses. Nur einer ist zugleich offen. Jeder Auftrag: Name, ein Satz, »Auftrag kopieren« (Rückfall: Text aufklappen und markieren), dahinter »Auftrag an die KI ansehen« und »Mehr zur Idee« (Auf Papier, Faustregel, Kniff dazu, Phase, Papier oder Gerät). Oben im offenen Anlass die Angaben für alle Aufträge (Fach, Thema, Lerngruppe). |
| Vertiefung | »So prüfst du das Ergebnis – und was nicht hineingehört«: die drei Prüffragen, die schon in jedem Auftrag stehen, und der Datenschutz. |
| Adresse | `#anlass=<id>` merkt den offenen Anlass; »Zurück« im Browser und Teilen funktionieren. `#pk-<id>` öffnet den Anlass eines Eintrags und zeigt ihn. |
| Ohne JavaScript | Die Karten sind Sprungmarken; alle 21 Aufträge stehen unter vier Überschriften, die Aufträge an die KI zum Markieren (leere Fassung: die KI fragt zuerst nach Fach, Thema und Lerngruppe). Gebaut von `tools/papierkoffer.py` aus `PAPIERKOFFER.html()` – dieselbe Funktion wie im Browser, beim Bauen mit Node. |
| Daten | `KOFFER.papierAnlaesse` in `assets/daten/koffer-ideen.js`: Name, Satz, Bildzeichen, Einträge. Die 18 Aufgabenformen, die drei Kniffe für jede Phase und alle Aufträge sind unverändert. |
| Dopplungen | Ein Kniff, der im selben Anlass schon steht, kommt in »Mehr zur Idee« nur mit Namen und Verweis: »Hilfe- und Expertenkarten« bei »Gestufte Zugänge und Hilfen«, »Merkmal – Beleg – Erklärung« bei »Zuordnen und Sortieren«, »Sortieren mit Zwischenstand« bei »Eine Reihe legen«. Die Aufträge an die KI behalten alle Kniffe. |
| Wortwahl | Auf der ersten Ebene heißt es »Auftrag an die KI«, nicht »Prompt«. An jeder Eingabe steht »Keine Namen, Noten oder anderen personenbezogenen Daten eingeben.« (sichtbar und mit `aria-describedby`). |

## Zuordnung der Einträge

| Anlass | Satz auf der Karte | Einträge |
| --- | --- | --- |
| Erschließen und ordnen | Lesekarten, Texte mit Rand, Bildfolgen und Kartensätze zum Legen. | Lesen in drei Schritten · Markieren mit Grund · Einen Film selbst steuern · Zuordnen und Sortieren · Eine Reihe legen · Struktur legen (6) |
| Vermuten und urteilen | Strichlisten, verdeckte Zettel, Fälle mit Skala und Aufgaben für ein begründetes Urteil. | Vorhersagen, versuchen, vergleichen · Stimmen der Klasse sammeln · Regler und Modell · Erst entscheiden, dann auflösen · Einen Fall einordnen · Ein Urteil schreiben (6) |
| Üben und festigen | Fragen zum Erinnern, Karteikarten, Lösungsblätter mit Erklärungen und ein Plan zum Erklären. | Erst erinnern · Karteikarten · Auswahlaufgabe mit Rückmeldung · Ein Erklärvideo erstellen (4) |
| Differenzieren und rückmelden | Gestufte Blätter, Hilfekarten, eine Liste »Ich kann …« und ein Ausgangsticket. | Gestufte Zugänge und Hilfen · Hilfe- und Expertenkarten · Übersicht statt Klickstrecke · Sich selbst einschätzen · Fehlvorstellungen dreimal nutzen (5) |

Warum nicht »Material erstellen · Vereinfachen und differenzieren · Rückmelden und bewerten · Planen und organisieren«: Alle 21 Einträge erstellen Material, und für »Planen und organisieren« gibt es im Koffer keinen Eintrag (Stundenstruktur, Elternbrief und Sitzung stehen in der Schnell-Anfrage). Ausführlich in `docs/koffer-zuordnung.md`.

## Neue Grafiken

Vier Bildzeichen, selbst gezeichnet in der Systemsprache (SVG 160 × 90 wie im Aufgabenkoffer; Fläche, Karton, Ocker, Druckschwarz; für Hilfstechnik verborgen), in `PAPIERKOFFER.BILD` (`assets/papierkoffer.js`):

| Anlass | Bildzeichen |
| --- | --- |
| Erschließen und ordnen | Ein Blatt mit zwei Markierungen und Randzeichen, daneben zwei Karten, verbunden über einen Ocker-Punkt (Struktur legen) |
| Vermuten und urteilen | Eine Waage, die Ocker-Schale ist schwerer |
| Üben und festigen | Ein Karteikasten mit drei Karten, eine in Ocker |
| Differenzieren und rückmelden | Eine Liste mit drei Kästchen (eines in Ocker), daneben zwei gefächerte Hilfekarten |

## Prüfungen

Gelaufen (Chromium, `file://`):

- Projektprüfung `tools/pruefen.py`: keine Verstöße – neu `pruefe_papierkoffer` (Teile aktuell, höchstens vier Anlässe, 21 Einträge, Hinweis an jeder Eingabe, kein »Prompt« auf der ersten Ebene) und die alte Bezeichnung der Phase.
- Unit-Tests `node --test`: 194 von 194 (Papier-Koffer: sieben Tests, davon fünf neu für Anlässe, Dopplungen, Fassung ohne Skript, Phasen und Kniffe).
- Browser-Tests `tests/e2e.py`: alle bestanden, darunter 28 neue zum Papier-Koffer – Öffnen und Schließen per Maus, Finger und Tastatur (Enter, Escape, »Schließen«), Fokus, nur ein Anlass offen, Adresse, Zurück, Teilen, `#pk-<id>`, Kopieren mit Zwischenablage und Rückfall, Freitext nicht gespeichert, ohne JavaScript alles sichtbar, Beamer, iPad hoch und quer, Telefon, »weniger Bewegung«, keine Konsolenfehler, nichts aus dem Netz, dieselbe Komponente wie der Aufgabenkoffer.
- Mindestprüfung 5a (`pruef_seiten.py` aus dem Website-Design-Workflow): Papier-Koffer und Aufgabenkoffer, 1440 · 1280 · 768 · 390 · 375 px, mit und ohne »weniger Bewegung« – 0 Probleme.
- Gezielte Barrierefreiheit statt axe-core (1280 und 390 px, zu und offen mit allen Vertiefungen): keine doppelten IDs, alle Bezüge (`aria-controls`, `aria-describedby`, `for`) vorhanden, jedes Bedienelement mit Namen, keine Sprünge in den Überschriften, kleinster Textkontrast 4,89 : 1 (Druckschwarz auf der Honigplatte), keine Zielfläche unter 24 px (kleinste 44 px), keine Schrift unter 16 px.

Gemessen (18.11.2026):

| Größe | Raster | Unterkante der vier Karten | Waagerechtes Scrollen |
| --- | --- | --- | --- |
| Beamer 1280 × 720 | vier in einer Reihe | 667 px – Überschrift, ein Satz und alle vier Karten im ersten Bildschirm | nein |
| iPad quer 1180 × 820 | vier in einer Reihe | 649 px | nein |
| iPad quer 1024 × 768 | vier in einer Reihe (Namen 1,3 rem, damit sie zweizeilig bleiben) | 634 px | nein |
| iPad hoch 768 × 1024 und 820 × 1180 | 2 × 2 | – | nein |
| Telefon 390 × 844 | eine Spalte | – | nein |
| 1920 × 1080 | vier über die ganze Breite | 715 px | nein |

Bei 1280 px sind Karte (285 px), Abstand (18 px), Bild (160 px), Ecken (4 px) und Platte (6 px Karton) im Aufgabenkoffer und im Papier-Koffer gleich. Nach dem Laden läuft keine Animation. Zwei Tipps bis zum Auftrag (Three-Tap Rule).

Kritik nach Bildschirmfotos, drei Runden: (1) Etiketten ohne gemeinsame Unterkante, wuchtige Aufklapper, umbrechende Einleitung im halb leeren Kopf; (2) riesige Bildzeichen im 2 × 2-Raster bei 1024 px, das Formular füllte am Telefon den ersten Bildschirm, »Schließen« hing unter dem Satz; (3) dreizeiliger Name bei 1024 px. Punktwert nach `critique.md`, ehrlich: Gestaltung 33/40, Bedienung 26/30, Eigenständigkeit 12/20 (bewusst nah am Aufgabenkoffer), Inhalt 9/10 – 80/100.

Nicht gelaufen: axe-core (`tests/vendor/axe.min.js` fehlt, Installationen sind in dieser Umgebung gesperrt) · Taste `lint.mjs` und `inspect.mjs`, Impeccable `critique`, `audit`, `polish` (Plugins fehlen; dafür 5a und die gezielte Prüfung oben) · iPad mit Safari, VoiceOver, Moodle.

## Bewusste Ausnahmen

- **Honigplatte:** Der Auftrag nennt #F2B233. Es gilt das Ocker des Logos #B68235 (`--ki-platte`, seit 4.26), mit 2-px-Kante in Honig #7D5A1C.
- **Anlässe:** angepasst an den Bestand (siehe oben).
- **Raster:** Für genau vier Karten gilt `.ist-vier` (4 · 2 · 1 Spalten). Bei 1280 und 1440 px ist das Raster dasselbe wie im Aufgabenkoffer; bei 1024–1279 px stehen vier statt drei Karten in einer Reihe (sonst 3 + 1), bei 1920 px vier breite statt sechs Spalten.
- **Ein Satz je Auftrag:** Es ist das vorhandene Feld »tun«. Bei 14 der 21 Einträge sind das zwei oder drei kurze Sätze; gekürzt wird nur, was sich wiederholt.
- **Bereichsetikett:** Bei bis zu 1440 px steht es auf den Karten zweizeilig.
- **Bauen mit Node:** `tools/bauen.py` braucht für diese Seite Node (wie die Unit-Tests).

## Offen

- Ob Lehrkräfte ohne Technikerfahrung den Weg Karte → Auftrag kopieren → KI-System ohne Hilfe finden: noch offen, nicht erprobt.
- iPad mit Safari, VoiceOver und Moodle: nicht geprüft.
