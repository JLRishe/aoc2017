const ramda = require('ramda');
const { __, compose, curry, map, filter, concat, without, chain, sum, split, head, last, sortBy, groupBy, values, length, defaultTo, prop } = ramda;
const { probe, listMax } = require('aoc-helpers');

// Piece is { a: Number, b: Number }
// Bridge is { strength: Number, length: Number }

// Piece -> Bridge -> Bridge
const bridge = curry((piece, br) => ({ strength: piece.strength + br.strength, length: br.length + 1 }));
const emptyBridge = { strength: 0, length: 0 };

// (* -> *) -> [*] -> [*]
const findMaxesBy = curry((f, items) => compose(
    last,
    sortBy(compose(f, head)),
    values, 
    groupBy(f)
)(items));

// Number -> Piece -> Boolean
const hasNum = curry((num, { a, b }) => a === num || b == num );

// Returns a list of bridges, based on the provided pieces, that produce the maximum
// value for the provided criterion
// Number -> [Piece] -> [Bridge]
const bridgesFrom = curry((selectionCriterion, num, pieces) => compose(
    defaultTo([]),
    findMaxesBy(selectionCriterion),
    chain(bridgesFromPiece(selectionCriterion, pieces, num)),
    filter(hasNum(num))
)(pieces));

// Piece -> Number -> Number
const otherSide = ({ a, b }, num) => a === num ? b : a;

// [Piece] -> Number -> Piece -> [Bridge]
const bridgesFromPiece = curry((selectionCriterion, pieces, num, piece) => compose(
    map(bridge(piece)),
    concat([emptyBridge]),
    bridgesFrom(selectionCriterion, otherSide(piece, num)),
    without([piece]),
)(pieces));

// Bridge -> Number
const bridgeStrength = prop('strength');

// String -> Piece
const parsePiece = compose(
    ([a, b]) => ({ a, b, strength: a + b }),
    map(Number),
    split('/')
);

// [Piece] -> Number
const p1 = compose(
    bridgeStrength,
    head,
    bridgesFrom(bridgeStrength, 0)
);

// [Piece] -> Number
const p2 = compose(
    listMax,
    map(bridgeStrength),
    bridgesFrom(length, 0)
);

module.exports = {
    solution: {
        type: 'lines',
        pre: parsePiece,
        ps: [p1, p2]
    }
};