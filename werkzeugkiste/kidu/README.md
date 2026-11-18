# Kidu – Plugin für das Kollegium

**Kidu · Künstliche Intelligenz und digitaler Unterricht.** Das Plugin für lernwirksamen Unterricht mit und ohne Tablet – nicht an eine Schule gebunden. Das Plugin nimmt Lehrkräften Vorbereitung ab, nicht das Urteil: Jeder Weg beginnt mit der Frage, ob das Tablet hier etwas kann, was Papier nicht kann – und »bleibt Papier« ist ein vollwertiges Ergebnis.

Seit Version 0.2.0 ist das Plugin geteilt: **»kidu«** (dieses Plugin) ist für alle Kolleg*innen. Wer Lernseiten selbst bauen will, installiert zusätzlich **»kidu-bau«**.

## Zwei Einstiege

| Du willst … | Sag einfach … | Skill |
| --- | --- | --- |
| Unterricht neu planen oder bisherigen Unterricht digitalisieren – eine Stunde, ein Arbeitsblatt oder mehrere Stunden als Einheit; wissen, ob sich das Tablet lohnt; drei Varianten sehen | »Mach aus dieser Stunde etwas fürs Tablet« · »Lohnt sich hier das Tablet?« · »Plan mit mir die Einheit« | `unterricht-digitalisieren` |
| fertiges Material prüfen lassen – Didaktik und Gestaltung getrennt | »Schau mal drüber« · »Taugt das?« | `digital-check` |

Wer nicht weiß, wo anfangen: »Kidu, was kannst du?« → `kidu-start`.

## Weitere Wege

| Skill | Wofür |
| --- | --- |
| `lernmethode-einfuehren` | Lernstrategie als einseitiges Handout |
| `ki-grenzen-einer-aufgabe` | festlegen, was Lernende bei einer Aufgabe mit KI dürfen |
| `ki-faktencheck` | üben, KI-Antworten zu prüfen |
| `ki-kompetenz-kollegium` | KI-Fortbildung im Kollegium planen |
| `praxisforschung-im-kollegium` | eine Idee planvoll erproben und auswerten |

## Lernseiten bauen: Zusatz-Plugin »kidu-bau«

Lernseite, Labor, Lernpfad, Quiz mit Rückmeldung, Erscheinungsbild, Prüfkette, Schaubilder, Bewegung als Lernmittel und Filme liegen im Zusatz-Plugin (sechs Skills: `lernseite-bauen`, `website-design-workflow`, `signatur-design`, `schaubild-design`, `bewegung-als-lernmittel`, `film-regie`). Ohne es geht `unterricht-digitalisieren` bis zum **Übergabeblock** und liefert ihn als fertigen Bauauftrag – für später oder für eine Kollegin mit dem Bau-Plugin.

## Ohne Plugin: eine Quelle für alles

Jeder Skill hat einen Abschnitt **»Kurzfassung für Kidu«**. Aus ihm baut `tools/werkzeugkiste.py` im Repository `kidu` die kopierbaren Aufträge der Website – für jedes an der Schule freigegebene KI-System:

| Skill | Werkzeug auf der Website |
| --- | --- |
| `unterricht-digitalisieren` | Bisherigen Unterricht digitalisieren (Abschnitt »Vorgehen«) · Papierfrage, Auftrag »Die ganze Stunde prüfen« (Abschnitt »Papierfrage«) |
| `digital-check` | Digital-Check, Weg »Mit KI prüfen« (Abschnitte »Typische Schwächen« und »Gestaltung«) |
| `lernmethode-einfuehren` · `ki-grenzen-einer-aufgabe` · `ki-faktencheck` · `praxisforschung-im-kollegium` · `ki-kompetenz-kollegium` | Aufträge zum Kopieren |

Gepflegt wird nur im Skill. Die Website zeigt bei jedem Auftrag, aus welcher Fassung er stammt. Plugin und einzelne Skills liegen zum Herunterladen auf der Seite »Skillkoffer« (bis 4.45 »Methodenkoffer«) – je mit dem, was am Ende herauskommt, und wo der Skill auf Kidu in Aktion ist.

## Stufenplan

- **Stufe 1 – Pilot (jetzt):** zwei bis drei Kolleginnen, je eine echte Stunde über einen der zwei Einstiege. Erkundungsfrage nach `praxisforschung-im-kollegium`: »Hilft das Plugin bei der Entscheidung, ohne den Mehrwert-Check zu überspringen?« Belege: die Vorhaben und Materialien, der Beobachtungsbogen nach der Stunde, drei Sätze Rückmeldung je Kollegin.
- **Stufe 2 – Fachschaften:** nach Auswertung des Pilots; Fachbausteine je Fach ergänzen (bisher: GGK); Einträge in den Unterrichtsbeispielen aus den Pilotstunden.
- **Stufe 3 – Schulweit:** als Baustein des Medienbildungskonzepts; Fortbildung über `ki-kompetenz-kollegium`.

