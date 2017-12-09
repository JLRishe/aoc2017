const day = '07';

const assert = require('assert');
const { ps, parseProgram } = require(`../${day}`);
const [p1, p2] = ps;

describe(`day ${day}`, () => {
    const programStrings = [
        'pbga (66)',
        'xhth (57)',
        'ebii (61)',
        'havc (66)',
        'ktlj (57)',
        'fwft (72) -> ktlj, cntj, xhth',
        'qoyq (66)',
        'padx (45) -> pbga, havc, qoyq',
        'tknk (41) -> ugml, padx, fwft',
        'jptl (61)',
        'ugml (68) -> gyxo, ebii, jptl',
        'gyxo (61)',
        'cntj (57)'
    ];
    
    it ('should parse programs', () => {
        assert.deepEqual(parseProgram('ktlj (57)'), { name: 'ktlj', weight: 57, children: [] });
        assert.deepEqual(parseProgram('fwft (72) -> ktlj, cntj, xhth'), { name: 'fwft', weight: 72, children: ['ktlj', 'cntj','xhth'] });
    });
    
    it('should work on samples for p1', () => {
        assert.equal(p1(programStrings), 'tknk');
    });
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});