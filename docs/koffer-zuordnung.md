# Aufgabenkoffer auf Papier – Bestandsaufnahme und Zuordnung

Stand: 18.11.2026. Gemessen am 17.11.2026 auf Kidu 4.47 (Commit 0d128d9); der Papier-Koffer und seine Daten sind in 4.48 (Commit 18ec75a) unverändert. Schritt 0 des Auftrags »Aufgabenkoffer ›Analogen Unterricht mit KI vorbereiten‹ – zwei Designvarianten« (Mario, 17.11.2026). Diese Datei ist die gemeinsame Grundlage beider Varianten: Variante B (`koffer-variante-b`, nach Anlass im Raster des digitalen Koffers) und Variante C (`koffer-variante-c`, das Arbeitsblatt als Bild).

Gelesen: `src/aufgabenkoffer.html`, `assets/aufgabenkoffer.js`, `src/papierkoffer.html`, `assets/papierkoffer.js`, die Daten `assets/daten/aufgaben.js`, `koffer-ideen.js`, `werkstatt.js`, `schnell.js`, `taxonomien.js` und die Stile `.ak` und `.pk-` in `assets/hilde.css`. Bildschirmfotos und Messungen: Chromium, `file://`, 390 × 844, 768 × 1024, 1280 × 720 und 1440 × 900, Aufgabenkoffer mit der Phase »Einstieg« gewählt.

## 1. Warum der digitale Koffer besser wirkt

| | Aufgabenkoffer (Digitaler Unterricht) | Aufgabenkoffer auf Papier (KI-Training) |
| --- | --- | --- |
| Einträge auf einmal | erste Ebene: 4 Phasen und »In jeder Phase«; danach nur die Ideen einer Phase (3 bis 9, im Einstieg 4) | 21 Karten (18 Aufgabenformen, 3 Kniffe) gleichzeitig, unter 5 Überschriften |
| Text je Karte | 20–30 Wörter (Mittel 27) | 52–109 Wörter (Mittel 79) |
| Bildanteil der Karte | 34–53 % (Bildzeichen 16:9) | 0 % |
| Kartenmaß bei 1280 × 720 | 285 × 471 px, vier in einer Reihe | 382 × 734–878 px, drei in einer Reihe – eine Karte ist höher als der Beamer |
| Ganze Seite bei 1280 px | 773 Wörter, 41 Bedienelemente, 9 Überschriften | 2008 Wörter, 103 Bedienelemente, 31 Überschriften |
| Seitenhöhe am Telefon | 8055 px | 19 856 px |

