const ramda = require('ramda');
const { __, compose, curry, map, filter, insert, prop } = ramda;
const { probe, wrapIndex, wrapIndexValue } = require('../shared');
const { genTransform, genFilter, genHead, genTake, genLast } = require('func-generators');

const nextStop = curry((stepLength, pos, lastStep) => (pos + stepLength) % (lastStep + 1));

const nextState = curry((stepLength, { arr, pos, step }) => {
    const stopPos = nextStop(stepLength, pos, step);
    const newArr = insert(stopPos + 1, step + 1, arr);
    
    return {
        arr: newArr,
        pos: wrapIndexValue(stopPos + 1, newArr),
        step: step + 1
    };
});

const transformer = stepLength => genTransform(
    nextState(stepLength),
    { arr: [0], pos: 0, step: 0 }
);

const p1 = compose(
    res => wrapIndex(res.pos + 1, res.arr),
    genHead,
    genFilter(({ step }) => step === 2017),
    transformer
);

const posTransformer = stepLength => genTransform(
    ({ step, stop }) => ({ 
        step: step + 1, 
        stop: nextStop(stepLength, (stop + 1) % (step + 1), step) 
    }),
    { step: 0, stop: 0 }
);

const p2 = compose(
    prop('step'),
    genLast,
    genFilter(({ stop }) => stop === 0),
    genTake(50000001),
    posTransformer
);

module.exports = {
    solution: {
        type: '',
        pre: Number,
        ps: [p1, p2]
    }
    , nextState
    , posTransformer
    , Number
};