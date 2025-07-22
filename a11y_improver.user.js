// ==UserScript==
// @name         various accessibility improvements for different sites
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/a11y.html
// @version      0.25
// @description  Making accessable checkboxes, buttons, and other elements on different sites.
// @author       alekssamos
// @include        *://*urals*/*
// @include        *://*habr*/*
// @include        https://*azbyk*/*
// @include        *://*pikabu*/*
// @include        *://*findcl*/*
// @include        *://*phon*/*
// @include        *://*star*/*
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

///////<
// для редактора постов пикабу
function pkb_sign_editor_ctrl_button(data_test, label) {
    let el = document.querySelector('button[data-test="'+data_test+'"]');
    if (!el) return false;
    el.setAttribute("aria-label", label);
    return true;
}

let ctrl_labels = {
    "editor-ctrl-heading": "Заголовок",
    "editor-ctrl-bold": "Жирный",
    "editor-ctrl-italic": "курсивный",
    "editor-ctrl-strike": "Зачеркнутый",
    "editor-ctrl-link": "Вставить ссылку",
    "editor-ctrl-quote": "Цитата",
	"editor-ctrl-highlight": "Подчеркнутый",
	"editor-ctrl-spoiler": "Спойлер",
	"editor-ctrl-marker": "Маркер?",
	"editor-ctrl-ul": "Unordered list?",
	"editor-ctrl-dnd-start": "Разделитель?",
};

///////>
(function() {



    window.setTimeout(function(){
        document.querySelectorAll('div[data-test-element-type="toggle"]').forEach(Element=>{
            Element.setAttribute("tabindex", "0");
            Element.setAttribute("role", "Button");
            Element.setAttribute("aria-pressed", Element.getAttribute("data-test-id"));
            Element.parentNode.addEventListener("click",event=>{
                Element.setAttribute("aria-pressed", Element.getAttribute("data-test-id"));
            })
        });
},500);


    window.setTimeout(function(){
        mystyle = `
div.message.unread::after {
    content: "Сообщение не прочитано";
    position: absolute;
    width: 1px;  /* ширина 1 пиксель */
    height: 1px; /* высота 1 пиксель */
    overflow: hidden; /* скрываем содержимое */
    clip: rect(0, 0, 0, 0); /* используем обрезку */
    white-space: nowrap; /* предотвращаем перенос текста */
}
        `;
        let st=document.createElement("Style");
        st.innerText=mystyle;
        document.body.appendChild(st);
    }, 500);

    window.setInterval(function(){
        if(document.domain.toLowerCase().indexOf("pikabu")!=-1){
            Object.keys(ctrl_labels).forEach((k) => {
                pkb_sign_editor_ctrl_button(k, ctrl_labels[k]);
            });
        }
        if(document.domain.toLowerCase().indexOf("findcl")!=-1){
            let cm =document.querySelector("i.fa-camera");
            if (!!cm) {
                cm.setAttribute("tabindex", "0");
                cm.setAttribute("role", "button");
                cm.setAttribute("aria-label", "camera");
            }
            let faceboxes = document.querySelectorAll("div.select-faces__box");
            if (!!faceboxes) {
                faceboxes.forEach(function(el, i){
                    el.setAttribute("tabindex", "0");
                    el.setAttribute("role", "button");
                    el.setAttribute("aria-label", "facebox "+i);
                });
            }
        }
        document.querySelectorAll("button[data-hint], img[data-hint]").forEach(function(el){
            el.setAttribute("aria-label", el.getAttribute("data-hint"));
        });
        open_menu = document.querySelector("i.open-menu");
        if(!!open_menu) {
            open_menu.setAttribute("tabindex", "0");
            open_menu.setAttribute("role", "button");
            open_menu.setAttribute("aria-label", "menu");
        }
        document.querySelectorAll('div[data-original-title], i[data-original-title]').forEach(elem=>{
            if (elem.innerText.replace(" ","").length>2) return true;
            elem.setAttribute("tabindex", "0");
            elem.setAttribute("aria-label", elem.getAttribute("data-original-title"));
            elem.setAttribute("role", "button");
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
                if(!!_tmp_inp && _tmp_inp.tagName.toLowerCase()=="input" && _tmp_inp.id=="") {
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
    ///////////<
    window.setInterval(function(){
        document.querySelectorAll("img[src*='/znakomstva/public/user/']").forEach(elem=>{
            elem.setAttribute("alt", "Фото профиля");
        });
    }, 1000);
    ///////////>
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
