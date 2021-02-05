let headerCross = document.getElementById("closeGreeting");

headerCross.onclick = function()
{
	
	container = document.getElementById("fieldsContainer");
	greeting  = document.getElementById("greeting");
	
	let height = greeting.offsetHeight + 15;
	
	container.style.top = -height + 'px';
	greeting.style.opacity  = 0;
	
	//greeting.parentNode.removeChild(greeting);
}