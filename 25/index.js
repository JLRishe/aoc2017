const ramda = require('ramda');
const { __, compose, map, filter, prop, sum, values, curry, merge } = ramda;
const { probe } = require('aoc-helpers');
const { genTransform, genHead, genDrop } = require('func-generators');

// Tape is { Number: Bit }
// StateName is String
// StateTransition is { val: Bit, posChange: Number, nextState: StateName }
// StateMap is { StateName: { Bit: StateTransition } }

// Number -> Tape -> Number
const valAt = curry((pos, tape) => tape[pos] || 0);

// Number -> Number -> Tape -> ()
const setVal = curry((pos, value, tape) => { tape[pos] = value; return tape; });

// StateMap -> Tape -> { pos: Number, state: StateName }
const evalState = curry((stateTypes, tape, st) => {
    const { state, pos } = st;
    const { val, posChange, nextState } = stateTypes[state][valAt(pos, tape)];
    
    setVal(pos, val, tape);
    
    return { pos: pos + posChange, state: nextState };    
});

// StateMap -> Tape -> Generator { pos: Number, state: StateName }
const turingMachine = curry((stateTypes, tape) => genTransform(
    evalState(stateTypes, tape),
    { pos: 0, state: 'A' }
));

// StateMap -> Number -> Number
const runMachine = (stateTypes, count) => {
    let tape = {};
    
    const finalState = compose(
        genHead,
        genDrop(count)
    )(turingMachine(stateTypes, tape));
    
    return sum(values(tape));
};

// StateMap
const sTypes = {
    A: {
        '0': { val: 1, posChange:  1, nextState: 'B' },
        '1': { val: 0, posChange: -1, nextState: 'D' }
    },
    B: {
        '0': { val: 1, posChange:  1, nextState: 'C' },
        '1': { val: 0, posChange:  1, nextState: 'F' }
    },
    C: {
        '0': { val: 1, posChange: -1, nextState: 'C' },
        '1': { val: 1, posChange: -1, nextState: 'A' }
    },
    D: {
        '0': { val: 0, posChange: -1, nextState: 'E' },
        '1': { val: 1, posChange:  1, nextState: 'A' }
    },
    E: {
        '0': { val: 1, posChange: -1, nextState: 'A' },
        '1': { val: 0, posChange:  1, nextState: 'B' }
    },
    F: {
        '0': { val: 0, posChange:  1, nextState: 'C' },
        '1': { val: 0, posChange:  1, nextState: 'E' }
    }
}

// () -> Number
const p1 = () => runMachine(sTypes, 12302209);

module.exports = {
    solution: {
        type: '',
        ps: [p1]
    }
    , runMachine
};