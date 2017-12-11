const day = '11';

const assert = require('assert');
const { solution: { ps: [p1, p2] } } = require(`../${day}`);

describe(`day ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(p1('ne,ne,ne'), 3);
        assert.equal(p1('ne,ne,sw,sw'), 0);
        assert.equal(p1('ne,ne,s,s'), 2);
        assert.equal(p1('se,sw,se,sw,sw'), 3);
        assert.equal(p1('ne,se,ne,se,ne,s'), 5);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2('ne,ne,ne'), 3);
        assert.equal(p2('ne,ne,sw,sw'), 2);
        assert.equal(p2('ne,ne,s,s'), 2);
        assert.equal(p2('se,sw,se,sw,sw'), 3);
        assert.equal(p2('ne,se,ne,se,ne,s,nw'), 5);
    });
});