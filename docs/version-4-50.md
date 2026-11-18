# Version 4.50 – Startseite KI-Training: Wobei hilft dir KI?

Stand: 18. November 2026 · Branch `ki-start` (baut auf `koffer-variante-c`, Pull Request #62, auf) · zur Freigabe

Grundlage: Auftrag Mario (18.11.2026): »Übernimm die Grundlogik zum Start von B, also die grobe Orientierung. Skizziere hierzu ein Phasenmodell der Unterrichtsentwicklung. Auf der ersten Seite soll im KI-Training allen klar werden, wie ihnen KI helfen kann bzw. bei was. […] Beim Reiter Unterricht planen kannst du dann den Aufgabenkoffer einsetzen, und zwar in der Variante C.«

## Was du freigeben musst

1. **Die Reiter sind die vier Phasen des Fahrplans.** Die Namen sind bis 11.05.2027 eingefroren. Darum sind »Hilfe bei der Erstellung des Unterrichts« und »Unterricht planen« hier Phase 2 »Analogen Unterricht mit KI vorbereiten«. Andere Namen für die Reiter wären eine Zeile in `src/fahrplan-ki.json`, brauchen aber deine ausdrückliche Freigabe.
2. **Die 20 Hilfen und ihre Sätze** (Tabelle unten): Wobei hilft KI, was bekommst du, womit fängst du an. Das ist ein Vorschlag von Kidu, kein Wirksamkeitsnachweis.
3. **Der eingebettete Aufgabenkoffer auf Papier** (Variante C) in Phase 2. Erst zusammenführen, wenn PR #62 (Variante C) zusammengeführt ist; danach setze ich diesen Branch neu auf `main` auf.

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Erster Bildschirm | Leitband »Wobei hilft dir KI?«, darunter vier große Karten, eine je Phase: Nummer, wann, Name, Anliegen, ein Satz, wobei KI hilft, und »7 Hilfen · 5 Werkzeuge«. Beamer 1280 × 720: alle vier Karten ohne Scrollen. |
| Bedienung | Antippen öffnet die Phase darunter in voller Breite, eine zur Zeit. Noch einmal antippen, »Schließen« oder Escape schließt sie, der Fokus geht an die Karte. Die Adresse merkt die Phase (`#phase-…`), »Zurück« im Browser funktioniert. |
| Die Phase | Einleitung in einem Satz, dann die Hilfen: Name, Nutzen, »So fängst du an:« mit einem oder zwei Wegen. Führt ein Weg genau zu einem Werkzeug, steht es dort mit Zeit und Hinweisen. Die übrigen Werkzeuge stehen darunter – jedes Werkzeug einmal auf der Seite. |
| Phase 2 | Sieben Hilfen (Ideen finden, Stunde planen, Passende Aufgaben entwickeln, Arbeitsblätter erstellen, Differenzieren, Präsentationen gliedern, Üben und abfragen), dann **der Aufgabenkoffer auf Papier in Variante C** – das Blatt mit sechs Stellen, Angaben und 21 Aufträgen, aus derselben Quelle wie `papierkoffer.html`. Escape schließt zuerst die Stelle, dann die Phase. |
| Sprünge | `schnell-anfrage.html#anlass=…` wählt den Anlass vor, `prompten.html#ziel=…` beginnt mit dem Ziel. So führt jede Hilfe mit einem Tippen an die richtige Stelle. |
| Schulalltag | Unter den Karten ein Satz mit zwei Sprüngen: Elterninformation, Sitzung vorbereiten. |
| Fähigkeiten | Der Filter bleibt. Er zeigt die Phasen mit Treffern (mehrere zugleich) und hebt Hilfen und Werkzeuge hervor. Er zählt Werkzeuge, nicht Einträge (»Mit Plan üben« führt zu zwei). |
| Ohne Skript, Druck | Karten sind Sprünge, alle Phasen und alle Stellen des Koffers stehen untereinander. Zum Drucken ebenso. |
| Daten | `start` in `src/fahrplan-ki.json`: je Phase `karte`, `einleitung`, `hilfen` (Name, Nutzen, Wege). `tools/fahrplan.py`: Zeichen `<!-- kiplan:karte:ID -->` und `<!-- kiplan:hilfen:ID -->`. `tools/papierkoffer.py`: Teile je Seite (`SEITEN`), das Formular ist jetzt ein eigener Teil. |
| Prüfung | `tools/pruefen.py` prüft Karten, Abschnitte, Zahlen, »jedes Werkzeug einmal«, Sprünge (`#anlass=`, `#ziel=`, Sprünge auf der Seite), Nutzen ohne Zahlen und den eingebetteten Koffer auf Aktualität. |

## Das Phasenmodell: Wobei KI hilft

| Phase | Satz der Karte | Hilfen (Weg) |
| --- | --- | --- |
| 1 · Grundlagen · zuerst | Du lernst ausprobieren, prüfen, sicher arbeiten und KI für dein Fach einrichten. | Zum ersten Mal ausprobieren (Deine ersten zehn Minuten) · Ergebnisse prüfen (Prüf-Labor) · Sicher arbeiten (Sicher arbeiten in fünf Regeln) · KI für dein Fach einrichten · Mit Plan üben (Vier Wochen KI-Training oder Trainingsaufgaben) |
| 2 · Analogen Unterricht mit KI vorbereiten · vor der Stunde | KI hilft dir bei Ideen, Stundenablauf, Aufgaben, Arbeitsblättern, Niveaus, Folien und Übungen. | Ideen finden (Prompten lernen: Ideen sammeln oder Schnell-Anfrage: Einstieg mit Vermutung) · Stunde planen (Prompten lernen: Unterricht planen) · Passende Aufgaben entwickeln (Aufgabenkoffer auf Papier, gleich darunter) · Arbeitsblätter erstellen (Prompten lernen: Neu erstellen oder Schnell-Anfrage: Arbeitsblatt vereinfachen) · Differenzieren (Schnell-Anfrage: In drei Niveaus) · Präsentationen gliedern (Prompten lernen: Inhalte strukturieren) · Üben und abfragen (Schnell-Anfrage: Übungsquiz oder Exit-Ticket) |
| 3 · Unterrichten · in der Stunde | KI hilft deinen Lernenden, wenn die Regeln klar sind: erst selbst denken, dann Antworten prüfen. | Festlegen, was die KI darf (Auftrag: KI-Regeln für eine Aufgabe) · Erst selbst, dann KI (Wenn deine Lernenden mit KI arbeiten) · KI-Antworten prüfen lassen (Auftrag: Eine Übung) · Lernszenario vorher testen (Trainingsaufgaben) |
| 4 · Nach der Stunde | KI hilft dir bei Rückmeldungen, beim Ordnen deiner Notizen und beim Umbau von Aufgaben. | Rückmeldung vorbereiten (Schnell-Anfrage: Erwartungshorizont oder Prompten lernen: Bewertungsraster) · Notizen ordnen (Prompten lernen: Inhalte strukturieren) · Aufgaben weiterentwickeln (Werkstatt Bewertungskultur) · Eine Idee erproben (Auftrag) |

Nutzen heißt hier: was du bekommst (ein Entwurf, eine Gliederung, drei Fassungen). Keine Zeitersparnis, keine Wirkung, keine Zahlen – `tools/pruefen.py` meldet Ziffern und Versprechen im Nutzen. Herkunft: Kidu-Konzept; alle Wege führen zu Werkzeugen, die es schon gibt.

## Prüfungen

Gelaufen:
- `python3 tools/bauen.py && python3 tools/pruefen.py` – keine Verstöße
- `node --test` – 194 von 194
- `python3 tests/e2e.py` – Ergebnis im Pull Request; neu für 4.50 sind 22 Prüfungen (Karten, Öffnen und Schließen mit Maus und Tastatur, Adresse und Zurück, Escape erst für die Stelle, Sprünge, Hinweis an jeder Eingabe, ohne Skript, Druck, Telefon), angepasst 15 aus 4.47 und 4.48
- Mindestprüfung 5a (`pruef_seiten.py`) für `ki.html`, `papierkoffer.html`, `schnell-anfrage.html`, `prompten.html` – 0 Probleme

Gemessen (Playwright, Chromium):

| Breite × Höhe | Karten | Unterkante der Karten | Namen |
| --- | --- | --- | --- |
| 1440 × 900 | 4 in einer Reihe | 663 px | höchstens 2 Zeilen |
| 1280 × 720 (Beamer) | 4 in einer Reihe | 666 px | höchstens 2 Zeilen |
| 1180 × 820 (iPad quer) | 4 in einer Reihe | 660 px | höchstens 2 Zeilen |
| 1024 × 768 | 4 in einer Reihe | 646 px | höchstens 2 Zeilen |
| 820 × 1180 (iPad hochkant) | 2 × 2 | 945 px | höchstens 2 Zeilen |
| 390 × 844 (Telefon) | untereinander | – | höchstens 2 Zeilen |

Kein waagerechtes Scrollen in allen Breiten. Nach dem Laden läuft keine Animation. Am Telefon holt das Antippen die geöffnete Phase ins Bild. Druck: 10 Seiten mit allen Phasen.

Eigene Kritik nach den Bildschirmfotos (Design 40 / Bedienung 30 / Eigenständigkeit 20 / Inhalt 10): **84 von 100**. Stärken: Der erste Bildschirm sagt, wobei KI hilft; die Hilfen führen mit einem Tippen an die richtige Stelle; Koffer C sitzt ohne Bruch in Phase 2. Schwächen: Phase 2 ist lang (Hilfen, Blatt, Aufträge, Werkzeuge); am Telefon steht die geöffnete Phase unter allen vier Karten; bei sieben Hilfen steht die letzte allein in ihrer Reihe.

Nicht gelaufen: axe-core (`tests/vendor/axe.min.js` fehlt; Paketinstallation ist in dieser Umgebung gesperrt – in den Netzwerkeinstellungen freigeben), Impeccable und Taste Skill (Plugins fehlen), echtes iPad mit Safari, VoiceOver.

## Bewusst nicht übernommen / offen

- **Reiter-Namen** wie »Unterricht planen« oder »Hilfe bei der Erstellung des Unterrichts«: nicht ohne deine Freigabe (Namenssperre).
- **Ideenkarten des digitalen Aufgabenkoffers** nutzen noch ihr eigenes Raster (`.ak-karte`). In Variante B waren sie schon die gemeinsame Koffer-Komponente; das könnte nachziehen.
- **Am Telefon** könnte die Phase direkt unter ihrer Karte aufgehen statt unter allen vier – noch offen.
- **Präsentationen**: Kidu verspricht eine Gliederung, keine fertigen Folien. Ob ein KI-System an deiner Schule Folien als Datei liefert, ist von System zu System verschieden – noch offen.

## Nur du kannst das

- Auf dem iPad hoch und quer und am Beamer durchtippen: Karte → Phase 2 → Stelle des Blatts → Auftrag kopieren.
- Mit VoiceOver: Karten (»ausgeklappt«), Überschrift der Phase, Stellen des Blatts.
