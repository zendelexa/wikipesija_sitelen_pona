function main() {
	var original_document_body = document.body.cloneNode(true);

	var modified_document_body = document.body.cloneNode(true);

	// Add the toggle button to the original page
	var button1 = document.createElement("button");
	button1.appendChild(document.createTextNode("o ante e sitelen"));
	changeToSitelenPona(button1.childNodes[0]);
	button1.addEventListener('click', ()=>{
		document.body = modified_document_body.cloneNode(true); 
		document.getElementById("right-navigation").insertAdjacentElement("beforeend", button2);
	});
	button1.style = "margin-top:1em;margin-right:15px";
	document.getElementById("right-navigation").insertAdjacentElement("beforeend", button1);

	// Change the writing system
	changeToSitelenPona(modified_document_body);
	document.body = modified_document_body.cloneNode(true);
	handleWeirdTexts(); // Some of them just can't behave
	function handleWeirdTexts() {
		// This text had a space character that somehow broke the isLetter function
		var lipuwikipesija_textnode = document.querySelector('[title="lipu Wikipesija"]');
		if (lipuwikipesija_textnode != null) {
			lipuwikipesija_textnode.childNodes[0].innerText = "lipu Wikipesija";
			changeToSitelenPona(lipuwikipesija_textnode);
		}

		// For some reason this text changed its writing system back
		setTimeout(() => {
			changeToSitelenPona(document.querySelector('[title="Edit this page [Alt+Shift+v]"]'));
		}, 300);
	}
	modified_document_body = document.body.cloneNode(true);

	// Add the toggle button to the modified page
	var button2 = document.createElement("button");
	button2.innerText = "o ante e sitelen";
	button2.style = "margin-top:1em;margin-right:15px";
	button2.addEventListener('click', ()=>{
		document.body = original_document_body.cloneNode(true);
		document.getElementById("right-navigation").insertAdjacentElement("beforeend", button1);
	});
	document.getElementById("right-navigation").insertAdjacentElement("beforeend", button2);
}

main();
