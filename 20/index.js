const ramda = require('ramda');
const { __, compose, curry, map, filter, sortBy, head, sum, prop, zip, times, identity, min, flatten, values, groupBy, length, concat, reduce, last, unnest } = ramda;
const { probe, applyPattern } = require('aoc-helpers');
const { genTransform, genDrop, genHead } = require('func-generators');

// Particle is [Vectors, Vectors, Vectors]
// Vectors is { p: Number, v: Number, a: Number }

// Vectors => Vectors
const updateVector = ({ p, v, a }) => {
    const nv = v + a;
    
    return { p: p + nv, v: nv, a }
};

// Particle -> Particle
const updateParticle = map(updateVector);

// [Particles] -> [Particles]
const updateParticles = map(updateParticle);

// (Number, Number, Number) -> Particle
const vector = (p, v, a) => ({ p: Number(p), v: Number(v), a: Number(a) });

// String -> Particle
const parseParticle = compose(
    ([,px,py,pz,vx,vy,vz,ax,ay,az]) => [vector(px,vx,ax), vector(py,vy,ay), vector(pz,vz,az)],
    applyPattern(/^p=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>, v=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>, a=<\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>/)
);

// Particle -> Number
const distFromOrigin = compose(
    sum,
    map(Math.abs),
    map(prop('p'))
);

// ([Particles] -> [Particles]) -> Generator [Particles]
const particleSimulator = update => particles => genTransform(
    update,
    particles
);

// [*] -> [[Number, *]]
const number = arr => zip(times(identity, arr.length), arr);

// [Particle] -> Number
const p1 = compose(
    head,
    head,
    sortBy(compose(distFromOrigin, last)),
    number,
    genHead,
    genDrop(2000),
    particleSimulator(updateParticles),
);

// [Particle] -> [Particle]
const removeCollided = compose(
    unnest,
    filter(g => g.length === 1),
    values,
    groupBy(([{ p: px }, { p: py }, { p: pz }]) => [px, py, pz].join(','))
);

// [Particle] -> [Particle]
const updateAndPrune = compose(
    removeCollided,
    updateParticles
);

// [Particle] -> Number
const p2 = compose(
    length,
    genHead,
    genDrop(2000),
    particleSimulator(updateAndPrune)
);

module.exports = {
    solution: {
        type: 'lines',
        pre: parseParticle,
        ps: [p1, p2]
    }
};