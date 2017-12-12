const { __, compose, map, filter, curry, split, reduce, prop, min, max, merge, subtract, memoizeWith, identity } = require('ramda');
const { probe, repeatUntil, add1 } = require('../shared');

// Number -> Number -> CartPair
const cartPair = (x, y) => ({ x, y });

const stepMap = {
    n:  cartPair( 0,  2),
    ne: cartPair( 1,  1),
    se: cartPair( 1, -1),
    s:  cartPair( 0, -2),
    sw: cartPair(-1, -1),
    nw: cartPair(-1,  1)
};

// CartPair -> Number
const findDist = (pt) => {
    const absPt = map(Math.abs, pt);
    const diagDist = min(absPt.x, absPt.y);
    const afterDiag = map(subtract(__, diagDist), absPt);
    
    return diagDist + afterDiag.x + afterDiag.y / 2;
}

// CartPair -> Number -> Number -> WalkState
const walkState = (cur, dist, maxDist) => ({ cur, dist, maxDist });

// CartPair -> CartPair -> CartPair
const movePos = ({ x: posx, y: posy }, { x: movex, y: movey }) => cartPair(posx + movex, posy + movey);

// WalkState -> CartPair -> WalkState
const takeStep = ({ cur, maxDist }, step) => {
    const next = movePos(cur, step);
    const dist = findDist(next);
    
    return walkState(next, dist, max(maxDist, dist));
};

// [String] -> WalkState
const walkSteps = reduce(takeStep, walkState(cartPair(0,0), 0, 0));

// String -> WalkState
const walkInput = memoizeWith(
    identity,
    compose(
        walkSteps,
        map(prop(__, stepMap)),
        split(',')
    )
);

// String -> String -> *
const propFromWalk = targetProp => compose(
    prop(targetProp),
    walkInput
);

// String -> Number
const p1 = propFromWalk('dist');

// String -> Number
const p2 = propFromWalk('maxDist');

module.exports = {
    solution: { 
        type: 'input', 
        ps: [p1, p2] 
    }
};