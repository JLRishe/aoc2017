const assert = require('assert');
const { wrapIndex } = require('../shared');


describe('helpers', () => {
    it('should wrap arrays', () => {
        assert.equal(wrapIndex( 7, [0, 1, 2, 3, 4]), 2);
        assert.equal(wrapIndex(-2, [0, 1, 2, 3, 4]), 3);
    })
});