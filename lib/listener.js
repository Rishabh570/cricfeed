const fetcher = require('./fetcher'),
	  Observable = require('zen-observable'),
	  delay = require('delay');

let lastUpdated = null;

async function listener(match_id, observer) {
	while (true) {
		let stats = await fetcher.getMatchStats(match_id);
		stats = stats.data;

		if(lastUpdated != stats.last_update_time/1000) {
			observer.next(stats);
		}

		if(stats.series.end_time <= ((new Date).getTime())/1000) {
			observer.complete();
			return;
		}

		lastUpdated = stats.last_update_time/1000;
		await delay(5000);
	}
}

module.exports = match_id => (
	new Observable(observer => {
		(async () => {
			await listener(match_id, observer);
		})()
		.catch(observer.error.bind(observer));
	})
);
