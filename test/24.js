const day = '24';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    const sampleInput = 
`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;
    
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), 31);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleInput), 19);
    });
});