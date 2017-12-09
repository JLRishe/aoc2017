const day = '05';

const assert = require('assert');
const { ps } = require(`../${day}`);
const [p1, p2] = ps;

describe(`day ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(p1(['0', '3', '0', '1', '-3']), 5);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(['0', '3', '0', '1', '-3']), 10);
    });
});