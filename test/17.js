const day = '17';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const { genTake } = require('func-generators');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { nextState, posTransformer } = dayContents;

describe(`day ${day}`, () => {
    it('should determine next state', () => {
        assert.deepEqual(nextState(3, { arr: [0], pos: 0, step: 0 }), { arr: [0, 1], pos: 1, step: 1 });
        assert.deepEqual(nextState(3, { arr: [0, 1], pos: 1, step: 1 }), { arr: [0, 2, 1], pos: 1, step: 2 });
        assert.deepEqual(nextState(3, { arr: [0, 2, 1], pos: 1, step: 2 }), { arr: [0, 2, 3, 1], pos: 2, step: 3 });
    });
    
 
    it('should work on samples for p1', () => {
        assert.equal(p1('3'), 638);
    });
    
    it('should calculate positions', () => {
        const firstTen = genTake(10, posTransformer(3));

        assert.deepEqual(Array.from(firstTen()), [
            { step: 0, stop: 0 },
            { step: 1, stop: 0 },
            { step: 2, stop: 0 },
            { step: 3, stop: 1 },
            { step: 4, stop: 1 },
            { step: 5, stop: 0 },
            { step: 6, stop: 4 },
            { step: 7, stop: 1 },
            { step: 8, stop: 5 },
            { step: 9, stop: 0 }
        ]);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2('3'), 1222153);
    }).timeout(20000);
});