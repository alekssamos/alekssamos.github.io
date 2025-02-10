/*<vdsina>*/


function set_menu_clickable_from_keyboard(elem) {
    elem.setAttribute("tabindex", "0");
    elem.setAttribute("role", "menuitemradio");

    if (elem.parentNode.getAttribute("role") != "menu") {
        elem.parentNode.setAttribute("role", "menu");
        elem.parentNode.setAttribute("tabindex", "-1");
    }
}

if (document.domain.indexOf("vdsina") != -1) {
    window.setInterval(function () {
        document.querySelectorAll('span.btn').forEach(elem => {
            if (elem.getAttribute("role") === "button") return;
            elem.setAttribute("role", "button");
            elem.setAttribute("tabindex", "0");
        });

        document.querySelectorAll('div[class*="disabled"]').forEach(elem => {
            let d = elem.getAttribute("aria-disabled");
            if (d !== "true" && d !== "false") {
                elem.setAttribute("aria-disabled", "true");
                set_menu_clickable_from_keyboard(elem);
                
                elem.parentNode.parentNode.addEventListener("click", function () {
                    window.setTimeout(() => {
                        elem.setAttribute("aria-disabled", elem.classList.contains("disabled") ? "true" : "false");
                    }, 100);
                });
            }
        });

        document.querySelectorAll('div.selected, div[class*="-list-item"]').forEach(elem => {
            if (elem.classList.contains("list-item-down") || elem.classList.contains("twi") || elem.classList.contains("list-item-up")) return;

            if (elem.classList.contains("groups")) {
                if (elem.getAttribute("tabindex") !== "0") {
                    elem.parentNode.parentNode.addEventListener("click", function () {
                        window.setTimeout(() => {
                            elem.setAttribute("aria-expanded", elem.classList.contains("selected") ? "true" : "false");
                        }, 100);
                    });
                }

                elem.setAttribute("tabindex", "0");
                elem.setAttribute("role", "button");
                elem.setAttribute("aria-expanded", elem.classList.contains("selected") ? "true" : "false");
                return;
            }

            let checkedState = elem.getAttribute("aria-checked");
            if (checkedState !== "true" && checkedState !== "false") {
                elem.setAttribute("aria-checked", elem.classList.contains("selected") ? "true" : "false");
                set_menu_clickable_from_keyboard(elem);

                elem.parentNode.parentNode.addEventListener("click", function () {
                    window.setTimeout(() => {
                        elem.setAttribute("aria-checked", elem.classList.contains("selected") ? "true" : "false");
                    }, 100);
                });
            }
        });
    }, 700);
}




/*</vdsina>*/
