let slider = document.getElementById("headerSlider");
let slide1 = document.getElementById("slide1");
let slide2 = document.getElementById("slide2");

let imageCount = 2;
let position = 0;

setInterval(changeImage, 7000);

function changeImage()
{
	
	let width = slide1.offsetWidth;
	
	if(position == 0)
	{
		slide2.style.left = -width + 'px';
		slide1.style.left = -width + 'px';
		
		/*let newImage = setTimeout(() => {slide1.style.backgroundImage = ("url(\"./style/source/images/header/" + imageCount + ".jpg\")");}, 1000);
		newImage;
		clearTimeout(newImage);*/
		setTimeout(() => {slide1.style.backgroundImage = ("url(\"./style/source/images/header/" + imageCount + ".jpg\")");}, 2000);
	}
	else
	{	
		slide1.style.left = 0 + 'px';
		slide2.style.left = 0 + 'px';
		
		/*let newImage = setTimeout(() => {slide2.style.backgroundImage = ("url(\"./style/source/images/header/" + imageCount + ".jpg\")");}, 1000);
		newImage;
		clearTimeout(newImage);*/
		setTimeout(() => {slide2.style.backgroundImage = ("url(\"./style/source/images/header/" + imageCount + ".jpg\")");}, 2000);
	}
	imageCount++;
	if(imageCount > 8)
		imageCount = 1;
	
	position++;
	if(position > 1)
		position = 0;
}

//slide2.style.left = slide1.style.width + 'px';
/*

let Visible = function (target) 
{
	// Все позиции элемента
	let targetPosition = {
		top: window.pageYOffset + target.getBoundingClientRect().top,
		left: window.pageXOffset + target.getBoundingClientRect().left,
		right: window.pageXOffset + target.getBoundingClientRect().right,
		bottom: window.pageYOffset + target.getBoundingClientRect().bottom
	},
	
	// Получаем позиции окна
	windowPosition = {
		top: window.pageYOffset,
		left: window.pageXOffset,
		right: window.pageXOffset + document.documentElement.clientWidth,
		bottom: window.pageYOffset + document.documentElement.clientHeight
	};

	if (targetPosition.bottom > windowPosition.top    && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
		targetPosition.top    < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
		targetPosition.right  > windowPosition.left   && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
		targetPosition.left   < windowPosition.right)    // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
    {
		//alert("visible");
		//slider.style.backgroundImage = ("url(\"./style/source/images/slider/" + imageCount + ".jpg\")");
		/*imageCount++;
		if(imageCount > 2)
			imageCount = 1;
		slide2.style.left = -width + 'px';
		slide1.style.left = -width + 'px';
		setTimeout(() => {
		slide1.style.backgroundImage = ("url(\"./style/source/images/header/" + 2 + ".jpg\")");

		slide1.style.left = 0 + 'px';
		slide2.style.left = 0 + 'px';

		}, 2000);
	} 
};


// Запустим функцию сразу. А то вдруг, элемент изначально видно
Visible (slider);

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
  Visible(slider);
});*/