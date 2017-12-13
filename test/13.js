const day = '13';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    const sample = 
`0: 3
1: 2
4: 4
6: 4
`;

    it('should work on samples for p1', () => {
        assert.equal(p1(sample), 24);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sample), 10);
    });
});