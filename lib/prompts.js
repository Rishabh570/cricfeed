const inquirer = require('inquirer');

const CHOICES = {
    'All 👀': 0,
    'International 🌎': 1,
    'Domestic 🏠': 3,
};

module.exports = {
    askTypeOfMatch: () => {
        return inquirer
            .prompt({
                type: 'list',
                name: 'matchType',
                message:
                    'Select the type of match you want to know the live stats about:',
                choices: ['All 👀', 'International 🌎', 'Domestic 🏠'],
                filter: val => CHOICES[val],
            })
            .then(answers => {
                return answers.matchType;
            })
            .catch(err => {
                throw err;
            });
    },

    askForMatch: options => {
        return inquirer
            .prompt({
                type: 'list',
                name: 'match',
                message: 'Select a match:',
                choices: options,
            })
            .then(answers => {
                return answers.match;
            })
            .catch(err => {
                throw err;
            });
    },
};
