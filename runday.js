const day = process.argv[2];

const { runSolution } = require('./shared/runhelpers');

runSolution(day, require(`./${day}`));
