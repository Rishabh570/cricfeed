let parcelRequire = (function(e, r, t, n) {
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
        AP43: [
            function(require, module, exports) {
                const e = require('chalk'),
                    o = require('figlet'),
                    r = require('boxen'),
                    t = require('log-update'),
                    n = o => e.green.bold(o),
                    s = () => e.green.bold('~'.repeat(80)),
                    a = {INTERNATIONAL: 1, DOMESTIC: 3},
                    l = 1;
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
                            l = n('CRR: '),
                            i = n('Status: '),
                            c = n('Venue: '),
                            d = n('Toss: '),
                            $ = `${e.grey.bold(
                                `[${o.type}]`,
                            )} ${e.cyanBright.bold(
                                `${o.team1.name} vs. ${o.team2.name} [${o.series.name}]`,
                            )}\n${s()}\n ${i} ${o.status}\n ${a} ${
                                o.score.batting.score
                            }\n ${l} ${o.score.crr}\n ${d} ${
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
                        let r = null;
                        switch (o) {
                            case a.INTERNATIONAL:
                                r = 'International';
                                break;
                            case a.DOMESTIC:
                                r = 'Domestic';
                                break;
                            default:
                                r = '';
                        }
                        const t =
                            '' === r
                                ? 'No matches are live! 😐'
                                : `No ${r} matches are live! 😐`;
                        console.log(e.red.bold(t)), process.exit(1);
                    },
                };
            },
            {},
        ],
        fPUH: [
            function(require, module, exports) {
                const o = {color: 'red'};
                module.exports = {DEFAULT_CORE_OPTIONS: o};
            },
            {},
        ],
        GRPu: [
            function(require, module, exports) {
                const e = require('clui'),
                    {Spinner: t} = e;
                module.exports = {
                    makeChoicesFromMatches: e => {
                        const t = [];
                        return (
                            e.forEach(e => {
                                const n = `${e.team1.name} (${e.team1.s_name}) ${e.team2.name} (${e.team2.s_name}) [${e.series_name}]`;
                                t.push(n);
                            }),
                            t
                        );
                    },
                    getMatches: (e, t) => {
                        const n = [];
                        return (
                            e.forEach(e => {
                                e.srs_category.includes(t) && n.push(e);
                            }),
                            n
                        );
                    },
                    makeSpinner: e => {
                        let n;
                        return (n = new t(
                            1 === e
                                ? 'Fetching live international matches for you...'
                                : 3 === e
                                ? 'Fetching live domestic matches for you...'
                                : 'Fetching live matches for you...',
                        ));
                    },
                };
            },
            {},
        ],
        rJVW: [
            function(require, module, exports) {
                const e = require('axios'),
                    t = 1e3;
                module.exports = {
                    getLiveMatches: async () => {
                        const t = [];
                        let r = await e.get(
                            'http://mapps.cricbuzz.com/cbzios/match/livematches',
                        );
                        if (r.error) throw r.error;
                        return (
                            (r = r.data.matches).forEach(e => {
                                const r = new Date().getTime() / 1e3;
                                'preview' !== e.header.state &&
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
                const e = require('zen-observable'),
                    t = require('./fetcher'),
                    {handler: r} = require('./error_handler'),
                    a = 1e3;
                let n = null;
                const o = 5e3;
                async function c(e, o) {
                    const c = await r(t.getMatchStats(e));
                    let l = c[0];
                    const s = c[1];
                    s && o.error(s),
                        (l = l.data),
                        n !== l.last_update_time / a && o.next(l),
                        l.series.end_time <= new Date().getTime() / a
                            ? o.complete()
                            : (n = l.last_update_time / a);
                }
                module.exports = t =>
                    new e(async e => {
                        try {
                            await c(t, e);
                        } catch (a) {
                            throw (console.log(a), a);
                        }
                        const r = setInterval(async () => {
                            try {
                                await c(t, e);
                            } catch (a) {
                                throw (console.log(a), a);
                            }
                        }, 5e3);
                        return () => clearInterval(r);
                    });
            },
            {'./fetcher': 'rJVW', './error_handler': 'lm2g'},
        ],
        BvoC: [
            function(require, module, exports) {
                const r = require('@sentry/node'),
                    e = require('./listener'),
                    t = require('./output');
                module.exports = o =>
                    (async () => {
                        await e(o)
                            .forEach(r => {
                                t.showStats(r);
                            })
                            .catch(() => {
                                r.captureException(err),
                                    t.throwError('Something went wrong 😞');
                            });
                    })();
            },
            {'./listener': 'PiJs', './output': 'AP43'},
        ],
        zhZo: [
            function(require, module, exports) {
                const t = require('inquirer'),
                    e = {'All 👀': 0, 'International 🌎': 1, 'Domestic 🏠': 3};
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
                                filter: t => e[t],
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
        JZBs: [
            function(require, module, exports) {
                'use strict';
                var t = s(require('@babel/runtime/helpers/classCallCheck')),
                    e = s(require('@babel/runtime/helpers/createClass'));
                function s(t) {
                    return t && t.__esModule ? t : {default: t};
                }
                const i = require('./utils/helper');
                let r = (function() {
                    function s(e) {
                        (0, t.default)(this, s),
                            (this.spinner = i.makeSpinner(e)),
                            (this.start = this.start.bind(this)),
                            (this.stop = this.stop.bind(this));
                    }
                    return (
                        (0, e.default)(s, [
                            {
                                key: 'start',
                                value: function() {
                                    this.spinner.start();
                                },
                            },
                            {
                                key: 'stop',
                                value: function() {
                                    this.spinner.stop();
                                },
                            },
                        ]),
                        s
                    );
                })();
                module.exports = r;
            },
            {'./utils/helper': 'GRPu'},
        ],
        bRhr: [
            function(require, module, exports) {
                'use strict';
                var t = s(require('@babel/runtime/helpers/classCallCheck')),
                    e = s(require('@babel/runtime/helpers/createClass'));
                function s(t) {
                    return t && t.__esModule ? t : {default: t};
                }
                const i = require('@sentry/node'),
                    {merge: h} = require('lodash'),
                    r = require('dns'),
                    n = require('./output'),
                    {DEFAULT_CORE_OPTIONS: a} = require('./utils/constants'),
                    c = require('./utils/helper'),
                    o = require('./matchObs'),
                    {handler: u} = require('./error_handler'),
                    l = require('./prompts'),
                    p = require('./fetcher'),
                    f = require('./spinner');
                let w = (function() {
                    function s(e = {}) {
                        (0, t.default)(this, s),
                            i.init({dsn: process.env.SENTRY_URL}),
                            (this.options = h(a, e)),
                            (this.getInput = this.getInput.bind(this)),
                            (this.fetchMatches = this.fetchMatches.bind(this)),
                            (this.showChoices = this.showChoices.bind(this)),
                            (this.showStats = this.showStats.bind(this));
                    }
                    return (
                        (0, e.default)(
                            s,
                            [
                                {
                                    key: 'start',
                                    value: async function() {
                                        n.printName(),
                                            await this.getInput(),
                                            await s.checkConnection(),
                                            (this.spinner = new f(this.type)),
                                            await this.fetchMatches(),
                                            await this.showChoices(),
                                            await this.showStats();
                                    },
                                },
                                {
                                    key: 'getInput',
                                    value: async function() {
                                        const [t, e] = await u(
                                            l.askTypeOfMatch(),
                                        );
                                        (this.type = t),
                                            e &&
                                                (i.captureException(e),
                                                n.throwError(
                                                    'Type of match not received, please select one!',
                                                ));
                                    },
                                },
                                {
                                    key: 'fetchMatches',
                                    value: async function() {
                                        this.spinner.start();
                                        const [t, e] = await u(
                                            p.getLiveMatches(),
                                        );
                                        (this.liveMatches = t),
                                            e &&
                                                (i.captureException(e),
                                                n.throwError(
                                                    'Could not fetch live matches, please try again!',
                                                ));
                                    },
                                },
                                {
                                    key: 'showChoices',
                                    value: async function() {
                                        (this.matches = c.getMatches(
                                            this.liveMatches,
                                            this.type,
                                        )),
                                            0 === this.matches.length &&
                                                (this.spinner.stop(),
                                                n.throwNoMatchesError(
                                                    this.type,
                                                )),
                                            (this.choices = c.makeChoicesFromMatches(
                                                this.matches,
                                            )),
                                            this.spinner.stop();
                                    },
                                },
                                {
                                    key: 'showStats',
                                    value: async function() {
                                        const [t, e] = await u(
                                            l.askForMatch(this.choices),
                                        );
                                        e &&
                                            (i.captureException(e),
                                            n.throwError(
                                                'Could not fetch data for the match, please try again!',
                                            ));
                                        const s = this.matches[
                                            this.choices.indexOf(t)
                                        ].match_id;
                                        o(s);
                                    },
                                },
                            ],
                            [
                                {
                                    key: 'checkConnection',
                                    value: async function() {
                                        r.lookup('google.com', t => {
                                            t &&
                                                n.throwError(
                                                    'No internet connection! ❌',
                                                );
                                        });
                                    },
                                },
                            ],
                        ),
                        s
                    );
                })();
                module.exports = w;
            },
            {
                './output': 'AP43',
                './utils/constants': 'fPUH',
                './utils/helper': 'GRPu',
                './matchObs': 'BvoC',
                './error_handler': 'lm2g',
                './prompts': 'zhZo',
                './fetcher': 'rJVW',
                './spinner': 'JZBs',
            },
        ],
        Focm: [
            function(require, module, exports) {
                const e = require('./lib'),
                    r = new e();
                r.start();
            },
            {'./lib': 'bRhr'},
        ],
    },
    {},
    ['Focm'],
    null,
);
