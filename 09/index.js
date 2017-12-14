const ramda = require('ramda');
const { __, compose, curry, map, filter, merge, reduce, add, sum, identity, prop, concat } = ramda;
const { replace } = ramda;
const { probe } = require('../shared');

// String -> State -> State
const newState = curry((type, parent) => ({ type, parent, children: [], garbage: 0 }));

// String -> (a -> a) -> State -> a -> State
const updateState = curry((propName, op, state, value) =>
    merge(state, { [propName]: op(state[propName], value) })
);

// State -> [*] -> State
const addChildren = updateState('children', concat);

// State -> String -> State
const parseGroup = (state, ch) => {
    switch (ch) {
        case '{': return newState('group', state);
        case '}': return addChildren(state.parent, [{ children: state.children, garbage: state.garbage }]);
        case ',': return state;
        case '<': return newState('garbage', state);
    }
};

// State -> Number -> State
const addGarbage = updateState('garbage', add);

// State -> String -> State
const parseGarbage = (state, ch) => {
    switch (ch) {
        case '>': return addGarbage(state.parent, state.garbage);
        case '!': return newState('ignore', state);
        default :  return addGarbage(state, 1);
    }
};

// State -> State
const parseIgnore = prop('parent');

// State -> String -> State
const parseChar = (state, ch) => {
    switch (state.type) {
        case 'root':
        case 'group':
            return parseGroup(state, ch);
        case 'garbage':
            return parseGarbage(state, ch);
        case 'ignore':
            return parseIgnore(state, ch);
    }
};

// String -> State
const parseStr = reduce(parseChar, newState('root', null));

// Number -> ResultNode -> Number
const totalValues = curry((val, node) => add(
    val,
    compose(
        sum,
        map(totalValues(val + 1))
    )(node.children)
));

// String -> Number
const p1 = compose(
    totalValues(0),
    parseStr
);

// ResultNode -> Number
const totalGarbage = (node) =>
    node.garbage + sum(map(totalGarbage, node.children));

// String -> Number
const p2 = compose(
    totalGarbage,
    parseStr
);

module.exports = {
    solution: {
        ps: [p1, p2]
    }    
    , parseStr
    , totalValues
};