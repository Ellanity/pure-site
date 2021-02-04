let headerCross = document.getElementById("closeGreeting");

headerCross.onclick = function()
{
	
	site = document.getElementById("site");
	greeting = document.getElementById("greeting");
	
	let height = greeting.offsetHeight;
	
	site.style.top = -(height + 10) + 'px';
	greeting.style.top = -(height + 10) + 'px';
	
	setTimeout(() => { greeting.parentNode.removeChild(greeting); }, 1000);
	setTimeout(() => { site.style.transition = 'none'; site.style.top = '6px';}, 1000);
	
	//greeting.parentNode.removeChild(greeting);
}