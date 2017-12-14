const day = '09';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');

const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { parseStr, totalValues } = dayContents;

describe(`day ${day}`, () => {
    const empty = { children: [], garbage: 0 };
    
    it('should parse strings', () => {
        assert.deepEqual(parseStr('{{}}'), { type: 'root', parent: null, children: [{ children: [empty], garbage: 0 }], garbage: 0 });
        assert.deepEqual(parseStr('{{},{},{},{}}'), { type: 'root', parent: null, children: [{ children: [empty, empty, empty, empty], garbage: 0 }], garbage: 0 });
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
        assert.equal(p2('{{<ab>},{<ab>},{<ab>},{<ab>}}'), 8);
        assert.equal(p2('{{<a!>},{<a!>},{<a!>},{<ab>}}'), 17);
    });
});