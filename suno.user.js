// ==UserScript==
// @name         Suno accessibility
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/suno.html
// @version      0.1
// @description  Fixing accessibility for screen reader programs
// @author       alekssamos
// @include        https://*.suno.com/*
// @include        https://suno.com/*
// @run-at document-start
// @grant        none
// ==/UserScript==

window.setInterval(function(){
 document.querySelectorAll("*[aria-hidden], div.react-aria-GridList, div.react-aria-GridList div[aria-label], div.react-aria-GridList div[role]").forEach(function(el){
  el.removeAttribute("aria-hidden");
  el.removeAttribute("role");
  el.removeAttribute("aria-label");
 });
},100);
