const { __, compose, map, filter, take, min, max, length, reverse, drop, reduce, curry, add, prop, split, mathMod, partial, multiply, applySpec, head, tail, call } = require('ramda');
const { probe, tokenize } = require('../shared');

const rotate = curry((count, arr) => {
    const len = length(arr);
    const offset = len - mathMod(count, len);
    
    return [...drop(offset, arr), ...take(offset, arr)];
});

const reverseN = curry((n, arr) => [...reverse(take(n, arr)), ...drop(n, arr)])

const adjustRope = (len, rope, pos) => compose(
    rotate(pos),
    reverseN(len),
    rotate(-pos)
)(rope);


const updatePos = (len, ropeLen, pos, skipSize) => (pos + len + skipSize) % ropeLen; 

const updateWorld = ({ rope, curPos, skipSize }, len) => ({
    rope: adjustRope(len, rope, curPos),
    curPos: updatePos(len, length(rope), curPos, skipSize),
    skipSize: skipSize + 1
});

const applyLengths = curry((rope, lengths) => reduce(updateWorld, { rope, curPos: 0, skipSize: 0}, lengths));

const arrayOfSize = size => Array.from(Array(size)).map((_, i) => i);

const run = curry((size, line) => compose(
    call,
    partial(multiply),
    applySpec([head, compose(head, tail)]),
    prop('rope'),
    applyLengths(arrayOfSize(size)),
    map(Number),
    split(',')
)(line))

const p1 = run(256);

const p2 = () => 0;

module.exports = {
    adjustRope
    , rotate
    , updatePos
    , applyLengths
    , run
    , ps: [p1, p2]
};