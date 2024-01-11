

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function getSitelen(word, is_link) {
	if (word == "") return word;
	if (!(word in sitelens)) return word;

	if (is_link) word += "_blue";
	return "<img src=\" data:image/png;base64," + sitelens[word] + "\" />";
}

function processHTML(str) {
	var res = "";
	var is_text = true;
	var is_link = false;
	var word = ""
	for (var i = 0; i < str.length; i++) {
		var character = str[i];
		if (character == '<') {
			if (str.slice(i, i + 3) == "<a ")
				is_link = true;
			is_text = false;
			res += getSitelen(word, is_link);
			word = "";
			if (str.slice(i, i + 4) == "</a>")
				is_link = false;
		}
		else if (character == '>')
		{
			is_text = true;
		}

		if ((!is_text || character == '>') && character != ' ')
			res += character;
		else if (isLetter(character))
			word += character;
		else {
			res += getSitelen(word, is_link);
			word = "";
			res += character;
		}

	}
	res += getSitelen(word, is_link);

	return res;
}