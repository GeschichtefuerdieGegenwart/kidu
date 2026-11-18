/* Kidu – Startseite des KI-Trainings (ki.html, ab 4.50; Auftrag Mario 18.11.2026: »die Grundlogik zum Start von B«).
   Vier Karten, eine je Phase. Ohne Skript sind die Karten Sprünge, und alle Phasen stehen untereinander.
   Mit Skript:
   - Aus jeder Karte wird eine Schaltfläche (aria-expanded, aria-controls). Antippen öffnet die Phase darunter in voller Breite,
     eine zur Zeit; noch einmal antippen, »Schließen« oder Escape schließt sie. Die Adresse merkt sich die Phase (#phase-…).
   - Der Fokus geht auf die Überschrift der Phase. Bewegung (8 px, --dauer-mittel) nur nach Maus oder Finger, nicht per Tastatur,
     bei »weniger Bewegung« nur eine Überblendung (Input-First Rule).
   - Ein Sprung an eine Stelle in einer Phase (#stelle=…, #pk-…, #t-ki-kollegium) öffnet diese Phase.
   - Zum Drucken stehen alle Phasen da.
   window.KIPHASEN: offen() und zeige(ids) – für den Filter der Fähigkeiten (assets/ki-faehig.js), der mehrere Phasen zeigt. */
(function () {
  "use strict";
  var wahl = document.getElementById("ki-wahl"), plan = document.getElementById("fahrplan");
  if (!wahl || !plan) return;
  var PHASEN = [].slice.call(plan.querySelectorAll("section.ki-phase"));
  var IDS = PHASEN.map(function (p) { return p.id.replace(/^phase-/, ""); });
  function ruhig() { return document.documentElement.getAttribute("data-bewegung") === "weniger" || matchMedia("(prefers-reduced-motion: reduce)").matches; }

  [].forEach.call(wahl.querySelectorAll("a.ki-karte[data-phase]"), function (a) {
    var b = document.createElement("button"), id = a.getAttribute("data-phase");
    b.type = "button"; b.className = a.className; b.innerHTML = a.innerHTML;
    b.setAttribute("data-phase", id); b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "phase-" + id);
    a.parentNode.replaceChild(b, a);
  });
  function karte(id) { return wahl.querySelector('button[data-phase="' + id + '"]'); }
  [].forEach.call(plan.querySelectorAll("[data-phase-zu]"), function (k) { k.hidden = false; });
  plan.classList.add("mit-skript");

  var offen = [];
  function zeige(ids, wie) {
    wie = wie || {};
    ids = (Array.isArray(ids) ? ids : ids ? [ids] : []).filter(function (id) { return IDS.indexOf(id) > -1; });
    offen = ids;
    PHASEN.forEach(function (p, i) {
      var an = ids.indexOf(IDS[i]) > -1;
      p.hidden = !an;
      p.classList.remove("ki-einblenden");
      karte(IDS[i]).setAttribute("aria-expanded", String(an));
    });
    if (wie.adresse) {
      try { history.pushState({ phase: ids[0] || null }, "", ids.length === 1 ? "#phase-" + ids[0] : location.pathname + location.search); } catch (x) { /* ohne Verlauf weiter */ }
    }
    if (ids.length !== 1) return;
    var p = document.getElementById("phase-" + ids[0]);
    if (wie.bewegt) { void p.offsetWidth; p.classList.add("ki-einblenden"); }
    if (wie.fokus) p.querySelector("h3[tabindex]").focus({ preventScroll: true });
    if (wie.zeigen) {
      var oben = p.getBoundingClientRect().top;
      if (oben > window.innerHeight * 0.6 || oben < 0) p.scrollIntoView({ block: "start", behavior: wie.bewegt && !ruhig() ? "smooth" : "auto" });
    }
  }

  /* Welche Phase gehört zur Adresse? #phase-…, sonst die Phase, in der das Ziel steht (#stelle=kopf → #stelle-kopf). */
  function ausAdresse() {
    var h = "";
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (x) { h = location.hash.slice(1); }
    if (!h) return { id: null };
    var m = /^phase-([a-z]+)$/.exec(h);
    if (m && IDS.indexOf(m[1]) > -1) return { id: m[1] };
    var ziel = document.getElementById(h) || document.getElementById(h.replace("=", "-"));
    var p = ziel && ziel.closest && ziel.closest("section.ki-phase");
    return p ? { id: p.id.replace(/^phase-/, ""), ziel: ziel } : { id: null, bleibt: !!ziel };
  }
  function folgeAdresse() {
    var s = ausAdresse();
    if (s.bleibt) return;  // ein Ziel außerhalb der Phasen (z. B. #fahrplan): nichts schließen
    if (!(s.id && offen.length === 1 && offen[0] === s.id)) zeige(s.id);
    if (s.ziel) s.ziel.scrollIntoView({ block: "start" });
  }
  window.addEventListener("popstate", folgeAdresse);
  window.addEventListener("hashchange", folgeAdresse);

  wahl.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("button[data-phase]");
    if (!k) return;
    var id = k.getAttribute("data-phase");
    if (offen.length === 1 && offen[0] === id) zeige(null, { adresse: true });
    else zeige(id, { adresse: true, fokus: true, bewegt: e.detail > 0, zeigen: true });
  });
  plan.addEventListener("click", function (e) {
    var z = e.target.closest && e.target.closest("[data-phase-zu]");
    if (!z) return;
    var id = z.closest("section.ki-phase").id.replace(/^phase-/, "");
    zeige(null, { adresse: true });
    karte(id).focus();
  });
  /* Escape schließt die Phase – außer in einem Eingabefeld und solange im Aufgabenkoffer eine Stelle offen ist (die schließt zuerst).
     Im Einfangen, damit diese Prüfung vor dem Koffer läuft. */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || offen.length !== 1) return;
    if (e.target.closest && e.target.closest("textarea,input,select")) return;
    var buehne = document.getElementById("pkc-buehne");
    if (buehne && buehne.getAttribute("data-stelle") && buehne.closest("section.ki-phase") === document.getElementById("phase-" + offen[0])) return;
    var war = offen[0];
    zeige(null, { adresse: true });
    karte(war).focus();
  }, true);

  var vorher = null;
  window.addEventListener("beforeprint", function () { vorher = offen.slice(); PHASEN.forEach(function (p) { p.hidden = false; }); });
  window.addEventListener("afterprint", function () { if (vorher) zeige(vorher); vorher = null; });

  window.KIPHASEN = { offen: function () { return offen.slice(); }, zeige: function (ids) { zeige(ids); } };

  var start = ausAdresse();
  zeige(start.id);
  if (start.id) (start.ziel || document.getElementById("phase-" + start.id)).scrollIntoView({ block: "start" });
})();
