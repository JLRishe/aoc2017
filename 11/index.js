const { __, compose, map, filter, curry, split, reduce, prop, max, merge } = require('ramda');
const { probe, repeatUntil, add1 } = require('../shared');

const stepMap = {
    n:  { x:  0, y:  2 },
    ne: { x:  1, y:  1 },
    se: { x:  1, y: -1 },
    s:  { x:  0, y: -2 },
    sw: { x: -1, y: -1 },
    nw: { x: -1, y:  1 }
};

const takeStep = ({ cur: { x: posx, y: posy }, maxDist }, { x: sx, y: sy}) => {
    const nextStep = { x: sx + posx, y: sy + posy };
    
    return { cur: nextStep, maxDist: max(maxDist, findDist(nextStep)) };
};

const walkSteps = reduce(takeStep, { cur: { x: 0, y: 0 }, maxDist: 0 });

const moveCoordTowardOrigin = c => c - c / Math.abs(c);

const stepTowardOrigin = ({ x, y, steps }) => 
    ({ x: moveCoordTowardOrigin(x), y: moveCoordTowardOrigin(y), steps: add1(steps) });

const findDist = compose(
    ({x, y, steps }) => steps + Math.abs(y) / 2 + Math.abs(x),
    repeatUntil(
        stepTowardOrigin,
        ({ x, y }) => x === 0 || y === 0
    ),
    merge(__, { steps: 0 })
);

const walkInput = compose(
    walkSteps,
    map(prop(__, stepMap)),
    split(',')
);

const p1 = compose(
    findDist,
    prop('cur'),
    walkInput
);

const p2 = compose(
    prop('maxDist'),
    walkInput
);

module.exports = {
    solution: { 
        type: 'input', 
        ps: [p1, p2] 
    }
};