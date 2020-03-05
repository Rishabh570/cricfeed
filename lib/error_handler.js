module.exports = {
    handler: promise => {
        return promise
            .then(data => [data, undefined])
            .catch(err => Promise.resolve([undefined, err]));
    },
};