1. **Wenige Einträge je Ebene.** Erst eine Phase, dann eine Idee, dann ein Fenster. Der Papier-Koffer zeigt alle 21 Karten auf einmal, jede gleich wichtig.
2. **Hierarchie.** Eine Entscheidung je Ebene: Stundenlinie → Ideenkarten → Arbeitsfenster. Im Papier-Koffer stehen in jeder Karte sechs bis acht gleich laute Teile (Ort, Titel, Kurztext, »Auf Papier«, Faustregel, Kniff, »Passt auch«, KI-Auftrag, Link).
3. **Textmenge.** Die Karte sagt nur, was die Idee ist (rund 27 Wörter). Die Schritte, die Probe und der Auftrag stehen erst im Fenster. Im Papier-Koffer steht alles in der Karte – etwa dreimal so viel Text.
4. **Bildanteil.** Jede Ideenkarte beginnt mit einem eigenen Bildzeichen in den zwei Druckfarben (16:9 auf Petrol-zart, gut ein Drittel bis die Hälfte der Karte). Der Papier-Koffer hat kein einziges Bild.
5. **Kartenmaß und Beamer.** Vier Karten passen nebeneinander und in der Höhe fast auf einen Bildschirm. Eine Papier-Karte ist 734 bis 878 px hoch (bei 1440 px sogar bis 1050 px) und passt nicht auf den Beamer.
6. **Raster.** Vier Spalten bei 1280 und 1440 px, zwei am iPad hochkant, eine am Telefon; Reihen sind voll. Der Papier-Koffer hat bei 1280 px drei Spalten – im Einstieg (vier Ideen) bleibt eine Karte allein in der zweiten Reihe; ungleich hohe Karten lassen Lücken.
7. **Ruhe und Abstände.** Gleich große Karten auf einer Kartonplatte, eine Farbe je Zustand. Im Papier-Koffer wechseln Ocker-zarte Kniff-Kästen (12), Ort-Etiketten in zwei Farben und gestrichelte Kanten.
8. **Bedienung.** Zwei Tipps bis zur Idee. Die Adresse merkt sich Phase und Idee (`#einstieg`, `#k-abruf`), Escape führt zurück. Im Papier-Koffer springt die Leiste nur zu Überschriften; 21 Aufklapper öffnen je ein 14-zeiliges Textfeld mitten in der Karte; nichts wird gemerkt.
9. **Erster Bildschirm.** Am Beamer stehen Überschrift, ein Satz und die Phasenwahl (369–612 px) im Bild. Im Papier-Koffer füllt das Formular den ersten Bildschirm (bis 522 px); die Phasenleiste beginnt bei 606 px, die erste Karte bei 839 px – unter dem Bildschirm.
10. **Eindeutige Signale.** Der digitale Koffer spricht vom Gerät, weil er das Gerät meint. Der Papier-Koffer zeigt auf 8 Karten »Gerät lohnt sich oft« und 19-mal »Dieselbe Idee am Gerät« – auf einer Seite, die für Papier gedacht ist.

## 2. Alle Einträge des Papier-Koffers

Jede Karte hat dieselbe Funktion: Sie beschreibt eine Aufgabenform und liefert einen **KI-Auftrag**, der das Material auf Papier vorbereitet (fünf Teile wie die Schnell-Anfrage: Ziel, Kontext, Anforderungen, Format, Prüfkriterien; mit Papierfassung, Faustregel, den Kniffen der Idee und »wenig sinnvoll«; gebaut von `PAPIERKOFFER.auftrag`). Fach, Thema und Lerngruppe kommen aus einem Formular für alle Aufträge; fehlen sie, fragt die KI zuerst. Die drei Kniff-Karten liefern den Auftrag des Kniffs aus `WERKSTATT.muster` (`PAPIERKOFFER.kniffAuftrag`). Spalte »Auf Papier entsteht« = Feld `papier` (wörtlich gekürzt).

