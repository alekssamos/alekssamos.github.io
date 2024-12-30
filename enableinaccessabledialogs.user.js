// ==UserScript==
// @name         fix aria hidden for display block dialog
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/eid.html
// @version      0.18
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

(function() {
    'use strict';

    window.setInterval(function(){
        if (document.domain == "vk.com") {
            /* для VK у меня просто есть отдельный скрипт, скрывающий текстовые поля и фреймы в начале */
            return false;
        }

        document.querySelectorAll('*[aria-hidden="true"]').forEach(elem=>{
            elem.removeAttribute("aria-hidden");
        });
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
    }, 500);
})();
