const ramda = require('ramda');
const { __, compose, curry, map, filter, reduce, length, when, multiply, modulo, call, last } = ramda;
const { probe, add1, applyPattern } = require('../shared');
const { genZip, genFilter, genTimes, genTransform, genHead, genMap, genLength } = require('../shared/generators');

const generatorStartPattern = /^Generator ([A-Z]) starts with (\d+)$/;

// String -> Number
const parseStart = compose(
    ([,,start]) => start,
    applyPattern(generatorStartPattern)
);

// Number -> Number -> Gen Number
const generator = factor => start => genTransform(
    v => v * factor % 2147483647,
    start
);

// [Number, Number] -> Boolean
const isMatch = ([a, b]) => (a & 0xFFFF) === (b & 0xFFFF);

// Number -> Gen Number
const a = generator(16807);
const b = generator(48271);

// Number -> Gen Number -> Gen Number -> Number
const runMatches = curry((pairCount, aGen, bGen) => compose(
    genLength,
    genFilter(isMatch),
    genMap(([, pair]) => pair),
    genZip(genTimes(pairCount)),
    genZip
)(aGen, bGen));

// Number -> Gen Number -> Number -> Gen Number
const pickyGenerator = curry((factor, genType, start) => 
    genFilter(v => v % factor === 0, genType(start))
);

// Number -> Gen Number
const pickya = pickyGenerator(4, a);
const pickyb = pickyGenerator(8, b);

const watchGenerators = curry((cycles, genAType, genBType, [aStart, bStart]) =>
    runMatches(cycles, genAType(aStart), genBType(bStart))
);

// [Number] -> Number
const p1 = watchGenerators(40000000, a, b);

// [Number] -> Number
const p2 = watchGenerators(5000000, pickya, pickyb);

module.exports = {
    solution: {
        type: 'lines',
        parse: parseStart,
        ps: [p1, p2]
    }
};