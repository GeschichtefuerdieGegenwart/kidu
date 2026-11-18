# Version 4.52 – Die Wunsch-Methode: vier Sätze, drei Kreise als Zeichnung zum Antippen

Stand: 18. November 2026 · Branch `wunsch-methode` (auf `main`, Stand 4.50) · zur Freigabe

Grundlage: Auftrag Mario (18.11.2026): »Setzte das ganze perfekt visualisiert auf Kidu als PR um. Visualisiere es perfekt. Sieh dir hierzu meine entsprechenden Skills an.« Dazu deine Entscheidungen vom selben Tag: das Modell »Vier Sätze, drei Kreise«, keine Stufen, der Name »Wunsch-Methode« mit dem Bild der Lampe; die fünf Fähigkeiten bleiben der Filter im Fahrplan.

## Was du freigeben musst

1. **Der Name der Seite: »Die Wunsch-Methode«.** Nicht »Die vier Sätze« – Kidu hat schon »fünf Sätze« (Sicher arbeiten, `fuenf-saetze.html`). »Vier Sätze, drei Kreise« steht als Marker unter dem Namen.
2. **Neue Namen, die danach eingefroren sind:** die Sätze *Wissen · Sagen · Prüfen · Verantworten*, die Kreise *Für mich · Für meine Lernenden · Für andere*, *Grundausstattung*, *»Wo stehst du?«*, *»Was in der Lampe wirklich steckt«*.
3. **Die Texte der zwölf Felder** (Tabelle unten und auf der Seite): was du kannst, erster Schritt, Beispiel, Übung, Kniff. Alle Beispiele sind ausgedacht – so steht es auf der Seite. Keine Funde aus deinem Tresor, keine Namen.
4. **Die Reihenfolge für »Das lohnt sich anzusehen«** (unten). Sie ist ein Vorschlag, kein Befund.
5. **Der Platz:** KI-Training · Phase 1 »Grundlagen«, als siebtes Werkzeug; auf der Karte der Phase die sechste Hilfe »Den Überblick bekommen«.
6. **Das Bild:** ein Halbrund aus zwölf Feldern, unten die Lampe. Der Geist ist nur Rauch. Die Bratwurst steht im Text, nicht im Bild.

Das Modell ist ein Vorschlag und noch nicht erprobt. So steht es an der Zeichnung und im Aufklapptext.

## Was neu ist

