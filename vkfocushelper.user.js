// ==UserScript==
// @name     VK accessibility helper
// @version  2.3
// @grant    none
// @include     https://vk.com/*
// ==/UserScript==

window.setInterval(function(){
	try { document.querySelector('div#queue_transport_wrap').setAttribute('aria-hidden', 'true'); } catch(er){}
	try { document.querySelector('div#notifiers_wrap').setAttribute('aria-live', 'polite'); } catch(er){}
	var el, els=document.querySelectorAll('div#wl_post, div#pv_box, div.ap_layer_wrap div.ap_layer div.ap_layer__content, div[class*="popup_box"][tabindex="0"], div#box_layer_wrap.scroll_fix_wrap.fixed, div.article_layer._article_layer');
	for(var i=0; i<els.length; i++){
		el=els[i];
		el.setAttribute('tabindex', '0');
		if(el.getAttribute('data-focused')!=='true') el.focus();
		el.setAttribute('data-focused', 'true');
		if(!!el.parentNode.querySelector('*:focus')) continue;
		el.setAttribute('role', 'dialog');
		if(el.className.indexOf('ap_layer__content')!=-1 && !document.querySelector('[class*="popup_box"]') && document.URL.indexOf('@')!=-1)
			el.focus();
	}
	els=document.querySelectorAll('div.im_msg_audiomsg, div.nim-peer--photo, div.im-mess--actions');
	for(var i=0; i<els.length; i++){
		el=els[i];
		el.setAttribute('aria-live', 'off');
	}
}, 100);
