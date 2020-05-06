// ==UserScript==
// @name     VK accessibility helper
// @version  3.1
// @grant    none
// @include     https://vk.com/*
// ==/UserScript==

let aspeak = function(msg) {
	let el = document.createElement('div');
	el.setAttribute('style', 'position:absolute; width:1px; height:1px; top:-999px; left:-999px;');
	el.setAttribute('role', 'status');
	el.setAttribute('aria-hidden', 'false');
	document.body.appendChild(el);
	window.setTimeout(function(){
		el.innerHTML = msg;
	}, 30);
	window.setTimeout(function () { document.body.removeChild(el); }, 1000);
};


document.addEventListener('keyup', function(event){
	if(event.target.tagName.toLowerCase()!='input') return false;
	window.setTimeout(function(){
		let cursel = document.querySelector('div.wddi_over');
		let curseltext = '';
		if(!cursel||cursel==undefined||cursel==null||cursel==false) return false;
		curseltext = cursel.innerText || cursel.textContent;
		aspeak(curseltext);
	}, 50);
});

window.setInterval(function () {
	try {
		let st=document.querySelector('a.im-page--dialogs-settings._im_dialogs_cog_settings');
		st.setAttribute('aria-label', 'Settings');
		st.setAttribute('tabindex', '0');
		st.setAttribute('onclick', st.getAttribute('onmouseover'));
	} catch (er) {}
	try {
		document.querySelector('div#queue_transport_wrap').setAttribute('aria-hidden', 'true');
	} catch (er) {}
	try {
		document.querySelector('div#notifiers_wrap').setAttribute('aria-live', 'polite');
	} catch (er) {}
	var el,
	els = document.querySelectorAll('div#wk_content, div#wl_post, div#pv_box, div.ap_layer_wrap div.ap_layer div.ap_layer__content, div[class*="popup_box"][tabindex="0"], div#box_layer_wrap.scroll_fix_wrap.fixed, div.article_layer._article_layer');
	for (var i = 0; i < els.length; i++) {
		el = els[i];
		el.setAttribute('tabindex', '0');
		el.setAttribute('role', 'dialog');
		if (el.getAttribute('data-focused') !== 'true')
			el.focus();
		el.setAttribute('data-focused', 'true');
		if (!!el.parentNode.querySelector('*:focus'))
			continue;
		if (!el.querySelector('div.audio_pl_snippet2'))
			el.focus();
	}
	els = document.querySelectorAll('div.im_msg_audiomsg, div.nim-peer--photo, div.im-mess--actions');
	for (var i = 0; i < els.length; i++) {
		el = els[i];
		el.setAttribute('aria-live', 'off');
	}
	els = document.querySelectorAll('div.like_share_about_select');
	for (var i = 0; i < els.length; i++) {
		el = els[i];
		el.setAttribute('aria-live', 'polite');
	}
}, 100);