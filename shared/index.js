const { __, compose, curry, split, add, length, mathMod, drop, take, prop } = require('ramda');


// logging
const log = (...vals) => console.log.apply(console, vals);
const probe = val => (log(val), val);

// arrays
const toArray = val => Array.from(val);
const arrayMap = curry((f, arr) => toArray(arr).map(f));
const arrayFilter = curry((f, arr) => toArray(arr).filter(f));
const rotate = curry((count, arr) => {
    const len = length(arr);
    const offset = len - mathMod(count, len);
    
    return [...drop(offset, arr), ...take(offset, arr)];
});

// regex
const applyPattern = curry((regex, str) => regex.exec(str));
const tokenize = split(/\s+/);

// math
const add1 = add(1);

// trees
const children = prop('children');

// repetition
const repeatUntil = curry((update, stop, start) => {
    let cur = start;
    
    while (!stop(cur)) { cur = update(cur) }
    
    return cur;
});


module.exports = {
    log
    , probe
    , tokenize
    , applyPattern
    , toArray
    , arrayMap
    , arrayFilter
    , add1
    , children
    , repeatUntil
    , rotate
};