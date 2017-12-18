const ramda = require('ramda');
const { __, compose, map, filter, merge, curry, prop } = ramda;
const { probe, applyPattern } = require('../shared');
const { genTransform, genHead, genFilter } = require('func-generators');

// State is { recovered: Number, lastFreq: Number, pos: Number, regs: {} }

const regValue = (regs, reg) => (reg in regs ? regs[reg] : 0);

const resolveValue = (regs, value) =>
    !Number.isNaN(parseFloat(value)) ? Number(value) : regValue(regs, value);

const instrucTypes = {
    snd: (x) => state => ({ lastFreq: resolveValue(state.regs, x), pos: state.pos + 1 }),
    set: (x, y) => state => ({ 
        regs: merge(state.regs, { [x]: resolveValue(state.regs, y) }),
        pos: state.pos + 1
    }),
    add: (x, y) => state => ({
        regs: merge(state.regs, { [x]: regValue(state.regs, x) + resolveValue(state.regs, y) }),
        pos: state.pos + 1
    }),
    mul: (x, y) => state => ({
        regs: merge(state.regs, { [x]: regValue(state.regs, x) * resolveValue(state.regs, y) }),
        pos: state.pos + 1
    }),
    mod: (x, y) => state => ({
        regs: merge(state.regs, { [x]: regValue(state.regs, x) % resolveValue(state.regs, y) }),
        pos: state.pos + 1
    }),
    rcv: (x) => state => 
        resolveValue(state.regs, x) != 0
            ? { recovered: state.lastFreq, pos: state.pos + 1 }
            : { pos: state.pos + 1 },
    jgz: (x,y) => state =>
        resolveValue(state.regs, x) > 0
            ? { pos: state.pos + resolveValue(state.regs, y) }
            : { pos: state.pos + 1 }
};

const parseInstruc = instrucMap => compose(
    ([, ins, x, y]) => instrucMap[ins](x, y),
    applyPattern(/^(...) (-?[a-z0-9]+)(?: (-?[a-z0-9]+))?/)
);

const runInstruc = curry((instrucs, state) => {
    const instruc = instrucs[state.pos];
    
    return merge(state, instruc(state));
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
    snd: (x) => state => {
        state.outQueue.push(resolveValue(state.regs, x));
        
        return { sndCount: state.sndCount + 1, pos: state.pos + 1 };
    },
    rcv: (x) => state => {
        if (state.inQueue.length === 0) {
            return { stopped: true };
        }
        const received = state.inQueue.shift();
        
        return { regs: merge(state.regs, { [x]: received }), stopped: false, pos: state.pos + 1 };
    }
});


const p2 = () => 0;

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};