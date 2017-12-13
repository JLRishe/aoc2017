const day = '13';
const dayString = `../${day}`;

const assert = require('assert');
const dayContents = require(dayString);
const { solution: { ps: [p1, p2] } } = dayContents;

describe(`day ${day}`, () => {
    const sampleLines = [
        '0: 3',
'1: 2',
'4: 4',
'6: 4'
    ];
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleLines), 24);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleLines), 10);
    });
});