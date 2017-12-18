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
    
const sampleLines2 = 
`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleLines2), 3);
    });
});