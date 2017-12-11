const { __, compose, map, filter, add, subtract, lt, gt, lte, gte, equals, complement, reduce, when, curry, isNil, always, apply, values, prop, merge, max } = require('ramda');
const { probe, applyPattern } = require('../shared');

const instrucPattern = /([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([<>=!]+) (-?\d+)/;

const ops = { inc: add, dec: subtract };

const comps = {
    '<': lt,
    '>': gt,
    '<=': lte,
    '>=': gte,
    '==': equals,
    '!=': complement(equals)
};

const instrucPartsToObj = ([_, reg, op, amt, cReg, comp, val]) => ({ 
    reg, 
    op: ops[op], 
    amt: Number(amt), 
    cReg, 
    comp: comps[comp], 
    val: Number(val) 
});

const parseInstruc = compose(instrucPartsToObj, applyPattern(instrucPattern));

const regValue = name => compose(when(isNil, always(0)), prop(name));

const shouldApply = ({ cReg, comp, val }) => compose(comp(__, val), regValue(cReg));

const applyInstruc = curry(({ reg, op, amt }, regs) => 
    merge(regs, { [reg]: op(regValue(reg)(regs), amt)})
);

const checkAndApplyInstruc = curry((regs, instruc) => when(shouldApply(instruc), applyInstruc(instruc))(regs));

const largestReg = compose(apply(Math.max), values);

const p1 = compose(largestReg, reduce(checkAndApplyInstruc, {}), map(parseInstruc));

const applyInstrucKeepMax = ({ regs, maxReg }, instruc) => {
    const nextRegs = checkAndApplyInstruc(regs, instruc);
    
    return { regs: nextRegs, maxReg: max(maxReg, largestReg(nextRegs)) };
};

const p2 = compose(prop('maxReg'), reduce(applyInstrucKeepMax, { regs: {}, maxReg: 0 }), map(parseInstruc));

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
    , parseInstruc
    , shouldApply
    , applyInstruc
};