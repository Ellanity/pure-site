/*Creating and uploading images*/
let fieldImage  = document.getElementById("fieldImageArticleOne");

let uploadedImageFieldContainers = document.querySelectorAll('.uploadedImageFieldContainer');
let uploadedImageFieldContainer  = uploadedImageFieldContainers[0];

let uploadedImagesList = new Array;
let fileQuantity = 0;

function createUploadedImagesFields()
{
	/*clear container with fields*/
	uploadedImageFieldContainer.innerHTML = "";
	
	/*to check uploaded pics*/
	/*let atext = "";
	for(let i = 0; i < fileQuantity; i++)
	{
		atext += imageField.files[i].name + "\n";
	}
	alert(atext);*/
	
	
	/*create all fields once more*/
	for (let fileNum = 0; fileNum < fileQuantity; fileNum++)
	{
		/*make name shorter*/
		let fileName = uploadedImagesList[fileNum].name;
		let file = "";
		if (fileName.length > 50)
		{
			for(let i = 0; i < 50; i++)
				file += fileName[i];
			file += "...";
		}
		else
			file = fileName;
		
		/*create html for field*/
		let imageUploadedHTML = (
		"<div>" + 
			file + 
			//"<label class = \"uploadedImageDelIco\">" + 
			//	"<input type = \"submit\" class = \"uploadedImageDel\">" +
			//"</label>" +
			"<img class = \"uploadedImageDelIco\" alt = \"X\">" + 
		"</div>"
		);
		
		/*create field*/
		let imageUploaded = document.createElement('div');
		imageUploaded.className = "uploadedImageName";
		imageUploaded.innerHTML = imageUploadedHTML;
		uploadedImageFieldContainer.append(imageUploaded);
		imageUploaded.setAttribute("id", ("uploadedImageName" + fileNum));
		
		
		/*eventlistener to delete file      */
		/*not for all with any new file, but*/
		/*for this one, when its created    */
		
		/*let crosses = document.getElementsByClassName("uploadedImageDelIco");

		for (let i = 0; i < crosses.length; i++)
		{
			crosses[i].addEventListener('click', { handleEvent: deleteImage, cross: crosses[i]});
		}*/
		imageUploaded.addEventListener('click', function(){deleteImage(imageUploaded)});
	}	
}

function uploadNewImages()
{
	let fileNum = 0;
	for (fileNum = 0; fileNum < fieldImage.files.length; fileNum++)
	{		
		if(fileQuantity < 10)
		{
			let fileType =  fieldImage.files[fileNum].type;
			if (fileType == "image/jpeg" || fileType == "image/jpg" || fileType == "image/png")
			{
				uploadedImagesList[fileQuantity] = fieldImage.files[fileNum];
				fileQuantity++;
			}		
		}
	}
	if (fileQuantity > 9)
		alert("Maximum 10 pictures");
	createUploadedImagesFields();
}
/*
*/
/*Delete uploaded images*/
/*
*/
function deleteImage(imageToDelete)
{
	let uploadedImagesListNew = new Array;
	
	let idChar = imageToDelete.id[17];
	//imageToDelete.parentNode.removeChild(imageToDelete);

	let id = Number.parseInt(idChar, 10)

	for (let fileNum = 0; fileNum < fileQuantity; fileNum++)
	{
		if (fileNum < id)
			uploadedImagesListNew[fileNum] =  uploadedImagesList[fileNum];
		else
			uploadedImagesListNew[fileNum] =  uploadedImagesList[fileNum + 1];
	}
	fileQuantity--;


	uploadedImagesList.splice(0, uploadedImagesList.length);
	for(let fileNum = 0; fileNum < fileQuantity; fileNum++)
	{
		uploadedImagesList[fileNum] = uploadedImagesListNew[fileNum];
	}
	
	createUploadedImagesFields();
}




/*Create article, add it on the site, create articles buttons*/


/*Clear all fields of article form*/
let fieldText   = document.getElementById("fieldTextArticle");
let fieldTitle  = document.getElementById("fieldTitleArticle");

function clear()
{
	if(confirm("Clear this article?"))
	{
		fieldText.value = "";
		fieldTitle.value = "";
		fieldImage.value = "";
		
		uploadedImagesList.splice(0, uploadedImagesList.length);
		fieldImage.reset;
		fileQuantity = 0;
		uploadNewImages();
	}
};
/*
*/
/*Creating article (object, with all specifications)*/
/*
*/
let containerArray = new Array;
let containerQuantity = 0;


function addContainer()
{
	let container = document.createElement('div');
	container.className = "articlesContainer";
	container.id = ("articlesContainer-" + containerQuantity);
	
	articleList.append(container);
	containerQuantity++;
}

let articleArray = new Array;
let shortArticleArray = new Array;
let fullArticleArray = new Array;

let articleQuantity = 0;

/*or better to use class? 0w0*/
function Article()
{
	this.id = articleQuantity;
	this.container = 0;
	this.titleArticle = fieldTitle.value;
	this.textArticle  = textProcessing(fieldText.value);
	this.imageArticle = new Array;
	for(let i = 0; i < fileQuantity; i++)
	{
		this.imageArticle[i] = uploadedImagesList[i];
	}
}

