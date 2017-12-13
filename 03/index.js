const ramda = require('ramda');
const { __, compose, curry, map, filter, either, both, ifElse, equals, always, applySpec, cond, prop, complement, isNil, merge } = ramda;
const { add, multiply, modulo, subtract, lt, sum } = ramda;

const { probe, add1, sub1, repeatUntil } = require('../shared');

// Number -> Number
const level = compose(
    Math.floor, 
    multiply(0.5), 
    add(1), 
    Math.sqrt, 
    sub1
);

// Number -> Number
const square = num => multiply(num, num);

// Number -> Number
const levelTop = compose(
    square,
    add1,
    multiply(2)
);

// Number -> Number
const prevLevelTop = compose(levelTop, sub1);

// Horizontal or vertical offset from the center, within a layer
// Number -> Number
const offset = num => {
    const l = level(num);
    
    return equals(1, num)
        ? 0
        : Math.abs((num - prevLevelTop(l)) % (2 * l) - l);
};

// String -> Number
const p1 = compose(
    sum,
    applySpec([level, offset]),
    Number
);

// can't use equals() here because it returns false for 0 and -0
// Position -> Boolean
const isOnBottom = ({ y, layer }) => y === -layer;
const isOnTop    = ({ y, layer }) => y ===  layer;
const isOnRight  = ({ x, layer }) => x ===  layer;
const isOnLeft   = ({ x, layer }) => x === -layer;

// Position -> Number
const xProp = prop('x');
const yProp = prop('y');
const lProp = prop('layer');

// Position -> Number
const nextX = ifElse(
    isOnBottom,
    compose(add1, xProp),
    ifElse(
        both(isOnTop, complement(isOnLeft)),
        compose(sub1, xProp),
        xProp
    )
);

// Position -> Number
const nextY = ifElse(
    either(
        isOnBottom,
        both(isOnTop, complement(isOnLeft)),
    ),
    yProp,
    ifElse(
        isOnLeft,
        compose(sub1, yProp),
        compose(add1, yProp)
    )
);

// Position -> Number
const nextL = compose(
    sum,
    applySpec([lProp, both(isOnRight, isOnBottom)])
);

// Position -> Position    
const nextSquare = applySpec({ x: nextX, y: nextY, layer: nextL });

// Position -> String
const propAt = ({ x, y }) => `${x},${y}`;
// Position -> Object -> Number
const valAt = curry((square, obj) => obj[propAt(square)]);

// Position -> { x: Number, y: Number }
const adjacentCoords = ({ x, y }) => [
    { x: x - 1, y: y + 1 },
    { x: x    , y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y     },
    { x: x + 1, y: y     },
    { x: x - 1, y: y - 1 },
    { x: x    , y: y - 1 },
    { x: x + 1, y: y - 1 }
];

// Position -> Object -> Number
const sumAdjacent = (square, mp) => compose(
    sum, 
    filter(complement(isNil)),
    map(valAt(__, mp)),
    adjacentCoords
)(square);

// { mp: Object, pos: Position } -> { mp: Object, pos: Position }
const nextState = ({ mp, pos }) => {
    const newPos = nextSquare(pos);
    
    return {
        mp: merge(mp, { [propAt(newPos)]: sumAdjacent(newPos, mp) }),
        pos: newPos
    };
};

// String -> Number
const p2 = val => {
    const valNum = Number(val);
    
    const finishState = repeatUntil(
        nextState,
        ({ mp, pos }) => valAt(pos, mp) > valNum,
        { mp: { '0,0': 1 }, pos: { x: 0, y: 0, layer: 0 } }
    );
    
    return valAt(finishState.pos, finishState.mp);
};

module.exports = {
    solution: {
        ps: [p1, p2]
    }
    , level
    , offset
    , adjacentCoords
    , propAt
    , valAt
    , nextSquare
};