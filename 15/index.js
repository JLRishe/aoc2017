const ramda = require('ramda');
const { __, compose, curry, map, filter, reduce, length, when, multiply, modulo, call, last, partial } = ramda;
const { probe, add1, applyPattern } = require('../shared');
const { genZip, genFilter, genTimes, genTransform, genMap, genLength } = require('../shared/generators');

const generatorStartPattern = /^Generator ([A-Z]) starts with (\d+)$/;

// String -> Number
const parseStart = compose(
    ([,,start]) => start,
    applyPattern(generatorStartPattern)
);

// Number -> Number -> Gen Number
const generator = factor => genTransform(v => v * factor % 2147483647);

// [Number, Number] -> Boolean
const isMatch = ([a, b]) => (a & 0xFFFF) === (b & 0xFFFF);

// Number -> Gen Number
const a = generator(16807);
const b = generator(48271);

// Number -> Gen Number -> Gen Number -> Number
const runMatches = curry((pairCount, aGen, aStart, bGen, bStart) => compose(
    genLength,
    genFilter(isMatch),
    genMap(([, pair]) => pair),
    genZip(genTimes(pairCount)),
    genZip
)(aGen(aStart), bGen(bStart)));

// Number -> Gen Number -> Number -> Gen Number
const pickyGenerator = curry((factor, baseGen, start) => genFilter(v => v % factor === 0, baseGen(start)));

// Number -> Gen Number
const pickya = pickyGenerator(4, a);
const pickyb = pickyGenerator(8, b);

const watchGenerators = curry((cycles, genAType, genBType, [aStart, bStart]) =>
    runMatches(cycles, genAType, aStart, genBType, bStart)
);

// [Number] -> Number
const p1 = watchGenerators(40000000, a, b);

// [Number] -> Number
const p2 = watchGenerators(5000000, pickya, pickyb);

module.exports = {
    solution: {
        type: 'lines',
        pre: parseStart,
        ps: [p1, p2]
    }
};