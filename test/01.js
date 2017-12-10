const assert = require('assert');
const { ps, nextIdx, corrIdx } = require('../01');
const [p1, p2] = ps;

describe('day 1', () => {
    it('should return next index', () => {
        const next = corrIdx(nextIdx);
        
        assert.equal(next(1, [1, 2, 3]), 2);
        assert.equal(next(2, [1, 2, 3]), 0);
    });
    
    it('should work on sample inputs', () => {
        assert.equal(p1('1122'), 3);
        assert.equal(p1('1111'), 4);
        assert.equal(p1('1234'), 0);
        assert.equal(p1('91212129'), 9);
    });
    
    it('should work on p2 sample inputs', () => {
        assert.equal(p2('1212'), 6);
        assert.equal(p2('1221'), 0);
        assert.equal(p2('123425'), 4);
    });
})