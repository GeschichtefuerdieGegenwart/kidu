# Version 4.46 – Digitalen Unterricht erstellen in fünf Schritten, Skillkoffer, KI-Training in vier Phasen

Stand: 17. November 2026 · Branch `kidu-4-46-fahrplan-skillkoffer`

Grundlage: Auftrag Mario (17.11.2026), als Prompt geformt und umgesetzt. Rückfragen im Chat: Die Bau-Skills bleiben privat (der Skillkoffer zeigt nur, was mit ihnen entsteht). Der neue Name ist »Skillkoffer«. Die Sprachmodelle in AIS.chat werden nicht mit Namen genannt.

## Neu

| Bereich | Was neu ist |
| --- | --- |
| Phase 2 »Digitalen Unterricht erstellen« | Eine Kette in vier Schritten: **Zuerst** die Papierfrage · **Dann** Unterricht neu planen oder Bisherigen Unterricht digitalisieren (die zwei Türen wie bisher) · **Dazu** Aufgabenkoffer und Skillkoffer (für Fortgeschrittene) · **Zum Schluss** der Digital-Check. Quelle: Feld `schritt` in `src/fahrplan.json`, gebaut von `tools/fahrplan.py`. |
| Papierfrage | Eigene Seite `papierfrage.html`. Nach »Ja« fragt sie zuerst nach dem Prinzip, das das Gerät hier einlöst (sechs Prinzipien oder »Kein Prinzip passt«), und gibt dafür einen Satz für die Planung; die Einstufung ändert das nie. Bei »Mehrwert möglich« bis zu drei Hinweise »So trägt es«. Neu rechts: **Die ganze Stunde prüfen – mit KI**, ein Auftrag aus `assets/papierfrage-prompt.js` mit den neun Regeln der neuen Liste »Papierfrage« im Skill `unterricht-digitalisieren` (v4.6): Hybrid ist der Normalfall · erst festlegen, dann aufdecken · eine Kernentscheidung · zurück in den Raum, ein Gerät vorne · Ruhe · Schreiben, Kriterien danach · Ergebnisse überleben die Stunde · für alle · kein Rang. Die alte Adresse `unterricht.html#t-probe` führt dorthin. |
| Aufgabenkoffer | »Ideen und Kniffe« gehen im Koffer auf, ohne seine Form zu ändern: Jede Idee nennt ihren Kniff (»Der Kniff dazu«), auf der Karte steht »+ Kniff: …«. Die Stundenlinie hat ein fünftes Feld »In jeder Phase« (gestrichelt) mit drei Kniffen. Jeder Kniff hat ein eigenes Fenster (`#kn-<id>`): warum es trägt, am Gerät mit Unterrichtsbeispielen, auf Papier, passende Ideen, Herkunft, KI-Auftrag, Lernende mit KI. Unten stehen alle elf Kniffe. `muster.html` leitet weiter, `#m-<id>` öffnet den Kniff. |
| Skillkoffer | Ersetzt den Methodenkoffer (`werkzeugkiste.html` leitet weiter). Für Fortgeschrittene: je Skill, was er tut, **so sieht es am Ende aus**, wo er auf Kidu in Aktion ist, Download; das ganze Plugin und die Gestaltungsregeln. Darunter »Was mit den Bau-Skills entsteht«: sechs Ansichten, kein Download. |
| Digital-Check | Skill `digital-check` v1.5: sechs typische Schwächen aus den Erprobungen (Aufdecken vor dem Festlegen, Kriterien vor dem eigenen Text, ohne Kernentscheidung, ohne Denkwerkzeug des Fachs, Sicherung ohne Maß, Rechte und Würde); im Prüf-Auftrag sieben neue Prüfpunkte in »Anforderungen« und drei in »Gestaltung« (Orientierung wie auf einem Arbeitsblatt, Schrift- und Zielgröße, Bilder nach Kartenbreite). |
| Phase 3 »Unterrichten« | Neu **Tipps und Tricks** (`tipps.html`): vier Tipps für vorher, sechs für während, vier für nachher, jeder mit Herkunft (erprobt · nachgeschärft · Erfahrungsregel · Vorschlag). Ein Entwurf, der weiterwächst. Die **Karte für die Tafel ist gestrichen**; auf »Tablet-Phasen gut führen« stehen stattdessen die sechs Regeln auf einen Blick. |
| Phase 4 »Nach der Stunde« | Beobachtungsbogen und Mein Rückmeldebogen. Fortbildungsbaustein, Beratungsstunde und Leitsätze sind aus dem Fahrplan genommen. |
| Für die Fortbildungsleitung | Die drei Bausteine und eine Übersicht stehen **verschlüsselt** in den Seiten (AES-GCM 256, Schlüssel aus dem Passwort mit PBKDF2-SHA-256 und 600 000 Runden, wie das Lehrkraft-Schloss im GGK-Labor). Erreichbar nur über die Fußzeile (»Für die Fortbildungsleitung · mit Passwort«). Nach dem Öffnen bleibt der Bereich bis zum Schließen des Tabs offen; »Bereich schließen« vergisst den Schlüssel. Klartext nur in `privat/` (nicht im Repository); er ist außerhalb des Repositorys gesichert und lässt sich mit dem Passwort jederzeit aus den verschlüsselten Dateien zurückholen (`node tools/schloss.mjs --auspacken`). |
| KI-Training | Dieselben **vier Phasen** wie im Digitalen Unterricht: Grundlagen · Unterricht mit KI vorbereiten · Unterrichten · Nach der Stunde. Oben bleibt alles wie bisher (erste zehn Minuten, Schnell-Anfrage), damit der Rundgang stimmt. |
| Trainingsaufgaben | `ki-aufgaben.html`: zwölf Übungen in fünf Fähigkeiten (Abgeben oder selbst machen · Gut beschreiben · Kritisch prüfen · Verantwortlich handeln · Lernende begleiten – wie im Skill `ki-kompetenz-kollegium`), je mit drei Schritten und »Geschafft, wenn …«. Sie nutzen, was AIS.chat bietet: Chat, Assistent, Lernszenario, Dialogpartner, Wahl des Sprachmodells, Kontingent (Stand November 2026; AIS.chat hieß bis Mai 2026 »telli«). Zwei Aufgaben haben einen Auftrag zum Kopieren (Gegenprobe, Dialogpartner). Alle sind Vorschläge und noch nicht erprobt. |
| Aufgabenkoffer auf Papier | `papierkoffer.html`: dieselben 18 Aufgabenformen, elf Kniffe und Phasen wie der Aufgabenkoffer – hier für Papier, Tafel und Raum, je mit einem KI-Auftrag für das Material (Papierfassung, Faustregel, Kniffe der Idee, wann es wenig bringt). Das ist die »Plattform für analogen Unterricht, mit KI erstellt« aus dem Auftrag. |
| Rundgang | Die zwei Bilder des Fahrplans sind neu aufgenommen (17.11.2026). Kapitel 4 ist neu ausgemessen: Die Kamera zeigt jetzt »Zuerst: Papierfrage« und die zwei Türen, der Tipp sitzt wieder auf »Bisherigen Unterricht digitalisieren«. Texte und Zeiten des Films sind unverändert. |

