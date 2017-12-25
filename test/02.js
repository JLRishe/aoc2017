const day = '02';
const dayPath = `../${day}`;

const assert = require('assert');
const dayContents = require(dayPath);
const { prepare } = require('aoc-runner');
const [p1, p2] = prepare(dayContents);

describe('day 2', () => {
    it('should work on p1 sample inputs', () => {
        assert.equal(p1('5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8'), 18);
    });
    
    it('should work on p2 sample inputs', () => {
        assert.equal(p2('5 9 2 8\n9 4 7 3\n3 8 6 5'), 9);
    });
})