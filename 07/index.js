const ramda = require('ramda');
const { __, compose, map, filter, curry, split, ifElse, always, isNil, any, contains, complement, find, indexBy, prop, sum, groupBy, values, when, equals, length, sortBy, head, tail, gt } = ramda;
const { reverse, chain } = ramda;
const { add, subtract } = ramda;
const { probe, applyPattern, children } = require('../shared');

const programPattern = /([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+,?\s?)+))?/;

// [, String, String, String] -> ProgramDef
const programPartsToObj = ([, name, weight, children]) => ({
    name,
    weight: Number(weight),
    children: ifElse(isNil, always([]), split(/,\s+/))(children)
});

// String -> ProgramDef
const parseProgram = compose(programPartsToObj, applyPattern(programPattern));

const hasChildWithName = name => compose(
    contains(name),
    children
);

// [ProgramDef] -> ProgramDef -> Boolean
const hasParent = programs => compose(
    any(__, programs),
    hasChildWithName,
    prop('name')
);

// [ProgramDef] -> String
const topProgramName = programs => compose(
    prop('name'),
    find(complement(hasParent(programs)))
)(programs);

// [String] -> String
const p1 = compose(topProgramName, map(parseProgram));

const wgt = prop('weight');
const totWeight = prop('totalWeight');

// { String: ProgramDef } -> String -> Program
const buildTree = curry((programIndex, name) => {
    const p = prop(name, programIndex);
    const childPrograms = map(buildTree(programIndex), children(p));
    const weight = wgt(p);
    const totalWeight = sum([weight, ...map(totWeight, childPrograms)]);
    
    return { name, weight, totalWeight, children: childPrograms };
});

// [ProgramDef] -> Program
const buildTreeStart = (programs) => {
    const programIndex = indexBy(prop('name'), programs);
    const tpn = topProgramName(programs);
    
    return buildTree(programIndex, tpn);
};

// Program -> [[Program]]
const groupChildrenByTotalWeight = compose(
    values, 
    groupBy(totWeight),
    children
);

// [*] -> Boolean
const moreThan1 = compose(gt(__, 1), length);

// Program -> Boolean
const isUnbalanced = compose(
    moreThan1,
    groupChildrenByTotalWeight
);

// TreeNode -> [TreeNode]
const selfAndDescendants = node => [node, ...chain(selfAndDescendants, children(node))];

// Program -> Program
const findUnbalancedDisc = compose(
    head, 
    // we want the deepest unbalanced disc, so reverse so that children are before their parents
    reverse,
    filter(isUnbalanced),
    selfAndDescendants
);

// Program -> [[Program]]
const groupUnbalancedChildren = compose(
    sortBy(length), 
    groupChildrenByTotalWeight
)

// Program -> Number
const findNeededWeight = unbalancedDisc => {
    const [[badDisc], [goodDisc]] = groupUnbalancedChildren(unbalancedDisc);
    
    const diff = subtract(totWeight(goodDisc), totWeight(badDisc));
    
    return add(wgt(badDisc), diff);
};

// 
const p2 = compose(
    findNeededWeight,
    findUnbalancedDisc,
    buildTreeStart,
    map(parseProgram)
);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
    , parseProgram
};