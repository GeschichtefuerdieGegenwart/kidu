/* Kidu – Kern des Schlosses für den Bereich »Für die Fortbildungsleitung« (ab Version 4.46).
   Dieselbe Rechnung im Browser (assets/schloss.js) und beim Verschlüsseln (tools/schloss.mjs, Node 22 mit WebCrypto):
   AES-GCM 256, Schlüssel per PBKDF2-SHA-256 mit 600 000 Runden aus dem Passwort. Vorbild: das Lehrkraft-Schloss im GGK-Labor.
   Nichts wird übertragen. Weder Passwort noch Klartext stehen im Repository. Tests: tests/schloss.test.js */
(function (wurzel) {
  "use strict";
  var ITER = 600000, ALG = "AES-GCM-256/PBKDF2-SHA256";

  function krypto() { return wurzel.crypto && wurzel.crypto.subtle ? wurzel.crypto : null; }
  function b64(u8) {
    if (typeof Buffer !== "undefined") return Buffer.from(u8).toString("base64");
    var s = "";
    for (var i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192));
    return btoa(s);
  }
  function von(s) {
    if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(s, "base64"));
    var t = atob(s), u = new Uint8Array(t.length);
    for (var i = 0; i < t.length; i++) u[i] = t.charCodeAt(i);
    return u;
  }
  /* Groß- und Kleinschreibung zählen; Leerzeichen am Rand und doppelte Leerzeichen nicht (wie im GGK-Labor). */
  function passwortForm(p) { return String(p == null ? "" : p).normalize("NFC").trim().replace(/\s+/g, " "); }

  async function schluesselAusPasswort(pass, salzB64, iter) {
    var c = krypto(); if (!c) throw new Error("ohne WebCrypto");
    var salz = salzB64 ? von(salzB64) : c.getRandomValues(new Uint8Array(16));
    var km = await c.subtle.importKey("raw", new TextEncoder().encode(passwortForm(pass)), "PBKDF2", false, ["deriveBits"]);
    var roh = new Uint8Array(await c.subtle.deriveBits({ name: "PBKDF2", salt: salz, iterations: iter || ITER, hash: "SHA-256" }, km, 256));
    return { salt: b64(salz), roh: roh, iter: iter || ITER };
  }
  async function oeffne(d, roh) {
    var c = krypto(); if (!c) throw new Error("ohne WebCrypto");
    var key = await c.subtle.importKey("raw", roh, "AES-GCM", false, ["decrypt"]);
    return new TextDecoder().decode(await c.subtle.decrypt({ name: "AES-GCM", iv: von(d.iv) }, key, von(d.ct)));
  }
  async function verschliesse(text, schluessel) {
    var c = krypto(); if (!c) throw new Error("ohne WebCrypto");
    var key = await c.subtle.importKey("raw", schluessel.roh, "AES-GCM", false, ["encrypt"]);
    var iv = c.getRandomValues(new Uint8Array(12));
    var ct = new Uint8Array(await c.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, new TextEncoder().encode(text)));
    return { v: 1, alg: ALG, iter: schluessel.iter || ITER, salt: schluessel.salt, iv: b64(iv), ct: b64(ct) };
  }

  var api = { ITER: ITER, passwortForm: passwortForm, schluesselAusPasswort: schluesselAusPasswort, oeffne: oeffne, verschliesse: verschliesse, b64: b64, von: von };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.KIDU_SCHLOSS_KERN = api;
})(typeof window !== "undefined" ? window : globalThis);