| Nr | Titel (Ort) | Kurztext (Feld `tun`) | Auf Papier entsteht | Phase heute (Passt auch) | Kniff dazu |
| --- | --- | --- | --- | --- | --- |
| 1 | Erst erinnern (meist Papier) | Ohne Hilfe aufschreiben, was man noch weiß; erst danach vergleichen. | Zettel oder Heft, drei Fragen an der Tafel, Merkzettel | Einstieg (Sichern und üben) | – |
| 2 | Vorhersagen, versuchen, vergleichen (Gerät lohnt sich oft) | Vermutung festlegen, Versuch selbst machen, neben eine echte Studie stellen. | Stoppuhr und Strichliste | Einstieg (Erarbeitung) | Erst erleben, dann erklären |
| 3 | Stimmen der Klasse sammeln (Gerät lohnt sich oft) | Alle stimmen ohne Namen ab; die Klasse sieht das Ergebnis und spricht darüber. | Strichliste an der Tafel, verdeckte Zettel | Einstieg (Übertragen) | Thesen, die ein Urteil verlangen |
| 4 | Erst entscheiden, dann auflösen (Gerät lohnt sich oft) | In einer offenen Lage entscheiden und die Sicherheit angeben; erst dann die Auflösung. | Umgeknickte Karte, Umschlag | Einstieg (Erarbeitung, Übertragen) | Zusatzinformation kippt das Urteil |
| 5 | Lesen in drei Schritten (meist Papier) | Vorher eine Frage, während Abschnitte überschreiben, nachher in drei Sätzen wiedergeben. | Lesekarte mit drei Feldern, Rollenkarten | Erarbeitung | – |
| 6 | Markieren mit Grund (Papier und Gerät) | Höchstens drei Stellen je Abschnitt markieren, Stichwort an den Rand, dann vergleichen. | Text mit Rand, zwei Stiftfarben | Erarbeitung | Merkmal – Beleg – Erklärung **(D3)** |
| 7 | Zuordnen und Sortieren (Gerät lohnt sich oft) | Beispiele einer Gruppe zuordnen und den Grund nennen. | Kärtchen und Felder, Kontrollkarte nach fünf Karten | Erarbeitung (Sichern) | Sortieren mit Zwischenstand **(D4)** · Merkmal – Beleg – Erklärung **(D3)** |
| 8 | Regler und Modell (Gerät lohnt sich oft) | Vermuten, einen Wert verschieben, sehen, was sich ändert. | Zwei oder drei Fälle als Tabelle | Erarbeitung | – |
| 9 | Einen Film selbst steuern (Gerät lohnt sich oft) | Einen Ablauf Schritt für Schritt ansehen und dabei eine Frage beantworten. | Bildfolge auf einem Blatt | Erarbeitung | – |
| 10 | Gestufte Zugänge und Hilfen (Gerät lohnt sich oft) | Am selben Inhalt einen Zugang wählen; Hilfen selbst öffnen. | Drei Arbeitsblätter oder Tippkarten zum Abholen | Erarbeitung (Sichern) | Hilfe- und Expertenkarten **(D1)** |
| 11 | Karteikarten (Papier und Gerät) | Karte beantworten, umdrehen, sortieren: wusste ich, teilweise, noch nicht. | Karten und ein Kasten mit Fächern | Sichern und üben | – |
| 12 | Eine Reihe legen (Papier und Gerät) | Schritte oder Ereignisse in die richtige Folge bringen und sagen, was woraus folgt. | Streifen auf dem Tisch | Sichern und üben (Erarbeitung) | Sortieren mit Zwischenstand **(D4)** |
| 13 | Struktur legen (Papier und Gerät) | Begriffe zu einem Bild legen, an jeder Verbindung ein Wort, jede Lage begründen. | Kartensatz, Pfeile mit Wort | Sichern und üben | Stolperkarten |
| 14 | Sich selbst einschätzen (Papier und Gerät) | Zu mehreren Zeitpunkten einschätzen, was man kann, und danach wählen, was man übt. | Liste »Ich kann …« mit drei Spalten | Sichern und üben (Übertragen) | Selbstdiagnose vor dem Üben |
| 15 | Auswahlaufgabe mit Rückmeldung (Gerät lohnt sich oft) | Eine Antwort wählen; die Erklärung sagt, warum sie passt oder nicht. | Lösungsblatt mit Erklärungen, Partnerkorrektur | Sichern und üben | Fehlvorstellungen dreimal nutzen **(D2)** |
| 16 | Ein Urteil schreiben (meist Papier) | Ein begründetes Urteil zu einer strittigen These schreiben und vertreten. | Heft oder Blatt, Erwartungshorizont zur Selbstkontrolle | Übertragen und Ausblick (Erarbeitung) | Antworten vergleichen und verbessern |
| 17 | Einen Fall einordnen (Papier und Gerät) | Einen Fall mit festen Merkmalen auf einer Skala einordnen, dann mit einem Vorschlag vergleichen. | Skala auf dem Blatt, Kreuz und Begründung | Übertragen und Ausblick (Erarbeitung) | – |
| 18 | Ein Erklärvideo erstellen (Papier und Gerät) | Einen Inhalt in ein bis zwei Minuten für andere erklären – erst als Plan, dann als Aufnahme. | Plakat, kurzer Vortrag, Erklären zu zweit | Übertragen und Ausblick | – |
| 19 | Übersicht statt Klickstrecke (Kniff) | Eine Arbeitsphase hat eine Fläche; Hilfen öffnen am selben Ort. | Plakat oder Doppelblatt je Phase mit Hilfekasten | In jeder Phase | – |
| 20 | Hilfe- und Expertenkarten (Kniff) **(D1)** | Alle arbeiten an derselben Aufgabe; grüne Karten erleichtern, orange vertiefen. | Grüne und orange Karten | In jeder Phase | – |
| 21 | Fehlvorstellungen dreimal nutzen (Kniff) **(D2)** | Eine typische Fehlvorstellung im Fall, im Ausgangsticket und im Bewertungsraster. | Ausgangsticket »Stimmt – oder stimmt nicht?« | In jeder Phase | – |

