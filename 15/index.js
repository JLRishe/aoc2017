const ramda = require('ramda');
const { __, compose, curry, map, filter, reduce, length, when, multiply, modulo } = ramda;
const { probe, add1, applyPattern } = require('../shared');
const { zipGen, filterGen, repeatGen, transformerGen, nextValue } = require('../shared/generators');

const generatorStartPattern = /^Generator ([A-Z]) starts with (\d+)$/;

// String -> Number
const parseStart = compose(
    ([,,start]) => start,
    applyPattern(generatorStartPattern)
);

// Number -> Number -> Gen Number
const generator = factor => start => transformerGen(
    v => v * factor % 2147483647,
    start
);

// [Number, Number] -> Boolean
const isMatch = ([a, b]) => (a & 0xFFFF) === (b & 0xFFFF);

// Number -> Gen Number
const a = generator(16807);
const b = generator(48271);

// It [Number] -> Number
const nextIsMatch = compose(Number, isMatch, nextValue);

// Number -> Gen Number -> Gen Number -> Number
const runMatches = curry((pairCount, aGen, bGen) => {
    const pairs = zipGen(aGen, bGen)();

    return reduce(
        c => c + nextIsMatch(pairs),
        0,
        repeatGen(pairCount)
    );
});

// Number -> Gen Number -> Number -> Gen Number
const pickyGenerator = curry((factor, genType, start) => 
    filterGen(v => v % factor === 0, genType(start))
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