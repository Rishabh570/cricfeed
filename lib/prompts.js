const inquirer = require('inquirer')

module.exports = {
	askTypeOfMatch: () => {
		return inquirer.prompt({
			type: 'list',
			name: 'matchType',
			message: 'Select the type of match you want to know the live stats about:',
			choices: ["International", "Domestic", "Both"],
			filter: function(val) {
				return (val == "International") ? 1 : (val == "Domestic") ? 3 : 0;
			}
		})
		.then(answers => {
			return JSON.stringify(answers.matchType);
		})
	},
	askForMatch: (options) => {
		return inquirer.prompt({
			type: 'list',
			name: 'match',
			message: 'Select a match:',
			choices: options
		})
		.then(answers => {
			return answers.match;
		})
	}
}
