const day = '12';
const dayString = `../${day}`;

const assert = require('assert');
const dayContents = require(dayString);
const { solution: { ps: [p1, p2] } } = dayContents;

describe(`day ${day}`, () => {
    const lines = [
'0 <-> 2',
'1 <-> 1',
'2 <-> 0, 3, 4',
'3 <-> 2, 4',
'4 <-> 2, 3, 6',
'5 <-> 6',
'6 <-> 4, 5',
    ]
    it('should work on samples for p1', () => {
        assert.equal(p1(lines), 6);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(lines), 2);
    });
});