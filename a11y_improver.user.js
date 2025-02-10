// ==UserScript==
// @name         various accessibility improvements for different sites
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/a11y.html
// @version      0.10
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
