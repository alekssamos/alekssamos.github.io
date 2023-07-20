// ==UserScript==
// @name         Donation Alerts accessibility
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/donationalerts.html
// @version      0.1
// @description  Fixing accessibility for screen reader programs
// @author       alekssamos
// @include        https://*.donationalerts.com/*
// @include        https://donationalerts.com/*
// @run-at document-start
// @grant        none
// ==/UserScript==

var passingElements = function() {
	document.querySelectorAll("div.b-popup").forEach(elem=>{
		with(elem){
			if(getAttribute("role")!="dialog" || classList.contains("_open")) {
				setAttribute("role", "dialog");
				setAttribute("tabindex", "-1");
				window.setTimeout(()=>{
					focus();
				}, 200);
			} else {
				removeAttribute("role");
				removeAttribute("tabindex");
			}
		}
	});

	document.querySelectorAll("div.b-popup__overlay, div.b-header__sign-up, div.da-ui--header__lang, span.user__switch-all").forEach(elem=>{
		with(elem){
			if(getAttribute("role")!="Button") {
				setAttribute("role", "Button");
				setAttribute("tabindex", "0");
				if(classList.contains("b-popup__overlay")) {
					setAttribute("aria-label", "Close");
				}
			}
		}
	});
};

window.setInterval(passingElements, 500);

window.addEventListener("load", (event)=>{
	document.body.addEventListener("click", passingElements);
	passingElements();
});
