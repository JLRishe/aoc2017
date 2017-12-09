const fs = require('fs');
const { compose, curry, map, applyTo, forEach, call, replace, split } = require('ramda');

const loadFile = (path, cb) => fs.readFile(path, 'utf8', (err, contents) => {
    if (err) { console.log(err); } else { cb(contents); }
});

const trimEnd = replace(/\s+$/, '');

const loadInput = (folder, cb) => loadFile(`${folder}/input.txt`, cb);

const log = (...vals) => console.log.apply(console, vals);

const runAndLog = f => compose(log, call(f));

const runExercises = curry((exercises, input) => compose(forEach(log), map(applyTo(input)))(exercises));

const run = (folder, ...exercises) =>  
    loadInput(folder, compose(runExercises(exercises), trimEnd));

const splitLines = split(/\r\n|\r|\n/);
    
const runLines = (folder, ...exercises) =>
    run(folder, ...map(ex => compose(ex, splitLines), exercises));
    
const toArray = val => Array.from(val);

module.exports = {
    loadFile
    , loadInput
    , trimEnd
    , run
    , toArray
};