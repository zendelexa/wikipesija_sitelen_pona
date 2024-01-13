function isLetter(char) {
	return !(" 1234567890-=!@#$%^&*()_+`~,./;'[]\\<>?:\"{}|\n\t".includes(char));
}

toki_pona_letters = ['w', 'e', 't', 'u', 'i', 'o', 'p', 'a', 's', 'j', 'k', 'l', 'n', 'm']
toki_pona_consonants = ['w', 't', 'p', 's', 'j', 'k', 'l', 'n', 'm'];
toki_pona_vowels = ['a', 'e', 'i', 'o', 'u'];
alphabetization = {
	'w' : 'waso',
	'e' : 'esun',
	't' : 'telo',
	'u' : 'uta',
	'i' : 'ilo',
	'o' : 'oko',
	'p' : 'poki',
	'a' : 'a',
	's' : 'sijelo',
	'j' : 'jo',
	'k' : 'kasi',
	'l' : 'lawa',
	'n' : 'nena',
	'm' : 'moku'
};
const CONSONANT_TYPE = 'w';
const VOWEL_TYPE = 'a';
const N_TYPE = 'n';
function isSitelenPonizable(word)
{
	prev_type = "";
	for (var i = 0; i < word.length; i++)
	{
		if (!toki_pona_letters.includes(word[i].toLowerCase()))
			return false;
		curr_type = "";
		if (word[i].toLowerCase() == 'n' && prev_type != N_TYPE)
			curr_type = N_TYPE;
		else if (toki_pona_consonants.includes(word[i].toLowerCase()))
			curr_type = CONSONANT_TYPE;
		else
			curr_type = VOWEL_TYPE;
		
		if (prev_type == CONSONANT_TYPE && curr_type == CONSONANT_TYPE) return false;
		if (prev_type == CONSONANT_TYPE && curr_type == N_TYPE) return false;
		prev_type = curr_type;
	}
	if (prev_type == CONSONANT_TYPE) return false;
	return true;
}
function sitelenPonize(word, is_link)
{
	var new_div = document.createElement('spdiv');
	new_div.appendChild(getImage("namestart", is_link));
	for (var i = 0; i < word.length; i++)
		new_div.appendChild(getImage(alphabetization[word[i].toLowerCase()], is_link));
	new_div.appendChild(getImage("nameend", is_link));
	return new_div;
}

function getImage(word, is_link) {
	if (word in images)
	{
		if (is_link) word += "_blue";

		var word_image = document.createElement("img");
		word_image.setAttribute("src", "data:image/png;base64," + images[word]);

		return word_image;
	}

	if (word[0].toLowerCase() != word[0] && isSitelenPonizable(word)) return sitelenPonize(word, is_link);
	return document.createTextNode(word);	
}

function addSitelenPona(node, is_link) {
	var new_div = document.createElement('spdiv');
	var word = ""
	for (var i = 0; i < node.data.length; i++) {
		var character = node.data[i];
		if (isLetter(character))
			word += character;
		else {
			if (word !== "" && word !== "\n" && word !== "\t")
				new_div.appendChild(getImage(word, is_link));
			new_div.appendChild(document.createTextNode(character));
			word = "";
		}
	}
	if (word !== "" && word !== "\n" && word !== "\t")
		new_div.appendChild(getImage(word, is_link));

	node.parentNode.replaceChild(new_div, node);
}

function changeToSitelenPona(node, is_link) {
	if (node.tagName == "SCRIPT") return;
	if (node.tagName == "A") is_link = true;
	if (node.nodeType !== Node.TEXT_NODE)
		for (var i = 0; i < node.childNodes.length; i++)
			changeToSitelenPona(node.childNodes[i], is_link);
	else if (node.data !== "\n" && node.data !== " "){
		addSitelenPona(node, is_link);
	}
}