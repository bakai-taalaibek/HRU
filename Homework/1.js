
function sentenceCase(argument) {
	let firstLetter = argument.match(/[a-zA-Z\u0400-\u04FF]/).index;
	return argument.slice(0, firstLetter) + argument[firstLetter].toUpperCase() + argument.slice(firstLetter + 1).toLowerCase();
}

function correctSpaces(argument) {
	argument = argument.replace(/\s([.,!?:;])/g, "$1");
	argument = argument.replace(/([.,!?:;])/g, "$1 ");
	argument = argument.replace(/\s+/g, " ");
	return argument.trim();
}

function countWords(argument) {
	return argument.split(" ").filter(function(item) {return item != ''}).length;
}

function uniqueWords(argument) {
	argument = argument.toLowerCase();
	argument = argument.replace(/[-*/=>'".,!?:;1-9]/g, '');
	argument = argument.split(" ").filter(function(item) {return item != ''});
	let wordsCount = {};
	for (let word of argument) {
		wordsCount[word] = (word in wordsCount) ? wordsCount[word] + 1 : 1;
	}
	return wordsCount;
}

export {sentenceCase, correctSpaces, countWords, uniqueWords};