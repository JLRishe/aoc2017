const { __, compose, prop, filter, map, groupBy, gt, identity, isEmpty, values, length, join, sortBy, uniq } = require('ramda');
const { runLines, toArray, tokenize } = require('../shared');

// [String] -> Boolean
const isValid = words => length(words) === length(uniq(words));

// String -> String
const sortWord = compose(join(''), sortBy(identity));

// (String -> String) -> [String] -> Number
const validatePassphrases = wordAdjust => compose(
    length,
    filter(isValid),
    map(map(wordAdjust)),
    map(tokenize)
);

// [String] -> Number
const p1 = validatePassphrases(identity);

// [String] -> Number
const p2 = validatePassphrases(sortWord);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};