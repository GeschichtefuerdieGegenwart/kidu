# Kidu · Künstliche Intelligenz und digitaler Unterricht

Seit 10. November 2026 heißt das Projekt **Kidu** – Künstliche Intelligenz und digitaler Unterricht. Vorher: »Hilde Digital« (bis 1. November 2026), »Papierprobe« (1.–10. November 2026). Kidu ist nicht an eine Schule gebunden. Repository und Adresse heißen `kidu`.

Kidu ist eine Fortbildungsplattform für Lehrkräfte: KI-Training in vier Phasen (Grundlagen · Analogen Unterricht mit KI vorbereiten · Unterrichten · Nach der Stunde), Digitaler Unterricht in vier Phasen (Grundlagen · Digitalen Unterricht erstellen · Unterrichten · Nach der Stunde) und Unterrichtsbeispiele, analog und digital – beides mit KI erstellt. Kidu ist ohne Auftrag einer Schule entstanden. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/*.html` | Inhalt der Seiten (ohne Kopf- und Fußzeile) |
| `tools/bauen.py` | setzt Kopfzeile, Inhalt und Fußzeile zu fertigen Seiten zusammen |
| `tools/pruefen.py` | prüft Kennzeichnung, Fachbegriffe, Platzhalter, externe Dateien; ab 4.51 auch, dass jeder Skill dieselbe Kurzzeile »Grundregeln« trägt (Wortlaut nur in `unterricht-digitalisieren`) |
| `tools/werkzeugkiste.py` | eine Quelle für alles (ab 4.25): überträgt die »Kurzfassung für Kidu« jedes Skills nach `assets/daten/kurzfassungen.js`, schreibt `docs/pruef-auftrag.md`, ab 4.51 das Qualitätsmodell im Skill `digital-check` (`references/qualitaetsmodell.md` aus `assets/daten/qualitaet.js`) und packt die Downloads des Skillkoffers (bis 4.45 »Methodenkoffer«); läuft in `tools/bauen.py` mit |
| `werkzeugkiste/kidu/` | das Plugin »kidu« für das Kollegium – hier werden die Skills gepflegt |
| `assets/hilde.css` | Gestaltungssystem (Farben, Schrift, Bausteine) |
| `assets/daten/beispiele.js` | alle Beispiele an einem Ort |
| `assets/daten/taxonomien.js` | Phasen, Anliegen, Umfang, Rollen, Mehrwert-Arten, Status |
| `assets/daten/texte.js` | Texte des KI-Wegs: Ziele, Ergebnisformen, Bausteine, Prüflisten |
| `assets/regeln.js` | Regeln der Entscheidungskarte und der Selbsteinschätzung, kommentiert |
| `assets/suche.js`, `assets/ki-anfrage.js` | Suche und Filter der Unterrichtsbeispiele (`galerie.html`), Anfrage-Baukasten |
| `assets/hilde.js` | gemeinsame Helfer: Speichern im Browser, Karten, Bildansicht |
| `tools/duplex.py` | erzeugt die Duplex-Vorschauen der Unterrichtsbeispiele in `assets/galerie/duplex/` (braucht Pillow, nur beim Bauen) |
| `src/film/`, `tools/film.py`, `assets/film.js` | Film auf der Startseite (ab 4.40 eine Quelle): Bühne in `src/film/buehne.html`, Kapitel, Standbilder, Abschnitte und der Film als Text in `src/film/kapitel.json`; `tools/film.py` erzeugt `assets/film-buehne.js` (nie von Hand ändern, läuft in `tools/bauen.py`); `assets/film.js` spielt ihn ab – Kapitelleiste, Tastatur, »Als Text«; Bilder in `assets/film/` |
| `assets/daten/galerie.js`, `assets/galerie-buehne.js`, `assets/galerie/` | Unterrichtsbeispiele: echte Ansichten mit Bild- und Alternativtexten, Einblicke; Herkunft in `docs/galerie-quellen.md` |
| `assets/anfangen.js` | Unterrichtsbeispiele: »Zum Anfangen« – sechs erprobte Beispiele, zwei je Umfang (Feld `auswahl` in `beispiele.js`) |
| `assets/daten/schnell.js`, `assets/schnell-anfrage.js`, `assets/ki-schnell.js` | KI-Training: Schnell-Anfrage für häufige Anlässe (ab 4.47 eigene Seite `schnell-anfrage.html`) |
| `src/fahrplan-ki.json` | Fahrplan »KI-Training« aus einer Quelle (ab 4.47): vier Phasen mit Anliegen und alle Werkzeuge; `tools/fahrplan.py` setzt die Zeichen `<!-- kiplan:… -->` auf `ki.html` und den Werkzeugseiten ein. `zuhause` = die Seite gehört zum anderen Fahrplan. Ab 4.48 je Werkzeug `zeit` (Namen unter `zeiten`, gleich wie in `training.js`) und `faehigkeiten` (IDs der fünf Fähigkeiten aus `training.js`); `tools/pruefen.py` prüft beides |
| `assets/ki-start.js` | Startseite des KI-Trainings (ab 4.50): aus den vier Karten werden Schaltflächen, die je eine Phase darunter öffnen (`#phase-…`, Escape, Fokus); ohne Skript stehen alle Phasen da. `window.KIPHASEN` für den Filter. Karte, Einleitung und Hilfen: `start` in `src/fahrplan-ki.json` |
| `assets/ki-faehig.js` | Fähigkeiten als Filter im Fahrplan KI-Training (ab 4.48): jede Fähigkeit wird ein Schalter (`aria-pressed`), der die Werkzeuge mit dieser Fähigkeit hervorhebt und »übt: …« dazuschreibt; noch einmal tippen oder »Aufheben« stellt alles wieder her. Ohne Skript bleibt der Fahrplan wie in 4.47. Nichts wird gespeichert |
| `src/vier-wochen.html`, `assets/vier-wochen.js` | Vier Wochen KI-Training (ab 4.48): fertiger Plan für eine Person oder ein Tandem – Prüfen · Entscheiden · Beschreiben · Erproben, je eine kurze Übung und ein echter Anlass, nur mit vorhandenen Werkzeugen. Freiwilliges Startdatum und Haken »Erledigt« (`hilde.vierwochen`), Felder werden nie gespeichert; Druckansicht |
| `src/wunsch-methode.html`, `assets/daten/wunsch.js`, `assets/wunsch.js`, `tools/wunsch.py` | Die Wunsch-Methode (ab 4.52, Phase »Grundlagen«): das Modell »Vier Sätze, drei Kreise« als Zeichnung zum Antippen – zwölf Felder, je mit dem, was du kannst, einem ersten Schritt, einer Übung und einem Kniff; die Lampe als Einstieg. »Wo stehst du?« in drei Bildern, danach Zeichen an jedem Feld und bis zu drei nächste Schritte (`WUNSCH_SEITE.naechste`), gespeichert nur die angetippten Aussagen (`hilde.wunsch`). Keine Stufen, kein Gesamtstand. Daten nur in `assets/daten/wunsch.js`; `tools/wunsch.py` setzt beim Bauen mit Node Zeichnung, Liste und Lampentext ein (Zeichen `<!-- wunsch:bild -->`, `<!-- wunsch:liste -->`, `<!-- wunsch:lampe -->`). Tests: `tests/wunsch.test.js` |
| `src/bewertung.html`, `assets/daten/bewertung.js`, `assets/bewertung.js` | Werkstatt Bewertungskultur (ab 4.48, Phase »Nach der Stunde«): eine eigene Aufgabe von der KI lösen lassen und umbauen (Arbeitsweg zeigen, kurz mündlich erklären, KI-Hilfe offenlegen, Absprache treffen); »Was verbindlich bleibt« steht getrennt daneben. Zwei Aufträge zum Kopieren mit `WERKSTATT_ANFRAGE` |
| `assets/daten/probe.js` | Kurze Probe im Fortbildungsbogen (ab 4.48): ausgedachter Elternbrief, von Hand geschrieben, mit zwei Fehlern und einer Datenschutzfalle; Auswertung in Worten mit `REGELN.probe` |
| `src/erste-minuten.html`, `src/prompten.html` | Deine ersten zehn Minuten und Prompten lernen mit dem Prompt-Generator (ab 4.47 eigene Seiten; alte Sprungmarken auf `ki.html` leiten dorthin) |
| `src/pruef-labor.html`, `assets/daten/pruef-labor.js`, `assets/pruef-labor.js` | Prüf-Labor (ab 4.47): drei Übungen ohne KI-System – Fehler finden (Übungstext, von Hand geschrieben), Abgeben oder selbst machen, Was darf hinein? Erst festlegen, dann auflösen; Rückmeldung in Worten |
| `src/kollegium.html` | Mit dem Kollegium (ab 4.47): sechs Formate, um gemeinsam weiterzulernen, je mit »Was dazu bekannt ist« |
| `assets/daten/digitalisieren.js`, `assets/digitalisieren-prompt.js`, `assets/digitalisieren.js` | Werkzeug »Bisherigen Unterricht digitalisieren« |
| `assets/einheit.js` | »Unterricht neu planen«: eine Stunde oder eine ganze Einheit – bei einer Einheit zuerst Schritt E »Landkarte der Einheit« (ab 4.37, Regel `REGELN.einheit`) |
| `assets/phasen-bild.js` | Schaubild »Wo in der Stunde das Gerät hilft« auf `sechs-hebel.html`: Namen und Aufgaben der Phasen aus `taxonomien.js` (ab 4.37) |
| `src/fahrplan.json`, `tools/fahrplan.py` | Fahrplan »Digitaler Unterricht« aus einer Quelle (ab 4.42): vier Phasen und alle Werkzeuge; `tools/fahrplan.py` setzt beim Bauen die Werkzeuglisten der Bereichsseite und auf jeder Werkzeugseite die Zeile oben (`<!-- fahrplan:zeile -->`) und den Fahrplan unten (`<!-- fahrplan:fuss -->`) ein; läuft in `tools/bauen.py`, `tools/pruefen.py` prüft die Zeichen |
| `assets/fahrplan.js` | Bereichsseite »Digitaler Unterricht« (ab 4.41): Fahrplan mit vier aufklappbaren Phasen (`<details>`, geht ohne Skript); das Skript ergänzt »Alle Werkzeuge zeigen«, öffnet die Phase einer Sprungmarke und zeigt beim Drucken alle Phasen offen |
| `assets/rueckmeldebogen.js` | Seite »Mein Rückmeldebogen« (ab 4.36): Rückmeldung nach der Stunde als Text zum Kopieren oder als PDF, für die Leitung der Fortbildung; Kidu verschickt nichts |
| `assets/fortbildungsbogen.js` | Seite »Mein Fortbildungsbogen« (seit 4.36 mit dem früheren »Mein Ist-Stand«): Eröffnung in vier Sätzen (einmal je Sitzung), eine Frage je Bild auf einer Fragekarte, Fragen zu KI und zum Unterricht mit Tablets (bedingt), fertiger Bogen mit Karte, Schritten, Kniffen, Codeblock und »Als PDF sichern« (ab 4.29; Fragekarte und Tablet-Fragen seit 4.30). Ab 4.48: zwei Fragen nach dem Verhalten, eine freiwillige kurze Probe (`assets/daten/probe.js`) und die Landkarte »Wofür du KI schon nutzt – und wofür noch nicht« auf dem Bogen |
| `assets/sechs-hebel-rad.js` | Seite »Wann funktioniert digitaler Unterricht?«: Prinzipienrad im Kopf – Prinzip antippen, Karte wechselt (Muster Y, ab 4.21); das Rad blättert die Bänder als Register, Weiter/Zurück (Z1, ab 4.22) |
| `assets/sechs-hebel-film.js` | Seite »Film: Was das Gerät kann« (`sechs-hebel-film.html`): Erklärfilm in sieben Kapiteln auf einer Zeitachse, Start nur auf Knopfdruck (Muster AW, ab 4.21) |
| `assets/sechs-hebel-proben.js` | Seite »Wann funktioniert digitaler Unterricht?«: Proben S bis X zu den sechs Prinzipien – erst festlegen, dann ein Zustandswechsel (ab 4.20) |
| `assets/sechs-hebel.js` | Seite »Wann funktioniert digitaler Unterricht?«: Muster R1 – gewählte Prinzipien wandern über die Plenumsstelle an die Tafel (ab 4.19) |
| `assets/pruef-prompt.js`, `assets/digital-check.js` | Digital-Check Weg B: Prüf-Auftrag aus dem Qualitätsmodell zum Kopieren in ein freigegebenes KI-System (keine Anbindung); ab 4.38 mit eigenem Block »Gestaltung« aus dem Skill `digital-check` |
| `tests/` | Unit-Tests (`node --test`) und Browser-Tests (`tests/e2e.py`) |
| `docs/` | Versionen 1 bis 4 im Überblick, Herkunft der Galeriebilder, Annahmen, Datenschutz, Datenlücken zur Prüfung |
| `assets/fonts/` | Bricolage Grotesque (Überschriften) und Atkinson Hyperlegible Next (Text), beide SIL Open Font License (OFL-*.txt) |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json` | Produktbeschreibung und Gestaltungssystem »Überdruck« (Format von Impeccable); ab 4.38 mit elf benannten Gestaltungsregeln und der einzigen Liste erlaubter Ausnahmen von »kein Autoplay« |
| `.taste-skill/direction.json` | begründete Ausnahmen für die Gestaltungsprüfung mit dem Taste Skill |
| `assets/bilder/` | Bildschirmfotos der Beispiele, auch für den Betrieb ohne Netz |
| `src/papierfrage.html`, `assets/probe.js`, `assets/papierfrage-prompt.js`, `assets/daten/prinzipien.js` | Papierfrage als eigene Seite (ab 4.46): eine Stelle in drei Fragen mit dem Prinzip, das das Gerät einlöst, oder die ganze Stunde mit KI; Regeln aus der Liste »Papierfrage« im Skill `unterricht-digitalisieren` |
| `src/skillkoffer.html`, `assets/daten/skillkoffer.js`, `assets/werkzeugkiste.js` | Skillkoffer für Fortgeschrittene (ab 4.46, vorher »Methodenkoffer«): je Skill, was er tut, wie das Ergebnis aussieht, wo er auf Kidu in Aktion ist, Download; die Bau-Skills nur als Ansicht |
| `src/tipps.html` | Tipps und Tricks für die Stunde mit Tablet (ab 4.46), jeder mit Herkunft |
| `src/ki-aufgaben.html`, `assets/daten/training.js`, `assets/training.js` | Trainingsaufgaben im KI-Training (ab 4.46): zwölf Übungen in fünf Fähigkeiten, mit den Funktionen von AIS.chat (Stand November 2026) |
| `src/papierkoffer.html`, `assets/papierkoffer.js`, `tools/papierkoffer.py` | Aufgabenkoffer auf Papier (ab 4.46): dieselben Ideen und Kniffe wie der Aufgabenkoffer, je mit einem Auftrag an die KI für Material auf Papier. Ab 4.49 (Variante C) als gezeichnetes Arbeitsblatt mit sechs Stellen (`KOFFER.papierStellen` in `assets/daten/koffer-ideen.js`); `tools/papierkoffer.py` setzt beim Bauen mit Node Blatt und Listen aus `PAPIERKOFFER.html()` ein (ohne Skript gültig), `tools/pruefen.py` meldet Veraltetes |
| `schloss/*.enc.json`, `assets/schloss-kern.js`, `assets/schloss.js`, `tools/schloss.mjs`, `tools/schloss_buendel.py` | Bereich »Für die Fortbildungsleitung« (ab 4.46): Fortbildungsbaustein, Beratungsstunde, Leitsätze und ab 4.48 der Ablauf-Koffer für das KI-Training (`ablaeufe.html`: 45 Minuten, 90 Minuten, pädagogischer Tag, je mit Folgetermin) verschlüsselt (AES-GCM, Schlüssel aus dem Passwort mit PBKDF2-SHA-256, 600 000 Runden). Der Klartext liegt nur in `privat/` (nicht im Repository, `.gitignore`) |

## Arbeiten

Ein Befehl baut und prüft alles:

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

Die Browser-Tests brauchen Python Playwright mit Chromium. Für die Prüfung mit axe-core `axe.min.js` nach `tests/vendor/` legen (nicht im Repository).

**Geschützter Bereich (ab 4.46).** Das Passwort steht nie im Repository, nicht in Dokumenten und nicht im Tresor. Ändern sich die Inhalte, so:

```
python3 tools/schloss_buendel.py teilen <Bündel.md>   # nur wenn die Inhalte aus einem Bündel kommen: privat/*.html entstehen
KIDU_PASS='…' node tools/schloss.mjs                  # verschlüsselt privat/*.html nach schloss/*.enc.json (nur Geändertes)
KIDU_PASS='…' node tools/schloss.mjs --pruefen        # öffnet zur Probe alle Dateien
python3 tools/schloss_buendel.py packen               # privat/kidu-geschuetzt-buendel.md zum Sichern außerhalb des Repositorys
```

Fehlt `privat/` (etwa in einer neuen Arbeitsumgebung): `KIDU_PASS='…' node tools/schloss.mjs --auspacken` schreibt den Klartext aus den verschlüsselten Dateien zurück. Neues Passwort: `KIDU_PASS='…' node tools/schloss.mjs --neu` verschlüsselt alles neu. Mit `KIDU_PASS` prüfen die Browser-Tests auch die Inhalte hinter dem Schloss; ohne die Variable nur die Tür. Ältere Fassungen der drei Seiten bleiben in der Geschichte des Repositorys lesbar.

Nach Änderungen an den Beispielen: `python3 tools/datenluecken.py` aktualisiert `docs/datenluecken.md`.

Die fertigen Seiten (`index.html`, `ki.html`, `unterricht.html`, `digital-check.html`, `selbstcheck.html`, `tablets.html`, `passt.html`, `galerie.html`, `beispiel.html`, `mehrwert.html`, `ueber.html`, `gestaltung.html`; `showroom.html` leitet zu den Unterrichtsbeispielen weiter, `startpunkt.html` und `ist-stand.html` zum Fortbildungsbogen, `fuenf-saetze.html` zu den fünf Sätzen auf `sechs-hebel.html`) lassen sich ohne Server direkt im Browser öffnen.

## Urheberschaft und Lizenz

Konzept, Leitsätze, Kriterien und Texte: Mario Walter. Umgesetzt mit Unterstützung eines KI-Systems. Wer was beigetragen hat, steht in `ENTSTEHUNG.md`.

- Texte und Daten: CC BY-NC-SA 4.0 – frei für Schulen und Fortbildung, nicht kommerziell, mit Namensnennung. Siehe `LICENSE-TEXTE.md`.
- Programmcode: MIT-Lizenz. Siehe `LICENSE`.
- Bilder: alle Rechte vorbehalten. Schriften: SIL Open Font License.
- Der Name ist von keiner Lizenz erfasst. Für eine kommerzielle Nutzung ist eine eigene Vereinbarung nötig.
- Zitiervorschlag: Walter, Mario (2026): Kidu · Künstliche Intelligenz und digitaler Unterricht. https://github.com/GeschichtefuerdieGegenwart/kidu – maschinenlesbar in `CITATION.cff`.
- Stand vor dem Fortbildungsauftrag der Schule (3. November 2026): siehe `docs/stand-2026-11-03.md`.

## Bilder

Die Bildschirmfotos zeigen eigene Unterrichtsmaterialien. Die Folien der Anleiter*innen-Präsentation sind ohne Kopf- und Fußzeile zugeschnitten (kein Logo, keine Namen).
