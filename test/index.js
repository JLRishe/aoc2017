const assert = require('assert');
const { loadFile, loadInput, trimEnd } = require('../shared');


describe('shared', () => {
    it('should load files', (done) => {
        loadFile('test/input.txt', input => {
            assert.equal('it works!', input);
            done();
        });
    });
    
    it('should load inputs', (done) => {
        loadInput('test', input => {
            assert.equal('it works!', input);
            done();
        });
    });
    
    it('should trim ends', () => {
        assert.equal(trimEnd('a\nb\n'), 'a\nb');
    });
});