var latin_version = document.body.innerHTML;
var sitelen_pona_version = processHTML(latin_version);
var sp_to_l_function = ()=>{document.body.innerHTML = latin_version; document.getElementsByClassName("l-to-sp")[0].addEventListener('click', l_to_sp_function); };
var l_to_sp_function = ()=>{document.body.innerHTML = sitelen_pona_version; document.getElementsByClassName("sp-to-l")[0].addEventListener('click', sp_to_l_function); };

function main() {
	var button = document.createElement("button");
	button.className = "l-to-sp";
	button.innerHTML = processHTML("o ante e sitelen");
	button.addEventListener('click', l_to_sp_function);
	button.style = "margin-top:1em;margin-right:15px";
	document.getElementById("right-navigation").insertAdjacentElement("beforeend", button);

	latin_version = document.body.innerHTML;
	document.body.innerHTML = sitelen_pona_version;
	
	var button = document.createElement("button");
	button.className = "sp-to-l";
	button.addEventListener('click', sp_to_l_function);
	button.innerHTML = "o ante e sitelen";
	button.style = "margin-top:1em;margin-right:15px";
	document.getElementById("right-navigation").insertAdjacentElement("beforeend", button);

	sitelen_pona_version = document.body.innerHTML;
	
	setTimeout(l_to_sp_function, 300); // For some reason "o ante" converts back after a bit
}

main();
