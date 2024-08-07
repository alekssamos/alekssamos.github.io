// ==UserScript==
// @name     VK accessibility helper
// @version  7.2
// @noframes
// @grant    none
// @include     https://vk.com/*
// ==/UserScript==

(function(){
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
		if((event.target.tagName.toLowerCase()!='input') || (event.code!='ArrowDown' && event.code!='ArrowUp')) return true;
		window.setTimeout(function(){
			let cursel = document.querySelector('div.wddi_over');
			let curseltext = '';
			if(!cursel||cursel==undefined||cursel==null||cursel==false) return false;
			curseltext = cursel.innerText || cursel.textContent;
			aspeak(curseltext);
		}, 50);
		return true;
	});

	let _mainscr = function () {
		try {
			document.querySelector('div#utils').setAttribute('aria-hidden', 'true');
		} catch (er) {}
		try {
			document.querySelector('div#queue_transport_wrap').setAttribute('aria-hidden', 'true');
		} catch (er) {}
		try {
			document.querySelector('div#notifiers_wrap').setAttribute('aria-live', 'polite');
		} catch (er) {}
		try{
			var el,
			prevel,
			els = document.querySelectorAll('div.article_layer._article_layer');
			for (var i = 0; i < els.length; i++) {
				el = els[i];
				if(window.getComputedStyle(el).display=='none') {
					el.removeAttribute('data-focused');
					continue;
				}
				prevel=document.querySelector('div[data-focused="true"]');
				if(!!prevel&&prevel!=el) prevel.setAttribute('data-focused', 'false');
				el.setAttribute('tabindex', '0');
				el.setAttribute('role', 'dialog');
				if ((!document.querySelector('div[data-focused="false"], iframe[title="recaptcha challenge"]')) && ((!el.querySelector('*:focus')) || (el.getAttribute('data-focused') !== 'true' && el.getAttribute('data-focused') !== 'false'))) {
					el.setAttribute('data-focused', 'true');
					el.focus();
		}
				if(!prevel)
					el.setAttribute('data-focused', 'true');
			}
			els = document.querySelectorAll('div.im_msg_audiomsg, div.nim-peer--photo, div.im-mess--actions, div.post_media');
			for (var i = 0; i < els.length; i++) {
				el = els[i];
				el.setAttribute('aria-live', 'off');
			}
			els = document.querySelectorAll('div.like_share_about_select img');
			for (var i = 0; i < els.length; i++) {
				el = els[i];
				el.setAttribute('aria-live', 'off');
			}
			els = document.querySelectorAll('div.ui_toggler, span.ChatSettingsMembersEdit__actions');
			for (var i = 0; i < els.length; i++) {
				el = els[i];
				el.setAttribute('role', 'button');
				el.setAttribute('tabindex', '0');
				el.setAttribute('aria-pressed', el.classList.contains('on')?"true":"false");
			}
			els = document.querySelectorAll('div.checkbox');
			for (var i = 0; i < els.length; i++) {
				el = els[i];
				if(el.getAttribute('role')!='checkbox') el.setAttribute('data-mycheck', 'y');
				el.setAttribute('tabindex', '0');
				if(el.getAttribute('data-mycheck')!='y') break;
				el.setAttribute('role', 'checkbox');
				el.setAttribute('aria-checked', el.classList.contains('on')?'true':'false');
			}
			}catch(er){}
	};

	let mainscr = function () {
		window.setTimeout(_mainscr, 50);
		window.setTimeout(_mainscr, 100);
		window.setTimeout(_mainscr, 300);
		window.setTimeout(_mainscr, 500);
	};

	document.addEventListener('click', mainscr);
	document.addEventListener('scroll', mainscr);
	document.body.addEventListener('keyup', function(event){
		if(event.keyCode < 44) {
			mainscr();
		}
	});
	window.addEventListener('load', mainscr);
	mainscr();

/* var pageURLCheckTimer   = setInterval (
	function () {
		if (   this.lastPathStr  !== location.pathname
			|| this.lastQueryStr !== location.search
			|| (fireOnHashChangesToo && this.lastHashStr !== location.hash)
		) {
			this.lastPathStr  = location.pathname;
			this.lastQueryStr = location.search;
			this.lastHashStr  = location.hash;
			_mainscr();
		}
	}
	, 11
); */
})();
