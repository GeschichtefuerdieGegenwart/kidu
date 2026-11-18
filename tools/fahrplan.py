#!/usr/bin/env python3
"""Fahrpläne aus je einer Quelle: »Digitaler Unterricht« (ab Version 4.42) und »KI-Training« (ab 4.47).

Entscheidung Mario, 14.11.2026: Weg B der Recherche »Werkzeugseiten: Wo bin ich?« – oben eine Zeile, unten der ganze Fahrplan.
Quelle: src/fahrplan.json (vier Phasen, alle Werkzeuge). tools/bauen.py ersetzt damit diese Zeichen im Seiteninhalt:

  <!-- fahrplan:zeile -->         oben auf jeder Werkzeugseite: »Fahrplan Digitaler Unterricht › 2 · Digitalen Unterricht erstellen (vor der Stunde)«
  <!-- fahrplan:fuss -->          unten: »Auch vor der Stunde« (die anderen Werkzeuge der Phase) und »Der Fahrplan« mit »Du bist hier«
  <!-- fahrplan:liste:ID -->      auf der Bereichsseite: die Werkzeuge der Phase ID
  <!-- fahrplan:zahl:ID -->       auf der Bereichsseite: »n Werkzeuge« im Kopf der Phase

»weit« hinter zeile oder fuss (<!-- fahrplan:zeile weit -->) stellt beide in die weite Hülle (Screen-Width Rule).
Alles steht fertig im HTML – ohne Skript im Browser. tools/pruefen.py prüft, dass jede Werkzeugseite beide Zeichen trägt.

Ab 4.47 (Entscheidung Mario, 17.11.2026: das KI-Training so übersichtlich wie den Digitalen Unterricht) gibt es einen zweiten
Fahrplan: src/fahrplan-ki.json mit der Bereichsseite ki.html. Seine Zeichen heißen gleich, nur mit »kiplan« statt »fahrplan«
(<!-- kiplan:zeile -->, <!-- kiplan:fuss -->, <!-- kiplan:liste:ID -->, <!-- kiplan:zahl:ID -->).
Ein Werkzeug mit »zuhause« gehört zum anderen Fahrplan: Es steht in der Liste, seine Seite trägt aber die Zeichen des anderen.
»marken« sind kurze Hinweise unter dem Text (»geht ohne KI«, »auch auf Papier«).
"""
import html
import json
import re
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
# Art des Zeichens → Quelle, Bereichsseite, Titel. Die Art steht vorn im Zeichen: <!-- fahrplan:… --> oder <!-- kiplan:… -->.
PLAENE = {
    "fahrplan": ("fahrplan.json", "unterricht.html", "Fahrplan Digitaler Unterricht"),
    "kiplan": ("fahrplan-ki.json", "ki.html", "Fahrplan KI-Training"),  # ab 4.47
}
QUELLE = WURZEL / "src" / "fahrplan.json"
BEREICH = "unterricht.html"


def laden(art="fahrplan"):
    datei, bereich, titel = PLAENE[art]
    daten = json.loads((WURZEL / "src" / datei).read_text(encoding="utf-8"))
    daten.update(_art=art, _bereich=bereich, _titel=titel, _quelle=f"src/{datei}")
    for w in daten["werkzeuge"]:
        w["_bereich"] = bereich
        w["_zeiten"] = daten.get("zeiten", {})  # ab 4.48: Wörter für »zeit«
    return daten


def alle_laden():
    return {art: laden(art) for art in PLAENE}


def e(text):
    return html.escape(text, quote=False)


def seite(href):
    """Datei ohne Sprungmarke: »tablet-phasen.html#t-karte« → »tablet-phasen.html«."""
    return href.split("#")[0]


def heimat(daten, datei):
    """Phase und Werkzeug einer Seite – auch für Unterseiten (selbstcheck.html gehört zum Digital-Check)."""
    for w in daten["werkzeuge"]:
        if w.get("zuhause"):  # gehört zum anderen Fahrplan
            continue
        if seite(w["href"]) == datei and "#" not in w["href"]:
            return w, None
        if datei in w.get("unterseiten", []):
            return w, w
    return None, None


def phase(daten, pid):
    return next(p for p in daten["phasen"] if p["id"] == pid)


def anker(p):
    return f"phase-{p['id']}"


