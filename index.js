'use strict';
const prompts = require('./lib/prompts'),
	  output = require('./lib/output'),
	  fetcher = require('./lib/fetcher'),
	  helper = require('./lib/helper'),
	  matchObs = require('./lib/matchObs'),
	  CLUI = require('clui'),
	  Spinner = CLUI.Spinner,
	  {handler} = require('./lib/error_handler');


(async () => {
	output.printName(); // Prints "cricfeed"

	// Prompts user for type of matches
	const [type, typeErr] = await handler(prompts.askTypeOfMatch());
	if(typeErr) output.throwError('Type of match not received, please select one!');

	// TODO: Check user's internet connection and throw error if offline

	// Loading spinner starts
	const spinner_first = helper.makeSpinner(type);
	spinner_first.start();

	// Fetches relevant live matches
	const [liveMatches, liveMatchesErr] = await handler(fetcher.getLiveMatches());
	if(liveMatchesErr) output.throwError('Could not fetch live matches, please try again!');

	// Filter out matches according to the user's query
	let matches = helper.getMatches(liveMatches, type);

	// Create a list of choices that user needs to select from
	const choices = helper.makeChoicesFromMatches(matches);

	spinner_first.stop(); // Stop the spinner

	// Prompt the user to select a match from the list of choices
	const [match, matchErr] = await handler(prompts.askForMatch(choices));
	if(matchErr) output.throwError('Could not fetch data for the match, please try again!')

	// TODO: ADD SPINNER HERE (THINK ABOUT EXPORTING THE SPINNER OBJECT)

	const ID = matches[choices.indexOf(match)].match_id; // ID of the match user selected
	matchObs(ID); // Create an observable that keeps track of the stats for the desired match and shows them to the user

})();
