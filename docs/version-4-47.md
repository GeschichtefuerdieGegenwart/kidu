# Version 4.47 – Das KI-Training als Fahrplan, Prüf-Labor, Mit dem Kollegium

Stand: 17. November 2026 · Branch `kidu-4-47-ki-fahrplan`

Grundlage: Auftrag Mario (17.11.2026): das KI-Training so übersichtlich und anschaulich wie den Digitalen Unterricht, die Phasen behalten, nicht mehr mit der Schnell-Anfrage beginnen, die Grundstruktur auf den ersten Blick zeigen; dazu Wege, die KI-Kompetenz von Lehrkräften mit sehr verschiedenen Vorkenntnissen weiterzuentwickeln. Nach der Orientierung und der Recherche vom selben Tag: »Setz diese Erkenntnisse in einem neuen PR zusammen und lade ihn gleich hoch. Freigabe dafür erteilt.«

## Neu

| Bereich | Was neu ist |
| --- | --- |
| KI-Training (`ki.html`) | Dieselbe Form wie der Digitale Unterricht: Leitband, **Fahrplan mit vier Phasen** zum Aufklappen, Ringlinie von 4 zurück zu 2 – in Ocker. Jede Phase beginnt mit einem **Anliegen**: »Ich will erst verstehen.« · »Ich brauche etwas für morgen.« · »Meine Lernenden arbeiten mit KI.« · »Ich will auswerten und teilen.« Darunter die fünf Fähigkeiten, die du überall übst – ohne Stufen, ohne Links. Am Beamer (1280 × 720) stehen alle vier Phasen im ersten Bildschirm. |
| Fahrplan KI-Training | Eine Quelle: `src/fahrplan-ki.json`. `tools/fahrplan.py` baut daraus die Listen auf `ki.html` und auf jeder Werkzeugseite die Zeile oben und den Fahrplan unten (Zeichen `<!-- kiplan:… -->`). 15 Werkzeuge: Grundlagen 5 · Unterricht mit KI vorbereiten 5 (zwei Türen: Schnell-Anfrage oder Prompten lernen) · Unterrichten 2 · Nach der Stunde 3 (Für dich · Im Kollegium). Skillkoffer und Mein Fortbildungsbogen stehen in beiden Fahrplänen; ihr Zuhause bleibt der Digitale Unterricht (`zuhause`). |
| Eigene Seiten | Deine ersten zehn Minuten (`erste-minuten.html`), Schnell-Anfrage (`schnell-anfrage.html`), Prompten lernen mit dem Prompt-Generator (`prompten.html`). Alte Sprungmarken (`ki.html#schnell`, `#t-erste`, `#lernen-weg`, `#t-generator` …) leiten dorthin; `#t-werkstatt` bleibt beim Fahrplan. |
| Prüf-Labor (`pruef-labor.html`) | Drei Übungen **ohne KI-System und ohne Kontingent**, auch auf Papier: (1) Fehler finden in einem Übungstext – von Hand geschrieben, nicht von einer KI, mit fünf absichtlichen Fehlern (Zahl ohne Herkunft, falsches Zitat, erfundene Quelle, zu einfach, scheinbare Einigkeit) und drei richtigen Sätzen; (2) Abgeben oder selbst machen – acht Aufgaben aus dem Schulalltag; (3) Was darf hinein? – acht Angaben als Ampel mit datensparsamer Fassung. Erst festlegen, dann auflösen; die Rückmeldung steht in Worten, ohne Punkte und ohne Zählung. Gespeichert werden nur die Wahlen. Im Druck die Auflösung auf einer eigenen Seite. |
| Mit dem Kollegium (`kollegium.html`) | Sechs Formate: KI-Tandem · KI-Sprechstunde · Kollegiale Fallberatung · Die Fachgruppe als Lerngemeinschaft · Eine Stunde gemeinsam planen und beobachten · Kurz-Coaching. Jedes mit Rahmen, vier Schritten und »Was dazu bekannt ist« – ehrlich auch dort, wo die Lage gemischt ist (Lesson Study) oder nichts untersucht ist. |
| Trainingsaufgaben | Jede Aufgabe zeigt ihren groben Zeitbedarf: »kurz« oder »eine Freistunde« – ausdrücklich geschätzt, keine Minutenangaben (Feld `zeit`, nicht »Umfang«: der ist in `taxonomien.js` belegt). Aufgaben ohne KI-System heißen »geht ohne KI«. |
| Rundgang | Kapitel 6 zeigt die neue Seite: »Auch das KI-Training hat vier Phasen.« · »Jede beginnt mit einem Anliegen.« · »Eilig? Steig bei Phase 2 ein.« Das Bild `assets/film/rg-ki.webp` ist neu aufgenommen, die Kamera neu geführt (ff-q13, ff-q14). |

