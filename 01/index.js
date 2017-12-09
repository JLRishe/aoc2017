const { compose, sum, replace } = require('ramda');
const { run, toArray } = require('../shared');

const nextIdx = (arr, idx) => (idx + 1) % arr.length;
const halfIdx = (arr, idx) => (idx + arr.length / 2) % arr.length;

const matchIdx = f => (el, i, arr) => el === arr[f(arr, i)];

const eqNextIdx = matchIdx(nextIdx);

const sumMatchedIdx = f => compose(sum, arr => arr.filter(matchIdx(f)), toArray);

const p1 = sumMatchedIdx(nextIdx);

const p2 = sumMatchedIdx(halfIdx);


module.exports = {
    nextIdx
    , eqNextIdx
    , ps: [p1, p2]
}