Dazu auf der Seite: das Formular »Für alle Aufträge« (Fach, Thema, Lerngruppe, Hinweis zu Daten) und der Abschnitt »Woher die Ideen kommen«.

### Dopplungen

- **D1** »Hilfe- und Expertenkarten« steht als eigene Karte (Nr. 20) und als Kniff-Kasten bei Nr. 10, beide Male mit demselben Papiertext.
- **D2** »Fehlvorstellungen dreimal nutzen« steht als eigene Karte (Nr. 21) und als Kniff-Kasten bei Nr. 15.
- **D3** »Merkmal – Beleg – Erklärung« steht als Kniff-Kasten bei Nr. 6 und Nr. 7.
- **D4** »Sortieren mit Zwischenstand« steht als Kniff-Kasten bei Nr. 7 und Nr. 12.
- **D5** Die Einleitung oben und »Woher die Ideen kommen« sagen beide, dass es dieselben Ideen wie im Aufgabenkoffer sind.
- **D6** 21-mal derselbe Aufklapper »KI-Auftrag für das Material«, 19-mal »Dieselbe Idee am Gerät« bzw. »Derselbe Kniff am Gerät«, die Phasennamen dreimal (Leiste, Überschrift, »Passt auch«).

In beiden Varianten steht ein Kniff, der schon als eigener Eintrag in derselben Gruppe steht, bei der Idee nur noch mit Namen und Verweis (D1, D2, wenn beide in derselben Gruppe landen); D3 und D4 stehen ausführlich nur beim ersten Eintrag einer Gruppe; D5 und D6 entfallen durch den neuen Aufbau. Die KI-Aufträge selbst bleiben unverändert – auch dort, wo sie Kniffe wiederholen.

## 3. Zuordnung

### Anpassung des Vorschlags

Der Vorschlag im Auftrag (Material erstellen · Vereinfachen und differenzieren · Rückmelden und bewerten · Planen und organisieren) passt nur zum Teil zum Bestand: Alle 21 Einträge erstellen Material, sodass »Material erstellen« alles umfassen würde, und für »Planen und organisieren« (Stundenstruktur, Elterninformation, Sitzung) gibt es im Papier-Koffer keinen Eintrag – diese Aufträge stehen in der Schnell-Anfrage. Ihre Aufträge in den Koffer zu holen, wäre eine Dopplung und kein vorhandener Inhalt des Koffers.

Deshalb ordnen beide Varianten nach dem, was die Klasse mit dem Material tun soll. Grundlage sind die sieben Zwecke in `AUFGABEN.zwecke` (vorhandene Daten, seit 4.44 nicht mehr angezeigt), paarweise zu vier Anlässen zusammengelegt; die drei Kniffe »In jeder Phase« gehen dorthin, wo ihr Papiertext hinzielt. Der Teil »Vereinfachen und differenzieren« und »Rückmelden« aus dem Vorschlag bleibt als vierter Anlass erhalten.

**Variante B – vier Anlässe** (höchstens vier):

