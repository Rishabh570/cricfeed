const ora = require('ora');

module.exports = {
    makeChoicesFromMatches: matches => {
        const choices = [];
        matches.forEach(match => {
            let choice = `${match.team1.name}( ${match.team1.s_name} ) vs. ${match.team2.name}( ${match.team2.s_name} )`;
            choice += ` [ ${match.series_name} ]`;
            choices.push(choice);
        });
        return choices;
    },

    getMatches: (liveMatches, type) => {
        const matches = [];
        liveMatches.forEach(element => {
            if (element.srs_category.includes(type)) matches.push(element);
        });
        return matches;
    },

    makeSpinner: type => {
        let spinner;
        if (type === 1)
            spinner = ora('Fetching live international matches for you...', {
                spinner: 'dots2',
                color: 'green',
                hideCursor: 'true',
            });
        else if (type === 3)
            spinner = ora('Fetching live domestic matches for you...', {
                spinner: 'dots2',
                color: 'green',
                hideCursor: 'true',
            });
        else
            spinner = ora('Fetching live matches for you...', {
                spinner: 'dots2',
                color: 'green',
                hideCursor: 'true',
            });
        return spinner;
    },
};
