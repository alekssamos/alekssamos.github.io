/*<vdsina>*/
function set_menu_clickable_from_keyboard(elem){
	elem.setAttribute("tabindex", "0");
	elem.setAttribute("role", "menuitemradio");
	if(elem.parentNode.getAttribute("role")!="menu") {
		elem.parentNode.setAttribute("role", "menu");
		elem.parentNode.setAttribute("tabindex", "-1");
	}
}

if(document.domain.indexOf("vdsina")!=-1){
    window.setInterval(function(){
        document.querySelectorAll('span.btn').forEach(elem=>{
            if(elem.getAttribute("role")=="button") return true;
            elem.setAttribute("role", "button");
            elem.setAttribute("tabindex", "0");
        });


document.querySelectorAll('div[class*="disabled"]').forEach(elem=>{
	with(elem){
		let d = getAttribute("aria-disabled");
		if(d!="true" && d!="false") {
			setAttribute("aria-disabled", "true");
			set_menu_clickable_from_keyboard(elem);
			parentNode.parentNode.addEventListener("onclick", event=>{
				window.setTimeout(()=>{ setAttribute("aria-disabled", classList.contains("disabled")?"true":"false"); },100);
			});
		}
	}
});



document.querySelectorAll('div.selected, div[class*="-list-item"]').forEach(elem=>{
	with(elem){
		if(getAttribute("class").indexOf("list-item-down")!=-1) return;
		if(getAttribute("class").indexOf("twi")!=-1) return;
		if(getAttribute("class").indexOf("list-item-up")!=-1) return;
		if(classList.contains("groups")){
			if(getAttribute("tabindex")!="0"){
				parentNode.parentNode.addEventListener("onclick", event=>{
					window.setTimeout(()=>{ setAttribute("aria-expanded", classList.contains("selected")?"true":"false"); }, 100);
				});
			}
			setAttribute("tabindex", "0");
			setAttribute("role", "button");
			setAttribute("aria-expanded", classList.contains("selected")?"true":"false");
			return;
		}
		let d = getAttribute("aria-checked");
		if(d!="true" && d!="false") {
			setAttribute("aria-checked", classList.contains("selected")?"true":"false");
			set_menu_clickable_from_keyboard(elem);
			parentNode.parentNode.addEventListener("onclick", event=>{
				window.setTimeout(()=>{ setAttribute("aria-checked", classList.contains("selected")?"true":"false"); }, 100);
			});
		}
	}
});
},700);
/*</vdsina>*/
