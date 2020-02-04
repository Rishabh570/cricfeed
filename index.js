'use strict';
const prompts = require('./lib/prompts'),
	output = require('./lib/output'),
	fetcher = require('./lib/fetcher'),
	helper = require('./lib/helper'),
	CLUI = require('clui'),
	Spinner = CLUI.Spinner;


// Prints "cricfeed"!
output.printName();

// Prompts user for type of matches
prompts.askTypeOfMatch().then(type => {
	// Loading spinner starts
	const loadingMsg = helper.getLoadingMsg(type);
	const status = new Spinner(loadingMsg);
    status.start();

	// Shows user's choice of matches
	type = JSON.parse(type);
	// Fetches relevant live matches
	fetcher.getLiveMatches().then(liveMatches => {
		let matches = [];
		liveMatches.forEach(element => {
			if(element.srs_category.includes(type)) matches.push(element);
		})

		const choices = helper.makeChoicesFromMatches(matches);
		status.stop();
		prompts.askForMatch(choices).then(match => {
			const chosenMatchObj = JSON.parse(helper.findChosenMatchObj(match, matches));
			// TODO: Show chosen match stats to the user.
		})

	})
})
