const assert = require('assert');
const { wrapIndex, countCycles } = require('../shared');


describe('helpers', () => {
    it('should wrap arrays', () => {
        assert.equal(wrapIndex( 7, [0, 1, 2, 3, 4]), 2);
        assert.equal(wrapIndex(-2, [0, 1, 2, 3, 4]), 3);
    })

    it('should count repeats', () => {
        assert.equal(countCycles(x => x * 2, x => x >= 1024, 1), 10);
    })
});