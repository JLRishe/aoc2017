const assert = require('assert');
const { ps, nextIdx } = require('../01');
const [p1, p2] = ps;

describe('day 1', () => {
    it('should return next index', () => {
        assert.equal(2, nextIdx([1, 2, 3], 1));
        assert.equal(0, nextIdx([1, 2, 3], 2));
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