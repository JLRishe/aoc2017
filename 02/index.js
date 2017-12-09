const { runLines, arrayMap, probe } = require('../shared');
const { compose, map, apply, sum, max, min, split, head, filter, take, divide, drop, concat, flatten } = require('ramda');

const tokenize = split(/\s+/);

const rowCheckSum1 = compose(row => apply(Math.max, row) - apply(Math.min, row), tokenize);

const isInt = num => Math.round(num) === num;

const itemQuotients = (el, i, arr) => map(divide(el))(concat(take(i, arr), drop(i + 1, arr)));

const rowCheckSum2 = compose(head, filter(isInt), flatten,  arrayMap(itemQuotients), map(Number), tokenize);

const addCheckSums = checkSum => compose(sum, map(checkSum));

const p1 = addCheckSums(rowCheckSum1);

const p2 = addCheckSums(rowCheckSum2);

runLines('02', p1, p2);

module.exports = {
    p1
    , p2
};