## Voraussetzungen und Grenzen

- Die Skills brauchen kein Repository und keinen Obsidian-Tresor; fehlt das, liefern sie Dateien oder Text (siehe `kidu-start`).
- Nicht aus der Cloud prüfbar: echtes iPad/Safari, VoiceOver, Moodle, Beamer im Raum. Das steht in jedem Bericht unter »Nur du kannst das«.
- Datenschutz: Lernseiten speichern nur lokal auf dem Gerät, ohne Namen; nichts wird an Server gesendet. GitHub Pages oder andere Veröffentlichung nur nach Entscheidung von Schulleitung und Datenschutzbeauftragtem.
- Ob Kolleginnen Plugins installieren können, hängt vom KI-Zugang der Schule ab – vor dem Pilot klären. Sonst: die Aufträge auf der Website.

## Pflege

Eine Quelle: Die Skills werden im Plugin gepflegt und versioniert (Abschnitt »Versionen« je Skill). Änderungen zuerst im Pilot, dann neue Plugin-Version (`plugin.json`, Version hochzählen). Beide Plugins gemeinsam pflegen: Ändert sich ein Skill-Name, die Verweise im anderen Plugin nachziehen.

**Eine Regel, ein Ort** (ab 0.8.0). Jede gemeinsame Regel hat einen Besitzer; dort steht sie ausführlich, die anderen Skills verweisen. Wer eine Regel ändert, ändert sie dort.

| Regel oder Thema | Besitzer |
| --- | --- |
| Grundregeln im Wortlaut, Haltung, Anrede | `unterricht-digitalisieren` – alle anderen Skills tragen dieselbe Kurzzeile; `tools/pruefen.py` prüft sie |
| Papierprobe, Umfang, keine Mischform, Dramaturgie der Stunde | `unterricht-digitalisieren`, Schritte 2 und 4 |
| Ergebnis ohne Server bündeln, Zeitdiagnose, Beobachtungsbogen, KI als Lernbegleitung | `unterricht-digitalisieren`, Schritte 5 und 8, Abschnitt »Nur wenn Lernende mit KI arbeiten« |
| Fachregeln GGK, NS-Sorgfalt, Fachgrenzen Politik | `unterricht-digitalisieren/references/fachbaustein-ggk.md` |
| Qualitätsmodell (14 Bereiche, Stufen, Kernbereiche je Materialtyp, Rahmenfragen), Regeln der Einschätzung, typische Schwächen | `digital-check` – das Qualitätsmodell erzeugt `tools/werkzeugkiste.py` aus `assets/daten/qualitaet.js` |

Die Bau-Skills in »kidu-bau« verweisen auf diese Orte. Umgekehrt hängt »kidu« nie an etwas, das nur in »kidu-bau« steht: Ohne das Zusatz-Plugin bleibt jede Regel lesbar.

**Bewusst doppelt:** Die »Kurzfassung für Kidu« in jedem Skill und der Prüf-Auftrag Weg B sind Fassungen für andere KI-Systeme und müssen für sich stehen. Ändert sich eine Regel im Skill, prüf, ob die Kurzfassung noch stimmt.

## Versionen

