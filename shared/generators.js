const { __, compose, curry } = require('ramda');

const zipGen = curry((gf1, gf2) => function* () {
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

const filterGen = curry((f, genf) => function* (...args) {
    const gen = genf.apply(null, args);
    let next = gen.next();
    
    while (!next.done) {
        if (f(next.value)) {
            yield next.value;
        }
        next = gen.next();
    }
});

function* repeatGen(times) {
    for (let i = 0; i < times; i += 1) {
        yield i;
    }
}

function* infiniteGen() {
    for (let i = 0; ; i += 1) {
        yield i;
    }
}

const transformerGen = curry((update, start) => function* () {
    let val = start;
    while (true) {
        yield val;
        val = update(val);
    }
});


module.exports = {
    zipGen
    , filterGen
    , repeatGen
    , infiniteGen
    , transformerGen
};
