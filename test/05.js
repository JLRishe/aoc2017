const day = '05';
const dayString = `../${day}`;

const assert = require('assert');
const dayContents = require(dayString);
const { solution: { ps: [p1, p2] } } = dayContents;

describe(`day ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(p1(['0', '3', '0', '1', '-3']), 5);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(['0', '3', '0', '1', '-3']), 10);
    });
});