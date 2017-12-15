const ramda = require('ramda');
const { __, compose, curry, map, filter, reduce, length, when } = ramda;
const { probe, add1 } = require('../shared');
const { zipGen, filterGen, repeatGen, transformerGen } = require('../shared/generators');

const generator = factor => start => transformerGen(
    v => v * factor % 2147483647,
    start
);
/*function* () {
    let next = start;
    do {
        yield next;
        next = 
    } while(true);
};*/

const isMatch = ([a, b]) => (a & 0xFFFF) === (b & 0xFFFF);

const a = generator(16807);
const b = generator(48271);

const nextValue = it => it.next().value;


const runMatches = curry((pairCount, aGen, bGen) => {
    const pairs = zipGen(aGen, bGen)();

    return reduce(
        c => c + Number(isMatch(nextValue(pairs))),
        0,
        repeatGen(pairCount)
    );
});


const pickyGenerator = curry((factor, genType, start) => 
    filterGen(v => v % factor === 0, genType(start))
);

const pickya = pickyGenerator(4, a);
const pickyb = pickyGenerator(8, b);

const p1 = () => runMatches(40000000, a(618), b(814));

const p2 = () => runMatches(5000000, pickya(618), pickyb(814));;

module.exports = {
    solution: {
        type: '',
        ps: [p1, p2]
    }
};