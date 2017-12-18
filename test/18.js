const day = '18';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('../shared/runhelpers');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    const sampleLines = 
`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
    
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleLines), 4);
    });
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});