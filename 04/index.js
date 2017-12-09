const { __, compose, prop, filter, map, groupBy, gt, identity, isEmpty, values, length, join, sortBy } = require('ramda');
const { runLines, toArray, tokenize } = require('../shared');

const isValid = compose(
    isEmpty, 
    filter(gt(__, 1)),
    map(length),
    values,
    groupBy(identity),
);

const sortWord = compose(join(''), sortBy(identity), toArray);

const p1 = compose(length, filter(isValid), map(tokenize));

const p2 = compose(length, filter(isValid), map(map(sortWord)), map(tokenize));

module.exports = {
    ps: [p1, p2]
};