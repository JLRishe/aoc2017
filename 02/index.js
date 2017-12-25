const { compose, map, apply, sum, split, head, filter, divide, flatten, remove, curry } = require('ramda');
const { probe, arrayMap, tokenize, listMax, listMin } = require('../shared');

// [Number] -> Number
const rowCheckSum1 = row => listMax(row) - listMin(row);

// Number -> Boolean
const isInt = num => ~~num === num;

// Number -> Number -> [Number]
const itemQuotients = (el, i, arr) => map(divide(el), remove(i, 1, arr));

// [Number] -> Number
const rowCheckSum2 = compose(
    head,
    filter(isInt),
    flatten,
    arrayMap(itemQuotients)
);

// ([Number] -> Number) -> [[Number]] -> Number
const addCheckSums = checkSum => compose(sum, map(checkSum));

// [[Number]] -> Number
const p1 = addCheckSums(rowCheckSum1);

// [[Number]] -> Number
const p2 = addCheckSums(rowCheckSum2);

module.exports = {
    solution: {
        type: 'lines',
        pre: compose(map(Number), tokenize),
        ps: [p1, p2]
    }
};