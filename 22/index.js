const ramda = require('ramda');
const { __, compose, curry, map, filter, equals, merge, dec, divide, applySpec, length, head, prop, identity } = ramda;
const { probe, arrayReduce } = require('aoc-helpers');
const { genTransform, genTake, genFilter, genLength } = require('func-generators');

const dMap = {
    '.': ({ dx, dy }) => ({ dx:  dy, dy: -dx }),
    '#': ({ dx, dy }) => ({ dx: -dy, dy:  dx }),
    'F': ({ dx, dy }) => ({ dx: -dx, dy: -dy }),
    'W': identity
};

const transitions = {
    '.': 'W',
    'W': '#',
    '#': 'F',
    'F': 'C'
};

const key = (x, y) => `${x},${y}`;

const cellState = (x, y, grid) => grid[key(x, y)] || '.';

const setInfection = (x, y, state, grid) => merge(grid, { [key(x, y)]: state });

const buildGrid = compose(
    arrayReduce(
        (g, row, y) => arrayReduce((gg, cell, x) => setInfection(x, y, cell, gg), g, row),
        {}
    )
);

const lengthToCenter = compose(divide(__, 2), dec);

const findCenter = applySpec({
    x: compose(lengthToCenter, length, head),
    y: compose(lengthToCenter, length)
});

const parseGrid = applySpec({
    grid: buildGrid,
    center: findCenter
});

// Direction -> Number -> Point -> Point
const advance = ({ dx, dy }, count, { x, y }) => 
    ({ x: x + count * dx, y: y + count * dy }
);

const basicInfection = c => c === '#' ? '.' : '#';

const step = infection => state => {
    const { d, pos, grid } = state;
    const { x, y } = pos;
    const inf = cellState(x, y, grid);
    
    const newD = dMap[inf](d);
    const newCellState = infection(inf);
    const newGrid = setInfection(x, y, newCellState, grid);
    
    return { d: newD, pos: advance(newD, 1, pos), grid: newGrid, madeInfection: newCellState === '#' };
};

const walker = curry((infection, { grid, center }) => genTransform(
    step(infection),
    { d: { dx: 0, dy: -1 }, pos: center, grid, madeInfection: false } 
));

const countInfections = curry((infection, stepCount, lines) => compose(
    genLength,
    genFilter(prop('madeInfection')),
    genTake(stepCount + 1),
    walker(infection),
    parseGrid
)(lines));

const countBasicInfections = countInfections(basicInfection);

const p1 = compose(
    countBasicInfections(10000)
);

const p2 = () => 0;

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
    , countInfections
    , countBasicInfections
};