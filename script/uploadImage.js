let fieldImageGet = document.getElementById("fieldImageArticleOne");

let imageForms =  document.querySelectorAll('.uploadedImageField')
let imageForm = imageForms[0];

let name = document.createElement('div');

fieldImageGet.onclick = function ()
{
    fieldImageGet.onchange = function ()
	{
		if (fieldImageGet.value)
		{
			
			let filetype = fieldImageGet.files[0].type;
			if (filetype == "image/jpeg" || filetype == "image/jpg" || filetype == "image/png")
			{
				let filename = fieldImageGet.files[0].name;
				
				let file = "";
				if (filename.length > 40)
				{
					for(let i = 0; i < 40; i++)
						file += filename[i];
					file += "...";
				}
				else
					file = filename;
				
				name.className = "uploadedImageName";
				name.innerHTML = ("<div><img class = \"uploadedImageIco\" alt = \"X\">" + file + "</div>");
				imageForm.append(name);	
			}
			else
				alert("Please, select the file with the correct extension (png/jpg/jpeg)")
		}
    };
};


/* the script that runs at startup       */
/* to display the image, if it is loaded */
if (fieldImageGet.value)
{
	let filetype = fieldImageGet.files[0].type;
	if (filetype == "image/jpeg" || filetype == "image/jpg" || filetype == "image/png")
	{
		let filename = fieldImageGet.files[0].name;
		
		let file = "";
		if (filename.length > 40)
		{
			for(let i = 0; i < 40; i++)
				file += filename[i];
			file += "...";
		}
		else
			file = filename;
		
		name.className = "uploadedImageName";
		name.innerHTML = ("<div><img class = \"uploadedImageIco\" alt = \"X\">" + file + "</div>");
		imageForm.append(name);	
	}
}