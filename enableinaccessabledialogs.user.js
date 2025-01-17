// ==UserScript==
// @name         fix aria hidden for display block dialog
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/eid.html
// @version      0.24
// @description  aria-hidden true, enable this dialogs
// @author       alekssamos
// @include        *://*nalog.ru/*
// @include        https://*rutube.ru/*
// @include        https://*apple.com/*
// @include        https://*icloud.com/*
// @include        *://*alekssamosbt.ru/*
// @run-at document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.setInterval(function(){
        document.querySelectorAll('*[aria-hidden="true"]').forEach(elem=>{
            elem.removeAttribute("aria-hidden");
        });
    }, 700);
})();
