const ramda = require('ramda');
const { __, compose, map, filter, reduce, curry, identity, partial,applySpec } = ramda;
const { take, drop, length, reverse, prop, split, head, tail, call, times, splitEvery, join, repeat, concat } = ramda;
const { min, max, add, mathMod, multiply } = ramda;
const { probe, tokenize, rotate } = require('../shared');

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

const applyLengths = curry((world, lengths) => reduce(updateWorld, world, lengths));

const initWorld = size => ({ rope: times(identity, size), curPos: 0, skipSize: 0 });

const run = curry((size, line) => compose(
    call,
    partial(multiply),
    applySpec([head, compose(head, tail)]),
    prop('rope'),
    applyLengths(initWorld(size)),
    map(Number),
    split(',')
)(line))

const p1 = run(256);

const ascii = ch => ch.charCodeAt(0);

const applyLengths2 = lengths => reduce(
    world => applyLengths(world, lengths),
    initWorld(256),
    repeat(0, 64)
);

const calcBlock = reduce((x, y) => x ^ y, 0);

const toDenseHash = compose(map(calcBlock), splitEvery(16));

const toBase = curry((base, num) => num.toString(base));

const toHex = compose(tail, toBase(16), add(0x100));

const toKnotHash = compose(join(''), map(toHex));

const strToLengths = map(ascii);

const p2 = compose(
    toKnotHash,
    toDenseHash,
    prop('rope'),
    applyLengths2,
    concat(__, [17, 31, 73, 47, 23]),
    strToLengths,
);

module.exports = {
    solution: {
        type: 'input',
        ps: [p1, p2]
    }
    , adjustRope
    , rotate
    , updatePos
    , applyLengths
    , run
    , toHex
};