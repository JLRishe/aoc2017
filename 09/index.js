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

const addGarbage = (obj) => merge(obj, { garbage: obj.garbage + 1 });

const parseGarbage = (state, ch) => {
    switch (ch) {
        case '>': return addGarbage(state.parent);
        case '!': return { type: 'ignore', parent: state };
        default:  return addGarbage(state);
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

const parseStr = reduce(parseChar, { type: 'root', children: [] });

const totalValues = curry((val, node) => 
    val + compose(sum, map(totalValues(val + 1)))(node.children)
);

const p1 = compose(
    totalValues(0),
    parseStr
);

const p2 = () => 0;

module.exports = {
    ps: [p1, p2]
    , ignore
    , removeGarbage
    , parseStr
    , totalValues
};