def hinweise(w):
    """Ab 4.47 »marken«, ab 4.48 davor »zeit« (geschätzt): eine kleine Zeile unter dem Text, z. B. »kurz · geht ohne KI«."""
    zeiten = w.get("_zeiten", {})
    zeit = w.get("zeit")
    zeit = [zeit] if isinstance(zeit, str) else (zeit or [])
    teile = []
    if zeit:
        teile.append(" oder ".join(zeiten.get(z, z) for z in zeit))
    teile += w.get("marken", [])
    if not teile:
        return ""
    return '<span class="fahrplan-marken">' + " · ".join(e(t) for t in teile) + "</span>"


def faehig_attr(w, auf_bereichsseite):
    """Ab 4.48: auf der Bereichsseite die Fähigkeiten, die das Werkzeug übt – für den Filter (assets/ki-faehig.js)."""
    if auf_bereichsseite and w.get("faehigkeiten"):
        return f' data-faehigkeiten="{" ".join(w["faehigkeiten"])}"'
    return ""


def werkzeug_eintrag(w, auf_bereichsseite):
    href = w["href"]
    text = w["text"]
    bereich = w.get("_bereich", BEREICH)
    if auf_bereichsseite and href.startswith(bereich + "#"):
        href = href[len(bereich):]
    elif not auf_bereichsseite and w.get("text_anderswo"):
        text = w["text_anderswo"]
    fuer = f' <span class="fahrplan-fuer">{e(w["fuer"])}</span>' if w.get("fuer") else ""
    return f'<li{faehig_attr(w, auf_bereichsseite)}><a href="{href}"><b>{e(w["name"])}</b>{fuer}<span class="fahrplan-text">{e(text)}</span>{hinweise(w)}</a></li>'


def liste(eintraege, auf_bereichsseite, einzug):
    zeilen = "".join(f"\n{einzug}  {werkzeug_eintrag(w, auf_bereichsseite)}" for w in eintraege)
    return f'<ul class="fahrplan-werkzeuge">{zeilen}\n{einzug}</ul>'


def gruppiert(eintraege, auf_bereichsseite, einzug, ebene):
    """Phase 4: Für dich · Im Kollegium · Zum Weitergeben (leere Gruppen fallen weg)."""
    gruppen = []
    for w in eintraege:
        if not gruppen or gruppen[-1][0] != w["gruppe"]:
            gruppen.append((w["gruppe"], w.get("gruppe_id"), []))
        gruppen[-1][2].append(w)
    teile = []
    for name, gid, ws in gruppen:
        kennung = f' id="{gid}"' if gid and auf_bereichsseite else ""
        teile.append(f'{einzug}<div class="fahrplan-gruppe">\n{einzug}  <{ebene}{kennung}>{e(name)}</{ebene}>\n'
                     f'{einzug}  {liste(ws, auf_bereichsseite, einzug + "  ")}\n{einzug}</div>')
    return "\n".join(teile)


# ---------------------------------------------------------------- Bereichsseite

def tuer_eintrag(w, einzug, klasse="werkzeug tuer"):
    ueber = f'<span class="tuer-ueber">{e(w["tuer"])}</span>' if w.get("tuer") else ""
    fuer = f' <span class="fahrplan-fuer">{e(w["fuer"])}</span>' if w.get("fuer") else ""
    return (f'{einzug}  <li class="{klasse}"{faehig_attr(w, True)}>\n{einzug}    <a href="{w["href"]}">\n'
            f'{einzug}      <span class="werkzeug-text">{ueber}<b>{e(w["name"])}</b>{fuer}{e(w["text"])}{hinweise(w)}</span>\n'
            f'{einzug}      <span class="werkzeug-los" aria-hidden="true">→</span>\n{einzug}    </a>\n{einzug}  </li>')


