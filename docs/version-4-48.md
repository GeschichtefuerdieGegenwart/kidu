# Version 4.48 – KI-Training weiterentwickeln: Vier Wochen, Fähigkeiten als Filter, kurze Probe, Werkstatt Bewertungskultur

Stand: 18. November 2026 · Branch `kidu-4-48-ki-training`

Grundlage: Auftrag Mario (17.11.2026) nach dem Recherchebericht »KI-Training für heterogene Kollegien: Formate, Rahmen und Gestaltung für Kidu« (17.11.2026). Umgesetzt sind die Vorschläge 1, 3, 4, 8, 9 (nur im geschützten Bereich), 10 und 11. Rahmen: keine Stufen, Punkte, Prozente oder Abzeichen; Papier und »ohne KI« sind vollwertig; nur vorhandene Werkzeuge; Belege in drei Stufen.

## Neu

| Bereich | Was neu ist |
| --- | --- |
| Vier Wochen KI-Training (`vier-wochen.html`, Phase 1) | Ein fertiger Plan für eine Person oder ein Tandem. Jede Woche eine kurze Übung, eine Freistunde mit eigenem Material und ein Satz »Im Tandem«; zum Schluss eine Stunde erproben und zurückschauen. Die Wochen heißen **Prüfen · Entscheiden · Beschreiben · Erproben** – ohne Nummern, weil die Zeile oben schon »1 · Grundlagen« zählt. Sie folgen der Reihenfolge aus der Recherche: erst prüfen, dann entscheiden, was abgegeben wird, dann beschreiben, dann erproben. Nur vorhandene Werkzeuge: Prüf-Labor, Trainingsaufgabe »Deine Woche sortieren«, Schnell-Anfrage, Prompten lernen, »Eine Idee im Unterricht erproben«, Beobachtungsbogen, Mit dem Kollegium. Freiwilliges Startdatum (dann »ab Montag, 23. November« an jeder Woche) und Haken »Erledigt« (`hilde.vierwochen`); was in den Feldern steht, wird nie gespeichert. Druckansicht auf zwei A4-Seiten. |
| Fähigkeiten als Filter (`ki.html`) | Die fünf Fähigkeiten im Band werden Schalter (`aria-pressed`). Antippen hebt im Fahrplan die Werkzeuge hervor, die sie üben – mit Ocker-Kante **und** dem Text »übt: …« –, öffnet die Phasen mit Treffern und sagt über dem Fahrplan, was hervorgehoben ist, mit »Aufheben«. Noch einmal antippen oder »Aufheben« stellt alles wieder her, auch welche Phasen offen waren. Ohne Skript bleibt der Fahrplan wie in 4.47. Nichts wird gespeichert. |
| Zeit an jedem Werkzeug | Im Fahrplan KI-Training steht an jedem Werkzeug »kurz«, »eine Freistunde« oder »mehrere Termine« – als Schätzung gekennzeichnet –, dazu wie bisher »geht ohne KI« und »auch auf Papier«, wo das stimmt. Felder `zeit` und `faehigkeiten` in `src/fahrplan-ki.json`; die Namen der Zeiten sind dieselben wie in den Trainingsaufgaben. |
| Kurze Probe im Fortbildungsbogen | Am Ende von Schritt 3 »Deine Arbeitsweise«, **freiwillig und überspringbar**, etwa fünf Minuten: ein ausgedachter Elternbrief (»Ausgedachter Fall. Von Hand geschrieben, keine KI-Antwort.«) mit zwei Fehlern (Zahl ohne Herkunft, erfundene Studie) und einer Datenschutzfalle (Name und Förderbedarf eines erfundenen Kindes) zwischen vier Sätzen, die stimmen. Erst markieren, dann »Auflösen«; vorher zeigt die Seite weder Zahl noch Art der Stellen. Danach sind die Kästchen gesperrt, unter jedem Satz steht in Worten, was mit ihm ist, und links die Rückmeldung **»Darauf achtest du schon · Das lohnt sich anzusehen«** mit dem Weg ins Prüf-Labor. Gespeichert werden nur die IDs der markierten Sätze. |
| Zwei Fragen nach dem Verhalten | In Schritt 1: »Denk an das letzte KI-Ergebnis, das du für die Schule genutzt hast. Was hast du vorher damit gemacht?« und dasselbe für den letzten eingegebenen Text. Was jemand zuletzt getan hat, zählt in den Regeln vor der Selbsteinschätzung (`REGELN.startpunkt`, Tests). |
| Landkarte auf dem Bogen | »Wofür du KI schon nutzt – und wofür noch nicht«: zehn Felder aus der Antwort auf »Wofür hast du KI schon genutzt?« in drei Gebieten (Für dich und die Schule · Vor der Stunde · In der Stunde), »schon« und »noch nicht« als Wort und Zeichen. Darunter: »›Noch nicht‹ ist kein Mangel.« Auf dem Bogen und in der PDF stehen auch die zwei Antworten zum Verhalten und die Probe in einer Zeile je Teil; im Code für die Leitung `v_pruefen`, `v_daten` und `probe=schon:…;ansehen:…`. |
| Werkstatt Bewertungskultur (`bewertung.html`, Phase 4 »Im Kollegium«) | Eine eigene Aufgabe von der KI »lösen« lassen und umbauen: vier Schritte (Zuerst · Dann · Danach · Zum Schluss – ohne Ziffern neben »4 · Nach der Stunde«) und vier Umbauten (Arbeitsweg zeigen · Kurz mündlich erklären · KI-Hilfe offenlegen · Absprache treffen). Getrennt daneben **»Was verbindlich bleibt«**: Prüfungsordnung, Vorgaben des Landes und die Regeln der Schule; die Bewertung bleibt bei der Lehrkraft; Prüfungsaufgaben nur nach Absprache mit der Schulleitung; »eine Einschätzung, keine Rechtsberatung, Stand: November 2026«. Zwei Aufträge zum Kopieren (»Die KI die Aufgabe lösen lassen«, »Die Aufgabe umbauen« – »Bewerte nichts und vergib keine Noten«), gebaut mit `WERKSTATT_ANFRAGE` aus fünf Teilen. Nichts wird gespeichert. |
| Ablauf-Koffer (`ablaeufe.html`, nur hinter dem Passwort) | Für die Fortbildungsleitung: Abläufe für 45 Minuten, 90 Minuten und einen pädagogischen Tag, jeder mit Folgetermin nach vier bis sechs Wochen, mit Belegen in drei Stufen. Klartext nur in `privat/ablaeufe.html` (nicht im Repository), im Repository nur `schloss/ablaeufe.enc.json`. Die Übersicht »Für die Fortbildungsleitung« führt dorthin. Inhalte stehen hier bewusst nicht. |
| Anschluss ans Land | `ki.html` nennt am Ende »Weiterlernen beim Land Baden-Württemberg«: den Selbstlernkurs »KI in der Schule« des ZSL und das KI-Zentrum Schule in Heilbronn – ohne Link, mit Stand November 2026. Der Plan »Vier Wochen« nennt den Selbstlernkurs unter »Und danach?«. |
| Startseite und Rundgang | Die Kachel »KI-Training« nennt jetzt die vier Phasen wie die Kachel des Digitalen Unterrichts: »In vier Phasen: Grundlagen, vorbereiten, unterrichten, nach der Stunde.« Kapitel 2 des Rundgangs sagt »KI-Training: in vier Phasen sicher mit KI arbeiten.« Die Bilder `assets/film/rg-start.webp` und `rg-ki.webp` sind neu aufgenommen (18.11.2026); die Kacheln stehen an derselben Stelle wie vorher, die Tipps im Film sitzen weiter. |

