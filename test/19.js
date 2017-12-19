const day = '19';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    
    const sampleMap =
`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
                `;

    
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleMap), 'ABCDEF');
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleMap), 38);
    });
});