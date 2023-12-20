// ==UserScript==
// @name         Ridero checkboxes accessibility
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/Ridero.html
// @version      0.1
// @description  The checkboxes are drawn, they are not available for the blind. The script fixes this.
// @author       alekssamos
// @include        https://ridero.ru/*
// @include        https://*.ridero.ru/*
// @include        https://*.*.ridero.ru/*
// @run-at document-start
// @grant        none
// ==/UserScript==

function passing_checkboxes(){
	document.querySelectorAll("i.nf-checkbox_check").forEach(elem=>{
		console.log("elem1");
		elem.setAttribute("tabindex", "0");
		elem.setAttribute("role", "checkbox");
		let isChecked = elem.classList.contains("nf-checkbox_check__active");
		elem.setAttribute("aria-checked", isChecked?"true":"false");
	});
}

window.setInterval(passing_checkboxes, 500);

window.addEventListener("load", event=>{
	document.body.addEventListener("click", passing_checkboxes);
	passing_checkboxes();
});