| Anlass | Zwecke aus `aufgaben.js` | Einträge | Zahl |
| --- | --- | --- | --- |
| Erschließen und ordnen | Texte erschließen · Ordnen und verbinden · dazu »Einen Film selbst steuern« (Abläufe verstehen) | 5, 6, 9, 7, 12, 13 | 6 |
| Vermuten und urteilen | Untersuchen und ausprobieren · Entscheiden und urteilen | 2, 3, 8, 4, 17, 16 | 6 |
| Üben und festigen | Wissen festigen · Erklären und zeigen (das Erklärvideo) | 1, 11, 15, 18 | 4 |
| Differenzieren und rückmelden | Den eigenen Weg steuern · die drei Kniffe für jede Phase | 10, 20, 19, 14, 21 | 5 |

**Variante C – sechs Stellen auf dem Blatt** (von oben nach unten):

| Stelle | Einträge | Zahl | Grund |
| --- | --- | --- | --- |
| 1 Kopf und Einstieg | 1, 2, 3, 4 | 4 | Was oben auf dem Blatt vor der Arbeit steht: eine Frage, eine Vermutung, eine Entscheidung (heute alle in der Phase Einstieg) |
| 2 Infotext und Material | 5, 6, 9, 8 | 4 | Der Text oder das Material und wie man es liest: Lesekarte, Rand, Bildfolge, Tabelle mit Fällen |
| 3 Aufgaben | 7, 12, 13, 17, 16 | 5 | Die Aufträge in der Mitte: sortieren, legen, einordnen, urteilen |
| 4 Hilfe am Rand | 10, 20, 19 | 3 | Hilfen und Zugänge neben der Aufgabe: Tippkarten, grüne und orange Karten, Hilfekasten auf derselben Fläche |
| 5 Lösung und Selbstkontrolle | 15, 14 | 2 | Unten zum Umknicken: Lösungsblatt mit Erklärungen, Liste »Ich kann …« |
| 6 Rückseite | 11, 21, 18 | 3 | Was zum Ausschneiden, Einsammeln oder Vorbereiten dahinter liegt: Karteikarten, Ausgangsticket, Plan für das Erklären |

Der Vorschlag »Kopf und Ziel – Stundenstruktur, Lernziel« ist angepasst: Im Koffer gibt es keinen Auftrag für Stundenstruktur oder Lernziel (der steht in »Prompten lernen«), wohl aber vier Einstiegsformen. »Lösung« trägt die zwei Einträge, deren Papierfassung eine Lösung oder Selbstkontrolle ist; Erwartungshorizont und Bewertungsraster gehören im Bestand zu Nr. 16 und Nr. 21 und stehen dort.

### Jeder Eintrag

| Nr | Eintrag | Anlass (B) | Stelle (C) |
| --- | --- | --- | --- |
| 1 | Erst erinnern | Üben und festigen | 1 Kopf und Einstieg |
| 2 | Vorhersagen, versuchen, vergleichen | Vermuten und urteilen | 1 Kopf und Einstieg |
| 3 | Stimmen der Klasse sammeln | Vermuten und urteilen | 1 Kopf und Einstieg |
| 4 | Erst entscheiden, dann auflösen | Vermuten und urteilen | 1 Kopf und Einstieg |
| 5 | Lesen in drei Schritten | Erschließen und ordnen | 2 Infotext und Material |
| 6 | Markieren mit Grund | Erschließen und ordnen | 2 Infotext und Material |
| 7 | Zuordnen und Sortieren | Erschließen und ordnen | 3 Aufgaben |
| 8 | Regler und Modell | Vermuten und urteilen | 2 Infotext und Material |
| 9 | Einen Film selbst steuern | Erschließen und ordnen | 2 Infotext und Material |
| 10 | Gestufte Zugänge und Hilfen | Differenzieren und rückmelden | 4 Hilfe am Rand |
| 11 | Karteikarten | Üben und festigen | 6 Rückseite |
| 12 | Eine Reihe legen | Erschließen und ordnen | 3 Aufgaben |
| 13 | Struktur legen | Erschließen und ordnen | 3 Aufgaben |
| 14 | Sich selbst einschätzen | Differenzieren und rückmelden | 5 Lösung und Selbstkontrolle |
| 15 | Auswahlaufgabe mit Rückmeldung | Üben und festigen | 5 Lösung und Selbstkontrolle |
| 16 | Ein Urteil schreiben | Vermuten und urteilen | 3 Aufgaben |
| 17 | Einen Fall einordnen | Vermuten und urteilen | 3 Aufgaben |
| 18 | Ein Erklärvideo erstellen | Üben und festigen | 6 Rückseite |
| 19 | Übersicht statt Klickstrecke | Differenzieren und rückmelden | 4 Hilfe am Rand |
| 20 | Hilfe- und Expertenkarten | Differenzieren und rückmelden | 4 Hilfe am Rand |
| 21 | Fehlvorstellungen dreimal nutzen | Differenzieren und rückmelden | 6 Rückseite |

