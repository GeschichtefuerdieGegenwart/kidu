/* Kidu – Schloss für den Bereich »Für die Fortbildungsleitung« (ab Version 4.46, Entscheidung Mario 17.11.2026).
   Der Inhalt steht verschlüsselt in der Seite (<script type="application/json" id="schloss-daten">, eingesetzt von tools/bauen.py
   aus schloss/<seite>.enc.json). Erst nach dem Passwort wird er entschlüsselt und eingesetzt.
   Nach dem Öffnen bleibt der abgeleitete Schlüssel bis zum Schließen des Tabs im sessionStorage (kidu.schluessel), damit die
   anderen Seiten des Bereichs ohne neue Eingabe öffnen. »Bereich schließen« entfernt ihn. Nichts wird übertragen.
   Braucht: KIDU_SCHLOSS_KERN (assets/schloss-kern.js). Vorbild: das Lehrkraft-Schloss im GGK-Labor. */
(function () {
  "use strict";
  var K = window.KIDU_SCHLOSS_KERN, ORT = "kidu.schluessel";
  var seite = document.querySelector("[data-schloss]");
  if (!seite) return;
  var tuer = document.getElementById("schloss-tuer"), inhalt = document.getElementById("schloss-inhalt"), zu = document.getElementById("schloss-zu");
  var form = document.getElementById("schloss-form"), feld = document.getElementById("schloss-pass"), meldung = document.getElementById("schloss-meldung");
  var knopf = form ? form.querySelector('button[type="submit"]') : null;

  function daten() { try { return JSON.parse(document.getElementById("schloss-daten").textContent); } catch (e) { return null; } }
  function merk() { try { return JSON.parse(window.sessionStorage.getItem(ORT) || "null"); } catch (e) { return null; } }
  function vergiss() { try { window.sessionStorage.removeItem(ORT); } catch (e) { /* ohne Speicher weiter */ } }
  function sag(t) { if (meldung) meldung.textContent = t; }

  function zeige(html) {
    inhalt.innerHTML = html;
    inhalt.hidden = false;
    tuer.hidden = true;
    if (zu) zu.hidden = false;
    document.documentElement.classList.add("schloss-offen");
    var ziel = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (ziel && inhalt.contains(ziel)) { ziel.scrollIntoView(); return; }
    var h = inhalt.querySelector("h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  }

  var d = daten();
  if (!d || !K || !(window.crypto && window.crypto.subtle)) {
    if (form) form.hidden = true;
    sag(d ? "Dieser Browser kann den Bereich hier nicht öffnen. Öffne die Seite über https oder in einem aktuellen Browser." : "Für diese Seite ist kein Inhalt hinterlegt.");
    return;
  }

  /* Mit dem Schlüssel aus dieser Sitzung öffnen, ohne neue Eingabe */
  var m = merk();
  if (m && m.salt === d.salt && m.k) {
    if (knopf) knopf.disabled = true;
    sag("Der Bereich wird geöffnet …");
    K.oeffne(d, K.von(m.k)).then(zeige, function () { vergiss(); if (knopf) knopf.disabled = false; sag(""); });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!feld.value.trim()) { sag("Bitte gib das Passwort ein."); feld.focus(); return; }
    knopf.disabled = true;
    sag("Wird geprüft …");
    K.schluesselAusPasswort(feld.value, d.salt, d.iter).then(function (s) {
      return K.oeffne(d, s.roh).then(function (html) {
        try { window.sessionStorage.setItem(ORT, JSON.stringify({ salt: d.salt, k: K.b64(s.roh) })); } catch (x) { /* ohne Speicher weiter */ }
        feld.value = "";
        sag("");
        zeige(html);
      });
    }).catch(function () {
      knopf.disabled = false;
      sag("Das Passwort passt nicht.");
      feld.focus(); feld.select();
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-schloss-zu]")) { vergiss(); location.reload(); }
  });
})();