## Woher die Entscheidungen kommen (Recherche vom 17.11.2026)

- **Anliegen statt Stufen:** Selbsteinschätzungen beim Arbeiten mit KI liegen oft daneben – gerade bei Erfahrenen (Aalto-Universität 2025). Kidu fragt deshalb nicht »Wie gut bist du?«, sondern »Was brauchst du gerade?«. Eine Rangfolge von »Anfänger« bis »Profi« gibt es nicht (CLAUDE.md: keine Entwicklungsstufen).
- **Am eigenen Unterricht, über mehrere Termine, mit Kolleg*innen:** Merkmale wirksamer Fortbildung nach Lipowsky und Rzejak, Darling-Hammond und anderen (2017) und Sims und anderen (2021). Darauf beruhen die Formate »Mit dem Kollegium«.
- **Coaching:** Übersicht über 60 Studien (Kraft, Blazar und Hogan 2018): deutliche Wirkung auf den Unterricht, kleinere auf die Leistungen; kleinere Programme wirkten stärker.
- **Lesson Study:** Die große Studie der Education Endowment Foundation in England (2017) fand keine Wirkung auf die Leistungen; die Forschenden betonen, dass das nicht jede Form unwirksam macht. So steht es auf der Seite.
- **Planung mit KI:** Studie der Education Endowment Foundation (2024) mit 259 Lehrkräften: rund 31 Prozent weniger Planungszeit, keine schlechteren Pläne – nur für die Planung, nicht für Bewertung und Gespräche.
- **Kolleg*innen beeinflussen die Nutzung:** Befragung der Pädagogischen Hochschule Niederösterreich (2025).
- **Rahmen:** Handlungsempfehlung der Kultusministerkonferenz zum Umgang mit KI (2024): Bewertung und Entscheidungen über Personen bleiben bei der Lehrkraft.

## Geändert

- `tools/fahrplan.py`: zwei Fahrpläne (`PLAENE`), `alle_laden()`, Zeichen `fahrplan:` und `kiplan:`, `zuhause`, `marken`. Die Seiten des Digitalen Unterrichts bauen sich unverändert.
- `assets/fahrplan.js`: alte Sprungmarken stehen an der Liste selbst (`data-alte-marken`), so läuft das Skript auf beiden Bereichsseiten.
- `assets/hilde.css`: Farben des Fahrplans über `--fp-*` (Ocker im KI-Bereich); gestrichen: `.ki-phasen`, `.ki-eingang`, `.ki-extra`, `.bezug-band`.
- KI-Werkzeugseiten (Sicher arbeiten, KI für dein Fach, Trainingsaufgaben, Aufgabenkoffer auf Papier, Aufträge, Lernende und KI): Zeile oben und Fahrplan unten; der Marker »Bereich: KI-Training« steht jetzt in der Zeile.
- Links in `assets/regeln.js` und `assets/daten/training.js` zeigen direkt auf die neuen Seiten.
- `tools/pruefen.py`: beide Fahrpläne (Namen und Anliegen wie in den Daten, `zuhause` steht im anderen Fahrplan, keine Seite in zwei Fahrplänen); neue Seiten und Skripte.
- Tests: neu `tests/pruef-labor.test.js`; `tests/training.test.js` (Zeitbedarf, Band der Fähigkeiten); `tests/regeln.test.js` (neue Links); `tests/e2e.py` auf die neue Ordnung umgestellt, 41 Prüfungen mehr.
- Über Kidu (Inhalte und »Was ist neu?«), README, DESIGN.md, PRODUCT.md, CLAUDE.md (neue Namen).

## Gemessen (Chromium, 17.11.2026)

