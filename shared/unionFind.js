const { compose, map, filter, curry, prop, sortBy, merge, keys, values, head, last, length, groupBy } = require('ramda');
const { probe } = require('../shared');

// DisjointSets -> Number
const countSets = sets => compose(
    length,
    filter(k => k === sets[k]),
    keys
)(sets);

// DisjointSets -> Number -> String -> { depth: Number, val: String } 
const findWithDepth = curry((sets, depth, val) => 
    sets[val] === val || !(val in sets)
        ? { depth, val }
        : findWithDepth(sets, depth + 1, sets[val])
);

const find = curry((sets, val) => 
    prop('val', findWithDepth(sets, 0, val))
);

const findSet = curry((sets, val) => {
    const targetSet = find(sets, val);
    
    return compose(
        filter(k => find(sets, k) === targetSet),
        keys
    )(sets);
});

// DisjointSets -> [[String]]
const allSets = sets => compose(
    values,
    groupBy(find(sets)),
    keys,
)(sets);

// DisjointSets -> String -> String -> DisjointSets
const connect = curry((a, b, sets) => {
    const tops = compose(
        map(prop('val')),
        sortBy(prop('depth')),
        map(findWithDepth(sets, 0))
    )([a, b]);
    const shortTop = head(tops);
    const longTop = last(tops);
    
    return merge(sets, { [a]: longTop, [b]: longTop, [shortTop]: longTop });
});

// DisjointSets -> String -> DisjointSets
const insert = curry((key, sets) => 
    merge(sets, { [key]: key in sets ? sets[key] : key })
);

const disjointSets = {};

module.exports = {
    disjointSets,
    insert,
    connect,
    countSets,
    findSet,
    allSets
};

