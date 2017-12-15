const { compose, map, filter, curry, prop, sortBy, merge, keys, head, last, length } = require('ramda');
const { probe } = require('../shared');

// DisjointSets -> Number
const countSets = sets => compose(
    length,
    filter(k => k === sets[k]),
    keys
)(sets);

// DisjointSets -> Number -> String -> DisjointSets 
const find = curry((sets, depth, val) => 
    sets[val] === val || !(val in sets)
        ? { depth, val }
        : find(sets, depth + 1, sets[val])
);

// DisjointSets -> String -> String -> DisjointSets
const join = curry((sets, a, b) => {
    const tops = compose(
        map(prop('val')),
        sortBy(prop('depth')),
        map(find(sets, 0))
    )([a, b]);
    const shortTop = head(tops);
    const longTop = last(tops);
    
    return merge(sets, { [a]: longTop, [b]: longTop, [shortTop]: longTop });
});

// DisjointSets -> String -> DisjointSets
const insert = curry((sets, key) => 
    merge(sets, { [key]: key in sets ? sets[key] : key })
);

const disjointSets = {};

module.exports = {
    disjointSets,
    insert,
    join,
    countSets
};

