const chalk = require('chalk'),
	  figlet = require('figlet'),
	  boxen = require('boxen'),
	  logUpdate = require('log-update'),
	  getTitle = (text) => {return chalk.green.bold(text)},
	  makeDashedLine = () => {return "=".repeat(71)};


module.exports = {
	printName: () => {
		console.log(
			chalk.yellowBright(
				figlet.textSync('CricFeed', { horizontalLayout: 'fitted', verticalLayout: 'fitted' })
			)
		)
	},

	showStats: (stats) => {
		const score = getTitle('Score: ');
		const crr = getTitle('CRR: ');
		const status = getTitle('Status: ');
		const venue = getTitle('Venue: ');
		const toss = getTitle('Toss: ');
		const msg = `[${stats.type}] ${stats.team1.name} vs. ${stats.team2.name} [${stats.series.name}]\n\
${makeDashedLine()}\n ${status} ${stats.status}\n ${score} ${stats.score.batting.score}\n \
${crr} ${stats.score.crr}\n ${toss} ${stats.toss.winner} chose ${stats.toss.decision}\n ${venue} ${stats.venue.name}`;

		logUpdate(
			boxen(msg, {padding: 1, margin: 1, borderStyle: 'double', dimBorder: true, borderColor: 'yellowBright'})
		);
	}
}
