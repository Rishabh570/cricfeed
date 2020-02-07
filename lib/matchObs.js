const initListener = require('./listener'),
	  output = require('./output');

module.exports = match_id => (async () => {
	await initListener(match_id).forEach(data => {
		output.showStats(data);
	})
	.catch(err => output.throwError("Something went wrong 😞"))

	// Todo: HANDLE OBSERVER.COMPLETE()
})();
