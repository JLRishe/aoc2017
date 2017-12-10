const ramda = require('ramda');
const { __, compose, curry, map, filter, merge, reduce, sum, identity, prop } = ramda;
const { replace } = ramda;
const { probe } = require('../shared');

const ignore = replace(/!./g, '');

const removeGarbage = replace(/<[^>]*>/g, '');

const addChild = (obj, child) => 
    merge(obj, { children: [...obj.children, child] });

const parseGroup = (state, ch) => {
    switch (ch) {
        case '{': return { type: 'group', parent: state, children: [], garbage: 0 };
        case '}': return addChild(state.parent, { children: state.children, garbage: state.garbage });
        case ',': return state;
        case '<': return { parent: state, type: 'garbage', garbage: 0 };
    }
};

const addGarbage = (obj, amt) => merge(obj, { garbage: obj.garbage + amt });

const parseGarbage = (state, ch) => {
    switch (ch) {
        case '>': return addGarbage(state.parent, state.garbage);
        case '!': return { type: 'ignore', parent: state };
        default:  return addGarbage(state, 1);
    }
};

const parseIgnore = prop('parent');

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

const parseStr = reduce(parseChar, { type: 'root', children: [], garbage: 0 });

const totalValues = curry((val, node) => 
    val + compose(sum, map(totalValues(val + 1)))(node.children)
);

const p1 = compose(
    totalValues(0),
    parseStr
);

const garbage = prop('garbage');

const totalGarbage = (node) =>
    garbage(node) + sum(map(totalGarbage, node.children));

const p2 = compose(
    totalGarbage,
    parseStr
);

module.exports = {
    ps: [p1, p2]
    , ignore
    , removeGarbage
    , parseStr
    , totalValues
};