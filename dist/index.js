parcelRequire = (function(e, r, t, n) {
    var i,
        o = 'function' == typeof parcelRequire && parcelRequire,
        u = 'function' == typeof require && require;
    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = 'function' == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && 'string' == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw ((c.code = 'MODULE_NOT_FOUND'), c);
            }
            (p.resolve = function(r) {
                return e[t][1][r] || r;
            }),
                (p.cache = {});
            var l = (r[t] = new f.Module(t));
            e[t][0].call(l.exports, p, l, l.exports, this);
        }
        return r[t].exports;
        function p(e) {
            return f(p.resolve(e));
        }
    }
    (f.isParcelRequire = !0),
        (f.Module = function(e) {
            (this.id = e), (this.bundle = f), (this.exports = {});
        }),
        (f.modules = e),
        (f.cache = r),
        (f.parent = o),
        (f.register = function(r, t) {
            e[r] = [
                function(e, r) {
                    r.exports = t;
                },
                {},
            ];
        });
    for (var c = 0; c < t.length; c++)
        try {
            f(t[c]);
        } catch (e) {
            i || (i = e);
        }
    if (t.length) {
        var l = f(t[t.length - 1]);
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = l)
            : 'function' == typeof define && define.amd
            ? define(function() {
                  return l;
              })
            : n && (this[n] = l);
    }
    if (((parcelRequire = f), i)) throw i;
    return f;
})(
    {
        zhZo: [
            function(require, module, exports) {
                const t = require('inquirer');
                module.exports = {
                    askTypeOfMatch: () =>
                        t
                            .prompt({
                                type: 'list',
                                name: 'matchType',
                                message:
                                    'Select the type of match you want to know the live stats about:',
                                choices: [
                                    'All 👀',
                                    'International 🌎',
                                    'Domestic 🏠',
                                ],
                                filter: function(t) {
                                    return 'International 🌎' == t
                                        ? 1
                                        : 'Domestic 🏠' == t
                                        ? 3
                                        : 0;
                                },
                            })
                            .then(t => t.matchType)
                            .catch(t => {
                                throw t;
                            }),
                    askForMatch: e =>
                        t
                            .prompt({
                                type: 'list',
                                name: 'match',
                                message: 'Select a match:',
                                choices: e,
                            })
                            .then(t => t.match)
                            .catch(t => {
                                throw t;
                            }),
                };
            },
            {},
        ],
        AP43: [
            function(require, module, exports) {
                const e = require('chalk'),
                    o = require('figlet'),
                    r = require('boxen'),
                    t = require('log-update'),
                    n = o => e.green.bold(o),
                    s = () => e.green.bold('~'.repeat(80));
                module.exports = {
                    printName: () => {
                        console.log(
                            e.yellow.magentaBright(
                                o.textSync('CricFeed', {
                                    font: 'Merlin1',
                                    horizontalLayout: 'fitted',
                                    verticalLayout: 'fitted',
                                }),
                            ),
                        );
                    },
                    showStats: o => {
                        const a = n('Score: '),
                            i = n('CRR: '),
                            l = n('Status: '),
                            c = n('Venue: '),
                            d = n('Toss: '),
                            $ = `${e.grey.bold(
                                `[${o.type}]`,
                            )} ${e.cyanBright.bold(
                                `${o.team1.name} vs. ${o.team2.name} [${o.series.name}]`,
                            )}\n${s()}\n ${l} ${o.status}\n ${a} ${
                                o.score.batting.score
                            }\n ${i} ${o.score.crr}\n ${d} ${
                                o.toss.winner
                            } chose ${o.toss.decision}\n ${c} ${
                                o.venue.name
                            }, ${o.venue.location}`;
                        t(
                            r($, {
                                padding: 1,
                                margin: 1,
                                borderStyle: 'classic',
                                dimBorder: !0,
                                borderColor: 'yellowBright',
                            }),
                        );
                    },
                    throwError: o => {
                        console.log(e.red.bold(o)), process.exit(1);
                    },
                    throwNoMatchesError: o => {
                        let r =
                            1 == o
                                ? 'International '
                                : 3 == o
                                ? 'Domestic '
                                : '';
                        console.log(e.red.bold(`No ${r}matches are live! 😐`)),
                            process.exit(1);
                    },
                };
            },
            {},
        ],
        rJVW: [
            function(require, module, exports) {
                const e = require('axios');
                module.exports = {
                    getLiveMatches: async () => {
                        let t = [],
                            r = await e.get(
                                'http://mapps.cricbuzz.com/cbzios/match/livematches',
                            );
                        if (r.error) throw r.error;
                        return (
                            (r = r.data.matches).forEach(e => {
                                let r = new Date().getTime() / 1e3;
                                'preview' != e.header.state &&
                                    e.header.end_time > r &&
                                    t.push(e);
                            }),
                            t
                        );
                    },
                    getMatchStats: async t => {
                        const r = await e.get(
                            `https://www.cricbuzz.com/match-api/${t}/commentary.json`,
                        );
                        if (r.error) throw r.error;
                        return r;
                    },
                };
            },
            {},
        ],
        dVS5: [
            function(require, module, exports) {
                const e = require('clui'),
                    t = e.Spinner;
                module.exports = {
                    makeChoicesFromMatches: e => {
                        let t = [];
                        return (
                            e.forEach(e => {
                                let a =
                                    e.team1.name +
                                    '( ' +
                                    e.team1.s_name +
                                    ' ) vs. ' +
                                    e.team2.name +
                                    '( ' +
                                    e.team2.s_name +
                                    ' )';
                                (a += ' [ ' + e.series_name + ' ]'), t.push(a);
                            }),
                            t
                        );
                    },
                    getMatches: (e, t) => {
                        let a = [];
                        return (
                            e.forEach(e => {
                                e.srs_category.includes(t) && a.push(e);
                            }),
                            a
                        );
                    },
                    makeSpinner: e => {
                        let a;
                        return (a = new t(
                            1 == e
                                ? 'Fetching live international matches for you...'
                                : 3 == e
                                ? 'Fetching live domestic matches for you...'
                                : 'Fetching live matches for you...',
                        ));
                    },
                };
            },
            {},
        ],
        lm2g: [
            function(require, module, exports) {
                module.exports = {
                    handler: e =>
                        e
                            .then(e => [e, void 0])
                            .catch(e => Promise.resolve([void 0, e])),
                };
            },
            {},
        ],
        PiJs: [
            function(require, module, exports) {
                const e = require('./fetcher'),
                    t = require('zen-observable'),
                    r = require('delay'),
                    {handler: a} = require('./error_handler');
                let i = null;
                async function n(t, n) {
                    for (;;) {
                        let [l, o] = await a(e.getMatchStats(t));
                        if (
                            (o && n.error(o),
                            (l = l.data),
                            i != l.last_update_time / 1e3 && n.next(l),
                            l.series.end_time <= new Date().getTime() / 1e3)
                        )
                            return void n.complete();
                        (i = l.last_update_time / 1e3), await r(5e3);
                    }
                }
                module.exports = e =>
                    new t(t => {
                        (async () => {
                            await n(e, t);
                        })().catch(e => {
                            throw e;
                        });
                    });
            },
            {'./fetcher': 'rJVW', './error_handler': 'lm2g'},
        ],
        BvoC: [
            function(require, module, exports) {
                const r = require('./listener'),
                    t = require('./output');
                module.exports = e =>
                    (async () => {
                        await r(e)
                            .forEach(r => {
                                t.showStats(r);
                            })
                            .catch(r =>
                                t.throwError('Something went wrong 😞'),
                            );
                    })();
            },
            {'./listener': 'PiJs', './output': 'AP43'},
        ],
        Focm: [
            function(require, module, exports) {
                const e = require('dns'),
                    r = require('./lib/prompts'),
                    t = require('./lib/output'),
                    o = require('./lib/fetcher'),
                    a = require('./lib/helper'),
                    c = require('./lib/matchObs'),
                    {handler: i} = require('./lib/error_handler');
                (async () => {
                    t.printName();
                    const [n, s] = await i(r.askTypeOfMatch());
                    s &&
                        t.throwError(
                            'Type of match not received, please select one!',
                        ),
                        e.lookup('google.com', e => {
                            e && t.throwError('No internet connection! ❌');
                        });
                    const h = a.makeSpinner(n);
                    h.start();
                    const [l, p] = await i(o.getLiveMatches());
                    p &&
                        t.throwError(
                            'Could not fetch live matches, please try again!',
                        );
                    let u = a.getMatches(l, n);
                    0 == u.length && (h.stop(), t.throwNoMatchesError(n));
                    const m = a.makeChoicesFromMatches(u);
                    h.stop();
                    const [d, w] = await i(r.askForMatch(m));
                    w &&
                        t.throwError(
                            'Could not fetch data for the match, please try again!',
                        );
                    const b = u[m.indexOf(d)].match_id;
                    c(b);
                })();
            },
            {
                './lib/prompts': 'zhZo',
                './lib/output': 'AP43',
                './lib/fetcher': 'rJVW',
                './lib/helper': 'dVS5',
                './lib/matchObs': 'BvoC',
                './lib/error_handler': 'lm2g',
            },
        ],
    },
    {},
    ['Focm'],
    null,
);
//# sourceMappingURL=/index.js.map
