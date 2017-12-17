const ramda = require('ramda');
const { __, compose, curry, map, filter, times, identity, join, tail, equals, split, length, replace, memoizeWith, reduce, flatten, sum } = ramda;
const { add } = ramda;
const { probe, arrayReduce, arrayMap } = require('../shared');
const { disjointSets, insert, connect, countSets } = require('../shared/unionFind');
const { ascii, toKnotHash, knotHash } = require('../10');

// Number -> String
const toBinary = num => num.toString(2);

// String -> Num
const hexToNum = ch => parseInt(ch, 16);

// String -> String
const hexToBinary = compose(tail, toBinary, add(16), hexToNum);

// String -> Number -> String
const rowHash = curry((input, num) => compose(knotHash, join('-'))([input, num]));

// String -> [String]
const rowHashes = input => map(rowHash(input), times(identity, 128));

const bitStrToBools = compose(map(equals('1')), split(''));

// String -> String
const rowBinary = compose(bitStrToBools, join(''), map(hexToBinary));

// String -> [String]
const rowBinaries = memoizeWith(identity, compose(map(rowBinary), rowHashes));

// String -> Number
const p1 = compose(
    sum,
    map(sum),
    map(map(Number))
);

const cellKey = (x, y) => `${x},${y}`;

const checkConnect = (arr, x1, y1, x2, y2) =>
    x2 >= 0 && y2 >= 0 && arr[y2][x2] === '1'
        ? connect(cellKey(x1, y1), cellKey(x2, y2))
        : identity;

const addCell = (sets, { x, y, above, left }) => compose(
    above ? connect(cellKey(x, y), cellKey(x    , y - 1)) : identity,
    left  ? connect(cellKey(x, y), cellKey(x - 1, y    )) : identity,
    insert(cellKey(x, y)),
)(sets);

const rowGroups = (sets, row, y, arr) => compose(
    reduce(
        addCell,
        sets
    ),
    filter(identity),
    arrayMap((val, x) => val && { val, x, y, above: y > 0 && arr[y - 1][x], left: arr[y][x - 1] })
)(row);/*
arrayReduce(
    addCell(arr, y),
    sets,
    row
);*/

const findGroups = arrayReduce(
    rowGroups,
    disjointSets
);

const p2 = compose(
    countSets,
    findGroups
);

module.exports = {
    solution: {
        type: '',
        pre: rowBinaries,
        ps: [p1, p2]
    }
    , hexToBinary
};