Die Zuordnung ist ein Vorschlag wie die Phasen im Aufgabenkoffer und steht so auf der Seite. Sie liegt als Daten in `assets/daten/koffer-ideen.js` (`KOFFER.papierAnlaesse` in Variante B, `KOFFER.papierStellen` in Variante C); `tests/papierkoffer.test.js` prüft, dass jeder Eintrag genau einmal vorkommt. Die Phase jeder Idee bleibt erhalten und steht in der Vertiefung.

## 4. Was beide Varianten gleich halten

- **Inhalt:** dieselben 21 Einträge und KI-Aufträge, unverändert gebaut. Kurztext, »Auf Papier«, Faustregel, »Warum es trägt«, Kniffe, Phasen, Ort (»meist Papier« …, kein Rang) und der Weg zur selben Idee am Gerät stehen in einer Vertiefung je Eintrag.
- **Erste Ebene:** »Auftrag an die KI« statt »Prompt«; »Auftrag kopieren« mit Rückfall (Text markieren).
- **Eingaben:** an jeder Eingabe der Hinweis »Keine Namen, Noten oder anderen personenbezogenen Daten eingeben.« (Formular und jedes Auftragsfeld, mit `aria-describedby`). Freitexte werden nicht gespeichert.
- **Ohne JavaScript:** alle Einträge stehen gegliedert da, die Aufträge mit leeren Angaben (die KI fragt dann zuerst nach Fach, Thema und Lerngruppe). Gebaut aus denselben Daten beim Bauen (`tools/papierkoffer.py`), nicht von Hand.
- **Farben:** Honigplatte ist seit 4.26 das Ocker des Logos, `--ki-platte` #B68235 (nicht #F2B233 aus dem Designkonzept vom 18.10.2026); Fläche `--flaeche` #F8F5EE (nicht #FFFDF9). Gestaltet wird nur über die Variablen in `hilde.css`.

## 5. Umsetzung in Variante B (Branch `koffer-variante-b`)

- Anlässe als Daten: `KOFFER.papierAnlaesse` (Name, ein Satz, Bildzeichen, Einträge in dieser Reihenfolge).
- Seite: `src/papierkoffer.html`, `assets/papierkoffer.js` (`anlaesse`, `auftrag`, `kniffAuftrag`, `html`), `tools/papierkoffer.py` (setzt die Fassung ohne Skript beim Bauen ein).
- Gestaltung: gemeinsame Koffer-Komponente `.koffer-raster` / `.koffer-karte` in `assets/hilde.css`, die auch der Aufgabenkoffer nutzt; Muster in `DESIGN.md`.
- Dopplungen: D1, D3 und D4 stehen in »Mehr zur Idee« nur mit Namen und Verweis; D2 bleibt ausführlich, weil »Auswahlaufgabe mit Rückmeldung« und »Fehlvorstellungen dreimal nutzen« in verschiedenen Anlässen stehen. D5 und D6 entfallen durch den neuen Aufbau.
- Prüfung und Messwerte: `docs/version-4-49.md`.
