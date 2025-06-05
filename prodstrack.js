window.addEventListener("DOMContentLoaded", function(){
	let refer = document.referrer;
	if (!!refer && !localStorage.getItem('prodschool')) {
		if(refer.indexOf("prodschool.ru")>0){
			alert("Привет, уважаемый пользователь. Я автор этой страницы. \n Свяжись со мной, я хочу узнать источник трафика. С какого курса вы ко мне в течение двух лет заходите? \n  Я хочу это знать! \n  Не игнорируй! Обязательно напиши мне! \n @alekssamos VK,TG; aleks-samos@yandex.ru email. \n  авторы и поддержка prodschool отказались предоставлять мне эту информацию.");
			window.setTimeout(function(){ localStorage.setItem('prodschool', 'yes'); }, 3000);
		}
	}
});
