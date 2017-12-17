const assert = require('assert');
const { __, compose, map, sortBy, identity, contains } = require('ramda');
const { disjointSets, connect, countSets, insert, allSets, findSet } = require('../shared/unionFind');
const { probe } = require('../shared');

describe('union find', () => {
    // a c f
    // g d i
    // e
    // b h
    
    const sampleSet = compose(
        connect('a', 'c'),
        connect('f', 'a'),
        connect('g', 'd'),
        connect('g', 'i'),
        connect('d', 'i'),
        insert('g'),
        insert('d'),
        insert('e'),
        connect('b', 'h'),
        insert('b'),
        insert('i'),
        insert('h'),
        insert('a'),
        insert('f'),
        insert('c')
    )(disjointSets);

    const sort = sortBy(identity);

    it('should count disjoint sets', () => {
        assert.equal(countSets(sampleSet), 4);
    });
    
    it('should produce all sets', () => {
        const sortedSets = map(sort, allSets(sampleSet));
        
        assert.ok(contains(['a', 'c', 'f'], sortedSets));
        assert.ok(contains(['d', 'g', 'i'], sortedSets));
        assert.ok(contains(['b', 'h'], sortedSets));
        assert.ok(contains(['e'], sortedSets));
    });
    
    it('should find sets based on their members', () => {
        const aSet = sort(findSet(sampleSet, 'a'));
        const cSet = sort(findSet(sampleSet, 'c'));
        const fSet = sort(findSet(sampleSet, 'f'));
        
        const bSet = sort(findSet(sampleSet, 'b'));
        const hSet = sort(findSet(sampleSet, 'h'));
        
        assert.equal(aSet.length, 3, 'a set');
        assert.deepEqual(aSet, cSet);
        assert.deepEqual(cSet, fSet);
        
        assert.equal(bSet.length, 2, 'b set');
        assert.deepEqual(bSet, hSet);
    });
});