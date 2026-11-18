/* Kidu – Fähigkeiten als Filter über dem Fahrplan »KI-Training« (ki.html; Band ab 4.47, Filter ab 4.48,
   Entscheidung Mario 17.11.2026; Grundlage: Recherche »KI-Training für heterogene Kollegien«, Matrix ohne Rangfolge).
   Ohne Skript bleibt das Band ein ruhiger Text. Mit Skript wird jede Fähigkeit ein Schalter (aria-pressed):
   - Antippen hebt im Fahrplan die Werkzeuge hervor, die sie üben (data-faehigkeiten aus src/fahrplan-ki.json). Jedes trägt
     dann »übt: …« als Text – Farbe nie allein. Die Phasen mit Treffern gehen auf, die anderen zu.
   - Über dem Fahrplan steht, was hervorgehoben ist, mit »Aufheben«. Die Seite springt dorthin (bei »weniger Bewegung« ohne Gleiten).
   - Noch einmal antippen oder »Aufheben«: alles wie vorher, auch welche Phasen offen waren.
   Nichts wird gespeichert, nichts bewegt sich von selbst. */
(function () {
  "use strict";
  var band = document.querySelector(".ki-faehig-liste"), plan = document.getElementById("fahrplan");
  if (!band || !plan) return;
  var platten = [].slice.call(plan.querySelectorAll("details.fahrplan-platte"));
  var leiste = document.querySelector(".fahrplan-leiste");
  var hilfe = document.querySelector(".ki-faehig-hilfe");
  var aktiv = "", vorher = null;

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ruhig() { return document.documentElement.getAttribute("data-bewegung") === "weniger" || matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* Die Zeile über dem Fahrplan: was hervorgehoben ist, mit »Aufheben«. */
  var stand = document.createElement("p");
  stand.className = "ki-filter-stand";
  stand.id = "ki-filter-stand";
  stand.tabIndex = -1;
  stand.hidden = true;
  var ansage = document.createElement("p");
  ansage.className = "sr-only";
  ansage.setAttribute("aria-live", "polite");
  if (leiste) { leiste.parentNode.insertBefore(stand, leiste.nextSibling); leiste.parentNode.insertBefore(ansage, stand); }

  /* Aus jeder Fähigkeit wird ein Schalter; Name und Frage bleiben, wie sie sind. */
  [].forEach.call(band.querySelectorAll("li[data-faehigkeit]"), function (li) {
    var k = document.createElement("button");
    k.type = "button";
    k.className = "ki-faehig-knopf";
    k.setAttribute("aria-pressed", "false");
    k.setAttribute("aria-controls", "fahrplan");
    k.setAttribute("data-faehigkeit", li.getAttribute("data-faehigkeit"));
    while (li.firstChild) k.appendChild(li.firstChild);
    li.appendChild(k);
  });
  band.classList.add("mit-filter");
  if (hilfe) hilfe.hidden = false;

  function name(id) { var b = band.querySelector('li[data-faehigkeit="' + id + '"] b'); return b ? b.textContent : id; }
  function uebt(li, id) { return (" " + (li.getAttribute("data-faehigkeiten") || "") + " ").indexOf(" " + id + " ") > -1; }

  function setze(id) {
    [].forEach.call(plan.querySelectorAll(".ist-treffer"), function (li) { li.classList.remove("ist-treffer"); });
    [].forEach.call(plan.querySelectorAll(".fahrplan-uebt"), function (m) { m.parentNode.removeChild(m); });
    [].forEach.call(band.querySelectorAll(".ki-faehig-knopf"), function (k) { k.setAttribute("aria-pressed", k.getAttribute("data-faehigkeit") === id ? "true" : "false"); });
    if (!id) {
      if (vorher) platten.forEach(function (d, i) { d.open = vorher[i]; });
      vorher = null; aktiv = "";
      plan.classList.remove("mit-filter");
      stand.hidden = true; stand.innerHTML = "";
      ansage.textContent = "Hervorhebung aufgehoben.";
      return;
    }
    if (!aktiv) vorher = platten.map(function (d) { return d.open; });
    aktiv = id;
    var treffer = [].filter.call(plan.querySelectorAll("li[data-faehigkeiten]"), function (li) { return uebt(li, id); });
    treffer.forEach(function (li) {
      li.classList.add("ist-treffer");
      var ziel = li.querySelector(".werkzeug-text") || li.querySelector("a");
      var m = document.createElement("span");
      m.className = "fahrplan-uebt";
      m.textContent = "übt: " + name(id);
      ziel.appendChild(m);
    });
    platten.forEach(function (d) { d.open = !!d.querySelector(".ist-treffer"); });
    plan.classList.add("mit-filter");
    var phasen = platten.filter(function (d) { return d.open; }).length, n = treffer.length;
    var satz = n + " Werkzeug" + (n === 1 ? "" : "e") + " in " + phasen + " Phase" + (phasen === 1 ? "" : "n") + " üben »" + name(id) + "«.";
    stand.innerHTML = '<span><b>Hervorgehoben:</b> ' + esc(satz) + '</span> <button type="button" class="knopf still ki-filter-aus" data-filter-aus>Aufheben</button>';
    stand.hidden = false;
    ansage.textContent = satz;
  }

  band.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest(".ki-faehig-knopf");
    if (!k) return;
    var id = k.getAttribute("data-faehigkeit");
    setze(aktiv === id ? "" : id);
    if (aktiv) {
      stand.scrollIntoView({ block: "start", behavior: ruhig() ? "auto" : "smooth" });
      stand.focus({ preventScroll: true });
    }
  });
  stand.addEventListener("click", function (e) {
    if (!(e.target.closest && e.target.closest("[data-filter-aus]"))) return;
    var war = aktiv;
    setze("");
    var k = band.querySelector('.ki-faehig-knopf[data-faehigkeit="' + war + '"]');
    if (k) k.focus();
  });
})();
