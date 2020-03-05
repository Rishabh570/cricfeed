const axios = require('axios');
const convertToSec = 1000;

module.exports = {
    getLiveMatches: async () => {
        const liveMatches = [];
        let response = await axios.get(
            'http://mapps.cricbuzz.com/cbzios/match/livematches',
        );
        if (response.error) throw response.error;
        response = response.data.matches;

        response.forEach(element => {
            const currTime = new Date().getTime() / convertToSec;
            if (
                element.header.state !== 'preview' &&
                element.header.end_time > currTime
            ) {
                liveMatches.push(element);
            }
        });
        return liveMatches;
    },

    getMatchStats: async matchId => {
        const resp = await axios.get(
            `https://www.cricbuzz.com/match-api/${matchId}/commentary.json`,
        );
        if (resp.error) throw resp.error;
        return resp;
    },
};
