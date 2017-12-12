const { compose, map, apply, sum, split, head, filter, divide, flatten, remove, curry } = require('ramda');
const { probe, arrayMap, tokenize, listMax, listMin } = require('../shared');

const rowCheckSum1 = row => listMax(row) - listMin(row);

const isInt = num => ~~num === num;

const itemQuotients = (el, i, arr) => map(divide(el), remove(i, 1, arr));

const rowCheckSum2 = compose(
    head,
    filter(isInt),
    flatten,
    arrayMap(itemQuotients)
);

const normalize = compose(map(Number), tokenize);

const addCheckSums = checkSum => compose(sum, map(checkSum), map(normalize));

const p1 = addCheckSums(rowCheckSum1);

const p2 = addCheckSums(rowCheckSum2);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};