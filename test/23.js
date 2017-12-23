const day = '23';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    const sampleInput =
`set a 3
jnz a 2
mul a 2
mul a 2
sub a 3`;
    
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), 1);
    });
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});