## Zeit und Fähigkeiten je Werkzeug (Vorschlag zur Prüfung)

Die Zuordnung ist ein didaktischer Vorschlag aus dem Bau, kein Beleg. Bitte prüfen (`src/fahrplan-ki.json`).

| Phase | Werkzeug | Zeit | Fähigkeiten | Hinweis |
| --- | --- | --- | --- | --- |
| Grundlagen | Deine ersten zehn Minuten | kurz | Gut beschreiben, Kritisch prüfen, Verantwortlich handeln | – |
| Grundlagen | Vier Wochen KI-Training | mehrere Termine | Abgeben oder selbst machen, Gut beschreiben, Kritisch prüfen, Verantwortlich handeln | – |
| Grundlagen | Prüf-Labor | kurz | Abgeben oder selbst machen, Kritisch prüfen, Verantwortlich handeln | geht ohne KI · auch auf Papier |
| Grundlagen | Sicher arbeiten in fünf Regeln | kurz | Verantwortlich handeln | geht ohne KI |
| Grundlagen | KI für dein Fach einrichten | eine Freistunde | Gut beschreiben | – |
| Grundlagen | Trainingsaufgaben | kurz oder eine Freistunde | Abgeben oder selbst machen, Gut beschreiben, Kritisch prüfen, Verantwortlich handeln | – |
| Vorbereiten | Schnell-Anfrage | kurz | Gut beschreiben | – |
| Vorbereiten | Prompten lernen | eine Freistunde | Gut beschreiben, Kritisch prüfen | – |
| Vorbereiten | Aufträge zum Kopieren | kurz | Gut beschreiben, Lernende begleiten | – |
| Vorbereiten | Aufgabenkoffer auf Papier | kurz | Gut beschreiben | – |
| Vorbereiten | Skillkoffer | eine Freistunde | Gut beschreiben | – |
| Unterrichten | Wenn deine Lernenden mit KI arbeiten | kurz | Lernende begleiten | geht ohne KI |
| Unterrichten | Lernszenario und Dialogpartner vorher testen | eine Freistunde | Lernende begleiten | – |
| Nach der Stunde | Mein Fortbildungsbogen | kurz | Kritisch prüfen | – |
| Nach der Stunde | Eine Idee im Unterricht erproben | mehrere Termine | Lernende begleiten | – |
| Nach der Stunde | Mit dem Kollegium | mehrere Termine | Kritisch prüfen, Verantwortlich handeln, Lernende begleiten | geht ohne KI |
| Nach der Stunde | Werkstatt Bewertungskultur | eine Freistunde | Verantwortlich handeln, Lernende begleiten | – |