## Kniffe im Aufgabenkoffer – die Zuordnung (Vorschlag, bitte prüfen)

Ein Kniff steht bei den Ideen, mit denen er sich überschneidet (`KOFFER.kniffe` in `assets/daten/koffer-ideen.js`). Drei Kniffe passen in jede Phase (`KOFFER.jedePhase`).

| Kniff | steht bei |
| --- | --- |
| Erst erleben, dann erklären | Vorhersagen, versuchen, vergleichen |
| Zusatzinformation kippt das Urteil | Erst entscheiden, dann auflösen |
| Stolperkarten | Struktur legen |
| Selbstdiagnose vor dem Üben | Sich selbst einschätzen |
| Hilfe- und Expertenkarten | In jeder Phase · Gestufte Zugänge und Hilfen |
| Thesen, die ein Urteil verlangen | Stimmen der Klasse sammeln |
| Antworten vergleichen und verbessern | Ein Urteil schreiben |
| Merkmal – Beleg – Erklärung | Markieren mit Grund · Zuordnen und Sortieren |
| Übersicht statt Klickstrecke | In jeder Phase |
| Sortieren mit Zwischenstand | Zuordnen und Sortieren · Eine Reihe legen |
| Fehlvorstellungen dreimal nutzen | In jeder Phase · Auswahlaufgabe mit Rückmeldung |

Im Aufgabenkoffer auf Papier stehen die zwei Aufgaben ohne Gerät in einer Phase (`KOFFER.papierPhasen`, Vorschlag): »Lesen in drei Schritten« in der Erarbeitung, »Ein Urteil schreiben« in »Übertragen und Ausblick« (passt auch in die Erarbeitung).

## Geändert

- Fußzeile: Über Kidu · Inhalte und Funktionen · Hinweise zu Daten und KI · Gestaltungssystem · Skillkoffer · Mein Fortbildungsbogen · Mein Rückmeldebogen · Für die Fortbildungsleitung · mit Passwort.
- Skills (Plugin »kidu« 0.7.0): `unterricht-digitalisieren` v4.6, `digital-check` v1.5, `kidu-start` v3.3, `ki-kompetenz-kollegium` v2.3 (neue Ordnung der Website; Fortbildungsbausteine nicht mehr öffentlich).
- `tools/pruefen.py`: neue Seiten und Skripte; Prüfung des Schlosses (verschlüsselte Daten mit mindestens 600 000 Runden, kein Zeichen übrig, `privat/` in `.gitignore`); Fahrplan-Prüfung erkennt die Kette in Phase 2.
- Tests: neu `tests/papierfrage.test.js`, `tests/papierkoffer.test.js`, `tests/training.test.js`, `tests/schloss.test.js`; `tests/regeln.test.js` für die Frage nach dem Prinzip; `tests/e2e.py` auf die neue Ordnung umgestellt. Mit `KIDU_PASS` prüft `tests/e2e.py` auch die Inhalte hinter dem Schloss.
- Über Kidu: Inhalte und Funktionen und »Was ist neu?« auf dem Stand von 4.46; alte Links auf `muster.html` und `werkzeugkiste.html` zeigen auf die neuen Seiten.

