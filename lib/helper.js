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
	findChosenMatchObj: (match, matches) => {
		matches.forEach(element => {
			if(element.series_name == match.split("[")[1].split("]")[0].trim() &&
 			   element.team1.name == match.split("(")[0].trim() &&
			   element.team2.name == match.split("vs.")[1].split("(")[0].trim()) {
				return JSON.stringify(element);
			}
		})
	},
	getLoadingMsg: (type) => {
		if(type == 1) return "Fetching live international matches for you...";
		else if(type == 3) return "Fetching live domestic matches for you...";
		return "Fetching live matches for you...";
	}
}
