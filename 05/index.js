const { __, compose, when, curry, map, add, ifElse, gte, adjust, lt, length, both, prop, mathMod } = require('ramda');
const { probe, arrayMap, add1, sub1, countCycles } = require('../shared');

// { is: [Number], i: Number } -> { is: Number, i: Number }
const nextWorld = jumpAdjust => ({ is, i }) => ({
    is: adjust(jumpAdjust, i, is),
    i: i + is[i]
});

// [*] -> Number -> Boolean
const outOfBounds = curry((arr, i) => mathMod(i, length(arr)) !== i);

// (Number -> Number) -> [String] -> Number
const countJumps = jumpAdjust => instructs => countCycles(
    nextWorld(jumpAdjust),
    ({ is, i }) => outOfBounds(is, i),
    { is: map(Number, instructs), i: 0 }
);

// [String] -> Number
const p1 = countJumps(add1);

// Number -> Number
const secondJumpAdjust = ifElse(gte(__, 3), sub1, add1);

// [String] -> Number
const p2 = countJumps(secondJumpAdjust);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};