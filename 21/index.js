const ramda = require('ramda');
const { __, compose, map, filter, length, split, splitEvery, zip, times, identity, groupBy, head, unnest, values, last, reverse } = ramda;
const { probe } = require('aoc-helpers');
const { genTransform, genDrop, genHead } = require('func-generators');

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
    
const startGrid = [['.','#','.'], ['.','.','#'],['#','#','#']];
    
const parseLine = compose(
    ([from, to]) => ({ from, to }),
    map(map(split(''))),
    map(split('/')),
    split(' => ')
);
    
const p1 = splitGrids(startGrid);

const p2 = () => 0;

module.exports = {
    solution: {
        type: 'lines',
        pre: parseLine,
        ps: [p1, p2]
    }
    , splitGrids
    , parseLine
    , rotate2d
};