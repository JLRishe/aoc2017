const ramda = require('ramda');
const { __, compose, complement, isNil } = ramda;
const { genTransform, genMap, genFilter, genHead, genLength, genLast, genStop } = require('func-generators');
const { probe } = require('aoc-helpers');
const { asmEngine, resolveVal } = require('aoc-helpers/asm');

const instrucTypes = {
    set: (x, y) => state => ({ setReg: { [x]: resolveVal(y, state) } }),
    sub: (x, y) => state => ({ setReg: { [x]: resolveVal(x, state) - resolveVal(y, state) } }),
    mul: (x, y) => state => ({ setReg: { [x]: resolveVal(x, state) * resolveVal(y, state) } }),
    jnz: (x, y) => state => (resolveVal(x, state) !== 0 ? { posChange: resolveVal(y, state) } : {})
};

// [String] -> Number
const p1 = compose(
    genLength,
    genFilter(s => s.instruc === 'mul'),
    asmEngine(instrucTypes, {})
);

// Number -> Number -> Number -> Generator Number
const genRange = (start, end, step) => genTransform(
    s => s + step <= end ? s + step : genStop,
    start
);

// Number -> Boolean
const isPrime = n => compose(
    isNil,
    genHead,
    genFilter(i => i == ~~i),
    genMap(i => n / i),
    sq => genRange(2, sq, 1),
    Math.sqrt
)(n);

// () -> Number
const p2 = () => compose(
    genLength,
    genFilter(complement(isPrime))
)(genRange(109900, 126900, 17));

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};