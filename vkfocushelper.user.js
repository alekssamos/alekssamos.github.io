// ==UserScript==
// @name     VK accessibility helper
// @version  1
// @grant    none
// @include     https://vk.com/*
// ==/UserScript==

window.setInterval(function(){
	var el, els=document.querySelectorAll('div.ap_layer_wrap div.ap_layer div.ap_layer__content, div[class*="popup_box"][tabindex="0"], div#box_layer_wrap.scroll_fix_wrap.fixed, div.article_layer _article_layer');
	for(var i=0; i<els.length; i++){
		el=els[i];
		if(!!el.parentNode.querySelector('*:focus')) continue;
		el.setAttribute('role', 'dialog');
		el.focus();
		el.setAttribute('tabindex', '0');
		el.setAttribute('onblur', 'this.focus();');
	}
}, 100);