## Belege (drei Stufen)

- **belegt** – Fortbildungen wirken eher, wenn sie Input, Erproben im eigenen Unterricht und Rückblick verbinden, über mehrere Termine laufen und Kolleg*innen zusammenarbeiten (Lipowsky und Rzejak; Darling-Hammond und andere 2017; Übersicht über 104 Studien von Sims und anderen 2021). Darauf beruhen der Vier-Wochen-Plan und der Folgetermin im Ablauf-Koffer.
- **belegt** – Coaching verbessert den Unterricht deutlich; kleinere Programme wirkten stärker als große (Kraft, Blazar und Hogan 2018).
- **belegt** – In einer großen Studie an Schulen gelangen Übungen mit freier KI-Hilfe besser, die Prüfung ohne KI aber schlechter (Bastani und andere 2025, wie auf `lernende-ki.html`). Grundlage der Werkstatt Bewertungskultur.
- **plausibel** – Erst prüfen, dann erzeugen: Beim Arbeiten mit KI überschätzen sich viele (Laborstudie der Aalto-Universität 2025, nicht mit Lehrkräften). Deshalb beginnen der Plan und die Abläufe mit dem Prüfen, und die Probe ergänzt die Selbsteinschätzung.
- **plausibel** – Arbeitsweg statt nur Ergebnis bewerten, kein allgemeines Verbot von KI bei Hausaufgaben, Bewertung bleibt bei der Lehrkraft (Handlungsempfehlung der Kultusministerkonferenz 2024).
- **offen** – Ob der Plan, die Probe, die Werkstatt und die Abläufe so wirken, ist offen. Alles ist ein Vorschlag und noch nicht erprobt; die Seiten sagen das.

## Anschluss ans Land (Vorschlag 10)

