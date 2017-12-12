const ramda = require('ramda');
const { __, compose, map, filter, curry, indexBy, prop, ifElse, always, keys, identity, split } = ramda;
const { length, uniq, without, contains, flatten, concat, sortBy } = ramda;
const { probe } = require('../shared');

const parsePipe = compose(
    ([name, neighbors]) => ({ name, neighbors: split(', ', neighbors) }),
    split(' <-> ')
);

const findGroupInner = curry((allPipes, soFar, name) => 
    contains(name, soFar)
    ? soFar
    : compose(
        uniq,
        flatten,
        map(findGroupInner(allPipes, [...soFar, name])),
        prop('neighbors'),
        prop(name)
    )(allPipes)
);

const findGroup = curry((name, pipes) => 
    sortBy(identity, findGroupInner(pipes, [], name))
);

const buildPipeNetwork = compose(
    indexBy(prop('name')),
    map(parsePipe)
);

const p1 = compose(
    length,
    findGroup('0'),
    buildPipeNetwork
);

const allGroups = allPipes => compose(
    uniq,
    map(findGroup(__, allPipes)),
    keys
)(allPipes);

const p2 = compose(
    length,
    allGroups,
    buildPipeNetwork
);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};