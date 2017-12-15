const { __, compose, curry } = require('ramda');

// Generator -> Generator -> Generator
const genZip = curry((gf1, gf2) => function* () {
    const it1 = gf1();
    const it2 = gf2();
    let n1 = it1.next();
    let n2 = it2.next();
    
    while (!(n1.done || n2.done)) {
        yield [n1.value, n2.value];
        n1 = it1.next();
        n2 = it2.next();
    }
});

// (* -> *) -> Generator -> Generator
const genMap = curry((f, genf) => function* (...args) {
    for (let val of genf(...args)) {
        yield f(val);
    }
});

// (* -> Boolean) -> Generator -> Generator
const genFilter = curry((f, genf) => function* (...args) {
    for (let val of genf(...args)) {
        if (f(val)) {
            yield val;
        }
    }
});

// Number -> Generator
const genTimes = (times) => function* () {
    for (let i = 0; i < times; i += 1) {
        yield i;
    }
};

// () -> Generator
function* genInfinite() {
    for (let i = 0; ; i += 1) {
        yield i;
    }
}

// (a -> a) -> a -> Generator
const genTransform = curry((update, start) => function* () {
    let val = start;
    while (true) {
        yield val;
        val = update(val);
    }
});

// Generator -> *
const genHead = gen => gen().next().value;

// Generator -> *
const genLength = gen => {
    let count = 0;
    
    for (let x of gen()) {
        count += 1;
    }
    
    return count;
};

module.exports = {
    genZip
    , genFilter
    , genMap
    , genTimes
    , genInfinite
    , genTransform
    , genHead
    , genLength
};
