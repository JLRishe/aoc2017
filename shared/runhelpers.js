const fs = require('fs');
const { __, compose, curry, map, replace, split, applyTo, forEach, apply, equals, when, isNil, identity, applySpec, memoizeWith, prop, always } = require('ramda');
const { log, probe } = require('.');

const loadFile = (path, cb) => fs.readFile(path, 'utf8', (err, contents) => {
    if (err) { console.log(err); } else { cb(contents); }
});

const trimEnd = replace(/\s+$/, '');

const loadInput = (folder, cb) => loadFile(`${folder}/input.txt`, cb);

const timestamp = f => (...args) => {
    const startTime = new Date();
    log('Start', startTime);
    apply(f, args);
    const endTime = new Date();
    log('End', endTime);
    log('Elapsed', (endTime - startTime), 'ms');
    log();
};

const runExAndLog = curry((input, ex) => compose(log, applyTo(input))(ex));

const runExercise = curry((input, exercise) =>
    timestamp(runExAndLog(input))(exercise)
);

const runExercises = curry((exercises, input) => 
    forEach(runExercise(input), exercises)
);

const run = (folder, exercises) =>  
    loadInput(folder, compose(runExercises(exercises), trimEnd));

const splitLines = split(/\r\n|\r|\n/);
    
const feedLinesToEx = ex => compose(ex, splitLines);
    
const runLines = (folder, exercises) =>
    run(folder, map(feedLinesToEx, exercises));

// Solution => [(* -> *)]
const prepare = ({ solution: { type, parse, ps } }) => {
    const parser = memoizeWith(identity, parse || identity);
    
    return type === 'lines'
        ? map(p => compose(p, map(parser), splitLines), ps)
        : map(p => compose(p, parser), ps);
};

const runSolution = (folder, solution) => {
    const prepared = prepare(solution);
    
    run(folder, prepared);
};
    
    
module.exports = {
    loadFile
    , loadInput
    , trimEnd
    , splitLines
    , run
    , runLines
    , runSolution
    , prepare
};