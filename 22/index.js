const ramda = require('ramda');
const { __, compose, curry, map, filter, equals, merge, dec, divide, applySpec, length, head, prop, identity, memoizeWith, contains } = ramda;
const { probe, arrayReduce } = require('aoc-helpers');
const { genTransform, genTake, genFilter, genLength } = require('func-generators');

// CellState is '.'|'#'|'F'|'W'
// InfectionState is { d: Direction, pos: Point, madeInfection: Boolean }

const dMap = {
    '.': ({ dx, dy }) => ({ dx:  dy, dy: -dx }),
    '#': ({ dx, dy }) => ({ dx: -dy, dy:  dx }),
    'F': ({ dx, dy }) => ({ dx: -dx, dy: -dy }),
    'W': identity
};

// Direction -> CellState -> Direction
const nextD = (d, inf) => dMap[inf](d);

const transitions = {
    '.': 'W',
    'W': '#',
    '#': 'F',
    'F': '.'
};

// Number -> Number -> String
const key = (x, y) => `${x},${y}`;

// Number -> Number -> Grid -> CellState
const cellState = (x, y, grid) => grid[key(x, y)] || '.';

// Number -> Number -> CellState -> Grid -> Grid
const setInfection = (x, y, state, grid) => { grid[key(x, y)] = state; return grid; };

// [String] -> Grid
const buildGrid = lines => compose(
    arrayReduce(
        (g, row, y) => arrayReduce((gg, cell, x) => setInfection(x, y, cell, gg), g, row),
        {}
    )
)(lines);

// Number -> Number
const lengthToCenter = compose(divide(__, 2), dec);

// [[*]] -> Point
const findCenter = applySpec({
    x: compose(lengthToCenter, length, head),
    y: compose(lengthToCenter, length)
});

// [String] -> { grid: Grid, center: Point }
const parseGrid = applySpec({
    grid: buildGrid,
    center: findCenter
});

// Direction -> Number -> Point -> Point
const advance = ({ dx, dy }, count, { x, y }) => 
    ({ x: x + count * dx, y: y + count * dy });

// CellState -> CellState
const basicInfection = c => c === '#' ? '.' : '#';

// CellState -> CellState
const advancedInfection = prop(__, transitions);

// (CellState -> CellState) -> Grid -> InfectionState -> InfectionState
const step = curry((infection, grid, state) => {
    const { d, pos } = state;
    const { x, y } = pos;
    const inf = cellState(x, y, grid);
      
    const newD = nextD(d, inf);
    const newCellState = infection(inf);
    
    setInfection(x, y, newCellState, grid);
    
    return { d: newD, pos: advance(newD, 1, pos), madeInfection: newCellState === '#' };
});

// (CellState -> CellState) -> Grid -> Point -> Generator InfectionState
const walker = curry((infection, { grid, center }) => genTransform(
    step(infection, grid),
    { d: { dx: 0, dy: -1 }, pos: center, madeInfection: false } 
));

// (CellState -> CellState) -> Number -> [String] -> Number
const countInfections = curry((infection, stepCount, lines) => compose(
    genLength,
    genFilter(prop('madeInfection')),
    genTake(stepCount + 1),
    walker(infection),
    parseGrid
)(lines));

// [String] -> Number -> Number
const countBasicInfections = countInfections(basicInfection);

// [String] -> Number -> Number
const countAdvancedInfections = countInfections(advancedInfection);

// [String] -> Number
const p1 = countBasicInfections(10000);

// [String] -> Number
const p2 = countAdvancedInfections(10000000);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
    , countInfections
    , countBasicInfections
    , countAdvancedInfections
};