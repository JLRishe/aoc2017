const day = '14';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { hexToBinary } = dayContents;

describe(`day ${day}`, () => {
    it('should convert hex to binary', () => {
        assert.equal(hexToBinary('5'), '0101');
        assert.equal(hexToBinary('a'), '1010');
    });
    
});

describe(`slow ${day}`, () => {
    const sampleInput = 'flqrgnkx';

    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), 8108);
    }).timeout(10000);

    it('should work on samples for p2', () => {
        assert.equal(p2(sampleInput), 1242);
    }).timeout(60000);
});