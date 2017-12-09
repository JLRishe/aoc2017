const { __, compose, map, filter, curry, split, ifElse, always, isNil, any, contains, complement, find } = require('ramda');
const { probe, applyPattern } = require('../shared');

const programPattern = /([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+,?\s?)+))?/;

const programPartsToObj = ([_, name, weight, children]) => ({
    name,
    weight: Number(weight),
    children: ifElse(isNil, always([]), split(/,\s+/))(children)
});

const parseProgram = compose(programPartsToObj, applyPattern(programPattern));

const hasParent = curry((programs, program) => 
    any(p => contains(program.name, p.children), programs)
);

const p1 = lines => {
    const programs = map(parseProgram, lines);
    
    const top = find(complement(hasParent(programs)), programs);
    
    return top.name;
};

const p2 = () => 0;

module.exports = {
    parseProgram
    , ps: [p1, p2]
};