def kette(daten, ws, einzug):
    """Ab 4.46: die Werkzeuge einer Phase als Kette (»schritt«: zuerst · dann · dazu · schluss), Entscheidung Mario 17.11.2026.
    Ein geordnetes <ol>: jeder Schritt hat sein Wort (Zuerst, Dann, Dazu, Zum Schluss). »zuerst« steht als breite Tür über den
    zwei Türen von »dann« – die Papierfrage kommt vor jeder Planung; »dazu« und »schluss« stehen als Liste wie bisher."""
    worte = daten.get("schritte", {})
    reihe = []
    for w in ws:
        if not reihe or reihe[-1][0] != w["schritt"]:
            reihe.append((w["schritt"], []))
        reihe[-1][1].append(w)
    teile = []
    for schritt, gruppe in reihe:
        if schritt == "zuerst":
            inhalt = (f'<ul class="werkzeuge vorab">\n' + "\n".join(tuer_eintrag(w, einzug + "    ") for w in gruppe)
                      + f'\n{einzug}    </ul>')
        elif any(w.get("tuer") for w in gruppe):
            t = []
            for i, w in enumerate(gruppe):
                if i:
                    t.append(f'{einzug}      <li class="tueren-oder" aria-hidden="true">oder</li>')
                t.append(tuer_eintrag(w, einzug + "    "))
            inhalt = '<ul class="werkzeuge tueren">\n' + "\n".join(t) + f"\n{einzug}    </ul>"
        else:
            inhalt = liste(gruppe, True, einzug + "    ")
        teile.append(f'{einzug}  <li class="fahrplan-schritt ist-{schritt}">\n'
                     f'{einzug}    <p class="fahrplan-schritt-wort">{e(worte.get(schritt, schritt))}</p>\n'
                     f'{einzug}    {inhalt}\n{einzug}  </li>')
    return '<ol class="fahrplan-kette">\n' + "\n".join(teile) + f"\n{einzug}</ol>"


def bereich_liste(daten, pid):
    ws = [w for w in daten["werkzeuge"] if w["phase"] == pid]
    einzug = "          "
    if any(w.get("gruppe") for w in ws):
        return gruppiert(ws, True, einzug, "h4").lstrip()
    if any(w.get("schritt") for w in ws):
        return kette(daten, ws, einzug)
    tueren = [w for w in ws if w.get("tuer")]
    rest = [w for w in ws if not w.get("tuer")]
    teile = []
    if tueren:
        t = []
        for i, w in enumerate(tueren):
            if i:
                t.append(f'{einzug}  <li class="tueren-oder" aria-hidden="true">oder</li>')
            t.append(tuer_eintrag(w, einzug))  # ab 4.48 dieselbe Tür wie in der Kette, mit Hinweisen und Fähigkeiten
        teile.append('<ul class="werkzeuge tueren">\n' + "\n".join(t) + f"\n{einzug}</ul>")
        teile.append('<p class="fahrplan-dazu">Dazu, wenn du willst:</p>')
    teile.append(liste(rest, True, einzug))
    return f"\n{einzug}".join(teile)


def bereich_zahl(daten, pid):
    n = sum(1 for w in daten["werkzeuge"] if w["phase"] == pid)
    return f'<span class="fahrplan-zahl">{n} Werkzeug{"" if n == 1 else "e"}</span>'


# ---------------------------------------------------------------- Werkzeugseiten

def zeile(daten, datei, weit=False):
    w, eltern = heimat(daten, datei)
    if not w:
        raise SystemExit(f"fahrplan: {datei} trägt <!-- {daten['_art']}:zeile -->, steht aber nicht in {daten['_quelle']}")
    p = phase(daten, w["phase"])
    weg = ' class="ort-weg"' if eltern else ""  # am Telefon steht nur der letzte Schritt, mit »‹« davor
    bereich = daten["_bereich"]
    teile = [f'<li class="ort-weg"><a href="{bereich}#fahrplan">{e(daten["_titel"])}</a></li>',
             f'<li{weg}><a href="{bereich}#{anker(p)}">{p["nr"]} · {e(p["name"])}</a> <span class="ort-wann">({e(p["wann"])})</span></li>']
    if eltern:
        teile.append(f'<li><a href="{eltern["href"]}">{e(eltern["name"])}</a></li>')
    huelle = "huelle huelle-weit" if weit else "huelle"
    return (f'<nav class="ort-zeile" aria-label="Wo du bist"><div class="{huelle}">'
            f'<ol>{"".join(teile)}</ol></div></nav>')


