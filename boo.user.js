// ==UserScript==
// @name         boo.world clickable elements accessibility
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/boo.html
// @version      0.9
// @description  There is an empty label in the pressed elements and even the left-right arrows on the computer cannot be focused and pressed, and even more so on smartphones
// @author       alekssamos
// @include        https://boo.world/*
// @run-at document-start
// @grant        none
// ==/UserScript==

window.setInterval(()=>{
	let msgl = document.querySelector("div#messagesList");
	if(msgl && msgl.getAttribute('aria-live') != 'polite') {
		msgl.setAttribute('aria-live', 'polite');
	}
	document.querySelectorAll(".clickable, #moreOptionsIcons").forEach(elem=>{
		if(elem.getAttribute("role") != "button") {
			with(elem) {
				setAttribute("aria-live", "off");
				setAttribute("role", "button");
				setAttribute("tabindex", "0");
				if(classList.contains("bubble") && classList.contains("clickable")) {
					setAttribute("aria-pressed", classList.contains("interest-highlighted")?"true":"false");
				}
				if((innerText?innerText:textContent).trim() == "" && getAttribute("onclick").length > 8) {
					setAttribute("aria-label", getAttribute("onclick"));
				}
			}
		}
	});
}, 500);

document.body.addEventListener("click", event=>{
	with(event.target){
		if(classList.contains("bubble") && classList.contains("clickable")) {
			setAttribute("aria-pressed", classList.contains("interest-highlighted")?"true":"false");
			console.log("status check cchanged");
		}
	}
});
