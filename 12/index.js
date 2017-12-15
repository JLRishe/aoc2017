const ramda = require('ramda');
const { __, compose, map, filter, reduce, curry, indexBy, prop, ifElse, always, keys, identity, split, flip } = ramda;
const { length, uniq, without, contains, flatten, concat, sortBy } = ramda;
const { probe } = require('../shared');
const { disjointSets, insert, join, allSets, countSets, findSet } = require('../shared/unionFind');

// String -> Pipe
const parsePipe = compose(
    ([name, neighbors]) => ({ name, neighbors: split(', ', neighbors) }),
    split(' <-> ')
);

// DisjointSets -> Pipe -> DisjointSets
const addConnection = (sets, pipe) => reduce(
    (s, n) => join(pipe.name, n, s),
    sets,
    pipe.neighbors
);

// DisjointSets -> Pipe -> DisjointSets
const buildPipeNetwork = reduce(
    addConnection,
    disjointSets
);

// [Pipe] -> Number
const p1 = compose(
    length,
    findSet(__, '0'),
    buildPipeNetwork
);

// [Pipe] -> Number
const p2 = compose(
    countSets,
    buildPipeNetwork
);

module.exports = {
    solution: {
        type: 'lines',
        parse: parsePipe,
        ps: [p1, p2]
    }
};