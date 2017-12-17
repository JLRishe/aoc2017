const ramda = require('ramda');
const { __, compose, curry, map, split, reduce, join, head, equals, call, modulo, converge, identity, memoizeWith, applyTo } = ramda;
const { probe, applyPattern, rotate, swapPos, swapValues } = require('../shared');
const { genDrop, genHead, genTake, genTransform, genMap, genZip, genInfinite, genFilter } = require('func-generators');

// Instruction is ([String] -> [String])
const instrucTypes = {
    s: (c)      => rotate(Number(c)),
    x: (p1, p2) => swapPos(Number(p1), Number(p2)),
    p:             swapValues
};

// String -> ([String] -> [String])
const parseInstruc = compose(
    ([,i,p1,p2]) => instrucTypes[i](p1, p2),
    applyPattern(/^([sxp])([^\/]+)(?:\/(.+))?/)
);

// [String]
const dancers = split('', 'abcdefghijklmnop');

// [Instruction] -> [String]
const runDance = instrucs => memoizeWith(
    join(''),
    reduce(applyTo, __, instrucs)
);

// [Instruction] -> [String] -> Generator [String]
const dances = curry((dancers, instrucs) => genTransform(
    runDance(instrucs),
    dancers
));

// Number -> Generator a -> a
const genNth = curry((n, gen) => compose(
    genHead,
    genDrop(n)
)(gen));

// [Instruction] -> String
const p1 = compose(
    join(''),
    call,
    genNth(1)
);

// Generator [String] -> Number
const findPeriod = compose(
    call,
    genNth(1),
    genMap(head),
    genFilter(([,r]) => equals(r, dancers)),
    genZip(genInfinite)
);

// Generator [String] -> Number
const findTarget = compose(
    modulo(1000000000),
    findPeriod
);

// [Instruction] -> String
const p2 = compose(
    join(''),
    call,
    converge(genNth, [findTarget, identity])
);

module.exports = {
    solution: {
        pre: compose(dances(dancers), map(parseInstruc), split(',')),
        ps: [p1, p2]
    }
    , dancers
    , dances
};