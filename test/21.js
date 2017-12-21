const day = '21';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);
const { splitGrids, parseLine, rotate2d, allRotations, isMatch, combineGrids, doExpansions } = dayContents;

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
            parseLine('../*. => .../#../#..'), 
            { 
              size: 2,
              from: [[['.', '.'], 
                      ['*', '.']],
                      
                     [['*', '.'], 
                      ['.', '.']],
                      
                     [['.', '*'], 
                      ['.', '.']],
                      
                     [['.', '.'], 
                      ['.', '*']],

                     [['.', '.'], 
                      ['.', '*']],
                      
                     [['.', '.'], 
                      ['*', '.']],
                      
                     [['*', '.'], 
                      ['.', '.']],
                      
                     [['.', '*'], 
                      ['.', '.']]],

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
    
    it('should produce all rotations', () => {
        assert.deepEqual(
            allRotations([['.','#','.'],
                          ['#','.','#'],
                          ['#','.','#']]),
                        [[['.','#','.'],
                          ['#','.','#'],
                          ['#','.','#']],
                         [['#','#','.'],
                          ['.','.','#'],
                          ['#','#','.']],
                         [['#','.','#'],
                          ['#','.','#'],
                          ['.','#','.']],
                         [['.','#','#'],
                          ['#','.','.'],
                          ['.','#','#']]]
        )
    });
    
    it('should match', () => {
        const parsed = parseLine('##./..#/##. => #.#./.#.#/##../.#.#');
        
        assert.ok(isMatch([['#','#','.'],
                           ['.','.','#'],
                           ['#','#','.']], parsed), 'same as original');
        assert.ok(isMatch([['.','#','.'],
                           ['#','.','#'],
                           ['#','.','#']], parsed), 'rotated');
        assert.equal(isMatch([['#','#','.'],
                               ['.','.','#'],
                               ['#','.','.']], parsed), false, 'should not match');
                          
    });
    
    it('should combine grids', () => {
        assert.deepEqual(
            combineGrids([[['.','#'],['#','.']], [['#','#'],['.','.']]]),
            [['.','#','#','#'], ['#','.','.','.']]
        );
    })
    
    const sampleLines = [
        '../.# => ##./#../...',
        '.#./..#/### => #..#/..../..../#..#'
    ];
    
    it('should work on samples', () => {
        assert.equal(doExpansions(2, sampleLines), 12);
    });
});