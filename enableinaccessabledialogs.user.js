// ==UserScript==
// @name         fix aria hidden for display block dialog
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/eid.html
// @version      0.7
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

    // Your code here...
    window.setInterval(function(){
        if (document.domain == "vk.com") {
            /* для VK у меня просто есть отдельный скрипт, скрывающий текстовые поля и фреймы в начале */
            return false;
        }
        let elems = document.querySelectorAll('*[aria-hidden="true"], *[aria-hidden="true"]');
        for (let i=0; i < elems.length; i++) {
            //if(elems[i].getAttribute("style").indexOf("block")==-1) continue;
            elems[i].removeAttribute("aria-hidden");
        }
    }, 1000);
})();
