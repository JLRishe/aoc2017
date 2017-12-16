const ramda = require('ramda');
const { __, compose, curry, map, filter, split, reduce, join, head, equals, call, modulo, converge, identity, memoizeWith } = ramda;
const { probe, applyPattern, rotate, swapPos, swapValues } = require('../shared');
const { genDrop, genHead, genTake, genTransform, genMap, genZip, genInfinite, genFilter } = require('func-generators');

const instrucTypes = {
    s: (c, _) => rotate(Number(c)),
    x: (p1, p2) => swapPos(Number(p1), Number(p2)),
    p: (p1, p2) => swapValues(p1, p2)
};

// String -> ([String] -> [String])
const parseInstruc = compose(
    ([,i,p1,p2]) => instrucTypes[i](p1, p2),
    applyPattern(/^([sxp])([^\/]+)(?:\/(.+))?/)
);

// Instruction is ([String] -> [String])
// String -> [Instruction]
const parseInstrucs = compose(
    map(parseInstruc),
    split(',')
);

// [String]
const dancers = split('', 'abcdefghijklmnop');

// [Instruction] -> [String]
const runDance = instrucs => memoizeWith(
    join(''),
    reduce(
        (d, i) => i(d),
        __,
        instrucs
    )
);

// [Instruction] -> [String] -> Generator [String]
const dances = curry((instrucs, dancers) => genTransform(
    runDance(instrucs),
    dancers    
));

// [Instruction] -> String
const p1 = compose(
    join(''),
    is => runDance(is)(dancers)
);

// Generator [String] -> Number
const findPeriod = compose(
    call,
    genHead,
    genDrop(1),
    genMap(head),
    genFilter(([,r]) => equals(r, dancers)),
    genZip(genInfinite)
);

// Generator [String] -> Number
const findTarget = compose(
    modulo(1000000000),
    findPeriod
);

// Number -> Generator a -> a
const genNth = curry((n, gen) => compose(
    genHead,
    genDrop(n)
)(gen));

// [Instruction] -> String
const p2 = compose(
    join(''),
    call,
    converge(genNth, [findTarget, identity]),
    is => dances(is, dancers)
);

module.exports = {
    solution: {
        parse: parseInstrucs,
        ps: [p1, p2]
    }
    , parseInstrucs
    , dancers
    , dances
};