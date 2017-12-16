const day = '16';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);


describe(`day ${day}`, () => {

const sampleInput = 
`s1,x3/4,pe/b`;

    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), 'paedcbfghijklmno');
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleInput), 'ghidjklmnopabcef');
    });
});