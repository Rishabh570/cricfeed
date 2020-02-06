'use strict';
const prompts = require('./lib/prompts'),
	  output = require('./lib/output'),
	  fetcher = require('./lib/fetcher'),
	  helper = require('./lib/helper'),
	  matchObs = require('./lib/matchObs'),
	  CLUI = require('clui'),
	  Spinner = CLUI.Spinner;


(async () => {
	output.printName(); // Prints "cricfeed"

	// Prompts user for type of matches
	const type = await prompts.askTypeOfMatch();

	// Loading spinner starts
	const spinner_first = helper.makeSpinner(type);
	spinner_first.start();

	// Fetches relevant live matches
	let liveMatches = await fetcher.getLiveMatches();
	// Filter out matches according to the user's query
	let matches = helper.getMatches(liveMatches, type);

	// Create a list of choices that user needs to select from
	const choices = helper.makeChoicesFromMatches(matches);

	spinner_first.stop(); // Stop the spinner

	// Prompt the user to select a match from the list of choices
	const match = await prompts.askForMatch(choices);

	// Todo: ADD SPINNER HERE (THINK ABOUT EXPORTING THE SPINNER OBJECT)

	const ID = matches[choices.indexOf(match)].match_id; // ID of the match user selected
	matchObs(ID); // Create an observable that keeps track of the stats for the desired match and shows them to the user

})();
