const assert = require('assert');
const { __, compose } = require('ramda');
const { disjointSets, join, countSets, insert } = require('../shared/unionFind');
const { probe } = require('../shared');

describe('union find', () => {
    it('should count disjoint sets', () => {
        const result = compose(
            countSets,
            join(__, 'a', 'c'),
            join(__, 'f', 'a'),
            join(__, 'g', 'd'),
            join(__, 'g', 'i'),
            join(__, 'd', 'i'),
            insert(__, 'g'),
            insert(__, 'd'),
            insert(__, 'e'),
            join(__, 'b', 'h'),
            insert(__, 'b'),
            insert(__, 'i'),
            insert(__, 'h'),
            insert(__, 'a'),
            insert(__, 'f'),
            insert(__, 'c')
        )(disjointSets);
        
        assert.equal(result, 4);
    });
});