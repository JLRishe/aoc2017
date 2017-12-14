const ramda = require('ramda');
const { __, compose, map, filter, reduce, curry, identity, partial,applySpec } = ramda;
const { take, drop, length, reverse, prop, split, head, tail, call, times, splitEvery, join, repeat, concat } = ramda;
const { min, max, add, mathMod, multiply } = ramda;
const { probe, tokenize, rotate, add1 } = require('../shared');

// Number -> [a] -> [a]
const reverseN = curry((n, arr) => [...reverse(take(n, arr)), ...drop(n, arr)])

// Number -> [Number] -> Number -> [Number]
const adjustRope = (len, rope, pos) => compose(
    rotate(pos),
    reverseN(len),
    rotate(-pos)
)(rope);

// Number -> Number -> Number -> Number -> Number
const updatePos = (len, ropeLen, pos, skipSize) => (pos + len + skipSize) % ropeLen; 

const updateWorld = ({ rope, curPos, skipSize }, len) => ({
    rope: adjustRope(len, rope, curPos),
    curPos: updatePos(len, length(rope), curPos, skipSize),
    skipSize: add1(skipSize)
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

const asciiValue = ch => ch.charCodeAt(0);

const repeatApplyLengths = curry((repeatCount, size, lengths) => reduce(
    applyLengths(__, lengths),
    initWorld(size),
    repeat(0, repeatCount)
));

const xor = (x, y) => x ^ y;

const calcBlock = reduce(xor, 0);

const toDenseHash = compose(
    map(calcBlock), 
    splitEvery(16)
);

// Number -> String
const toBase = curry((base, num) => num.toString(base));

// Number -> String
const toHex = compose(tail, toBase(16), add(0x100));

// [Number] -> String
const bytesToHex = compose(join(''), map(toHex));

// String -> [Number]
const toBytes = map(asciiValue);

// String -> String
const knotHash = compose(
    bytesToHex,
    toDenseHash,
    prop('rope'),
    repeatApplyLengths(64, 256),
    concat(__, [17, 31, 73, 47, 23]),
    toBytes,
);

// String -> String
const p2 = knotHash;

module.exports = {
    solution: {
        type: 'input',
        ps: [p1, p2]
    }
    , asciiValue
    , adjustRope
    , rotate
    , updatePos
    , applyLengths
    , run
    , toHex
    , knotHash
};