| Bereich | Was neu ist |
| --- | --- |
| Seite | `wunsch-methode.html`: links die Geschichte von der Lampe mit den zwei Merksätzen und »Wo stehst du?«, rechts die Zeichnung. Am Beamer steht beides ohne Scrollen. |
| Zeichnung | Vier Fächer (Wissen · Sagen · Prüfen · Verantworten), drei Bögen (Für mich · Für meine Lernenden · Für andere), zwölf Felder zum Antippen. Ocker gefüllt: die Grundausstattung, fünf Felder. In der Mitte steigt der Rauch der Lampe auf: »Hier endet das Märchen« – links wünschen, rechts prüfen und verantworten. Alle Wörter sind Text, kein Bild. |
| Ein Feld | Antippen öffnet das Arbeitsfenster: was du kannst, »Dein erster Schritt« (mit Zeit und »geht ohne KI«), ein Beispiel, »Die Übung dazu«, »Der Kniff dazu«, »Derselbe Satz, ein Kreis weiter«. Die Zeichnung bleibt sichtbar; das gewählte Feld trägt eine schwarze Kante, sein Satz und sein Kreis sind unterstrichen. »Schließen« oder Escape schließt, der Fokus geht an das Feld. Die Adresse merkt das Feld (`#feld-…`), »Zurück« im Browser funktioniert. |
| »Wo stehst du?« | Drei Bilder, eines je Kreis, je vier Aussagen und »Nichts davon«. Danach steht an jedem Feld ✓ »mache ich schon« oder ○ »noch nicht«, dazu »Darauf achtest du schon« und bis zu drei Felder unter »Das lohnt sich anzusehen« – jedes mit seinem ersten Schritt. Keine Stufe, keine Zahl, kein Balken. Gespeichert werden nur die angetippten Aussagen, nur in diesem Browser (`hilde.wunsch`); »Meine Angaben löschen« und »Eingaben löschen« entfernen sie. |
| Liste | Alle zwölf Felder als Liste, nach Kreisen: hinter einem Knopf, am Telefon gleich offen (dort gibt es die Zeichnung nicht), ohne Skript und im Druck immer. |
| Hintergrund | Drei Aufklapptexte: »Was in der Lampe wirklich steckt« (fünf Sätze, was das Märchen weglässt, Hebels »Drei Wünsche«), »Was »Grundausstattung« heißt«, »Worauf das Modell beruht« (mit Belegstand). |
| Fahrplan | Neues Werkzeug in Phase 1 (»zum Überblick«, kurz, geht ohne KI); auf der Startseite des KI-Trainings die Hilfe »Den Überblick bekommen«. Phase 1 zeigt jetzt »6 Hilfen · 7 Werkzeuge«. |
| Daten | Eine Quelle: `assets/daten/wunsch.js` (Sätze, Kreise, zwölf Felder, Aussagen, Reihenfolge). `tools/wunsch.py` setzt beim Bauen Zeichnung, Liste und Lampentext ein. |
| Prüfung | `tools/pruefen.py`: Teile aktuell, zwölf Felder und zwölf Karten, fünf Grundausstattung, kein Text im Bild, keine Wörter wie Stufe, Punkte, Prozent oder Abzeichen, Zeitwörter wie im Fahrplan, alle Ziele vorhanden. |
| Dokumente | `DESIGN.md` (neuer Abschnitt mit Schaubild-Zeile, Bedeutungs-Check und Messwerten), `README.md`, `CLAUDE.md`, »Über Kidu« (»Was ist neu?«). |

## Die zwölf Felder

G = Grundausstattung. Zeit der Übung in Klammern.

| Feld | Dein erster Schritt | Die Übung dazu |
| --- | --- | --- |
| Wissen · Für mich (G) | Prüf-Labor: »Abgeben oder selbst machen« – ohne KI | Trainingsaufgabe »Deine Woche sortieren« (kurz) |
| Wissen · Für meine Lernenden (G) | Eine Aufgabe in Teile zerlegen und ankreuzen: KI hilft, KI ist egal, KI ersetzt das Lernen – ohne KI | Auftrag »KI-Regeln für eine Aufgabe festlegen« (eine Freistunde) |
| Wissen · Für andere | Drei Aufträge notieren, die du fast gleich mehrmals gestellt hast – ohne KI | noch kein eigenes Werkzeug (eine Freistunde) |
| Sagen · Für mich (G) | Schnell-Anfrage: Anlass wählen, drei Angaben, kopieren | Trainingsaufgabe »Eine schwache Anfrage umbauen«, Prompten lernen (kurz) |
| Sagen · Für meine Lernenden | Einen Lern-Auftrag mit Grenze schreiben und selbst ausprobieren | Trainingsaufgaben »Ein Lernszenario selbst durchspielen« und »Einen Dialogpartner testen« (eine Freistunde) |
| Sagen · Für andere | Drei Sätze aufschreiben, die in deinem Fach immer gelten – ohne KI | Trainingsaufgabe »Einen Assistenten für dein Fach anlegen«, Skillkoffer (eine Freistunde) |
| Prüfen · Für mich (G) | Prüf-Labor: »Fehler finden« – ohne KI | Trainingsaufgabe »Drei Stellen nachprüfen« (eine Freistunde) |
| Prüfen · Für meine Lernenden | Die Markierzeichen aus dem Auftrag an einer eigenen KI-Antwort ausprobieren | Auftrag »Eine Übung: KI-Antworten prüfen« (mehrere Termine) |
| Prüfen · Für andere | Die feste Anweisung an einem alten Auftrag ausprobieren; vorher aufschreiben, woran du ein besseres Ergebnis erkennst | Mit dem Kollegium: KI-Tandem (eine Freistunde) |
| Verantworten · Für mich (G) | Prüf-Labor: »Was darf hinein?« – ohne KI | Sicher arbeiten in fünf Regeln, Trainingsaufgabe »Darf das rein?« (kurz) |
| Verantworten · Für meine Lernenden | Einen Satz schreiben, der KI-Hilfe im Material kennzeichnet – ohne KI | Werkstatt Bewertungskultur (eine Freistunde) |
| Verantworten · Für andere | Unter die Anweisung drei Zeilen: Stand, wofür sie nicht taugt, letzter Fehler – ohne KI | Mit dem Kollegium: Die Fachgruppe als Lerngemeinschaft (mehrere Termine) |

