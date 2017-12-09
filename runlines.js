const day = process.argv[2];

const { runLines } = require('./shared');
const { ps } = require(`./${day}`);

runLines(day, ...ps);