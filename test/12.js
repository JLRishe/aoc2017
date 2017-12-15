const day = '12';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    const sampleInput =
`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`

    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), 6);
    });

    it('should work on samples for p2', () => {
        assert.equal(p2(sampleInput), 2);
    });
});