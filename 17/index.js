const ramda = require('ramda');
const { __, compose, curry, map, filter, insert, prop } = ramda;
const { probe, wrapIndex, wrapIndexValue } = require('../shared');
const { genTransform, genFilter, genHead, genTake, genLast } = require('func-generators');

// SpinlockState is { arr: [Number], pos: Number, step: Number }

// Number -> Number -> Number -> Number
const nextPos = curry((stepLength, pos, lastStep) => (pos + stepLength) % (lastStep + 1) + 1);

// Number -> SpinlockState -> SpinlockState
const nextState = curry((stepLength, { arr, pos, step }) => {
    const insPos = nextPos(stepLength, pos, step);
    
    return {
        arr: insert(insPos, step + 1, arr),
        pos: insPos,
        step: step + 1
    };
});

// Number -> Generator SpinlockState
const transformer = stepLength => genTransform(
    nextState(stepLength),
    { arr: [0], pos: 0, step: 0 }
);

// Number -> Number
const p1 = compose(
    res => wrapIndex(res.pos + 1, res.arr),
    genHead,
    genFilter(({ step }) => step === 2017),
    transformer
);

// Number -> Generator { step: Number, stop: Number }
const posTransformer = stepLength => genTransform(
    ({ step, pos }) => ({ 
        step: step + 1, 
        pos: nextPos(stepLength, pos, step) 
    }),
    { step: 0, pos: 0 }
);

// Number -> Number
const p2 = compose(
    prop('step'),
    genLast,
    genFilter(({ pos }) => pos === 1),
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