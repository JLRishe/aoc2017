const day = '25';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { runMachine } = dayContents;

describe(`day ${day}`, () => {
    const sampleStates = {
        A: {
            '0': { val: 1, posChange:  1, nextState: 'B' },
            '1': { val: 0, posChange: -1, nextState: 'B' }
        },
        B: {
            '0': { val: 1, posChange: -1, nextState: 'A' },
            '1': { val: 1, posChange:  1, nextState: 'A' }
        }
    }
    
    it('should work on samples for p1', () => {
        assert.equal(runMachine(sampleStates, 6), 3);
    });
});