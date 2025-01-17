// ==UserScript==
// @name         fix aria hidden for display block dialog
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/eid.html
// @version      0.22
// @description  aria-hidden true, enable this dialogs
// @author       alekssamos
// @include        https://*.*/*
// @include        https://*.*.*/*
// @include        https://*.*.*.*/*
// @include        http://*.*/*
// @include        http://*.*.*/*
// @include        http://*.*.*.*/*
// @run-at document-start
// @grant        none
// ==/UserScript==

/*
Я решил из этого скрипта сделать универсальный код, который охватывает как можно больше случаев, как можно больше сайтов.
*/

(function() {
    /* 'use strict'; */

    window.setInterval(function(){
        if (document.domain == "vk.com") {
            /* для VK у меня просто есть отдельный скрипт, скрывающий текстовые поля и фреймы в начале */
            return false;
        }

        document.querySelectorAll('*[aria-hidden="true"]').forEach(elem=>{
            elem.removeAttribute("aria-hidden");
        });
        
        
        
/*<vdsina>*/
        document.querySelectorAll('span.btn').forEach(elem=>{
            if(elem.getAttribute("role")=="button") return true;
            elem.setAttribute("role", "button");
            elem.setAttribute("tabindex", "0");
        });
        
function set_menu_clickable_from_keyboard(elem){
	elem.setAttribute("tabindex", "0");
	elem.setAttribute("role", "menuitemradio");
	if(elem.parentNode.getAttribute("role")!="menu") {
		elem.parentNode.setAttribute("role", "menu");
		elem.parentNode.setAttribute("tabindex", "-1");
	}
}
document.querySelectorAll('div[class*="disabled"]').forEach(elem=>{
	with(elem){
		let d = getAttribute("aria-disabled");
		if(d!="true" && d!="false") {
			setAttribute("aria-disabled", "true");
			set_menu_clickable_from_keyboard(elem);
			addEventListener("onclick", event=>{
				let has_disabled=(getAttribute("class").indexOf("disabled")!=-1)?"true":"false";
				setAttribute("aria-disabled", has_disabled);
			});
		}
	}
});
document.querySelectorAll('div[class*="selected"]').forEach(elem=>{
	with(elem){
		let d = getAttribute("aria-checked");
		if(d!="true" && d!="false") {
			setAttribute("aria-checked", "true");
			set_menu_clickable_from_keyboard(elem);
			addEventListener("onclick", event=>{
				let has_selected=(getAttribute("class").indexOf("selected")!=-1)?"true":"false";
				setAttribute("aria-checked", has_selected);
			});
		}
	}
});
/*</vdsina>*/

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
        document.querySelectorAll("button.checked").forEach(function(btn){
            let _attr = btn.getAttribute('aria-pressed');
            let _pb = btn.parentNode.parentNode;
            if(_attr==='true' || _attr==='false') return true;
            _pb.addEventListener('click', event=>{btn.setAttribute('aria-pressed', btn.classList.contains("checked")?'true':'false');});
            btn.setAttribute('aria-pressed', btn.classList.contains("checked")?'true':'false');
        });
    }, 700);
})();
