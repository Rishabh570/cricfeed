const output = require('./output'),
		{merge} = require('lodash'),
	{DEFAULT_CORE_OPTIONS} = require('./utils/constants'),
	helper = require('./utils/helper'),
	dns = require('dns'),
	matchObs = require('./matchObs'),
	{handler} = require('./error_handler'),
	prompts = require('./prompts'),
	fetcher = require('./fetcher');



class Spinner  {
	constructor(type){
		this.spinner = helper.makeSpinner(type)

		this.start = this.start.bind(this)
		this.stop = this.stop.bind(this)
	}

	start(){
		this.spinner.start()
	}

	stop(){
		this.spinner.stop()
	}
}

class CricFeed {
	constructor(options ={}){
		this.options = merge(DEFAULT_CORE_OPTIONS,options)


		this.getInput = this.getInput.bind(this)
		this.checkConnection = this.checkConnection.bind(this)
		this.fetchMatches = this.fetchMatches.bind(this)
		this.showChoices = this.showChoices.bind(this)
		this.showStats = this.showStats.bind(this)
	}

	async start(){

		output.printName()



		await this.getInput()
		await this.checkConnection()
		this.spinner = new Spinner(this.type)
		await this.fetchMatches()
		await this.showChoices()
		await this.showStats()

	}

	async getInput(){
		const [type, typeErr] = await handler(prompts.askTypeOfMatch());
		this.type= type
		if(typeErr) output.throwError('Type of match not received, please select one!');
	}

	async checkConnection(){
		dns.lookup('google.com', err => {
			if(err) output.throwError('No internet connection! ❌');
		})
	}

	async fetchMatches(){
		this.spinner.start();
		const [liveMatches, liveMatchesErr] = await handler(fetcher.getLiveMatches());
		this.liveMatches = liveMatches
		if(liveMatchesErr) output.throwError('Could not fetch live matches, please try again!')
	}

	async showChoices(){
		// Filter out matches according to the user's query
		this.matches = helper.getMatches(this.liveMatches, this.type);
		if(this.matches.length == 0) {
			this.spinner.stop(); // Stop the spinner
			output.throwNoMatchesError(this.type);
		}

		// Create a list of choices that user needs to select from
		this.choices = helper.makeChoicesFromMatches(this.matches);

		this.spinner.stop(); // Stop the spinner
	}

	async showStats(){
		// Prompt the user to select a match from the list of choices
		const [match, matchErr] = await handler(prompts.askForMatch(this.choices));
		if(matchErr) output.throwError('Could not fetch data for the match, please try again!');

		// TODO: ADD SPINNER HERE (THINK ABOUT EXPORTING THE SPINNER OBJECT)

		const ID = this.matches[this.choices.indexOf(match)].match_id; // ID of the match user selected
		matchObs(ID); // Create an observable that keeps track of the stats for the desired match and shows them to the user
	}



}



module.exports = CricFeed
