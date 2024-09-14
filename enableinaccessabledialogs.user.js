// ==UserScript==
// @name         fix aria hidden for display block dialog
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/eid.html
// @version      0.12
// @description  aria-hidden true, enable this dialogs
// @author       alekssamos
// @include        https://*.*
// @include        https://*.*.*
// @include        http://*.*
// @include        http://*.*.*
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
        document.querySelectorAll("label[for]").forEach(el=>{
            let inp = document.getElementById(el.getAttribute('for'));
            if(!inp || inp.getAttribute("type")!="checkbox") return true;
            if(el.getAttribute('role')!="checkbox")
                inp.addEventListener('change', event=>{el.setAttribute('aria-checked', inp.checked?'true':'false');});
            el.setAttribute('role', 'checkbox');
            el.setAttribute('tabindex', '0');
            el.setAttribute('aria-checked', inp.checked?'true':'false');
        });
        document.querySelectorAll("Button.checked").forEach(function(btn){
            let _attr = btn.getAttribute('aria-pressed');
            let _pb = btn.parentNode.parentNode;
            if(_attr==='true' || _attr==='false') return true;
            _pb.addEventListener('click', event=>{btn.setAttribute('aria-pressed', btn.classList.contains("checked")?'true':'false');});
            btn.setAttribute('aria-pressed', btn.classList.contains("checked")?'true':'false');
        });
    }, 500);
})();
