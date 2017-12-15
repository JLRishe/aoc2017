const day = '15';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(p1(), 577);
    }).timeout(20000);
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});