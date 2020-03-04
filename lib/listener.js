const Observable = require('zen-observable');

const fetcher = require('./fetcher');
// const delay = require('delay');
const {handler} = require('./error_handler');

const ONE_SECOND = 1000;
let lastUpdated = null;
const POLL_TIME_FOR_MATCH_STATS = 5000;

async function getMatchStats(matchId, observer) {
    // while (true) {
    const data = await handler(fetcher.getMatchStats(matchId));

    let stats = data[0];
    const statsErr = data[1];

    if (statsErr) observer.error(statsErr);
    stats = stats.data;

    if (lastUpdated !== stats.last_update_time / ONE_SECOND) {
        observer.next(stats);
    }

    if (stats.series.end_time <= new Date().getTime() / ONE_SECOND) {
        observer.complete();
        return;
    }

    lastUpdated = stats.last_update_time / ONE_SECOND;
    // await delay(POLL_TIME_FOR_MATCH_STATS);
    // }
}

module.exports = matchId =>
    new Observable(async observer => {
        try {
            await getMatchStats(matchId, observer);
        } catch (err) {
            console.log(err);
            throw err;
        }
        const timerId = setInterval(async () => {
            try {
                await getMatchStats(matchId, observer);
            } catch (err) {
                console.log(err);
                throw err;
            }
        }, POLL_TIME_FOR_MATCH_STATS);

        return () => clearInterval(timerId);
    });
