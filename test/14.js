const day = '14';
const dayString = `../${day}`;

const assert = require('assert');
const dayContents = require(dayString);
const { solution: { ps: [p1, p2] }, hexToBinary } = dayContents;

describe(`day ${day}`, () => {
    it('should convert hex to binary', () => {
        assert.equal(hexToBinary('5'), '0101');
        assert.equal(hexToBinary('a'), '1010');
    });
    
    xit('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});

describe(`slow ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(p1('flqrgnkx'), 8108);
    }).timeout(10000);
});