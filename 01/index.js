const { compose, curry, sum, replace, add, length, mathMod } = require('ramda');
const { run, arrayFilter, add1, wrapIndex } = require('../shared');

// Number -> * -> Number -> [*] -> Boolean
const matchIdx = jumpLength => (el, i, arr) => el === wrapIndex(i + jumpLength, arr);

// (Number -> [*] -> Number) -> String -> Number
const sumMatchedIdx = jumpLength => compose(
    sum, 
    arrayFilter(matchIdx(jumpLength))
);

// String -> Number
const p1 = sumMatchedIdx(1);
// String -> Number
const p2 = input => sumMatchedIdx(length(input) / 2)(input);

module.exports = {
    solution: {
        ps: [p1, p2]
    }
};