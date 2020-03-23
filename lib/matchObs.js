const initListener = require('./listener');
const output = require('./output');

module.exports = matchId =>
    (async () => {
        await initListener(matchId)
            .forEach(data => {
                output.showStats(data);
            })
            .catch(() => output.throwError('Something went wrong 😞'));

        // Todo: HANDLE OBSERVER.COMPLETE()
    })();
