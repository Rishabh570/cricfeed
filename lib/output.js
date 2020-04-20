const chalk = require('chalk');
const figlet = require('figlet');
const boxen = require('boxen');
const logUpdate = require('log-update');
const getTitle = text => {
    return chalk.green.bold(text);
};
const makeDashedLine = () => {
    return chalk.green.bold('~'.repeat(80));
};

const MATCH_TYPE = {
    INTERNATIONAL: 1,
    DOMESTIC: 3,
};

const FAILED_EXIT_PROCESS = 1;

module.exports = {
    printName: () => {
        console.log(
            chalk.yellow.magentaBright(
                figlet.textSync('CricFeed', {
                    font: 'Merlin1',
                    horizontalLayout: 'fitted',
                    verticalLayout: 'fitted',
                }),
            ),
        );
    },

    showStats: stats => {
        const score = getTitle('Score: ');
        const crr = getTitle('CRR: ');
        const status = getTitle('Status: ');
        const venue = getTitle('Venue: ');
        const toss = getTitle('Toss: ');
        const typeOfMatch = chalk.grey.bold(`[${stats.type}]`);
        const title = chalk.cyanBright.bold(
            `${stats.team1.name} vs. ${stats.team2.name} [${stats.series.name}]`,
        );
        const msg = `${typeOfMatch} ${title}\n\
${makeDashedLine()}\n ${status} ${stats.status}\n ${score} ${
            stats.score.batting.score
        }\n \
${crr} ${stats.score.crr}\n ${toss} ${stats.toss.winner} chose ${
            stats.toss.decision
        }\n ${venue} ${stats.venue.name}, ${stats.venue.location}`;

        logUpdate(
            boxen(msg, {
                padding: 1,
                margin: 1,
                borderStyle: 'classic',
                dimBorder: true,
                borderColor: 'yellowBright',
            }),
        );
    },

    throwError: errText => {
        console.log(chalk.red.bold(errText));
        process.exit(1);
    },

    throwNoMatchesError: type => {
        let matchType = null;
        switch (type) {
            case MATCH_TYPE.INTERNATIONAL: {
                matchType = 'International';
                break;
            }
            case MATCH_TYPE.DOMESTIC: {
                matchType = 'Domestic';
                break;
            }
            default: {
                matchType = '';
            }
        }

        const matchErrorMsg =
            matchType === ''
                ? `No matches are live! 😐`
                : `No ${matchType} matches are live! 😐`;
        console.log(chalk.red.bold(matchErrorMsg));
        process.exit(FAILED_EXIT_PROCESS);
    },
};
