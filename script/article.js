/*Creating and uploading images*/
/*
*/
/*
*/
let fieldImage  = document.getElementById("fieldImageArticleOne");

let uploadedImageFieldContainers = document.querySelectorAll('.uploadedImageFieldContainer');
let uploadedImageFieldContainer  = uploadedImageFieldContainers[0];

let uploadedImagesList = new Array;
let fileQuantity = 0;

/*function matchFilesArrayToObject()
{
	fieldImage.reset;
	for (let fileNum = 0; fileNum < fileQuantity; fileNum++)
	{
		fieldImage.files[fileNum] = uploadedImagesList[fileNum];
	}
}*/

function createUploadedImagesFields()
{
	//matchFilesArrayToObject();

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
			//"<img class = \"uploadedImageIco\" alt = \"Y\">" +
			file + 
			"<label class = \"uploadedImageDelIco\">" + 
				"<input type = \"submit\" class = \"uploadedImageDel\">" +
			"</label>" +
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
/*
*/
/*
*/
/*Create article, add it on the site, create articles buttons*/
/*
*/
/*
*/
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
let articleArray = new Array;
let articleList = document.getElementById("articleList");
let articleQuantity = 0;

/*or better to use class? 0w0*/
function Article()
{
	this.titleArticle = fieldTitle;
	this.textAritcle = fieldText;
	this.imageArticle = new Array;
	for(let i = 0; i < fileQuantity; i++)
	{
		imageArticle[i] = uploadedImagesList[i];
	}
}

function createArticleFull(article)
{
	articleList[articleQuantity] = article;
	articleQuantity++;
}

function diaplayArticleFull(article)
{
	
}

function createArticleShort(article)
{
	alert("short article");
}

function createArticle()
{
	if (fieldTitle.value != 0 && fieldText.value != 0)
	{
		let newArticle = new Article();
		createArticleShort(newArticle);
		createArticleFull(newArticle);
	}
}

/*
*/
/*
*/
/*
/*Short version of full article*/
/*
*/
/*
*//*
function createShortArticle()
{

	if (fieldText.value != "" && fieldTitle.value != "")
	{
		/* edit the text in a shorter and with */
		/* the presence of line breaks         *//*
		let bigText = textProcessing(fieldText.value);
		let smallText = "";
		if (bigText.files.length > 200)
		{
			let i = 0;
			while ((i < 200 ||  bigText[i] != ' ') && 
				   (i < 80  || (bigText[i] != '.'  && bigText[i] != '!' && bigText[i] != '?' )))
			{
				smallText += bigText[i];
				i++;
			}
			smallText += "...";
		}
		else
			smallText = bigText;	
		
		let imgId = ("articleShortImage" + quantityArticles);
		
		let article = document.createElement('div');
		article.className = "shortArticle";
		article.id = ("shortArticle-" + quantityArticles);
		article.innerHTML = (
			"<div class = \"articleTitle\">    " +  fieldTitle.value  + "</div>" + 
			"<div class = \"articleShortText\">" +         smallText  + "</div>" + 
			"<img class = \"articleShortImage\" id = \"" +      imgId  + "\" alt = \"no pictures\">"
		);
		
		try
		{
			let fileReader = new FileReader();
			fileReader.readAsDataURL(fieldImage.files[0]);
			fileReader.onload = function(event)
			{
				let img = document.getElementById(imgId);
				img.src = event.target.result;
			}
		}
		catch{}
		
		articleList.append(article);
		arrayShortArticles[quantityArticles] = article;
		quantityArticles++;
	}
}

/* the createon of line breaks and spaces in text        */
/* '\n' => '<br>' && '<br><br>' => '<br>' && '__' => '_' *//*
function textProcessing(form_text) {
    let pattern = /\r\n|\r|\n/g;
    let new_pattern = form_text.replace(/\ {2,}/g, ' ').replace(/(\r\n|\r|\n){2,}/g, "<br><br>").replace(/(\r\n|\r|\n)/g, "<br>").split('<br><br>').join ("\n\n");
	return new_pattern;
}

*/

  buttonAdd.onclick = createArticle;
buttonClear.onclick = clear;
 fieldImage.onclick = function() {fieldImage.onchange = uploadNewImages;};
