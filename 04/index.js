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

const validatePassphrases = wordAdjust => compose(
    length,
    filter(isValid),
    map(map(wordAdjust)),
    map(tokenize)
);

const p1 = validatePassphrases(identity);

const p2 = validatePassphrases(sortWord);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};