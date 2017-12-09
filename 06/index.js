const { __, compose, map, filter, apply, equals, add, prop, curry, head, length, sortBy, update, contains, memoizeWith, identity, indexOf } = require('ramda');
const { arrayMap, probe, tokenize } = require('../shared');

const hasValue = val => compose(equals(val), prop('val'));

const maxBank = banks => {
    const maxValue = apply(Math.max, banks);
    
    return compose(
        head, 
        sortBy(prop('b')), 
        filter(hasValue(maxValue)), 
        arrayMap((val, bankNum) => ({ bankNum, val }))
    )(banks);
};

const shouldAdd = curry((start, leftover, total, i) => 
    i > start && i <= start + leftover ||
    start + leftover >= total && i <= (start + leftover) % total
);

const updateBanks = banks => {
    const mb = maxBank(banks);
    const count = length(banks);
    const uniformAdd = Math.floor(mb.val / count);
    const leftover = mb.val % count;
    const addLeftoverCheck = shouldAdd(mb.bankNum, leftover, count);
    
    return compose(
        arrayMap((el, i) => addLeftoverCheck(i) ? el + 1 : el),
        map(add(uniformAdd)), 
        update(mb.bankNum, 0)
    )(banks);
};

const findLoop = memoizeWith(
    identity,
    line => {
        let banks = map(Number, tokenize(line));
        let pastConfigs = [];
        
        while(!contains(banks, pastConfigs)) {
            pastConfigs = [...pastConfigs, banks];
            banks = updateBanks(banks);
        }
        
        return { totalUpdates: pastConfigs.length, loopSize: pastConfigs.length - indexOf(banks, pastConfigs) };
    }
)

const p1 = compose(prop('totalUpdates'), findLoop);

const p2 = compose(prop('loopSize'), findLoop);

module.exports = {
    updateBanks
    , ps: [p1, p2]
};