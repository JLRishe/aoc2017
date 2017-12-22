const day = '22';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { countBasicInfections } = dayContents;

describe(`day ${day}`, () => {
    
    const sampleLines = [
        '..#',
        '#..',
        '...'
    ];
    
    it('should work on samples for p1', () => {
        assert.equal(countBasicInfections(3 , sampleLines),  2);
        assert.equal(countBasicInfections(7 , sampleLines),  5);
        assert.equal(countBasicInfections(70, sampleLines), 41);
        assert.equal(countBasicInfections(10000, sampleLines), 5587);
    }).timeout(20000);
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});