## Gemessen (Chromium, 17.11.2026)

- Prüfbefehl: `tools/pruefen.py` ohne Verstoß · Unit-Tests 182 von 182 · Browser-Tests mit `KIDU_PASS` alle bestanden.
- Beamer 1280 × 720, Unterkante der ersten Handlung: Papierfrage 651 px · Skillkoffer 266 px · Tipps und Tricks 486 px · Trainingsaufgaben 393 px · Aufgabenkoffer auf Papier 253 px · Für die Fortbildungsleitung 447 px.
- Spalten: KI-Phasen 4 (1920, 1440, 1280) · 2 (1180, 820) · 1 (390); Aufgabenkoffer auf Papier 4 / 4 / 3 / 3 / 2 / 1; Trainingsaufgaben 3 / 3 / 3 / 3 / 2 / 1. Kein waagerechtes Scrollen in diesen Breiten.
- Laufende Animationen nach dem Laden: 0 auf allen neuen Seiten. Kleinste Zielfläche 44 px; kleiner ist nur ein Link mitten im Satz (Ausnahme in WCAG 2.5.8).
- Fließtext höchstens 68ch, auch bei 1920 px: Die Karte »Zuerst: Papierfrage« ist darum höchstens 68ch breit.
- Schloss: falsches Passwort öffnet nichts; das richtige öffnet alle vier Seiten in einer Sitzung; Leitsätze drucken auf eine Seite A4.

## Nicht gelaufen

- Impeccable `audit`/`polish` und Taste `lint`/`inspect` (Plugins in dieser Umgebung nicht installiert); axe-core (`tests/vendor/axe.min.js` fehlt).
- Echtes iPad mit Safari, VoiceOver, Beamer im Raum.
- AIS.chat selbst: Die Funktionen stehen so in den Mitteilungen der Länder (Baden-Württemberg zum Start im Oktober 2025, Berlin 2026, NRW zur Umbenennung im Mai 2026). Wie das Kontingent angezeigt wird und welche Sprachmodelle gerade wählbar sind, ist noch offen.

## Nur du kannst das

- Das Passwort aufschreiben (es steht nur im Chat).
- Die Zuordnung der Kniffe und die Phasen der zwei Aufgaben ohne Gerät prüfen (oben).
- Die Trainingsaufgaben einmal selbst in AIS.chat durchspielen – sie sind noch nicht erprobt.
- Wissen: Ältere Fassungen von Fortbildungsbaustein, Beratungsstunde und Leitsätzen bleiben in der Geschichte des Repositorys lesbar. Wer sie ganz entfernen will, muss die Geschichte umschreiben – das ist nicht Teil dieser Version.
- Die eigenen Skills in Claude (Konto) aktualisieren, falls gewünscht: Das Plugin zum Herunterladen ist auf 0.7.0.

## Fallstricke (Vorschlag für den Skill `website-design-workflow`)

- Eine alte Sprungmarke derselben Seite (`#t-probe`, `#t-kollegium`) löst nur `hashchange` aus, kein Laden: Weiterleitungen alter Marken auch im `hashchange`-Handler (Kidu 4.46).
- Dieselbe Klasse für verschiedene Hinweise (`probe-lesen` für Lesen, Für alle und Weiter) macht Zählungen in Tests falsch: je Hinweis eine eigene Klasse (Kidu 4.46).
- Die Regel »Fließtext höchstens 68ch« misst bei Karten das ganze Listenelement: Eine einzelne Karte über die volle Breite braucht eine Höchstbreite (Kidu 4.46, »Zuerst: Papierfrage« bei 1920 px).
- Ein Rundgang aus Bildschirmfotos: Ändert sich die Höhe über einem Ziel, rutschen Tipp-Ring und Kamera. Alt und neu ausmessen (Bounding-Box), Werte umrechnen, Standbilder bei den Kapitelzeiten ansehen (Kidu 4.46, Kapitel 4: 238 px tiefer).
- Ein verbotenes Zeichen der Projektprüfung (»@« gegen Mailadressen) trifft auch Eigennamen wie die Bildungsplattform des Landes: umschreiben, nicht mit einer Entität umgehen (Kidu 4.46).
