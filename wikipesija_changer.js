function isLetter(str) {
	return !(" 1234567890-=!@#$%^&*()_+`~,./;'[]\\<>?:\"{}|\n\t".includes(str));

	//return str.length === 1 && str.match(/[a-z]/i);
}

function getSitelen(word, is_link) {
	if (word == "") return word;

	if (word in sitelens)
	{
		if (is_link) word += "_blue";
		return "<img src=\" data:image/png;base64," + sitelens[word] + "\" />";
	}

	if (word[0].toLowerCase() != word[0] && isSitelenPonizable(word)) return sitelenPonize(word, is_link);
	return word;	
}

toki_pona_letters = ['w', 'e', 't', 'u', 'i', 'o', 'p', 'a', 's', 'j', 'k', 'l', 'n', 'm']
toki_pona_consonants = ['w', 't', 'p', 's', 'j', 'k', 'l', 'n', 'm'];
toki_pona_vowels = ['a', 'e', 'i', 'o', 'u'];
sitelen_pona_letters = {
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
const CONSONANT = 'w';
const VOWEL = 'a';
const NASAL = 'n';
function isSitelenPonizable(word)
{
	prev_type = "";
	for (var i = 0; i < word.length; i++)
	{
		if (!toki_pona_letters.includes(word[i].toLowerCase()))
			return false;
		curr_type = "";
		if (word[i].toLowerCase() == 'n' && prev_type != NASAL)
			curr_type = NASAL;
		else if (toki_pona_consonants.includes(word[i].toLowerCase()))
			curr_type = CONSONANT;
		else
			curr_type = VOWEL;
		
		if (prev_type == CONSONANT && curr_type == CONSONANT) return false;
		if (prev_type == CONSONANT && curr_type == NASAL) return false;
		prev_type = curr_type;
	}
	if (prev_type == CONSONANT) return false;
	return true;
}
function sitelenPonize(word, is_link)
{
	let ans = "";
	ans += "namestart";
	for (var i = 0; i < word.length; i++)
	{
		ans += " " + sitelen_pona_letters[word[i].toLowerCase()];
	}
	ans += " " + "nameend";
	ans = ans.split(" ");

	ans2 = "";
	for (var i = 0; i < ans.length; i++)
	{
		if (is_link)
			ans[i] += "_blue";
		ans2 += getSitelen(ans[i]);
	}
	return ans2;
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
			if (res[res.length - 1] != '>' || character != ',')
			{
				if (character != "." || !">)]".includes(res[res.length - 1]))
					res += character;
				else
					res += 'ㆍ';
			}
			word = "";
		}

	}
	res += getSitelen(word, is_link);

	return res;
}