// ==UserScript==
// @name         boo.world clickable elements accessibility
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/boo.html
// @version      0.14
// @description  There is an empty label in the pressed elements and even the left-right arrows on the computer cannot be focused and pressed, and even more so on smartphones. And also makes the states and roles of elements available.
// @author       alekssamos
// @include        https://boo.world/*
// @run-at document-start
// @grant        none
// ==/UserScript==

var passingElements = function() {
	let msgl = document.querySelector("div#messagesList");
	if(msgl && msgl.getAttribute('aria-live') != 'polite') {
		msgl.setAttribute('aria-live', 'polite');
	}
	
	document.querySelectorAll(".clickable, #moreOptionsIcons").forEach(elem=>{
		with(elem) {
			if(classList.contains("bubble")) {
				setAttribute("aria-pressed", classList.contains("interest-highlighted")?"true":"false");
			}
			if(outerHTML.indexOf("onclick")!=-1 && getAttribute("onclick").indexOf("likeContent")!=-1) {
				setAttribute("aria-pressed", (getAttribute("onclick").indexOf("true")!=-1)?"true":"false");
			}
			if(getAttribute("role") != "button") {
				setAttribute("aria-live", "off");
				setAttribute("role", "button");
				setAttribute("tabindex", "0");
				if((innerText?innerText:textContent).trim() == "" && getAttribute("onclick").length > 8) {
					setAttribute("aria-label", getAttribute("onclick"));
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
