let fieldText   = document.getElementById("fieldTextArticle");
let fieldTitle  = document.getElementById("fieldTitleArticle");
let fieldImage  = document.getElementById("fieldImageArticleOne");

let articleList = document.getElementById("articleList");

let quantityArticles = 0;
let arrayShortArticles = new Array();

buttonClear.onclick = clear;
buttonAdd.onclick   = createShortArticle;

/*Clear all fields of article form*/
function clear()
{
	if(confirm("Clear this article?"))
	{
		fieldText.value = "";
		fieldTitle.value = "";
		fieldImage.value = "";
		
		let uploadedImages =  document.querySelectorAll('.uploadedImageName')  /* get all elements on site */
		let uploadedImage = uploadedImages[0]; 								   /* with this css selector   */
		uploadedImage.parentNode.removeChild(uploadedImage);
	}
};

/*
function shortArticle()
{
	let article = 
	{
		aTitle: textProcessing(fieldTitle.value),
		aText:  textProcessing(fieldText.value),
		aId:    quantityArticles,
		
	}
	quantityArticles--;
	return article;
}*/

/*Short version of full article*/
function createShortArticle()
{

	if (fieldText.value != "" && fieldTitle.value != "")
	{
		/* edit the text in a shorter and with */
		/* the presence of line breaks         */
		let bigText = textProcessing(fieldText.value);
		let smallText = "";
		if (bigText.length > 200)
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
/* '\n' => '<br>' && '<br><br>' => '<br>' && '__' => '_' */
function textProcessing(form_text) {
    let pattern = /\r\n|\r|\n/g;
    let new_pattern = form_text.replace(/\ {2,}/g, ' ').replace(/(\r\n|\r|\n){2,}/g, "<br><br>").replace(/(\r\n|\r|\n)/g, "<br>").split('<br><br>').join ("\n\n");
	return new_pattern;
}