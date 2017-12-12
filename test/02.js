const day = '02';
const dayString = `../${day}`;

const assert = require('assert');
const dayContents = require(dayString);
const { solution: { ps: [p1, p2] } } = dayContents;

describe('day 2', () => {
    it('should work on p1 sample inputs', () => {
        assert.equal(p1(['5\t1\t9\t5', '7\t5\t3', '2\t4\t6\t8']), 18);
    });
    
    it('should work on p2 sample inputs', () => {
        assert.equal(p2(['5 9 2 8', '9 4 7 3', '3 8 6 5']), 9);
    });
})