const CLUI = require('clui');

const {Spinner} = CLUI;

module.exports = {
    makeChoicesFromMatches: matches => {
        const choices = [];
        matches.forEach(match => {
            const choice = `${match.team1.name} (${match.team1.s_name}) ${match.team2.name} (${match.team2.s_name}) [${match.series_name}]`;
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
            spinner = new Spinner(
                'Fetching live international matches for you...',
            );
        else if (type === 3)
            spinner = new Spinner('Fetching live domestic matches for you...');
        else spinner = new Spinner('Fetching live matches for you...');
        return spinner;
    },
};
