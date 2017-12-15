const day = '15';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`slow day ${day}`, () => {
    const sampleInput = 
`Generator A starts with 65
Generator B starts with 8921`;
    
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), 588);
    }).timeout(30000);
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleInput), 309);
    }).timeout(50000);
});