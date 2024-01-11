function main() {
	sitelen_pona_version = processHTML(latin_version);

	toggleHTML();
	setTimeout(() => { document.body.innerHTML = sitelen_pona_version; }, 150); // For some reason some text turns back into being in Latin script
}

main();
