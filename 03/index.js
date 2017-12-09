const { 
    __, 
    compose, 
    add, 
    multiply, 
    modulo, 
    subtract, 
    ifElse, 
    equals, 
    always, 
    lt, 
    sum, 
    applySpec,
    cond,
    prop,
    complement,
    map,
    filter,
    isNil,
    T
} = require('ramda');
const { probe } = require('../shared');

const level = compose(Math.floor, multiply(0.5), add(1), Math.sqrt, add(-1));

const square = num => multiply(num, num);

const levelTop = compose(square, add(1), multiply(2));

const prevLevelTop = compose(levelTop, add(-1));

const offset = num => {
    const l = level(num);
    return ifElse(
        equals(1),
        always(0),
        compose(
            Math.abs, 
            subtract(l), 
            modulo(__, multiply(2, l)), 
            subtract(__, prevLevelTop(l))
        )
    )(num);
};

const p1 = compose(sum, applySpec([level, offset]));

console.log(p1(347991));

const nextX = ({ x, y, l }) => {
    if (y === -l) { return x + 1; }
    if (y === l && x > -l) { return x - 1; }
    return x;
};
    

const nextY = ({ x, y, l }) => {
    if (x === l && y < l && y !== -l) { return y + 1; }
    if (x === -l && y > -l) { return y - 1; }
    return y;
};

const nextL = ({ x, y, l }) => l + Number(x === l && y === -l);
    
const nextSquare = applySpec({ x: nextX, y: nextY, l: nextL });

const propAt = ({ x, y }) => `${x},${y}`;
const valAt = (square, obj) => obj[propAt(square)];

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

const sumAdjacent = (square, mp) => compose(
    sum, 
    filter(complement(isNil)),
    map((coords) => valAt(coords, mp)),
    adjacentCoords
)(square);

const p2 = val => {
    let mp = { '0,0': 1 };
    let curSquare = { x: 0, y: 0, l: 0 };
    
    while(valAt(curSquare, mp) <= val) {
        curSquare = nextSquare(curSquare);
        mp[propAt(curSquare)] = sumAdjacent(curSquare, mp);
    }
    
    return valAt(curSquare, mp);
};

module.exports = {
    level
    , offset
    , adjacentCoords
    , propAt
    , valAt
    , nextSquare
    , p1
    , p2
};