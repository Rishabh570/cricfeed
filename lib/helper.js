const CLUI = require('clui'),
	  Spinner = CLUI.Spinner;

module.exports = {
	makeChoicesFromMatches: (matches) => {
		let choices = [];
		matches.forEach(match => {
			let choice = match.team1.name + "( " + match.team1.s_name + " ) vs. " + match.team2.name + "( " + match.team2.s_name + " )";
			choice += " [ " + match.series_name + " ]";
			choices.push(choice);
		})
		return choices;
	},

	getMatches: (liveMatches, type) => {
		let matches = [];
		// liveMatches.forEach(element => {
		// 	if(element.srs_category.includes(type)) matches.push(element);
		// })
		return matches;
	},

	makeSpinner: (type) => {
		let spinner;
		if(type == 1) spinner = new Spinner("Fetching live international matches for you...");
		else if(type == 3) spinner = new Spinner("Fetching live domestic matches for you...");
		else spinner = new Spinner ("Fetching live matches for you...");
		return spinner;
	}
}
