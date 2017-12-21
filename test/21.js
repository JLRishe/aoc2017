const day = '21';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { splitGrids, parseLine, rotate2d } = dayContents;

describe(`day ${day}`, () => {
    it('should split grids', () => {
        assert.deepEqual(
            splitGrids([['.','#','.','#'],['.','#','#','#'],['.','#','.','#'],['.','#','.','#']]),
            [
                [[['.','#'],['.','#']], [['.','#'],['#','#']]],
                [[['.','#'],['.','#']], [['.','#'],['.','#']]]
            ]
        )
    });
    
    it('should parse lines', () => {
        assert.deepEqual(
            parseLine('../.. => .../#../#..'), 
            { 
              from: [['.', '.'], ['.','.']],
              to: [['.','.','.'], ['#','.','.'], ['#','.','.']]
            }
        );
    });
    
    it('should rotate grids', () => {
        assert.deepEqual(
            rotate2d([['.','#','.'],
                      ['#','.','#'],
                      ['#','.','#']]),
                     [['#','#','.'],
                      ['.','.','#'],
                      ['#','#','.']]             
        );
    });
    
    it('should work on samples for p1', () => {
        throw new Error('not implemented');
    });
    
    it('should work on samples for p2', () => {
        throw new Error('not implemented');
    });
});