**Reihenfolge für »Das lohnt sich anzusehen«** (die ersten drei, die noch nicht angetippt sind): Prüfen · Für mich → Wissen · Für mich → Verantworten · Für mich → Sagen · Für mich → Wissen · Für meine Lernenden → Prüfen, Verantworten, Sagen · Für meine Lernenden → Wissen, Sagen, Prüfen, Verantworten · Für andere. Begründung: erst die Grundausstattung, darin zuerst das Prüfen; dann der Kreis, in dem ein Fehler Lernende trifft; zuletzt der Kreis, in dem er sich vervielfacht.

**Quellen im Aufklapptext**, für diesen Stand am Original oder an der Mitteilung der Hochschule gegengelesen: Bastani u. a. 2025 (Proceedings of the National Academy of Sciences 122, 26: Feldversuch mit fast tausend Lernenden an einer Schule), die Studie der Aalto-Universität 2025 (zwei Versuche mit Denkaufgaben), Hebel, »Drei Wünsche«, im »Schatzkästlein des rheinischen Hausfreundes« (Tübingen 1811). Aus dem Bestand von Kidu übernommen, hier nicht neu gelesen: der AI-Fluency-Rahmen (Dakan und Feller 2025), der Kompetenzrahmen der UNESCO (2024), die Handlungsempfehlung der Kultusministerkonferenz (Oktober 2024), Fuller 1969 sowie Hall und Hord.

## Prüfungen

Gelaufen:
- `python3 tools/bauen.py && python3 tools/pruefen.py` – keine Verstöße
- `node --test` – 204 von 204 (neu: zehn Tests in `tests/wunsch.test.js`)
- `python3 tests/e2e.py` – 938 von 938; neu für 4.52 sind 50 Prüfungen (Beamer, Öffnen und Schließen mit Maus und Tastatur, Adresse und Zurück, »Wo stehst du?«, Speichern und Löschen, Liste, Sprünge, sechs Breiten, Telefon, »weniger Bewegung«, Beamer-Ansicht, ohne Skript, Druck, Fahrplan), angepasst zwei Zählungen aus 4.47 und 4.50 (sieben Werkzeuge in Phase 1)
- Mindestprüfung 5a (`pruef_seiten.py`) für `wunsch-methode.html`, `ki.html`, `ueber.html` – 0 Probleme

Gemessen (Playwright, Chromium):

| Breite × Höhe | Aufbau | Breite der Zeichnung | Dicke eines Feldes |
| --- | --- | --- | --- |
| 1920 × 1080 | nebeneinander | 896 px | 61,1 px |
| 1440 × 900 | nebeneinander | 817 px | 55,7 px |
| 1280 × 720 (Beamer) | nebeneinander | 720 px | 49,1 px |
| 1180 × 820 (iPad quer) | nebeneinander | 657 px | 44,8 px |
| 1024 × 768 | untereinander | 896 px | 61,1 px |
| 820 × 1180 (iPad hochkant) | untereinander | 754 px | 51,4 px |
| 720 × 900 | untereinander | 662 px | 45,2 px |
| 390 × 844 (Telefon) | nur die Liste | – | – |

