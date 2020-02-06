const initListener = require('./listener'),
	  output = require('./output');

module.exports = match_id => (async () => {
	try {
		await initListener(match_id).forEach(data => {
			output.showStats(data);
		});
		// Todo: HANDLE OBSERVER.COMPLETE()
	}
	catch (error) {
		console.error(error.message);
	}
})();
