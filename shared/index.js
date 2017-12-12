const { __, compose, curry, split, add, length, mathMod, drop, take, prop, apply } = require('ramda');


// logging
const log = (...vals) => console.log.apply(console, vals);
const probe = val => (log(val), val);

// arrays
const toArray = val => Array.from(val);
const arrayMap = curry((f, arr) => toArray(arr).map(f));
const arrayFilter = curry((f, arr) => toArray(arr).filter(f));
// Number -> [*] -> Number
const wrapIndexValue = curry((i, arr) => mathMod(i, length(arr)));
// Number -> [*] -> *
const wrapIndex = curry((i, arr) => prop(wrapIndexValue(i, arr), arr));
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
const sub1 = add(-1);
const listMax = apply(Math.max);
const listMin = apply(Math.min);

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
    , toArray
    , arrayMap
    , arrayFilter
    , wrapIndexValue
    , wrapIndex
    , applyPattern
    , tokenize
    , add1
    , sub1
    , listMax
    , listMin
    , children
    , repeatUntil
    , rotate
};