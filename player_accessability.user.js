// ==UserScript==
// @name         player accessability
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  makes the play button available to the blind
// @author       alekssamos
// @match        https://*.oxfordonlinepractice.com/common-components/*
// @icon         https://www.google.com/s2/favicons?domain=oxfordonlinepractice.com
// @run-at document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    window.setInterval(function(){
        var el, elems = document.querySelectorAll('div.icondiv.stopPlay-icon');
        for (var i = 0; i < elems.length; i++) {
            el = elems[i];
            if (el.getAttribute('role') == 'button') {
                continue;
            }
            el.setAttribute('role', 'button');
            el.setAttribute('aria-label', 'play');
            el.setAttribute('tabindex', '0');
        }
    }, 500);
})();
