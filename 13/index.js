const ramda = require('ramda');
const { __, compose, map, filter, curry, split, identity, times, prop, reduce, last, indexBy, min, max, sum, length, ifElse, always } = ramda;
const { probe, applyPattern, repeatUntil } = require('../shared');

// String -> { depth: Number, range: Number, severity: Number }
const parseScanner = compose(
   ([depth, range]) => ({ depth, range, severity: depth * range }),
   map(Number),
   split(': ')
);

// Number -> Scanner -> Boolean
const isHit = curry((offset, scanner) => phase = 
    (scanner.depth + offset) % ((scanner.range - 1) * 2) === 0
);

// [String] -> Number
const p1 = compose(
    sum,
    map(ifElse(isHit(0), prop('severity'), always(0))),
    map(parseScanner)
);

// Number -> [Scanner] -> Number
const totalHits = curry((offset, scanners) => compose(
    length,
    filter(identity),
    map(isHit(offset))
)(scanners));

// [Scanner] -> { delay: Number, result: Number }
const findNeededDelay = scanners => compose(
    prop('delay'),
    repeatUntil(
        ({ delay, result }) => (({ delay: delay + 1, result: totalHits(delay + 1, scanners) })),
        ({ result }) => result === 0        
    )
)({ delay: 0, result: totalHits(0, scanners) });

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