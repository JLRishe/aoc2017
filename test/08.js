const day = '08';

const assert = require('assert');
const { add, subtract, gt, lt, gte, equals } = require('ramda');
const { solution: { ps: [p1, p2] }, parseInstruc, shouldApply, applyInstruc } = require(`../${day}`);

describe(`day ${day}`, () => {
    const instrucs = [
        'b inc 5 if a > 1',
        'a inc 1 if b < 5',
        'c dec -10 if a >= 1',
        'c inc -20 if c == 10'
    ];
    
    const expectedParsed = [
        { reg: 'b', op: add,      amt: 5,   cReg: 'a', comp: gt,     val: 1  },
        { reg: 'a', op: add,      amt: 1,   cReg: 'b', comp: lt,     val: 5  },    
        { reg: 'c', op: subtract, amt: -10, cReg: 'a', comp: gte,    val: 1  },    
        { reg: 'c', op: add,      amt: -20, cReg: 'c', comp: equals, val: 10 }    
    ]
    
    it('should parse instructions', () => {
        assert.deepEqual(parseInstruc(instrucs[0]), expectedParsed[0]);
        assert.deepEqual(parseInstruc(instrucs[1]), expectedParsed[1]);
        assert.deepEqual(parseInstruc(instrucs[2]), expectedParsed[2]);
        assert.deepEqual(parseInstruc(instrucs[3]), expectedParsed[3]);
    });
    
    it('should decide when to apply instructions', () => {
        assert.ok(shouldApply(expectedParsed[0])({ a: 2 }), 'a 2');
        assert.equal(shouldApply(expectedParsed[0])({ a: 1 }), false, 'a 1');
        assert.ok(shouldApply(expectedParsed[1])({  }), 'empty');
    });
    
    it('should apply instructions', () => {
        assert.deepEqual(applyInstruc(expectedParsed[0])({ }), { b: 5 });
        assert.deepEqual(applyInstruc(expectedParsed[0])({ b: 2 }), { b: 7 });
        assert.deepEqual(applyInstruc(expectedParsed[2])({ }), { c: 10 });
        assert.deepEqual(applyInstruc(expectedParsed[2])({ c: 3, a: 4 }), { c: 13, a: 4 });
    });
    
    it('should work on samples for p1', () => {
        assert.equal(p1(instrucs), 1);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(instrucs), 10);
    });
});