const ramda = require('ramda');
const { __, compose, map, filter, curry, split, identity, times, prop, reduce, last, indexBy, min, max, sum, length } = ramda;
const { probe, applyPattern, repeatUntil } = require('../shared');

const parseScanner = compose(
   ([layer, depth]) => ({ layer, depth, pos: 1, direction: -1 }),
   map(Number),
   split(': ')
);

const moveScanner = ({ layer, depth, pos, direction }) => {
    const newDirection = direction * (pos === 1 || pos === depth ? -1 : 1);
    
    return {
        layer,
        depth,
        pos: pos + newDirection,
        direction: newDirection
    };
};

const checkHit = (playerPos, scanners) =>  {
    const scanner = scanners[playerPos];

    return scanner && scanner.pos === 1
    ?    scanner.depth  * scanner.layer
    :    0;
};

const isHit = (playerPos, scanners) => (scanners[playerPos] && scanners[playerPos].pos === 1 ? 1: 0);

const nextState = ({ scanners, playerPos, severity, hitCount }) => ({
    scanners: map(moveScanner, scanners),
    playerPos: playerPos + 1,
    severity: severity + checkHit(playerPos, scanners),
    hitCount: hitCount + isHit(playerPos, scanners)
});

const runWalk = curry((delay, scanners) => reduce(
    nextState,
    { scanners: indexBy(prop('layer'), scanners), playerPos: -delay, severity: 0, hitCount: 0 },
    times(identity, last(scanners).layer + 1 + delay)
));

const scannerPos = curry((time, scanner) => {
    const phase = time % ((scanner.depth - 1) * 2) + 1;
    const overSteps = phase - scanner.depth;
    
    return phase - max(overSteps, 0);
});

const scannerHits = curry((offset, scanner) => 
    scannerPos(scanner.layer + offset, scanner) === 1
    ?   { severity: scanner.layer * scanner.depth, hit: true }
    :   { severity: 0, hit: false }
);

const totalSeverity = offset => compose(
    sum,
    map(prop('severity')),
    map(scannerHits(offset))
);

const p1 = compose(
    totalSeverity(0),
    map(parseScanner)
);

const totalHits = curry((offset, scanners) => compose(
    length,
    filter(prop('hit')),
    map(scannerHits(offset))
)(scanners));

const findNeededDelay = scanners => repeatUntil(
    ({ delay, result }) => (({ delay: delay + 1, result: totalHits(delay + 1, scanners) })),
    ({ result }) => result === 0,
    { delay: 0, result: totalHits(0, scanners) }
);

const p2 = compose(
    prop('delay'),
    findNeededDelay,
    map(parseScanner)
);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};