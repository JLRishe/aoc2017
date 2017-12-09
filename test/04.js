const assert = require('assert');
const { ps } = require('../04');
const [p1, p2] = ps;

describe('day 4', () => {
    it('should work on samples for p1', () => {
        assert.equal(2, p1(['aa bb cc dd ee', 'aa bb cc dd aa', 'aa bb cc dd aaa']));
    });
    
    it('should work on samples for p2', () => {
        assert.equal(3, p2([
            'abcde fghij',
            'abcde xyz ecdab',
            'a ab abc abd abf abj',
            'iiii oiii ooii oooi oooo',
            'oiii ioii iioi iiio'
        ]));
    });
});