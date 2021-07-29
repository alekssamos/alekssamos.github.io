// ==UserScript==
// @name         fix aria hidden for display block dialog
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/eid.html
// @version      0.5
// @description  aria-hidden true but style display block, enable this dialogs
// @author       alekssamos
// @match        https://*
// @run-at document-start
// @icon         https://www.google.com/s2/favicons?domain=moneyman.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.setInterval(function(){
        let elems = document.querySelectorAll('div[role="dialog"][aria-hidden="true"]');
        for (let i=0; i < elems.length; i++) {
            //if(elems[i].getAttribute("style").indexOf("block")==-1) continue;
            elems[i].removeAttribute("aria-hidden");
        }
    }, 1000);
})();