Beamer 1280 × 720: Zeichnung bis 544 px, »Wo stehst du?« bis 618 px; bei jedem der zwölf Felder steht der erste Schritt im ersten Bildschirm (höchstens 705 px). Kein Text unter 16 px. Kein waagerechtes Scrollen in allen Breiten. Nach dem Laden läuft keine Animation. Beamer-Ansicht: Wörter auf Grund 21:1, auf Ocker 6,2:1, Kanten der Felder 9,2 und 9,4:1. Alle 13 Sprünge der Felder haben ein Ziel. Druck: 7 Seiten A4 mit allen zwölf Feldern.

Eigene Kritik nach den Bildschirmfotos (Design 40 / Bedienung 30 / Eigenständigkeit 20 / Inhalt 10): **84 von 100** (34 · 25 · 17 · 8). Stärken: Die Zeichnung zeigt das ganze Modell auf einen Blick; der Rauch trennt Wünschen von Prüfen, ohne ein Wort zu brauchen; jedes Feld endet in einem ersten Schritt. Schwächen: Am Telefon gibt es die Zeichnung nicht, dort bleibt die Liste. Am Beamer steht bei einem offenen Feld nur der erste Schritt im ersten Bildschirm – Übung und Kniff brauchen Scrollen. Auf sehr breiten Bildschirmen bleibt unter der Zeichnung Platz leer. Der Druck ist mit sieben Seiten lang. Ob die zwölf Aussagen von »Wo stehst du?« treffen, ist nicht erprobt.

Nicht gelaufen: axe-core (`tests/vendor/axe.min.js` fehlt; Paketinstallation ist in dieser Umgebung gesperrt – in den Netzwerkeinstellungen freigeben), Impeccable und Taste Skill (Plugins fehlen), echtes iPad mit Safari, VoiceOver, Druck auf Papier.

## Bewusst nicht übernommen / offen

- **»Wo stehst du?« im Fortbildungsbogen:** Die drei Bilder stehen nur auf dieser Seite. Ob sie in »Mein Fortbildungsbogen« gehören, ist deine Entscheidung – noch offen.
- **Werkzeuge für Felder ohne eigenes Werkzeug:** »Wissen · Für andere« hat keine Übung in Kidu; vier erste Schritte gehen ohne Ziel (du schreibst etwas auf). Das steht ehrlich da. Neue Werkzeuge wären ein eigener Schritt.
- **Vier Wochen KI-Training:** Der Plan nennt die Wunsch-Methode noch nicht. Der Aufklapptext zur Grundausstattung verweist auf ihn.
- **Der Geist als Figur, die Bratwurst als Bild:** nicht gebaut. Eine Figur ist schnell ein Klischee und liegt nah an bekannten Filmbildern; das Designsystem lehnt verspielte Illustrationen ab.
- **Zeichnung am Telefon:** Unter 720 px wären die Felder dünner als 44 px. Darum dort die Liste.
- **»Was ist neu?« in »Über Kidu«** nennt 4.49 bis 4.51 nicht (4.50 ist ohne Eintrag zusammengeführt, 4.49 und 4.51 sind offen). Ich habe nur 4.52 ergänzt.
- **Pull Request #63 (4.51)** ändert auch `CLAUDE.md`, `README.md`, `src/ueber.html` und `tools/pruefen.py`. Wer als Zweites zusammengeführt wird, braucht ein neues Aufsetzen auf `main`. Das mache ich auf deine Ansage.

## Nur du kannst das

- Die Texte der zwölf Felder lesen: Stimmt jeder Satz für deine Schule und dein Kollegium? Besonders die Sätze zu Daten, Bewertung und Kennzeichnung.
- Auf dem iPad hoch und quer und am Beamer durchtippen: Feld → erster Schritt → »Wo stehst du?« → Karte → »Meine Angaben löschen«.
- Mit VoiceOver: die Felder der Zeichnung (Name, Grundausstattung, Stand), die Überschrift des Arbeitsfensters, die drei Bilder.
- Eine Seite drucken und ansehen.
- Erproben: Das Modell ist ein Vorschlag. Ob es Kolleg*innen hilft, zeigt erst eine Fortbildung.
