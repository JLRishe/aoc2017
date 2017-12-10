const { __, when, map, add, ifElse, gte, adjust } = require('ramda');
const { arrayMap, add1 } = require('../shared');

const nextWorld = jumpAdjust => ({ is, i }) => ({
    is: adjust(jumpAdjust, i, is),
    i: i + is[i]
});

const runJumps = jumpAdjust => instructs => {
    const makeNewWorld = nextWorld(jumpAdjust);
    let world = { is: map(Number, instructs), i: 0 };
    let steps = 0;
    
    while (world.i >= 0 && world.i < world.is.length){
        world = makeNewWorld(world);
        steps += 1;
    }
    
    return steps;
};

const p1 = runJumps(add1);

const p2 = runJumps(ifElse(gte(__, 3), add(-1), add1));

module.exports = {
    ps: [p1, p2]
};