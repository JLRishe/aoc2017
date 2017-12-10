const day = '09';

const assert = require('assert');
const { ps, ignore, removeGarbage, parseStr, totalValues } = require(`../${day}`);
const [p1, p2] = ps;

describe(`day ${day}`, () => {
    const empty = { children: [], garbage: 0 };
    
    it('should ignore characters', () => {
        assert.equal(ignore('{{<!!>},{<!!>},{<!!>},{<!!>}}'), '{{<>},{<>},{<>},{<>}}');
        assert.equal(ignore('{{<a!>},{<a!>},{<a!>},{<ab>}}'), '{{<a},{<a},{<a},{<ab>}}');
    });
    
    it('should remove garbage', () => {
        assert.equal(removeGarbage('{{<>},{<>},{<>},{<>}}'), '{{},{},{},{}}');
        assert.equal(removeGarbage('{{<a},{<a},{<a},{<ab>}}'), '{{}}');
    });
    
    it('should parse strings', () => {
        assert.deepEqual(parseStr('{{}}'), { type: 'root', children: [{ children: [empty], garbage: 0 }] });
        assert.deepEqual(parseStr('{{},{},{},{}}'), { type: 'root', children: [{ children: [empty, empty, empty, empty], garbage: 0 }] });
    });
    
    it('should compute values', () => {
        assert.equal(totalValues(0, { children: [{ children: [empty] }] }), 3);
        assert.equal(totalValues(0, { children: [{ children: [empty, empty, empty, empty] }] }), 9);
    });
    
    it('should work on samples for p1', () => {
        assert.equal(p1('{{{},{},{{}}}}'), 16);
        assert.equal(p1('{{<!!>},{<!!>},{<!!>},{<!!>}}'), 9);
        assert.equal(p1('{{<a!>},{<a!>},{<a!>},{<ab>}}'), 3);
    });
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});