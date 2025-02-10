// ==UserScript==
// @name         various accessibility improvements for different sites
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/a11y.html
// @version      0.8
// @description  Making accessable checkboxes, buttons, and other elements on different sites.
// @author       alekssamos
// @include        *://*habr*/*
// @include        *://*phon*/*
// @include        *://*vdsina*/*
// @include        *://*funpay*/*
// @include        *://*nekto*/*
// @include        *://*keen*/*
// @include        *://*192.168*/*
// @include        *://*10.*/*
// @include        *://*172.*/*
// @run-at document-start
// @grant        none
// ==/UserScript==

/*
Я решил из этого скрипта сделать универсальный код, который охватывает как можно больше случаев, как можно больше сайтов.
*/

(function() {
/*<vdsina>*/
function set_menu_clickable_from_keyboard(elem){
	elem.setAttribute("tabindex", "0");
	elem.setAttribute("role", "menuitemradio");
	if(elem.parentNode.getAttribute("role")!="menu") {
		elem.parentNode.setAttribute("role", "menu");
		elem.parentNode.setAttribute("tabindex", "-1");
	}
}
if(document.domain.indexOf("vdsina")!=-1){
        document.querySelectorAll('span.btn').forEach(elem=>{
            if(elem.getAttribute("role")=="button") return true;
            elem.setAttribute("role", "button");
            elem.setAttribute("tabindex", "0");
        });
        
    window.setInterval(function(){
document.querySelectorAll('div[class*="disabled"]').forEach(elem=>{
	with(elem){
		let d = getAttribute("aria-disabled");
		if(d!="true" && d!="false") {
			setAttribute("aria-disabled", "true");
			set_menu_clickable_from_keyboard(elem);
			parentNode.parentNode.addEventListener("onclick", event=>{
				window.setTimeout(()=>{ setAttribute("aria-disabled", classList.contains("disabled")?"true":"false"); },100);
			});
		}
	}
});
document.querySelectorAll('div.selected, div[class*="-list-item"]').forEach(elem=>{
	with(elem){
		if(getAttribute("class").indexOf("list-item-down")!=-1) return;
		if(getAttribute("class").indexOf("twi")!=-1) return;
		if(getAttribute("class").indexOf("list-item-up")!=-1) return;
		if(classList.contains("groups")){
			if(getAttribute("tabindex")!="0"){
				parentNode.parentNode.addEventListener("onclick", event=>{
					window.setTimeout(()=>{ setAttribute("aria-expanded", classList.contains("selected")?"true":"false"); }, 100);
				});
			}
			setAttribute("tabindex", "0");
			setAttribute("role", "button");
			setAttribute("aria-expanded", classList.contains("selected")?"true":"false");
			return;
		}
		let d = getAttribute("aria-checked");
		if(d!="true" && d!="false") {
			setAttribute("aria-checked", classList.contains("selected")?"true":"false");
			set_menu_clickable_from_keyboard(elem);
			parentNode.parentNode.addEventListener("onclick", event=>{
				window.setTimeout(()=>{ setAttribute("aria-checked", classList.contains("selected")?"true":"false"); }, 100);
			});
		}
	}
});
}
},700);
/*</vdsina>*/
    window.setInterval(function(){
        document.querySelectorAll("label").forEach(el=>{
            let checkbox_id = el.getAttribute('for');
            var inp=undefined;
            if(!!checkbox_id) {
                inp = document.getElementById(checkbox_id);
            } else {
                inp = el.querySelector('input[type="checkbox"], input[type="Radio"]');
            }
            if(!inp) {
                let _tmp_inp = el.previousElementSibling;
                if(_tmp_inp.tagName.toLowerCase()=="input" && _tmp_inp.id=="") {
                    inp = _tmp_inp;
                }
            }
            if(!inp) return true;
            if(getComputedStyle(inp).display!="none") return;
            var el_role = el.getAttribute('role');
            el_role=el_role?el_role.toLowerCase():"";
            if(el_role!="Radio" && el_role!="checkbox") {
                inp.addEventListener('change', event=>{el.setAttribute('aria-checked', inp.checked?'true':'false');});
            }
            if(inp.type=="Radio" || inp.type=="checkbox") {
                el.setAttribute('role', inp.type);
                el.setAttribute('tabindex', '0');
                el.setAttribute('aria-checked', inp.checked?'true':'false');
            }
        });
	},700);
    window.setInterval(function(){
        document.querySelectorAll("button.checked").forEach(function(btn){
            let _attr = btn.getAttribute('aria-pressed');
            let _pb = btn.parentNode.parentNode;
            if(_attr==='true' || _attr==='false') return true;
            _pb.addEventListener('click', event=>{btn.setAttribute('aria-pressed', btn.classList.contains("checked")?'true':'false');});
            btn.setAttribute('aria-pressed', btn.classList.contains("checked")?'true':'false');
        });
    }, 700);
})();
