const ramda = require('ramda');
const { __, compose, map, filter, merge, curry, prop, isEmpty, any, complement, add, multiply, modulo, omit } = ramda;
const { probe, applyPattern } = require('../shared');
const { genTransform, genHead, genFilter } = require('func-generators');

// State is { recovered: Number, lastFreq: Number, pos: Number, regs: {} }

// { Number } -> String -> Number
const regValue = (regs, reg) => (reg in regs ? regs[reg] : 0);

// { Number } -> String -> Number
const resolveValue = (regs, value) =>
    !Number.isNaN(parseFloat(value)) ? Number(value) : regValue(regs, value);

const regUpdateInstruc = op => (x, y) => ({ regs, pos }) => ({
    regs: merge(regs, { [x]: op(regValue(regs, x), resolveValue(regs, y)) })
});
    
const instrucTypes = {
    snd: (x) => ({ regs }) => ({ lastFreq: resolveValue(regs, x) }),
    set: regUpdateInstruc((_, yVal) => yVal),
    add: regUpdateInstruc(add),
    mul: regUpdateInstruc(multiply),
    mod: regUpdateInstruc(modulo),
    rcv: (x) => ({ regs, lastFreq }) => 
        resolveValue(regs, x) != 0 ? { recovered: lastFreq } : { },
    jgz: (x,y) => ({ regs, pos }) =>
        resolveValue(regs, x) >  0 ? { posChange: resolveValue(regs, y) } : { }
};

const parseInstruc = instrucMap => compose(
    ([, ins, x, y]) => instrucMap[ins](x, y),
    applyPattern(/^(...) (-?[a-z0-9]+)(?: (-?[a-z0-9]+))?/)
);

const runInstruc = curry((instrucs, state) => {
    const instruc = instrucs[state.pos];
    const result = instruc(state);
    const posChange = 'posChange' in result ? result.posChange : 1;

    return merge(state, merge(omit(['posChange'], result), { pos: state.pos + posChange }));
});

const executor = instrucs => genTransform(
    runInstruc(instrucs),
    { recovered: null, lastFreq: null, pos: 0, regs: {} }
);


const p1 = compose(
    prop('recovered'),
    genHead,
    genFilter(({ recovered }) => recovered != null),
    executor,
    map(parseInstruc(instrucTypes))
);


const newInstrucTypes = merge(instrucTypes, {
    snd: (x) => ({ regs, outQueue, sndCount }) => {
        outQueue.push(resolveValue(regs, x));
        
        return { sndCount: sndCount + 1 };
    },
    rcv: (x) => ({ inQueue, regs }) => isEmpty(inQueue)
        ? { stopped: true, posChange: 0 }
        : { regs: merge(regs, { [x]: inQueue.shift() }), stopped: false }
});

const newExecutor = curry((instrucs, inQueue, outQueue, p) => genTransform(
    runInstruc(instrucs),
    { pos: 0, regs: { p }, inQueue, outQueue, stopped: false, sndCount: 0 }
));

const runUntilStop = (program) => {
    while (!program.next().value.stopped) {}
};

const p2 = lines => {
    const instrucs = map(parseInstruc(newInstrucTypes), lines);
    
    const queues = [[], []];
    const programs = [
        newExecutor(instrucs, queues[0], queues[1], 0)(),
        newExecutor(instrucs, queues[1], queues[0], 1)()
    ];
    
    do {
        programs.forEach(runUntilStop);
    } while (any(complement(isEmpty), queues));
    
    return programs[1].next().value.sndCount;
};

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};