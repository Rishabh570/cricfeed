const axios = require('axios')

module.exports = {
	getLiveMatches: async () => {
		let liveMatches = [];
		let response = await axios.get('http://mapps.cricbuzz.com/cbzios/match/livematches')
		response = response.data.matches;

		response.forEach(element => {
			let currTime = (new Date).getTime()/1000;
			if(element.header.state != "preview" && element.header.end_time > currTime) {
				liveMatches.push(element);
			}
		})
		return liveMatches;
	},

	getMatchStats: async (match_id) => {
		return await axios.get(`https://www.cricbuzz.com/match-api/${match_id}/commentary.json`)
	}
}
