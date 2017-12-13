const ramda = require('ramda');
const { __, compose, map, curry, split, sum, ifElse, always, none } = ramda;
const { probe, applyPattern, repeatUntil, add1 } = require('../shared');

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

// [String] -> Number
const p1 = compose(
    sum,
    map(ifElse(isHit(0), prop('severity'), always(0))),
    map(parseScanner)
);

// [Scanner] -> Number
const findNeededDelay = scanners => repeatUntil(
    add1,
    compose(none(__, scanners), isHit),
    0
);

// [String] -> Number
const p2 = compose(
    findNeededDelay,
    map(parseScanner)
);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};