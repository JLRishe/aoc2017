const ramda = require('ramda');
const { __, compose, curry, map, filter, length, split, times, identity, values, reverse, call, sum, prop, memoizeWith } = ramda;
const { splitEvery, zip, groupBy, head, unnest, last, contains, find, concat, join } = ramda;
const { probe, toArray } = require('aoc-helpers');
const { genTransform, genDrop, genHead, genTake } = require('func-generators');

// Cell is '#' | '.'
// Grid is [[Cell]]
// Transform is { size: Number, from: [Grid], to: Grid }

// [*] -> [[Number, *]]
const number = arr => zip(times(identity, arr.length), arr);

// [[*]] -> [[*]]
const invertArr = compose(
    map(map(last)),
    values,
    groupBy(head),
    unnest,
    map(number)
);

// Number -> [Grid]
const splitSubGrids = count => compose(
    invertArr,
    map(splitEvery(count))
);

// Number -> [[Grid]]
const splitGridsEvery = count => compose(
    map(splitSubGrids(count)),
    splitEvery(count)
);

// Grid -> [[Grid]]
const splitGrids = grids => length(grids) % 2 === 0
    ? splitGridsEvery(2)(grids)
    : splitGridsEvery(3)(grids);

// Grid -> Grid
const rotate2d = compose(
    invertArr,
    reverse
);

// Grid -> [Grid]
const allRotations = compose(
    toArray,
    call,
    genTake(4),
    genTransform(rotate2d)
);

// Grid -> Grid
const flip = map(reverse);
    
// Grid
const startGrid = [['.','#','.'], ['.','.','#'],['#','#','#']];

// Grid -> Transform -> Boolean
const isMatch = curry((grid, { size, from }) => 
    size === length(grid) && contains(grid, from)
);

// Combines a single row of grids into lines of cells
// [Grid] -> [[Cell]]
const combineGrids = compose(
    map(unnest),
    invertArr
);
    
// String -> Transform
const parseLine = compose(
    ([from, to]) => ({ size: length(from), from: concat(allRotations(from), allRotations(flip(from))), to }),
    map(map(split(''))),
    map(split('/')),
    split(' => ')
);

// [Transform] -> Grid -> Grid
const doReplacement = (transforms) => memoizeWith(
    compose(join(''), unnest),
    grid => compose(
        prop('to'),
        find(isMatch(grid))
    )(transforms)
);

// [Transform] -> Grid -> Grid
const expand = (transforms) => compose(
    unnest,
    map(combineGrids),
    map(map(doReplacement(transforms))),
    splitGrids
);

// [Transform] -> Generator Grid
const expander = transforms => genTransform(
    expand(transforms),
    startGrid
);

// Grid -> Number
const countLights = compose(
    sum,
    map(length),
    map(filter(c => c === '#'))
);

// Number -> [Transform] -> Number
const doExpansions = curry((count, transforms) => compose(
    countLights,
    genHead,
    genDrop(count),
    expander
)(transforms));
    
// [Transform] -> Number
const p1 = doExpansions(5);

// [Transform] -> Number
const p2 = doExpansions(18);

module.exports = {
    solution: {
        type: 'lines',
        pre: parseLine,
        ps: [p1, p2]
    }
    , splitGrids
    , parseLine
    , rotate2d
    , allRotations
    , isMatch
    , combineGrids
    , doExpansions
};