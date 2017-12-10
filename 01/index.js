const { compose, curry, sum, replace, add, length, mathMod } = require('ramda');
const { run, toArray, add1 } = require('../shared');

const nextIdx = add1;
const halfIdx = (idx, arr) => (idx + arr.length / 2);

const corrIdx = curry((f, i, arr) => mathMod(f(i, arr), length(arr)));

const matchIdx = f => (el, i, arr) => el === arr[corrIdx(f, i, arr)];

const eqNextIdx = matchIdx(nextIdx);

const sumMatchedIdx = f => compose(
    sum, 
    arr => arr.filter(matchIdx(f)), 
    toArray
);

const p1 = sumMatchedIdx(nextIdx);

const p2 = sumMatchedIdx(halfIdx);


module.exports = {
    ps: [p1, p2]
    , nextIdx
    , eqNextIdx
    , corrIdx
}