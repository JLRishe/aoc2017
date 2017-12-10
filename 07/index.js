const ramda = require('ramda');
const { __, compose, map, filter, curry, split, ifElse, always, isNil, any, contains, complement, find, indexBy, prop, sum, groupBy, values, when, equals, length, sortBy, head, tail } = ramda;
const { add, subtract } = ramda;
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

const topProgramName = programs => 
    compose(prop('name'), find(complement(hasParent(programs))))(programs);

const p1 = compose(topProgramName, map(parseProgram));
const wgt = prop('weight');
const totWeight = prop('totalWeight');

const buildTree = curry((programIndex, name) => {
    const p = prop(name, programIndex);
    const children = map(buildTree(programIndex), prop('children', p));
    const weight = wgt(p);
    const totalWeight = weight + sum(map(totWeight, children));
    
    return { name, weight, totalWeight, children };
});

const childGroups = compose(values, groupBy(totWeight));

const single = compose(equals(1), length);

const findUnbalancedDisc = tree => {
    const children = prop('children', tree);
    const cg = childGroups(children);
    
    return single(cg)
        ? compose(head, filter(complement(isNil)), probe, map(findUnbalancedDisc))(children)
        : tree;
};

const findNeededWeight = unbalancedDisc => {
    const children = prop('children', unbalancedDisc);
    const cg = compose(sortBy(length), childGroups)(children);
    const badDisc = head(head(cg));
    const diff = subtract(
        compose(totWeight, head, head, tail)(cg), 
        totWeight(badDisc)
    );
    
    return add(wgt(badDisc), diff);
};

const p2 = lines => {
    const programs = map(parseProgram, lines);
    const programIndex = indexBy(prop('name'), programs);
    const tpn = topProgramName(programs);
    const tree = buildTree(programIndex, tpn);
    const unbalancedDisc = findUnbalancedDisc(tree);
    
    return findNeededWeight(unbalancedDisc);
};

module.exports = {
    parseProgram
    , ps: [p1, p2]
};