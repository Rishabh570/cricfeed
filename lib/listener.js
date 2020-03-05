const Observable = require('zen-observable');
const delay = require('delay');
const fetcher = require('./fetcher');
const {handler} = require('./error_handler');

let lastUpdated = null;
const convertToSec = 1000;
const delayPeriod = 5000;

async function listener(matchId, observer) {
    while (true) {
        let [stats, statsErr] = await handler(fetcher.getMatchStats(matchId));
        if (statsErr) observer.error(statsErr);
        stats = stats.data;

        if (lastUpdated !== stats.last_update_time / convertToSec) {
            observer.next(stats);
        }

        if (stats.series.end_time <= new Date().getTime() / convertToSec) {
            observer.complete();
            return;
        }

        lastUpdated = stats.last_update_time / convertToSec;
        await delay(delayPeriod);
    }
}

module.exports = match_id =>
    new Observable(observer => {
        (async () => {
            await listener(match_id, observer);
        })().catch(err => {
            throw err;
        });
    });
