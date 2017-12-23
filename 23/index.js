const ramda = require('ramda');
const { __, compose, map, filter } = ramda;
const { genFilter, genLength } = require('func-generators');
const { probe } = require('aoc-helpers');
const { asmEngine, resolveVal } = require('aoc-helpers/asm');

const instrucTypes = {
    set: (x, y) => state => ({ setReg: { [x]: resolveVal(y, state) } }),
    sub: (x, y) => state => ({ setReg: { [x]: resolveVal(x, state) - resolveVal(y, state) } }),
    mul: (x, y) => state => ({ setReg: { [x]: resolveVal(x, state) * resolveVal(y, state) } }),
    jnz: (x, y) => state => resolveVal(x, state) !== 0 ? { posChange: resolveVal(y, state) } : {}
};

const p1 = compose(
    genLength,
    genFilter(s => s.instruc === 'mul'),
    asmEngine(instrucTypes, {})
);

const p2 = () => 0;

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};