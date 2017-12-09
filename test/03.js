const assert = require('assert');
const { curry } = require('ramda');
const { ps, level, offset } = require('../03');
const [p1, p2] = ps;

describe('day 3', () => {
    it('should calculate level', () => {
        assert.equal(2, level(25), '25');
        assert.equal(2, level(13), '13');
        assert.equal(2, level(10), '10');
        assert.equal(1, level(9), '9');
        assert.equal(1, level(5), '5');
        assert.equal(1, level(2), '2');
        assert.equal(0, level(1), '1');        
    });
    
    const assertNum = curry((f, num, expected) => assert.equal(expected, f(num), num));
    const assertOffset = assertNum(offset);
    
    it('should calculate offsets', () => {
        assertOffset(25, 2);
        assertOffset(23, 0);
        assertOffset(21, 2);
        assertOffset(9, 1);
        assertOffset(5, 1);
        assertOffset(1, 0);
        assertOffset(10, 1);
    });
    
    const assertP1 = assertNum(p1);
    
    it('should work for sample inputs', () => {
        assertP1(1, 0);
        assertP1(12, 3);
        assertP1(23, 2);
        assertP1(1024, 31);
    });
    
    const assertP2 = assertNum(p2);
    
    it('should work for sample p2 inputs', () => {
        assertP2(27, 54);
        assertP2(26, 54);
        assertP2(331, 351);
    });
});