- **Selbstlernkurs »KI in der Schule« des ZSL:** geprüft am 18.11.2026 – kostenfrei, interaktiv, mit Material für den Unterricht, veröffentlicht im Dezember 2025 (Meldung der Universität Tübingen vom 11.12.2025). Genannt **ohne Link**: Kidu verlinkt nicht nach außen (`tools/pruefen.py`); die Seiten sagen »Beides findest du auf den Seiten des ZSL«.
- **KI-Zentrum Schule:** geprüft am 18.11.2026 – in Heilbronn, getragen vom ZSL mit der Dieter Schwarz Stiftung, gegründet im Herbst 2024, bietet Fortbildungen für Lehrkräfte an (Pressemitteilung des Landes). Genannt ohne Link.
- **KMK-Reflexionskarten: noch offen.** Gefunden ist nur eine Meldung aus zweiter Hand, dass Karten vorgesehen sind; die Originalquelle der Kultusministerkonferenz war nicht erreichbar. Deshalb nicht genannt und nicht verlinkt.

## Geändert

- `tools/fahrplan.py`: Zeit und Hinweise in einer Zeile (`hinweise`), Fähigkeiten als Daten an den Werkzeugen der Bereichsseite (`data-faehigkeiten`); die Türen der Phase 2 tragen beides. Der Digitale Unterricht baut sich unverändert.
- `tools/pruefen.py`: Zeiten und Fähigkeiten im Fahrplan KI-Training (jede Zeit bekannt und gleich benannt wie in `training.js`, jede Fähigkeit bekannt, jede mit mindestens einem Werkzeug); Startkacheln und Kapitel 2 des Rundgangs nennen die Zahl der Phasen aus den Daten; neue Seiten und Skripte.
- `assets/regeln.js`: `REGELN.probe` (neu) und drei kleine Regeln in `startpunkt` (Verhalten vor Selbsteinschätzung; wer Texte ungeändert eingibt, bekommt »Sicher arbeiten«; wer ungeprüft übernimmt, zuerst die drei Fragen vor dem Kopieren). Alte Antworten ändern nichts.
- `assets/fortbildungsbogen.js`: zwei Fragen, Typ `probe`, »Auflösen« auf demselben Knopf wie »Weiter«, Landkarte und Probe auf dem Bogen. Die Eröffnung sagt »dazu eine freiwillige Probe«.
- `assets/hilde.css`: Abschnitt ab 4.48 (Filter, `vw-`, `bw-`, `mfb-probe-`, `mfb-landkarte`, `ki-land`), alles über die vorhandenen Variablen.
- Tests: `tests/regeln.test.js` (Probe und Verhalten, 6 neue), `tests/schloss.test.js` (Ablauf-Koffer nur verschlüsselt, auch die gebaute Seite ohne Klartext), `tests/training.test.js` (Band mit IDs), `tests/e2e.py` (Filter mit Maus und Tastatur, Zeiten, Vier Wochen, Werkstatt, Probe, Landkarte, Ablauf-Koffer hinter dem Schloss, neue Zählungen).
- Über Kidu (Inhalte und »Was ist neu?«), README, DESIGN.md, CLAUDE.md (neue Namen).

## Gemessen (Chromium, 18.11.2026)

- Prüfbefehl: `tools/pruefen.py` ohne Verstoß · Unit-Tests 193 von 193 · Browser-Tests mit `KIDU_PASS`: alle bestanden (Zahl siehe Pull Request).
- Beamer 1280 × 720, Unterkante der ersten Handlung: Vier Wochen (Datum) 548 px · Werkstatt »Zu den vier Schritten« 449 px · Fortbildungsbogen »Los geht’s« 699 px (wie vorher) · KI-Training Name der Phase 4 676 px (wie vorher).
- iPad quer 1180 × 820: 544 · 445 · 769 · 729 px (alle im ersten Bildschirm). Der Blick der Vier Wochen steht dort zwei mal zwei, weil die Namen in einer Reihe nicht passen (gemessen bei 1180 und 1024 px).
- Kein waagerechtes Scrollen bei 1440, 1280, 1180, 1024, 820 und 390 px auf den neuen Seiten. Kleinste Zielfläche 44 px (Haken »Erledigt«); die Schalter der Fähigkeiten mindestens 83 px.
- Laufende Animationen nach dem Laden: 0. Der Filter springt bei »weniger Bewegung« ohne Gleiten.
- Druck A4: Vier Wochen 2 Seiten (Kopf und Wochen 1–2, dann 3–4 und »Und danach?«, Kennzeichnung unten) · Werkstatt 3 Seiten (ohne die Aufträge zum Kopieren) · Fortbildungsbogen mit allen Antworten und Probe 2 Seiten (vorher mit allen Antworten ebenfalls 2).

