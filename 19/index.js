const ramda = require('ramda');
const { __, compose, map, filter, curry, indexOf, without, find, merge, prop, values, join } = ramda;
const { probe } = require('aoc-helpers');
const { genTransform, genFilter, genHead } = require('func-generators');

// Move is { dx: Number, dy: Number }
// Point is { x: Number, y: Number }
// MoveState is { d: Move, pos: Point, Letters[String], Steps: Number }

const ds = {
    U: { dx:  0, dy: -1 },
    D: { dx:  0, dy:  1 },
    L: { dx: -1, dy:  0 },
    R: { dx:  1, dy:  0 }
};

// Move -> Point -> Point
const move = curry(({ dx, dy }, { x, y }) => ({ x: x + dx, y: y + dy }));

// [String] -> Point -> String
const valAt = (lines, { x, y }) => lines[y][x];

// [String] -> Move -> Point -> Move
const findNewD = (lines, { dx, dy }, pos) => find(
    d => d.dx !== -dx && d.dy !== -dy && valAt(lines, move(d, pos)) !== ' ',
    values(ds)
);

// [String] -> MoveState -> MoveState
const movePlayer = curry((lines, state) => {
    const { d, pos, letters, steps } = state;

    const curVal = valAt(lines, pos);
    
    const newLetters = /[A-Z]/.test(curVal)
        ? [...letters, curVal]
        : letters;

    const newD = valAt(lines, move(d, pos)) !== ' '
        ? d
        : findNewD(lines, d, pos);

    return newD
        ? merge(state, { d: newD, pos: move(newD, pos), letters: newLetters, steps: steps + 1 })
        : merge(state, { done: true, letters: newLetters });
});

// String -> Number
const findStartX = indexOf('|');

// [String] -> Generator MoveState
const mover = lines => genTransform(
    movePlayer(lines),
    { d: ds.D, pos: { x: findStartX(lines[0]), y: 0 }, letters: [], done: false, steps: 1 }
);

// [String] -> MoveState
const walkPath = compose(
    genHead,
    genFilter(prop('done')),
    mover
);

// [String] -> String
const p1 = compose(
    join(''),
    prop('letters'),
    walkPath
);

// [String] -> Number
const p2 = compose(
    prop('steps'),
    walkPath
);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};