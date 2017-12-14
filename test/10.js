const day = '10';

const assert = require('assert');
const { solution: { ps: [p1, p2] }, rotate, adjustRope, updatePos, applyLengths, run, toHex, knotHash } = require(`../${day}`);

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
        assert.deepEqual(
            applyLengths({ rope: [0, 1, 2, 3, 4], curPos: 0, skipSize: 0 }, [3, 4, 1, 5]), 
            { rope: [3, 4, 2, 1, 0], curPos: 4, skipSize: 4 });
    });
    
    it('should run', () => {
        assert.equal(run(5)('3,4,1,5'), 12);
    });

    it('should pad hex', () => {
        assert.equal(toHex(0xf), '0f');
        assert.equal(toHex(0), '00');
        assert.equal(toHex(0xff), 'ff');
    });
    
    it('should compute knot hashes', () => {
        assert.equal(knotHash('hxtvlmkl'), 'adc93c0e7714b70f14a175f852ffb6ae');
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(''),         'a2582a3a0e66e6e86e3812dcb672a272');
        assert.equal(p2('AoC 2017'), '33efeb34ea91902bb2f59c9920caa6cd');
    });
});