- Prüfbefehl: `tools/pruefen.py` ohne Verstoß · Unit-Tests 188 von 188 · Browser-Tests mit `KIDU_PASS`: 783 bestanden.
- Beamer 1280 × 720, Unterkante: KI-Training – Phase 1 zum Antippen 408 px, Name der Phase 4 676 px · Prüf-Labor erster Satz 599 px · Schnell-Anfrage erster Anlass 587 px · Prompten lernen »Mit Schritt 1 anfangen« 431 px · Deine ersten zehn Minuten »Zur Schnell-Anfrage« 676 px · Mit dem Kollegium erster Eintrag 253 px.
- Spalten: Fähigkeiten 5 (1920, 1440, 1280) · 3 (1180, 820) · 1 (390); Formate 4 / 3 / 3 / 2 / 1 / 1. Kein waagerechtes Scrollen in diesen Breiten.
- Laufende Animationen nach dem Laden: 0 auf allen neuen Seiten. Kleinste Zielfläche 44 px (außer Links mitten im Satz und Eingaben in einem größeren Label).
- Fahrplan: Kreise und Linien im KI-Training `rgb(125, 90, 28)` (Ocker), im Digitalen Unterricht weiter `rgb(47, 93, 98)` (Petrol).
- Prüf-Labor als PDF (A4): Übungen mit Kästchen und Wahlen, die Auflösung auf eigener Seite.

## Nicht gelaufen

- Impeccable `audit`/`polish` und Taste `lint`/`inspect` (Plugins in dieser Umgebung nicht installiert); axe-core (`tests/vendor/axe.min.js` fehlt).
- Echtes iPad mit Safari, VoiceOver, Beamer im Raum.

## Bewusst nicht umgesetzt / offen

- Die Startkachel »KI-Training« nennt die vier Phasen noch nicht (wie die Kachel des Digitalen Unterrichts). Dafür müssten das Bild der Startseite im Rundgang und Kapitel 2 neu aufgenommen werden.
- Aus der Recherche noch offen: kurze Aufgabenprobe im Fortbildungsbogen, Beobachtungsbogen »Wer hat gedacht?«, Bewertungswerkstatt, Koffer für Multiplikator*innen (45 und 90 Minuten), Nachweise ohne Rangfolge, KMK-Reflexionskarten und der KMK-Navigator in AIS.chat (nur aus zweiter Hand belegt).
- Der Prüf-Labor-Text ist eine Übung; seine richtigen Sätze sind geprüft (Gutenberg, Mainz, um 1450, 42-zeilige Bibel, etwa 180 Stück geschätzt).

## Nur du kannst das

- Die Anliegen und die Zuordnung der Werkzeuge zu den Phasen prüfen (`src/fahrplan-ki.json`).
- Die Vorschläge im Prüf-Labor (Abgeben oder selbst machen, Was darf hinein?) mit deiner Schule abgleichen – vor allem die Ampel.
- Das Prüf-Labor einmal mit Kolleg*innen ausprobieren – es ist ein Vorschlag und noch nicht erprobt.

## Fallstricke (Vorschlag für den Skill `website-design-workflow`)

- Ein zweiter Fahrplan auf derselben Technik: Farben der Bauteile über Variablen mit Rückfall führen (`var(--fp-farbe, var(--lernen))`), sonst färbt ein Bereich den anderen um (Kidu 4.47).
- Werden Teile einer Seite zu eigenen Seiten, brauchen die alten Sprungmarken eine Weiterleitung an der Seite selbst – und Daten, die die alten Marken verlinken (`regeln.js`, `training.js`), sollten gleich auf die neuen Adressen zeigen (Kidu 4.47).
- Ein Werkzeug in zwei Übersichten: genau ein Zuhause festlegen (`zuhause`), sonst trägt seine Seite zwei Zeilen »Wo du bist« (Kidu 4.47).
- Übungstexte mit absichtlichen Fehlern: als »von Hand geschrieben, nicht von einer KI« kennzeichnen, Erfundenes in der Auflösung »erfunden« nennen und die richtigen Sätze wirklich prüfen (Kidu 4.47).
- Neue Speicherschlüssel mit dem gemeinsamen Präfix anlegen (`hilde.`), damit »Eingaben löschen« in der Fußzeile sie mitnimmt (Kidu 4.47).
