const day = '22';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { countBasicInfections, countAdvancedInfections } = dayContents;

const sampleLines = [
    '..#',
    '#..',
    '...'
];

describe(`day ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(countBasicInfections(3 , sampleLines),  2);
        assert.equal(countBasicInfections(7 , sampleLines),  5);
        assert.equal(countBasicInfections(70, sampleLines), 41);
        assert.equal(countBasicInfections(10000, sampleLines), 5587);
    });
});

describe(`slow day ${day}`, () => {
    it('should work on samples for p2', () => {
        assert.equal(countAdvancedInfections(100, sampleLines), 26);
        assert.equal(countAdvancedInfections(10000000, sampleLines), 2511944);
    }).timeout(60000);
})