const day = '01';
const dayString = `../${day}`;

const assert = require('assert');
const dayContents = require(dayString);
const { solution: { ps: [p1, p2] } } = dayContents;

describe('day 1', () => {
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