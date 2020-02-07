const fetcher = require('./fetcher'),
	  Observable = require('zen-observable'),
	  delay = require('delay'),
	  {handler} = require('./error_handler');

let lastUpdated = null;

async function listener(match_id, observer) {
	while (true) {
		let [stats, statsErr] = await handler(fetcher.getMatchStats(match_id));
		if(statsErr) observer.error(statsErr);
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
		})().catch(err => {throw err})
	})
);