## Nicht gelaufen

- Impeccable `audit`/`polish` und Taste `lint`/`inspect` (Plugins in dieser Umgebung nicht installiert); axe-core (`tests/vendor/axe.min.js` fehlt).
- Echtes iPad mit Safari, VoiceOver, Beamer im Raum. Das Datumsfeld zeigt in Chromium das Format des Systems; auf einem deutschen Gerät »TT.MM.JJJJ«.

## Bewusst nicht umgesetzt / offen

- KMK-Reflexionskarten (siehe oben).
- Die Wochen heißen anders als im Plan vom 17.11. (»Anpassen« ist »Entscheiden« geworden), damit sie der Reihenfolge der Recherche folgen.
- Die Zeile oben auf Seiten der Phase 4 sagt »4 · Nach der Stunde (nach der Stunde)«, weil Name und Zeitpunkt dieser Phase gleich lauten (beide Fahrpläne, seit 4.42). Nicht geändert, um diesen Pull Request schmal zu halten.
- Die Probe verändert keine Empfehlungen; sie steht als Rückmeldung und im Code für die Leitung.

## Nur du kannst das

- Den Übungstext der Probe und die Rückmeldungen lesen (`assets/daten/probe.js`) – passt der Elternbrief zu deinen Kolleg*innen?
- Die Zeiten und Fähigkeiten je Werkzeug prüfen (Tabelle oben).
- »Was verbindlich bleibt« in der Werkstatt mit den Regeln deiner Schule abgleichen.
- Den Ablauf-Koffer hinter dem Passwort lesen; das Bündel liegt in `privat/kidu-geschuetzt-buendel.md` und im Projekt (ohne Passwort).
- Den Plan »Vier Wochen« einmal mit einer Kollegin oder einem Kollegen ausprobieren.

## Fallstricke (Vorschläge für die Skills)

- `website-design-workflow`: Ein Filter, der Teile einer Übersicht aufklappt, merkt sich vorher, was offen war, und stellt es beim Aufheben wieder her; der Zustand steht in `aria-pressed` und als Wort an jedem Treffer (Kidu 4.48).
- `website-design-workflow`: Ein längerer Bildtext im »Auf einen Blick« neben dem Text schiebt die erste Handlung unter 720 px (Kidu 4.48: Fortbildungsbogen 724 px, nach dem Kürzen wieder 699 px) → nach jeder Textänderung im Kopf die Beamer-Messung laufen lassen.
- `website-design-workflow`: Namen in schmalen Kacheln bei 1180 und 1024 px messen (iPad quer, kleine Laptops), nicht nur bei 1280 und 390 – dort liefen »Entscheiden« und »Beschreiben« über den Rand (Kidu 4.48).
- `film-regie`: Zahlen im Standbild (»5 Werkzeuge«) veralten, wenn die Daten wachsen. Nach jeder Datenänderung die Bilder der betroffenen Seiten neu aufnehmen und mit dem alten Bild vergleichen; das Prüfskript zählt die Zahl der Phasen im Film nach (Kidu 4.48: `rg-ki.webp`).
- `ki-faktencheck` / Übungstexte: Vor dem Korrigieren einer Angabe auf einer Zielseite in den Daten suchen – Inhalte, die ein Skript erzeugt, findet die Suche in der HTML-Datei nicht (Kidu 4.48: die vier Prüfschritte des Prüf-Labors stehen in `assets/daten/pruef-labor.js`).
- `lernseite-bauen`: Probe mit Rückmeldung in Worten – erst festlegen, dann auflösen, vorher weder Zahl noch Art der Stellen nennen, danach sperren; nur IDs speichern; ohne Markierung trotzdem einen Satz unter »schon« (Stärken zuerst) (Kidu 4.48).