/* the createon of line breaks and spaces in text        */
/* '\n' => '<br>' && '<br><br>' => '<br>' && '__' => '_' */
function textProcessing(form_text)
{
    let pattern = /\r\n|\r|\n/g;
    let new_pattern = form_text.replace(/\ {2,}/g, ' ').replace(/(\r\n|\r|\n){2,}/g, "<br><br>").replace(/(\r\n|\r|\n)/g, "<br>").split('<br><br>').join ("\n\n");
	return new_pattern;
}
/*
*/
/*
*/
/*Full article*/
let fullArticleContainer = document.getElementById("fullArticleContainer");
let fullArticleId;
let deletedArticleId;
let pageFA = 0;

function displayArticleFull(article)
{
	if(article.id != deletedArticleId)
	{
		fullArticleId = article.id;
		fullArticleContainer.innerHTML = "";
		let fullArticleObj = document.createElement('div');
		fullArticleObj.className = "fullArticle";
		
		let html = (
		"<div class = \"fullArticleTitle\" >" + article.titleArticle + "</div>" + 
		"<div class = \"fullArticleText\"  >" + article.textArticle  + "</div>" + 
		"<div class = \"fullArticleImageContainer\">" + 
		"<div id = \"fullArticleButLeft\"></div>" +
		"<div id = \"fullArticleButRight\"></div>"
		);
		for (imageNum = 0; imageNum < article.imageArticle.length; imageNum++)
		{
			html += ("<div class = \"fullArticleImage\" id = \"fullArticleImage-" + imageNum + "\"></div>");
			}
		
		html += "</div>";
		
		fullArticleObj.innerHTML = (html);
		fullArticleContainer.append(fullArticleObj);
		
		if (article.imageArticle.length > 0)
		{
			for (imageNum = 0; imageNum < article.imageArticle.length; imageNum++)
			{
				let id = ("fullArticleImage-" + imageNum);
				let fileReader = new FileReader();
				fileReader.readAsDataURL(article.imageArticle[imageNum]);
				fileReader.onload = function(event)
				{
					let img = document.getElementById(id);
					img.style.content = "url(" + event.target.result + ")";
				}
			}
			
			let leftBut  = document.getElementById("fullArticleButLeft");
			let rightBut = document.getElementById("fullArticleButRight");
			pageFA = 0;
			
			leftBut.onclick = leftButFA;
			rightBut.onclick = rightButFA;
			
			if (article.imageArticle.length < 2)
				rightBut.style.display = 'none';
			leftBut.style.display = 'none';
		}
	}
	else
		deletedArticleId = -1;
}

function rightButFA()
{
	let leftBut = document.getElementById("fullArticleButLeft");
	let rightBut = document.getElementById("fullArticleButRight");
	let imagesFA = document.querySelectorAll(".fullArticleImage");
	
	let container = document.querySelectorAll(".fullArticleImageContainer");
	let width = container[0].offsetWidth;
	
	for (let imageNum = 0; imageNum < imagesFA.length; imageNum++)
	{
		let posPx = imagesFA[imageNum].style.left;
		let pos = posPx.replace(/px/, "");
		if(posPx == "")
			pos = 0;
		imagesFA[imageNum].style.left = (parseInt(pos, 10) - width) + 'px';	
	}
	pageFA++;
	if (pageFA >= imagesFA.length - 1)
		rightBut.style.display = 'none';
	if (pageFA > 0)
		leftBut.style.display = '';
}

function leftButFA()
{
	let leftBut = document.getElementById("fullArticleButLeft");
	let rightBut = document.getElementById("fullArticleButRight");
	let imagesFA = document.querySelectorAll(".fullArticleImage");
	
	let container = document.querySelectorAll(".fullArticleImageContainer");
	let width = container[0].offsetWidth;
	
	for (let imageNum = 0; imageNum < imagesFA.length; imageNum++)
	{
		let posPx = imagesFA[imageNum].style.left;
		let pos = posPx.replace(/px/, "");
		if(posPx == "")
			pos = 0;
		imagesFA[imageNum].style.left = (parseInt(pos, 10) + width) + 'px';
	}
	pageFA--;
	if(pageFA <= 0)
		leftBut.style.display = 'none';
	if(pageFA < imagesFA.length)
		rightBut.style.display = '';
}




function deleteArticle(article)
{	
	if(confirm("Are you sure, you want delete this post?")){
		id = article.id;
		let articleArrayNew = new Array;

		for(articleNum = 0; articleNum < articleQuantity; articleNum++)
		{
			if(articleNum < id)
				articleArrayNew[articleNum] = articleArray[articleNum];
			else
				articleArrayNew[articleNum] =  articleArray[articleNum + 1];
		}
		articleQuantity--;

		if(fullArticleId == id)
			fullArticleContainer.innerHTML = "";
		if(fullArticleId  > id)
			fullArticleId--;
		deletedArticleId = id;
				
		articleArray.splice(0, articleArray.length);
		for(let articleNum = 0; articleNum < articleQuantity; articleNum++)
		{
			articleArray[articleNum] = articleArrayNew[articleNum];
		}
		
		for(let articleNum = 0; articleNum < articleQuantity; articleNum++)
		{
			articleArray[articleNum].id = articleNum;
		}
		
		displayShortArticle();
	}
}


