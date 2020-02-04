let chalk = require('chalk')
let figlet = require('figlet')
let boxen = require('boxen')
let clear = require('clear')

module.exports = {
	printName: () => {
		console.log(
			chalk.yellowBright(
				figlet.textSync('CricFeed', { horizontalLayout: 'fitted', verticalLayout: 'fitted' })
			)
		)
	}
}
