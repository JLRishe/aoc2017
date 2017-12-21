const ramda = require('ramda');
const { __, compose, curry, map, filter, length, split, times, identity, values, reverse, call, sum, prop, memoizeWith } = ramda;
const { splitEvery, zip, groupBy, head, unnest, last, contains, find, concat, join } = ramda;
const { probe, toArray } = require('aoc-helpers');
const { genTransform, genDrop, genHead, genTake } = require('func-generators');

// [*] -> [[Number, *]]
const number = arr => zip(times(identity, arr.length), arr);


const splitSubGrids = count => compose(
    map(map(last)),
    values,
    groupBy(head),
    unnest,
    map(number),
    map(splitEvery(count))
);

const splitGridsEvery = count => compose(
    map(splitSubGrids(count)),
    splitEvery(count)
);

const splitGrids = grids => length(grids) % 2 === 0
    ? splitGridsEvery(2)(grids)
    : splitGridsEvery(3)(grids);

const rotate2d = compose(
    map(map(last)),
    values,
    groupBy(head),
    reverse,
    unnest,
    map(number)
);

const allRotations = compose(
    toArray,
    call,
    genTake(4),
    genTransform(rotate2d)
);

const flip = map(reverse);
    
const startGrid = [['.','#','.'], ['.','.','#'],['#','#','#']];

const isMatch = curry((grid, { size, from }) => 
    size === length(grid) && contains(grid, from)
);

const combineGrids = compose(
    map(unnest),
    map(map(last)),
    values,
    groupBy(head),
    unnest,
    map(number)
);
    
const parseLine = compose(
    ([from, to]) => ({ size: length(from), from: concat(allRotations(from), allRotations(flip(from))), to }),
    map(map(split(''))),
    map(split('/')),
    split(' => ')
);

const doReplacement = (transforms) => memoizeWith(
    compose(join(''), unnest),
    grid => compose(
        prop('to'),
        find(isMatch(grid))
    )(transforms)
);

const expand = (transforms) => compose(
    unnest,
    map(combineGrids),
    map(map(doReplacement(transforms))),
    splitGrids
);

const expander = lines => genTransform(
    expand(map(parseLine, lines)),
    startGrid
);

const countLights = compose(
    sum,
    map(length),
    map(filter(c => c === '#'))
);

const doExpansions = curry((count, lines) => compose(
    countLights,
    genHead,
    genDrop(count),
    expander
)(lines));
    
const p1 = doExpansions(5);

const p2 = doExpansions(18);

module.exports = {
    solution: {
        type: 'lines',
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