const day = '10';

const assert = require('assert');
const { ps, rotate, adjustRope, updatePos, applyLengths, run } = require(`../${day}`);
const [p1, p2] = ps;

describe(`day ${day}`, () => {
    it('should rotate', () => {
        assert.deepEqual(rotate( 3, [0, 1, 2, 3, 4]), [2, 3, 4, 0, 1]);
        assert.deepEqual(rotate(-1, [0, 1, 2, 3, 4]), [1, 2, 3, 4, 0]);
        assert.deepEqual(rotate(10, [0, 1, 2, 3, 4]), [0, 1, 2, 3, 4]);
        assert.deepEqual(rotate(12, [0, 1, 2, 3, 4]), [3, 4, 0, 1, 2]);
    });
    
    it('should adjust rope', () => {
        assert.deepEqual(adjustRope(3, [0, 1, 2, 3, 4], 0), [2, 1, 0, 3, 4]);
        assert.deepEqual(adjustRope(4, [2, 1, 0, 3, 4], 3), [4, 3, 0, 1, 2]);    
        assert.deepEqual(adjustRope(0, [2, 1, 0, 3, 4], 3), [2, 1, 0, 3, 4]);    
        assert.deepEqual(adjustRope(1, [2, 1, 0, 3, 4], 3), [2, 1, 0, 3, 4]);    
        assert.deepEqual(adjustRope(5, [2, 1, 0, 3, 4], 3), [2, 4, 3, 0, 1]);    
    });
    
   it('should update pos', () => {
        assert.equal(updatePos(3, 5, 0, 0), 3, 'first');
        assert.equal(updatePos(4, 5, 3, 1), 3, 'second');
        assert.equal(updatePos(1, 5, 3, 2), 1, 'third');
        assert.equal(updatePos(11, 5, 3, 2), 1, 'fourth');
    });
    
    it('should apply lengths', () => {
        assert.deepEqual(applyLengths([0, 1, 2, 3, 4], [3, 4, 1, 5]), { rope: [3, 4, 2, 1, 0], curPos: 4, skipSize: 4 });
    });
    
    it('should run', () => {
        assert.equal(run(5)('3,4,1,5'), 12);
    });
    
    it('should work on samples for p1', () => {
        
    });
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});