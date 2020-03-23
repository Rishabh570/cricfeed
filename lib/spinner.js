const helper = require('./utils/helper');

class Spinner {
    constructor(type) {
        this.spinner = helper.makeSpinner(type);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    start() {
        this.spinner.start();
    }

    stop() {
        this.spinner.stop();
    }
}

module.exports = Spinner;