def fuss(daten, datei, weit=False):
    w, eltern = heimat(daten, datei)
    if not w:
        raise SystemExit(f"fahrplan: {datei} trägt <!-- {daten['_art']}:fuss -->, steht aber nicht in {daten['_quelle']}")
    bereich = daten["_bereich"]
    p = phase(daten, w["phase"])
    eigen = seite(w["href"])
    nachbarn = [x for x in daten["werkzeuge"] if x["phase"] == p["id"] and seite(x["href"]) != eigen]
    if eltern:  # Unterseite: das Werkzeug selbst gehört zu »Auch …«, damit der Weg zurück unten steht
        nachbarn = [x for x in daten["werkzeuge"] if x["phase"] == p["id"] and seite(x["href"]) != datei]
    einzug = "    "
    auch = ""
    if nachbarn:
        if any(x.get("gruppe") for x in nachbarn):
            inhalt = (f'{einzug}<div class="fahrplan-fuss-gruppen">\n{gruppiert(nachbarn, False, einzug + "  ", "h3")}\n{einzug}</div>')
        else:
            inhalt = f"{einzug}{liste(nachbarn, False, einzug)}"
        auch = (f'\n  <div class="fahrplan-fuss-auch">\n    <h2 class="fahrplan-fuss-titel">{e(p["auch"])}</h2>\n'
                f'{inhalt}\n  </div>')
    zeilen = []
    for q in daten["phasen"]:
        klassen = []
        if q["nr"] == 1:
            klassen.append("ist-vorspann")
        if q["nr"] % 2 == 0:
            klassen.append("ist-zart")
        if q["nr"] == 2:
            klassen.append("ist-ring-start")
        elif q["nr"] == 3:
            klassen.append("ist-ring-mitte")
        elif q["nr"] == 4:
            klassen.append("ist-ring-ende")
        hier = q["id"] == p["id"]
        if hier:
            klassen.append("ist-hier")
        zusatz = ('<b class="fahrplan-klein-hier">Du bist hier</b>' if hier
                  else f'<span class="fahrplan-klein-wann">{e(q["wann"])}</span>')
        aktuell = ' aria-current="location"' if hier else ""
        zeilen.append(f'      <li class="{" ".join(klassen)}"><a href="{bereich}#{anker(q)}"{aktuell}>'
                      f'<span class="fahrplan-klein-nr" aria-hidden="true">{q["nr"]}</span>'
                      f'<span class="fahrplan-klein-platte"><span class="fahrplan-klein-name"><span class="sr-only">{q["nr"]} · </span>{e(q["name"])}</span>{zusatz}</span></a></li>')
    huelle = "huelle huelle-weit" if weit else "huelle"
    return (f'<nav class="fahrplan-fuss" aria-label="{e(daten["_titel"])}"><div class="{huelle} fahrplan-fuss-innen">{auch}\n'
            f'  <div class="fahrplan-fuss-plan">\n    <h2 class="fahrplan-fuss-titel">Der Fahrplan</h2>\n'
            f'    <ol class="fahrplan-klein">\n' + "\n".join(zeilen) + '\n    </ol>\n'
            f'    <p class="fahrplan-ring"><span class="fahrplan-ring-pfeil" aria-hidden="true">↑</span> '
            f'Nach der Stunde geht es mit der nächsten Stunde wieder bei 2 weiter.</p>\n'
            f'    <p class="fahrplan-fuss-alle"><a class="textlink" href="{bereich}#fahrplan">Alle Werkzeuge im Fahrplan <span aria-hidden="true">→</span></a></p>\n'
            f'  </div>\n</div></nav>')


ZEICHEN = re.compile(r"<!-- (fahrplan|kiplan):(zeile|fuss|liste|zahl)(?::([a-z]+))?( weit)? -->")


def einsetzen(inhalt, datei, daten=None):
    """Ersetzt alle Fahrplan-Zeichen im Seiteninhalt. Seiten ohne Zeichen bleiben, wie sie sind.
    daten: die Daten eines Fahrplans (laden()) oder aller (alle_laden()); fehlt, was gebraucht wird, wird es geladen."""
    if "<!-- fahrplan:" not in inhalt and "<!-- kiplan:" not in inhalt:
        return inhalt
    plaene = {}
    if daten and "phasen" in daten:
        plaene[daten.get("_art", "fahrplan")] = daten
    elif daten:
        plaene.update(daten)

    def ersetze(m):
        plan, art, pid, weit = m.group(1), m.group(2), m.group(3), bool(m.group(4))
        if plan not in plaene:
            plaene[plan] = laden(plan)
        d = plaene[plan]
        if art == "zeile":
            return zeile(d, datei, weit)
        if art == "fuss":
            return fuss(d, datei, weit)
        if art == "liste":
            return bereich_liste(d, pid)
        return bereich_zahl(d, pid)

    neu = ZEICHEN.sub(ersetze, inhalt)
    rest = re.findall(r"<!-- (?:fahrplan|kiplan):[^>]*-->", neu)
    if rest:
        raise SystemExit(f"fahrplan: unbekanntes Zeichen in {datei}: {rest}")
    return neu


if __name__ == "__main__":
    d = laden()
    for w in d["werkzeuge"]:
        print(w["phase"], w["href"])