/*Short version of full article*/
function createArticleShort(article)
{
	title = article.titleArticle;
	
	let longText  = article.textArticle;
	let shortText = "";
	if (longText.length > 200)
	{
		let i = 0;
		while ((i < 200 ||  longText[i] != ' ') && 
			   (i < 80  || (longText[i] != '.'  && longText[i] != '!' && longText[i] != '?' )))
		{
			shortText += longText[i];
			i++;
		}
		shortText += "...";
	}
	else
		shortText = longText;	
	
	let articleObj = document.createElement('div');
	articleObj.className = "shortArticle";
	articleObj.id = ("shortArticle-" + article.id);
	
	let imgId = ("articleShortImage-" + article.id);
	articleObj.innerHTML = (
		"<div class = \"articleTitle\">    " + title  + "</div>" + 
		"<div class = \"articleShortText\">" + shortText  + "</div>" + 
		"<img class = \"articleShortImage\" id = \"" + imgId  + "\" alt = \"no pictures :(\">" + 
		"<div class = \"articleShortDelContainer\">" +
			"<img class = \"articleShortDel\" id = \"articleShortDel-" + article.id + "\"alt = \"X\">" + 
		"</div>"
	);
	
	try
	{
		let fileReader = new FileReader();
		fileReader.readAsDataURL(article.imageArticle[0]);
		fileReader.onload = function(event)
		{
			let img = document.getElementById(imgId);
			img.src = event.target.result;
		}
	}
	catch{}
		
	let container = document.getElementById(("articlesContainer-" + article.container));
	container.prepend(articleObj);
	
	articleObj.addEventListener('click', function(){displayArticleFull(article);});

	del = document.getElementById(("articleShortDel-" + article.id));
	del.addEventListener('click', function(){deleteArticle(article);});
}

/*start this func if user want to create new article*/
function createArticle()
{
	if (fieldTitle.value != 0 && fieldText.value != 0)
	{
		let newArticle = new Article();
		articleArray[articleQuantity] = newArticle;
		articleQuantity++;
		displayShortArticle();
	}
}

let page = 0;

function displayShortArticle()
{
	articleList.innerHTML = "";
	containerQuantity = 0;
	page = 0;
		
	for(let articleNum = 0; articleNum < articleQuantity; articleNum++)
	{
		articleArray[articleNum].container = Math.floor((articleQuantity - articleArray[articleNum].id - 1)/4);
	}
	for (let containerNum = 0; containerNum <= articleArray[0].container; containerNum++)
		addContainer();
	
	if(containerQuantity <= 1)
	{
		buttonNext.style.display = 'none';
		buttonPrevious.style.display = 'none';
	}
	if(containerQuantity > 1)
	{
		if (page > 0)
			buttonPrevious.style.display = '';
		if (page < containerQuantity - 1)
			buttonNext.style.display = '';
		if (page <= 0)
			buttonPrevious.style.display = 'none';
		if (page >= containerQuantity - 1)
			buttonNext.style.display = 'none';
	}
	
	for(let articleNum = 0; articleNum < articleQuantity; articleNum++)
	{
		createArticleShort(articleArray[articleNum]);
	}
	
}


function nextPage()
{
	let width = articleList.offsetWidth;
	let containers = document.querySelectorAll(".articlesContainer");
	for (let containerNum = 0; containerNum < containers.length; containerNum++)
	{
		let posPx = containers[containerNum].style.left;
		let pos = posPx.replace(/px/, "");
		if(posPx == "")
			pos = 0;
		containers[containerNum].style.left = (parseInt(pos, 10) - width) + 'px';	
	}
	page++;
	if (page >= containers.length - 1)
		buttonNext.style.display = 'none';
	if (page > 0)
		buttonPrevious.style.display = '';
}

function previousPage()
{
	let width = articleList.offsetWidth;
	let containers = document.querySelectorAll(".articlesContainer");
	for (let containerNum = 0; containerNum < containers.length; containerNum++)
	{
		let posPx = containers[containerNum].style.left;
		let pos = posPx.replace(/px/, "");
		if(posPx == "")
			pos = 0;
		containers[containerNum].style.left = (parseInt(pos, 10) + width) + 'px';
	}
	page--;
	if(page <= 0)
		buttonPrevious.style.display = 'none';
	if(page < containers.length)
		buttonNext.style.display = '';
}

if(containerQuantity <= 1)
{
	buttonNext.style.display = 'none';
	buttonPrevious.style.display = 'none';
}

/*actions with buttons in article form*/
buttonAdd.onclick = createArticle;
buttonClear.onclick = clear;
fieldImage.onclick = function() {fieldImage.onchange = uploadNewImages;};
/*articles list*/
buttonNext.onclick = nextPage;
buttonPrevious.onclick = previousPage;