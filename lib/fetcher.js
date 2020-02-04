const axios = require('axios')

module.exports = {
	getLiveMatches: () => {
		let liveMatches = [];
		return axios.get('http://mapps.cricbuzz.com/cbzios/match/livematches')
		.then(response => {
			let resp = response.data.matches;
			resp.forEach(element => {
				let currTime = (new Date).getTime()/1000;
				if(element.header.state != "preview" && element.header.end_time > currTime) {
					liveMatches.push(element);
				}
			})
			return liveMatches;
		})
		.catch(error => {
			console.log(error);
			throw error;
		});
	}
}