- **0.8.1, 18.11.2026:** Kidu 4.51, ohne Dopplungen – Abgleich mit den älteren Einzelfassungen der Skills; aus denselben Dateien entstehen »kidu« und »kidu-bau«: Grundregeln im Wortlaut nur noch in `unterricht-digitalisieren` (v4.7), in allen anderen Skills eine gleichlautende Kurzzeile, geprüft von `tools/pruefen.py`; Anrede: Lehrkraft »du«, Material für Lernende wie die vorhandenen Materialien. `digital-check` v1.6 (Qualitätsmodell aus `assets/daten/qualitaet.js` erzeugt, mit Rahmenfragen und HTML-Lernumgebung), `lernmethode-einfuehren` v1.4, `ki-faktencheck` v2.1, `ki-grenzen-einer-aufgabe` v2.1, `praxisforschung-im-kollegium` v2.1, `ki-kompetenz-kollegium` v2.4, `kidu-start` v3.5. Vier Fallstricke, die bisher nur in den Einzelfassungen standen, sind übernommen; der Fachbaustein GGK hat einen Abschnitt »Fachgrenzen Politik«. Neu im README: »Eine Regel, ein Ort«. Baut auf 0.7.1 auf; eine Fassung 0.8.0 ohne 0.7.1 gab es nur vor dem Zusammenführen.
- **0.7.1, 18.11.2026:** Kidu 4.49: `kidu-start` v3.4 (Phase 2 des KI-Trainings heißt »Analogen Unterricht mit KI vorbereiten«).
- **0.7.0, 17.11.2026:** Kidu 4.46: `unterricht-digitalisieren` v4.6 (neue Liste »Papierfrage« in der Kurzfassung: Regeln für den Auftrag »Die ganze Stunde prüfen«) · `digital-check` v1.5 (Erkenntnisse aus Psycho-Labor, GGK-Labor und Politik-Werkstatt: erst festlegen, dann aufdecken; Schreiben und Kriterien danach; eine Kernentscheidung; Denkwerkzeug des Fachs; Sicherung mit Maß; Rechte und Würde; Orientierung wie auf einem Arbeitsblatt) · `kidu-start` v3.3 und `ki-kompetenz-kollegium` v2.3 (neue Ordnung der Website: Papierfrage zuerst, Skillkoffer, Tipps und Tricks, KI-Training in vier Phasen mit Trainingsaufgaben und Aufgabenkoffer auf Papier; Fortbildungsbausteine nicht mehr öffentlich).
- **0.6.0, 13.11.2026:** Nach der Sichtung und Didaktikanalyse vom 13.11.2026 (Kidu 4.36–4.38): `unterricht-digitalisieren` v4.5 (ganze Einheit mit Schritt E »Landkarte der Einheit«, zwei Wege »Unterricht neu planen« und »Bisherigen Unterricht digitalisieren«, Prüfraster »Lehrfunktion je Phase« mit neuer Referenz `references/lehrfunktionen.md`, Gestaltung getrennt) · `digital-check` v1.4 (zwei Prüfblöcke Didaktik und Gestaltung, Prüffragen je Lehrfunktion, typische Schwächen aus der Sichtung; Kurzfassung mit Liste »Gestaltung«) · `kidu-start` v3.2 (neue Wege und Namen, die vier Phasen der Website) · `lernmethode-einfuehren` v1.3 (Sichern und üben mit Methode) · `ki-kompetenz-kollegium` v2.2 (Kidu als Fortbildungsplattform, Fortbildungsbogen und Rückmeldebogen).
- **0.5.1, 11.11.2026:** Die Seite »Werkzeugkiste« von Kidu heißt jetzt »Methodenkoffer« (`kidu-start` v3.1).
- **0.5.0, 11.11.2026:** Lesen und Strukturlegen: neue Referenz `lernmethode-einfuehren/references/lesen-und-strukturlegen.md` mit recherchierten Quellen und Belegstand; `lernmethode-einfuehren` v1.2, `unterricht-digitalisieren` v4.4, `digital-check` v1.3.
- **0.4.0, 10.11.2026:** Umbenannt in **»kidu«** (vorher »hilde-digital«), Einstieg `kidu-start` (vorher `hilde-digital-start`), Zusatz-Plugin »kidu-bau«; nicht mehr an eine Schule gebunden. Neu: Abschnitt »Kurzfassung für Kidu« in sieben Skills als einzige Quelle der Website-Aufträge; neuer Auftrag aus `ki-kompetenz-kollegium`. Gepflegt im Repository `kidu` unter `werkzeugkiste/kidu/`. Die Papierprobe in `unterricht-digitalisieren` heißt weiter so.
- **0.3.0, 31.10.2026:** Befunde aus dem Forschungsbericht »KI und digitale Medien im Unterricht« eingearbeitet: `ki-kompetenz-kollegium` v2 (KMK-KI-Kompetenzrahmen 16.10.2026, Art. 4 nach VO (EU) 2026/1744, »Was Fortbildung wirksam macht«, Beratungsstunde über acht Wochen, kein Zeitversprechen); `ki-grenzen-einer-aufgabe` (Regel 8 »Leistung mit KI ist kein Lernnachweis«, erst selbst dann KI, Abruf ohne KI, Rechtslage BW); `unterricht-digitalisieren` v4.2 (Lese-Kriterium, Belege zu KI); `digital-check` v1.1 (vier neue typische Schwächen); `ki-faktencheck` (Wiederholen, Wineburg 2022); `praxisforschung-im-kollegium` (Fokus und Rückmeldung bei Besuchen, Bausteine nach Sims). Die zurückgezogene Metaanalyse Wang & Fan 2025 wird nirgends als Beleg genutzt.
- **0.2.0, 31.10.2026:** Geteilt. Bau-Skills (`lernseite-bauen`, `signatur-design`, `website-design-workflow`, `schaubild-design`) ins Zusatz-Plugin »hilde-digital-bau«; Verweise in `hilde-digital-start`, `unterricht-digitalisieren`, `digital-check`, `lernmethode-einfuehren` angepasst. Fehlende Datei `unterricht-digitalisieren/references/fachbaustein-ggk.md` ergänzt (auf sie verweisen auch Skills im Bau-Plugin).
- **0.1.0, 26.10.2026:** Erste Fassung mit zwölf Skills.
