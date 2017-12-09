const fs = require('fs');
const { __, compose, curry, map, applyTo, forEach, call, replace, split } = require('ramda');

const loadFile = (path, cb) => fs.readFile(path, 'utf8', (err, contents) => {
    if (err) { console.log(err); } else { cb(contents); }
});

const trimEnd = replace(/\s+$/, '');

const loadInput = (folder, cb) => loadFile(`${folder}/input.txt`, cb);

const log = (...vals) => console.log.apply(console, vals);

const timestamp = val => (console.log(new Date()),val);

const runExercise = curry((exercise, input) =>
    compose(timestamp, log, applyTo(input), timestamp)(exercise)
);

const runExercises = curry((exercises, input) => 
    forEach(runExercise(__, input), exercises
));

const run = (folder, ...exercises) =>  
    loadInput(folder, compose(runExercises(exercises), trimEnd));

const splitLines = split(/\r\n|\r|\n/);
    
const runLines = (folder, ...exercises) =>
    run(folder, ...map(ex => compose(ex, splitLines), exercises));
    
const toArray = val => Array.from(val);

const tokenize = split(/\s+/);

const arrayMap = curry((f, arr) => toArray(arr).map(f));

const probe = val => (console.log(val), val);

module.exports = {
    loadFile
    , loadInput
    , trimEnd
    , splitLines
    , run
    , runLines
    , probe
    , tokenize
    , toArray
    , arrayMap
};