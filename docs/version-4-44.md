# Version 4.44 – Aufgabenkoffer nach Unterrichtsphasen

Stand: 16. November 2026 · Branch `aufgabenkoffer-phasen`

Grundlage: Auftrag Mario (16.11.2026): Die Möglichkeiten für digitalen Unterricht rücken in den Fokus, die Frage »Papier oder Papier und Gerät« tritt in den Hintergrund. Eine Seite, auf der nach Unterrichtsphasen getrennt gute Ideen stehen, die sich ansprechend anwählen lassen; dazu eine fächerübergreifende Erklärung, wie man die Methode digital umsetzt, mit praktischem Beispiel. Entwurf als Claude-Seite am selben Tag vorgelegt, danach die Freigabe »setze alles auf Kidu um«.

## Neu

- **Stundenlinie.** Die erste Handlung ist die Stunde als Linie mit den vier Phasen aus `taxonomien.js` (Einstieg · Erarbeitung · Sichern und üben · Übertragen und Ausblick), je mit Hilfetext und Zahl der Ideen. »Alle Ideen zeigen« zeigt alle 16.
- **Ideenkarten.** Je Idee ein Bildzeichen in den zwei Druckfarben (16 eigene SVG-Zeichen), der Name, ein Satz und »Das Gerät kann hier: …« (sechs Prinzipien). Ideen, die auch in einer anderen Phase passen, stehen dort mit »Passt auch hier«.
- **Ein Arbeitsfenster je Idee.** Links: »So setzt du es digital um« in vier Schritten, »Das trägt das Gerät bei« mit Link zum Prinzip, »Darauf achten« (Faustregel und »wenig sinnvoll«), drei Beispiele aus anderen Fächern, »Aus dem Unterricht«; aufklappbar »Wann sie besonders passt«, »Und ohne Gerät?«, »Belegstand«. Rechts: »Probier es aus« – eine kleine Probe, wie sie Lernende erleben – und »Mit KI bauen lassen« (Auftrag in den fünf Teilen, jetzt mit Phase, Schritten und dem Format »eine HTML-Datei«).
- **16 Proben.** Jede verlangt zuerst eine eigene Festlegung, die Rückmeldung ist ein erklärender Text, es gibt keine Punkte. Zuordnen und Reihe haben Zwischenstand und einzelnes Zurücklegen. Nichts wird gespeichert oder gesendet.
- **Papier im Hintergrund.** Die Ort-Marken (»meist Papier · Papier und Gerät · Gerät lohnt sich oft«), die Legende und die Landkarte nach Ziel und Ort sind gestrichen. »Lesen in drei Schritten« und »Ein Urteil schreiben« stehen als »Zwei Aufgaben gehen ohne Gerät besser« unter den Karten und öffnen ein Blatt mit der Papierfassung.
- **Adressen bleiben.** `aufgabenkoffer.html#k-<id>` öffnet weiter die Aufgabenform (Links der Unterrichtsbeispiele). Neu: `#einstieg`, `#erarbeitung`, `#sichern`, `#uebertragen`, `#alle`.

## Daten

- `assets/daten/koffer-ideen.js` (neu): je Idee `phasen`, `kurz`, `schritte`, `demoFach`, `faecher`; dazu `ohneGeraet`. `assets/daten/aufgaben.js` ist unverändert; `zweck` und `ort` bleiben in den Daten, die Seite zeigt sie nicht mehr.
- **Vorschläge, die Mario prüfen muss:** die Zuordnung der Ideen zu den Phasen (4 · 9 · 8 · 5, mit Mehrfachnennung) und die Entscheidung, zwei Aufgabenformen nicht als Karte zu zeigen.
- **Ausgedacht und so gekennzeichnet:** die 16 Proben und die 48 Fächerbeispiele. Fachlich gegenzulesen sind vor allem die Proben aus Pflege (Vitalzeichen), Kfz-Technik (Viertaktmotor), Wirtschaft (Zinseszins, Inflation), Gemeinschaftskunde (Weg eines Bundesgesetzes, vereinfacht) und Biologie (Fotosynthese).

## Prüfung

Gelaufen (16.11.2026, Chromium): `tools/bauen.py`, `tools/pruefen.py` (keine Verstöße), `node --test` 160 von 160, `tests/e2e.py` alle bestanden. Neu darin: 16 Prüfungen zum Koffer (Phasen, Zahl der Ideen, Arbeitsfenster, Fokus und Adresse, Probe mit zweitem Versuch, Regler erst nach der Vermutung, Zwischenstand, alte Adresse `#k-urteil`, alle 16 Proben laden, speichert nichts).

Gemessen: Beamer 1280 × 720 – die Phasen enden bei 518 px, vier Karten nebeneinander, keine laufende Animation, kleinste Zielfläche 44 px; 1920 px – sechs Karten nebeneinander; 900 px – das Arbeitsfenster in einer Spalte; kein waagerechtes Scrollen. Zwei Tipps bis zur Idee, der dritte ist die eigene Antwort in der Probe.

Nicht gelaufen: Taste-Prüfer (lint, inspect), Impeccable audit und polish, axe-core (die Datei fehlt), Druck als PDF, echtes iPad mit Safari, VoiceOver.

## Gestrichen in 4.44

Landkarte des Aufgabenkoffers (4.42), Liste nach sieben Zielen mit Chips (4.32), Ort-Marken und Legende, die Regeln `.koffer-…` in `hilde.css`. Die Landkarte von »Ideen und Kniffe« bleibt.

## Offen

- Mario prüft Phasen-Zuordnung, Proben und Fächerbeispiele.
- »So sieht sie gut aus« und »Passende Kniffe« je Aufgabenform (aus 4.37) sind mit den Schritten und Proben zum Teil eingelöst; die Verbindung zu »Ideen und Kniffe« fehlt noch.
- Die Probe »Stimmen der Klasse sammeln« zeigt 24 ausgedachte Stimmen; ob das im Kollegium missverstanden wird, zeigt die Fortbildung.
