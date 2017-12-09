const day = '06';

const assert = require('assert');
const { ps, updateBanks } = require(`../${day}`);
const [p1, p2] = ps;

describe(`day ${day}`, () => {
    it('should update banks correctly', () => {
        assert.deepEqual(updateBanks([0, 2, 7, 0]), [2, 4, 1, 2]);
        assert.deepEqual(updateBanks([2, 4, 1, 2]), [3, 1, 2, 3]);
        assert.deepEqual(updateBanks([3, 1, 2, 3]), [0, 2, 3, 4]);
        assert.deepEqual(updateBanks([0, 2, 3, 4]), [1, 3, 4, 1]);
        assert.deepEqual(updateBanks([1, 3, 4, 1]), [2, 4, 1, 2]);
    });
    
    it('should work on samples for p1', () => {
        assert.equal(p1('0 2 7 0'), 5);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2('0 2 7 0'), 4);
    });
});