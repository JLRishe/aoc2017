const ramda = require('ramda');
const { __, compose, curry, map, filter, reduce, } = ramda;
const { probe, add1 } = require('../shared');

const generator = factor => function* (start) {
    let next = start;
    do {
        yield next;
        next = next * factor % 2147483647;
    } while(true);
};

const isMatch = ([a, b]) => (a & 0xFFFF) === (b & 0xFFFF);

const a = generator(16807);
const b = generator(48271);

const nextValue = it => it.next().value;

function* combine(g1, g2) {
    let n1 = g1.next();
    let n2 = g2.next();
    
    while (!(n1.done || n2.done)) {
        yield [n1.value, n2.value];
        n1 = g1.next();
        n2 = g2.next();
    }
}

function* repeat(times) {
    for (let i = 0; i < times; i += 1) {
        yield i;
    }
}

const incIf = curry((f, val) => when(f, add1));

const runMatches = curry((pairCount, aGen, bGen) => {
    const generators = combine(aGen, bGen);

    return reduce(
        c => c += (isMatch(nextValue(generators)) ? 1 : 0),
        0,
        repeat(pairCount)
    );
});

const runMatches2 = (a, b) => {
    let matchCount = 0;
    let hasA = false;
    let hasB = false;
    let pairCount = 0;
    for (; pairCount < 5000000;) {
        if (hasA && hasB) {
            if (isMatch(a, b)) { matchCount += 1 }
            hasA = false;
            hasB = false;
            pairCount += 1;
        }
        if (!hasA) {
            a = nextA(a);
            if (a % 4 === 0) {
                hasA = true;   
            }
        }
        if (!hasB) {
            b = nextB(b);
            hasB = (b % 8 === 0);
        }        
    }
    
    return matchCount;
}

const p1 = () => runMatches(40000000, a(618), b(814));

const p2 = () => 0;

module.exports = {
    solution: {
        type: '',
        ps: [p1, p2]
    }
};