const ramda = require('ramda');
const { __, compose, map, filter, merge, curry, prop, isEmpty, any, complement, add, multiply, modulo, omit, defaultTo, update } = ramda;
const { head, tail } = ramda;
const { probe, applyPattern } = require('../shared');
const { genTransform, genHead, genFilter } = require('func-generators');

// Registers is { Number }
// State is { recovered: Number, lastFreq: Number, pos: Number, regs: Registers }
// Instruction is (State -> StateUpdates)

// Registers -> String -> Number
const regValue = (regs, reg) => (reg in regs ? regs[reg] : 0);

// Registers -> String -> Number
const resolveValue = (regs, value) =>
    !Number.isNaN(parseFloat(value)) ? Number(value) : regValue(regs, value);

// Registers -> String -> Number -> Registers
const updateRegs = (regs, reg, value) => merge(regs, { [reg]: value });
    
// (Number -> Number -> Number) -> (String, String) -> Instruction
const regUpdateInstruc = op => (x, y) => ({ regs, pos }) => ({
    regs: updateRegs(regs, x, op(regValue(regs, x), resolveValue(regs, y)))
});

// { String: (String, String) -> Instruction }
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

// String -> Instruction
const parseInstruc = instrucMap => compose(
    ([, ins, x, y]) => instrucMap[ins](x, y),
    applyPattern(/^(...) (-?[a-z0-9]+)(?: (-?[a-z0-9]+))?/)
);

// [Instruction] -> State -> StateUpdates
const evalNextInstruc = curry((instrucs, state) => instrucs[state.pos](state));

// State -> StateUpdates -> State
const applyStateChanges = curry((state, changes) => merge(
    state, 
    merge(
        omit(['posChange'], changes), 
        { pos: state.pos + defaultTo(1, changes.posChange) }
    )
)); 

// [Instruction] -> State -> State
const runInstruc = curry((instrucs, state) => compose(
    applyStateChanges(state),
    evalNextInstruc(instrucs)
)(state));

// [Instruction] -> Generator State
const executor = instrucs => genTransform(
    runInstruc(instrucs),
    { recovered: null, lastFreq: null, pos: 0, regs: {} }
);

// [String] -> Number
const p1 = compose(
    prop('recovered'),
    genHead,
    genFilter(({ recovered }) => recovered != null),
    executor,
    map(parseInstruc(instrucTypes))
);

// { String: (String, String) -> Instruction }
const newInstrucTypes = merge(instrucTypes, {
    snd: (x) => ({ regs, sndCount }) => 
        ({ sent: resolveValue(regs, x), sndCount: sndCount + 1 })
    ,
    rcv: (x) => ({ queue, regs }) => isEmpty(queue)
        ? { stopped: true , posChange: 0 }
        : { stopped: false, queue: tail(queue), regs: updateRegs(regs, x, head(queue)) }
});

// CommProgramState is { pos: Number, regs: { Number }, queue: [Number], stopped: Boolean, sndCount: Number }
// PairState is { stopped: Boolean, ps: [CommProgramState] }

// Number -> CommProgramState
const newProgram = p => ({ pos: 0, regs: { p }, queue: [], stopped: false, sndCount: 0 });

// Number -> PairState -> Boolean
const canContinue = curry((pNum, state) => !(state.ps[pNum].stopped && isEmpty(state.ps[pNum].queue)));

// Number -> CommProgramState -> PairState -> PairState
const updateP = (pNum, p, state) => merge(state, { ps: update(pNum, p, state.ps) });

// [Instruction] -> Number -> PairState -> PairState
const advance = curry((instrucs, pNum, state) => {
    const pState = state.ps[pNum];
    const result = evalNextInstruc(instrucs, pState);
    const updatedP = applyStateChanges(pState, omit(['sent'], result));

    const newState = updateP(pNum, updatedP, state);
    
    if (!('sent' in result)) {
        return newState;
    }
    
    const otherPNum = 1 - pNum;
    const otherP = state.ps[otherPNum];
    const updatedOtherP = merge(otherP, { queue: [...otherP.queue, result.sent] });
        
    return updateP(otherPNum, updatedOtherP, newState);
});

// [Instruction] -> PairState
const nextPairState = curry((instrucs, state) => {
    if (canContinue(0, state)) { return advance(instrucs, 0, state); }
    if (canContinue(1, state)) { return advance(instrucs, 1, state); }
    return merge(state, { stopped: true });
})

// Generator PairState
const pairExecutor = (instrucs) => genTransform(
    nextPairState(instrucs),
    { 
        stopped: false, 
        ps: [
            newProgram(0),
            newProgram(1)
        ]
    }
);

// [String] -> Number
const p2 = compose(
    s => s.ps[1].sndCount,
    genHead,
    genFilter(({ stopped }) => stopped),
    pairExecutor,
    map(parseInstruc(newInstrucTypes))
);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};