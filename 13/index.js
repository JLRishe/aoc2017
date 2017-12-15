const ramda = require('ramda');
const { __, compose, map, filter, curry, split, sum, ifElse, always, none, prop, call } = ramda;
const { probe, add1 } = require('../shared');
const { genFilter, genInfinite, genHead } = require('../shared/generators');

// String -> { depth: Number, range: Number, severity: Number }
const parseScanner = compose(
   ([depth, range]) => ({ depth, range, severity: depth * range }),
   map(Number),
   split(': ')
);

// Number -> Scanner -> Boolean
const isHit = curry((delay, scanner) => phase = 
    (scanner.depth + delay) % ((scanner.range - 1) * 2) === 0
);

// [Scanner] -> Number
const p1 = compose(
    sum,
    map(prop('severity')),
    filter(isHit(0))
);

// [Scanner] -> Number
const p2 = scanners => compose(
    call,
    genHead,
    genFilter(compose(none(__, scanners), isHit)),
)(genInfinite);

module.exports = {
    solution: {
        type: 'lines',
        parse: parseScanner,
        ps: [p1, p2]
    }
};