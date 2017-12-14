const ramda = require('ramda');
const { __, compose, curry, map, filter, times, identity, join, tail, equals, length, replace } = ramda;
const { add } = ramda;
const { probe } = require('../shared');
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

// String -> String
const rowBinary = compose(join(''), map(hexToBinary));

// String -> [String]
const rowBinaries = compose(map(rowBinary), rowHashes);

// String -> Number
const p1 = compose(
    length,
    replace(/0/g, ''),
    join(''),
    rowBinaries
);

const p2 = () => 0;

module.exports = {
    solution: {
        type: '',
        ps: [p1, p2]
    }
    , hexToBinary
};